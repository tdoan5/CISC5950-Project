$(document).ready(function () {
    $('#button1').on('click', function () {
        $('#i1').removeClass("search icon").addClass("spinner icon");
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
                    $('#container1').css("padding-top", "0%");
                    $('#link1').html("");
                    $('#i1').removeClass("spinner icon").addClass("search icon");
                    var block_obj = jQuery.parseJSON(resultHTML)[0].blocks[0];
                    console.log(block_obj);
                    $('#link1').append("<table id=\"table1\" class=\"ui selectable table\"><tbody>");
                    $.each(block_obj, function (key, value) {
                        var k = key.toString();
                        var v = value.toString();
                        var str = "";
                        if(k === "time" || k === "received_time"){
                            v = new Date(Number(v)).toUTCString();
                            str = ("<tr><td>" + k + "</td><td>" + v + "</td></tr>");
                        }else if(k === "tx"){
                            v = "transaction detail";
                            str = ("<tr><td>" + k + "</td><td><button id='tx_button' class='ui basic button'>" + v + "</button></td></tr>");
                        }else if (k === "fee"){
                            str = ("<tr><td>" + k + "</td><td>" + Number(v)/100000000 + " BTC " + "</button></td></tr>");
                        }else{
                            str = ("<tr><td>" + k + "</td><td>" + v + "</td></tr>");
                        }
                        // console.log(str);
                        $('#table1').append(str);
                    });

                    var tx_obj = block_obj.tx;
                    $('#sc1').html("");
                    $('#sc1').append("<table id=\"table2\" class=\"ui selectable table\"><tbody>");
                    var cnt = 0;
                    var group = 0;
                    for (var key in tx_obj){
                        cnt += 1;
                        // if(cnt % 21 === 0 && cnt < tx_obj.length){
                        //     $('#table2').append("<tr><td><button id='showall' class='ui button'>show all</button></td><td></td></tr>");
                        //     break;
                        // }
                        if (tx_obj.hasOwnProperty(key)) {
                            var str = "";
                            var hash = tx_obj[key].hash;
                            str += ("<tr><td class='error'>Transaction " + cnt + "</td>");
                            str += "<td class='error'>" + hash + "</td>";
                            str += "<tr><td>";
                            for (var input in tx_obj[key].inputs){
                                if(tx_obj[key].inputs[input].prev_out === undefined){
                                    var inaddr = "Newly Generated Coins "
                                }else {
                                    var inaddr = tx_obj[key].inputs[input].prev_out.addr;
                                }
                                str += (inaddr + "<i class='arrow right icon'></i><br>");
                            }
                            str += "</td><td>";
                            for (var out in tx_obj[key].out){
                                str += "<tr>";
                                var outaddr = tx_obj[key].out[out].addr;
                                var value = tx_obj[key].out[out].value;
                                str += ("<td>" + outaddr + "</td><td>" + Number(value)/100000000 + " BTC" + "</td>");
                                str += "<tr>";
                            }
                            str += "</td></tr>";
                        }
                        $('#table2').append(str);
                    }
                    $('#table2').append("</tbody></<table>");
                    $('#tx_button').on('click', function () {
                        $('#modal2').modal('show');
                    });
                    // $('#link1').append("</tbody></table>");
                    $('#link1').hide().fadeIn('slow');
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        if(data.message === "Input invalid"){
                            window.alert(e);
                            $('#error_content2').html("Input invalid");
                        }else {
                            $('#error_content2').html("Keyword not found");
                        }
                    } else {
                        $('#error_content2').html(e);
                    }
                    $('#container1').css("padding-top", "10%");
                    $('#modal1').modal('show');
                }
            }
        });
    });

});

