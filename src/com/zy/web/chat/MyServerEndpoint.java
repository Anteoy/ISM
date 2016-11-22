package com.zy.web.chat;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.RemoteEndpoint;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import net.sf.json.JSONObject;

@Controller
@ServerEndpoint(value = "/websocket/move")//标示出这是一个WebSocket的Server端,
public class MyServerEndpoint {
	private static final SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd HH:mm");	// 日期格式化
	private Session session;
	private static final Logger sysLogger = Logger.getLogger("sysLog");
	
	@OnOpen//当一个客户端连上来时触发,每个客户端会被分配一个session 不是httpsession @PathParam(value = "user")从url中获取user的
	public void open(Session session,  @PathParam(value = "user")String user) {
		this.session = session;
		System.out.println ("WebSocket opened: "+session.getId());
		sysLogger.info("*** WebSocket opened from sessionId " + session.getId());
	}
	@RequestMapping("aa")
	@OnMessage//收到客户端发送的消息时触发
	public String inMessage(String message, Session session) throws IOException {
		
		// 把客户端的消息解析为JSON对象
		JSONObject jsonObject = JSONObject.fromObject(message);
		// 在消息中添加发送日期
		jsonObject.put("date", DATE_FORMAT.format(new Date()));
		// 把消息发送给所有连接的会话
		for (Session openSession : session.getOpenSessions()) {
		// 添加本条消息是否为当前会话本身发的标志
		jsonObject.put("isSelf", openSession.equals(session));
		// 发送JSON格式的消息
		openSession.getAsyncRemote().sendText(jsonObject.toString());
		}
		
		sysLogger.info("*** WebSocket Received from sessionId " + this.session.getId() + ": " + message);
		System.out.println ("WebSocket received message: "+message);
		RemoteEndpoint.Basic other = session.getBasicRemote();
		other.sendText ("Hello, world");
		return message.toUpperCase();
	}
	

	@OnClose//客户端断开时触发
	public void end(CloseReason reason) {
		sysLogger.info("*** WebSocket closed from sessionId " + this.session.getId());
		System.out.println("Closing a WebSocket due to "+reason.getReasonPhrase());
	}
	

}