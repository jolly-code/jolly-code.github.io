var changeStack = ['voltage-in', 'resistance-1', 'resistance-2', 'voltage-out'];

function evaluate(sender){
    var id = sender.attr("id");
    sender.attr("placeholder", null);

    var index = changeStack.indexOf(id);
    if(index >= 0){
        changeStack.splice(index, 1);
    }

    changeStack.push(id);

    if($("#" + changeStack[1]).val().trim().length == 0) {
        //only first can be empty, need at least 3 filled inputs
        return;
    }

    var vin = parseInt($("#voltage-in").val().trim());
    var r1 = parseInt($("#resistance-1").val().trim());
    var r2 = parseInt($("#resistance-2").val().trim());
    var vout = parseInt($("#voltage-out").val().trim());

    //first was last modified so change that one
    var first = changeStack[0];

    switch(first){
        case "voltage-in":
        if(r2 == 0){
            $("#voltage-in").attr("placeholder", "Undefined");
            $("#voltage-in").val(null);
        }
        else{
            vin = vout * (r1 + r2) / r2;
            $("#voltage-in").val(getRoundedValue(vin));
        }
        break;

        case "resistance-1":
        if(vout == 0){
            $("#resistance-1").attr("placeholder", "Undefined");
            $("#resistance-1").val(null);
        }
        else{
            r1 =  r2 * vin / vout - r2;
            $("#resistance-1").val(getRoundedValue(r1));
        }
        setSolverLink(1);
        break;

        case "resistance-2":
        if(vin - vout == 0){
            $("#resistance-2").attr("placeholder", "Undefined");
            $("#resistance-2").val(null);
        }
        else{
            r2 =  r1 * vout / (vin - vout);
            $("#resistance-2").val(getRoundedValue(r2));
        }
        setSolverLink(2);
        break;

        case "voltage-out":
        if(r1 + r2 == 0){
            $("#voltage-out").attr("placeholder", "Undefined");
            $("#voltage-out").val(null);
        }
        else{
            vout = vin * r2 / (r1 + r2);
            $("#voltage-out").val(getRoundedValue(vout));
        }
        break;
    }

}

function setSolverLink(index){
    var value = parseInt($("#resistance-" + index).val().trim());

    if(!isNaN(value))
        $("#solve-link-" + index).attr("href", "/resistor/?solve=" + value);
    else
        $("#solve-link-" + index).attr("href", "#");
}

$("#voltage-in").on('change keydown paste input', function(){
    evaluate($(this));
});

$("#voltage-out").on('change keydown paste input', function(){
    evaluate($(this));
});

$("#resistance-1").on('change keydown paste input', function(){
    evaluate($(this));

    setSolverLink(1);
});

$("#resistance-2").on('change keydown paste input', function(){
    evaluate($(this));

    setSolverLink(2);
});

$("#voltage-in").val(null);
$("#voltage-out").val(null);
$("#resistance-1").val(null);
$("#resistance-2").val(null);