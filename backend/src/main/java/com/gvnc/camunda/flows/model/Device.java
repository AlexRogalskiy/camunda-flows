package com.gvnc.camunda.flows.model;

import lombok.Getter;
import lombok.Setter;

public class Device extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Getter
	@Setter
	private String vendor;
	@Getter
	@Setter
	private String infrastructure;
	@Getter
	@Setter
	private String protocol;
	@Getter
	@Setter
	private String name;
}
