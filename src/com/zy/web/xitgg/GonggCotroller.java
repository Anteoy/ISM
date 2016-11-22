package com.zy.web.xitgg;

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
import com.zy.web.xitgg.entity.Gongg;
import com.zy.web.xitgg.mapper.GonggMapper;

@Controller
public class GonggCotroller {
	
	Map<String,Object> map;
	
	@Autowired
	private GonggMapper ggMapper;
	
	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;
	
	/**
	 * 获取系统公告List
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("huqgg")
	public ModelAndView huqwbxf(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		Gongg  ggxx = ggMapper.chaxgg();//获取最新一条的系统公告信息
		map.put("data", ggxx);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}

	/**
	 * 上传/设置系统公告
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("shezxtgg")
	public ModelAndView shangcwbxf(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		String ggnr = request.getParameter("ggnr");
		//ggMapper.shangcwbxf(ljdz,zhut);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
}
