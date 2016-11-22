package com.zy.web.ism.entity;

import java.sql.Timestamp;

public class Employee {
	private String yonghm;
	
	private String mim;
	
	private int touxbh;
	
	private int zxzt;
	
	private String jj;//简介
	
	
	
	public String getJj() {
		return jj;
	}


	public void setJj(String jj) {
		this.jj = jj;
	}


	public int getZxzt() {
		return zxzt;
	}
	
	
	public String getYonghm() {
		return yonghm;
	}


	public void setYonghm(String yonghm) {
		this.yonghm = yonghm;
	}


	public String getMim() {
		return mim;
	}


	public void setMim(String mim) {
		this.mim = mim;
	}


	public void setZxzt(int zxzt) {
		this.zxzt = zxzt;
	}

	public int getTouxbh() {
		return touxbh;
	}

	public void setTouxbh(int touxbh) {
		this.touxbh = touxbh;
	}

	private int bh;
	
	public int getBh() {
		return bh;
	}

	public void setBh(int bh) {
		this.bh = bh;
	}

	public String getZc() {
		return zc;
	}

	public void setZc(String zc) {
		this.zc = zc;
	}

	private String xm;
	
	private int xb;
	
	private String sjh;
	
	/**
	 * 人员等级，权限
	 */
	private int qx;
	/**
	 * 所属部门
	 */
	private String bm;
	
	/**
	 * 职称
	 */
	private String zc;
	/**
	 * 固定薪资
	 */
	private double xz;
	
	private String lxyx;
	
	
	public String getLxyx() {
		return lxyx;
	}


	public void setLxyx(String lxyx) {
		this.lxyx = lxyx;
	}

	/**
	 * 本月上班打卡次数 本月打卡
	 */
	private int bydk;
	
	public String getXm() {
		return xm;
	}

	public void setXm(String xm) {
		this.xm = xm;
	}

	public int getXb() {
		return xb;
	}

	public void setXb(int xb) {
		this.xb = xb;
	}

	public String getSjh() {
		return sjh;
	}

	public void setSjh(String sjh) {
		this.sjh = sjh;
	}

	public int getQx() {
		return qx;
	}

	public void setQx(int qx) {
		this.qx = qx;
	}

	public String getBm() {
		return bm;
	}

	public void setBm(String bm) {
		this.bm = bm;
	}

	public double getXz() {
		return xz;
	}

	public void setXz(double xz) {
		this.xz = xz;
	}

	public int getBydk(){
		return bydk;
	}
	
	public void setBydk(int bydk){
		this.bydk = bydk;
	}
	
	private Timestamp zuihzxsj;

	public Timestamp getZuihzxsj() {
		return zuihzxsj;
	}

	public void setZuihzxsj(Timestamp zuihzxsj) {
		this.zuihzxsj = zuihzxsj;
	}
	
	
}
