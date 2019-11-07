package at.pro2future.cavl.infrastructure.utilities;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import at.pro2future.cavl.infrastructure.Constants;
import at.pro2future.cavl.infrastructure.CognitiveInfrastructure;

public class FileUtilities {

	// Return qualified filename relative to execution location
	public static Path findQualifiedFileName(String fileName) {
		String executionDirectory = findExecutionDirectory();

		if (!fileName.startsWith(executionDirectory)) {
			fileName = executionDirectory + fileName;
		}

		CognitiveInfrastructure.logger.fine("Returning " + fileName);
		return(Paths.get(fileName));
	}


	// Return list of files in directory relative to execution location
	public static String[] getFileListingForDirectory(String directoryPath) {
		String executionDirectory = findExecutionDirectory();

		if (!directoryPath.startsWith(executionDirectory)) {
			directoryPath = executionDirectory + directoryPath;
		}

		CognitiveInfrastructure.logger.fine("Returning file listing for " + (directoryPath));

		String [] files = new File(directoryPath).list();
		return(files);
	}


	private static String findExecutionDirectory() {
		String executionDirectory = (new File("")).getAbsolutePath() + File.separator;

		CognitiveInfrastructure.logger.fine("Execution directory: " + executionDirectory);

		return(executionDirectory);		
	}


	public static String findKnowledgePackDirectory(String knowledgePackName) throws KPdoesNotExistException {
		Path directory = findQualifiedFileName(Constants.localKnowledgepackDirectoryName.replace("{knowledgepackname}", knowledgePackName));

		if (!Files.exists(directory)) {
			CognitiveInfrastructure.logger.severe("KP directory for KP '" + knowledgePackName + "' does not exist!");
			throw new KPdoesNotExistException("KP directory for KP '" + knowledgePackName + "' does not exist!");
		} else {
			CognitiveInfrastructure.logger.fine("Returning KP directory: " + directory);
			return(directory.toString());
		}
	}

}
