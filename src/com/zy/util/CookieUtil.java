package com.zy.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
/**
 * 获取Cokkie工具类
 * @author 周嚴
 *
 */
public class CookieUtil {

	public static String getCookie(HttpServletRequest request, String key) {
		if (key == null || key.length() == 0) return null;
		Cookie[] cookies = request.getCookies();
		for (int i = 0; i < cookies.length; i++) {
			Cookie cookie = cookies[i];
			if (key.equals(cookie.getName())) {
				return cookie.getValue();
			}
		}
		return null;
	}

}
