var DASS = DASS || {};
DASS={
			w:{},		//window对象
			url:"",		//地址
			para:{},	//参数
			rows:Math.floor(($(window).height()-90)/26),	//条数
			Grid:function() {
				return $("#center-grid-data");
			},
			//初始化列表
			InitGrid:function(istrue)
			{	
				var _state=false;
				if(istrue==undefined || istrue==true)
				{
					_state=true;
				}
				this.Grid().simplegrid({
					url :this.url,
					data:this.para,
					rows:this.rows,
					multiple: _state
				});
			},
			//选择多选记录
			GetAllid:function() { 
				var id = this.Grid().simplegrid("getValue", "id");
				if (id.length==0) {
					alert("当前您没有选择!");
					return;
				}
				id=id.toString();
				return id;
			},
			//自定义多选字段
			GetAllOtherid:function(name) { 
				var id = this.Grid().simplegrid("getValue", name);
				if (id.length==0) {
					alert("当前您没有选择!");
					return;
				}
				id=id.toString();
				return id;
			},
			//选择一条记录
			GetOneid:function() {
				var id = this.Grid().simplegrid("getValue", "id");
				if (id.length==0) {
					alert("当前您没有选择!");
					return;
				}
				id=id.toString();
				if (id.split(",").length > 1) {
					alert("请选择单条记录!");
					return;
				}
				return id;
			},
			//获取其他编号
			GetOtherid:function(_id) {
				var id = this.Grid().simplegrid("getValue", _id);
				if (id.length!=0) {
					id=id.toString();
					if (id.split(",").length > 1) {
						alert("请选择单条记录!");
						return;
					}
					return id;
				}
				else
				{
					alert("当前您没有选择!");
					return;
				} 
			},
			ViewOther:function(_title, _width, _height, _url,_ico) {
					this.w=openWindow(_url, _title, _width, _height, _ico || "icon-form");
			} ,
			//查看(标题,宽度,高度,地址,ICO图标)
			View:function(_t, _w, _h, _u, _i) {
				var id=this.GetOneid();
				if (id!="" && id!=undefined) {
					var url=_u+"="+id;
					this.w=openWindow(url, _t, _w, _h, _i || "icon-form");
				} 
			} ,
			//新增(标题,宽度,高度,地址,ICO图标)
			Add:function(_t, _w, _h, _u, _i) {
				//var url=_u+"="+id+";
					this.w=openWindow(_u, _t, _w, _h, _i || "icon-form_add");
			},
			//编辑(标题,宽度,高度,地址,ICO图标)
			Edit:function(_t, _w, _h, _u, _i ) {
				var id=this.GetOneid();
				if (id!="" && id!=undefined) {
					var url=_u+"="+id;
					this.w=openWindow(url,_t,_w,_h, _i || "icon-form_edit");
				} 
			},
			//删除(地址)
			Del:function(_u)
			{
				 if(confirm("你确认删除吗？")){
					 $.post(_u, function(data) {
							if(data.state=="ok")
							{
								DASS.Refresh();
							}
							else{
								alert("DASS系统提示:[删除失败]"); 
							}
						},"json"); 
				 }
			},
			//删除所有(地址,参数)
			DelAll:function(_u,_prm)
			{
				 if(confirm("你确认删除吗？")){
					 $.post(_u,_prm, function(data) {
							if(data.state=="ok")
							{
								DASS.Refresh();
							}
							else{
								alert("DASS系统提示:[删除失败]"); 
							}
						},"json"); 
				 }
			},
			//刷新
			Refresh:function()			//刷新
			{
				this.Grid().simplegrid('refresh');
			},
			//重新加载列表
			ReloadGrid:function(parm)	//重新加载数据
			{
				this.Grid().simplegrid({
					data :parm
				});
			},
			//打开搜索框
			SearchOpen:function()
			{
				$("#searchwindow").window("open");
			},
			//重新设置搜索
			SearchReset:function() 
			{
				$("#searchform").form('clear');
				this.para = {};
				this.ReloadGrid(this.para);
			},
			//退出搜索框
			SearchExit:function()
			{
				$("#searchwindow").window("close");
			},
			//执行搜索
			SearchData:function(){
				if (!$("#searchform").form("validate")) {
					return;
				}
				this.para = $("#searchform").serializeArray();
				this.ReloadGrid(this.para);
				$("#searchwindow").window("close");
			},
			//转专案(标题,宽度,高度,地址,ICO图标)
			GoZhuanAn:function(_t,_w, _h, _u, _i)
			{
				
				var id=this.GetAllid();
				if (id!="" && id!=undefined){
					this.w=openWindow( _u, _t || "专案定制" , _w, _h, _i || "icon-script_go");
				}
			},
			//转满意度(标题,宽度,高度,地址,ICO图标)
			GoManyd:function(_t,_w, _h, _u, _i)
			{
				var id=this.GetAllid();
				if (id!="" && id!=undefined){
					this.w=openWindow( _u, _t || "满意度" , _w, _h, _i || "icon-script_go");
				}
			},
			//AJAX提交
			loading:"",
			Ajax_Post:function(_url,_data,_callback)
			{
				$.ajax({
					type: "post",dataType: "json",url:_url,data:_data,
					error: function (e) {
						ajaxError(e.statusText);
					},
					beforeSend: function () {
						DASS.loading = showloading("正在加载数据,请稍等.......");
					},
					success: _callback
				});
			},
			//播放录音
			Play:function() {
				var id=this.GetOtherid("playguid");
				if (id!="" && id!=undefined) {
					var url="call/Call/Play?guid="+id;
					this.w=openWindow(url, '播放录音..', '300', '100', "icon-play");
					this.w.window({
						onClose: function() {
							$(this.w).window("destroy");
							$("body").find("#roundIframe").attr('src','');
						}
					});
				} 
			}
};