package com.zy.web.chat;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.json.MappingJacksonJsonView;

import com.zy.web.chat.entity.MessageAll;
import com.zy.web.chat.mapper.ChatMapper;

import net.sf.json.JSONObject;

/**
 * 聊天服务器类
 *
 */
@Controller
@ServerEndpoint("/websocket")
public class ChatServer {
	
	@Autowired
	private MappingJacksonJsonView mappingJacksonJsonView;
	
	@Autowired
	private ChatMapper chatMapper;
	
	Map<String,Object> map;
	
	
	Boolean flag ;
	//并发-Java中的Copy-On-Write容器
	private static CopyOnWriteArraySet<ChatServer> set = new CopyOnWriteArraySet<ChatServer>();
	//Set<Session> set;
	private Session session;
	private static final Logger sysLogger = Logger.getLogger("sysLog");
	private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm");	// 日期格式化
	
	@OnOpen
	public void open(Session session) {
		// 添加初始化操作
		System.out.println("连接打开，sessionID为"+session.getId());
		//set.add(session);
		Set<Session> getset = session.getOpenSessions();
		this.session = session;
		
		set.add(this);
		//set.addAll(session.getOpenSessions()); 
	}
	/**
	* 接受客户端的消息，并把消息发送给所有连接的会话
	* @param message 客户端发来的消息
	* @param session 客户端的会话
	* @throws IOException 
	*/
	@OnMessage
	public void getMessage(String message, Session session) throws IOException {

		// 把客户端的消息解析为JSON对象
		JSONObject jsonObject = JSONObject.fromObject(message);
		// 在消息中添加发送日期
		jsonObject.put("date", DATE_FORMAT.format(new Date()));
		
		// 把消息发送给所有连接的会话
		sysLogger.info(set.size());
		int id=(int) (Math.random()*9000000+1000000);//随机生成消息ID
		Integer sfcg = 1;//1代表推送成功
		Integer src = jsonObject.getInt("ZHBH");
		String content = jsonObject.getString("content");
		//String xm = jsonObject.getString("nickname");
		String xm = "test";
		//消息存入chatall表中保存
		//List<MessageAll> ms = chatMapper.chaxAll();//查询最近的前十条消息
		//chatMapper.saveAll(id, src, content, sfcg,xm);
		for (ChatServer openSession : set) {
			sysLogger.info(openSession);
			if(openSession.session.equals(session)){
				flag = true;
				System.out.println("推送到消息发送者本身");
				// 添加本条消息是否为当前会话本身发的标志
				jsonObject.put("isSelf", true);
			}else{
				jsonObject.put("isSelf", false);
			}
			// 发送JSON格式的消息
			// openSession.getAsyncRemote().sendText(jsonObject.toString());
			openSession.session.getBasicRemote().sendText(jsonObject.toString());
			sysLogger.info("Opensession:"+openSession);
		}
		sysLogger.info("*** WebSocket 接收到消息，sessionid为: " + session.getId() + ": " + message);
	}
	@OnClose
	public void close(Session session) {
	// 添加关闭会话时的操作
		sysLogger.info("*** WebSocket 关闭，sessionid为 :" + session.getId());
		set.remove(this);
	}
	@OnError
	public void error(Throwable t,Session session, Throwable error) {
		// 添加处理错误的操作
		sysLogger.info("*** WebSocket 出错，sessionid为 :" + session.getId());
		 System.out.println("发生错误");
	        error.printStackTrace();
	        set.remove(this);
	}
	
	
	@RequestMapping("xiaoxjl")
	public ModelAndView Xiaoxjl(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		List<MessageAll> ms = chatMapper.chaxAll();//查询最近的前十条消息
		map.put("success", 1);
		map.put("data", ms);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
	@RequestMapping("xiaoxbc")
	public ModelAndView xiaoxbc(HttpServletRequest request,HttpServletResponse response){
		map = new HashMap<>();
		
		Integer sfcg = 1;//1代表推送成功
		String src_String = request.getParameter("ZHBH");
		String content =request.getParameter("content");
		String xm = request.getParameter("nickname");
		String touxbh_str = request.getParameter("touxbh");
		if(touxbh_str == null){
			map.put("success", 0);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		Integer touxbh = Integer.parseInt(touxbh_str);
		int id=(int) (Math.random()*9000000+1000000);//随机生成消息ID
		if(src_String == null || src_String == ""){
			map.put("success", 0);
			return new ModelAndView(mappingJacksonJsonView, map);
		}
		Integer src = Integer.parseInt(src_String);
		//消息存入chatall表中保存
		chatMapper.saveAll(id, src, content, sfcg,xm,touxbh);
		
		map.put("success", 1);
		return new ModelAndView(mappingJacksonJsonView, map);
	}
	
}