package com.zy.common;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import net.sf.ezmorph.ObjectMorpher;
/**
 * 在Json中转化字符串到Bean时解决Timestamp格式数据报错问题
 * @author 周嚴
 *
 */
@SuppressWarnings("rawtypes")
public class TimestampMorpher implements ObjectMorpher {

	private static final SimpleDateFormat sdf_date = new SimpleDateFormat("yyyy-MM-dd");
	private static final SimpleDateFormat sdf_datetime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	@Override
	public boolean supports(Class clazz) {return true;}

	@Override
	public Class morphsTo() {return Timestamp.class;}

	@Override
	public Object morph(Object value) {
		if (value == null || ((String) value).length() == 0) return null;
		String str = (String) value;
		try {
			if (str.length() > 10) {
				return new Timestamp(sdf_datetime.parse(str).getTime());
			} else {
					return new Timestamp(sdf_date.parse(str).getTime());
			}
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
}
