
package com.zy.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

/**
 * 日期工具类
 * @author 周嚴
 */
public class DateUtil {

	private DateUtil() {
	}

	/**
	 * 格式化Date类型时间为默认格式[yyyy-MM-dd HH:mm:ss]
	 * 
	 * @param date
	 * @return
	 */
	public static String format(Date date) {
		return format(date, "yyyy-MM-dd HH:mm:ss");
	}

	/**
	 * 格式化Date类型时间为指定格式
	 * @param date
	 * @param pattern
	 * @return
	 */
	public static String format(Date date, String pattern) {
		return new SimpleDateFormat(pattern).format(date);
	}

	/**
	 * 格式化timestamp日期型
	 * 
	 * @param timestamp
	 *            日期
	 * @return 格式化后的日期，格式如：2005-12-04
	 */
	public static String convertDate(long timestamp) {
		return new SimpleDateFormat("yyyy-MM-dd").format(new Date(timestamp));
	}

	/**
	 * 格式化日期(当前日期)
	 * 
	 * @return 格式如：2005-12-05 12:25:36
	 */
	public static String getDateTime() {
		return getDateTime(new java.util.Date());
	}

	/**
	 * 取得SQL类型的DATE util.date转成sql.date
	 * 
	 * @param d
	 * @return
	 */
	public static java.sql.Date getSQLDate(Date d) {
		return new java.sql.Date(d.getTime());
	}

	/**
	 * 把Object对像转换成Date类型 如果对像为空或格式不能解析，返回当前日期
	 * 
	 * @param o
	 * @return
	 */
	public static Date getDate(Object o) {
		if (o == null) {
			return new Date();
		} else if (o instanceof Date) {
			return (Date) o;
		} else if (o instanceof String) {
			return getDate(String.valueOf(o));
		} else if (o instanceof java.sql.Timestamp) {
			return new Date(((java.sql.Timestamp) o).getTime());
		} else {
			return new Date();
		}
	}

	/**
	 * 根据传入的日期转换成字符形式的日期
	 * 
	 * @param date
	 *            日期型
	 * @return 如：2005-12-25 08:25:36
	 */
	public static String getDateTime(java.util.Date date) {
		if (date == null)
			return "";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String NDate = formatter.format(date);
		return NDate;
	}

	/**
	 * 日期格式化成日期时分，不取秒，
	 * 
	 * @param date
	 * @return 2005-12-25 12:25
	 */
	public static String getDateHF(java.util.Date date) {
		if (date == null)
			return "";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		String NDate = formatter.format(date);
		return NDate;
	}

	/**
	 * 日期格式化成日期时分，不取秒，
	 * 
	 * @param date
	 * @return 2005-12-25 12:25
	 */
	public static String getDateYYMMDD(java.util.Date date) {
		if (date == null)
			return "";
		SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
		String NDate = formatter.format(date);
		return NDate;
	}

	/**
	 * 日期格式化成日期时分，不取秒，
	 * 
	 * @return 2005-12-25 12:25
	 */
	public static String getDateYYMMDD() {
		SimpleDateFormat formatter = new SimpleDateFormat("yyMMdd");
		String NDate = formatter.format(new Date());
		return NDate;
	}

	public static String getDateYYYYMMDD() {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		String NDate = formatter.format(new Date());
		return NDate;
	}

	/**
	 * 日期格式化成时分，不取秒，
	 * 
	 * @param date
	 * @return 12:25
	 */
	public static String getHF(java.util.Date date) {
		if (date == null)
			return "";
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm");
		String NDate = formatter.format(date);
		return NDate;
	}

	/**
	 * @param date
	 * @return
	 */
	public static String getTimeString(java.util.Date date) {
		if (date == null)
			return "";
		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
		String NDate = formatter.format(date);
		return NDate;
	}

