package com.zy.web.chat.entity;

/** 
 *@Description:未发送消息实体表
 *@Titile:Weifsxx.java
 */

public class Weifsxx {

	private long id;
	
	private int src;
	
	private short srcType;
	
	private int target;
	
	private short targetType;
	
	private String send_time;
	
	private String content;
	
	private int newMessage; // 前台已读未读标识

	
	
	/**
	 * @return newMessage
	 */
	
	public int getNewMessage() {
		return newMessage;
	}


	
	/** 
	 * @param newMessage 要设置的 newMessage 
	 */
	
	public void setNewMessage(int newMessage) {
		this.newMessage = newMessage;
	}


	/**
	 * @return id
	 */
	
	public long getId() {
		return id;
	}

	
	/** 
	 * @param id 要设置的 id 
	 */
	
	public void setId(long id) {
		this.id = id;
	}

	
	/**
	 * @return src
	 */
	
	public int getSrc() {
		return src;
	}

	
	/** 
	 * @param src 要设置的 src 
	 */
	
	public void setSrc(int src) {
		this.src = src;
	}

	
	/**
	 * @return srcType
	 */
	
	public short getSrcType() {
		return srcType;
	}

	
	/** 
	 * @param srcType 要设置的 srcType 
	 */
	
	public void setSrcType(short srcType) {
		this.srcType = srcType;
	}

	
	/**
	 * @return target
	 */
	
	public int getTarget() {
		return target;
	}

	
	/** 
	 * @param target 要设置的 target 
	 */
	
	public void setTarget(int target) {
		this.target = target;
	}

	
	/**
	 * @return targetType
	 */
	
	public short getTargetType() {
		return targetType;
	}

	
	/** 
	 * @param targetType 要设置的 targetType 
	 */
	
	public void setTargetType(short targetType) {
		this.targetType = targetType;
	}

	
	/**
	 * @return send_time
	 */
	
	public String getSend_time() {
		return send_time;
	}

	
	/** 
	 * @param send_time 要设置的 send_time 
	 */
	
	public void setSend_time(String send_time) {
		this.send_time = send_time;
	}

	
	/**
	 * @return content
	 */
	
	public String getContent() {
		return content;
	}

	
	/** 
	 * @param content 要设置的 content 
	 */
	
	public void setContent(String content) {
		this.content = content;
	}
}