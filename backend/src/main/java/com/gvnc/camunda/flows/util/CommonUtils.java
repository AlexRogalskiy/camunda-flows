package com.gvnc.camunda.flows.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.Clob;
import java.sql.SQLException;
import java.text.CharacterIterator;
import java.text.DecimalFormat;
import java.text.Normalizer;
import java.text.NumberFormat;
import java.text.StringCharacterIterator;
import java.util.Date;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.slf4j.MDC;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public final class CommonUtils {

	private static final String LOG4J_TRANSACTION_KEY = "Solid";
	private static final Gson GSON = new Gson();

	private static final String[] IP_HEADER_CANDIDATES = { "X-Forwarded-For", "Proxy-Client-IP", "WL-Proxy-Client-IP",
			"HTTP_X_FORWARDED_FOR", "HTTP_X_FORWARDED", "HTTP_X_CLUSTER_CLIENT_IP", "HTTP_CLIENT_IP",
			"HTTP_FORWARDED_FOR", "HTTP_FORWARDED", "HTTP_VIA", "REMOTE_ADDR", "X-FORWARDED-FOR" };

	private CommonUtils() {
		super();
	}

	public static boolean isEmpty(final String str) {
		return (str == null || str.isBlank());
	}

	public static boolean isNotEmpty(final String str) {
		return (str != null && !str.isBlank());
	}

	public static Object nvl(Object param, Object defVal) {
		if (param == null) {
			return defVal;
		}
		return param;
	}

	public static String nvlStr(Object param, Object defVal) {
		return (String) nvl(param, defVal);
	}

	public static <T> boolean isListEmpty(List<T> list) {
		boolean isEmpty = false;
		if (list == null || list.isEmpty()) {
			isEmpty = true;
		}
		return isEmpty;
	}

	public static <T> boolean isListNotEmpty(List<T> list) {
		return !isListEmpty(list);
	}

	public static <T> boolean isListEmpty(Object[] list) {
		boolean isEmpty = false;
		if (list == null || list.length == 0) {
			isEmpty = true;
		}
		return isEmpty;
	}

	public static <T> boolean isListEmpty(Set<T> list) {
		boolean isEmpty = false;
		if (list == null || list.isEmpty()) {
			isEmpty = true;
		}
		return isEmpty;
	}

	public static <T> Object getObject(List<T> list, Object searchObject) {
		if (!isListEmpty(list)) {
			if (list.contains(searchObject)) {
				return list.get(list.indexOf(searchObject));
			}
		}
		return null;
	}

	public static String objectToJson(Object value) {
		return GSON.toJson(value);
	}

	public static BigDecimal scale2(String input) {
		if (input == null) {
			return null;
		}
		try {
			return scale2(new BigDecimal(input.replace(',', '.')));
		} catch (Exception e) {
			return scale2(new BigDecimal(input.replace('.', ',')));
		}
	}

	public static BigDecimal scale2(BigDecimal input) {
		if (input == null) {
			return null;
		}
		return input.setScale(2, RoundingMode.HALF_EVEN);
	}

	public static Long convertToLong(String input) {
		Long number = null;
		if (input != null && StringUtils.isNumeric(input)) {
			number = Long.parseLong(input);
		}
		return number;

	}

	public static boolean areObjectsEqual(Object object1, Object object2) {
		return areObjectsEqual(object1, object2, null);
	}

	public static boolean isNumeric(String str) {
		boolean isNumeric = false;
		if (str != null && !str.isEmpty()) {
			isNumeric = StringUtils.isNumeric(str);
		}
		return isNumeric;
	}

	public static boolean areObjectsEqual(Object object1, Object object2, String format) {
		boolean result = false;
		try {
			if (object1 == null && object2 == null) {
				result = true;
			} else if ((object1 != null && object2 == null) || (object1 == null && object2 != null)) {
				result = false;
			} else if (object1.equals(object2)) {
				result = true;
			} else if (!object1.getClass().equals(object2.getClass())) {
				if (object1.toString().equals(object2.toString())) {
					result = true;
				}
				// date tipinde ise formatlayip karsilastir
				else if (Date.class.isAssignableFrom(object1.getClass())) {
					if (format == null) {
						format = DateUtil.DATE_FORMAT_DATETIME;
					}
					if (DateUtil.toString(object1, format).equalsIgnoreCase(DateUtil.toString(object2, format))) {
						result = true;

					}
				}
			}
		} catch (Exception e) {
			log.error("CommonUtils.areObjectsEqual error : {} {}", e.getMessage(), e);
		}
		return result;
	}

	public static final BigDecimal ONE_HUNDRED = new BigDecimal(100);

	public static BigDecimal percentage(BigDecimal base, BigDecimal pct) {
		return base.multiply(pct).divide(ONE_HUNDRED);
	}

	public static String convertDecimalToString(BigDecimal value, String format) {
		if (value != null) {
			NumberFormat formatter = new DecimalFormat(format);
			String result = formatter.format(value);
			return result;
		}
		return null;
	}

	public static String trimToLength(final String str, int len) {
		return str == null || str.length() <= len ? str : str.substring(0, len);
	}

	public static void setLogIdentifier(String logKey) {
		try {
			MDC.put(LOG4J_TRANSACTION_KEY, logKey);
		} catch (Exception e) {
			log.error("MDC ERROR : {} ", e.getMessage());
		}
	}

	public static void clearLogIdentifier() {
		try {
			MDC.remove(LOG4J_TRANSACTION_KEY);
		} catch (Exception e) {
			log.error("MDC ERROR : {} ", e.getMessage());
		}
	}

	public static String getClientIpAddress(HttpServletRequest request) {
		for (int i = 0; i < IP_HEADER_CANDIDATES.length; i++) {
			String ip = request.getHeader(IP_HEADER_CANDIDATES[i]);
			if (ip != null && ip.length() != 0 && !"unknown".equalsIgnoreCase(ip)) {
				return ip;
			}
		}
		return request.getRemoteAddr();
	}

	public static String clobToString(final Clob data) {
		final StringBuilder sb = new StringBuilder();
		BufferedReader br = null;
		try {
			final Reader reader = data.getCharacterStream();
			br = new BufferedReader(reader);

			int b;
			while (-1 != (b = br.read())) {
				sb.append((char) b);
			}
		} catch (SQLException e) {
			log.error("SQLExp. Could not convert CLOB to string", e);
			return e.toString();
		} catch (IOException e) {
			log.error("IOExp. Could not convert CLOB to string", e);
			return e.toString();
		} finally {
			if (br != null) {
				try {
					br.close();
				} catch (IOException e) {
					log.error("IOExp. Stream Close Error.", e);
				}
			}
		}

		return sb.toString();
	}

	public static boolean isValidMSISDN(final String msisdn) {
		if (msisdn == null || msisdn.trim().length() != 10)
			return false;

		return isNumeric(msisdn);
	}

	public static boolean isValidTckn(final String tckn) {
		boolean isValid = true;
		long tcknNr = 0;
		if (tckn == null || tckn.trim().length() != 11) {
			isValid = false;
		} else {
			try {
				tcknNr = Long.parseLong(tckn);
				if ((tcknNr <= 0) || ("0".equals(tckn.substring(0, 1)))
						|| (Long.parseLong(tckn.substring(10, 11)) % 2 != 0)
						|| ((Long.parseLong(tckn.substring(0, 1)) + Long.parseLong(tckn.substring(1, 2))
								+ Long.parseLong(tckn.substring(2, 3)) + Long.parseLong(tckn.substring(3, 4))
								+ Long.parseLong(tckn.substring(4, 5)) + Long.parseLong(tckn.substring(5, 6))
								+ Long.parseLong(tckn.substring(6, 7)) + Long.parseLong(tckn.substring(7, 8))
								+ Long.parseLong(tckn.substring(8, 9)) + Long.parseLong(tckn.substring(9, 10)))
								% 10 != Long.parseLong(tckn.substring(10, 11)))
						|| (((7 * (Long.parseLong(tckn.substring(0, 1)) + Long.parseLong(tckn.substring(2, 3))
								+ Long.parseLong(tckn.substring(4, 5)) + Long.parseLong(tckn.substring(6, 7))
								+ Long.parseLong(tckn.substring(8, 9))))
								- (Long.parseLong(tckn.substring(1, 2)) + Long.parseLong(tckn.substring(3, 4))
										+ Long.parseLong(tckn.substring(5, 6)) + Long.parseLong(tckn.substring(7, 8))))
								% 10 != Long.parseLong(tckn.substring(9, 10)))) {
					isValid = false;
				}
			} catch (NumberFormatException e) {
				isValid = false;
			}
		}
		return isValid;
	}

	public static boolean isValidEntry(final String entry, int minLen, int maxLen, boolean isNumeric) {
		boolean result = false;
		if (!isEmpty(entry) && entry.length() >= minLen && entry.length() <= maxLen) {
			if (isNumeric) {
				result = isNumeric(entry);
			} else {
				result = true;
			}
		}
		return result;
	}

	public static String toJson(final Object request) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		mapper.setSerializationInclusion(Include.NON_EMPTY);
		if (request != null) {
			try {
				return mapper.writeValueAsString(request);
			} catch (Exception e) {
				log.error("setInParameters : {} {} ", e.getMessage(), e);
				return "ERROR";
			}
		}
		return null;
	}

	public static String maskAll(final String plaintext) {
		return mask(plaintext, true, true);
	}

	public static String mask(final String plaintext) {
		return mask(plaintext, false, true);
	}

	public static String maskUserFriendly(final String plaintext) {
		return mask(plaintext, false, false);
	}

	private static String mask(final String plaintext, boolean maskAll, boolean shortify) {
		if (plaintext == null) {
			return null;
		}
		int startlen, endlen = 0;
		int total = plaintext.length();
		StringBuffer maskedbuf = new StringBuffer(total);
		if (maskAll) {
			startlen = 0;
			endlen = 0;
		} else if (total > 8) {
			startlen = 2;
			endlen = 2;
		} else if (total > 6) {
			startlen = 2;
			endlen = 1;
		} else if (total > 4) {
			startlen = 1;
			endlen = 1;
		} else {
			startlen = 0;
			endlen = 0;
		}
		int masklen = total - (startlen + endlen);
		maskedbuf.append(plaintext.substring(0, startlen));
		if (masklen < 6 || !shortify) {
			for (int i = 0; i < masklen; i++) {
				maskedbuf.append('*');
			}
		} else {
			maskedbuf.append("**[");
			maskedbuf.append(masklen - 4);
			maskedbuf.append("]**");
		}
		maskedbuf.append(plaintext.substring(startlen + masklen, total));
		String masked = maskedbuf.toString();
		return masked;
	}

	public static String toString(final Long item) {
		return item == null ? null : item.toString();
	}

	public static String toString(final Integer item) {
		return item == null ? null : item.toString();
	}

	public static String toString(final BigDecimal amount) {
		if (amount == null) {
			return null;
		}
		return amount.toString();
	}

	public static String injectParamsToText(String text, String[] smsParamArray) {
		if (!CommonUtils.isEmpty(text)) {
			if (smsParamArray != null) {
				for (int index = 0; index < smsParamArray.length; index++) {
					try {
						if (smsParamArray[index] != null) {
							text = text.replaceAll("\\{" + index + "\\}", smsParamArray[index]);
						}
					} catch (Exception e) {
						log.trace("Could not injectParamsToText.", e);
					}
				}
				// do it again for recursion. param in another param
				if (text.indexOf('{') > -1) {
					for (int index = 0; index < smsParamArray.length; index++) {
						try {
							if (smsParamArray[index] != null) {
								text = text.replaceAll("\\{" + index + "\\}", smsParamArray[index]);
							}
						} catch (Exception e) {
							log.trace("Could not injectParamsToText.", e);
						}
					}
				}
			}
			text = cleanEmptyParams(text);
		}
		return text;
	}

	public static String cleanEmptyParams(String smsMessage) {
		if (smsMessage == null) {
			return null;
		}
		return smsMessage.replaceAll("\\{..\\}", "").replaceAll("\\{.\\}", "");
	}

	private static char[] TURKISH_CHARS = { 304, 305, 214, 246, 220, 252, 199, 231, 286, 287, 350, 351 };
	private static char[] ENGLISH_CHARS = { 'I', 'i', 'O', 'o', 'U', 'u', 'C', 'c', 'G', 'g', 'S', 's' };

	public static String convertTurkishToEnglish(String inputStr) {
		String resultStr = inputStr;
		if (resultStr == null) {
			return null;
		}

		for (int code = 0; code < TURKISH_CHARS.length; code++) {
			resultStr = resultStr.replace(TURKISH_CHARS[code], ENGLISH_CHARS[code]);
		}
		return resultStr;
	}

	public static String convertChars(String input) {
		if (!CommonUtils.isEmpty(input)) {
			return Normalizer.normalize(input, Normalizer.Form.NFD).replaceAll("[^\\p{ASCII}]", "");
		}
		return "";
	}

	public static String encodeUrlParam(String value) throws UnsupportedEncodingException {
		return URLEncoder.encode(convertChars(value), StandardCharsets.UTF_8.toString());
	}

	public static boolean isLong(String s) {
		try {
			Long.parseLong(s);
			return true;
		} catch (Exception e) {
			log.info("wrong string entered, it is not numeric : {}", s);
			return false;
		}

	}

	public static String formatMacAddress(String macAddress) {
		log.debug("formatMacAddress : {}", macAddress);
		String formattedMacAddress = "";
		try {
			String[] macArray = macAddress.split(":");
			if (macArray.length > 1) {
				formattedMacAddress = macAddress.replaceAll(":", "-");
			} else {
				formattedMacAddress = macAddress.replaceAll("-", ":");
			}
		} catch (Exception e) {
			log.error("Failed to format mac address. Error : {} ", e);
		}
		log.debug("FormattedMacAddress : {} ", formattedMacAddress);
		return formattedMacAddress;
	}
	
	public static String getHumanReadableByteCount(long bytes) {
		long absB = bytes == Long.MIN_VALUE ? Long.MAX_VALUE : Math.abs(bytes);
		if (absB < 1024) {
			return bytes + " (B)";
		}
		long value = absB;
		CharacterIterator ci = new StringCharacterIterator("KMGTPE");
		for (int i = 40; i >= 0 && absB > 0xfffccccccccccccL >> i; i -= 10) {
			value >>= 10;
			ci.next();
		}
		value *= Long.signum(bytes);
		return String.format("%.1f (%cB)", value / 1024.0, ci.current());
	}

}
