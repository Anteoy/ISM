package com.zy.web.xinwen.entity;

import java.sql.Timestamp;

/**
 * 内部新闻实体类
 * @author 周嚴
 *
 */
public class Neibxw {

	private Integer bh;
	
	private String zhut;
	
	private String neir;
	
	private Timestamp scsj;
	
	private String ljdz;
	
	

	public Timestamp getScsj() {
		return scsj;
	}

	public void setScsj(Timestamp scsj) {
		this.scsj = scsj;
	}

	public String getLjdz() {
		return ljdz;
	}

	public void setLjdz(String ljdz) {
		this.ljdz = ljdz;
	}

	public Integer getBh() {
		return bh;
	}

	public void setBh(Integer bh) {
		this.bh = bh;
	}

	public String getZhut() {
		return zhut;
	}

	public void setZhut(String zhut) {
		this.zhut = zhut;
	}

	public String getNeir() {
		return neir;
	}

	public void setNeir(String neir) {
		this.neir = neir;
	}
	
	
}
