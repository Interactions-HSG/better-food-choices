package at.pro2future.cavl.infrastructure;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.logging.Logger;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response.Status;

import org.topbraid.spin.system.SPINModuleRegistry;

import com.siemens.wotus.commonserver.CommonServer;

import at.pro2future.cavl.infrastructure.knowledge.KnowledgePackManager;
import at.pro2future.cavl.infrastructure.utilities.FileUtilities;
import at.pro2future.cavl.infrastructure.utilities.KPdoesNotExistException;

/**
 * Base Class of the Cognitive Infrastructure
 *   
 * @author Simon Mayer, Pro²Future
 *
 */
public class CognitiveInfrastructure {

	public static Logger logger = Logger.getLogger(CognitiveInfrastructure.class.getName());

	private static CommonServer server = null;

	public static void main(String[] args) {
		loadConfiguration();
		initializeKnowledgePacks();
		configureAndLaunchServer();
	}

	private static void loadConfiguration(){
		configFilePath = "semanticAPI.properties";

		Properties configFile = new Properties();

		try {
			configFile.load(Constants.class.getClassLoader().getResourceAsStream(configFilePath));

			// Standard config file loading, in case we need it at some point

		} catch (IOException e) {
			e.printStackTrace();
		}

		logger.info("Configuration Loaded");		
	}

	public static List<String> getDefaultKnowledgePacks() {
		List<String> defaultKPs = new ArrayList<String>();
		defaultKPs.add("testing-Dominic");
		return defaultKPs;
	}

	private static void initializeKnowledgePacks() {
		// Check whether KPs are present
		Path directory = FileUtilities.findQualifiedFileName(Constants.localKnowledgepackDirectoryName.replace("{knowledgepackname}", ""));
		System.out.println(directory.toString());

		if (!Files.exists(directory)) {
			logger.severe("No 'knowledgepacks' directory is present in the current execution context. Please create that directory before running OSF!");
			System.exit(0);
		} else {
			File folder = directory.toFile();
			File[] listOfFiles = folder.listFiles();

			int numKPs = listOfFiles.length;

			if (numKPs == 0) {
				logger.severe("No Knowledge Packs found inside the 'knowledgepacks' directory  - please populate that directory with at least one Knowledge Pack before running OSF!");
				System.exit(0);
			} else {
				logger.info(numKPs + " Knowledge Packs found:");
				for (int i = 0; i < numKPs; i++) {
					if (listOfFiles[i].isDirectory()) {
						printKnowledgePackInfo(listOfFiles[i]);
					}
				}
			}
		}

		try {
			KnowledgePackManager.getInstance().updateModelsAndQueries(getDefaultKnowledgePacks());
			SPINModuleRegistry.get().init();
		} catch (KPdoesNotExistException e) {
			e.printStackTrace();
		}
	}

	private static void printKnowledgePackInfo(File file) {
		String knowledgePackLocation = file + File.separator + "kp-info.dat";

		System.out.println("### KnowledgePack: " + file.getName() + " ###");
		
		try {							
			BufferedReader buf = new BufferedReader(new FileReader(knowledgePackLocation));
			String lineJustFetched = null;
			String[] wordsArray;

			while(true){
				lineJustFetched = buf.readLine();
				if (lineJustFetched == null){  
					break; 
				} else{
					wordsArray = lineJustFetched.split("\t");
					System.out.println(wordsArray[0] + ": " + wordsArray[1]);
				}
			}

			buf.close();
			
			System.out.println();

		} catch (IOException e) {
			e.printStackTrace();
			throw new WebApplicationException(e.getMessage(), Status.BAD_REQUEST);
		}
	}

	private static String configFilePath = null;

	private static void configureAndLaunchServer() {
		String [] resources = new String [1];
		resources[0] = "at.pro2future.cavl.infrastructure.resources";
		server = new CommonServer(resources, configFilePath);
		server.launch();
	}

	public static URI getBaseURI() {
		if (server != null) {
			return server.baseURI;
		} else {
			try {
				CognitiveInfrastructure.logger.severe("Mocked base URI is returned (server not running)");
				return new URI("http://192.168.1.1:8080");
			} catch (URISyntaxException e) {
				e.printStackTrace();
			}
			return null;
		}
	}

}
