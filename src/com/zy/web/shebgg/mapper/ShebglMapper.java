package com.zy.web.shebgg.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zy.web.shebgg.entity.Sheb;

public interface ShebglMapper {

	/*
	 * 获取设备列表
	 */
	public List<Sheb> huoqusbll();

	/*
	 * 增加新的设备
	 */
	public void zenjsb(@Param("mic")String mic, @Param("goumsj")String goumsj, @Param("shebgly")String shebgly, @Param("gourjg")long gourjg, @Param("shiysc")Integer shiysc);

	/**
	 * 删除设备
	 * @param bh
	 */
	public void shancsb(@Param("bh")Integer bh);

	/**
	 * 更新设备属性
	 * @param bh
	 * @param gourjg
	 * @param mic
	 * @param shebgly
	 * @param goumsj
	 * @param shiysc
	 */
	public void genxsheb(@Param("bh")Integer bh, @Param("gourjg")long gourjg, @Param("mic")String mic, @Param("shebgly")String shebgly, @Param("goumsj")String goumsj, @Param("shiysc")Integer shiysc);

}
