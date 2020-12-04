package com.gvnc.camunda.flows.model.entity.solid;

import com.gvnc.camunda.flows.model.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Table(uniqueConstraints=@UniqueConstraint(columnNames = {"name" , "parameterValue"}))
public class LookupParameter extends BaseEntity {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Getter
	@Setter
	private Long id;

	@Getter
	@Setter
	private String name;

	@Getter
	@Setter
	private String parameterValue;

	@Getter
	@Setter
	private String description;
	
	@Getter
	@Setter
	private Boolean encrypted;
}
