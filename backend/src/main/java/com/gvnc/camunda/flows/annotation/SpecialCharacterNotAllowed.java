package com.gvnc.camunda.flows.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = SpecialCharacterValidator.class)
@Target({ ElementType.METHOD, ElementType.TYPE_PARAMETER, ElementType.FIELD, ElementType.ANNOTATION_TYPE,
		ElementType.PARAMETER, ElementType.CONSTRUCTOR, ElementType.TYPE_USE, ElementType.LOCAL_VARIABLE,
		ElementType.PACKAGE, ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
public @interface SpecialCharacterNotAllowed {
	String message() default "Special charachters not allowed";

	public int length() default 200;

	Class<?>[] groups() default {};

	Class<? extends Payload>[] payload() default {};

}
