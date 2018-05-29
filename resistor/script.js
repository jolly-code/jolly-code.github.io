
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
        case "silver": return Math.pow(10,-1);
        case "gold": return Math.pow(10, -2);
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
        case "silver": return 5;
        case "gold": return 10;
        default: return 20;
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

function getStringValue(value) {
    if (value == 0)
        return "0 Ω";
    if (value < 1)
        return value * 1000 + " mΩ";
    if (value < 1000)
        return value + " Ω";
    if (value < 1000000)
        return value / 1000 + " KΩ";
    if (value < 1000000000)
        return value / 1000000 + " MΩ";

    return value / 1000000000 + " GΩ";
}
    
var b100 = document.getElementById("b100");
var b10 = document.getElementById("b10");
var b1 = document.getElementById("b1");
var bMultiplier = document.getElementById("bMultiplier");
var resistorValueText = document.getElementById("resistorValueText");

function evaluate(){
    var value = (100 * getValueFromColor(b100.style.backgroundColor) +
                    10 * getValueFromColor(b10.style.backgroundColor) +
                    1 * getValueFromColor(b1.style.backgroundColor)) *
                    getMultiplierFromColor(bMultiplier.style.backgroundColor);

    resistorValueText.innerHTML = getStringValue(value);
}


var selectColor = function() {
    var classes = $( "input[name=b100options]:checked" )[0].parentElement.children[1].classList;
    b100.style.backgroundColor = classes[1];

    classes = $( "input[name=b10options]:checked" )[0].parentElement.children[1].classList;
    b10.style.backgroundColor = classes[1];

    classes = $( "input[name=b1options]:checked" )[0].parentElement.children[1].classList;
    b1.style.backgroundColor = classes[1];

    classes = $( "input[name=bMoptions]:checked" )[0].parentElement.children[1].classList;
    bMultiplier.style.backgroundColor = classes[1];

    evaluate();
};

selectColor();

$(document).on('change', 'input:radio', function (event) {
    selectColor();
});
