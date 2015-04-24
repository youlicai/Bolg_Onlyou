/**
 * Created by Administrator on 15-3-25.
 */
var domain = "http://localhost:3001/";
$(document).ready(function () {
    $("input[data-name='submit']").click(function () {
        var username = $("#username").val();
        var password = $("#password").val();
        $.post(domain + "admin/login",
            {
                username: username,
                password: password
            },
            function (data, status) {
                if (data[0].account == username) {
                    window.location.replace(domain + "admin");
                } else {
                    alert("登陆失败");
                }
//
            });
    });


    $("a[data-name='tijiao']").click(function () {

        var cover = $("#cover").val();
        var article_type = $("#article_type").val();
        var article_title = $("#article_title").val();
        var content = UE.getEditor('editor').getContent();
        $.post(domain + "admin/publish",
            {
                tag: article_type,
                title: article_title,
                cover: cover,
                content: content
            },
            function (data, status) {
                alert(data[0].content);
//                if(data[0].content==username){
//                    window.location.replace(domain+"admin");
//                }else{
//                    alert(data[0].content);
//                }
//
            });
    });
});