
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
	openTaskList: FoxTask[];
	quotaInfo : QuotaInfo | null;
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

export interface FoxTask {
	taskId: string;
	taskStatus: string;
	taskStatusCode: string;
	serviceId: string;
	taskTarihi: string;
	taskIdCode: string;
	taskBildirenAdi: string;
	taskBildirenGrubu: string;

	emptorRequestId: string;
	emptorSubRequestId: string;
	descriptionDetail: string;
	baglantiProblemiDetay: string;
	nfInfrastructure: string;

	isInvalid: boolean;
	isRunning: boolean;
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

export interface QuotaInfo {
	quotaExceed: boolean;
	jokerKotaExist: boolean;
	quatoUsageList: QuotaUsageInfo[];
}

export interface QuotaUsageInfo {
	serviceId: string;
	serviceDefinition: string;
	quotaExceed: boolean;
	download: string;
	upload: string;
	total: string;
	extraDescription : string;
}

export enum SessionStartActionTypes {
	TAB_CHANGE = "@@sessionStart/TAB_CHANGE",
	INIT_COMPLETED = "@@sessionStart/INIT_COMPLETED",
	SET_USER_INFO = "@@sessionStart/SET_USER_INFO",
	SET_SUBSCRIBER_ID = "@@sessionStart/SET_SUBSCRIBER_ID",
	SET_MODEM_INFO = "@@sessionStart/SET_MODEM_INFO",
	SET_OPEN_TASK_DETAILS = "@@sessionStart/SET_OPEN_TASK_DETAILS",
	SET_NPM_INFO = "@@sessionStart/SET_NPM_INFO",
	SET_QUOTA_INFO = "@@sessionStart/SET_QUOTA_INFO",
	SET_NW_INITIATED = "@@sessionStart/SET_NW_INITIATED"
}