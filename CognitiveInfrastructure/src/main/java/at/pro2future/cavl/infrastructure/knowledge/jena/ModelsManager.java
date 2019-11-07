package at.pro2future.cavl.infrastructure.knowledge.jena;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response.Status;

import org.apache.jena.rdf.model.Model;
import org.apache.jena.rdf.model.ModelFactory;
import org.topbraid.spin.system.SPINModuleRegistry;
import com.siemens.wotus.commonserver.utilities.ResponsesFactory;

import at.pro2future.cavl.infrastructure.Constants;
import at.pro2future.cavl.infrastructure.CognitiveInfrastructure;
import at.pro2future.cavl.infrastructure.utilities.FileUtilities;
import at.pro2future.cavl.infrastructure.utilities.KPdoesNotExistException;

/**
 * Manages ontologies within a KnowledgePack
 */
public class ModelsManager {

	private Model myModel = null;
	private List<String> knownModels = null;

	public ModelsManager() {
		this.myModel = ModelFactory.createDefaultModel();
		this.knownModels = new ArrayList<>();
	}

	public ModelsManager(List<String> knowledgePackNames) throws KPdoesNotExistException {
		update(knowledgePackNames);
	}

	public void update(List<String> knowledgePackNames) throws KPdoesNotExistException {
		List<String> ontologyURIs = loadOntologyURIsForKnowledgePacks(knowledgePackNames);
		updateModelWithOntologyURIs(ontologyURIs);
	}

	private static List<String> loadOntologyURIsForKnowledgePacks(List<String> knowledgePackNames) throws KPdoesNotExistException {
		List<String> ontologyURIs = new ArrayList<String>();

		for (String knowledgePackName : knowledgePackNames) {
			CognitiveInfrastructure.logger.fine("Loading KnowledgePack (Ontologies): " + knowledgePackName);
			ontologyURIs.addAll(loadOntologyURIsForKnowledgePack(knowledgePackName));
		}

		return ontologyURIs;
	}

	private static Collection<String> loadOntologyURIsForKnowledgePack(String knowledgePackName) throws KPdoesNotExistException {
		List<String> ontologyURIs = new ArrayList<String>();

		String knowledgePackDirectory = FileUtilities.findKnowledgePackDirectory(knowledgePackName);
		CognitiveInfrastructure.logger.fine("KnowledgePack directory: " + knowledgePackDirectory);

		if (knowledgePackDirectory == null) {
			throw new WebApplicationException(ResponsesFactory.createHttpProblemResponse(Status.BAD_REQUEST, "KnowledgePack '" + knowledgePackName + "' does not exist. KPs were not updated!"));
		} else {
			String [] ontologyFiles = FileUtilities.getFileListingForDirectory(knowledgePackDirectory + File.separator + Constants.ontologiesDirectoryName);

			if (ontologyFiles == null || ontologyFiles.length == 0) {
				throw new WebApplicationException(ResponsesFactory.createHttpProblemResponse(Status.BAD_REQUEST, "KnowledgePack '" + knowledgePackName + "' does not contain any model files. KPs were not updated!"));
			}
			else {
				for (String ontology : ontologyFiles) {

					// Skip non-ttl files in the ontologies folder
					String fileEXT = ontology.substring(ontology.length() - 4, ontology.length());
					if(!fileEXT.equals(".ttl")) {
						continue;
					}

					String qualifiedFileName = FileUtilities.findKnowledgePackDirectory(knowledgePackName) + File.separator + Constants.ontologiesDirectoryName + ontology;
					ontologyURIs.add(qualifiedFileName);
				}
			}
		}
		return ontologyURIs;
	}

	private void updateModelWithOntologyURIs(List<String> modelURIsToLoad) {
		this.myModel = ModelFactory.createDefaultModel();

		this.knownModels = loadModels(modelURIsToLoad);
		CognitiveInfrastructure.logger.info("Attempted to load " + modelURIsToLoad.size() + " ontology files. Successfully loaded " + this.myModel.size() + " triples.");
	}

	// Loads model files and annotates subjects with KP names for loaded ontologies. Purpose: visualization uses this to determine between KPs 
	private List<String> loadModels(List<String> modelURIsToLoad) {
		List<String> loadedModels = new ArrayList<String>();

		for (String modelURI : modelURIsToLoad) {
			try {
				CognitiveInfrastructure.logger.fine("Loading model from: " + modelURI);
				this.myModel.read(modelURI, "TURTLE");
				loadedModels.add(modelURI);
			} catch (Exception e) {
				CognitiveInfrastructure.logger.severe("Unable to load model: " + e.getMessage());
				e.printStackTrace();
				throw new WebApplicationException(e.getMessage(), Status.BAD_REQUEST);
			}
		}

		return loadedModels;
	}

	public List<String> getKnownModels() {
		return this.knownModels;
	}

	public Model getModel() {
		return this.myModel;
	}

	public long countTriples() {
		return this.myModel.size();
	}

	public void saveModelToFile() {
		try {
			String saveTime =  "DUMP_" + Instant.now().toString() + ".ttl";
			saveTime = saveTime.replace(":","-");
			File file = new File(System.getProperty("user.dir"), saveTime);
			file.createNewFile();
			OutputStream out = new FileOutputStream(file);

			Model m = ModelFactory.createDefaultModel();
			m.add(myModel);
			assert m.size() == myModel.size();
			
			m.write(out, "TURTLE");
			out.flush();
			out.close();

			CognitiveInfrastructure.logger.info("Saved a dump to: " + System.getProperty("user.dir") +  "\\" + saveTime); 
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
