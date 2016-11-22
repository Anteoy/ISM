
/**
 * 万达SAM卡通信接口
 *
 * @memberof JIAN888
 * @namespace WdHealthCard
 * @author 胡正卫
 * @mail cdisk@qq.com
 * @date 2015-09-17
 */
var WdHealthCard = (function() {

	var TAG = "WdHealthCard";

	/**
	 * 控件操作对象
	 * @private
	 */
	var OCX = null;

	/**
	 * 发生错误的错误信息
	 * @private
	 */
	var ERROR_MESSAGE = "";

	/**
	 * 初始化系列参数
	 * @private
	 */
	var PARAM = null;

	/**
	 * 初始化控件
	 *@memberof JIAN888.WdHealthCard
	 *@param AReaderType 读卡器类型
	 *@param ServerIP 中央服务器地址
	 *@param ServerPort 中央服务器通信端口
	 *@param UserCode 认证用户名
	 *@param UserPass 认证用户密码
	 *@param OrgCode 操作机构
	 *@param DeptCode 操作科室
	 *@param DeptName 操作科室名称
	 *@param OperateType 操作类型
	 *@param JobNo 医生工号
	 *@param DctName 医生姓名
	 */
	function Init(param) {

		if (!window.ActiveXObject) {
			/* 初始化失败 */
			var errorMessage = "初始化组件失败：您的浏览器版本不支持该控件，请尝试更换IE浏览器。";
			ERROR_MESSAGE += "\r\n" + errorMessage;
			console.error(TAG, errorMessage);
			return false;
		}

		/* 初始化控件 */
//		var ocx = document.createElement("object");
//		ocx.setAttribute("id", "wdHealthCardOcx");
//		ocx.setAttribute("classid", "CLSID:F8F915AC-BA5C-4C70-A968-E751603567A5");
//		ocx.setAttribute("codebase", "wdHealthCardOcx.cab#version=1,0,0,2");
//		ocx.setAttribute("style", "display:none");
//		document.body.appendChild(ocx);
		var ocx = document.getElementById("wdHealthCardOcx");

		/* 拼装初始化参数 */
		var initParam = {
			"AReaderType": param.AReaderType || '0',
			"LogInfo": {
				"ServerIP": param.ServerIP,
				"ServerPort": param.ServerPort,
				"UserCode": param.UserCode,
				"UserPass": param.UserPass
			}
		};
		var initString = JSON.stringify(initParam);
		console.debug(TAG, "发送", "初始化：" + initString);

		try {
			var recvStr = ocx.InitIntfTS(initString);
			console.debug(TAG, "返回", "初始化：" + recvStr);
	
			if (recvStr <= 0) {
				/* 初始化失败 */
				var errorMessage = "初始化组件失败：" + ocx.GetPropertyStr();
				ERROR_MESSAGE += "\r\n" + errorMessage;
				console.error(TAG, errorMessage);
				return false;
			} else {
				/* 初始化成功 */
				OCX = ocx;
				PARAM = param;
				return true;
			}
		} catch (e) {
			var errorMessage = "初始化组件失败：" + e;
			ERROR_MESSAGE += "\r\n" + errorMessage;
			console.error(TAG, errorMessage);
			return false;
		}
	}

	/**
	 * 取消初始化控件
	 */
	function UnInit() {
		if (OCX) {
			OCX.UnInitIntf();
		}
		var object = document.getElementById("wdHealthCardOcx");
		if (object) {
			document.body.removeChild(object);
		}
		return true;
	}

	/**
	 * 读取健康卡信息
	 * @param type 读取健康内容类别
	 * @return object 不同类别对应不同对象结构
	 */
	function ReadHealthInfo(type) {
		if (!OCX) {
			var errorMessage = "读取卡信息失败：未初始化控件。";
			ERROR_MESSAGE += "\r\n" + errorMessage;
			console.error(TAG, errorMessage);
			return null;
		}

		var CardInfo;
		var exec; // 执行标记
		var result;

		/* 读取其他信息时，先读取 */
		if (type != 1) {
			exec = OCX.ReadHealthInfo(1);
			result = OCX.GetPropertyStr();
			if (exec > 0) {
				console.debug(TAG, "返回", "读取卡信息：" + result);
				result = JSON.parse(result);
				CardInfo = result;
			} else {
				var errorMessage = "读取卡信息失败：" + result;
				ERROR_MESSAGE += "\r\n" + errorMessage;
				console.error(TAG, errorMessage);
				return null;
			}
		}
		exec = OCX.ReadHealthInfo(type);
		result = OCX.GetPropertyStr();
		if (exec > 0) {
			console.debug(TAG, "返回", "读取卡信息：" + result);
			result = JSON.parse(result);
			if (type == 1) CardInfo = result;
			var logOk = OperateLog(CardInfo.CardTyp, CardInfo.CardNo);
			return result;
		} else {
			var errorMessage = "读取卡信息失败：" + result;
			ERROR_MESSAGE += "\r\n" + errorMessage;
			console.error(TAG, errorMessage);
			return null;
		}
	}

	/**
	 * 读取磁条数据
	 * @param 磁道号
	 * @return object 磁条数据
	 */
	function ReadMagStInfo(no) {
		if (!OCX) {
			var errorMessage = "读取身份证信息失败：未初始化控件。";
			ERROR_MESSAGE += "\r\n" + errorMessage;
			console.error(TAG, errorMessage);
			return null;
		}

		var exec = OCX.ReadMagStInfo(no);
		var result = OCX.GetPropertyStr();
		if (exec > 0) {
			console.debug(TAG, "返回", "读取磁条数据：" + result);
			result = JSON.parse(result);
			var logOk = OperateLog(1, result.CardNo); // TODO 读身份证日志中卡类型应该是什么
			return result;
		} else {
			var errorMessage = "读取磁条数据失败：" + result;
			ERROR_MESSAGE += "\r\n" + errorMessage;
			console.error(TAG, errorMessage);
			return null;
		}
	}

	/**
	 * 写入卡信息
	 * @return int 1：成功，0：失败
	 */
	function WriteHealthInfo(content) {
		if (!OCX) {
			var errorMessage = "写入卡信息失败：未初始化控件。";
			ERROR_MESSAGE += "\r\n" + errorMessage;
			console.error(TAG, errorMessage);
			return null;
		}

		console.debug(TAG, "发送", "写入卡信息：" + content);
		var exec = wdHealthCardOcx.WriteHealthInfo(content);
		var result = wdHealthCardOcx.GetPropertyStr();
		if (exec > 0){
			console.debug(TAG, "写入卡信息成功。");
		} else {
			var errorMessage = "写入卡信息失败：" + result;
			ERROR_MESSAGE += "\r\n" + errorMessage;
			console.error(TAG, errorMessage);
		}
		return exec;
	}

	/**
	 * 写入日志
	 */
	function OperateLog(CardType, CardNo) {
		if (!OCX) {
			var errorMessage = "日志写入失败：未初始化控件。";
			ERROR_MESSAGE += "\r\n" + errorMessage;
			console.error(TAG, errorMessage);
			return null;
		}

		if (CardType && CardNo) {
			var OperTime = GetTimeString();
			var logParam = {
				"OperateLogInfo": {
					"OrgCode": PARAM.OrgCode,
					"DeptCode": PARAM.OrgCode,
					"DeptName": PARAM.OrgCode,
					"OperateType": PARAM.OrgCode,
					"JobNo": PARAM.OrgCode,
					"DctName": PARAM.OrgCode,
					"CardTyp": CardType,
					"CardNo": CardNo,
					"SAMCode": "0",
					"MachineCode": "0",
					"CPUCode": "0",
					"OperCode": "0",
					"OperTime": OperTime
				}
			};
			var logString = JSON.stringify(logParam);
			console.debug(TAG, "发送", "写入日志：" + logString);

			var recvStr = OCX.OperateLog(logString);
			console.debug(TAG, "返回", "写入日志：" + recvStr);
			if (recvStr <= 0){
				var errorMessage = "日志写入失败：" +OCX.GetPropertyStr();
				ERROR_MESSAGE += "\r\n" + errorMessage;
				console.error(TAG,  errorMessage);
				return false;
			} else {
				console.info(TAG, "日志写入完成：" + logString);
				return true;
			}
		}
	}

	/**
	 * 获取错误信息
	 */
	function GetError() {
		var errorMessage = ERROR_MESSAGE;
		if (errorMessage && errorMessage.indexOf(0) == '\r' && errorMessage.indexOf(1) == '\n') {
			errorMessage = errorMessage.substring(2, errorMessage.length);
		} 
		ERROR_MESSAGE = "";
		return errorMessage;
	}
	
	/**
	 * 获取当前时间字符串
	 */
	function GetTimeString() {
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		if (month < 10) month = "0" + month;
		var day = date.getDate();
		if (day < 10) day = "0" + day;
		var hours = date.getHours();
		if (hours < 10) hours = "0" + hours;
		var minutes = date.getMinutes();
		if (minutes < 10) minutes = "0" + minutes;
		var seconds = date.getSeconds();
		if (seconds < 10) seconds = "0" + seconds;
		var result = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
		return result;
	}

	/* 返回公共变量和方法 */
	return {
		Init: Init,
		UnInit: UnInit,
		ReadHealthInfo: ReadHealthInfo,
		ReadMagStInfo: ReadMagStInfo,
		WriteHealthInfo: WriteHealthInfo,
		GetError: GetError
	};

}());