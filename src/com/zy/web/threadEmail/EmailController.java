package com.zy.web.threadEmail;

import java.io.File;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Controller;
/**
 * 邮件发送控制类
 * 邮件发送控制 邮件具体发送细节
 * @author 周嚴
 *
 */
@Controller
public class EmailController {
	//开发过程中，暂时关闭项目对邮件的支持
	static{
		TimeController tc = new TimeController();
		tc.start();
	}
	
	/*public static void main(String[] args) {
		EmailController.sendEmail("Anteoy@163.com", "332396949@qq.com", "<html><head></head><body><h1>你好：附件中有学习资料！</h1></body></html>");
		
	}*/
	
	public static int sendEmail(String From,String To,String Text){
		try {
			ApplicationContext ctx = new ClassPathXmlApplicationContext("spring-base.xml");
			/*JavaMailSenderImpl,这里bean配置名为JavaMailSender: 邮件发送器，主要提供了邮件发送接口、透明创建Java Mail的MimeMessage、及邮件发送的配置(如:host/port/username/password...)*/
			JavaMailSender sender = (JavaMailSender)ctx.getBean("javaMailSender");
			// 建立邮件消息,发送简单邮件和html邮件的区别
			MimeMessage msg = sender.createMimeMessage();
			// 注意这里的boolean,等于真的时候才能嵌套图片，在构建MimeMessageHelper时候，所给定的值是true表示启用，  
			// multipart模式 为true时发送附件 可以设置html格式 
			MimeMessageHelper helper = new MimeMessageHelper(msg,true,"utf-8");
			// 设置收件人，寄件人
			helper.setFrom(From);
			helper.setTo(To);
			/*helper.setText("tets this is a spring mvc email");*/
			// true 表示启动HTML格式的邮件
			helper.setText(Text,true);
			//spring API通过 FileSystemResource 以文件系统绝对路径的方式进行访问
			FileSystemResource file = new FileSystemResource(new File("E:\\commons-collections-3.1.jar"));  
			// 这里的方法调用和插入图片是不同的。  
			helper.addAttachment("test.jar", file);  
			helper.setSubject("个人薪资单");
			//发送邮件消息msg
			sender.send(msg);
			System.out.println("email send ok");
			return 1;	
			} catch (MessagingException e) {
				System.out.println("send fail");
				e.printStackTrace();
				return 0;
			}
	}
}
