package com.zy.web.xinwen.entity;

import java.sql.Timestamp;

/*
 * 外部新闻实体类
 */
public class Waibxw {

	private Integer bh;
	
	private String ljdz;
	
	private Timestamp scsj;
	
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

	public String getLjdz() {
		return ljdz;
	}

	public void setLjdz(String ljdz) {
		this.ljdz = ljdz;
	}

	public Timestamp getScsj() {
		return scsj;
	}

	public void setScsj(Timestamp scsj) {
		this.scsj = scsj;
	}
	
	
}
