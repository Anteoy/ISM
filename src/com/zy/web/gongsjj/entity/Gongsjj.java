package com.zy.web.gongsjj.entity;

import java.sql.Timestamp;

public class Gongsjj {

	private Integer bh;
	private String zhengw;
	private Timestamp bianjsj;
	private String zhut;
	
	
	public String getZhut() {
		return zhut;
	}
	public void setZhut(String zhut) {
		this.zhut = zhut;
	}
	public Integer getBh() {
		return bh;
	}
	public void setBh(Integer bh) {
		this.bh = bh;
	}
	public String getZhengw() {
		return zhengw;
	}
	public void setZhengw(String zhengw) {
		this.zhengw = zhengw;
	}
	public Timestamp getBianjsj() {
		return bianjsj;
	}
	public void setBianjsj(Timestamp bianjsj) {
		this.bianjsj = bianjsj;
	}
	
	
}
