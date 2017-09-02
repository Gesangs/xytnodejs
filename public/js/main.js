//缓冲
document.onreadystatechange = function(){
		if(document.readyState == 'complete')
		{
			$('.loading').fadeOut();
		}
	};
  //页面跳转
	$(function(){
		$(".text-center").click(function(){
			var $classname=$(this).children()
								  .first()
								  .attr("class");
			var len=$classname.length-10;
			var classname=$classname.slice(9,len);
			window.location.href='../' + classname;
		});
	});

	$(function(){
		$(".nav-right").click(function(){
			window.location.href="../content";
		})
	})
//留言区
$(function() {
	$("a.message").click(function(e) {
		var target = $(this);
		var toId = target.data('tid');
		var messageId = target.data('cid');
		if($('#toId').length > 0) {
			$('#toId').val(toId);
		}else {
			$('<input>').attr({
			type:'hidden',
			id: 'toId',
			name: 'message[tid]',
			value: toId,
		}).appendTo('#messageForm')
		}
		if($('#messageId').length > 0) {
			$('#messageId').val(messageId)
		}else {
			$('<input>').attr({
			type:'hidden',
			id: 'messageId',
			name: 'message[cid]',
			value: messageId,
		}).appendTo('#messageForm')
		}

		setTimeout(function(){
			$('.input-group input').select().focus()
		}, 0)
	})
})
//天气
$(function(){
	$.getScript('http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&day=0&city=&dfc=1&charset=utf-8',function(a){
        var s="",r="",q="";for(s in window.SWther.w){
        q=SWther.w[s][0];
        r={ city:s,
            date:SWther.add.now.split(" ")[0]||"",
            day_weather:q.s1,
            night_weather:q.s2,
            day_temp:q.t1,
            night_temp:q.t2,
        },
        $(".shijian").html(r.date);
        $(".point").html(r.city);
        $(".wendu").html(r.night_temp + "°" + "~" + r.day_temp + "°");
        $(".weather").html(r.day_weather)
        }
});
})
//提醒框
 $(function() {
 	if($('.alertbox').html()) {
		setTimeout(function(){
			$('.alertbox').fadeOut("slow");
			}, 1500);
		}
 })
//我的页面
$(function(){
    $("#zhanshi").find('.btn').click(function(){
        $("#zhanshi").hide();
        $("#xiugai").show();
    })
})