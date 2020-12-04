package com.gvnc.camunda.flows.config.camunda;

import lombok.extern.slf4j.Slf4j;
import org.camunda.bpm.engine.impl.bpmn.parser.AbstractBpmnParseListener;
import org.camunda.bpm.engine.impl.bpmn.parser.BpmnParseListener;
import org.camunda.bpm.engine.impl.pvm.process.ActivityImpl;
import org.camunda.bpm.engine.impl.pvm.process.ScopeImpl;
import org.camunda.bpm.engine.impl.util.xml.Element;
import org.camunda.bpm.engine.repository.ProcessDefinition;

@Slf4j
public class AddSavePointsParseListener extends AbstractBpmnParseListener implements BpmnParseListener {

	@Override
	public void parseStartEvent(Element startEventElement, ScopeImpl scope, ActivityImpl startEvent) {
		if (scope instanceof ProcessDefinition) {
			log.info("Adding save point before Start Event '{}", startEvent.getId());
			startEvent.setAsyncBefore(true);
		}
	}

	@Override
	public void parseUserTask(Element userTaskElement, ScopeImpl scope, ActivityImpl userTask) {
		log.info("Adding save point after User Task '{}'", userTask.getId());
		userTask.setAsyncAfter(true);
		userTask.getProperty("deneme");
	}
}
