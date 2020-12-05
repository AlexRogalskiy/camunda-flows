package com.gvnc.camunda.flows.model;

import lombok.Getter;
import lombok.Setter;

public class Modem extends BaseModel {

    private static final long serialVersionUID = 1L;

    @Getter
    @Setter
    String vendor;

    @Getter
    @Setter
    String productClass;

    @Getter
    @Setter
    String oui;

    @Getter
    @Setter
    String serialNumber;

    @Getter
    @Setter
    String ipAddress;

    @Getter
    @Setter
    String macAddress;

    @Getter
    @Setter
    String model;

    @Getter
    @Setter
    String modelName;

    @Getter
    @Setter
    Boolean online;

    @Getter
    @Setter
    Boolean activated;

    @Getter
    @Setter
    String lastConnectionDate;

}