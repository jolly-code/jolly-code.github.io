function getValueFromColor(color){
    switch(color){
        case "black": return 0;
        case "brown": return 1;
        case "red": return 2;
        case "orange": return 3;
        case "yellow": return 4;
        case "green": return 5;
        case "blue": return 6;
        case "violet": return 7;
        case "grey": return 8;
        case "white": return 9;
        default: return 0;
    }
}

function getMultiplierFromColor(color){
    switch(color){
        case "black": return Math.pow(10, 0);
        case "brown": return Math.pow(10, 1);
        case "red": return Math.pow(10, 2);
        case "orange": return Math.pow(10, 3);
        case "yellow": return Math.pow(10, 4);
        case "green": return Math.pow(10, 5);
        case "blue": return Math.pow(10, 6);
        case "violet": return Math.pow(10, 7);
        case "grey": return Math.pow(10, 8);
        case "white": return Math.pow(10, 9);
        case "gold": return Math.pow(10,-1);
        case "silver": return Math.pow(10, -2);
        default: return 0;
    }
}

function getToleranceFromColor(color){
    switch(color){
        case "brown": return 1;
        case "red": return 2;
        case "green": return .5;
        case "blue": return .25;
        case "violet": return .1;
        case "grey": return .05;
        case "gold": return 5;
        case "silver": return 10;
        default: return 20;
    }
}
function getToleranceString(value){
    return value + "%";
}

function getTempCoeffFromColor(color){
    switch(color){
        case "black": return 250;
        case "brown": return 100;
        case "red": return 50;
        case "orange": return 15;
        case "yellow": return 25;
        case "green": return 20;
        case "blue": return 10;
        case "violet": return 5;
        case "grey": return 1;
        default: return 0;
    }
}
function getTempCoeffString(value){
    return value + "ppm/K";
}

function getValueString(value) {
    if (value == 0)
        return "0Ω";
    if (value < 1)
        return value * 1000 + "mΩ";
    if (value < 1000)
        return value + "Ω";
    if (value < 1000000)
        return value / 1000 + "KΩ";
    if (value < 1000000000)
        return value / 1000000 + "MΩ";

    return value / 1000000000 + "GΩ";
}
    
var b100 = document.getElementById("b1");
var b10 = document.getElementById("b2");
var b1 = document.getElementById("b3");
var bMultiplier = document.getElementById("b5");
var bTolerance = document.getElementById("b4");
var bTempCoeff = document.getElementById("b6");
var resistorValueText = document.getElementById("resistorValueText");

function evaluate(){
    var value = (100 * getValueFromColor(b100.style.backgroundColor) +
                 10 * getValueFromColor(b10.style.backgroundColor) +
                 1 * getValueFromColor(b1.style.backgroundColor)) *
                 getMultiplierFromColor(bMultiplier.style.backgroundColor);
    var string = getValueString(value);

    var tolerance = getToleranceFromColor(bTolerance.style.backgroundColor);
    if(tolerance > 0)
        string += " " + getToleranceString(tolerance);

    var tempCoeff = getTempCoeffFromColor(bTempCoeff.style.backgroundColor);
    if(tempCoeff > 0)
        string += " " + getTempCoeffString(tempCoeff);

    resistorValueText.innerHTML = string;
}


function selectColor() {
    var classes = $( "input[name=b100options]:checked" )[0].parentElement.children[1].classList;
    b100.style.backgroundColor = classes[1];

    classes = $( "input[name=b10options]:checked" )[0].parentElement.children[1].classList;
    b10.style.backgroundColor = classes[1];

    classes = $( "input[name=b1options]:checked" )[0].parentElement.children[1].classList;
    b1.style.backgroundColor = classes[1];

    classes = $( "input[name=bMoptions]:checked" )[0].parentElement.children[1].classList;
    bMultiplier.style.backgroundColor = classes[1];

    classes = $( "input[name=bToptions]:checked" )[0].parentElement.children[1].classList;
    bTolerance.style.backgroundColor = classes[1];

    classes = $( "input[name=bTCoptions]:checked" )[0].parentElement.children[1].classList;
    bTempCoeff.style.backgroundColor = classes[1];

    evaluate();
};

selectColor();

$(document).on('change', 'input:radio', function (event) {
    selectColor();
});


function solve(multiplier){
    var value = $("#valueInput").val().trim();
    if(value >= 0){
        value *= multiplier;

        //force to 4 count

        var resistorValueText = document.getElementById("resistorValueText");
        resistorValueText.innerHTML = getValueString(value);
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


$('#bandList li').on('click', function(){
    $('#bandList li').removeClass("active");
    $(this).addClass("active");
});

$('#3band').on('click', function(){
    $('#100BandSelect')[0].style.display = 'none';
    $('#toleranceBandSelect')[0].style.display = 'none';
    $('#tempCoeffBandSelect')[0].style.display = 'none';

    $('#b4')[0].style.display = 'none';
    $('#b5')[0].style.display = 'none';
    $('#b6')[0].style.display = 'none';
});

$('#4band').on('click', function(){
    $('#100BandSelect')[0].style.display = 'none';
    $('#toleranceBandSelect')[0].style.display = 'block';
    $('#tempCoeffBandSelect')[0].style.display = 'none';

    $('#b4')[0].style.display = 'block';
    $('#b5')[0].style.display = 'none';
    $('#b6')[0].style.display = 'none';
});

$('#5band').on('click', function(){
    $('#100BandSelect')[0].style.display = 'block';
    $('#toleranceBandSelect')[0].style.display = 'none';
    $('#tempCoeffBandSelect')[0].style.display = 'block';

    $('#b4')[0].style.display = 'block';
    $('#b5')[0].style.display = 'block';
    $('#b6')[0].style.display = 'none';
});

$('#5bandT').on('click', function(){
    $('#100BandSelect')[0].style.display = 'none';
    $('#toleranceBandSelect')[0].style.display = 'block';
    $('#tempCoeffBandSelect')[0].style.display = 'block';

    $('#b4')[0].style.display = 'block';
    $('#b5')[0].style.display = 'none';
    $('#b6')[0].style.display = 'block';
});

$('#6band').on('click', function(){
    $('#100BandSelect')[0].style.display = 'block';
    $('#toleranceBandSelect')[0].style.display = 'block';
    $('#tempCoeffBandSelect')[0].style.display = 'block';

    $('#b4')[0].style.display = 'block';
    $('#b5')[0].style.display = 'block';
    $('#b6')[0].style.display = 'block';
});