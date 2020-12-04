import axios from 'axios';
import {API_URL} from '../apiConfig';
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootState } from "../index";

const BACKEND_API = API_URL + "/subscriberTask";

export type AppThunkDispatch = ThunkDispatch<RootState, null, AnyAction>;
export type AppPromiseThunkAction = ThunkAction<Promise<any|null>, RootState, null, AnyAction>;

export const getRequestList = ():AppPromiseThunkAction => {
    return (dispatch: AppThunkDispatch, getState:() => RootState): Promise<any|null> => {
        let taskId = getState().wfEngine.task.taskDto.id;
        let requestUrl = BACKEND_API  + "/" + taskId + "/requestList";

        return axios.get(requestUrl)
            .catch(err => {
                console.log("getRequestList:error:" + err);
                return null;
            })
            .then(response => {
                if(response) {
                    return response.data.responseObject;
                }
                return null;
            });
    }
}

/*
export const getOpenTaskList = ():AppThunkAction => {
    return (dispatch: AppThunkDispatch): void => {
        let requestUrl = BACKEND_API  + "/openTaskList";
        axios.get(requestUrl)
            .catch(err => {
                console.log("getOpenTaskList:error:" + err);
                return null;
            })
            .then(response => {
                if(response) {
                    dispatch(setOpenTaskList(response.data));
                }
            });
    }
}

export const setOpenTaskList = (ssidList:SsidSettings[]) => {
    return {
        type: SsidSettingsActionTypes.SET_SSID_LIST,
        ssidList: ssidList
    };
};
*/