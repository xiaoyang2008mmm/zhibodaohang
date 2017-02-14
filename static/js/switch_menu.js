$(function () {
        var current_url = window.location.pathname;
        var side_list = $(".sidebar-nav").find("a");

        for (var i=0; i < side_list.length; i++ ){
            var tmp_url = side_list[i].getAttribute('href');

            if (tmp_url == current_url){

                var p_ul = $(side_list[i]).parents()[1];

                var flag = true;

                while (flag){

                    ClassFormat(p_ul);

                    p_ul = $(p_ul).parent("ul");

                    if (p_ul){
                        ClassFormat(p_ul);

                    }else{
                        flag = false;
                    }
                    break
                }

            }

        }
      });

function ClassFormat(obj) {
          $(obj).removeClass("collapse");
          $(obj).addClass("in");
          $(obj).prev("a").removeClass("collapsed");
      }

