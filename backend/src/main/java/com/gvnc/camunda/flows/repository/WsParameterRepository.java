package com.gvnc.camunda.flows.repository;

import com.gvnc.camunda.flows.model.entity.WsParameter;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface WsParameterRepository extends CrudRepository<WsParameter, Long>{

	@Cacheable("properties")
	public List<WsParameter> findByName(String name);
}
