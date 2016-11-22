package com.zy.web.chat;

import java.io.UnsupportedEncodingException;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
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

import com.zy.web.chat.entity.Weifsxx;
import com.zy.web.chat.mapper.ChatMapper;
import com.zy.web.ism.entity.Employee;

import net.sf.json.JSONArray;

@Controller
public class ChatController {

	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;
	
	@Autowired
	private ChatMapper chatMapper;
	
	Map<String,Object> map;
	
	/**
	 * 更新在线状态
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("updateState")
	public ModelAndView updateState(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<String,Object>();
		request.getSession().setAttribute("webSessionID", request.getSession().getId());//防盗链
		String sessionID = request.getParameter("sessionID");//getRequestedSessionId();
		String bh_String = request.getParameter("bh");
		if(bh_String == null) {
			map.put("success", 0);
			return new ModelAndView(new MappingJacksonJsonView(),map);
		}
		else{
			map.put("success", 1);
			Integer bh = Integer.parseInt(bh_String);
			Integer zxzt = 1;
			chatMapper.updateState(zxzt,bh);
		}
		return new ModelAndView(new MappingJacksonJsonView(),map);
	}
	
	
	@RequestMapping("getUserList")
	public ModelAndView getUserList(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<String,Object>();
		List zxall = new ArrayList();
		zxall = chatMapper.getUser();
		JSONArray data = JSONArray.fromObject(zxall);
		if(data != null){
			map.put("success", 1);
			map.put("data", data);
		}
		return new ModelAndView(new MappingJacksonJsonView(),map);
	}
	
	
	
	/**
	 * 接受发送过来的消息
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("receiveMessage")
	public ModelAndView receiveMessage(HttpServletRequest request,HttpServletResponse response){
		Map<String , Object> map = new HashMap<String , Object>();
	
		String src_String = request.getParameter("src");
		String type = request.getParameter("type");
		String sessionid = request.getParameter("sessionid");
		String target_string = request.getParameter("target");
		String targetType_string = request.getParameter("targetType");
		String content = request.getParameter("content");
		String srctype_String = request.getParameter("srcType");
		Integer srctype = Integer.parseInt(srctype_String);
		int src = Integer.parseInt(src_String);
		int target = Integer.parseInt(target_string);
		Integer targetType = Integer.parseInt(targetType_string);
		DateFormat dateTimeformat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		DateFormat send_time = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		//Timestamp send_time= new Timestamp(System.currentTimeMillis());//发送时间
		int id=(int) (Math.random()*9000000+1000000);
		Integer sfcg = 0;
	//	chatMapper.saveAll(id, src, content, send_time, sfcg);
		chatMapper.saveWd(id, src, srctype, target, targetType, content/*, send_time*/);
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	
	@RequestMapping("getUnReadMessage")
	public ModelAndView sendMessage(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<String,Object>();
		String src_String = request.getParameter("zhbh");
		Integer zhbh = Integer.parseInt(src_String);
		List<Weifsxx> weifsxxs = chatMapper.chaxwd(zhbh);
		JSONArray data = JSONArray.fromObject(weifsxxs);
		for(Weifsxx s:weifsxxs){
			System.out.println(s.getId());
		} 
		if (weifsxxs != null) {
		//	map.put("total", count);
			map.put("data", data);
			map.put("success", 1);
		} else {
			map.put("total", 0);
			map.put("rows", null);
			map.put("success", 0);
		}
		return new ModelAndView(mappingJacksonJsonView, map);
		
		
	}
	
	/**
	 * 处理已推送的消息
	 */
	@RequestMapping("messageReport")
	public ModelAndView messageReport(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<String, Object>();
		String id_string = request.getParameter("id");
		Integer id = Integer.parseInt(id_string);
		Weifsxx weifaxx = new Weifsxx();
		weifaxx = chatMapper.chaxyits(id);
		chatMapper.deletewfs(id);
		try{
			Integer src = weifaxx.getSrc();
			//Integer srctype = weifaxx.getSrcType();
			Integer target = weifaxx.getTarget();
			String content = weifaxx.getContent();
			String send_time_String = weifaxx.getSend_time();
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss"); 
			 Date send_time = sdf.parse(send_time_String); 
			Timestamp receive_time =new Timestamp(System.currentTimeMillis());
			chatMapper.charydxx(id,src,target,content,send_time,receive_time);
			map.put("success", 1);
			return new ModelAndView(new MappingJacksonJsonView());
		}catch(Exception e){
			e.printStackTrace();
		}finally{
		}
		map.put("success", 0);
		return new ModelAndView(new MappingJacksonJsonView());
	}
	
	
	@RequestMapping("chaxyh")
	public ModelAndView send(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException  {
		request.setCharacterEncoding("UTF-8");
		String srcstring	=	request.getParameter("src");
		Map<String,Object> map = new HashMap<String,Object>();
		if(srcstring == null || srcstring == ""){
			return null;
		}
		int zhbh = Integer.parseInt(srcstring);
		Employee yh = chatMapper.hqyh(zhbh);
		if (yh == null) {
			map.put("success", 0);
			map.put("errorMessage", "未查找到相关信息");
		} else {
			String xm = yh.getXm();
			int xb = yh.getXb();
			int bh = yh.getBh();
			String sjh = yh.getSjh();
			int touxbh = yh.getTouxbh();
			int zt = yh.getZxzt();//用户在线状态
			
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
			//得到当前的年份
			String cYear = sdf.format(new Date()).substring(0,4);
			//得到生日年份
			//String birthYear = sfzh.substring(6,10);
			//int age = Integer.parseInt(cYear) - Integer.parseInt(birthYear);//年龄
			map.put("bh", zhbh);
			map.put("success", 1);
			map.put("xm", xm);
			map.put("xb", xb);
		//	map.put("sfzh", sfzh);
		//	map.put("age", age);
			map.put("sjh", sjh);
			map.put("touxbh", touxbh);
			map.put("zt", zt);

			
		}

		return new ModelAndView(mappingJacksonJsonView, map);
	}

}

