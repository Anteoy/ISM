package com.zy.web.ism.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.zy.web.ism.entity.Employee;

	//定义数据库操作函数
	public interface EmployeeMapper {
		/*
		 * 查询
		 */
		public List<Employee> selectAll();

		public Employee findById(@Param("id")String id);
		
		public Employee findByXm(@Param("xm")String xm);
		
		
		/*
		 * 更新删除插入
		 */
		public int insert(@Param("xm")String xm,@Param("xb")Integer xb,@Param("sjh")String sjh, @Param("bm")String bm, @Param("zc")String zc, @Param("xz")Double xz, @Param("yonghm")String yonghm, @Param("mim")String mim, @Param("touxbh")Integer touxbh, @Param("qx")Integer qx, @Param("lxyx")String lxyx, @Param("jj")String jj);
		
		public void update(@Param("bh")Integer bh, @Param("xm")String xm,@Param("xb")Integer xb,@Param("sjh")String sjh, @Param("bm")String bm, @Param("zc")String zc, @Param("xz")Double xz, @Param("yonghm")String yonghm, @Param("mim")String mim, @Param("touxbh")Integer touxbh, @Param("qx")Integer qx, @Param("lxyx")String lxyx, @Param("jj")String jj);
		
		public int delete(@Param("bh")Integer bh);
/**
 * 获得公司管理层信息
 * @return
 */
		public List<Employee> selectglxx();

		/**
		 * 获取所有用户邮箱
		 * @return
		 */
		public List<String> hqsyyx();

		
	}
