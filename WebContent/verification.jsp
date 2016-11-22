<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.zy.web.ism.entity.Employee" %>
<%@page import="com.zy.web.ism.mapper.LoginMapper" %>
<%@page import="com.zy.common.ApplicationContextWrapper" %>
<%@page import="java.util.*"%>
<%-- <%@page contentType="text/html; charset=utf-8" %> --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>Insert title here</title>
</head>
<body>
<% 
	Employee userInfo =null;
	Integer QXDJ = -1;
	try{
		userInfo = (Employee)session.getAttribute("authkey");
		
	}catch(Exception e){
		e.printStackTrace();
	}
	//首先检测session中是否有用户信息
	if(userInfo != null){
		QXDJ =  userInfo.getQx(); 
	}else{
		String path = request.getContextPath(); 
		String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/"; 
		String DLXM = request.getParameter("DLXM");//用request得到 
		String ZHBH_STR = request.getParameter("ZHBH");
		Map<String,Object> map=new HashMap<String, Object>();
		LoginMapper loginMapper=ApplicationContextWrapper.getBean(LoginMapper.class);
		if(ZHBH_STR == null){
			System.out.println("获取不到账户编号，请重新登录 ");
		}
		Integer ZHBH =Integer.parseInt(ZHBH_STR);
		userInfo = loginMapper.chaxyhxx(ZHBH);
		QXDJ =  userInfo.getQx(); 
		
	}
	
		String target = request.getParameter("target");
	switch (target){
		case "renygl":
			{
				if(QXDJ == 3){
					request.getRequestDispatcher("WEB-INF/renygl.html").forward(request,response);
				}
				break;
			}
		case "shebgl":
			if(QXDJ == 3)
				request.getRequestDispatcher("WEB-INF/shebgl.html").forward(request,response);
			break;
		case "qyjj":
			if(QXDJ == 3)
				request.getRequestDispatcher("WEB-INF/gongsxx.html").forward(request,response);
			break;
		case "qingjsp":
			if(QXDJ == 3)
				request.getRequestDispatcher("WEB-INF/qingjia-module/daishlb.html").forward(request,response);
			break;	
		
			
	}
	out.clear();
	out = pageContext.pushBody();
%> 
 <%-- <form name="testform">
<jsp:forward page = "/WEB-INF/renygl.html?ZHBH=123" />
</form> --%>
</body>
</html>