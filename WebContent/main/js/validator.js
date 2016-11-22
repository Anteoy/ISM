//扩展easyui表单的验证
$.extend($.fn.validatebox.defaults.rules, {
	checkbox : {
		validator : function(value) {
			return this.validator.caller.arguments[0].checked;
		},
		message : '该项为必须选择项'
	},
	radiobox : {
		validator : function(value) {
			return this.validator.caller.arguments[0].checked;
		},
		message : '该项为必须选择项'
	},
	yinjnl: { // 饮酒年龄
		validator : function(value) {
			if (!(/^[+\-]?\d+(.\d+)?$/.test(value))) {
				return false;
			}
			var ksyjnl = $("shenghfs_kaisyjnl").val();
			if (ksyjnl == null) ksyjnl = 0;
			var jlnl = $("#shenghfs_jiejnl").val();
			if (jlnl == null) jlnl = 0;
			if (ksyjnl > jlnl) return false;
		},
		message: "饮酒年龄必须为数字,并且戒酒年龄不得小于开始饮酒年龄."
	},
	apgar : {
		validator : function(value) {
			return /^([0-9]|10)(-([0-9]|10))*$/.test(value);
		},
		message : '阿氏评分格式：9-10-10<br/>用短横分割为1分钟,5分钟,10分钟<br/>填写范围0~10.'
	},
	Date : {
		validator : function(value) {
			return /^[1-2]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[0-1])$/.test(value);
		},
		message : '日期格式：2012-12-04'
	},
	number : {
		validator : function(value) {
			return /^\d+$/.test(value);
		},
		message : '只能输入数字.'
	},
	number1 : {
		validator : function(value) {
			if(/^[+\-]?\d+(.\d+)?$/.test(value)){
				 return true;
			}
			else{
				$.fn.validatebox.defaults.rules.number1.message = '请输入数字。格式例如：4.5';
				return false;
			}
		}
	},	
	
	dianhua : {
		validator : function(value) {
			var reg = /^\d{8,11}$/;
			return reg.test(value);
		},
		message : '输入座机或手机.'
	},

	CHS : {
		validator : function(value) {
			return /^[\u0391-\uFFE5]+$/.test(value);
		},
		message : '只能输入汉字'
	},
	PASSWORD : {
		validator : function(value1, value2) {
			return value1 == value2 ? true : false;
		},
		message : '两次输入密码不同'
	},
	// 移动手机号码验证
	mobile : {
		// value值为文本框中的值
		validator : function(value) {
			var reg = /^1[3|4|5|8|9]\d{9}$/;
			return reg.test(value);
		},
		message : '输入手机号码格式不准确.'
	},
	// 国内邮编验证
	zipcode : {
		validator : function(value) {
			var reg = /^[1-9]\d{5}$/;
			return reg.test(value);
		},
		message : '邮编必须是非0开始的6位数字.'
	},
	// 身份证号码
	passcard : {
		validator : function(value) {
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			return reg.test(value);
		},
		message : '输入身份证号码错误.'
	},
	shenfzh: {
		validator : function(idCard) {
			if (idCard == null || idCard.length == 0) return false;
			if (idCard.length == 18) { // 位数
				if (CARD_2.indexOf(idCard.substring(0, 2).concat(","))>-1) { // 省份
					var year = parseInt(idCard.substring(6, 10));
					var regexp = "^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$";
					if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) //  闰年
						regexp = "^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$";
					if (idCard.match(regexp)) { // 格式
						var last = GetLastIDNum(idCard);
						if (last == idCard.charAt(idCard.length - 1)) { // 尾号
							/* 身份证号正确 */
							return true;
						}
					}
				}
			} else if (idCard.length == 15) {
				if (CARD_2.indexOf(idCard.substring(0, 2).concat(","))>-1) { // 省份
					var year = parseInt("19" + idCard.substring(6, 8));
					var regexp = "^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}$";
					if (year % 100 != 0 && (year % 400 == 0 || year % 4 == 0)) //  闰年
						regexp = "^[1-9][0-9]{5}[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}$";
					if (idCard.match(regexp)) { // 格式
						/* 身份证号正确 */
						return true;
					}
				}
			}
			return false;
		},
		message : '身份证号不正确'
	},
	//验证时间范围
	minDate : {
		validator : function(value, param) {
			var today = new Date();
			var dateB = $.fn.datebox.defaults.parser($(param[0]).datebox('getValue'));
			return dateB.getFullYear() > (today.getFullYear()-150) && dateB.getFullYear() < (today.getFullYear()+1);
		},
		message : '输入日期应在当前时间前150年，当前时间后1年内时间'
	},
	//验证随访日期
	YanzSuifDate : {
		validator : function(value, param) {
			var dateB = $.fn.datebox.defaults.parser($(param[0]).datebox('getValue'));
			var dateC = $.fn.datebox.defaults.parser($(param[1]).datebox('getValue'));
			return dateB >= dateC;
		},
		message : '日期应在随访日期后'
	},
	// 用户账号验证(只能包括 _ 数字 字母)
	account : {
		// param的值为[]中值
		validator : function(value, param) {
			if (value.length < param[0] || value.length > param[1]) {
				$.fn.validatebox.defaults.rules.account.message = '用户名长度必须在' + param[0] + '至' + param[1] + '范围';
				return false;
			} else {
				if (!/^[\w]+$/.test(value)) {
					$.fn.validatebox.defaults.rules.account.message = '用户名只能数字、字母、下划线组成.';
					return false;
				} else {
					return true;
				}
			}
		},
		message : ''
	},
	
	
	//验证小数
	/**
	 * 	param[0] '标题'
	 * 	param[1] '范围' 
	 * */
	xiaoshu:{
		validator : function(value, param) {
			if(/^[+\-]?\d+(.\d+)?$/.test(value)){
				if(value>param[1])
				{
					$.fn.validatebox.defaults.rules.xiaoshu.message = param[0]+'不能超过'+param[1];
					return false;
				}else
				{
					if(value!=0)
					{
						return true;
					}
					else
					{
						$.fn.validatebox.defaults.rules.xiaoshu.message = param[0]+'必须大于0';
						return false;
					}
				}
			}else{
				$.fn.validatebox.defaults.rules.xiaoshu.message = '请输入数字。格式例如：4.5';
				return false;
			}
		},
		message : ''
	},	
	zhengshu:{
		validator : function(value, param) {
			if(/^\d+$/.test(value)){
				if(value>param[1])
				{
					$.fn.validatebox.defaults.rules.zhengshu.message = param[0]+'不能超过'+param[1];
					return false;
				} else
				{
					return true;
				}
			}else{
				$.fn.validatebox.defaults.rules.zhengshu.message = '请输入数字。格式例如：10';
				return false;
			}
		},
		message : ''
	},
	//范围
	/***
	 * 60<收缩压<300.
	 * 	param[0] '标题'
	 * 	param[1] '范围1' 
	 *  param[2] '范围2' 
	 */	
	fanwei:{
		validator : function(value, param) {
			if (/^\d+(\.\d+)?$/.test(value)) {
				if( parseFloat(value) < parseFloat(param[1]) ) {
					$.fn.validatebox.defaults.rules.fanwei.message = param[0]+'不能小于'+ param[1];
					return false;
				} else if( parseFloat(value) > parseFloat(param[2]) ) {
					$.fn.validatebox.defaults.rules.fanwei.message =param[0]+'不能大于'+ param[2];
					return false;
				} else { 
					return true;
				}
			} else {
				$.fn.validatebox.defaults.rules.fanwei.message = '请输入数字。格式例如：4.5';
				return false;
			}
		},
		message : ''
	},
	
	/***
	 * 60<收缩压<300.
	 * 	param[0] '标题'
	 * 	param[1] '范围1' 
	 *  param[2] '范围2' 
	 *  在这个范围之内必须是整数
	 */	
	fanweiqjy:{
		validator : function(value, param) {
			if (/^\d+(\.\d{1})?$/.test(value)) {
				if( parseFloat(value) < parseFloat(param[1]) ) {
					$.fn.validatebox.defaults.rules.fanweiqjy.message = param[0]+'不能小于'+ param[1];
					return false;
				} else if( parseFloat(value) > parseFloat(param[2]) ) {
					$.fn.validatebox.defaults.rules.fanweiqjy.message =param[0]+'不能大于'+ param[2];
					return false;
				} else {
					return true;
				}
			} else {
				$.fn.validatebox.defaults.rules.fanweiqjy.message = '请输入整数数。格式例如：4';
				return false;
			}
		},
		message : ''
	},
	/***
	 * 60<收缩压<300.
	 * 	param[0] '标题'
	 * 	param[1] '范围1'
	 *  param[2] '范围2'
	 *  在这个范围之内精确一位小数
	 */	
	fanweiqjyxs:{
		validator : function(value, param) {
			if (/^\d+(\.\d{1})?$/.test(value)) {
				if( parseFloat(value) < parseFloat(param[1]) ) {
					$.fn.validatebox.defaults.rules.fanweiqjyxs.message = param[0]+'不能小于'+ param[1];
					return false;
				} else if( parseFloat(value) > parseFloat(param[2]) ) {
					$.fn.validatebox.defaults.rules.fanweiqjyxs.message =param[0]+'不能大于'+ param[2];
					return false;
				} else {
					return true;
				}
			} else {
				$.fn.validatebox.defaults.rules.fanweiqjyxs.message = '请输入数字。格式例如：4.5';
				return false;
			}
		},
		message : ''
	},
	/**
	 * 整数，偶数，必须在范围之类
	 */
	fanwzsos:{
		validator : function(value, param) {
			if (/^\d+$/.test(value)) {
				if (value % 2 != 0) {
					$.fn.validatebox.defaults.rules.fanwzsos.message = '只能输入偶数';
					return false;
				}
				if( parseFloat(value) < parseFloat(param[1]) ) {
					$.fn.validatebox.defaults.rules.fanwzsos.message = param[0]+'不能小于'+ param[1];
					return false;
				} else if( parseFloat(value) > parseFloat(param[2]) ) {
					$.fn.validatebox.defaults.rules.fanwzsos.message =param[0]+'不能大于'+ param[2];
					return false;
				} else {
					return true;
				}
			} else {
				$.fn.validatebox.defaults.rules.fanwzsos.message = '请输入整数。格式例如：4';
				return false;
			}
		},
		message : ''
	}
});


