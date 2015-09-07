
$(function() {

	var $width = $(document).width();
	if ($width <= 766) {
	
		$.ajax({
			url:'http://udn.com/common/adstatus/2',
			type: 'GET',
			timeout: 1000,
			async: true,
			error: function(){
			},
			success: function(is_page_cover){
				if (is_page_cover > 0) {

					var pc = $.cookie('page_cover');

					if (pc != 'Y') {
						setTimeout(function() {
							showBox();
						}, 1000);

						var expire_date = new Date();
						expire_date.setTime(expire_date.getTime() + (5 * 60 * 1000));
						$.cookie('page_cover', 'Y',{ path: '/',expires: expire_date });
					}
				}
			}
		});
	}
});

showBox = function() {
        $.modal('<iframe src="http://udn.com/static/ad2015/ad_cover_online.html" height="480" width="320" frameborder="0" marginwidth="0" marginheight="0"  scrolling="no" allowtransparency="true">', {
                closeHTML:"<button type='button' id='cboxClose' style='display:none'>CLOSE</button>",

                containerCss:{
                        borderColor:"#fff",
                        zIndex : 999,
                        minHeight:480,
                        maxHeight:480,
                        Width:320,
                        padding:0
                },
                overlayClose:true,
                onShow:function(d){
                        var h = ($(window).height()-480)/2 ;
                        if( h < 0 ) h = 0;
                        d.container.css({position: 'absolute', top: h+'px'});
                }
        });

	setTimeout("showCloseButton()",2000);
}

showCloseButton = function() {
	$("#cboxClose").css("display","block");
}
