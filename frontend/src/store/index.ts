import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import sessionStartReducer from "./sessionStart/reducer";
import { SessionStart } from "./sessionStart/types";

import workflowEngineReducer from "./workflowEngine/reducer";
import { WorkflowEngine } from "./workflowEngine/types";

import wifiSettingsReducer from "./wifiSettings/reducer";
import { WifiSettings } from "./wifiSettings/types";

export interface RootState {
    session: SessionStart,
    wfEngine: WorkflowEngine,
    wifiSettings: WifiSettings
};

export const store = createStore(
    combineReducers({
        session:sessionStartReducer,
        wfEngine:workflowEngineReducer,
        wifiSettings:wifiSettingsReducer
    }
), applyMiddleware(thunk));