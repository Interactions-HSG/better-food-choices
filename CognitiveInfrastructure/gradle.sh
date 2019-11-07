#!/bin/bash

clear

echo "The script2 starts now. This scripts compiles only backend application. It does not compile any WebVOWL parts."

gradle clean fatjar

java -jar build/libs/GenericSemanticAPI-allDeps-0.1.jar 
