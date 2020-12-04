package com.gvnc.camunda.flows.model.entity.solid;

import com.gvnc.camunda.flows.model.entity.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class WsParameter extends BaseEntity {

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
	private String description;

	@Getter
	@Setter
	private String username;

	@Getter
	@Setter
	private String password;

	@Getter
	@Setter
	private String endpoint;

	@Getter
	@Setter
	private Integer connectTimeout;

	@Getter
	@Setter
	private Integer readTimeout;

	@Getter
	@Setter
	private Boolean useApiGw;

	@Getter
	@Setter
	private String apiGwEndpoint;

	@Getter
	@Setter
	private Boolean useAuth;

	public String getCallUrl() {
		if (useApiGw) {
			return apiGwEndpoint;
		} else {
			return endpoint;
		}
	}

}
