package com.zy.common;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.JsonSerializer;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializerProvider;
import org.codehaus.jackson.map.ser.CustomSerializerFactory;
import org.springframework.stereotype.Component;

/**
 * 解决SpringMVC使用@ResponseBody返回json时，日期格式默认显示为时间戳的问题。需配合<mvc:message-converters>使用
 * 组件 自定义对象映射
 * @author 周嚴
 *
 */
@Component("customObjectMapper")
public class CustomObjectMapper extends ObjectMapper {//Jackson jar
   //自定义对象映射类
	private final static SimpleDateFormat SDF_DT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

	private final static SimpleDateFormat SDF_D = new SimpleDateFormat("yyyy-MM-dd");

	public CustomObjectMapper() {//Jackson jar
		CustomSerializerFactory factory = new CustomSerializerFactory();
		factory.addGenericMapping(Date.class, new JsonSerializer<Date>() {
			@Override
			public void serialize(Date value, JsonGenerator jsonGenerator, SerializerProvider provider) throws IOException, JsonProcessingException {
				if (value instanceof java.sql.Date) {
					jsonGenerator.writeString(SDF_D.format(value));
				} else {
					jsonGenerator.writeString(SDF_DT.format(value));
				}
			}
		});
		this.setSerializerFactory(factory);
	}

}