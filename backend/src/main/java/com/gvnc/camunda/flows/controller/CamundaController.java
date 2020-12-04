package com.gvnc.camunda.flows.controller;

import com.gvnc.camunda.flows.model.ui.OperationResponse;
import com.gvnc.camunda.flows.model.ui.UserTaskDetails;
import com.gvnc.camunda.flows.service.CamundaService;
import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.engine.rest.dto.task.TaskDto;
import org.camunda.bpm.engine.task.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RequestMapping("backendapi/camunda")
public class CamundaController {

    @Autowired
    private CamundaService camundaService;

    @PostMapping("/startFlow/{processDefinitionKey}")
    public String startFlow(@PathVariable String processDefinitionKey, @RequestBody String subscriberSessionId){
        return camundaService.startFlow(processDefinitionKey, subscriberSessionId);
    }

    @GetMapping("/task")
    public OperationResponse getTaskList(@RequestParam String processInstanceId) {
        log.debug("query task list.");
        try {
            UserTaskDetails userTaskDetails = new UserTaskDetails();
            Task task = camundaService.getUserTaskByProcessId(processInstanceId);
            if(task != null){
                log.debug("task found for processInstanceId " + processInstanceId);
                TaskDto taskDto = TaskDto.fromEntity(task);
                userTaskDetails.setTaskDto(taskDto);

                List<String> availableSignals = camundaService.getAvailableSignals(task);
                userTaskDetails.setAvailableSignals(availableSignals);

                String messageContent = camundaService.getMessageContent(task);
                userTaskDetails.setMessageContent(messageContent);

                String requestLogId = (String)camundaService.getVariable(task, "requestLogId");
                userTaskDetails.setRequestLogId(requestLogId);

                String requestCreateMessage = (String)camundaService.getVariable(task, "requestCreateMessage");
                userTaskDetails.setRequestCreateMessage(requestCreateMessage);
            }
            return new OperationResponse(true, "Successful", null, userTaskDetails);
        }catch (Exception e){
            if(e.getMessage().equals("ProcessNotFound")){
                log.warn(e.getMessage());
            } else {
                log.error(e.getMessage());
            }
            return new OperationResponse(false, e.getMessage(), null, null);
        }
    }

    @PostMapping("/cancelProcess/{processInstanceId}")
    public OperationResponse cancelProcess(@PathVariable String processInstanceId) {
        camundaService.cancelFlow(processInstanceId);
        return new OperationResponse(true, "cancel.success", null, null);
    }
}