$(document).ready(function(){
	
	$('.iDate').each(function(index) {
		var $this = jQuery(this);
		$this.keypress(function(key) {
			var val = $this.val();
			if (val.length >= 10) return false; // 如果文本长度已经大于或等于10, 中断按键
			if (key.keyCode != 45 && (key.keyCode < 48 || key.keyCode > 57)) return false; // 如果按下的不是-建或不是数字,中断按键操作
			if (key.keyCode == 45 && (val.length == 4 || val.length == 7)) { // 当按下-键时,如果字符长度等于4或等于7,则加上-符号,并中断按键
				$this.val(val+"-");
				return false;
			} else if (val.length == 4) {
				$this.val(val + "-");
			} else if (val.length == 7) {
				$this.val(val + "-");
			} else if (key.keyCode == 45) { // 如果无法满足上述任意条件,并按下-键,中断按键操作
				return false;
			}
		});
	});	
	
});

var CARD_2 = "11,12,13,14,15,21,22,23,31,32,33,34,35,36,37,41,42,43,44,45,46,50,51,52,53,54,61,62,63,64,65,71,81,82,91,";
var WEIGHTARRAY = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];//权数数组
var VCODE = "10X98765432";//校验码字符串

function GetLastIDNum(preIds) {
    var lastId = null;
    //当传入的字符串没有17位的时候，则无法计算，直接返回
    if(preIds == null || preIds.length<17) {
        return null;
    }
    var sumNum = 0;//前17为乘以权然后求和得到的数
    
    //循环乘以权，再求和
    for(var i=0;i<17;i++) {
        var index = parseInt(preIds.charAt(i));
        sumNum = sumNum + index * WEIGHTARRAY[i];//乘以权数，再求和
    }
    
    var modNum = sumNum%11;//求模
    lastId = VCODE.charAt(modNum);//从验证码中找出对应的数
    
    return lastId;
}
