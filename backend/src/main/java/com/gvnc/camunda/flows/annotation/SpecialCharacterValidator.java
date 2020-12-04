package com.gvnc.camunda.flows.annotation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.gvnc.camunda.flows.util.CommonUtils;

public class SpecialCharacterValidator implements ConstraintValidator<SpecialCharacterNotAllowed, String> {

	private int maxLength;

	@Override
	public void initialize(SpecialCharacterNotAllowed constraintAnnotation) {
		ConstraintValidator.super.initialize(constraintAnnotation);
		maxLength = constraintAnnotation.length();
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext cvx) {
		if (CommonUtils.isNotEmpty(value) && value.matches("^[a-zA-Z 0-9\\_]*$") && value.length() <= maxLength) {
			return true;
		} else {
			return false;
		}
	}

}
