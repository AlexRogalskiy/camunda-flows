package com.gvnc.camunda.flows.model;

import lombok.Getter;
import lombok.Setter;

public class NpmInfo extends BaseModel{

    private static final long serialVersionUID = 1L;

    @Getter @Setter
    private BngInfo bngInfo;

    @Getter @Setter
    private SwitchInfo switchInfo;

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