	public static String getTimeString(java.util.Date date, int ss) {
		if (date == null)
			return "";

		SimpleDateFormat formatter = new SimpleDateFormat("HH:mm:ss");
		String NDate = formatter.format(date.getTime() + ss * 60000);
		return NDate;
	}

	/**
	 * 取得年月日
	 * 
	 * @return 2008-12-25
	 */
	public static String getDateString() {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String NDate = formatter.format(new Date());
		return NDate;
	}

	/**
	 * 取得年月日-提前几个月
	 * 
	 * @return 2008-12-25
	 */
	public static String getDateString(java.util.Date date, int mm) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		Calendar g = Calendar.getInstance();
		g.setTime(date);
		g.add(Calendar.MONTH, -mm);
		Date d2 = g.getTime();
		String NDate = formatter.format(d2);
		return NDate;
	}

	/**
	 * 取得年月日
	 * 
	 * @return 08-12-25
	 */
	public static String getShortDateString() {
		SimpleDateFormat formatter = new SimpleDateFormat("yy-MM-dd");
		String NDate = formatter.format(new Date());
		return NDate;
	}

	/**
	 * 取得年月日
	 * 
	 * @param date
	 * @return 20058-12-25
	 */
	public static String getDateString(Date date) {
		if (date == null)
			return "";
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String NDate = formatter.format(date);
		return NDate;
	}

	/**
	 * 取得中文格式的日期
	 * 
	 * @return 2005后12月25日
	 */
	public static String getCnDate() {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日");
		String NDate = formatter.format(new Date());
		return NDate;
	}

	/**
	 * 取得中文格式的日期带参数&2009年09月18号 0918，程传义
	 * 
	 * @return 2005后12月25日
	 */
	public static String getCnDate1(Date date) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日");
		String NDate = "";
		if (date == null) {
			return NDate;
		} else {
			NDate = formatter.format(date);
		}

		return NDate;
	}

	/**
	 * 取得中文格式的日期
	 * 
	 * @return 2005后12月25日
	 */
	public static String getCnDateMD() {
		SimpleDateFormat formatter = new SimpleDateFormat("MM月dd日");
		String NDate = formatter.format(new Date());
		return NDate;
	}

	/**
	 * 取得中文格式的日期
	 * 
	 * @return 2005后12月25日
	 */
	public static String getCnDateMD(Date d) {
		SimpleDateFormat formatter = new SimpleDateFormat("MM月dd日");
		String NDate = formatter.format(d);
		return NDate;
	}

	public static String getCnDateMDHF(Date d) {
		SimpleDateFormat formatter = new SimpleDateFormat("MM月dd日HH:mm");
		String NDate = formatter.format(d);
		return NDate;
	}

	public static String getCnDateDHF(Date d) {
		SimpleDateFormat formatter = new SimpleDateFormat("dd日HH:mm");
		String NDate = formatter.format(d);
		return NDate;
	}

	/**
	 * 取得中文格式的日期
	 * 
	 * @return 2005后12月25日
	 */
	public static String getCnDateYM(Date d) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月");
		String NDate = formatter.format(d);
		return NDate;
	}

	/**
	 * 取得中文格式的日期
	 * 
	 * @return 2005后12月25日
	 */
	public static String getCnDateYM1(Date d) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM");
		String NDate = formatter.format(d);
		return NDate;
	}

	/**
	 * 取得中文格式的日期
	 * 
	 * @param d
	 * @return 2005后12月25日
	 */
	public static String getCnDateTime(Date d) {
		if (d == null)
			d = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日 HH时mm分");
		String NDate = formatter.format(d);
		return NDate;
	}

	/**
	 * 取得中文格式的日期
	 * 
	 * @param d
	 * @return 2005后12月25日
	 */
	public static String getCnDate(Date d) {
		if (d == null)
			d = new Date();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy年MM月dd日");
		String NDate = formatter.format(d);
		return NDate;
	}

	/**
	 * 根据传入的格式取得日期字符串
	 * 
	 * @param date
	 * @param Str
	 *            格式化格式，如yyyy-MM-dd
	 * @return
	 */
	public static String getDateStrByProp(Date date, String Str) {
		if (date == null)
			return "";
		String NDate = "";
		try {
			SimpleDateFormat formatter = new SimpleDateFormat(Str);
			NDate = formatter.format(date);
		} catch (Exception e) {
			NDate = "";
		}
		return NDate;
	}

	/**
	 * 取得当前日期的Long型 如1212452121222
	 * 
	 * @return
	 */
	public static long getTime() {

		return (new java.util.Date()).getTime();
	}

	/**
	 * 根据日期取得年月日 不推荐使用
	 * 
	 * @param DateString
	 * @return
	 */
	public static String getStrDate(String DateString) {
		return DateString.substring(0, 10);
	}

	/**
	 * 根据日期取得年月日 不推荐使用
	 * 
	 * @return
	 */
	public static String getStrDate() {
		return getDateTime().substring(0, 10);
	}

	/**
	 * 比较日期大小
	 * 
	 * @param last
	 * @param now
	 * @return
	 */
	public static boolean compareTo(String last, String now) {
		try {
			// DateFormat formatter=DateFormat.getDateInstance();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			Date temp1 = formatter.parse(last);
			Date temp2 = formatter.parse(now);
			if (temp1.after(temp2)) {
				return false;
			} else if (temp1.before(temp2)) {
				return true;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
	}

	/**
	 * 取得 addLong 毫秒以前（以后）的时间
	 * 
	 * @param olddate
	 * @param addLong
	 * @return
	 */
	public static Date getAddDate(Date olddate, long addLong) {
		long temp = olddate.getTime();
		temp += addLong;
		return new Date(temp);
	}

	/**
	 * @param date1
	 * @param date2
	 * @return
	 */
	public static int DateDiff(String date1, String date2) {
		long d1 = Math.abs(getDate(date2).getTime() - getDate(date1).getTime());
		int dNum = Math.round(d1 / 1000 / 60 / 60 / 24);
		return dNum;
	}

	public static int DateDiff(Date date1, Date date2) {
		if (date1 == null || date2 == null)
			return 0;
		long d1 = Math.abs(date2.getTime() - date1.getTime());
		int dNum = Math.round(d1 / 1000 / 60 / 60 / 24);
		return dNum;
	}

	public static void main(String[] s) {
		String bDate = "2005-11-12";
		String eDate = "2005-11-12";
		System.out.println("bDate:" + bDate);
		System.out.println("eDate:" + eDate);
		int d = DateUtil.DateDiff(bDate, eDate);
		System.out.println("d:" + d);
		System.out.println("ddddd===>" + getWeekBeginDate());
	}

	/**
	 * 把字符串转换成时间，格式为：yyyy-MM-dd HH:mm:ss
	 * @param dateStr
	 * @return
	 */
	public static Date getDate(String dateStr) {
		Date temp1 = null;
		if (dateStr == null || dateStr.equals("")) {
			return null;
		}
		SimpleDateFormat formatter = null;
		try {
			if (dateStr.indexOf(" ") != -1) {
				String[] aa = dateStr.split(":");
				if (aa.length == 3)
					formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				else if (aa.length == 2)
					formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
				else
					formatter = new SimpleDateFormat("yyyy-MM-dd HH");
			} else if (dateStr.indexOf("年") != -1) {
				formatter = new SimpleDateFormat("yyyy年MM月dd日");
			} else {
				formatter = new SimpleDateFormat("yyyy-MM-dd");
			}
			temp1 = formatter.parse(dateStr);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return temp1;
	}

	/**
	 * 把long型日期转换成天数
	 * 
	 * @param date
	 * @return
	 */
	public static String getDateLength(long date) {
		String s = "";
		if (date > 1000 * 60 * 60 * 24) {
			s += date / (1000 * 60 * 60 * 24) + "天";
			date = date % (1000 * 60 * 60 * 24);
		}
		if (date > 1000 * 60 * 60) {
			s += date / (1000 * 60 * 60) + "时";
			date = date % (1000 * 60 * 60);
		}
		if (date > 1000 * 60) {
			s += date / (1000 * 60) + "分";
		}
		return s;
	}

	/**
	 * 取得当前时间
	 * 
	 * @return
	 */
	public static Date getDate() {
		return new Date();
	}

	/**
	 * 取得当前星期
	 * 
	 * @return
	 */
	public static String getWeekDay() {
		String[] weekDay = new String[] { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };
		Calendar ca = Calendar.getInstance();
		return weekDay[ca.get(Calendar.DAY_OF_WEEK) - 1];
	}

	/**
	 * 取得指定周开始日期 默认从该周周一
	 * 
	 * @param year
	 * @param week
	 * @return
	 */
	public static Date getWeekBeginDate(int year, int week) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR, year);
		c.set(Calendar.WEEK_OF_YEAR, week);
		c.set(Calendar.DAY_OF_WEEK, 2);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return c.getTime();
	}

	/**
	 * 取得指定周开始日期 默认从该周周一
	 * 
	 * @return
	 */
	public static Date getWeekBeginDate() {
		Date d = new Date();
		Calendar c = Calendar.getInstance();
		c.set(Calendar.WEEK_OF_YEAR, DateUtil.getWeek(d));
		c.set(Calendar.DAY_OF_WEEK, 2);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return c.getTime();
	}

	/**
	 * 取得指定周开始日期 默认从该周周一
	 * 
	 * @param year
	 * @param month
	 * @return
	 */
	public static Date getMonthBeginDate(int year, int month) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR, year);
		c.set(Calendar.MONTH, month - 1);
		c.set(Calendar.DAY_OF_MONTH, 1);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return c.getTime();
	}

	/**
	 * 取得指定周开始日期 默认从该周周一
	 * @return
	 */
	public static Date getMonthBeginDate() {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.DAY_OF_MONTH, 1);
		c.set(Calendar.HOUR_OF_DAY, 0);
		c.set(Calendar.MINUTE, 0);
		c.set(Calendar.SECOND, 0);
		return c.getTime();
	}

	/**
	 * 取得指定周开始日期 默认从该周周一
	 * 
	 * @param year
	 * @param month
	 * @return
	 */
	public static Date getMonthEndDate(int year, int month) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR, year);
		c.set(Calendar.MONTH, month);
		c.set(Calendar.DAY_OF_MONTH, 0);
		c.set(Calendar.HOUR_OF_DAY, 23);
		c.set(Calendar.MINUTE, 59);
		c.set(Calendar.SECOND, 59);
		return c.getTime();
	}

	/**
	 * 取得指定周开始日期 默认从该周周一
	 * 
	 * @param d
	 * @return
	 */
	public static int getWeek(Date d) {
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		return c.get(Calendar.WEEK_OF_YEAR);
	}

	/**
	 * 取得指定周结束日期 默认为该周周日
	 * 
	 * @param year
	 * @param week
	 * @return
	 */
	public static Date getWeekEndDate(int year, int week) {
		Calendar c = Calendar.getInstance();
		c.set(Calendar.YEAR, year);
		c.set(Calendar.WEEK_OF_YEAR, week + 1);
		c.set(Calendar.DAY_OF_WEEK, 1);
		c.set(Calendar.HOUR_OF_DAY, 23);
		c.set(Calendar.MINUTE, 59);
		c.set(Calendar.SECOND, 59);
		return c.getTime();
	}

	/**
	 * 取得指定周结束日期 默认为该周周日
	 * @return
	 */
	public static Date getWeekEndDate() {
		Date d = new Date();
		Calendar c = Calendar.getInstance();
		c.set(Calendar.WEEK_OF_YEAR, DateUtil.getWeek(d) + 1);
		c.set(Calendar.DAY_OF_WEEK, 1);
		c.set(Calendar.HOUR_OF_DAY, 23);
		c.set(Calendar.MINUTE, 59);
		c.set(Calendar.SECOND, 59);
		return c.getTime();
	}

	/**
	 * 取得星期大写
	 * 
	 * @param i
	 * @return
	 */
	public static String getWeekStr(int i) {
		i = i % 7;
		String[] s = new String[] { "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" };
		return s[i];
	}

	/**
	 * 根据日期生成目录
	 * 
	 * @param d
	 * @return
	 */
	public static String getDatePath(Date d) {
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		StringBuffer path = new StringBuffer();
		path.append("/");
		path.append(c.get(Calendar.YEAR));
		path.append("/");
		path.append(c.get(Calendar.MONTH) + 1);
		path.append("/");
		path.append(c.get(Calendar.DATE));
		return path.toString();
	}

	/**
	 * 根据日期生成访问路经
	 * 
	 * @param d
	 * @return
	 */
	public static String getDateViewPath(Date d) {
		Calendar c = Calendar.getInstance();
		c.setTime(d);
		StringBuffer path = new StringBuffer();
		path.append("/");
		path.append(c.get(Calendar.YEAR));
		path.append("/");
		path.append(c.get(Calendar.MONTH) + 1);
		path.append("/");
		path.append(c.get(Calendar.DATE));
		return path.toString();
	}

	/**
	 * 得到本月的第一天
	 * 
	 * @return
	 */
	public static String getMonthFirstDay() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMinimum(Calendar.DAY_OF_MONTH));

		return convertDate(calendar.getTimeInMillis());
	}

	/**
	 * 得到本月的最后一天
	 * 
	 * @return
	 */
	public static String getMonthLastDay() {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));
		return convertDate(calendar.getTimeInMillis());
	}

	/**
	 * 获取2个字符日期的天数差
	 * @param p_startDate
	 * @param p_endDate
	 * @return 天数差
	 * @Date: 2011-7-24
	 */
	public static long getDaysOfTowDiffDate(String p_startDate, String p_endDate) throws java.text.ParseException {

		Date l_startDate = toUtilDateFromStrDateByFormat(p_startDate, "yyyy-MM-dd");
		Date l_endDate = toUtilDateFromStrDateByFormat(p_endDate, "yyyy-MM-dd");
		long l_startTime = getMillisOfDate(l_startDate);
		long l_endTime = getMillisOfDate(l_endDate);
		long betweenDays = (long) ((l_endTime - l_startTime) / (1000 * 60 * 60 * 24));
		return betweenDays;
	}

	/**
	 * 字符型日期转化util.Date型日期
	 * @Param:p_strDate 字符型日期
	 * @param p_format 格式:"yyyy-MM-dd" / "yyyy-MM-dd hh:mm:ss"
	 * @Return:java.util.Date util.Date型日期
	 * @Throws: ParseException
	 * @Date: 2011-7-24
	 */
	public static java.util.Date toUtilDateFromStrDateByFormat(String p_strDate, String p_format) throws java.text.ParseException {
		java.util.Date l_date = null;
		java.text.DateFormat df = new java.text.SimpleDateFormat(p_format);
		if (p_strDate != null && (!"".equals(p_strDate)) && p_format != null && (!"".equals(p_format))) {
			l_date = df.parse(p_strDate);
		}
		return l_date;
	}

	/**
	 * 获取指定日期的毫秒
	 * @param p_date util.Date日期
	 * @return long 毫秒
	 * @Date: 2011-7-24
	 */
	public static long getMillisOfDate(java.util.Date p_date) {
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTime(p_date);
		return c.getTimeInMillis();
	}

	/**
	 * 
	 * @param date
	 * @param days
	 * @return
	 */
	public static String getDateBydays(Date date, int days) {
		SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.DAY_OF_YEAR, calendar.get(Calendar.DAY_OF_YEAR) + days);
		return df.format(calendar.getTime());
	}

	/**
	 * 根据给定的个月数mothcount，推算距离mothcount的日期 如果mothcount为负数，则推算mothcount个月前的日期
	 * 如果mothcount为正数，则推算mothcount个月后的日期
	 * 
	 * @date 2011-11-3
	 * @param mothcount
	 * @return
	 */
	public static Date getDatebaseNow(int mothcount) {
		Calendar calendar = Calendar.getInstance(); // 取得时间
		calendar.add(Calendar.MONTH, mothcount);
		Date date = calendar.getTime();
		return date;
	}

	/**
	 * 计算年龄
	 * @param birthDay
	 * @return
	 * @throws Exception
	 *             @ return
	 */
	public static int getAge(Date birthDay) throws Exception {
		Calendar cal = Calendar.getInstance();
		int yearNow = cal.get(Calendar.YEAR);
		int monthNow = cal.get(Calendar.MONTH) + 1;// 注意此处，如果不加1的话计算结果是错误的
		int dayOfMonthNow = cal.get(Calendar.DAY_OF_MONTH);
		cal.setTime(birthDay);
		int yearBirth = cal.get(Calendar.YEAR);
		int monthBirth = cal.get(Calendar.MONTH);
		int dayOfMonthBirth = cal.get(Calendar.DAY_OF_MONTH);
		int age = yearNow - yearBirth;
		if (monthNow <= monthBirth) {
			if (monthNow == monthBirth) {
				if (dayOfMonthNow < dayOfMonthBirth) {
					age--;
				} else {
					// do nothing
				}
			} else {
				age--;
			}
		} else {
		}
		return age;
	}

	/**
	 * 转换CST或CDT格式字符串为时间
	 * @param dstr
	 *            Sun Aug 1 00:00:00 CST 2010
	 * @return
	 */
	public static Date CSTtoDate(String dstr) {
		if (dstr == null || "".equals(dstr.trim())) {
			return null;
		}
		DateFormat df = new SimpleDateFormat("EEE MMM dd HH:mm:ss 'CST' yyyy", Locale.ENGLISH);
		DateFormat cdt = new SimpleDateFormat("EEE MMM dd HH:mm:ss 'CDT' yyyy", Locale.ENGLISH);
		Date date = null;
		try {
			if (dstr.indexOf("CDT") > 0) {
				date = (Date) cdt.parse(dstr);
			} else {
				date = (Date) df.parse(dstr);
			}
		} catch (java.text.ParseException e) {
			e.printStackTrace();
		}
		return date;
	}

	/**
	 * 自动识别转换日期类型
	 * @param string
	 * @return
	 * @throws ParseException
	 */
	public static Date parse(String string) throws ParseException {
		SimpleDateFormat formatter = null;
		String dateFormat = null;
		if (string.indexOf("/") > -1) {
			dateFormat = "yyyy/MM/dd";
		} else if (string.indexOf("-") > -1) {
			dateFormat = "yyyy-MM-dd";
		} else if (string.indexOf("年") > -1) {
			dateFormat = "yyyy年MM月dd日";
		}
		if (string.indexOf(" ") > -1) {
			if (string.indexOf("CST") > -1) {
				formatter = new SimpleDateFormat("EEE MMM dd HH:mm:ss 'CST' yyyy", Locale.ENGLISH);
			} else if (string.indexOf("CDT") > -1) {
				formatter = new SimpleDateFormat("EEE MMM dd HH:mm:ss 'CDT' yyyy", Locale.ENGLISH);
			} else {
				String[] aa = string.split(":");
				if (aa.length == 3) {
					formatter = new SimpleDateFormat(dateFormat + " HH:mm:ss");
				} else if (aa.length == 2) {
					formatter = new SimpleDateFormat(dateFormat + " HH:mm");
				} else {
					formatter = new SimpleDateFormat(dateFormat + " HH");
				}
			}
		} else {
			formatter = new SimpleDateFormat(dateFormat);
		}
		return formatter.parse(string);
	}

}