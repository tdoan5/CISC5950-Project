$(document).ready(function () {
    $('#button1').on('click', function () {
        $.ajax({
            url: '/blocks',
            type: 'POST',
            dataType: 'JSON',
            data: {input: $('#input1').val()},
            success: function (data) {
                // console.log(data);
                // console.log(data.message);
                var resultHTML = data.message;
                try {
                    $('#input_div').removeClass("ui big fluid action error input").addClass("ui big fluid action input");
                    $('#input1').attr("placeholder", "Search for a block...");

                    var json_obj = JSON.parse(resultHTML);
                    // window.alert(json_obj[0].blocks[0].hash);

                    resultHTML = JSON.stringify(json_obj);
                    $('#link1').html(resultHTML);
                    $('#link1').hide().fadeIn('slow');
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        // window.alert(e);
                        $('.ui.basic.modal').modal('show');
                    } else {
                        window.alert(e);
                    }
                }
            }
        });
    });
});

