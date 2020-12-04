import { Reducer } from "redux";
import { SubscriberTaskActionTypes, SubscriberTask } from "./types";

export const initialState:SubscriberTask = {
    emptyParameter: ""
};

const reducer: Reducer<SubscriberTask> = (state = initialState, action) => {

    switch (action.type) {
        case SubscriberTaskActionTypes.SET_OPEN_TASK_DETAILS:
            return {
                ...state,
                openTaskList: action.openTaskList
            };
        default:
            return state;
    }
}

export default reducer;