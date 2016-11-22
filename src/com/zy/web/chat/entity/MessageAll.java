package com.zy.web.chat.entity;

import java.util.Date;

public class MessageAll {
	
	private Integer src;
	public Integer getSrc() {
		return src;
	}
	public void setSrc(Integer src) {
		this.src = src;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getSend_time() {
		return send_time;
	}
	public void setSend_time(Date send_time) {
		this.send_time = send_time;
	}
	public Integer getSfcg() {
		return sfcg;
	}
	public void setSfcg(Integer sfcg) {
		this.sfcg = sfcg;
	}
	private String content;
	private Date send_time;
	private Integer sfcg;
	private Integer touxbh;
	public Integer getTouxbh() {
		return touxbh;
	}
	public void setTouxbh(Integer touxbh) {
		this.touxbh = touxbh;
	}
	
}
