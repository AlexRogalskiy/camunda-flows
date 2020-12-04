
export interface WorkflowEngine {
  processInstanceId: string|null,
  processMessage: string|null,
  task: any|null
}

export interface Task {

}

export enum WorkflowEngineActionTypes {
  SET_PROCESS = "@@workflowEngine/SET_PROCESS",
  SET_PROCESS_TASK = "@@workflowEngine/SET_PROCESS_TASK"
}