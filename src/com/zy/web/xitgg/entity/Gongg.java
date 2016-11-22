package com.zy.web.xitgg.entity;

import java.sql.Timestamp;

/**
 * 系统公告实体类
 * @author 周嚴
 *
 */
public class Gongg {

	private Timestamp ggsj;
	
	private Integer bh;
	
	private String ggnr;

	public Timestamp getGgsj() {
		return ggsj;
	}

	public void setGgsj(Timestamp ggsj) {
		this.ggsj = ggsj;
	}

	public Integer getBh() {
		return bh;
	}

	public void setBh(Integer bh) {
		this.bh = bh;
	}

	public String getGgnr() {
		return ggnr;
	}

	public void setGgnr(String ggnr) {
		this.ggnr = ggnr;
	}
	
	
}
