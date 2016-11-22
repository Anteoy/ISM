/**
 * 获取消息js
 */

var sessionid = $$.GetUrlParam("sessionid");
// TODO var zhbh = $$.GetUrlParam("zhbh");
var GET_MSG_INTERVAL_ID;//获取消息Interval
var GET_ZT_INTERVAL_ID;//获取状态Interval
var ZHBH = parent.ZHBH;//登陆账户
var DLXM = parent.DLXM;//登陆账户姓名
//以下是测试临时变量 TODO
var zhbh = 4;



var myDB = {//定义了一个myDB对象
	name:'chattingRecords',
	version:1,
	db:null
};
openDB('ISM', 1, function(e) {
	// 首先从DB中拿出数据
	// 从DB中拿出消息记录并简要展示在在线界面中 
	fetchStoreByCursorzaix(myDB.db, 'liaotjl', function(paixsz) {
		xiaoxpx(paixsz, false); // 按发送时间进行消息排序 最新消息排在最前面
		for (var i=0; i < paixsz.length; i++) {
			var d = paixsz[i];
			console.log(d.target);
			if (d.target != ZHBH) continue; // 根据ZHBH标识剔除非当前用户消息 TODO
			
			if (d.src == zhbh) { // 我发送的消息， 再次反转
				d.src = d.target;
				d.target = zhbh;
			}
			if (!findItem(d.src)) char(d);//如果存在则表示最新已经插入，如果不存在则插入最先匹配的最新消息
		}
		
	});
	GET_MSG_INTERVAL_ID = setInterval(getMsg, 5000);
	
}); // 降低耦合度和后期维护可读性	一般都会传入onSuccess形参

/**
 * 检测在线状态
 */
function zt() {

	$(".zaixItem").each(function() {
		var liid = $(this).attr("id")
		getZt(liid);
	});

}

function getZt(src) { // 获取在线状态

	$.ajax({
		url: chaxyhUrl,
		type: "post",
		data: {"src": src},
		dataType: "json",
		success: function(response) {
			var found = findItem(src);
			var zt = response.zt;
			var arrdiv = $(".zaixItem");
			var img_newmsg = $(found).find(".img_newmsg").attr("src");// 新消息提示小红点
			var zx = $(found).find(".zx").html();//class为zx的内容
			// 信息定位
			if (zt == 0) { // 离线
				//不处理的情况
				if (zx == "（离线）") return;
				var flag = false;
				if (img_newmsg != null && img_newmsg !="") {//有小红点新消息
					// 如果有小红点且从在线状态变为离线状态，则表示有新消息的用户离线了，需要移动到在线Item的最后一项
					if(zx == "（在线）"){
						for (var q = arrdiv.length - 1; q > 0; q--) {
							var zhzx = $(arrdiv[q]).find(".zx").html();//最后在线
							if(zhzx == "（在线）"){//从后往前找，当找到有人为在线的时候，立马after插入其后
								flag = true;//找到更新为true
								var liid = $(arrdiv[q]).attr("id")//获得最后一个在线的zaixItem ID
								found = $(found).remove();
								$("#"+liid).after(found); // 在所选元素后面追加新的元素
								$(found).find(".img_head").css({ filter: "gray", opacity: "0.3" });
								$(found).find(".zx").html('（离线）');
								return;
							} 
						}
						if (flag = false) {//如果一个在线的Item都没有 保持原来位置并更新为离线状态
							$(found).find(".img_head").css({ filter: "gray", opacity: "0.3" });
							$(found).find(".zx").html('（离线）');
							return;
						}
					}
					if (zx == "（离线）") {//判断是否是离线状态 如果为离线状态又有小红点则不进行位移处理
						return;// XXX 已修复BUG a
					} else if (zx == "" || zx == null) {//没有在线离线标识，则需要添加离线标识，前面已经判断！ 
						$(found).find(".img_head").css({ filter: "gray", opacity: "0.3" });
						$(found).find(".zx").html("（离线）");
						return;
					}
					
				}
				// 没有小红点的情况将会按照如下处理,没有状态也没有小红点直接加到最后面
				found = $(found).remove();
				$("#zaixList").append( found ); // 加到最后
				// 设置图片灰色和透明度
				$(found).find(".img_head").css({ filter: "gray", opacity: "0.3" });
				$(found).find(".zx").html('（离线）');
				return;
			} else if (zt == 1) { // 在线
				// 优化，如果已经是在线状态，则不进行处理
				if (zx == "（在线）") return;
				
				/* 移除后追加到前面 */
				if (img_newmsg != null && img_newmsg !="") {//首先判断，当有新消息的用户（有小红点的用户上线了），则提到最上面去
					found = $(found).remove();
					$("#zaixList").prepend(found); // 在开头增加新的元素
					$(found).find(".img_head").css({ filter: "gray", opacity: "1" });
					$(found).find(".zx").html('（在线）');
					return;
				} else {//小红点为空，表示没有新消息，依次排列在在线Item后面
					var flag = false;//判断是否能找到
					for (var q = arrdiv.length - 1; q > 0; q--) {//寻找最后一个有小红点已经被标识为在线的
						var zhzx = $(arrdiv[q]).find(".zx").html();//最后在线
						if (zhzx == "（在线）") {//如果有在线的就放在在线人后面 没有就自己上最上面
							//从后往前找，当找到有人为在线的时候，立马after插入其后
							flag = true;
							var liid = $(arrdiv[q]).attr("id")//获得最后一个在线的zaixItem ID
							found = $(found).remove();
							$("#"+liid).after(found); // 在所选元素后面追加新的元素
							$(found).find(".img_head").css({ filter: "gray", opacity: "1" });
							$(found).find(".zx").html('（在线）');
							return;
						}
					}
					if(flag == false) {//没有在线的，把自己放在最上面，找不到在线的
						//没有在线的 自己上
						found = $(found).remove();
						$("#zaixList").prepend(found); // 在所选元素后面追加新的元素
						$(found).find(".img_head").css({ filter: "gray", opacity: "1" });
						$(found).find(".zx").html('（在线）');
						return;
					}
					
				}
			}
			
		},
		error: function() {}
	});
}

