#!/bin/bash

if [ $1 ]
then
   echo "parameter provided $1"
   mvn clean package
   docker build -t camunda-flows-backend:$1 .

else
   echo "provide version as below example"
   echo "./build-image.sh 0.0.2"
fi

