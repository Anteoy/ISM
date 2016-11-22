package com.zy.web.threadEmail;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.zy.util.DateUtil;
/**
 * 邮件发送时间控制类
 * @author 周嚴
 *
 */
public class TimeController extends Thread{

	public TimeController(){
		
	}
	/*public static void main(String[] args) {
		new TimeController();
	}*/
	/**
	 * 检测是否为每月第一天的邮件发送时间
	 * @return
	 */
	public static boolean time(){
		//获取当前时间
		String datestr = DateUtil.getStrDate();
		//获取每月的第一天
		String fd = DateUtil.getMonthFirstDay();
		System.out.println(datestr+":"+fd);
		return true;
		//测试过程中暂时关闭时间的判断
		/*if(datestr.equals(fd)){
			return true;
		}else{
			return false;
		}*/
	}
	
	/**
	 *检测日期是否正确 ，如果正确 ，则线程池开始触发线程 
	 */
	public void run(){
		while(true){
			boolean flag = TimeController.time();
			if(flag == true){
				Thread tml = new Thread(new Threadmail());
				tml.start();
				try {
					//休息三十一天  循环触发
					Thread.sleep(31*24*3600*1000L);
					run();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}else{//当日期不匹配的时候 每间隔一天启动检查一次
				try {
					Thread.sleep(24*60*60*1000L);
					run();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			
		}
		
	}
}
