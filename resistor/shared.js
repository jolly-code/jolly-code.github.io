function getRoundedValue(value) {
    return Math.round(value * 1000) / 1000;
}

function getValueString(value) {    
    if (value == null)
        return "";
    if (value == 0)
        return "0Ω";
    if (value < 1)
        return getRoundedValue(value * 1000) + "mΩ";
    if (value < 1000)
        return getRoundedValue(value) + "Ω";
    if (value < 1000000)
        return getRoundedValue(value / 1000) + "KΩ";
    if (value < 1000000000)
        return getRoundedValue(value / 1000000) + "MΩ";

    return getRoundedValue(value / 1000000000) + "GΩ";

}

function solve(multiplier){
    var value = $("#valueInput").val().trim();
    if(value >= 0){
        value *= multiplier;

        location.replace("./?solve=" + value);
    }
}

$('#solvermButton').on('click', function(event) {
    solve(.001);
});

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