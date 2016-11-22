package com.zy.web.qingjia.mapper;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zy.common.Condition;
import com.zy.web.qingjia.entity.QingJiaTiao;

public interface QingjiaMapper {
/**
 * 插入请假表
 * @param xm
 * @param qjsj
 * @param bm
 * @param zc
 * @param sjh
 * @param qjsy
 */
	public void charqjb(@Param("xm")String xm, @Param("qjsj")String qjsj, @Param("bm")String bm, @Param("zc")String zc, @Param("sjh")Integer sjh, @Param("qjsy")String qjsy);
	
	/**
	 * 获得所有未处理请假条
	 * @param condition 
	 * @return
	 */
	public List<QingJiaTiao> chaxlist(Condition condition);
	/**
	 * 获取需要展示的待审核请假总条数
	 * @param condition
	 * @return
	 */
	public int count(Condition condition);

	/**
	 * 获取请假条详细信息
	 * @param bh
	 * @return
	 */
	public QingJiaTiao qingjtxxxx(@Param("bh")Integer bh);

	/**
	 * 审核通过
	 * @param bh
	 */
	public void shenhtg(@Param("bh")Integer bh);

	/**
	 * 审核未通过
	 * @param bh
	 */
	public void shenhwtg(@Param("bh")Integer bh);
}
