package com.zy.web.shebgg;

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

import com.zy.web.shebgg.entity.Sheb;
import com.zy.web.shebgg.mapper.ShebglMapper;

@Controller
public class ShebggController {

	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;
	
	@Autowired
	private ShebglMapper shebglMapper;
	
	Map<String,Object> map;
	/**
	 * 获取设备列表
	 */
	@RequestMapping("huoqsbll")
	public ModelAndView huoqsbll(HttpServletRequest request,HttpServletResponse response){
		List<Sheb> shebl = shebglMapper.huoqusbll();
		map = new HashMap<>();
		map.put("success", 1);
		map.put("rows", shebl);
		map.put("total", "10");
		return new ModelAndView(mappingJacksonJsonView,map);
	}

	
	/**
	 * 增加设备
	 */
	@RequestMapping("zenjsb")
	public ModelAndView zenjsb(HttpServletRequest request,HttpServletResponse response){
		Calendar aa=Calendar.getInstance();//获取当前日期
		Integer year =  aa.get(Calendar.YEAR);
		String mic = request.getParameter("mic");
		String goumsj = request.getParameter("goumsj");
		String shebgly = request.getParameter("shebgly");
		String gourjg_String = request.getParameter("gourjg");
		if(gourjg_String == null ){
			map.put("success", 0);
			System.out.println("系统获取不到设备购买时间，操作无法继续");
			return new ModelAndView(mappingJacksonJsonView,map);
		}
		Integer  shiysc = year-Integer.parseInt((goumsj.split("-"))[0]);//获取购买年份
		long gourjg = Long.parseLong(gourjg_String.trim());
		shebglMapper.zenjsb(mic,goumsj,shebgly,gourjg,shiysc);
		map = new HashMap<>();
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView,map);
	}
	
	
	/**
	 * 删除设备
	 */
	@RequestMapping("shancsb")
	public ModelAndView shancsb(HttpServletRequest request,HttpServletResponse response){
		String bh_String = request.getParameter("bh");
		if(bh_String == null){
			map.put("success", 0);
			return new ModelAndView(mappingJacksonJsonView,map);
		}
		Integer bh = Integer.parseInt(bh_String);
		shebglMapper.shancsb(bh);
		map = new HashMap<>();
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView,map);
	}
	
	
	/**
	 * 修改设备参数
	 */
	@RequestMapping("xiugsb")
	public ModelAndView xiugsb(HttpServletRequest request,HttpServletResponse response){
		String bh_String =request.getParameter("bh");
		String goumsj =request.getParameter("goumsj");
		String gourjg_String =request.getParameter("gourjg");
		String shebgly =request.getParameter("shebgly");
		String mic =request.getParameter("mic");
		Integer bh = Integer.parseInt(bh_String);
		long gourjg = Long.parseLong(gourjg_String);
		Calendar aa=Calendar.getInstance();//获取当前日期
		Integer year =  aa.get(Calendar.YEAR);
		Integer  shiysc = year-Integer.parseInt((goumsj.split("-"))[0]);//获取购买年份
		shebglMapper.genxsheb(bh,gourjg,mic,shebgly,goumsj,shiysc);
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
