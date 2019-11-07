package at.pro2future.cavl.infrastructure.utilities;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.util.Scanner;
import java.util.regex.Pattern;

import javax.ws.rs.core.MultivaluedMap;

import org.apache.jena.query.ParameterizedSparqlString;
import org.apache.jena.sparql.ARQException;

import com.google.common.io.CharStreams;

import at.pro2future.cavl.infrastructure.CognitiveInfrastructure;

public class QueryUtilities {

	public static String queryNameToQueryFileName(String queryName) {
		if (queryName == null) {
			return(null);
		}

		return(queryName + ".rq");
	}


	public static String qualifiedPathToQueryName(String queryFileName) {
		String pattern   = Pattern.quote(File.separator);
		String queryName = queryFileName.split(pattern)[queryFileName.split(pattern).length - 1];

		return(queryName.replace(".rq", ""));
	}


	public static ParameterizedSparqlString loadAndReplaceQueryParameters(String queryPath, MultivaluedMap<String, String> replacementMap) throws IOException {

		ParameterizedSparqlString queryString = new ParameterizedSparqlString(readFromFile(queryPath));

		if (replacementMap != null) {
			for (String key : replacementMap.keySet()) {
				for (String value : replacementMap.get(key)) {

					try {
						// FIXME: dirty hack to make this work for URIs and literals. Clean this. Create test cases for it.
						if (value.contains("http")) {
							queryString.setIri(key, value);
						} else {
							try {
								if (value.matches("[0-9]+") && value.length() > 2) {
									// Set to long if it's an integer/long
									Long parsedLong = Long.parseLong(value);
									queryString.setLiteral(key, parsedLong);

								} else if (value.matches("[0-9, /.]+") && value.length() > 2) {
									//Set to Double if it's a Double
									Double parsedDouble = Double.parseDouble(value);
									queryString.setLiteral(key, parsedDouble);
								} else {
									queryString.setLiteral(key, value);
								}
							} catch (NumberFormatException e1) {
								// Else, set to string
								queryString.setLiteral(key, value);
							}
						}
					} catch (ARQException e) {
						CognitiveInfrastructure.logger.severe("SPARQL Injection Warning thrown about parameter " + value + " - cannot replace that parameter (perhaps remove angle brackets to make it work?)!");
						e.printStackTrace();
					}
				}                
			}
		}

		return queryString;
	}

	public static String readFromFile(String queryPath) throws IOException {
		Path queryFileName = FileUtilities.findQualifiedFileName(queryPath);
		InputStream queryFileResource = new FileInputStream(queryFileName.toFile());
		InputStreamReader queryFileStream = new InputStreamReader(queryFileResource, "UTF-8");
		String queryString = CharStreams.toString(queryFileStream);

		CognitiveInfrastructure.logger.fine("Reading query from " + queryFileName);
		queryFileStream.close();
		return queryString;
	}

	public static boolean isInteger(String s, int radix) {
		Scanner sc = new Scanner(s.trim());
		if(!sc.hasNextInt(radix)) return false;
		// we know it starts with a valid int, now make sure
		// there's nothing left!
		sc.nextInt(radix);
		return !sc.hasNext();
	}
}