FROM openjdk:11.0.9.1-jre-slim

COPY target/camunda-flows*.jar /home/app/camunda-flows-backend.jar
EXPOSE 8080

ENTRYPOINT ["java"]
CMD ["-jar", "/home/app/camunda-flows-backend.jar"]
