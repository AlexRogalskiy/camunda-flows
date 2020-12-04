import axios from 'axios';
import {API_URL, CAMUNDA_API_URL} from '../apiConfig';
import { WorkflowEngineActionTypes, Task} from "./types";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../index";
import {OperationResponse} from "../sessionStart/types";

const BACKEND_API = API_URL + "/camunda";

export type AppThunkAction = ThunkAction<void, RootState, null, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<RootState, null, AnyAction>;

export const startFlow = (processDefinitionKey:string, subscriberSessionId:string):
        ThunkAction<Promise<string|null>, RootState, null, AnyAction> => {
    return (dispatch: AppThunkDispatch, getState:() => RootState): Promise<string|null> => {
        
        let requestUrl = BACKEND_API  + "/startFlow/" + processDefinitionKey;
        return axios.post(requestUrl, subscriberSessionId)
            .catch(err => {
                console.log("startFlow:error:" + err);
                return null;
            })
            .then(response => {
                if(response) {
                    dispatch(setProcess(response.data, null));
                    return response.data;
                }
                return null;
        });
    }
};

export const setProcess = (processInstanceId:string|null, processMessage:string|null) => {
    return {
        type: WorkflowEngineActionTypes.SET_PROCESS,
        processInstanceId: processInstanceId,
        processMessage: processMessage
    };
};

export const getTaskByProcessId = (processInstanceId:string) : ThunkAction<Promise<string|null>, RootState, null, AnyAction>  => {
    return (dispatch: AppThunkDispatch): Promise<string|null> => {
        let requestUrl = BACKEND_API  + "/task?processInstanceId=" + processInstanceId;
        return axios.get(requestUrl)
            .catch(err => {
                console.log("getTaskByProcessId:error:" + err);
            })
            .then(response => {
                if(response) {
                    //console.log("response: " + JSON.stringify(response));
                    let operationResponse = response.data;
                    if(operationResponse.result === true){
                        let userTaskDetails = operationResponse.responseObject;
                        if(userTaskDetails !== null) {
                            let taskDto = userTaskDetails.taskDto;
                            if (taskDto !== undefined && taskDto !== null) {
                                dispatch(setTask(userTaskDetails));
                                return taskDto.formKey;
                            }
                        }
                    } else {
                        console.log("Operation failed for [" + operationResponse.message + "]");
                        if(operationResponse.message === "ProcessNotFound"){
                            dispatch(setProcess(null, "common.processCompleted"));
                            return "StopPolling";
                        }
                    }
                }
                return null;
            })
    };
}

export const setTask = (task:Task|null) => {
    return {
        type: WorkflowEngineActionTypes.SET_PROCESS_TASK,
        task: task
    };
};

interface CompleteTaskVariables{
    [key: string]: any
};

interface CompleteTaskBody{
    variables:CompleteTaskVariables
};

export const completeTask = (taskId:string, signalName:string|null, parameters:Map<string,any>|null) : ThunkAction<Promise<string|null>, RootState, null, AnyAction> => {
    return (dispatch: AppThunkDispatch): Promise<string|null> => {
        dispatch(setTask(null));
        let requestUrl = CAMUNDA_API_URL  + "/task/" + taskId + "/complete";

        let requestBody:CompleteTaskBody = {
                variables: {
                    signalName: {
                        value: signalName
                    }
                }
            };
        
        if(parameters !== null){
            for (let parameterKey of Array.from(parameters.keys())) {
                let parameterValue = parameters.get(parameterKey);
                requestBody.variables[parameterKey] = {value:parameterValue};
            }
        }

        return axios.post(requestUrl, requestBody)
            .catch(err => {
                console.log("completeTask:error:" + err);
                return "ERROR";
            })
            .then(response => {
                if(response) {
                    return "SUCCESS";
                }
                return "ERROR";
            })
    };
}

export const cancelRunningProcess = (processInstanceId:string) : AppThunkAction => {
    return (dispatch: AppThunkDispatch): void => {
        dispatch(setProcess(null, null));
        dispatch(setTask(null));

        let requestUrl = BACKEND_API  + "/cancelProcess/" + processInstanceId;

        axios.post(requestUrl)
            .catch(err => console.log("cancelRunningProcess:error:" + err))
            .then(response => {
                if(response) {
                    let operationResponse:OperationResponse = response.data;
                    if(operationResponse.result === false){
                        console.log("Failed to initiate subscriber." + operationResponse.message);
                    }
                }
            });
    }
}