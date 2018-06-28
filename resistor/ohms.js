

var changeStack = [];

function divide(dividend, divider, target){
    if(dividend >= 0 && divider >= 0){
        if(divider == 0){
            target.attr("placeholder", "Undefined");
            target.val(null);
        }
        else {
            z = dividend / divider;
            target.attr("placeholder", null);
            target.val(getRoundedValue(z));
        }
    }
}
function multiply(senderValue, multiplier, target){
    if(senderValue >= 0 && multiplier >= 0){
        z = senderValue * multiplier;
        target.attr("placeholder", null);
        target.val(getRoundedValue(z));
    }
}

function evaluate(sender, alt1, alt2){
    var id = sender.attr("id");
    sender.attr("placeholder", null);

    var index = changeStack.indexOf(id);
    if(index >= 0){
        changeStack.splice(index, 1);
    }

    if(changeStack.length == 0) {
        changeStack.push(id);
        return;
    }

    var last = changeStack[changeStack.length-1];

    var x = sender.val().trim();
    var y = alt1.val().trim();
    var z = alt2.val().trim();

    if(last == alt1.attr("id")){
        if(alt2.attr("id") == "voltage")
            multiply(x, y, alt2);
        else if(id == "voltage")
            divide(x, y, alt2);
        else 
            divide(y, x, alt2);
    }
    else {
        if(alt1.attr("id") == "voltage")
            multiply(x, z, alt1);
        else if(id == "voltage")
            divide(x, z, alt1);
        else
            divide(z, x, alt1);
    }

    changeStack.push(id);

    setSolverLink();
}

function setSolverLink(){
    $("#solve-link").attr("href", "./?solve=" + $("#resistance").val().trim());
}

$("#voltage").on('change keydown paste input', function(){
    evaluate($("#voltage"), $("#amperage"), $("#resistance"))
});

$("#amperage").on('change keydown paste input', function(){
    evaluate($("#amperage"), $("#voltage"), $("#resistance"))
});

$("#resistance").on('change keydown paste input', function(){
    evaluate($("#resistance"), $("#voltage"), $("#amperage"))

    setSolverLink();
});

$("#voltage").val(null);
$("#amperage").val(null);
$("#resistance").val(null);