package com.zy.web.xinwen.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zy.web.xinwen.entity.Neibxw;
import com.zy.web.xinwen.entity.Waibxw;

public interface XinwMapper {
	/**
	 * 获取限制条数的外部新闻
	 * @return
	 */
	public List<Waibxw> chaxwbxw();

	/*
	 * 上传外部新闻List
	 */
	public void shangcwbxf(@Param("ljdz")String ljdz, @Param("zhut")String zhut);

	/**
	 * 获取内部新闻List
	 * @return
	 */
	public List<Neibxw> chaxnbxw();

	/**
	 * 上传内部新闻
	 * @param neir
	 * @param zhut
	 */
	public void shangcnbxf(@Param("neir")String neir, @Param("zhut")String zhut);

	/**
	 * 根据新闻编号查询新闻具体信息
	 * @param bh
	 * @return 
	 */
	public Neibxw chaxjtxx(@Param("bh")Integer bh);

}
