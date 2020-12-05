package com.gvnc.camunda.flows.model;

import lombok.Getter;
import lombok.Setter;

public class SwitchInfo extends BaseModel{
    private static final long serialVersionUID = 1L;

    @Getter
    @Setter
    private String switchName;

    @Getter
    @Setter
    private String switchPort;

    @Getter
    @Setter
    private String switchIp;

    @Getter
    @Setter
    private String switchMacAddress;

    @Getter
    @Setter
    private String oltHostName;

    @Getter
    @Setter
    private String oltIp;

    @Getter
    @Setter
    private String oltVendor;

    @Getter
    @Setter
    private String ont;

    @Getter @Setter
    private String source;
}