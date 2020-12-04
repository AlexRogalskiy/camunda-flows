package com.gvnc.camunda.flows.model.request;

import com.gvnc.camunda.flows.model.BaseModel;

import lombok.Getter;
import lombok.Setter;

public class BaseRequest extends BaseModel{

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private String sessionId;
}
