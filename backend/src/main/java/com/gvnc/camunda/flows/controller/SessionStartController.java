package com.gvnc.camunda.flows.controller;

import com.gvnc.camunda.flows.annotation.SpecialCharacterNotAllowed;
import com.gvnc.camunda.flows.config.DataService;
import com.gvnc.camunda.flows.model.Modem;
import com.gvnc.camunda.flows.model.NpmInfo;
import com.gvnc.camunda.flows.model.Subscriber;
import com.gvnc.camunda.flows.model.SubscriberSession;
import com.gvnc.camunda.flows.model.request.SubscriberInfo;
import com.gvnc.camunda.flows.model.ui.OperationResponse;
import com.gvnc.camunda.flows.service.SessionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;

@Slf4j
@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" })
@RequestMapping("backendapi/sessionStart")
public class SessionStartController {

	@Autowired
	private SessionService sessionService;

	@Autowired
	private DataService dataService;

	@PostMapping("/initSession")
	public OperationResponse initSession(@RequestBody @Valid SubscriberInfo request) {
		log.info("initSession started");

		OperationResponse response = new OperationResponse();

		SubscriberSession subscriberSession = new SubscriberSession();
		subscriberSession.setSessionId(sessionService.generateSessionId());

		Subscriber subscriber = dataService.getSubscriber(request.getCustomerNo(), request.getSubscriberId());
		subscriberSession.setSubscriber(subscriber);
		sessionService.insert(subscriberSession);
		response.setResponseObject(subscriberSession.getSessionId());
		if (subscriber != null) {
			response.setResult(true);
		}

		log.info("initsession finished. sessionId : {} ", subscriberSession.getSessionId());
		return response;
	}

	@PostMapping("/modemInfo")
	public OperationResponse getModemInfo(
			@RequestHeader @Valid @Size(min = 1, max = 30) @SpecialCharacterNotAllowed String subscriberSessionId) {
		OperationResponse response = new OperationResponse();
		SubscriberSession subscriberSession = sessionService.get(subscriberSessionId);
		if (subscriberSession != null) {
			Modem modem = dataService.getModem();
			sessionService.saveModem(subscriberSessionId, modem);
			response.setResponseObject(modem);
			response.setResult(true);
			return response;
		}
		response.setMessage("SessionNotFound");
		return response;
	}

	@PostMapping("/npmInfo")
	public OperationResponse getNpmInfo(
			@RequestHeader @Valid @Size(min = 1, max = 30) @SpecialCharacterNotAllowed String subscriberSessionId) {
		OperationResponse response = new OperationResponse();
		SubscriberSession subscriberSession = sessionService.get(subscriberSessionId);
		if (subscriberSession != null) {
			NpmInfo npmInfo = dataService.getNpmInfo();
			if (npmInfo != null) {
				sessionService.saveSwitchInfo(subscriberSessionId, npmInfo.getSwitchInfo());
				sessionService.saveBng(subscriberSessionId, npmInfo.getBngInfo());
				response.setResponseObject(npmInfo);
				response.setResult(true);
			} else {
				response.setMessage("NPMSessionNotFound");
			}
		} else {
			response.setMessage("SessionNotFound");
		}
		return response;
	}
}