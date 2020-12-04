
export interface SubscriberTask{
  emptyParameter:string;
}

export interface WorkflowAction {
  id: number;
  name: string;
  taskRequired: boolean;
  workflowRequest: WorkflowRequest;
  crmRequestData: CrmRequestData;
}

export interface WorkflowRequest {
  id: number;
  description: string;
}

export interface CrmRequestData {
  id: number;
  biType: string;
  requestName: string;
}

export enum SubscriberTaskActionTypes {
  SET_OPEN_TASK_DETAILS = "@@sessionStart/SET_OPEN_TASK_DETAILS"
}