/* =================================================
// jQuery Tabs Plugins 1.0
// author:chenyg@5173.com
// URL:http://stylechen.com/jquery-tabs.html
// 4th Dec 2010
// =================================================*/

;(function($){
	$.fn.extend({
		Tabs:function(options, params){
			if (typeof(options) == 'string') {
				if (options == 'select') { // 选择某个页面
					var $this = $(this);
					var menu = $this.find("ul.tab-menu");
					var body = $this.find("div.tab-box");

					menu.find("li").removeClass("current");
					menu.find("li:eq(" + params + ")").addClass("current");

					body.find("div").addClass("hide");
					var div = body.find("div:eq(" + params + ")");
					div.removeClass("hide");
					
					return div;
				}
			} else {
				options = $.extend({
					event : 'mouseover',
					timeout : 0,
					auto : 0,
					callback : null
				}, options);
				
				var self = $(this),
					tabBox = self.children( 'div.tab-box' ).children( 'div' ),
					menu = self.children( 'ul.tab-menu' ),
					items = menu.find( 'li' ),
					timer;
					
				var tabHandle = function( elem ){
						elem.siblings( 'li' )
							.removeClass( 'current' )
							.end()
							.addClass( 'current' );
							
						tabBox.siblings( 'div' )
							.addClass( 'hide' )
							.end()
							.eq( elem.index() )
							.removeClass( 'hide' );
					},
						
					delay = function( elem, time ){
						time ? setTimeout(function(){ tabHandle( elem ); }, time) : tabHandle( elem );
					},
					
					start = function(){
						if( !options.auto ) return;
						timer = setInterval( autoRun, options.auto );
					},
					
					autoRun = function(){
						var current = menu.find( 'li.current' ),
							firstItem = items.eq(0),
							len = items.length,
							index = current.index() + 1,
							item = index === len ? firstItem : current.next( 'li' ),
							i = index === len ? 0 : index;
						
						current.removeClass( 'current' );
						item.addClass( 'current' );
						
						tabBox.siblings( 'div' )
							.addClass( 'hide' )
							.end()
							.eq(i)
							.removeClass( 'hide' );
					};
								
				items.bind( options.event, function(){
					delay( $(this), options.timeout );
					if( options.callback ){
						options.callback( self );
					}
				});
				
				if( options.auto ){
					start();
					self.hover(function(){
						clearInterval( timer );
						timer = undefined;
					},function(){
						start();
					});
				}
				
				return this;
			}
		}
	});
})(jQuery);