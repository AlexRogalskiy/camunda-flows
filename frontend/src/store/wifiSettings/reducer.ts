import { Reducer } from "redux";
import {SsidSettings, SsidSettingsActionTypes, WifiSettings} from "./types";

export const initialState:WifiSettings = {
    ssidList: null
};

const reducer: Reducer<WifiSettings> = (state = initialState, action) => {

    switch (action.type) {
        case SsidSettingsActionTypes.SET_SSID_LIST:
            return {
                ...state,
                ssidList: action.ssidList
            };
        case SsidSettingsActionTypes.SET_SSID_SETTINGS:
            let ssidSettings:SsidSettings = action.ssidSettings;
            let ssidList = state.ssidList?.map((item:SsidSettings, index) =>{
                if(item.index === ssidSettings.index){
                    return ssidSettings;
                }
                return item;
            });
            return {
                ...state,
                ssidList: ssidList
            };
        default:
            return state;
    }
}

export default reducer;