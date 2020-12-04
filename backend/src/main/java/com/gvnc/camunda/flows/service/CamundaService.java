package com.gvnc.camunda.flows.service;

import com.gvnc.camunda.flows.model.SubscriberSession;
import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.engine.RepositoryService;
import org.camunda.bpm.engine.RuntimeService;
import org.camunda.bpm.engine.TaskService;
import org.camunda.bpm.engine.runtime.ActivityInstance;
import org.camunda.bpm.engine.runtime.ProcessInstance;
import org.camunda.bpm.engine.task.Task;
import org.camunda.bpm.model.bpmn.BpmnModelInstance;
import org.camunda.bpm.model.bpmn.instance.SequenceFlow;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class CamundaService {

    @Autowired
    private RuntimeService runtimeService;

    @Autowired
    private TaskService taskService;

    @Autowired
    private RepositoryService repositoryService;

    @Autowired
    private SessionService sessionService;

    public String startFlow(String processDefinitionKey, String subscriberSessionId){
        log.info("New flow is triggered.[{}]", processDefinitionKey);
        SubscriberSession subscriberSession = sessionService.get(subscriberSessionId);
        Map<String, Object> parametersMap = new HashMap();
        parametersMap.put("subscriberSession", subscriberSession);
        ProcessInstance p = runtimeService.startProcessInstanceByKey(processDefinitionKey, parametersMap);
        log.info("Process initiated. [processDefinitionKey={}, processInstanceId={}]",processDefinitionKey,p.getProcessInstanceId());
        return p.getProcessInstanceId();
    }

    public Task getUserTaskByProcessId(String processId) throws Exception{
        try {
            List<ProcessInstance> processInstances = runtimeService.createProcessInstanceQuery().active().leafProcessInstances().list();
            ProcessInstance process = processInstances.stream().filter(processInstance -> processInstance.getRootProcessInstanceId().equals(processId)).findAny().orElse(null);

            if (process == null) {
                throw new Exception("ProcessNotFound");
            }

            return taskService.createTaskQuery().processInstanceId(process.getProcessInstanceId()).initializeFormKeys().singleResult();
        } catch (Exception e){
            log.warn("Failed to get task list. error : {}" , e.getMessage());
            throw e;
        }
    }

    public Boolean cancelFlow(String processId){
        runtimeService.deleteProcessInstance(processId, "Process cancelled by user.");
        return true;
    }
/*
// belki ilerde ihtiyac olur - performans sorunu yasanirsa diye burada dursun - guvenc

    public Task getUserTaskByProcessId(String processId) throws Exception{
        try {
            List<ProcessInstance> processInstances = runtimeService.createNativeProcessInstanceQuery()
                    .sql("SELECT * from " + managementService.getTableName(ProcessInstance.class) + " P WHERE P.ROOT_PROC_INST_ID_ = #{rootProcessId}")
                    .parameter("rootProcessId", processId)
                    .list();

            ProcessInstance process = runtimeService.createProcessInstanceQuery().processInstanceId(processId).singleResult();

            if (process == null) {
                throw new Exception("ProcessNotFound");
            }

            Task task = taskService.createNativeTaskQuery()
                    .sql("SELECT distinct * from " + managementService.getTableName(Task.class) + " T, "
                            + managementService.getTableName(ProcessInstance.class)
                            + " P WHERE T.SUSPENSION_STATE_ = 1 AND P.ROOT_PROC_INST_ID_ = #{rootProcessId} AND T.PROC_INST_ID_ = P.PROC_INST_ID_")
                    .parameter("rootProcessId", processId)
                    .singleResult();

            if(task != null){ // search task again to initializeFormKeys
                return taskService.createTaskQuery().taskId(task.getId()).initializeFormKeys().singleResult();
            }

            return null;
        } catch (Exception e){
            log.warn("Failed to get task list." + e.getMessage());
            throw e;
        }
    }
    */

    public List<String> getAvailableSignals(Task task){
        // TODO - optimize this to load all possible signals to a global bean on startup - commandliner - guvenc
        List signals = new ArrayList();

        task.getParentTaskId();
        BpmnModelInstance instance = repositoryService.getBpmnModelInstance(task.getProcessDefinitionId());

        Collection<SequenceFlow> sequenceFlows = instance.getModelElementsByType(SequenceFlow.class);
        for (SequenceFlow flow : sequenceFlows) {
            if (flow.getSource().getId().equals(task.getTaskDefinitionKey())) {
                if(flow.getConditionExpression() != null) {
                    log.info("Condition for Seq " + flow.getConditionExpression());
                    signals.add(flow.getName());
                }
            }
        }
        return signals;
    }

    public String getMessageContent(Task task){
        Object messageContent = taskService.getVariable(task.getId(), "messageContent");
        if(messageContent != null){
            return messageContent.toString();
        }
        return null;
    }

    public Object getVariable(Task task, String variableName){
        return taskService.getVariable(task.getId(), variableName);
    }

    private void dummy(){
        String processId = "1241-1414-34-1341";
        ProcessInstance p2 = runtimeService.createProcessInstanceQuery().processInstanceId(processId).singleResult();

        List<Task> taskList = taskService.createTaskQuery().processInstanceId(p2.getProcessDefinitionId()).unlimitedList();
        for (Task t: taskList) {

        }
        ProcessInstance p3 = runtimeService.createProcessInstanceQuery().superProcessInstanceId("fc165b4d-e0d9-11ea-8b3f-f85971307da2").singleResult();

        ActivityInstance activityInstance = runtimeService.getActivityInstance(processId);
        if (activityInstance != null) {
            ActivityInstance [] childActivities = activityInstance.getChildActivityInstances();
            for (ActivityInstance childActivity: childActivities) {
                if (childActivity.getActivityType().equals("callActivity")) {
                    ProcessInstance subProcess = runtimeService.createProcessInstanceQuery().superProcessInstanceId(processId).singleResult();
                    if (subProcess != null) {
                        List list = taskService.createTaskQuery().processInstanceId(subProcess.getProcessInstanceId()).initializeFormKeys().list();
                    }
                }
            }
        }
    }
}
