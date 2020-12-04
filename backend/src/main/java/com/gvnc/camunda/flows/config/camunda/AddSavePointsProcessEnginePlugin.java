package com.gvnc.camunda.flows.config.camunda;

import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.engine.ProcessEngine;
import org.camunda.bpm.engine.impl.bpmn.parser.BpmnParseListener;
import org.camunda.bpm.engine.impl.cfg.ProcessEngineConfigurationImpl;
import org.camunda.bpm.engine.impl.cfg.ProcessEnginePlugin;
import org.camunda.bpm.spring.boot.starter.configuration.Ordering;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Order(Ordering.DEFAULT_ORDER -1)
public class AddSavePointsProcessEnginePlugin implements ProcessEnginePlugin {

    @Override
    public void preInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
        List<BpmnParseListener> postParseListeners = processEngineConfiguration.getCustomPostBPMNParseListeners();
        if (postParseListeners == null) {
            postParseListeners = new ArrayList<>();
            processEngineConfiguration.setCustomPostBPMNParseListeners(postParseListeners);
        }
        postParseListeners.add(new AddSavePointsParseListener());
    }

    @Override
    public void postInit(ProcessEngineConfigurationImpl processEngineConfiguration) {
        //log.info("postInit !");
    }

    @Override
    public void postProcessEngineBuild(ProcessEngine processEngine) {
        //log.info("postProcessEngineBuild !");
    }

}