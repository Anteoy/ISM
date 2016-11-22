package com.zy.web.gongsjj.mapper;

import org.apache.ibatis.annotations.Param;

import com.zy.web.gongsjj.entity.Gongsjj;

public interface GongsjjMapper {

	/**
	 * 查询公司简介(最新的一条)
	 * @return
	 */
	public Gongsjj chaxgsjj();

	/**
	 * 上传公司简介
	 * @param zhengw
	 * @param zhut 
	 */
	public void shangcwbxf(@Param("zhengw")String zhengw, @Param("zhut")String zhut);

	
}
