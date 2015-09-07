/* wookmark */
function doWookmark(e)
{
	var newWindowWidth = $(window).width();
	if ( newWindowWidth <= 999 && newWindowWidth >= 750 )
	{

		//handler = $('#sidebar_fix > div');

		$('#sidebar').removeAttr('style');
		$('#sidebar_fix').removeAttr('style');
		$('#sidebar_fix > div').removeAttr('style');

		$('#sidebar_fix > div').wookmark({
			// Prepare layout options.
			// autoResize: true, // This will auto-update the layout when the browser window is resized.
			container: $('#sidebar_fix'), // Optional, used for some extra CSS stydtng
			offset: 10 	, // Optional, the distance between grid items
			outerOffset: 16 ,
			itemWidth: 330
		});
	}
	else
	{
		if( $('#sidebar_fix > div').length > 0 && newWindowWidth > 999 )
		{
			// handler_sidebar.wookmarkClear();
			$('body.index #mainbar #ad_content , body.mag_index #mainbar #ad_content').removeAttr('style');
			//$('#sidebar').removeAttr('style');
			//$('#sidebar_fix').removeAttr('style');
			$('#sidebar').css('margin','auto');
			$('#sidebar_fix').css('height','auto');
			$('#sidebar_fix > div').removeAttr('style');
		}


		/* 側欄滑動 */
		if( $("#sidebar").height() < ($("#mainbar").height()-$("#nav").height()) && newWindowWidth > 999 )
		{
			var $window = $(window);
			var $document = $(document);

			// for index
			msgHeight = 0;

			$.fn.scrollBottom = function()
			{
				return scrollBottom_pox = $document.height() - this.scrollTop() - this.height() - $("#sitemap").height() - $("#footer").height() - 30;
			};

			//$window.bind("scroll resize", function() {
			$(window).on("scroll",function(e)
			{
		if( $("#sidebar").height() < ($("#mainbar").height()-$("#nav").height()) && $(window).width() > 999 )
		{
				var $el = $('#sidebar_fix');
				var top = $('#sidebar').offset().top;
				var height_gap = $window.height() - top ;
				var side_foot = $el.height() - height_gap;
				var visibleFoot = -$window.scrollBottom();
				var scrollTop = $window.scrollTop();

				if( scrollTop > 0 )
				{
					$el.addClass('sidebar_fix');
				}
				else
				{
					$el.removeAttr('style');
					$el.removeClass('sidebar_fix');
				}

				if ( visibleFoot < 0 && ( scrollTop + msgHeight ) > side_foot ) {
					// 中段滑動
					$el.css({
						top: "auto",
						bottom:  0
					});
				} else if ( visibleFoot > 0  ) {
					// 下段固定
					$el.css({
						top: "auto",
						bottom: visibleFoot + "px"
					});
				} else	{
					// 正常捲動
					$el.css({
						top: top -  scrollTop  - msgHeight,
						bottom: "auto"
					});
				}
				}
			}).scroll();
		}
	}
}

$(window).on('resize', function(e)
{
	if (window.RT) clearTimeout(window.RT);
	window.RT = setTimeout(function()
	{
		doWookmark()
	}, 300);
});




























//$(window).on("load",function(e) {
$(function(){

	$(window).on("resize scroll",function(e){

		var my_menu_mark = $("#menu_mark");
		// var my_loading = $("#loading");

		my_menu_mark.css('width', $(document).width());
		my_menu_mark.css('height', $(document).height());




		/* 山頭選單智慧浮動置頂 */
		var my_gotop = $("#gotop");
		var menu_offset_top = $('.menu').offset().top ;
		var document_scrollTop = $(document).scrollTop() ;
		var my_header = $("#header");

		if( $(document).width() > 749 )
		{
			// document.title = document_scrollTop + ' ' + menu_offset_top;
			if( document_scrollTop >= menu_offset_top && document_scrollTop > 86 )
			{
				my_header.addClass('active');
			}
			else
			{
				my_header.removeClass('active');
			}
		}



		/* gotop */
		// mobile
		// 当滚动到最底部以上100像素时， 加载新内容
		if( $(document).width() <= 749 && document_scrollTop > 100 && document_scrollTop > ($(document).height() - screen.height*1.618) )
		{
			my_gotop.slideDown().fadeIn();
		}
		// web
		else if( $(document).width() > 749 && document_scrollTop > 100 )
		{
			my_gotop.slideDown().fadeIn();
		}
		else
		{
			my_gotop.slideUp().fadeOut();
		}
	});

	if ( $(document).width() > 749 )
	{
		$('.only_mobile').remove();
	}
	else
	{
		// $('.only_web').remove();
	}

	doWookmark();

});





