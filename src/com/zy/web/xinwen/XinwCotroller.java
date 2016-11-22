package com.zy.web.xinwen;

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
import com.zy.web.xinwen.entity.Neibxw;
import com.zy.web.xinwen.entity.Waibxw;
import com.zy.web.xinwen.mapper.XinwMapper;

@Controller
public class XinwCotroller {
	
	Map<String,Object> map;
	@Autowired
	private XinwMapper xinwMapper;
	
	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;
	
	/**
	 * 获取外部新闻List
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("huqwbxw")
	public ModelAndView huqwbxf(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		List<Waibxw> waibxwl = xinwMapper.chaxwbxw();//获取限制条数的外部新闻
		map.put("data", waibxwl);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}

	/**
	 * 上传外部新闻List
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("shangcwbxf")
	public ModelAndView shangcwbxf(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		String ljdz = request.getParameter("ljdz");
		String zhut = request.getParameter("zhut");
		xinwMapper.shangcwbxf(ljdz,zhut);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	/**
	 * 获取内部新闻List
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("huqnbxw")
	public ModelAndView huqnbxw(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		List<Neibxw> neibxwl = xinwMapper.chaxnbxw();//获取限制条数的外部新闻
		map.put("data", neibxwl);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	
	/**
	 * 上传内部新闻List
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("shangcnbxf")
	public ModelAndView shangcnbxf(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		String neir = request.getParameter("neir");
		String zhut = request.getParameter("zhut");
		xinwMapper.shangcnbxf(neir,zhut);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	/**
	 * 根据内部新闻标号，获取具体新闻信息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("hqxwjjxx")
	public ModelAndView hqxwjjxx(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		/*Integer authkeyVerification = AuthkeyVerification.AuthkeyVerification(request, response);
		if(authkeyVerification == 0){
			map.put("success", -1);
			return new ModelAndView(mappingJacksonJsonView, map);
		}*/
		String bh_str = request.getParameter("bh");
		if(bh_str == null || bh_str == ""){
			map.put("success", 0);
			System.out.println("获取内部新闻编号失败，获取新闻失败");
			return new ModelAndView(mappingJacksonJsonView,map);
		}
		Integer bh = Integer.parseInt(bh_str);
		Neibxw xwxx = xinwMapper.chaxjtxx(bh);
		map.put("success", 1);
		map.put("xwxx", xwxx);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
}
