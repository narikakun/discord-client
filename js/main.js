var config = {
    token: "",
    api: "https://discord.com/api/v6"
}
$(function(){
    $('#set_token_submit').on('click',function(){
        config.token = $('#set_token_input').val();
        $('#success_message').text("問い合わせ中...");
        $.ajax({
            url: `${config.api}/users/@me`,
            type: "GET",
            headers: {
                "Authorization" : `Bot ${config.token}`
            },
        })
        .done( (data) => {
            console.log(data);
            $('#error_message').text("");
            $('#success_message').text(`${data.username}でログインに成功しました。`);
        })
        .fail( (data) => {
            $('#error_message').text("");
            $('#success_message').text("");
            console.log(data);
            if (data.status == 401) {
                $('#error_message').text("認証に失敗しました。");
            }
        })
    });

    $.ajaxSetup({
        beforeSend: function(request) {
          request.setRequestHeader("User-Agent","DiscordBot");
        }
    });

    $('#send_message_submit').on('click',function(){
        $('#success_message').text("送信中...");
        $.ajax({
            url: `${config.api}/channels/${$('#send_message_channel').val()}/messages`,
            type: "POST",
            headers: {
                "Authorization" : `Bot ${config.token}`,
                "User-Agent" : "Discord Bot"
            },
            contentType: 'application/json',
            data: JSON.stringify({
                "content" : $('#send_message_content').val()
            })
        })
        .done( (data) => {
            console.log(data);
            $('#error_message').text("");
            $('#success_message').text("送信に成功");
        })
        .fail( (data) => {
            $('#error_message').text("");
            $('#success_message').text("");
            console.log(data);
            if (data.status == 401) {
                $('#error_message').text("認証に失敗しました。");
            }
        })
    });
});