$(function(){
	/* 主選單 */
	if( $(document).width() > 749 )
	{
		var on_menu = 'N';
		var menu_sub = $('#menu_sub');
		var mhome_sub = $('#mhome_sub');
		var slidebar = $('#menu');
		var slidebar_width = slidebar.outerWidth( true );
		var slide_dl = slidebar.find('dl');
		var slide_dl_width = slide_dl.outerWidth( true );
		var slide_dl_prop_width = slide_dl.prop('scrollWidth');
		var gap = ( slide_dl_width - slide_dl_prop_width );
		var arrow_left = slidebar.find('.arrow_left');
		var arrow_right = slidebar.find('.arrow_right');
		var posLeft = slide_dl.offset().left;
		var posLeft_gap = (posLeft+gap);

		/* for mag */
		$('.menu > dl > dt > #mhome').hover(function ()
		{
			$('#show_box').stop(true, true).fadeOut();
			$('#menu_mark').stop(true, true).fadeIn('fast');
			$('.menu > dl > dt > a').removeClass('active');
			$(this).addClass('active');

			mhome_sub.stop(true, true).load( $(this).attr('rel'));
			mhome_sub.css('left', slide_dl.offset().left ).show();

		});

		$('.menu > dl > dt > a:not("#mhome")').hover(function(){
			// jQuery的setTimeout中不能直接使用$(this)
			var _this = $(this);

			if( on_menu == 'Y' )
			{
				trigger = setTimeout(function(){
					if( _this.attr('rel') )
					{
						var posLeft = _this.position().left;

						$('#show_box').stop(true, true).fadeOut();
						$('#menu_mark').stop(true, true).fadeIn('fast');

						menu_sub.stop(true, true).load( _this.attr('rel') + '?' + (Math.random()*99999).toString() , function()
						{
							$('.menu > dl > dt > a:not("#mhome")').removeClass('active');
							_this.addClass('active');

							/* 切換次選單 */
							$('#menu_sub .sub_head a').mouseenter(function ()
							{
								var _this_sub = $(this);

								clearTimeout(trigger); // 清除上面的延迟触发的事件
								trigger = setTimeout(function(){
									$('#menu_sub .sub_head a').removeClass('sub_active');
									_this_sub.addClass('sub_active');
									$('#menu_sub dl.sub_body_show').stop(true, true).load( _this_sub.attr('rel') + '?' + (Math.random()*99999).toString() );
								},400); // 延迟时间0.2秒
							});
							$('#menu_sub div.sub_head a').mouseleave(function ()
							{
								clearTimeout(trigger); // 清除上面的延迟触发的事件
							});

							/* 關閉按鈕 */
							// $('.active , .close').click(function ()
							$('#menu_sub .close').click(function ()
							{
								_this.menu_close();
							});
						});


						/* 次選單保持在可視範圍內 */
						if( $(window).scrollTop() < $('#header').outerHeight(true) - slidebar.outerHeight(true) )
						{
							mhome_sub.css('top', slidebar.position().top + slidebar.outerHeight(true) );
							menu_sub.css('top', slidebar.position().top + slidebar.outerHeight(true) );
						}
						else
						{
							mhome_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true) );
							menu_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true) );
						}

						if( ( menu_sub.outerWidth(true) + posLeft ) > $('#wrapper').outerWidth() )
						{
							menu_sub_new_left = ( $('#wrapper').offset().left + $('#wrapper').outerWidth() - menu_sub.outerWidth(true) );
							// alert( $('#wrapper').offset().left + ' ' + $('#wrapper').outerWidth() + ' ' + menu_sub.outerWidth(true) );
							menu_sub.css('left', menu_sub_new_left ).show();
						}
						else
						{
							menu_sub.css('left',  posLeft + slide_dl.offset().left ).show();
						}

					}
				},400); // 延迟时间0.2秒
			}
			else
			{
				trigger = setTimeout(function(){
					if( _this.attr('rel') )
					{
						var posLeft = _this.position().left;

						$('#show_box').stop(true, true).fadeOut();
						$('#menu_mark').stop(true, true).fadeIn('fast');

						menu_sub.stop(true, true).load( _this.attr('rel') + '?' + (Math.random()*99999).toString() , function()
						{
							$('.menu > dl > dt > a:not("#mhome")').removeClass('active');
							_this.addClass('active');

							/* 切換次選單 */
							$('#menu_sub .sub_head a').mouseenter(function ()
							{
								var _this_sub = $(this);

								clearTimeout(trigger); // 清除上面的延迟触发的事件
								trigger = setTimeout(function(){
									$('#menu_sub .sub_head a').removeClass('sub_active');
									_this_sub.addClass('sub_active');
									$('#menu_sub dl.sub_body_show').stop(true, true).load( _this_sub.attr('rel') + '?' + (Math.random()*99999).toString() );
								},400); // 延迟时间0.2秒
							});
							$('#menu_sub div.sub_head a').mouseleave(function ()
							{
								clearTimeout(trigger); // 清除上面的延迟触发的事件
							});

							/* 關閉按鈕 */
							// $('.active , .close').click(function ()
							$('#menu_sub .close').click(function ()
							{
								_this.menu_close();
							});
						});


						/* 次選單保持在可視範圍內 */
						if( $(window).scrollTop() < $('#header').outerHeight(true) - slidebar.outerHeight(true) )
						{
							mhome_sub.css('top', slidebar.position().top + slidebar.outerHeight(true) );
							menu_sub.css('top', slidebar.position().top + slidebar.outerHeight(true) );
						}
						else
						{
							mhome_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true) );
							menu_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true) );
						}

						if( ( menu_sub.outerWidth(true) + posLeft ) > $('#wrapper').outerWidth() )
						{
							menu_sub_new_left = ( $('#wrapper').offset().left + $('#wrapper').outerWidth() - menu_sub.outerWidth(true) );
							// alert( $('#wrapper').offset().left + ' ' + $('#wrapper').outerWidth() + ' ' + menu_sub.outerWidth(true) );
							menu_sub.css('left', menu_sub_new_left ).show();
						}
						else
						{
							menu_sub.css('left',  posLeft + slide_dl.offset().left ).show();
						}
					}

					on_menu = 'Y';

				},700); // 延迟时间0.2秒
			}
		}, function(){
			clearTimeout(trigger); // 清除上面的延迟触发的事件
		});

		$(window).on("scroll",function(e) {
			/* 次選單保持在可視範圍內 */
			if( $(window).scrollTop() < $('#header').offset().top + $('#header').outerHeight(true) - slidebar.outerHeight(true) )
			{
				mhome_sub.css('top', slidebar.position().top + slidebar.outerHeight(true) );
				menu_sub.css('top', slidebar.position().top + slidebar.outerHeight(true) );
			}
			else
			{
				mhome_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true) );
				menu_sub.css('top', $(window).scrollTop() - $('#doctop').outerHeight(true) + slidebar.outerHeight(true) );
			}
		});



		/* 若選單寬度超過可視範圍 啟動拖曳主選單 */
		if( slide_dl_prop_width > slide_dl_width && slide_dl_width < 1200 )
		{
			arrow_right.show();

			slide_dl.drag(function( ev, dd ){
				$( this ).css({
					left: dd.offsetX
				});
				if( slide_dl.offset().left >= 0 )
				{
					$( this ).css( 'left',0 )
					arrow_left.hide( 'fast' );
				}
				else
				{
					arrow_left.show( 'fast' );
				}
				if( slide_dl.offset().left < gap )
				{
					$( this ).css( 'left', gap )
					arrow_right.hide( 'fast' );
				}
				else
				{
					arrow_right.show( 'fast' );
				}
			});

			/* 左、右箭頭按鈕動作 */
			if(!slide_dl.is(':animated'))
			{
				arrow_left.click(function(event){
					if( slide_dl.offset().left >= 0 )
					{
						slide_dl.animate({left:'+='+slide_dl_width});
					}
					else
					{
						arrow_left.hide( 'fast' );
						slide_dl.animate({left:0});
						arrow_right.show( 'fast' );
					}
				});

				arrow_right.click(function(event){
					if( slide_dl.offset().left < gap )
					{
						slide_dl.animate({left:'-='+slide_dl_width});
					}
					else
					{
						arrow_right.hide( 'fast' );
						slide_dl.animate({left: gap });
						arrow_left.show( 'fast' );
					}
				});
			}

		}
		else
		{
			// slide_dl.draggable({ enable: false, disabled: true });
			arrow_right.hide( 'fast' );
			slide_dl.animate({left: 0 });
			arrow_left.hide( 'fast' );
		}








		/* 關閉次選單 */
		$.fn.menu_close = function()
		{
			on_menu = 'N';
			$('#menu_mark').stop(true, true).fadeOut();
			$('.menu > dl > dt > a').removeClass('active');
			menu_sub.hide();
			mhome_sub.stop(true, true).fadeOut();
		};

		$('#mh , #header_body_wrapper ').mouseenter(function ()
		{
			$(this).menu_close();
		});
