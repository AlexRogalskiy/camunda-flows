
## docker containers
docker run --name appRedis -d redis
docker run --name appPostgres -e POSTGRES_PASSWORD=password123 -e POSTGRES_USER=appDbUser -e POSTGRES_DB=appDb -d postgres
docker run --name appKeycloak -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin  -p 8100:8080 -e KEYCLOAK_IMPORT=/tmp/camundaFlowsRealm.json -v /home/guvenc/Projects/camunda-flows/docker/camundaFlowsRealm.json:/tmp/camundaFlowsRealm.json -d jboss/keycloak

## export realm from keycloak
docker run --name appKeycloak -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -p 8100:8080 -v /home/guvenc/Projects/dockerVolumes/keycloak:/tmp -d jboss/keycloak

Login to keycloak and configure your realm, once you are ready to export, run below.

docker exec -it appKeycloak  /opt/jboss/keycloak/bin/standalone.sh -Djboss.socket.binding.port-offset=100 -Dkeycloak.migration.action=export -Dkeycloak.migration.provider=singleFile -Dkeycloak.migration.realmName=camundaFlowsRealm -Dkeycloak.migration.usersExportStrategy=REALM_FILE -Dkeycloak.migration.file=/tmp/my_realm.json


## run npm start with parameters

REACT_APP_KEYCLOAK_CLIENT=solid-app-frontend-dev REACT_APP_API_PORT=8080 npm start 

## How to Compile Project

### `PreRequisites`

java 11 - maven - npm installations are required.
