$('form').submit(function(e){
    e.preventDefault();
    var petname = $.cookie("petname");
    if (petname) {
        // 已经登录过了
        alert('用户已经登录！不能重复登录！');
    }else{
        $.post(this.action,$(this).serialize(),(data)=>{
            if (data.code == "success") {
                // 登录成功跳转到首页
                location.href = '/';
            }
        })
    }
})