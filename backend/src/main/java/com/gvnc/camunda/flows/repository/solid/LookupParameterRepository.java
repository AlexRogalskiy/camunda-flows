package com.gvnc.camunda.flows.repository.solid;

import com.gvnc.camunda.flows.model.entity.solid.LookupParameter;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface LookupParameterRepository extends CrudRepository<LookupParameter, Long> {

	@Cacheable("properties")
	public List<LookupParameter> findByName(String name);

	@Cacheable("properties")
    @Query(value = "select description from LookupParameter where name =:name and parameterValue =:value")
	public String findByNameAndParameterValue(String name, String value);

}
