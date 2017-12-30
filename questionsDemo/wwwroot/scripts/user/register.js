$('form').submit(function(e){
    e.preventDefault();

    var psw = $(':password').map(function(){
        return $(this).val();
    })

    if (psw[0] == psw[1]) {
        $.post(this.action,$(this).serialize(),(data)=>{
            alert(data.message);
            if (data.code == "success") {
                location.href = "/user/signin.html";
            }
        })
    }else{
        alert('两次密码输入不一致');
    }
})