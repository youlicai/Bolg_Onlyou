var domain = "http://localhost:3001/";
$(document).ready(function () {
    $(".article_title,.readmore,.readDetail").click(function () {
        var article_id = $(this).attr('data-id');
        $.getJSON(domain + "article/" + article_id,
            function (data) {
                $("#article_list").hide();
                $("#one_article").fadeIn();
//                var article_detail = $("#article_detail");
//
//                var one_article = $("#one_article");
//
                $(".one_article_title").text(data[0].title);
                $(".one_article_content").text(data[0].content);
//                $(".ds-thread-count").attr("data-thread-key", data[0].id);
//                $(".ds-thread").attr("data-thread-key", data[0].id);
//                article_detail.append(one_article);


            });
    });

    $(".close").click(function () {
        $("#article_list").fadeIn();
        $("#one_article").hide();
    });

    $("a[data-name='pre']").click(function () {
        var tag = $(this).attr("tag");
        var pageId = $(this).attr("pageId");
        pageId--;
        if (pageId < 0) {
            alert("这已经是首页了");
            return;
        }

        window.location.replace(domain + "portal/" + tag + "/" + pageId);
    });

    $("a[data-name='next']").click(function () {
        var tag = $(this).attr("tag");
        var pageId = $(this).attr("pageId");
        pageId++;
        if (pageId < 0) {
            alert("这已经是最后一页了");
            return;
        }

        window.location.replace(domain + "portal/" + tag + "/" + pageId);
    });
});


function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

