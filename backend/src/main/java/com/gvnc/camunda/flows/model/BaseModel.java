package com.gvnc.camunda.flows.model;

import java.io.Serializable;

import com.gvnc.camunda.flows.util.CommonUtils;

public class BaseModel implements Serializable {

	private static final long serialVersionUID = 1L;

	public String toJson() {
		try {
			return CommonUtils.objectToJson(this);
		} catch (Exception e) {
			return this.toString();
		}
	}

}
