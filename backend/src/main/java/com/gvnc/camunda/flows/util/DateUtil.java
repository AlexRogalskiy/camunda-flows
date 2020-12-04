package com.gvnc.camunda.flows.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.concurrent.TimeUnit;

import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;

import lombok.extern.slf4j.Slf4j;

import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;

@Slf4j
public class DateUtil {

	// date formats
	public static final String DATE_FORMAT_DATETIME = "dd.MM.yyyy HH:mm:ss";
	public static final String DATE_FORMAT_DATE = "dd.MM.yyyy";
	public static final String DATE_FORMAT_DATETIME_NO_DELIMETER = "ddMMyyyyHHmmss";
	public static final String DATE_FORMAT_DATETIME_NO_DELIMETER_YEAR_FIRST = "yyyyMMddHHmmss";
	public static final String DATE_FORMAT_AKK = "HH:mm yyyy/MM/dd";

	public static Date asDate(final LocalDate localDate) {
		return Date.from(localDate.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
	}

	public static Date asDateTime(final LocalDateTime localDateTime) {
		return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
	}

	public static LocalDate asLocalDate(final Date date) {
		return Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
	}

	public static LocalDateTime asLocalDateTime(final Date date) {
		return Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDateTime();
	}

	public static Date asDate(final XMLGregorianCalendar date) {
		return date == null ? null : date.toGregorianCalendar().getTime();
	}

	public static String toString(LocalDateTime dateTime) {
		return (dateTime == null ? null
				: dateTime.format(java.time.format.DateTimeFormatter.ofPattern(DATE_FORMAT_DATETIME)));
	}

	public static String toString(LocalDateTime dateTime, String format) {
		return (dateTime == null ? null : dateTime.format(java.time.format.DateTimeFormatter.ofPattern(format)));
	}

	public static String toString(Date date, String format) {
		String dateStr = null;
		if (date != null) {
			DateTime dateTime = new DateTime(date);
			dateStr = dateTime.toString(format);
		}
		return dateStr;
	}

	public static String toString(Object date, String format) {
		return toString((Date) date, format);
	}

	public static String toString(final Date date) {
		return toString(date, true);
	}

	public static String toString(final Date date, final boolean includeTime) {
		if (includeTime) {
			return date == null ? null : toString(date, DateUtil.DATE_FORMAT_DATETIME);
		}
		return date == null ? null : toString(date, DateUtil.DATE_FORMAT_DATE);
	}

	public static String toString(final XMLGregorianCalendar date) {
		return date == null ? null : toString(date.toGregorianCalendar().getTime());
	}

	public static Date convertToDate(XMLGregorianCalendar calendar) {
		Date date = null;
		if (calendar != null) {
			date = calendar.toGregorianCalendar().getTime();
		}
		return date;
	}

	public static LocalDateTime convertToLocalDateTime(XMLGregorianCalendar calendar) {
		LocalDateTime date = null;
		if (calendar != null) {
			ZonedDateTime utcZoned = calendar.toGregorianCalendar().toZonedDateTime()
					.withZoneSameInstant(ZoneId.of("UTC"));
			date = utcZoned.toLocalDateTime();
		}
		return date;
	}

	public static LocalDateTime toDate(String dateStr, String format) {
		return (dateStr == null ? null
				: LocalDateTime.parse(dateStr, java.time.format.DateTimeFormatter.ofPattern(format)));
	}

	public static boolean isSameDay(Date date1, Date date2) {
		if (date1 == null || date2 == null) {
			throw new IllegalArgumentException("The date must not be null");
		}
		String dateStr1 = toString(date1, DateUtil.DATE_FORMAT_DATE);
		String dateStr2 = toString(date2, DateUtil.DATE_FORMAT_DATE);
		return dateStr1.equals(dateStr2);

	}

	public static boolean isDateValid(final String dateStr, final String format) {
		if (dateStr != null && !"".equals(dateStr)) {
			DateFormat formatter = new SimpleDateFormat(format);
			try {
				formatter.parse(dateStr);
			} catch (ParseException e) {
				return false;
			}

		}
		return true;
	}

	public static Date addDay(Date date, int day) {
		if (date != null) {
			DateTime dateTime = new DateTime(date);
			dateTime = dateTime.plusDays(day);
			return dateTime.toDate();
		}
		return date;
	}

	public static Date subMonth(Date date, int months) {
		if (date != null) {
			DateTime dateTime = new DateTime(date);
			dateTime = dateTime.minusMonths(months);
			return dateTime.toDate();
		}
		return date;
	}

	public static Date addMinute(final Date date, final int minute) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MINUTE, minute);
		return cal.getTime();
	}

	public static Date addHour(final Date date, final int hour) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.HOUR_OF_DAY, hour);
		return cal.getTime();
	}

	public static Date addDays(final Date date, final int day) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.DAY_OF_YEAR, day);
		return cal.getTime();
	}

	public static Date addMonths(final Date date, final int month) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.MONTH, month);
		return cal.getTime();
	}

	public static Date addYears(final Date date, final int year) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.add(Calendar.YEAR, year);
		return cal.getTime();
	}

	public static Date truncDay(final Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		truncDayOfCalendar(cal);
		return cal.getTime();
	}

	public static Date truncMonth(final Date date, final boolean withTime) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH, 1);
		if (withTime) {
			truncDayOfCalendar(cal);
		}
		return cal.getTime();
	}

	public static Date truncYear(final Date date, final boolean withTime) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_YEAR, 1);
		if (withTime) {
			truncDayOfCalendar(cal);
		}
		return cal.getTime();
	}

	public static void truncDayOfCalendar(final Calendar cal) {
		cal.set(Calendar.HOUR_OF_DAY, 0);
		cal.set(Calendar.MINUTE, 0);
		cal.set(Calendar.SECOND, 0);
		cal.set(Calendar.MILLISECOND, 0);
	}

	public static XMLGregorianCalendar convertToXmlDate(final Date inDate) {
		if (inDate == null) {
			return null;
		}
		GregorianCalendar cal = new GregorianCalendar();
		cal.setTime(inDate);
		try {
			XMLGregorianCalendar xmlCalender = DatatypeFactory.newInstance().newXMLGregorianCalendar(cal);
			return xmlCalender;
		} catch (Exception e) {
			log.error("DatatypeConfigurationException : {} ", e.getMessage());
		}
		return null;
	}

	public static long daysBetween(final Date firstDate, final Date secondDate) {
		final LocalDate date1 = asLocalDate(firstDate);
		final LocalDate date2 = asLocalDate(secondDate);
		final long days = ChronoUnit.DAYS.between(date1, date2);
		return days;
	}

	public static long daysBetween(final LocalDate date1, final LocalDate date2) {
		final long days = ChronoUnit.DAYS.between(date1, date2);

		return days;
	}

	public static long getDateDiff(Date date1, Date date2, TimeUnit timeUnit) {
		long diffInMillies = date2.getTime() - date1.getTime();
		return timeUnit.convert(diffInMillies, TimeUnit.MILLISECONDS);
	}

	public static XMLGregorianCalendar convertToXMLGregorianCalendar(String date, String format) {
		XMLGregorianCalendar xmlGregorianCalendar = null;
		try {
			DatatypeFactory dataTypeFactory = DatatypeFactory.newInstance();
			DateTimeFormatter formatter = DateTimeFormat.forPattern(format);
			DateTime dateTime = DateTime.parse(date, formatter);
			xmlGregorianCalendar = dataTypeFactory.newXMLGregorianCalendar(dateTime.toGregorianCalendar());
		} catch (Exception e) {
			log.error("Exception in conversion of DateTime to XMLGregorianCalendar. Error:  {} ", e);
		}
		return xmlGregorianCalendar;
	}

	public static XMLGregorianCalendar convertToXMLGregorianCalendar(Date date, String format) {
		XMLGregorianCalendar xmlGregorianCalendar = null;
		try {
			DatatypeFactory dataTypeFactory = DatatypeFactory.newInstance();
			DateTime dateTime = new DateTime(date);
			xmlGregorianCalendar = dataTypeFactory.newXMLGregorianCalendar(dateTime.toGregorianCalendar());
		} catch (Exception e) {
			log.error("Exception in conversion of DateTime to XMLGregorianCalendar. Error:  {} ", e);
		}
		return xmlGregorianCalendar;
	}

}
