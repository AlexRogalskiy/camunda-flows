package com.gvnc.camunda.flows.workflow;

import javax.inject.Named;

import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;

@Named(value="WFServiceTask")
@Slf4j
public class WFServiceTask implements JavaDelegate {

    @Override
    public void execute(DelegateExecution arg0) throws Exception {
        log.info("wf service task is called.");
        if(arg0.getVariable("pingUrlAddress") != null){
            String pingUrlAddress = (String) arg0.getVariable("pingUrlAddress");
            log.info("pingUrlAddress : {} ", pingUrlAddress);
        }
        Thread.sleep(3000);
        log.info("wf service task is completed.");
    }
}