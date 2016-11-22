<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>待审核列表</title>
    <link rel="stylesheet" type="text/css" href="standard/res/easyui/themes/metro-blue/easyui.css">
    <link rel="stylesheet" type="text/css" href="standard/res/easyui/themes/mobile.css">
    <link rel="stylesheet" type="text/css" href="standard/res/easyui/themes/icon.css">
    <script type="text/javascript" src="standard/res/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="standard/res/easyui/jquery.easyui.min.js"></script>
    <script type="text/javascript" src="standard/res/easyui/jquery.easyui.mobile.js"></script>
    <script type="text/javascript" src="standard/res/easyui/locale/easyui-lang-zh_CN.js"></script>
    <script type="text/javascript" src="standard/res/js/jquery.tmpl.min.js"></script>
    <script type="text/javascript" src="standard/res/js/framework.js"></script>
</head>
<body>
    <div class="easyui-navpanel">
        <header>
            <div class="m-toolbar">
                <span class="m-title">待审核列表</span>
                <div class="m-right">
                </div>
            </div>
        </header>
        <ul id="center-list" class="m-list">
        </ul>
    </div>
    <script id="template" type="text/x-jquery-tmpl">
		<li value="{{= bh}}">
			<a href="qingjia-module/shenhqr.html?bh={{= bh}}">
				<span>姓名:{{= xm}}</span><br />
				<span>手机号:{{= sjh}}</span><br />
				<span>部门:{{= bm}}</span><br />
				<div class="m-right">

				</div>
			</a>
		</li>
	</script>

    <script type="text/javascript">

		var P_LOADING = false; // 是否正在加载状态, 如果正在加载不能加载, 否则页面将出现重复数据

    	var P_PAGE = 0; // 当前显示页, 第一次调用时, 变成1, 成为获取第一页, 以此类推
    	var P_ROWS = 10; // 分页大小

    	var P_MAX_PAGE = 1; // 最大页码
    	var P_TOTAL = 1; // 数据总条数

    	var P_PARAMS = {}; // 发往后台的参数

		/**
		 * 加载下一页内容
		 */
        function nextPage() {
        	if (P_LOADING || P_PAGE >= P_MAX_PAGE) return; // 正在加载中 或 已经是最后一页 , 不继续执行
        	P_LOADING = true; // 标记当前正在加载
        	$("#center-list").append("<li class='p_loading_li'><div style='text-align:center;'><span class='panel-loading'></span></div></li>"); // 载入加载提示行
        	P_PAGE += 1;
        	P_PARAMS.page = P_PAGE;
        	P_PARAMS.rows = P_ROWS;
	        $.post("qingjialist.do", P_PARAMS, function(response) {
	        	var tmpl = $("#template").tmpl(response.data); // 模板生成
	      //  	tmpl.find(".easyui-linkbutton").linkbutton(); // 模板生成出来的按钮,需要初始化
	        	tmpl.appendTo("#center-list"); // 把模板生成内容写入页面
        		P_LOADING = false; // 标记当前加载结束
        		$("#center-list").find(".p_loading_li").remove(); // 删除加载提示行
	        });
        }

		/**
		 * 获取数据总数
		 * 当第一次加载页面 或 条件发生变化时，需要调用该方法，刷新数据总条数
		 */
        function getTotal() {
	        $.post("total.do", P_PARAMS, function(response) {
	        	P_TOTAL = response.total; // 数据总条数
	        	P_MAX_PAGE = Math.ceil(P_TOTAL/P_ROWS); // 计算总页数
	        });
        }

		$(function() {
			/* 滚动条监测事件 */
			$(".panel-body").scroll(function() {
				var panel = $(this);
				var panelHeight = parseFloat(panel.height()); // 面板显示高度
				var panelScroll = panel.get(0).scrollHeight; // 滚动条高度, 即面板内容总高度
				var totalheight = panelHeight + parseFloat(panel.scrollTop()); // 面板高度加上滚动条当前位置 
			    if (panelScroll <= totalheight) { // 当内容高度小于或者等于当前滚动条位置，开始动态加载数据
			        nextPage() //加载下一页数据
			    }
			});

	        getTotal(); // 获取总条数, 计算总页数
	        nextPage(); // 获取下一页, 当前意思获取第一页
		});

    </script>

</body>
</html>