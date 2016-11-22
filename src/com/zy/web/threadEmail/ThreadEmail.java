package com.zy.web.threadEmail;


/**
 * 设置具体发送邮件参数，并调用EmailController的静态邮件发送方法（邮件方法具体实现）
 * @author 周嚴
 *
 */
public class ThreadEmail implements Runnable{
	public String From;
	public String To;
	public String Text;
	




	/**
	* 调用具体发送Email方法
	* @return boolean
	*/
	public void run(){
		try {
			EmailController.sendEmail(From, To, Text);
			} catch (Exception e) {
					System.out.println("send fail");
					e.printStackTrace();
			}
	
	}




	public String getFrom() {
		return From;
	}




	public void setFrom(String from) {
		From = from;
	}




	public String getTo() {
		return To;
	}




	public void setTo(String to) {
		To = to;
	}




	public String getText() {
		return Text;
	}




	public void setText(String text) {
		Text = text;
	}
}
