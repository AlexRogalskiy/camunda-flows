import axios from 'axios';
import {API_URL} from '../apiConfig';
import { SessionStartActionTypes, OperationResponse, NpmInfo} from "./types";
import { AnyAction} from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../index";

const BACKEND_API = API_URL + "/sessionStart";

export type AppThunkAction = ThunkAction<void, RootState, null, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<RootState, null, AnyAction>;
export type AppPromiseThunkAction = ThunkAction<Promise<OperationResponse>, RootState, null, AnyAction>;

export const changeTab = (tabName:string) : AnyAction => {
    console.log("changeTab is called.");
    return {
        type: SessionStartActionTypes.TAB_CHANGE,
        activeTabName: tabName
    };
};

export const setNetworkDataInitiated = () : AnyAction => {
    return {
        type: SessionStartActionTypes.SET_NW_INITIATED,
        networkDataInitiated: true
    };
};

export const setUserInfo = (userInfo:any) : AnyAction => {
    return {
        type: SessionStartActionTypes.SET_USER_INFO,
        userInfo: userInfo
    };
};

export const setAuthToken = (token:string|undefined) => {
    axios.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        }
    )
}

const setAppWideHeaders = () => {
    axios.interceptors.request.use(
        (config) => {
            config.headers['Content-type'] = 'application/json; charset=utf-8';
            config.headers['Accept'] = 'application/json; charset=utf-8';
            return config;
        }
    )
}

const setGlobalHeader = (headerName:string, headerValue:string) => {
    axios.interceptors.request.use(
        (config) => {
            config.headers[headerName] = headerValue;
            return config;
        }
    )
}

export const initSession = (customerNo:string, subscriberId:string) : AppThunkAction => {
    console.log("init session called.", customerNo, subscriberId);
    return (dispatch: AppThunkDispatch): void => {

        dispatch(setSubscriberId(customerNo, subscriberId));
        setAppWideHeaders();

        let requestUrl = BACKEND_API  + "/initSession";
        let requestBody = {
            customerNo: customerNo,
            subscriberId: subscriberId
        };

        axios.post(requestUrl, requestBody)
            .catch(err => console.log("initSession:error:" + err))
            .then(response => {
                if(response) {
                    let operationResponse:OperationResponse = response.data;
                    if(operationResponse.result === false){
                        console.log("Failed to initiate subscriber." + operationResponse.message);
                    } else {
                        let subscriberSessionId:string|null = operationResponse.responseObject as string|null;
                        if(subscriberSessionId !== null){
                            setGlobalHeader("subscriberSessionId", subscriberSessionId);
                            dispatch(initCompleted(subscriberSessionId));
                        }
                    }
                }
            })
    }
}

export const initCompleted = (sessionId:string) : AnyAction => {
    return {
        type: SessionStartActionTypes.INIT_COMPLETED,
        sessionId: sessionId
    };
};

export const setSubscriberId = (customerNo:string, subscriberId:string) : AnyAction => {
    return {
        type: SessionStartActionTypes.SET_SUBSCRIBER_ID,
        customerNo: customerNo,
        subscriberId: subscriberId
    };
};

export const getNpmInfo = () : AppPromiseThunkAction => {
    return (dispatch: AppThunkDispatch): Promise<OperationResponse> => {
        let requestUrl = BACKEND_API  + "/npmInfo";
        return axios.post(requestUrl)
            .catch(err => console.log("getNpmInfo:error:" + err))
            .then(response => {
                if(response) {
                    let operationResponse:OperationResponse= response.data;
                    if(operationResponse !== null){
                        let npm = operationResponse.responseObject as NpmInfo;
						if(npm != null) {
							dispatch(setNpmInfo(npm))
						}
                        return operationResponse;
                    }
                }
            }) as Promise<OperationResponse>;
    }
}


export const setNpmInfo = (npm:NpmInfo) : AnyAction => {
    return {
        type: SessionStartActionTypes.SET_NPM_INFO,
		switchInfo: npm.switchInfo,
		bngInfo: npm.bngInfo,
    };
};


export const getModemInfo = () : AppPromiseThunkAction => {
    console.log("getModemInfo called.");
    return (dispatch: AppThunkDispatch): Promise<OperationResponse> => {
        let requestUrl = BACKEND_API  + "/modemInfo";
        return axios.post(requestUrl)
            .catch(err => console.log("getModemInfo:error:" + err))
            .then(response => {
                if(response) {
                    let operationResponse:OperationResponse= response.data;
                    if(operationResponse !== null){
                        dispatch(setModemInfo(operationResponse))
                        return operationResponse;
                    }
                }
            }) as Promise<OperationResponse>;
    }
}

export const setModemInfo = (operationResponse:OperationResponse) : AnyAction => {
    return {
        type: SessionStartActionTypes.SET_MODEM_INFO,
        modemInfo: operationResponse.responseObject
    };
};
