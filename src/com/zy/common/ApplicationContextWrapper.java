package com.zy.common;
/**
 * 根据不同的客户情况部署不同的配置，配置文件不能写死在代码中。这里通过HttpServlet来获取应用程序上下文
 */
import org.springframework.web.context.WebApplicationContext;
//spring包装类

/*import com.zy.ism.AutoCheckSmsThread;*/
/**
 * 提供全局的ApplicationContext
 * @author 周嚴
 *
 */
public class ApplicationContextWrapper {

	/** 自动读取回复和报告入库 *//*
	private static AutoCheckSmsThread AUTOCHECKSMSTHREAD = null;
	static {
		synchronized (ApplicationContextWrapper.class) {
			if (AUTOCHECKSMSTHREAD == null) {
				AUTOCHECKSMSTHREAD = new AutoCheckSmsThread();
				AUTOCHECKSMSTHREAD.start();
			}
		}
	}*/

	private static WebApplicationContext applicationContext;

	public static void setApplicationContext(WebApplicationContext webApplicationContext) {
		applicationContext = webApplicationContext;
	}

	public static WebApplicationContext getApplicationContext() {
		return applicationContext;
	}

	public static Object getBean(String beanName) {
		return applicationContext.getBean(beanName);
	}

	public static <T> T getBean(Class<T> clazz) {
		return applicationContext.getBean(clazz);
	}

}
