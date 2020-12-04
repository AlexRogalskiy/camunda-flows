package com.gvnc.camunda.flows.model.ui;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

public class CheckItem implements Serializable {

	private static final long serialVersionUID = 1L;
	
    @Getter @Setter
    String label;

    @Getter @Setter
    String decoration;
}
