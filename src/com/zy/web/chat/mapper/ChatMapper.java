package com.zy.web.chat.mapper;

import com.zy.web.chat.entity.MessageAll;
import com.zy.web.chat.entity.Weifsxx;
import com.zy.web.ism.entity.Employee;
import org.apache.ibatis.annotations.Param;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

public interface ChatMapper {
	/**
	 * 保存消息all到数据库
	 * @param xm 
	 * @param touxbh 
	 */
	public void saveAll(@Param("id")Integer id,@Param("src")Integer src,@Param("content")String content,@Param("sfcg")Integer sfcg, @Param("xm")String xm, @Param("touxbh")Integer touxbh);
	
	public void saveWd(@Param("id")Integer id,@Param("src")Integer src,@Param("srctype")Integer srctype,@Param("target")Integer target,@Param("targettype")Integer targettype,@Param("content")String content/*,@Param("send_time")DateFormat send_time*/);
	
	public List<Weifsxx> chaxwd(@Param("src")Integer src);
	
	/**
	 * 
	 * 未推送消息更新为已推送消息
	 */
	public void gengxwd(@Param("id")Integer id);
/**
 * 查询已推送的消息id 待放入已推送消息表中
 * @return
 */
	public Weifsxx chaxyits(@Param("id")Integer id);
/**
 * 已推送消息更新到已读消息表中
 * @param src
 * @param target
 * @param content
 * @param send_time
 * @param receive_time
 */
public void charydxx(@Param("id")Integer id,@Param("src")Integer src, @Param("target")Integer target, @Param("content")String content, @Param("send_time")Date send_time, @Param("receive_time")Timestamp receive_time);

public void deletewfs(@Param("id")Integer id);

/*
 * 查询用户信息
 */
public Employee hqyh(@Param("zhbh")int zhbh);
/**
 * 更新在线状态
 * @param zxzt
 * @param bh 
 */
public void updateState(@Param("zxzt")Integer zxzt, @Param("bh")Integer bh);
/**
 * 获取所有在线用户
 * @return
 */
public List<Integer> getUser();

/**
 * 查询最近的前十条消息
 * @return
 */
public List<MessageAll> chaxAll();
	
	
}
