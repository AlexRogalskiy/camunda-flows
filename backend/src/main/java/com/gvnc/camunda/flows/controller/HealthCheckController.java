package com.gvnc.camunda.flows.controller;


import com.gvnc.camunda.flows.model.SubscriberSession;
import com.gvnc.camunda.flows.repository.redis.SubscriberSessionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
@RequestMapping("healthcheck")
public class HealthCheckController {

    @Autowired
    private SubscriberSessionRepository sessionRepository;

    @GetMapping("/isRunning")
    public Boolean isRunning() {
        return true;
    }

    @GetMapping("/saveRedis")
    public String saveRedis(String sessionId) {
        SubscriberSession subscriberSession = new SubscriberSession();
        subscriberSession.setSessionId(sessionId);
        sessionRepository.insert(subscriberSession);
        return "success";
    }

    @GetMapping("/getRedis")
    public String getRedis(String sessionId) {
        SubscriberSession subscriberSession = sessionRepository.findById(sessionId);
        if(subscriberSession != null)
            return "success";
        return "failed";
    }
}
