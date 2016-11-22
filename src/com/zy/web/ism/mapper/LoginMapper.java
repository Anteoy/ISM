package com.zy.web.ism.mapper;

import org.apache.ibatis.annotations.Param;

import com.zy.web.ism.entity.Employee;

public interface LoginMapper {

	public Employee hqyh(@Param("yonghm") String yonghm, @Param("mim") String mim);

	public int xgmm(@Param("bh") int bh, @Param("mim") String mim);


	/*
	 * 用户注销
	 */
	public void zhux(@Param("bh")int bh);

	/*
	 * 用户上线
	 */
	public void zaix(@Param("bh")int bh);

	/**
	 * 用户修改密码
	 * @param bh
	 * @param mim_new
	 */
	public void xiugmm(@Param("bh")Integer bh, @Param("mim_new")String mim_new);
	
	/*
	 * 根据用户编号查询用户权限以及具体信息
	 */
	public Employee chaxyhxx(@Param("bh")Integer bh);
}

