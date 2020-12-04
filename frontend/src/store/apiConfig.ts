const BACKEND_URL = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : "80";
export const API_URL = BACKEND_URL + "/backendapi";
export const CAMUNDA_API_URL = BACKEND_URL + "/engine-rest/engine/default";