
export interface SessionStart {
	userInfo:any;
	networkDataInitiated:boolean;
	activeTabName: string;
	customerNo: string;
	subscriberId: string;
	sessionId: string;
	modemSerialNumber: string;
	modemInfo: ModemInfo | null;
	switchInfo: SwitchInfo | null;
	bngInfo: BngInfo | null;
}

export interface OperationResponse {
	result: boolean;
	message: string;
	detailedMessage: string;
	sessionId: string;
	responseObject: object | null;
}

export interface ModemInfo {
	activated: boolean;
	ipAddress: string;
	macAddress: string;
	model: string;
	modelName: string;
	oui: string;
	online: boolean;
	productClass: string;
	serialNumber: string;
	vendor: string;
	lastConnectionDate: string;
}

export interface SwitchInfo {
	switchName: string;
	switchPort: string;
	switchIp: string;
	source: string;
}

export interface BngInfo {
	userName: string;
	bngName: string;
	macAddress: string;
	portId: string;
	context: string;
	ipAddress: string;
	lastConnectionDate: string;
	source: string;
}

export interface NpmInfo {
	bngInfo: BngInfo | null;
	switchInfo:SwitchInfo | null;
}

export enum SessionStartActionTypes {
	TAB_CHANGE = "@@sessionStart/TAB_CHANGE",
	INIT_COMPLETED = "@@sessionStart/INIT_COMPLETED",
	SET_USER_INFO = "@@sessionStart/SET_USER_INFO",
	SET_SUBSCRIBER_ID = "@@sessionStart/SET_SUBSCRIBER_ID",
	SET_MODEM_INFO = "@@sessionStart/SET_MODEM_INFO",
	SET_NPM_INFO = "@@sessionStart/SET_NPM_INFO",
	SET_NW_INITIATED = "@@sessionStart/SET_NW_INITIATED"
}