package com.zy.web.khxx;

import java.util.Calendar;
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

import com.zy.web.khxx.mapper.KehxxMapper;
import com.zy.web.khxx.entity.Kehxx;

@Controller
public class KehxxController {

	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;
	
	@Autowired
	private KehxxMapper kehxxMapper;
	
	Map<String,Object> map;
	/**
	 * 获取客户列表
	 */
	@RequestMapping("huoqkhll")
	public ModelAndView huoqkhll(HttpServletRequest request,HttpServletResponse response){
		//String yonghbh = request.getParameter("ZHBH");
		String yonghbh = request.getParameter("yonghbh");
		if(yonghbh == null){
			map.put("success", 0);
			System.out.println("获取不到用户编号,获取该用户客户信息失败");
			return new ModelAndView(mappingJacksonJsonView,map);
		}
		Integer khssyh = Integer.parseInt(yonghbh);
		List<Kehxx> khxxlist = kehxxMapper.huoqkhll(khssyh);
		map = new HashMap<>();
		map.put("success", 1);
		map.put("rows", khxxlist);
		map.put("total", "10");
		return new ModelAndView(mappingJacksonJsonView,map);
	}

	
	/**
	 * 增加客户
	 */
	@RequestMapping("zenjkh")
	public ModelAndView zenjkh(HttpServletRequest request,HttpServletResponse response){
		String yonghbh = request.getParameter("ZHBH");
		Calendar aa=Calendar.getInstance();//获取当前日期
		Integer year =  aa.get(Calendar.YEAR);
		String xm = request.getParameter("xm");
		String xb_str = request.getParameter("xb");
		String nl_str = request.getParameter("nl");
		String ssdw = request.getParameter("ssdw");
		String ms = request.getParameter("ms");
		String lxfs = request.getParameter("lxfs");
		String yxjb_str = request.getParameter("yxjb");
		if(nl_str == null || yxjb_str == null || yonghbh == null || xb_str == null){
			map.put("success", 0);
			System.out.println("系统获取不到指定参数——年龄或者优先级别，新增客户信息操作失败");
			return new ModelAndView(mappingJacksonJsonView,map);
		}
		Integer xb = Integer.parseInt(xb_str);
		Integer khssyh = Integer.parseInt(yonghbh);
		Integer nl = Integer.parseInt(nl_str);
		Integer yxjb = Integer.parseInt(yxjb_str);
		kehxxMapper.zenjkh(xm,xb,nl,ssdw,ms,lxfs,yxjb,khssyh);
		map = new HashMap<>();
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView,map);
	}
	
	
	/**
	 * 删除客户
	 */
	@RequestMapping("shanckh")
	public ModelAndView shanckh(HttpServletRequest request,HttpServletResponse response){
		String bh_String = request.getParameter("bh");
		if(bh_String == null){
			map.put("success", 0);
			return new ModelAndView(mappingJacksonJsonView,map);
		}
		Integer bh = Integer.parseInt(bh_String);
		kehxxMapper.shanckh(bh);
		map = new HashMap<>();
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView,map);
	}
	
	
	/**
	 * 修改客户信息
	 */
	@RequestMapping("xiugkh")
	public ModelAndView xiugkh(HttpServletRequest request,HttpServletResponse response){
		String bh_str = request.getParameter("bh");
		String xm = request.getParameter("xm");
		String xb_str = request.getParameter("xb");
		String nl_str = request.getParameter("nl");
		String ssdw = request.getParameter("ssdw");
		String ms = request.getParameter("ms");
		String lxfs = request.getParameter("lxfs");
		String yxjb_str = request.getParameter("yxjb");
		if(nl_str == null || yxjb_str == null || bh_str == null || xb_str == null){
			map.put("success", 0);
			System.out.println("系统获取不到指定参数——年龄或者优先级别，新增客户信息操作失败");
			return new ModelAndView(mappingJacksonJsonView,map);
		}
		Integer xb = Integer.parseInt(xb_str);
		Integer nl = Integer.parseInt(nl_str);
		Integer yxjb = Integer.parseInt(yxjb_str);
		Integer bh = Integer.parseInt(bh_str);
		kehxxMapper.genxkhxx(bh,xm,xb,nl,ssdw,ms,lxfs,yxjb);
		map = new HashMap<>();
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView,map);
	}
	
	public static void main(String[] args) {
		String s ="2016-03-03";
		String bb="11000";
		long cc = Long.parseLong(bb);
		Date date = new Date();
		Calendar aa=Calendar.getInstance(); 
		  System.out.println(aa.get(Calendar.YEAR));//得到年 
		String[] bbb = s.split("-");
		for (String a: bbb){
			System.out.println(a);
		}
		System.out.println(bbb[0]);
		String c = s.substring(0, 4);
		System.out.println(c);
		System.out.println(cc);
	}
}
