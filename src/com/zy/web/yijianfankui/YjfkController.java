package com.zy.web.yijianfankui;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.zy.util.AuthkeyVerification;
import com.zy.web.yijianfankui.entity.Yijfk;
import com.zy.web.yijianfankui.mapper.YijfkMapper;

@Controller
public class YjfkController {

	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;
	
	@Autowired
	private YijfkMapper yijfkMapper;
	
	/**
	 * 获取反馈消息（最近前十条）
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("huoqfkxx")
	public ModelAndView huoqfkxx(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new HashMap<>();
		Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		List<Yijfk> yjfk = yijfkMapper.chaxyjfklist();
		if(yjfk == null){
			map.put("success", 0);
			System.out.println("审核列表为空");
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		map.put("success", 1);
		map.put("data", yjfk);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	
	/**
	 * 匿名上传反馈信息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("shangcfkxx")
	public ModelAndView shangcfkxx(HttpServletRequest request, HttpServletResponse response) {
		String content =request.getParameter("content");
		Map<String, Object> map = new HashMap<>();
		Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		yijfkMapper.chaxrfkxx(content);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
}
