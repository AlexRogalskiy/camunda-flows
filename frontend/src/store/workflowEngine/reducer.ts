import { Reducer } from "redux";
import { WorkflowEngineActionTypes, WorkflowEngine } from "./types";

export const initialState:WorkflowEngine = {
    processInstanceId: null,
    processMessage: null,
    task: null
};

const reducer: Reducer<WorkflowEngine> = (state = initialState, action) => {

    switch (action.type) {
        case WorkflowEngineActionTypes.SET_PROCESS:
            return {
                ...state,
                processInstanceId: action.processInstanceId,
                processMessage: action.processMessage
            };
        case WorkflowEngineActionTypes.SET_PROCESS_TASK:
            return {
                ...state,
                task: action.task
            };
        default:
            return state;
    }
}

export default reducer;