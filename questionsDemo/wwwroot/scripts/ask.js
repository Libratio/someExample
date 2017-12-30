
$('form').submit(function(e){
    e.preventDefault();
    $.post(this.action,$(this).serialize(),(data)=>{
        if (data.code =="success") {
            location.href = "/";
        }
    })
})