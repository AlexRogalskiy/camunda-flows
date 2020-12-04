package com.gvnc.camunda.flows.service;

import com.gvnc.camunda.flows.model.SubscriberSession;
import com.gvnc.camunda.flows.repository.redis.SubscriberSessionRepository;
import com.gvnc.camunda.flows.util.TransactionIdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SessionService{

    @Autowired
    private SubscriberSessionRepository sessionRepository;

    public void insert(SubscriberSession subscriberSession){
        sessionRepository.insert(subscriberSession);
    }

    public SubscriberSession get(String sessionId){
        return sessionRepository.findById(sessionId);
    }
/*
    public void saveModem(String sessionId, Modem modem){
        sessionRepository.saveModem(sessionId, modem);
    }
*/

    public static String generateSessionId(){
        return TransactionIdGenerator.getSessionId();
    }
}
