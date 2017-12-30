
$('form').submit(function(e){
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url:this.action,
        method:'post',
        data:formData,
        contentType:false,
        processData:false,
        success:(data)=>{
            if (data.code == "success") {
                location.href = '/';
            }
        }
    })
})