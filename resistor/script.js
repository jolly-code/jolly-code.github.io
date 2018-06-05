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
        case "brown": return .01;
        case "red": return .02;
        case "green": return .005;
        case "blue": return .0025;
        case "violet": return .001;
        case "grey": return .0005;
        case "gold": return .05;
        case "silver": return .10;
        default: return .20;
    }
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

function getValueToleranceString(value, tolerance) {
    var displayId = $('#toleranceDisplayList li.active')[0].id;
    
    if(displayId == "percent")
        return getValueString(value) + " " + (tolerance * 100) + "%";

    var varience = tolerance * value;

    if(displayId == "range")
        return getValueString(value - varience) + " - " + getValueString(value + varience);

    return getValueString(value) + " ± " + getValueString(varience);
}

function evaluate(){
    var value = (100 * getValueFromColor(b100.style.backgroundColor) +
                 10 * getValueFromColor(b10.style.backgroundColor) +
                 1 * getValueFromColor(b1.style.backgroundColor)) *
                 getMultiplierFromColor(bMultiplier.style.backgroundColor);

    var tolerance = getToleranceFromColor(bTolerance.style.backgroundColor);
    
    var string = getValueToleranceString(value, tolerance);

    var tempCoeff = getTempCoeffFromColor(bTempCoeff.style.backgroundColor);
    if(tempCoeff > 0)
        string += " " + getTempCoeffString(tempCoeff);

    $("#resistorValueText")[0].innerHTML = string;
}


var b100;
var b10;
var b1;
var bMultiplier;
var bTolerance;
var bTempCoeff;

function selectColor() {
    var classes;

    if(b100.style.backgroundColor != "transparent"){
        classes = $( "input[name=b100options]:checked" )[0].parentElement.children[1].classList;
        b100.style.backgroundColor = classes[1];
    }

    classes = $( "input[name=b10options]:checked" )[0].parentElement.children[1].classList;
    b10.style.backgroundColor = classes[1];

    classes = $( "input[name=b1options]:checked" )[0].parentElement.children[1].classList;
    b1.style.backgroundColor = classes[1];

    classes = $( "input[name=bMoptions]:checked" )[0].parentElement.children[1].classList;
    bMultiplier.style.backgroundColor = classes[1];

    if(bTolerance.style.backgroundColor != "transparent"){
        classes = $( "input[name=bToptions]:checked" )[0].parentElement.children[1].classList;
        bTolerance.style.backgroundColor = classes[1];
    }

    if(bTempCoeff.style.backgroundColor != "transparent"){
        classes = $( "input[name=bTCoptions]:checked" )[0].parentElement.children[1].classList;
        bTempCoeff.style.backgroundColor = classes[1];
    }
};

$('input:radio').each(function( index ) {
    $(this).attr("aria-label", this.nextElementSibling.classList[1]);
});

$(document).on('change', 'input:radio', function (event) {
    selectColor();
    evaluate();
});


$('#bandList li').on('click', function(){
    $('#bandList li').removeClass("active");
    $(this).addClass("active");
});

$('#3band').on('click', function(){
    b100 = document.getElementById("b6");
    b10 = document.getElementById("b1");
    b1 = document.getElementById("b2");
    bMultiplier = document.getElementById("b3");
    bTolerance = document.getElementById("b4");
    bTempCoeff = document.getElementById("b5");

    $('#100BandSelect')[0].style.display = 'none';
    $('#toleranceBandSelect')[0].style.display = 'none';
    $('#tempCoeffBandSelect')[0].style.display = 'none';

    $('#b4')[0].style.backgroundColor = 'transparent';
    $('#b5')[0].style.backgroundColor = 'transparent';
    $('#b6')[0].style.backgroundColor = 'transparent';
    selectColor();
    evaluate();
});


function default4BandSelect(){
    $('#bandList li').removeClass("active");
    $("#4band").addClass("active");
    
    b100 = document.getElementById("b6");
    b10 = document.getElementById("b1");
    b1 = document.getElementById("b2");
    bMultiplier = document.getElementById("b3");
    bTolerance = document.getElementById("b4");
    bTempCoeff = document.getElementById("b5");

    $('#100BandSelect')[0].style.display = 'none';
    $('#toleranceBandSelect')[0].style.display = 'block';
    $('#tempCoeffBandSelect')[0].style.display = 'none';

    $('#b4')[0].style.backgroundColor = null;
    $('#b5')[0].style.backgroundColor = 'transparent';
    $('#b6')[0].style.backgroundColor = 'transparent';
    selectColor();
    evaluate();
}
$('#4band').on('click', function(){
    default4BandSelect();
});

$('#5band').on('click', function(){
    b100 = document.getElementById("b1");
    b10 = document.getElementById("b2");
    b1 = document.getElementById("b3");
    bMultiplier = document.getElementById("b5");
    bTolerance = document.getElementById("b4");
    bTempCoeff = document.getElementById("b6");

    $('#100BandSelect')[0].style.display = 'block';
    $('#toleranceBandSelect')[0].style.display = 'none';
    $('#tempCoeffBandSelect')[0].style.display = 'block';

    $('#b4')[0].style.backgroundColor = null;
    $('#b5')[0].style.backgroundColor = null;
    $('#b6')[0].style.backgroundColor = 'transparent';
    selectColor();
    evaluate();
});

$('#5bandT').on('click', function(){
    b100 = document.getElementById("b6");
    b10 = document.getElementById("b1");
    b1 = document.getElementById("b2");
    bMultiplier = document.getElementById("b3");
    bTolerance = document.getElementById("b4");
    bTempCoeff = document.getElementById("b5");

    $('#100BandSelect')[0].style.display = 'none';
    $('#toleranceBandSelect')[0].style.display = 'block';
    $('#tempCoeffBandSelect')[0].style.display = 'block';

    $('#b4')[0].style.backgroundColor = null;
    $('#b5')[0].style.backgroundColor = 'transparent';
    $('#b6')[0].style.backgroundColor = null;
    selectColor();
    evaluate();
});

$('#6band').on('click', function(){
    b100 = document.getElementById("b1");
    b10 = document.getElementById("b2");
    b1 = document.getElementById("b3");
    bMultiplier = document.getElementById("b5");
    bTolerance = document.getElementById("b4");
    bTempCoeff = document.getElementById("b6");

    $('#100BandSelect')[0].style.display = 'block';
    $('#toleranceBandSelect')[0].style.display = 'block';
    $('#tempCoeffBandSelect')[0].style.display = 'block';

    $('#b4')[0].style.backgroundColor = null;
    $('#b5')[0].style.backgroundColor = null;
    $('#b6')[0].style.backgroundColor = null;
    selectColor();
    evaluate();
});


$('#toleranceDisplayList li').on('click', function(){
    $('#toleranceDisplayList li').removeClass("active");
    $(this).addClass("active");

    evaluate();
});

$("#percent").addClass("active");
default4BandSelect();