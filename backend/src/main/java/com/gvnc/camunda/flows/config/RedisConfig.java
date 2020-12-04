package com.gvnc.camunda.flows.config;

import com.gvnc.camunda.flows.model.SubscriberSession;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;

@Configuration
public class RedisConfig {

    // RedisTemplate kullanilmiyor, onun yerine RedisKeyValueTemplate kullanildi, ancak tekrar ihtiyac olabilir
    @Bean
    public RedisTemplate<String, SubscriberSession> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, SubscriberSession> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);
        template.setValueSerializer(new Jackson2JsonRedisSerializer(SubscriberSession.class));
        // Add some specific configuration here. Key serializers, etc.
        return template;
    }

    // RedisKeyValueTemplate otomatik olarak olusturuluyor - Autowired ile kullanilabilir
}
