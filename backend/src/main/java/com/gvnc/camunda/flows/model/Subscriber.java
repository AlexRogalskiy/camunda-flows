package com.gvnc.camunda.flows.model;

import java.util.ArrayList;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
public class Subscriber extends BaseModel {

	private static final long serialVersionUID = 1L;

	@Getter @Setter
	private String customerNo;
	
	@Getter @Setter
	private String serviceId;

	@Getter @Setter
	private String segment;

	@Getter @Setter
	private String customerName;

	@Getter @Setter
	private String customerId;

	@Getter @Setter
	private String mobilePhone;

	@Override
	public String toString() {
		return "Subscriber [customerNo=" + customerNo + ", serviceId=" + serviceId + "]";
	}
	
}
