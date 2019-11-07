package dominicbruegger.thesis.foodplugin.functions;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class NutriscoreCalculator {
	
	public static String calculateNS(String jsonString) throws ParseException {
		String jsonFruitVegetables = "0";
    	String jsonMajorCategory = "0";
    	String jsonMinorCategory = "0";
    	String jsonEnergy = "0";
    	String jsonFibers = "0";
    	String jsonSugar = "0";
    	String jsonAcids = "0";
    	String jsonSalt = "0";
    	String jsonProtein = "0";
    	JSONParser parse = new JSONParser();
    	
		JSONObject jobj = (JSONObject)parse.parse(jsonString);
        JSONArray jsonarr_1 = (JSONArray) jobj.get("products");
        if (jsonarr_1 != null) {
            for(int i=0; i<jsonarr_1.size(); i++) {
                JSONObject jsonobj_1 = (JSONObject)jsonarr_1.get(i);
                JSONArray jsonarr_2 = (JSONArray) jsonobj_1.get("nutrients");
                	if (jsonobj_1.get("health_percentage") != null) {
                		jsonFruitVegetables = jsonobj_1.get("health_percentage").toString();
                	} else {
                		System.out.println("The Fruit and Vegetable % is null.");
                	}
                	if (jsonobj_1.get("major_category") != null) {
                		jsonMajorCategory = jsonobj_1.get("major_category").toString();
                	} else {
                		System.out.println("No major category available.");
                	}
                	if (jsonobj_1.get("minor_category") != null) {
                		jsonMinorCategory = jsonobj_1.get("minor_category").toString();
                	} else {
                		System.out.println("No minor category available.");
                	}
                for (int j=0; j<jsonarr_2.size(); j++) {
                	JSONObject jsonobj_2 = (JSONObject) jsonarr_2.get(j);
	                	if (jsonobj_2.toString().contains("dietaryFiber")) {
	                		jsonFibers = jsonobj_2.get("amount").toString();
	                	} else if (jsonobj_2.toString().contains("energyKJ")) {
	                		jsonEnergy = jsonobj_2.get("amount").toString();
	                	} else if (jsonobj_2.toString().contains("sugars")) {
	                		jsonSugar = jsonobj_2.get("amount").toString();
	                	} else if (jsonobj_2.toString().contains("saturatedFat")) {
	                		jsonAcids = jsonobj_2.get("amount").toString();
	                	} else if (jsonobj_2.toString().contains("salt")) {
	                		jsonSalt = jsonobj_2.get("amount").toString();
	                	} else if (jsonobj_2.toString().contains("protein")) {
	                		jsonProtein = jsonobj_2.get("amount").toString();
	                	}
	                }
                }
        } else {
        	System.out.println("The necessery data for the Nutriscore calculation is not available.");
        }
        
        // Code for the calculation of the Nutriscore.
	    boolean food;
	    boolean water;
	    
	    if (Integer.parseInt(jsonMajorCategory) == 1 || Integer.parseInt(jsonMajorCategory) == 2) {
	    	food = false;
	    } else {
	    	food = true;
	    }
	    //System.out.println("The product is food: " + food);
	    
	    if (Integer.parseInt(jsonMinorCategory) == 5) {
	    	water = true;
	    } else {
	    	water = false;
	    }
	    //System.out.println("The product is mineral water: " + water);
	    
	    Double energy = Double.parseDouble(jsonEnergy);
	    //System.out.println("Energy in KJ: " + energy);
	    Double sugar = Double.parseDouble(jsonSugar);
	    //System.out.println("Sugar in g: " + sugar);
	    Double acids = Double.parseDouble(jsonAcids);
	    //System.out.println("Saturated fatty acids in g: " + acids);
	    Double salt = Double.parseDouble(jsonSalt);
	    Double sodium = salt * 400;
	    //System.out.println("Sodium in mg: " + sodium);
	    Double fruitvegetables;
	    if (jsonFruitVegetables != null) { 
	    	fruitvegetables = Double.parseDouble(jsonFruitVegetables);
	    } else {
	    	fruitvegetables = 0.00;
	    }
	    //System.out.println("Fruit and Vegetables in %: " + fruitvegetables);
	    Double protein = Double.parseDouble(jsonProtein);
	    //System.out.println("Protein in g: " + protein);
	    Double fibers = Double.parseDouble(jsonFibers);
	    //System.out.println("Fibers in g: " + fibers);
	    
	    Integer energyScore = null;
	    
	    if (food == true) {
	        if(energy <= 335) {
	            energyScore = 0;
	        } else if (energy <= 670) {
	            energyScore = 1;
	        } else if (energy <= 1005) {
	            energyScore = 2;
	        } else if (energy <= 1340) {
	            energyScore = 3;
	        } else if (energy <= 1675) {
	            energyScore = 4;
	        } else if (energy <= 2010) {
	            energyScore = 5;
	        } else if (energy <= 2345) {
	            energyScore = 6;
	        } else if (energy <= 2680) {
	            energyScore = 7;
	        } else if (energy <= 3015) {
	            energyScore = 8;
	        } else if (energy <= 3350) {
	            energyScore = 9;
	        } else {
	            energyScore = 10;
	        };
	    } else if (food == false) {
	        if (energy <= 0) {
	            energyScore = 0;
	        } else if (energy <= 30) {
	            energyScore = 1;
	        } else if (energy <= 60) {
	            energyScore = 2;
	        } else if (energy <= 90) {
	            energyScore = 3;
	        } else if (energy <= 120) {
	            energyScore = 4;
	        } else if (energy <= 150) {
	            energyScore = 5;
	        } else if (energy <= 180) {
	            energyScore = 6;
	        } else if (energy <= 210) {
	            energyScore = 7;
	        } else if (energy <= 240) {
	            energyScore = 8;
	        } else if (energy <= 270) {
	            energyScore = 9;
	        } else {
	            energyScore = 10;
	        }
	    }
	    //System.out.println("EnergyScore: " + energyScore);
	
	    Integer acidsScore = null;
	
	    if (food == true) {
	        if (acids <= 1) {
	            acidsScore = 0;
	        } else if (acids <= 2) {
	            acidsScore = 1;
	        } else if (acids <= 3) {
	            acidsScore = 2;
	        } else if (acids <= 4) {
	            acidsScore = 3;
	        } else if (acids <= 5) {
	            acidsScore = 4;
	        } else if (acids <= 6) {
	            acidsScore = 5;
	        } else if (acids <= 7) {
	            acidsScore = 6;
	        } else if (acids <= 8) {
	            acidsScore = 7;
	        } else if (acids <= 9) {
	            acidsScore = 8;
	        } else if (acids <= 10) {
	            acidsScore = 9;
	        } else {
	            acidsScore = 10;
	        };
	    } else if (food == false) {
	        acidsScore = 0;
	    }
	    //System.out.println("AcidsScore: " + acidsScore);
	    
	    Integer sugarScore = null;
	
	    if (food == true) {
	        if (sugar <= 4.5) {
	            sugarScore = 0;
	        } else if (sugar <= 9) {
	            sugarScore = 1;
	        } else if (sugar <= 13.5) {
	            sugarScore = 2;
	        } else if (sugar <= 18) {
	            sugarScore = 3;
	        } else if (sugar <= 22.5) {
	            sugarScore = 4;
	        } else if (sugar <= 27) {
	            sugarScore = 5;
	        } else if (sugar <= 31) {
	            sugarScore = 6;
	        } else if (sugar <= 36) {
	            sugarScore = 7;
	        } else if (sugar <= 40) {
	            sugarScore = 8;
	        } else if (sugar <= 45) {
	            sugarScore = 9;
	        } else {
	            sugarScore = 10;
	        };
	    } else if (food == false) {
	        if (sugar <= 0) {
	            sugarScore = 0;
	        } else if (sugar <= 1.5) {
	            sugarScore = 1;
	        } else if (sugar <= 3) {
	            sugarScore = 2;
	        } else if (sugar <= 4.5) {
	            sugarScore = 3;
	        } else if (sugar <= 6) {
	            sugarScore = 4;
	        } else if (sugar <= 7.5) {
	            sugarScore = 5;
	        } else if (sugar <= 9) {
	            sugarScore = 6;
	        } else if (sugar <= 10.5) {
	            sugarScore = 7;
	        } else if (sugar <= 12) {
	            sugarScore = 8;
	        } else if (sugar <= 13.5) {
	            sugarScore = 9;
	        } else {
	            sugarScore = 10;
	        }
	    }
	    //System.out.println("SugarScore: " + sugarScore);
	    
	    Integer sodiumScore = null;
	
	    if (food == true) {
	        if (sodium <= 90) {
	            sodiumScore = 0;
	        } else if (sodium <= 180) {
	            sodiumScore = 1;
	        } else if (sodium <= 270) {
	            sodiumScore = 2;
	        } else if (sodium <= 360) {
	            sodiumScore = 3;
	        } else if (sodium <= 450) {
	            sodiumScore = 4;
	        } else if (sodium <= 540) {
	            sodiumScore = 5;
	        } else if (sodium <= 630) {
	            sodiumScore = 6;
	        } else if (sodium <= 720) {
	            sodiumScore = 7;
	        } else if (sodium <= 810) {
	            sodiumScore = 8;
	        } else if (sodium <= 900) {
	            sodiumScore = 9;
	        } else {
	            sodiumScore = 10;
	        };
	    } else if (food == false) {
	        sodiumScore = 0;
	    }
	    //System.out.println("SodiumScore: " + sodiumScore);
	    
	    Integer badIngredientScore = energyScore + sugarScore + acidsScore + sodiumScore;
	    //System.out.println("Bad ingredients score: " + badIngredientScore);
	    
	    Integer fruitvegetablesScore = null;
	
	    if (food == true) {
	        if (fruitvegetables <= 40) {
	            fruitvegetablesScore = 0;
	        } else if (fruitvegetables <= 60) {
	            fruitvegetablesScore = 1;
	        } else if (fruitvegetables <= 80) {
	            fruitvegetablesScore = 2;
	        } else {
	            fruitvegetablesScore = 5;
	        };
	    } if (food == false) {
	        if (fruitvegetables <= 40) {
	            fruitvegetablesScore = 0;
	        } else if (fruitvegetables <= 60) {
	            fruitvegetablesScore = 2;
	        } else if (fruitvegetables <= 80) {
	            fruitvegetablesScore = 4;
	        } else {
	            fruitvegetablesScore = 10;
	        }
	    }
	    //System.out.println("FruitVegetableScore: " + fruitvegetablesScore);
	    
	    Integer fibersScore = null;
	
	    if (food == true) {
	        if (fibers <= 0.9) {
	            fibersScore = 0;
	        } else if (fibers <= 1.9) {
	            fibersScore = 1;
	        } else if (fibers <= 2.8) {
	            fibersScore = 2;
	        } else if (fibers <= 3.7) {
	            fibersScore = 3;
	        } else if (fibers <= 4.7) {
	            fibersScore = 4;
	        } else {
	            fibersScore = 5;
	        };
	    } else if (food == false) {
	        fibersScore = 0;
	    }
	    //System.out.println("FibersScore: " + fibersScore);
	
	    Integer proteinScore = null;
	
	    if (food == true) {
	        if (protein <= 1.6) {
	            proteinScore = 0;
	        } else if (protein <= 3.2) {
	            proteinScore = 1;
	        } else if (protein <= 4.8) {
	            proteinScore = 2;
	        } else if (protein <= 6.4) {
	            proteinScore = 3;
	        } else if (protein <= 8.0) {
	            proteinScore = 4;
	        } else {
	            proteinScore = 5;
	        };
	    } else if (food == false) {
	        proteinScore = 0;
	    }
	    //System.out.println("ProteinScore: " + proteinScore);
	    
	    // Calculating Nutriscore.
	    Integer goodIngredientScore = fruitvegetablesScore + fibersScore + proteinScore;
	    //System.out.println("Good ingredients score: " + goodIngredientScore);
	    
	    Integer nutriScoreNumber;
	    if (badIngredientScore == 0 && goodIngredientScore == 0) {
	        nutriScoreNumber = 50;
	    } else if (food == true && jsonEnergy == "0" && jsonSugar == "0" && jsonAcids == "0") {
	    	nutriScoreNumber = 50;
	    } else if (food == true && jsonEnergy == "0" && jsonSugar == "0" && jsonSalt == "0") {
	    	nutriScoreNumber = 50;
	    } else if (food == true && jsonEnergy == "0" && jsonAcids == "0" && jsonSalt == "0") {
	    	nutriScoreNumber = 50;
	    } else if (food == true && jsonSugar == "0" && jsonAcids == "0" && jsonSalt == "0") {
	    	nutriScoreNumber = 50;
	    } else if (food == false && jsonEnergy == "0" && jsonSugar == "0") {
	    	nutriScoreNumber = 50;
	    } else if (badIngredientScore >= 11) {
	        nutriScoreNumber = badIngredientScore - (fibersScore + fruitvegetablesScore);
	    } else {
	        nutriScoreNumber = badIngredientScore - goodIngredientScore;
	    }
	    
	    String nutriScore = "INVALID";
	    
	    if (food == true) {
	        if (nutriScoreNumber <= -1) {
	            nutriScore = "A";
	        } else if (nutriScoreNumber <= 2) {
	            nutriScore = "B";
	        } else if (nutriScoreNumber <= 10) {
	            nutriScore = "C";
	        } else if (nutriScoreNumber <= 18) {
	            nutriScore = "D";
	        } else if (nutriScoreNumber <= 40) {
	            nutriScore = "E";
	        } else if (nutriScoreNumber == 50) {
	            nutriScore = "INVALID";
	        }
	    } else if (food == false) {
	        if (water == true) {
	            nutriScore = "A";
	        } else if (water == false & nutriScoreNumber <= 1) {
	            nutriScore = "B";
	        } else if (water == false & nutriScoreNumber <= 5) {
	            nutriScore = "C";
	        } else if (water == false & nutriScoreNumber <= 9) {
	            nutriScore = "D";
	        } else if (water == false & nutriScoreNumber <= 30) {
	            nutriScore = "E";
	        } else if (water == false & nutriScoreNumber == 50) {
	            nutriScore = "INVALID";
	        }
	    }
		return nutriScore;
	}
}