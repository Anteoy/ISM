package com.zy.web.xitgg.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zy.web.xinwen.entity.Waibxw;
import com.zy.web.xitgg.entity.Gongg;

public interface GonggMapper {


	/**
	 * 获取系统最新一条公告信息
	 * @return
	 */
	public Gongg chaxgg();

}