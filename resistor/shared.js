function getRoundedValue(value) {
    return Math.round(value * 1000) / 1000;
}


function solve(multiplier){
    var value = $("#valueInput").val().trim();
    if(value >= 0){
        value *= multiplier;

        location.replace("./");

        default4BandSelect();
        
        $("#resistorValueText")[0].innerHTML = getValueString(value);
    }
}

$('#solverBaseButton').on('click', function(event) {
    solve(1);
});

$('#solverKButton').on('click', function(event) {
    solve(1000);
});

$('#solverMButton').on('click', function(event) {
    solve(1000 * 1000);
});

$('#solverGButton').on('click', function(event) {
    solve(1000 * 1000 * 1000);
});