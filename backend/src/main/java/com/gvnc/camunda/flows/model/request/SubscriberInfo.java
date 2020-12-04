package com.gvnc.camunda.flows.model.request;

import com.gvnc.camunda.flows.annotation.NumericParameter;

import lombok.Getter;
import lombok.Setter;

public class SubscriberInfo extends BaseRequest {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	@NumericParameter
	private String customerNo;
	
	@Getter
	@Setter
	@NumericParameter
	private String subscriberId;

}