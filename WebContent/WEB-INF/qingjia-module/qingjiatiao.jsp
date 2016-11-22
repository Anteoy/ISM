<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>公司请假条</title>
<script type="text/javascript"	src="../js2/jquery-1.11.1.min.js"></script>
</head>
<body>
	<form id="ff">
		<div>
			<label>姓名：</label>
			<input id="xm" class="easyui-textbox"  type="text" style="width:100%">
		</div>
		<div>
			<label>请假时间：</label>
			<input id="qjsj" class="easyui-textbox"  type="text" style="width:100%">
		</div>
		<div>
			<label>所属部门：</label>
			<input id="bm" class="easyui-numberbox"  type="text" style="width:100%">
		</div>
		<div>
			<label>请假事由：</label>
			<input id="qjsy" class="easyui-numberbox"  type="text" style="width:100%">
		</div>
		<div>
			<label>职称</label>
			<input id="zc" class="easyui-numberbox"  type="text" style="width:100%">
		</div>
		<div>
			<label>手机号：</label>
			<input id="sjh"  class="easyui-numberbox"  type="text" style="width:100%">
		</div>
		<div id="div_yzm">
			<label>验证码：</label>
			<input id="yzm" type="number" class="easyui-textbox" style="width:100%">
		</div>
		<div >
			<span id="info" style=" color: red; margin-top: 5px"></span>
		</div>
		<div id="save" style="text-align:center;margin-top:40px " >
		<a href="#" class="easyui-linkbutton" onclick="save()" style="width:100%"><span style="font-size:16px">保存</span></a>
		</div>
	</form>
	<script>
		function save(){
			var xm = $("#xm").val();
			var qjsj = $("#qjsj").val();
			var bm = $("#bm").val();
			var zc = $("#zc").val();
			var sjh = $("#sjh").val();
			var qjsy = $("#qjsy").val();
			var data = {
					xm : xm,
					qjsj : qjsj,
					bm : bm ,
					zc : zc,
					sjh : sjh,
					qjsy : qjsy
			}
			$.ajax({
				data: data,
				type: "post",
				url : "qingjiashenqing.do" ,
				success:function(){
					
				},
				error: function(){
					
				}
			})
		}
	</script>
</body>
</html>