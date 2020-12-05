package com.gvnc.camunda.flows.model;

import lombok.Getter;
import lombok.Setter;

public class BngInfo extends BaseModel {

    private static final long serialVersionUID = 1L;

    @Getter
    @Setter
    private String userName;

    @Getter
    @Setter
    private String bngName;

    @Getter
    @Setter
    private String macAddress;

    @Getter
    @Setter
    private String portId;

    @Getter
    @Setter
    private String context;

    @Getter
    @Setter
    private String ipAddress;

    @Getter
    @Setter
    private String lastConnectionDate;

    @Getter @Setter
    private String redbackName;

    @Getter @Setter
    private String source;
}