/*		$('.menu_sub').mouseleave(function ()
		{
			$(this).menu_close();
		});
*/
		$('#menu_mark').hover(function ()
		{
			$(this).menu_close();
		});
		$('#menu_mark').click(function ()
		{
			$(this).menu_close();
		});




		/* 讓觸控操作時，第一層連結失效 */
		$("#menu > dl > dt > a").on('tap', function(e){
			e.preventDefault();
			e.stopPropagation();
		});

	}


	/* 山頭選單智慧浮動置頂 */
	var my_gotop = $("#gotop");
	var menu_offset_top = $('.menu').offset().top ;
	var document_scrollTop = $(document).scrollTop() ;
	var my_header = $("#header");

	if( $(document).width() > 749 )
	{
		// document.title = document_scrollTop + ' ' + menu_offset_top;
		if( document_scrollTop >= menu_offset_top && document_scrollTop > 86 )
		{
			my_header.addClass('active');
		}
		else
		{
			my_header.removeClass('active');
		}
	}






















































	/* 居中 */
	$.fn.center = function () {
		this.css("position","absolute");
		this.css("top", Math.max(0, (($(window).height() - this.innerHeight()) / 2) + $(window).scrollTop()) + "px");
		this.css("left", Math.max(0, (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		return this;
	}


	$.fn.show_box = function ( url ) {

		$("#menu_mark").stop(true, true).fadeIn();

		$('#show_box').stop(true, true).load( url , function() {

			$('#show_box .close').click(function ()
			{
				$('#show_box').stop(true, true).fadeOut();
				$("#menu_mark").stop(true, true).fadeOut();
			});

		});

		$('#show_box').fadeIn();

	}

	// 閒置頁面
	timeoutHandle = null;
	if( $(window).width() > 749 )
	{
		idleState = false;
		idleWait = 300000; /* 5'm */
		//idleWait = 10000; /* 10's */
		$('body').bind('mousemove click keydown scroll', function ()
		{
			clearTimeout(timeoutHandle);

			/*
			if (idleState == true) {
				// Reactivated event
				// $("body").append("<p>Welcome Back.</p>");
			}
			*/

			// idleState = false;
			timeoutHandle = setTimeout(function() {
				// Idle Event
				// $("body").css('background-color','#f00');

				var channel_id = $('meta[name="channel_id"]').attr('content');
                                var cate_id = $('meta[name="cate_id"]').attr('content');
                                $( this ).show_box( '/common/threemin/'+channel_id+'/'+cate_id );
				ga('send', 'event', 'Idlepage_'+channel_id, 'popup', {'page': '/common/threemin/'+channel_id+'/'+cate_id});
				//$( this ).show_box( '/common/threemin/1011' );
				// location.reload();

				// idleState = true;
			}, idleWait);
		});
		$("body").trigger("mousemove");
	}






















	/* 搜尋 */
    $('#search_kw').mouseenter(function ()
	{
        $('#search_kw').focus();
    });

	$('.search_type a').click(function ()
	{
        $('.search_type dl').toggleClass('search_open_close');
    });

	$('.search_type').mouseleave(function ()
	{
        $('.search_type dl').removeClass('search_open_close');
    });










/*
	/* refresh the page on a browser resize * /
	function resizeend() {
		if (new Date() - rtime < delta) {
			setTimeout(resizeend, delta);
		} else {
			timeout = false;
			// alert('Done resizing');
			this.location.reload(false); /* false to get page from cache * /
		}
	}
	if (!$.support.leadingWhitespace)
	{
		/* IE 8 7 * /
		var rtime = new Date(1, 1, 2000, 12,00,00);
		var timeout = false;
		var delta = 200;
		var w = $(window).width();
		$(window).resize(function(){
			var nw = $(window).width();
			if( $(window).width() > 768 && ( w != nw ) )
			{
				w = nw; // update h and w;
				// compare the corresponding variables.
				rtime = new Date();
				if (timeout === false) {
					timeout = true;
					setTimeout(resizeend, delta);
				}
			}
		});
	}
	else
	{
		/* !IE 8 7 * /
		//if ( $(window).width() > 750 )
		//{
			$(window).on('resize', function(e)
			{
				if (window.RT) clearTimeout(window.RT);
				window.RT = setTimeout(function()
				{
					this.location.reload(false); /* false to get page from cache * /
				}, 2000);
			});
		//}* /
	}
	//check for the orientation event and bind accordingly
	if (window.DeviceOrientationEvent) {
		window.addEventListener('orientationchange', resizeend, false);
	}
*/
	/* 移動載具 旋轉後 重整頁面 */
	$(window).on("orientationchange",function(event){
		location.reload();
	});


	//$('#loading').hide();
	$('#menu_mark').stop(true, true).fadeOut();
});

$(window).on("scroll",function(e){
	$('#show_box').stop(true, true).fadeOut();
	$('#menu_mark').stop(true, true).fadeOut();
});
$(document).on("pagecreate tap scrollstart",function(){
	$('#show_box').stop(true, true).fadeOut();
	$('#menu_mark').stop(true, true).fadeOut();
});
/*
$(window).mousemove(function( event ) {
	$('#menu_mark').stop(true, true).fadeOut();
});
*/
