package com.gvnc.camunda.flows.repository.redis;

import com.gvnc.camunda.flows.model.BngInfo;
import com.gvnc.camunda.flows.model.Modem;
import com.gvnc.camunda.flows.model.SubscriberSession;
import com.gvnc.camunda.flows.model.SwitchInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.PartialUpdate;
import org.springframework.data.redis.core.RedisKeyValueTemplate;
import org.springframework.stereotype.Component;

@Component
public class SubscriberSessionRepository {

    @Autowired
    private RedisKeyValueTemplate redisKeyValueTemplate;

    public void insert(SubscriberSession subscriberSession) {
        redisKeyValueTemplate.insert(subscriberSession.getSessionId(), subscriberSession);
    }

    public SubscriberSession findById(String sessionId) {
        return redisKeyValueTemplate.findById(sessionId, SubscriberSession.class).orElse(null);
    }

    public void saveModem(String sessionId, Modem modem){
        PartialUpdate<SubscriberSession> update = new PartialUpdate(sessionId, SubscriberSession.class)
                .set("modem", modem);

        redisKeyValueTemplate.update(update);
    }

    public void saveSwitchInfo(String sessionId, SwitchInfo switchInfo){
        PartialUpdate<SubscriberSession> update = new PartialUpdate(sessionId, SubscriberSession.class)
                .set("switchInfo", switchInfo);

        redisKeyValueTemplate.update(update);
    }

    public void saveBng(String sessionId, BngInfo bngInfo){
        PartialUpdate<SubscriberSession> update = new PartialUpdate(sessionId, SubscriberSession.class)
                .set("bng", bngInfo);

        redisKeyValueTemplate.update(update);
    }

}
