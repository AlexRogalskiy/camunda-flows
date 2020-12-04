package com.gvnc.camunda.flows;

import static org.junit.Assert.assertTrue;

import java.util.Properties;

import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import ch.qos.logback.classic.Level;
import ch.qos.logback.classic.Logger;
import ch.qos.logback.classic.LoggerContext;
import ch.qos.logback.classic.encoder.PatternLayoutEncoder;
import ch.qos.logback.classic.spi.ILoggingEvent;
import ch.qos.logback.core.ConsoleAppender;

@TestPropertySource(locations = "classpath:application_dev.properties")
@RunWith(SpringJUnit4ClassRunner.class)
public class BaseTest {

	private static final Logger logger;
	static
	{
		LoggerContext loggerContext = (LoggerContext) LoggerFactory.getILoggerFactory();
		PatternLayoutEncoder ple = new PatternLayoutEncoder();

        ple.setPattern("%d{yyyy-MM-dd/HH:mm:ss.SSS} [%thread] %-5level %logger : %msg%n");
        ple.setContext(loggerContext);
        ple.start();
		
        ConsoleAppender<ILoggingEvent> consoleAppender = new ConsoleAppender<>();
        consoleAppender.setEncoder(ple);
        consoleAppender.setContext(loggerContext);
		consoleAppender.start();
		
		logger = (Logger) LoggerFactory.getLogger(org.slf4j.Logger.ROOT_LOGGER_NAME);
		logger.addAppender(consoleAppender);
		logger.setLevel(Level.INFO);
		logger.setAdditive(false); 

	}

	@BeforeClass
	public static void setSystemParameters() {
		Properties props = System.getProperties();
		props.setProperty("jasypt.encryptor.password", "beelzebub");
	}

	public Logger getLogger() {
		return logger;
	}
	
	@Test
	public void testSetup() {
		assertTrue(true);
	}
}
