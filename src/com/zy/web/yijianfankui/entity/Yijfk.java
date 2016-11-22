package com.zy.web.yijianfankui.entity;

import java.sql.Timestamp;

public class Yijfk {
	private Integer fkbh;
	private String content;
	private Timestamp send_time;
	public Integer getFkbh() {
		return fkbh;
	}
	public void setFkbh(Integer fkbh) {
		this.fkbh = fkbh;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Timestamp getSend_time() {
		return send_time;
	}
	public void setSend_time(Timestamp send_time) {
		this.send_time = send_time;
	}
	
}
