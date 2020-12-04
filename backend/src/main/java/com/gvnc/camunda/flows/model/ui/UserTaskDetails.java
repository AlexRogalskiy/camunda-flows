package com.gvnc.camunda.flows.model.ui;

import lombok.Getter;
import lombok.Setter;
import org.camunda.bpm.engine.rest.dto.task.TaskDto;

import com.gvnc.camunda.flows.model.BaseModel;

import java.util.List;

public class UserTaskDetails extends BaseModel{

  	private static final long serialVersionUID = 1L;

	@Getter @Setter
    private TaskDto taskDto;

    @SuppressWarnings("rawtypes")
	@Getter @Setter
    private List availableSignals;

    @Getter @Setter
    private String messageContent;

    @Getter @Setter
    private String requestLogId;

    @Getter @Setter
    private String requestCreateMessage;
}
