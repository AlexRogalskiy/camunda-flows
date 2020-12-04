package com.gvnc.camunda.flows.util;

import java.util.Date;
import java.util.UUID;

public class TransactionIdGenerator {

	private TransactionIdGenerator() {
	}

	/**
	 * getTransactionIdId
	 *
	 * @param prefix
	 *            : application transaction id
	 * @param suffix
	 *            : managed server unique id
	 * @param totalLen
	 *            : 19
	 * @return
	 */
	public static String getTransactionIdId(String prefix, String suffix, int totalLen) {
		int len = totalLen - (prefix != null ? prefix.length() : 0) + (suffix != null ? suffix.length() : 0);
		String randomUid = getTransactionIdWithLength(len);
		String trxId = prefix + randomUid + suffix;
		return trxId;
	}

	public static String getSessionId() {
		return getTransactionIdId(new Date().getTime() + "", 19);
	}

	/**
	 * getTransactionIdId
	 *
	 * @param prefix
	 *            : application transaction id
	 * @param totalLen
	 *            : 19
	 * @return
	 */
	public static String getTransactionIdId(String prefix, int totalLen) {
		return getTransactionIdId(prefix, "", totalLen);
	}

	public static String getTransactionIdWithLength(int length) {
		return getTransactionIdWithLength(length, '0');
	}

	public static String getTransactionIdWithLength(int length, char paddingChar) {
		String randomUid = Long.toString(getLongUUID());

		if (randomUid.length() < length) {
			for (int j = randomUid.length(); j < length; j++) {
				randomUid = randomUid + paddingChar;
			}
		} else if (randomUid.length() > length) {
			randomUid = randomUid.substring(randomUid.length() - length, randomUid.length());
		}

		return randomUid;
	}

	public static long getLongUUID() {
		UUID uuid = UUID.randomUUID();
		return Math.abs(uuid.getMostSignificantBits());
	}

}
