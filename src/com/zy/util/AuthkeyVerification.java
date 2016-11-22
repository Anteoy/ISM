package com.zy.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * 权密钥認證
 * @author 周嚴
 *
 */
public class AuthkeyVerification {
	public static Integer AuthkeyVerification(HttpServletRequest request, HttpServletResponse response){
		if(( request.getSession().getAttribute("authkey")) != null){
			return 1;
		}else{
			return 0;
		}
		
	}
}
