package com.gvnc.camunda.flows.model.entity;

import java.util.Objects;

import javax.persistence.MappedSuperclass;

import com.gvnc.camunda.flows.model.BaseModel;


@MappedSuperclass
public abstract class BaseEntity extends BaseModel {

	private static final long serialVersionUID = 1L;

	public abstract Long getId();
	
	public abstract void setId(Long id);

	@Override
	public boolean equals(Object obj) {
		if (this == obj) {
			return true;
		}
		if (obj == null || getClass() != obj.getClass()) {
			return false;
		}
		BaseEntity other = (BaseEntity) obj;
		if (getId() == null || other.getId() == null) {
			return false;
		}
		return Objects.equals(getId(), other.getId());

	}

	@Override
	public int hashCode() {
		return Objects.hash(getId());
	}

}
