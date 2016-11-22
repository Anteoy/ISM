package com.zy.web.qingjia;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
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

import com.zy.common.Condition;
import com.zy.web.qingjia.entity.QingJiaTiao;
import com.zy.web.qingjia.mapper.QingjiaMapper;

@Controller
public class QingjiaCotroller {

	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;

	@Autowired
	private QingjiaMapper qingjiaMapper;
	
	/**
	 * 请假申请
	 * @param request
	 * @param response
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping("qingjia-module/qingjiashenqing")
	public ModelAndView chakhzxq(HttpServletRequest request, HttpServletResponse response) throws ParseException {
		
		Map<String, Object> map = new HashMap<>();
		String xm = request.getParameter("xm");
		String qjsj = request.getParameter("qjsj");
		String bm = request.getParameter("bm");
		String zc = request.getParameter("zc");
		String sjh_String = request.getParameter("sjh");
		Integer sjh = Integer.parseInt(sjh_String.trim());
		String qjsy = request.getParameter("qjsy");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		//Date qjsj = sdf.parse(qjsj_String);
		//long qjsj =  Date.parse(qjsj_String);
		qingjiaMapper.charqjb(xm,qjsj,bm,zc,sjh,qjsy);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	
	/**
	 * 获取所有申请请假用户
	 * @param request
	 * @param response
	 * @return
	 * @throws ParseException 
	 */
	@RequestMapping("qingjialist")
	public ModelAndView qingjialist(HttpServletRequest request, HttpServletResponse response) throws ParseException {
		
		Map<String, Object> map = new HashMap<>();
		Condition condition = new Condition(request);
		List<QingJiaTiao> ls = qingjiaMapper.chaxlist(condition);
		if(ls ==null){
			map.put("success", 0);
			System.out.println("未获取到有申请请假的用户");
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		map.put("success", 1);
		map.put("data", ls);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	
	/**
	 * 用户请假审核结果
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("shenhejieguo")
	public ModelAndView shenhejieguo(HttpServletRequest request, HttpServletResponse response) {
		Map<String, Object> map = new HashMap<>();
		String sfshcg_String = request.getParameter("sfshcg");
		String bh_String = request.getParameter("bh");
		if(sfshcg_String == null || bh_String == ""){
			map.put("success", 0);
			System.out.println("未收到审核结果,审核结果为空！");
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		Integer bh = Integer.parseInt(bh_String);
		Integer sfshcg = Integer.parseInt(sfshcg_String);
		if(sfshcg == 1){
			System.out.println("信息审核成功");
			qingjiaMapper.shenhtg(bh);
		}
		if(sfshcg == 0){
			qingjiaMapper.shenhwtg(bh);
		}
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	/**
	 * 获取数据总数
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("total")
	public ModelAndView total(HttpServletRequest request, HttpServletResponse response) {
		HashMap<String, Object> map = new HashMap<>();
		try {
			Condition condition = new Condition(request); // 从request中获取条件参数 

			/* 获取数据总条 */
			int total = qingjiaMapper.count(condition);
			map.put("total", total);

			map.put("success", 1);
		} catch (Exception e) {
			/* 异常处理 */
			map.put("success", 0);
			map.put("errorMessage", e.getMessage());
			e.printStackTrace();
		}
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	/**
	 * 获取请假条详细信息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("qingjtxxxx")
	public ModelAndView qingjtxxxx(HttpServletRequest request, HttpServletResponse response) {
		HashMap<String, Object> map = new HashMap<>();
		String bh_String = request.getParameter("bh");
		if(bh_String == null){
			map.put("success", 0);
			System.err.println("获取不到请求请假条详细信息的请假条编号");
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		Integer bh = Integer.parseInt(bh_String);
		QingJiaTiao qjt = qingjiaMapper.qingjtxxxx(bh);//请假条详细信息
		map.put("success", 1);
		map.put("data", qjt);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
}
