package com.gvnc.camunda.flows.model.ui;

import com.gvnc.camunda.flows.model.BaseModel;

import lombok.Getter;
import lombok.Setter;


public class OperationResponse extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private boolean result;

	@Getter
	@Setter
	private String message;

	@Getter
	@Setter
	private String detailedMessage;

	@Getter
	@Setter
	private Object responseObject;

	public OperationResponse() {
		super();
		this.result = false;
	}

	public OperationResponse(boolean result, String message, String detailedMessage, Object responseObject) {
		this.result = result;
		this.message = message;
		this.detailedMessage = detailedMessage;
		this.responseObject = responseObject;
	}
}
