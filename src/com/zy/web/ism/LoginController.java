package com.zy.web.ism;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.zy.web.ism.entity.Employee;
import com.zy.web.ism.mapper.LoginMapper;

@Controller
public class LoginController {

	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;

	@Autowired
	private LoginMapper loginMapper;

	/**
	 * 登陆系统
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("login")
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response){

		String yonghm=request.getParameter("yonghm");
		String mim=request.getParameter("mim");

		Employee userInfo = loginMapper.hqyh(yonghm, mim);
		Map<String,Object> map=new HashMap<String, Object>();
		if (userInfo != null) {
			/**
			 * 登陆成功在session中存入权限密匙
			 */
			request.getSession().setAttribute("authkey", userInfo);
			//更新用户为在线状态
			loginMapper.zaix(userInfo.getBh());
			map.put("xm", userInfo.getXm());
			map.put("zc",userInfo.getZc() );
			map.put("ZHBH", userInfo.getBh());
			map.put("zuihzxsj",userInfo.getZuihzxsj() );
			map.put("touxbh", userInfo.getTouxbh());
			map.put("success", 1);
		} else {
			map.put("success", 0);
		}
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	/**
	 * 注销系统
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("zhux")
	public ModelAndView zhux(HttpServletRequest request, HttpServletResponse response){

		Map<String,Object> map=new HashMap<String, Object>();
		try{
			//拿出当前登陆用户
			Employee userInfo = (Employee) request.getSession().getAttribute("authkey");
			if(userInfo == null){
				map.put("success", 0);
				System.out.println("用户未登陆，不能执行注销操作");
				return new ModelAndView(mappingJacksonJsonView, map);
			}
			//更新数据库在线状态
			loginMapper.zhux(userInfo.getBh());
			//清楚session
			request.getSession().invalidate();
			map.put("success", 1);
		}catch(Exception e){
			map.put("success", 0);
			map.put("error", e.getMessage());
			e.printStackTrace();
		}
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	/**
	 * 用户修改密码
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("xiugmm")
	public ModelAndView xiugmm(HttpServletRequest request, HttpServletResponse response){

		Map<String,Object> map=new HashMap<String, Object>();
		String mim_old = request.getParameter("mim_dangq");
		String mim_new = request.getParameter("mim_xin");
		String bh_String  = request.getParameter("ZHBH");
		if(bh_String == null){
			map.put("success", 0);
			System.out.println("用户未登陆，不能执行修改密码操作");
			map.put("error", "用户未登陆，不能执行修改密码操作");
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		Integer bh = Integer.parseInt(bh_String);
		try{
			//拿出当前登陆用户
			Employee userInfo = (Employee) request.getSession().getAttribute("authkey");
			if(userInfo == null){
				map.put("success", 0);
				System.out.println("用户未登陆，不能执行修改密码操作");
				map.put("error", "用户未登陆，不能执行修改密码操作");
				return new ModelAndView(mappingJacksonJsonView, map);
			}
			if(userInfo.getBh() != bh){
				map.put("success", 0);
				System.out.println("用户未登陆，不能执行修改密码操作");
				map.put("error", "用户未登陆，不能执行修改密码操作");
				return new ModelAndView(mappingJacksonJsonView, map);
			}
			if(userInfo.getMim().equals( mim_old)){
				loginMapper.xiugmm(bh,mim_new);
				map.put("success", 1);
			}else{
				map.put("success", 0);
			}
		}catch(Exception e){
			map.put("success", 0);
			map.put("error", e.getMessage());
			e.printStackTrace();
		}
		return new ModelAndView(mappingJacksonJsonView, map);
	}

	/**
	 * 跳转权限控制
	 */
	@RequestMapping("forward")
	public ModelAndView forward(HttpServletRequest request, HttpServletResponse response){

		Map<String,Object> map=new HashMap<String, Object>();
		String bh_str = request.getParameter("bh");
		if(bh_str == null){
			map.put("success", 0);
			System.out.println("未获取到用户编号");
			map.put("error", "未获取到用户编号，不能执行具有权限跳转的约束操作");
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		Integer bh = Integer.parseInt(bh_str);
		try{
			request.getRequestDispatcher("WEB-INF/qingjia-module/shenhqr.html?bh="+bh).forward(request, response);
			map.put("success", 1);
		}catch(Exception e){
			map.put("success", 0);
			map.put("error", e.getMessage());
			e.printStackTrace();
		}
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	/**
	 * 跳转权限控制
	 */
	@RequestMapping("forwardlb")
	public ModelAndView forwardlb(HttpServletRequest request, HttpServletResponse response){

		Map<String,Object> map=new HashMap<String, Object>();
		try{
			request.getRequestDispatcher("verification.jsp?target=qingjsp").forward(request, response);
			map.put("success", 1);
		}catch(Exception e){
			map.put("success", 0);
			map.put("error", e.getMessage());
			e.printStackTrace();
		}
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	/**
	 * 跳转权限控制
	 */
	@RequestMapping("forwardtz")
	public ModelAndView forwardtz(HttpServletRequest request, HttpServletResponse response){

		Map<String,Object> map=new HashMap<String, Object>();
		try{
			request.getRequestDispatcher("WEB-INF/qingjia-module/chulwctz.html").forward(request, response);
			map.put("success", 1);
		}catch(Exception e){
			map.put("success", 0);
			map.put("error", e.getMessage());
			e.printStackTrace();
		}
		return new ModelAndView(mappingJacksonJsonView, map);
	}
}
