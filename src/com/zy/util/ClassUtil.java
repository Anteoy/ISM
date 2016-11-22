
package com.zy.util;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

/**
 * 类控制工具
 * @author 周嚴
 */
public class ClassUtil {

	private ClassUtil() {
	}

	/**
	 * 获取某类中的某属性的类型
	 * @param c
	 * @return
	 * @throws NoSuchFieldException 
	 * @throws SecurityException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 */
	public static Class<?> GetFieldType(Object o, String field) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
		Field _field = o.getClass().getDeclaredField(field);
		_field.setAccessible(true);
		return _field.getType();
	}

	/**
	 * 获取某类中的某属性值
	 * @param c
	 * @return
	 * @throws NoSuchFieldException 
	 * @throws SecurityException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 */
	public static Object GetFieldValue(Object o, String field) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
		Field _field = o.getClass().getDeclaredField(field);
		_field.setAccessible(true);
		return _field.get(o);
	}

	/**
	 * 设置某类中某属性值
	 * @param c
	 * @param field
	 * @param object
	 * @throws SecurityException
	 * @throws NoSuchFieldException
	 * @throws IllegalArgumentException
	 * @throws IllegalAccessException
	 */
	public static void SetFieldValue(Object o, String field, Object object) throws SecurityException, NoSuchFieldException, IllegalArgumentException, IllegalAccessException {
		Field _field = o.getClass().getDeclaredField(field);
		_field.setAccessible(true);
		_field.set(o, object);
	}

	/**
	 * 执行某类中的某方法
	 * @param c
	 * @param method
	 * @param param
	 * @return
	 * @throws NoSuchMethodException 
	 * @throws SecurityException 
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 */
	public static Object ExecuteMethod(Object o, String method, Object... param) throws SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException {
		Class<?>[] paramType = null;
		if (param != null) {
			paramType = new Class<?>[param.length];
			for (int i = 0; i < param.length; i++) {
				paramType[i] = param[i].getClass();
			}
		}
		Method _method = o.getClass().getDeclaredMethod(method, paramType);
		return _method.invoke(o, param);
	}

	/**
	 * 把JavaBean对象转换成Map对象
	 * @param o
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public static Map<String, Object> ToMap(Object o) {
		if (o == null) return null;
		if (o instanceof Map) return (Map<String, Object>) o;
		Map<String, Object> map = new HashMap<String, Object>();
		Field[] fields = o.getClass().getDeclaredFields();
		for (int i = 0; i < fields.length; i++) {
			try {
				map.put(fields[i].getName(), GetFieldValue(o, fields[i].getName()));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return map;
	}

}
