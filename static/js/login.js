$(document).ready(function() {

    $("#login_btn").click(function() {

        var login_username = $("#login_username").val();
        var login_password = $("#login_password").val();

            $.post("/login/", {
                login_username: login_username,
                login_password: login_password,
            },
            function(data) {
                if (data == "ok") {
                    location.href = '/index/';
                } else {
                    alert(data);
                }
            });

    });
});
