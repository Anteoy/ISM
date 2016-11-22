package com.zy.web.gongsjj;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.zy.util.AuthkeyVerification;
import com.zy.web.gongsjj.entity.Gongsjj;
import com.zy.web.gongsjj.mapper.GongsjjMapper;

@Controller
public class GongsjjController {
	
	Map<String,Object> map;
	
	@Autowired
	private GongsjjMapper gsjjMapper;
	
	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;
	
	/**
	 * 获取公司简介
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("huqgsjj")
	public ModelAndView huqgsjj(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		Gongsjj  gsjj = gsjjMapper.chaxgsjj();//获取最新一条的系统公告信息
		map.put("data", gsjj);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}

	/**
	 * 上传/设置公司简介
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("shangcgsjj")
	public ModelAndView shangcgsjj(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		String zhengw = request.getParameter("zhengw");
		String zhut = request.getParameter("zhut");
		gsjjMapper.shangcwbxf(zhengw,zhut);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
}
