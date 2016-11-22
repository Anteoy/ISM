var static_rows=0;//静态的行数
(function($) {
	var simplegrid = function($this, options) {
		$this.find("thead tr th[column]").unbind("click").bind("click", function() {
			var column = $(this).attr("column");
			var order = $(this).attr("order");
			if (order == undefined || order == null || order == "") {
				$(this).attr("order", "asc");
			} else if (order == "asc") {
				$(this).attr("order", "desc");
			} else if (order == "desc") {
				$(this).attr("order", "");
			}
			var options = $this.data();
			options.sort = $.fn.simplegrid.sort($this);
			$.fn.simplegrid.load($this, options);
		});
		if (options != undefined && options != null) {
			$this.data(options);
			if (options.autoload) {
				options.sort = $.fn.simplegrid.sort($this);
				$.fn.simplegrid.load($this, options);
			}
		}
	};

	$.fn.simplegrid = function(opt, value) {
		if (typeof(opt) == "string") {
			return $.fn.simplegrid.methods[opt]($(this), value);
		}
		return $(this).each(function() {
			if (!$(this).hasClass("simplegrid")) {
				$(this).addClass("simplegrid");
			}
			var data = $(this).data();
			var options = opt;
			if ($.isEmptyObject(data)) {
				options = {
					url :        ( (isNotNull(opt) && isNotNull(opt.url))        ? opt.url        : $(this).attr("url") ),
					data :       ( (isNotNull(opt) && isNotNull(opt.data))       ? opt.data       : $(this).attr("data") ),
					tmpl :       ( (isNotNull(opt) && isNotNull(opt.tmpl))       ? opt.tmpl       : $(this).attr("tmpl") ),
					pager:       ( (isNotNull(opt) && isNotNull(opt.pager))      ? opt.pager      : $(this).attr("pager") ),
					page :       ( (isNotNull(opt) && isNotNull(opt.page))       ? opt.page       : $(this).attr("page") ),
					rows :       ( (isNotNull(opt) && isNotNull(opt.rows))       ? opt.rows       : $(this).attr("rows") ),
					sort :       ( (isNotNull(opt) && isNotNull(opt.sort))       ? opt.sort       : $(this).attr("sort") ),
					autoload :   ( (isNotNull(opt) && isNotNull(opt.autoload))   ? opt.autoload   : $(this).attr("autoload") ),
					message :    ( (isNotNull(opt) && isNotNull(opt.message))    ? opt.message    : $(this).attr("message") ),
					menu :       ( (isNotNull(opt) && isNotNull(opt.menu))       ? opt.menu       : $(this).attr("menu") ),
					multiple :   ( (isNotNull(opt) && isNotNull(opt.multiple))   ? opt.multiple   : $(this).attr("multiple") ),
					onMultiple : ( (isNotNull(opt) && isNotNull(opt.onMultiple)) ? opt.onMultiple : $(this).attr("onMultiple") ),
					onClick :    ( (isNotNull(opt) && isNotNull(opt.onClick))    ? opt.onClick    : $(this).attr("onClick") ),
					onDblClick : ( (isNotNull(opt) && isNotNull(opt.onDblClick)) ? opt.onDblClick : $(this).attr("onDblClick") ),
					onSelect :   ( (isNotNull(opt) && isNotNull(opt.onSelect))   ? opt.onSelect   : $(this).attr("onSelect") ),
					onUnselect : ( (isNotNull(opt) && isNotNull(opt.onUnselect)) ? opt.onUnselect : $(this).attr("onUnselect") ),
					onBefore :   ( (isNotNull(opt) && isNotNull(opt.onBefore))   ? opt.onBefore   : $(this).attr("onBefore") ),
					onSuccess :  ( (isNotNull(opt) && isNotNull(opt.onSuccess))  ? opt.onSuccess  : $(this).attr("onSuccess") ),
					onError :    ( (isNotNull(opt) && isNotNull(opt.onError))    ? opt.onError    : $(this).attr("onError") ),
					onFinish :   ( (isNotNull(opt) && isNotNull(opt.onFinish))   ? opt.onFinish   : $(this).attr("onFinish") )
				};
			}
			
			if (options.url || options.data || options.tmpl || options.pager || options.page || options.rows || options.sort) {
				
				/* 菜单内容改变 */
				if (options.menu != data.menu) {
					$.fn.simplegrid.menu(options.menu);
				}
				
				options = $.extend({}, data, options || {}); // 合并参数数据
				if (!isNotNull(options.rows)) { options.rows = $.fn.simplegrid.autorows($(this)); }
				options = $.extend({}, $.fn.simplegrid.defaults, options || {}); // 合并参数数据
				if (options.page < 1) {options.page = $.fn.simplegrid.defaults.page;} // 如果页码值不正常,使用默认页码
				if (options.rows < 1) {options.rows = $.fn.simplegrid.defaults.rows;} // 如果分页大小值不正常,使用默认分页大小
				options._rows = [options.rows, options.rows * 2, options.rows * 3, options.rows * 4, options.rows * 5];
				simplegrid($(this), options);
			} else {
				
				/* 菜单内容改变 */
				if (options.menu != data.menu) {
					$.fn.simplegrid.menu(options.menu);
				}
				
				data = $.extend({}, data, options || {}); // 合并参数数据
				$(this).data(data);
			}
			
		});
	};
	
	$.fn.simplegrid.menu = function(menu) {
		$(menu).find("div").each(function() {
			if ($(this)[0].onclick || $(this)[0]._onclick) {
				if ($(this)[0].onclick) {
					$(this)[0]._onclick = $(this)[0].onclick;
					$(this)[0].onclick = null;
				}
				$(this).click(function() {
					$(this)[0]._onclick.apply($(menu).data());
				});
			}
		});
	}

	$.fn.simplegrid.load = function($this, options) {
		var tbody = $this.find("tbody");
		tbody.empty();
		if (options) {
			$this.data(options);
			var url = options.url; // 请求地址
			var data = options.data; // 参数列表
			var tmpl = options.tmpl; // 模板位置
			var pager = options.pager; // 分页位置
			var page = options.page; // 当前页
			var rows = options.rows; // 分页大小
			var sort = options.sort; // 排序内容
			var message = options.message; // load时加载的提示文字
			var menu = options.menu; // 右键菜单
			var multiple = options.multiple; // 是否多选
			var onClick = options.onClick; // 单击事件
			var onDblClick = options.onDblClick; // 双击事件
			var onSelect = options.onSelect; // 选中事件
			var onUnselect = options.onUnselect; // 取消选中事件
			var onBefore = options.onBefore; // 发送前操作
			var onSuccess = options.onSuccess; // 成功时操作
			var onError = options.onError; // 发生错误操作
			var onFinish = options.onFinish; // 完成后操作
			
			if ( url != undefined && url != null && typeof(url) == 'string' && url.length > 0 && tmpl != undefined && tmpl != null ) {
				var startTime = new Date().getMilliseconds();
				var _url = url + ((url.indexOf('?') >= 0) ? "&" : "?");
				_url = _url + "commpage=" + page + "&commrows=" + rows + "&commsort=" + sort + "&t="+Math.round(Math.random() * 100000);
				var loading;
				
				var startTime;
				$.ajax({
					type: "post",
					dataType: "json",
					url: _url,
					data: data,
					error: function (e) {
						/* 错误时的操作 */
						$.fn.simplegrid.eval(onError, e);
						if (e.responseText && (e.responseText.indexOf("登陆") > -1 || e.responseText.indexOf("登录") > -1 || e.responseText.indexOf("login") > -1)) {
							top.loginwin = top.openWindow(verifyUrl + "/minilogin", "您的登陆已失效, 请重新登陆.", 460, 360);
						} else {
							ajaxError(e.statusText);
						}
						$$.closeLoading(loading);
					},
					beforeSend: function () {
						/* 发送前的操作 */
						$.fn.simplegrid.eval(onBefore);
						loading = $$.showLoading(message, $this.parent());
						tbody.empty();
						
						startTime = new Date().getTime();
					},
					success: function (data) {
						tbody.empty();
						try {
							/* 成功时的操作 */
							$.fn.simplegrid.eval(onSuccess);

							/* 处理数据 */
							if (data) {
								/* 循环模板 */
								if (data.rows) {
									options.count = data.rows;
									$this.data(options);
									$(tmpl).tmpl(data.rows).appendTo(tbody);
									tbody.find("tr:even").addClass("evenColor");

									/* 单机时的操作 */
									tbody.find("tr").click(function() {
										if ($this.data().multiple) { // 多选
											$(this).toggleClass("selectColor");
											var selected = $(this).hasClass("selectColor");
											if (selected) { // 选中
												$.fn.simplegrid.eval($this.data().onSelect, this);
											} else { // 取消选中
												$.fn.simplegrid.eval($this.data().onUnselect, this);
											}
											$(this).find(":checkbox").attr("checked", selected);
										} else { // 单选
											tbody.find(".selectColor").removeClass("selectColor").find(":checkbox").attr("checked", false);
											if(!$(this).hasClass("selectColor")) {
												$(this).addClass("selectColor").find(":checkbox").attr("checked", true);
											}
										}
										$.fn.simplegrid.eval($this.data().onClick, this);
									});

									/* 双击时的操作 */
									tbody.find("tr").dblclick(function() {
										if ($this.data().multiple) { // 多选
											$(this).addClass("selectColor").find(":checkbox").attr("checked", true);
										} else { // 单选
											tbody.find(".selectColor").removeClass("selectColor").find(":checkbox").attr("checked", false);
											$(this).addClass("selectColor").find(":checkbox").attr("checked", true);
										}
										$.fn.simplegrid.eval($this.data().onDblClick, this);
									});
									

									/* 右键菜单 */
									if ($this.data().menu) {
										tbody.find("tr").bind("contextmenu", function(e){
											if (!$this.data().multiple) { // 单选
												tbody.find(".selectColor").removeClass("selectColor").find(":checkbox").attr("checked", false);
											}
											if(!$(this).hasClass("selectColor")) {
												$(this).addClass("selectColor").find(":checkbox").attr("checked", true);
											}
											
											e.preventDefault();
											$($this.data().menu).menu('show', {
												left: e.pageX - 3,
												top: e.pageY - 3
											});
											
											$($this.data().menu).data().data = $.fn.simplegrid.value(this);
										});
									}
								}
								var spend = new Date().getMilliseconds() - startTime;
								/* 分页 */
								if (isNotNull(data.total)) {
									if (pager) {
										$.fn.simplegrid.pager($this, data.total);
										
										var waste = new Date().getTime() - startTime;
										$(pager).find("div[class='pagination-info']").after("<div style='float:right; padding-top: 8px; padding-right: 20px;'>耗时" + (waste/1000) + "秒</div>");
									}
								}
							}

							/* 完成时的操作 */
							$.fn.simplegrid.eval(onFinish, data);
							$$.closeLoading(loading);
						} catch(e) {
							if (typeof(e) == 'object' && typeof(e.message) == 'string') {
								e = e.message;
							}
							analyzeError(e);
							$$.closeLoading(loading);
						}
						
					}
				}); 
			}
		}
	};

	/**
	 * 方法列表
	 */
	$.fn.simplegrid.methods = {
		options : function($this) {
			return $this.data();
		},
		clear : function($this) {
			$this.find("tbody").empty();
			var options = $this.data();
			if (!$.isEmptyObject(options)) {
				options.page = 1;
				$this.data(options);
				if (options.pager) {
					$.fn.simplegrid.pager($this, 0);
				}
			}
		},
		count : function($this) {
			var options = $this.data();
			return options.count ? options.count : 0;
		},
		selectAll : function($this, selected) {
			var tbody = $this.find("tbody");
			var options = $this.data();
			if (options.multiple) {
				if (selected) {
					tbody.find("tr:not(.selectColor)").addClass("selectColor").find(":checkbox").attr("checked", true);
				} else {
					tbody.find("tr.selectColor").removeClass("selectColor").find(":checkbox").attr("checked", false);
				}
			}
		},
		getSelected : function($this) {
			var tagSelect = $this.find("tbody .selectColor");
			var value = new Array();
			tagSelect.each(function() {
				value.push($.fn.simplegrid.value($(this)));
			});
			return value;
		},
		setSelected: function($this, selecter) {
			var tbody = $this.find("tbody");
			tbody.find("tr.selectColor").removeClass("selectColor").find(":checkbox").attr("checked", false);
			if (selecter) {
				var trs = null;
				if (typeof(selecter) == "string") {
					trs = tbody.find(selecter);
				} else if (typeof(selecter) == "object") {
					trs = $(selecter);
				} else {
					return;
				}
				trs.each(function() {
					var _this = $(this);
					var _tr = null;
					if (_this.is("td")) {
						_tr = _this.parent();
					} else if (_this.is("tr")) {
						_tr = _this;
					}
					if (tbody.is(_tr.parent())) {
						_tr.addClass("selectColor").find(":checkbox").attr("checked", true);
					}
				});
			}
		},
		getValue : function($this, key) {
			var tagSelect = $this.find("tbody .selectColor").find("td[name=" + key + "]");
			var result = new Array();
			tagSelect.each(function() {
				var value = $(this).attr("value");
				if (isNotNull(value)) {
					result.push(value);
				} else {
					result.push($(this).html());
				}
			});
			return result;
		},
		refresh : function($this) {
			var options = $this.data();
			$.fn.simplegrid.load($this, options);
		}
	};

	/**
	 * 默认值
	 */
	$.fn.simplegrid.defaults = {
		page : 1,
		rows : 20,
		autoload : true,
		multiple : false
	};

	/**
	 * 处理分页
	 */
	$.fn.simplegrid.pager = function($this, total) {
		var data = $this.data();
		var pageList = data._rows.concat([total]);
		$(data.pager).pagination({
			total : total,
			pageSize : data.rows,
			pageNumber : data.page,
			pageList : [data.rows],
			onSelectPage : function(pageNumber, pageSize) {
				var options = $this.data();
				options.rows = pageSize;
				options.page = pageNumber;
				$.fn.simplegrid.load($this, options);
			}
		});
		
		var tr = $(data.pager).find("table tr");
		tr.append("<td><div class='pagination-btn-separator'></div></td>");
		var input = $("<input type='checkbox' " + (data.multiple ? "checked" : "") + " />");
		input.data($this);
		input.click(function() {
			$(this).data().simplegrid({ multiple: this.checked });
			$.fn.simplegrid.eval($(this).data().data().onMultiple, this.checked);
		});
		tr.append($("<td></td>").append(input).append("多选"));
	};

	/**
	 * 处理排序
	 */
	$.fn.simplegrid.sort = function($this) {
		var th = $this.find("thead tr th[column]");
		var sort = "";
		th.each(function() {
			$(this).removeClass("icon-sort_asc");
			$(this).removeClass("icon-sort_desc");
			var column = $(this).attr("column");
			var order = $(this).attr("order");
			if (order != undefined && order != null && order != "") {
				$(this).addClass("icon-sort_" + order);
				sort += column + " " + order + ",";
			}
		});
		if (sort.length > 0) {
			sort = sort.substring(0, sort.length-1);
		}
		return sort;
	};

	/**
	 * 执行事件
	 */
	$.fn.simplegrid.eval = function(func, param) {
		if (typeof(func) == 'function') {
			if (param != undefined && param != null) {
				var value = $.fn.simplegrid.value(param);
				func(param, value);
			} else {
				func();
			}
		} else if (typeof(func) == 'string') { // 极有可能处理click和dblclick事件
			func = func.replace("this", "param"); // 把this替换为当前tr
			var value = undefined;
			if (func.indexOf("value") > -1) { // 如果出现value字符, 则获取出tr的value键值对
				value = $.fn.simplegrid.value(param);
			}
			eval(func);
		}
	};

	/**
	 * 获取tr中的值
	 */
	$.fn.simplegrid.value = function(tr) {
		var tagSelect = $(tr).find("td[name]");
		var value = new Object();
		tagSelect.each(function() {
			var name = $(this).attr("name");
			if (name != '') {
				var val = $(this).attr("value");
				if (isNotNull(val)) {
					value[name] = val;
				} else {
					value[name] = $(this).html();
				}
			}
		});
		return value;
	};

	/**
	 * 自动行数
	 */
	$.fn.simplegrid.autorows = function($this) {
		var parent_H = $this.parent().height();
		var thead_H = 0;
		$this.find("thead").find("tr").each(function() {
			thead_H += $(this).height();
		});
		var tbody_H = parent_H - thead_H;
		var rows = Math.floor(tbody_H/25);
		static_rows=rows;
		return rows == undefined ? $.fn.simplegrid.defaults.rows : rows;
	};

	function isNotNull(obj) {
		return (obj != undefined && obj != null);
	};


})(jQuery);