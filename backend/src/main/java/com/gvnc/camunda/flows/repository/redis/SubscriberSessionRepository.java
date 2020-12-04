package com.gvnc.camunda.flows.repository.redis;

import com.gvnc.camunda.flows.model.SubscriberSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisKeyValueTemplate;
import org.springframework.stereotype.Component;

@Component
public class SubscriberSessionRepository {

    @Autowired
    private RedisKeyValueTemplate redisKeyValueTemplate;

    public void insert(SubscriberSession subscriberSession) {
        //redisTemplate.opsForHash().put(SubscriberSession.class.getName(), subscriberSession.getSessionId(), subscriberSession);
       // redisTemplate.opsForValue().set(subscriberSession.getSessionId(), subscriberSession);
        redisKeyValueTemplate.insert(subscriberSession.getSessionId(), subscriberSession);
    }

    public SubscriberSession findById(String sessionId) {
        return redisKeyValueTemplate.findById(sessionId, SubscriberSession.class).orElse(null);
        //return redisTemplate.opsForValue().get(sessionId);
    }
/*
    public void saveModem(String sessionId, Modem modem){
        PartialUpdate<SubscriberSession> update = new PartialUpdate(sessionId, SubscriberSession.class)
                .set("modem", modem);

        redisKeyValueTemplate.update(update);
    }
*/
}
