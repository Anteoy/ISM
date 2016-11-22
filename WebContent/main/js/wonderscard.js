
/**
 * 根据卡号从万达获取身份证号
 * @param obj
 * @param xnda 县内档案页面调用时为true
 */
function GetWonderscard(obj, xnda) {
	if (!obj.value) return;
	var val = obj.value
	val = val.replace("；", "");
	val = val.replace("？", "");
	val = val.replace(";", "");
	val = val.replace("?", "");
	console.info(val);
	$$.post('/wonderscard/callcard.do', {numStr: val, yiybh: $userinfo.yiybh, userid: $userinfo.id}, function(data) {
		if (data) {
			var sfzh = data.shenfzh;
			var beny = data.beny;
			if (beny == -1) {
				alert("无法核实您的帐号信息。\n请联系客服，收集您的情况，以便尽快为您解决。");
			} else if (beny == 1) {
				$("#w_shenfz").val(sfzh);
				btn_baseSearch();
			} else if (!xnda && beny == 0) {
				alert("档案未在本院建卡，\n请到《县内档案查询》中查找该档案");
			} else if (!beny && beny != 0) {
				if(confirm("该用户还未建卡，\n是否立即为该用户建卡？")) {
					showFullWindow(basePath + "/jiankda/JiankdaJcxx/add", "个人综合信息-增加");
				}
			} else {
				$("#w_shenfz").val(sfzh);
				btn_baseSearch();
			}
		} else {
			obj.value = "";
			alert("未读取到卡信息");
		}
	});
}

function KeyDownWonderscard() {
	if (keyCode == 13) return;
}

/**
 * 调用万达健康档案浏览器
 */
function btn_wondersview() {
	var zhi= $("#center-grid-data").simplegrid("getSelected");
	if(zhi.length != 1) {
		alert('请选择单条记录!');
		return;
	}
	tr = zhi[0];

	var url = "http://10.65.102.166:8081/ehrview/login.action?dlfs=2&kh=" + tr.shenfzh + "&klx=8&dyjgdm=" + $userinfo.orgcode + "&dyksdm=" + $userinfo.deptcode + "&gh=" + $userinfo.shenfzh;
	showFullWindow(url, "综合健康档案-查看");
}
