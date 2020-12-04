package com.gvnc.camunda.flows.annotation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.gvnc.camunda.flows.util.CommonUtils;

public class NumericValueValidator implements ConstraintValidator<NumericParameter, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext cvx) {
		if (CommonUtils.isNotEmpty(value) && value.matches("\\d+") && value.length() <= 20) {
			return true;
		} else {
			return false;
		}
	}

}
