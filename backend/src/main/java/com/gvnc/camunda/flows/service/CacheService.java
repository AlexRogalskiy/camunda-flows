package com.gvnc.camunda.flows.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@EnableScheduling
public class CacheService {

	@Autowired
	private CacheManager cacheManager;

	@Scheduled(fixedDelay = 3600000) // 3600000 = 1 hour
	public void clearCache() throws RuntimeException {
		try {
			if (cacheManager != null) {
				for (String name : cacheManager.getCacheNames()) {
					Cache cache = cacheManager.getCache(name);
					if (cache != null) {
						cache.clear();
					}
				}
			}
		} catch (Exception e) {
			log.error("clear cache error : {}", e);
			throw new RuntimeException("cache error");
		}
	}

}
