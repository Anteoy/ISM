package com.zy.common;


import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import org.springframework.web.context.support.WebApplicationContextUtils;
/**
 * 自定义一个HttpServlet，在init方法中通过传入的ServletConfig和WebApplicationContextUtils来设置ApplicationContextWrapper
 * @author 周嚴
 *
 */
public class ApplicationContextLoaderServlet extends HttpServlet {

	private static final long serialVersionUID = 8272081207986219700L;

	public void init(ServletConfig config) throws ServletException {
		ApplicationContextWrapper.setApplicationContext(WebApplicationContextUtils
						.getWebApplicationContext(config.getServletContext()));
	}

}