function getMsg() {
	/*收取消息模式，*/
	$.ajax({
		type: "post",
		url: getMsgUrl,
		data: {
		//	"sessionid": sessionid,
			"zhbh": ZHBH
		},
		success: function(response) {
			if (response.success == 0) {
				console.info("error：消息请求失败！");
				return;
			} else if (response.success == -1) {
//				parent.chat_interface_login_failed();
				clearInterval(GET_MSG_INTERVAL_ID);
				clearInterval(GET_ZT_INTERVAL_ID);
				return;
			}
			var data = response.data;
			for (var i = 0; i < data.length; i++) {
				var d = data[i];
				d.newmsg = 1; // 接收到的消息flag标记为未读
				//增加医生识别标识 ???
				d.yhbh = ZHBH;
				d.target = ZHBH;
				
				char(d, false); // 调用插入在线人面板方法
				
				// 添加查询src 咨询人信息到数据库
				addData(myDB.db,'liaotjl',d);
				
				/* 每收到一条消息进行回执传回消息id */
				$.post(messageReportUrl, { "id": d.id });
				
			}
		
		},
		error: function() {
			console.info("error，ajax请求失败");
		}
	});
}

$(function() {
	GET_ZT_INTERVAL_ID = setInterval(zt, 30000);
});
/**
 * 获取在线列表
 */
$(function(){
	$.ajax({
		type: "post",
		url: "test.do",
		data: {
		},
		success: function(response) {
			if (response.success == 0) {
				console.info("error：获取初始在线状态失败！请求失败！");
				return;
			}
			var data = response.rows;
			for (var i = 0; i < data.length; i++) {
				charUserList(data[i].bh,"have",data[i].xm,data[i].touxbh);
			}
		},
		error: function() {
			console.info("error，ajax请求失败");
		}
	});
});

//浏览器中Backspace不可用 
$(document).keydown(function(e) {
	var keyEvent;
	if(e.keyCode==8){
		var d=e.srcElement||e.target;
		if(d.tagName.toUpperCase()=='INPUT'||d.tagName.toUpperCase()=='TEXTAREA'){
			keyEvent=d.readOnly||d.disabled;
		}else{
			keyEvent=true;
		}
	}else{
		keyEvent=false;
	}
	if(keyEvent){
		e.preventDefault();
	}
});

// 群聊跳转

function qunliaotiaozhuan(){
	var url = "chat.jsp?DLXM="+DLXM+"&ZHBH="+ZHBH;
	window.open("http://"+url);
}