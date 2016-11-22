package com.zy.web.khxx.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zy.web.khxx.entity.Kehxx;

public interface KehxxMapper {

	/*
	 * 获取客户列表
	 */
	public List<Kehxx> huoqkhll(@Param("khssyh")Integer khssyh);

	/**
	 * 删除客户
	 * @param bh
	 */
	public void shanckh(@Param("bh")Integer bh);

	/**
	 * 增加客户
	 * @param xm
	 * @param xb
	 * @param nl
	 * @param ssdw
	 * @param ms
	 * @param lxfs
	 * @param yxjb
	 * @param khssyh 
	 */
	public void zenjkh(@Param("xm")String xm, @Param("xb")Integer xb, @Param("nl")Integer nl, @Param("ssdw")String ssdw, @Param("ms")String ms, @Param("lxfs")String lxfs, @Param("yxjb")Integer yxjb, @Param("khssyh")Integer khssyh);
	/**
	 * 更新客户信息
	 * @param bh 
	 * @param xm
	 * @param xb
	 * @param nl
	 * @param ssdw
	 * @param ms
	 * @param lxfs
	 * @param yxjb
	 */
	public void genxkhxx(@Param("bh")Integer bh, @Param("xm")String xm, @Param("xb")Integer xb, @Param("nl")Integer nl, @Param("ssdw")String ssdw, @Param("ms")String ms, @Param("lxfs")String lxfs, @Param("yxjb")Integer yxjb);

}
