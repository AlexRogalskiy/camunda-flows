import axios from 'axios';
import {API_URL} from '../apiConfig';
import { SsidSettingsActionTypes, SsidSettings} from "./types";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../index";

const BACKEND_API = API_URL + "/wifiSettings";

export type AppThunkDispatch = ThunkDispatch<RootState, null, AnyAction>;
export type AppPromiseThunkAction = ThunkAction<Promise<string|null>, RootState, null, AnyAction>;

export const getSsidSettingsList = (taskid:string):AppPromiseThunkAction => {
    return (dispatch: AppThunkDispatch): Promise<string|null> => {
        let requestUrl = BACKEND_API  + "/" + taskid + "/ssidList";
        return axios.get(requestUrl)
            .catch(err => {
                console.log("getSsidSettingsList:error:" + err);
                return null;
            })
            .then(response => {
                if(response) {
                    dispatch(setSsidList(response.data));
                    return response.data;
                }
                return null;
        });
    }
  }

export const setSsidList = (ssidList:SsidSettings[]) => {
    return {
        type: SsidSettingsActionTypes.SET_SSID_LIST,
        ssidList: ssidList
    };
};

export const saveSsidSettings = (index:string, requestBody:any):AppPromiseThunkAction => {
    return (dispatch: AppThunkDispatch, getState:() => RootState): Promise<any|null> => {
        let taskId = getState().wfEngine.task.taskDto.id;
        let requestUrl = BACKEND_API  + "/" + taskId + "/ssid/" + index;
        return axios.post(requestUrl, requestBody)
            .catch(err => {
                console.log("saveSsidSettings:error:" + err);
                return null;
            })
            .then(response => {
                if(response) {
                    return response.data;
                }
                return null;
            });
    }
}

export const setSsidSettings = (ssidSettings:SsidSettings) => {
    return {
        type: SsidSettingsActionTypes.SET_SSID_SETTINGS,
        ssidSettings: ssidSettings
    };
};

export const setAutoChannel = (index:string):AppPromiseThunkAction => {
    return (dispatch: AppThunkDispatch, getState:() => RootState): Promise<any|null> => {
        let taskId = getState().wfEngine.task.taskDto.id;
        let requestUrl = BACKEND_API  + "/" + taskId + "/ssid/" + index + "/setAutoChannel";
        return axios.post(requestUrl)
            .catch(err => {
                console.log("setAutoChannel:error:" + err);
                return null;
            })
            .then(response => {
                if(response) {
                    return response.data;
                }
                return null;
            });
    }
}