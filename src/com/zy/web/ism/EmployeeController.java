package com.zy.web.ism;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.zy.web.ism.entity.Employee;
import com.zy.web.ism.mapper.EmployeeMapper;

import net.sf.json.JSONArray;

@Controller
public class EmployeeController {
	@Autowired
	private EmployeeMapper employeeMapper;
	Map<String,Object> map;
	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;

	//返回所有的employeeList
	@RequestMapping(value = "/test.do") 
	public ModelAndView test(){

		map = new HashMap<String, Object>();
		
		List<Employee> lt = employeeMapper.selectAll();
		if(lt == null){
			map.put("success", 0);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		map.put("success", 1);
		map.put("rows", lt);
		map.put("total", "10");//翻页条路数量
		return new ModelAndView(mappingJacksonJsonView, map);
	}

	//利用bh删除employee
	@RequestMapping(value="/deleteemployee")
	public ModelAndView delete(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String bhString = request.getParameter("bh");
		Integer bh =Integer.parseInt(bhString); 
		employeeMapper.delete(bh);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	//增加Employee
	@RequestMapping(value = "/insertemployee")
	public ModelAndView all(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		request.setCharacterEncoding("utf-8");
		String xm = request.getParameter("xm");
		String xbtemp = request.getParameter("xb");
		String yonghm = request.getParameter("yonghm");
		String mim = request.getParameter("mim");
		String touxbh_String = request.getParameter("touxbh");
		String sjh = request.getParameter("sjh");
		String qxtemp = request.getParameter("qx");
		String bm = request.getParameter("bm");
		String zc = request.getParameter("zc");
		String xztemp = request.getParameter("xz");
		String lxyx = request.getParameter("lxyx");
		String jj = request.getParameter("jj");
		Integer qx = Integer.parseInt(qxtemp);
		Double xz = Double.parseDouble(xztemp);
		Integer touxbh = Integer.parseInt(touxbh_String);
		Integer xb = 1;
		if(xbtemp.equals("女") ){
			 xb = 0;
		}
		try{
			employeeMapper.insert(xm, xb, sjh,bm,zc,xz,yonghm,mim,touxbh,qx,lxyx,jj);
			map.put("isOK", 1);
		}
		catch(Exception e){
			e.printStackTrace();
		}
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	//更新employee信息
	@RequestMapping(value="/updateemployee",method=RequestMethod.POST)
	public ModelAndView update(HttpServletRequest request, HttpServletResponse response) throws Exception {
		request.setCharacterEncoding("utf-8");
		Map<String, Object> map = new HashMap<String, Object>();
		String bh_String = request.getParameter("bh");
		if(bh_String == null){
			map.put("success", 0);
			System.out.println("获取更新用户信息异常，捕获不到用户编号");
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		Integer bh = Integer.parseInt(bh_String);
		request.setCharacterEncoding("utf-8");
		String xm = request.getParameter("xm");
		String xbtemp = request.getParameter("xb");
		String yonghm = request.getParameter("yonghm");
		String mim = request.getParameter("mim");
		String touxbh_String = request.getParameter("touxbh");
		String sjh = request.getParameter("sjh");
		String qxtemp = request.getParameter("qx");
		String bm = request.getParameter("bm");
		String zc = request.getParameter("zc");
		String xztemp = request.getParameter("xz");
		String lxyx = request.getParameter("lxyx");
		String jj = request.getParameter("jj");
		Integer qx = Integer.parseInt(qxtemp);
		Double xz = Double.parseDouble(xztemp);
		Integer touxbh = Integer.parseInt(touxbh_String);
		Integer xb = 1;
		if(xbtemp == "女"){
			 xb = 0;
		}
		employeeMapper.update(bh,xm, xb, sjh,bm,zc,xz,yonghm,mim,touxbh,qx,lxyx,jj);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	
	/**
	 * 获得公司管理层信息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("huodglxx")
	public ModelAndView guanlxx(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<String,Object>();
		List<Employee> lt = employeeMapper.selectglxx();
	//	JSONArray data = JSONArray.fromObject(lt);
		if(lt == null){
			map.put("success", 0);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		map.put("success", 1);
		map.put("data", lt);
		return new ModelAndView(new MappingJacksonJsonView(),map);
	}
	
	
	/**
	 * 修改公司管理层信息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("xiugglxx")
	public ModelAndView xiugglxx(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<String,Object>();
		
		return new ModelAndView(new MappingJacksonJsonView(),map);
	}
}