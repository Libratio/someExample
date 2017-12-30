var petname = $.cookie('petname');
if (petname) {
    $('#drop').empty().html(
        `
        <span onclick="location.href='/ask.html'"><span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;提问</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;${petname}</span>
        <ul class="dropdown-menu dropdown-menu-right">
            <li class="text-right"><a href="/user/photo.html">上传头像</a></li>
            <li role="separator" class="divider"></li>
            <li class="text-right"><a href="/api/user/signout">退出</a></li>
        </ul>
        `
    )
} else {
    $('#drop').empty().html(
        `
        <span onclick="location.href='/ask.html'"><span class="glyphicon glyphicon-plus"></span>&nbsp;&nbsp;提问</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span onclick="location.href='/user/signin.html'"><span class="glyphicon glyphicon-user"></span>&nbsp;&nbsp;登录</span>
        `
    )
}
$('.questions').on('click', '[question]', function () {
    if (petname) {
        $.cookie('question', $(this).attr("question"));
        location.href = '/answer.html';
    } else {
        location.href = '/user/signin.html';
    }
})
$.get('/questions', (data) => {
    if (data.code == "success") {
        var result = data.data;
        var html = '';
        result.forEach(function (item) {
            html += '<div class="media" question="' + (new Date(item.time)).getTime() + '">'
            html += '<div class="media-left">'
            html += '<a>'
            html += '<img class="media-object" src="/images/' + item.petname +
                '.jpg" onerror="this.src=\'/images/header.png\'">'
            html += '</a>'
            html += '</div>'
            html += '<div class="media-body">'
            html += '<h4 class="media-heading">' + item.petname + '</h4>'
            html += item.content
            html += '<div class="media-footing">'
            html += formatTime(new Date(item.time))
            html += '</div>'
            html += '</div>'
            html += '</div>'

            if (item.answers) {
                for (var j = 0; j < item.answers.length; j++) {
                    var a = item.answers[j]
                    html += '<div class="media media-child">'
                    html += '<div class="media-body">'
                    html += '<h4 class="media-heading">' + a.petname + '</h4>'
                    html += a.content
                    html += '<div class="media-footing">'
                    html += formatTime(new Date(a.time))
                    html += '</div>'
                    html += '</div>'
                    html += '<div class="media-right">'
                    html += '<a>'
                    html += '<img class="media-object" src="/images/' + a.petname +
                        '.jpg" onerror="this.src=\'/images/header.png\'">'
                    html += '</a>'
                    html += '</div>'
                    html += '</div>'
                }
            }
        });
        $('.questions').html(html);
    }
})

function formatTime(time) {
    var t = new Date(time);
    var year = t.getFullYear();
    var month = t.getMonth() + 1;
    var day = t.getDate();
    var hour = t.getHours();
    var minute = t.getMinutes();

    year = year >= 10 ? year : '0' + year;
    month = month >= 10 ? month : '0' + month;
    day = day >= 10 ? day : '0' + day;
    hour = hour >= 10 ? hour : '0' + hour;
    minute = minute >= 10 ? minute : '0' + minute;

    return year + '年' + month + '月' + day + '日    ' + hour + '时' + minute + '分';
}

function formatIp(ip) {
    if (ip.startsWith('::1')) {
        return "127.0.0.1";
    }
    if (ip.startsWith("::ffff")) {
        return ip.substr(7);
    }
    return ip;
}