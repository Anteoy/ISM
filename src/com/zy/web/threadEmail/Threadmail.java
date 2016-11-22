package com.zy.web.threadEmail;

import java.text.DateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.zy.common.ApplicationContextWrapper;
import com.zy.util.DateUtil;
import com.zy.web.ism.entity.Employee;
import com.zy.web.ism.mapper.EmployeeMapper;

/**
 * 创建线程池线程类并执行
 * @author 周嚴
 *
 */
public class Threadmail implements Runnable{


	@Override
	public void run() {
		//创建一个线程池
		TheadPool tp=new TheadPool(5);
		//任务数
		ThreadEmail[] r = new ThreadEmail[20];
		//测试arrylist
		//String[] al = {"332396949@qq.com","1453461063@qq.com"};
		EmployeeMapper employeeMapper = ApplicationContextWrapper.getBean(EmployeeMapper.class);
		
		List<String> al = employeeMapper.hqsyyx();//获取所有用户邮箱
		//list去空
		List<String> al_null = new ArrayList();//TODO
		al_null.add(null);
		al.removeAll(al_null);
		//获取所有用户数据
		List<Employee> _emls = employeeMapper.selectAll();
		
		for(Employee a: _emls){
			if(a.getLxyx() == null || a.getLxyx() == "")
				continue;
			Integer i = 0;
			r[i]=new ThreadEmail();
			System.out.println(r[i]);
			Integer j=20;
			r[i].setFrom("Anteoy@163.com");
			r[i].setText("<html><head></head><body><h1>您好，这是您的本月薪资单</h1><span>姓名：</span><label>"+a.getXm()+"<label></br><span>本月出勤：</span><label>"+a.getBydk()+"<label></br><span>本月薪资：</span><label>￥"+a.getXz()+"<label></body></html></br><span>如需详单请联系部门主管，谢谢</span>");
			r[i].setTo(a.getLxyx());
			//发送邮件
			tp.execute(r[i]);
			i++;
			if(i>=j){
				return;
			}
		}
	}
	
	
}
