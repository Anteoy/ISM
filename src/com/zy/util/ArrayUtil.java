package com.zy.util;

import java.util.List;
/**
 * @filename ArrayUtil.java
 * @package [Gucang]
 * @description 字节数据工具类
 * @author 周嚴 
 * @date 2016-3-11 下午10:37:25
 * @version v0.1
 */

/**
 * 数组操作类
 * @author 周嚴
 */
public class ArrayUtil {

	/**
	 * 从src数组中截取start开始length个数据
	 * @param src
	 * @param start
	 * @param length
	 * @return
	 */
	public static byte[] subArray(byte[] src, int start) {
		if (start == 0) {
			return src;
		}
		int length = src.length - start;
		byte[] dest = new byte[length];
		System.arraycopy(src, start, dest, 0, length);
		return dest;
	}

	/**
	 * 从src数组中截取start开始length个数据
	 * @param src
	 * @param start
	 * @param length
	 * @return
	 */
	public static byte[] subArray(byte[] src, int start, int length) {
		if (start == 0 && src.length == length) {
			return src;
		}
		byte[] dest = new byte[length];
		System.arraycopy(src, start, dest, 0, length);
		return dest;
	}

	/**
	 * 将src数组中的数据合并
	 * @param src
	 * @param src2
	 * @param start
	 * @param length
	 * @return
	 */
	public static byte[] merge(byte[] src, byte[] src2, int start, int length) {
		byte[] dest = new byte[src.length + length];
		System.arraycopy(src, 0, dest, 0, src.length);
		System.arraycopy(src2, start, dest, src.length, length);
		return dest;
	}

	/**
	 * 将src数组中的数据合并
	 * @param dest
	 * @param src
	 * @return
	 */
	public static byte[] merge(byte[]... src) {
		if (src == null || src.length == 0) {
			return null;
		}
		int len = src.length;
		if (len > 1) {
			int length = 0;
			for (int i = 0; i < len; i++) {
				length += src[i].length;
			}
			byte[] dest = new byte[length];
			length = 0;
			for (int i = 0; i < len; i++) {
				byte[] sbyte = src[i];
				System.arraycopy(sbyte, 0, dest, length, sbyte.length);
				length += sbyte.length;
			}
			return dest;
		}
		return src[0];
	}

	/**
	 * 查找某个字节数组在源数组中的位置
	 * @param data
	 * @param dest
	 * @return
	 */
	public static int ArrayIndexOf(byte[] data, byte[] dest) {
		return ArrayIndexOf(data, dest, 0);
	}

	/**
	 * 查找某个字节数组在源数组中的位置
	 * @param data
	 * @param dest
	 * @param start
	 * @return
	 */
	public static int ArrayIndexOf(byte[] data, byte[] dest, int start) {
		if (data == null || data.length == 0 || dest == null || dest.length == 0 || data.length < dest.length || start < 0) {
			return -1;
		}
		for (int i = start; i < data.length; i++) {
			boolean found = true;
			for (int j = 0; j < dest.length; j++) {
				if (data[i + j] != dest[j]) {
					found = false;
					break;
				}
			}
			if (found) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * 从数组中,取出第一个, 如果list==null 或者 list.size==0 则返回一个新的对象
	 * @param list
	 * @param clazz
	 * @return
	 */
	public static <T> T GetListOne(List<T> list, Class<T> clazz) {
		T result = null;
		if (list != null && list.size() > 0) {
			result = (T) list.get(0);
		}
		if (result == null)
			try {
				result = clazz.newInstance();
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				e.printStackTrace();
			}
		return result;
	}

}
