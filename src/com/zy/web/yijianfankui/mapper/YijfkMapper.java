package com.zy.web.yijianfankui.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zy.web.yijianfankui.entity.Yijfk;

public interface YijfkMapper {

	/**
	 * 查询历史反馈list(最新前十条)
	 * @return
	 */
	public List<Yijfk> chaxyjfklist();
/**
 * 上传反馈list
 * @param content
 */
	public void chaxrfkxx(@Param("content")String content);

}
