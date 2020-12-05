import { Reducer } from "redux";
import { SessionStartActionTypes, SessionStart } from "./types";

export const initialState: SessionStart = {
	userInfo: {},
	networkDataInitiated: false,
	activeTabName: "networkData",
	sessionId: "",
	customerNo: "90078004",
	subscriberId: "664978523186",
	modemSerialNumber: "",
	modemInfo: null,
	switchInfo: null,
	bngInfo: null,
};

const reducer: Reducer<SessionStart> = (state = initialState, action) => {

	switch (action.type) {
		case SessionStartActionTypes.TAB_CHANGE:
			return {
				...state,
				activeTabName: action.activeTabName
			};
		case SessionStartActionTypes.SET_NW_INITIATED:
			return {
				...state,
				networkDataInitiated: action.networkDataInitiated
			};
		case SessionStartActionTypes.INIT_COMPLETED:
			return {
				...state,
				sessionId: action.sessionId
			};
		case SessionStartActionTypes.SET_USER_INFO:
			return {
				...state,
				userInfo: action.userInfo
			};
		case SessionStartActionTypes.SET_SUBSCRIBER_ID:
			return {
				...state,
				customerNo: action.customerNo,
				subscriberId: action.subscriberId
			};
		case SessionStartActionTypes.SET_MODEM_INFO:
			return {
				...state,
				modemInfo: action.modemInfo
			};
		case SessionStartActionTypes.SET_NPM_INFO:
			return {
				...state,
				switchInfo: action.switchInfo,
				bngInfo: action.bngInfo
			};
		default:
			return state;
	}
}

export default reducer;