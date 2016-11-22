package com.zy.common;

import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

/**
 * @author 周嚴
 * condition环境类<br>
 * request传入参数的处理<br>
 * Mapper里面Where条件condition<br>
 * <b>固定参数:</b><pre>page:当前显示页数<br>rows:分页条数大小</pre>
 */
public class Condition extends HashMap<String, Object> {

	private static final long serialVersionUID = -2410690239529620846L;

	public Condition() {
	}

	public Condition(HttpServletRequest request) {
		inversionCondition(request, false, false);
	}

	/**
	 * 将request中的所有parameter数据放进condition中.<br>
	 * 默认不允许空值插入<br>
	 * 默认不进行URL转码<br>
	 * 
	 * @param condition
	 *            要注入的condition对象
	 */
	public void inversionCondition(HttpServletRequest request) {
		inversionCondition(request, false, false);
	}

	/**
	 * 将request中的所有parameter数据放进condition中.<br>
	 * 默认不进行URL转码<br>
	 * 
	 * @param condition
	 *            要注入的condition对象
	 * @param allowedNull
	 *            是否允许将空值放如condition对象中
	 */
	public void inversionCondition(HttpServletRequest request, boolean allowedNull) {
		inversionCondition(request, allowedNull, false);
	}

	/**
	 * 将request中的所有parameter数据放进condition中.
	 * 
	 * @param condition
	 *            要注入的condition对象
	 * @param allowedNull
	 *            是否允许将空值放如condition对象中
	 * @param urlDecode
	 *            是否要进行url解码
	 */
	public void inversionCondition(HttpServletRequest request, boolean allowedNull, boolean urlDecode) {
		Enumeration<?> url = request.getParameterNames();//枚举
		if (url != null) {
			while (url.hasMoreElements()) {
				String _pare = url.nextElement().toString();//返回下一个元素的枚举
				if (_pare.equals("rows")) continue;

				String[] _val = request.getParameterValues(_pare);

				/* 判断是否需要跳过 */
				if (_val == null || _val.length == 0) continue;

				if (!allowedNull) { // 不允许为空, 去空
					ArrayList<String> val = new ArrayList<String>();
					for (int i = 0; i < _val.length; i++) {
						String v = _val[i].trim();
						if (v.length() != 0) {
							val.add(v);
						}
					}
					_val = (String[]) val.toArray(new String[0]);
				}
				if (_val.length == 1) {
					this.put(_pare, _val[0]);
				} else if (_val.length != 0) {
					this.put(_pare, _val);
				}
			}
		}
		String _commpage = request.getParameter("page");
		String _commrows = request.getParameter("rows");
//		String sort = request.getParameter("sort");
//		if (sort != null && sort.length() == 0) sort = null;

		int commpage = 1;
		int commrows = 10;

		if (_commpage != null && _commpage.length() > 0) {
			try {
				commpage = Integer.parseInt(_commpage);
			} catch (Exception e) {
			}
		}
		if (_commrows != null && _commrows.length() > 0) {
			try {
				commrows = Integer.parseInt(_commrows);
			} catch (Exception e) {
			}
		}

		int start = (commpage - 1) * commrows;
		int end = commpage * commrows;
		this.put("__start__", start);
		this.put("__end__", end);
//		this.put("__sort__", sort);
	}

	/**
	 * 增加排序
	 * @param column
	 * @param sort
	 */
	public void addSort(String column, String sort) {
		HashMap<String, String> sortMap = (HashMap<String, String>) this.get("__sort__");
		if (sortMap == null) sortMap = new HashMap<String, String>();
		this.put("__sort__", sortMap);
		sortMap.put(column, sort);
	}

	/**
	 * 获取排序
	 * @param column
	 * @param sort
	 */
	public String getSort(String column) {
		HashMap<String, String> sortMap = (HashMap<String, String>) this.get("__sort__");
		if (sortMap == null) return null;
		this.put("__sort__", sortMap);
		return sortMap.get(column);
	}

	/**
	 * 删除排序
	 * @param column
	 * @param sort
	 */
	public String removeSort(String column) {
		HashMap<String, String> sortMap = (HashMap<String, String>) this.get("__sort__");
		if (sortMap == null) return null;
		this.put("__sort__", sortMap);
		String result = sortMap.remove(column);
		if (sortMap.isEmpty()) this.remove("__sort__");
		return result;
	}

}
