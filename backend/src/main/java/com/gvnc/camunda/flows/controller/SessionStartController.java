package com.gvnc.camunda.flows.controller;

import com.gvnc.camunda.flows.annotation.SpecialCharacterNotAllowed;
import com.gvnc.camunda.flows.model.Subscriber;
import com.gvnc.camunda.flows.model.SubscriberSession;
import com.gvnc.camunda.flows.model.request.SubscriberInfo;
import com.gvnc.camunda.flows.model.ui.OperationResponse;
import com.gvnc.camunda.flows.service.SessionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Size;

@Slf4j
@RestController
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:8080" })
@RequestMapping("backendapi/sessionStart")
public class SessionStartController {

	private static final String TEST_CUSTOMER = "54253286"; // "53439075";
	private static final String TEST_SUBSCRIBER = "110041485965";

	@Autowired
	private SessionService sessionService;

	@RequestMapping(value = "/username", method = RequestMethod.GET)
	@ResponseBody
	public String currentUserName(Authentication authentication) {
		authentication.getAuthorities();
		return authentication.getName();
	}

	@PostMapping("/initSession")
	public OperationResponse initSession(@RequestBody @Valid SubscriberInfo request) {
		log.info("initSession started");

		OperationResponse response = new OperationResponse();

		SubscriberSession subscriberSession = new SubscriberSession();
		subscriberSession.setSessionId(sessionService.generateSessionId());

		Subscriber subscriber = null;
		/*
		if (request != null) {
			subscriber = crmService.initSubscriber(request.getCustomerNo(), request.getSubscriberId());
		} else {
			subscriber = crmService.initSubscriber(TEST_CUSTOMER, TEST_SUBSCRIBER);
		}

		 */

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
		/*	Subscriber subscriber = subscriberSession.getSubscriber();
			if (subscriber != null && subscriber.getDataServiceContract() != null
					&& subscriber.getDataServiceContract().getModemContract() != null) {
				Modem modem = hdmService.findModem(subscriber.getDataServiceContract().getModemContract().getSerialNumber());
				sessionService.saveModem(subscriberSessionId, modem);
				response.setResponseObject(modem);
				response.setResult(true);
				return response;
			}

		 */
		}
		response.setMessage("SessionNotFound");
		return response;
	}

}