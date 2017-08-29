$(function() {
            var warpH = $(window).height();
            $(".warp").height((warpH - 95));
            $("button").click(function() {
                var text = $("#inputArea").val();
                $("#inputArea").val("");
                var $i = $("#msgContent");
                var userTx = $("input:hidden[name='userTx']").val();
                console.log(userTx)
                var html = "<div class='fasong clearfix'><img src='/touxiang/"+ userTx +"' class='chatImg' /><span>"+ text +"</span></div>";
                $i.append(html);
                var gaodu = $i[0].scrollHeight;
                $i.scrollTop(gaodu);
                var usern = userTx.split('.')[0];
                $.post("http://www.tuling123.com/openapi/api", {
                    "key": "828d03631fda4b33a234d54a8ed28a77",
                    "info": text,
                    "userid": usern
                }, function(data) {
                    var html2 = "<div class='reply clearfix'><img src='/touxiang/Baymax.jpg' class='chatImg' /><span>"+ data.text +"</span></div>";
                    $i.append(html2);
                    gaodu = $i[0].scrollHeight;
                    $i.scrollTop(gaodu);
                })
                return false;
            })
        })