$('form').submit(function (e) {
    e.preventDefault();

    var question = $.cookie('question');
    var formData = $(this).serializeArray();
    formData.push({
        name: "question",
        value: question
    })
    $.post(this.action, formData, (data) => {
        if (data.code == "success") {
            location.href = '/';
        }
    })
})