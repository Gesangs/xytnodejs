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

//昵称验证
$(function() {
    var $name = $("#inputName");
    if($name.val() !== $("#check").data("ss")) {
        var data = {"username": $name.val()};
        $name.blur(function() {
            $.ajax({
                type: 'POST',
                url: "/check",
                data: data,
                dataType: 'json'
            }, function(data) {
                $name.append(data);
            })

    });
  }
})

//账号限制
$(function() {
    var tixing;
    $("#signupName").blur(function() {
        var xuehao = $("#signupName").val().slice(0, 8);
        if(xuehao !== '70208150') {
            $($(".tixing")[0]).children('span').remove();
            if($("#signupName").val()) {
                tixing = '请用学号注册';
            }else {
                tixing = "请输入学号";
            }
            var html = '<span style="color:red;">'+ tixing + '</span>';
            $($(".tixing")[0]).append(html);
        }else{
            $($(".tixing")[0]).children('span').remove();
            tixing = "";
        }
    });

    $("#signupPassword").blur(function() {
        var len = $("#signupPassword").val().length;
        if(len < 6) {
            $($(".tixing")[1]).children('span').remove();
            if($("#signupPassword").val()) {
                tixing = '密码至少6位';
            }else {
                tixing = "请输入密码";
            }
            var html = '<span style="color:red;">'+ tixing + '</span>';
            $($(".tixing")[1]).append(html);
        }else{
            $($(".tixing")[1]).children('span').remove();
            tixing = "";
        }
    });

    $(".btn-success").click(function() {
        if(tixing) {
            return false;
        }
    })
})