function eia96Value(code){
    switch(code){
        case "01": return 100;
        case "02": return 102;
        case "03": return 105;
        case "04": return 107;
        case "05": return 110;
        case "06": return 113;
        case "07": return 115;
        case "08": return 118;
        case "09": return 121;
        case "10": return 124;
        case "11": return 127;
        case "12": return 130;
        case "13": return 133;
        case "14": return 137;
        case "15": return 140;
        case "16": return 143;
        case "17": return 147;
        case "18": return 150;
        case "19": return 154;
        case "20": return 158;
        case "21": return 162;
        case "22": return 165;
        case "23": return 169;
        case "24": return 174;
        case "25": return 178;
        case "26": return 182;
        case "27": return 187;
        case "28": return 191;
        case "29": return 196;
        case "30": return 200;
        case "31": return 205;
        case "32": return 210;
        case "33": return 215;
        case "34": return 221;
        case "35": return 226;
        case "36": return 232;
        case "37": return 237;
        case "38": return 243;
        case "39": return 249;
        case "40": return 255;
        case "41": return 261;
        case "42": return 267;
        case "43": return 274;
        case "44": return 280;
        case "45": return 287;
        case "46": return 294;
        case "47": return 301;
        case "48": return 309;
        case "49": return 316;
        case "50": return 324;
        case "51": return 332;
        case "52": return 340;
        case "53": return 348;
        case "54": return 357;
        case "55": return 365;
        case "56": return 374;
        case "57": return 383;
        case "58": return 392;
        case "59": return 402;
        case "60": return 412;
        case "61": return 422;
        case "62": return 432;
        case "63": return 442;
        case "64": return 453;
        case "65": return 464;
        case "66": return 475;
        case "67": return 487;
        case "68": return 499;
        case "69": return 511;
        case "70": return 523;
        case "71": return 536;
        case "72": return 549;
        case "73": return 562;
        case "74": return 576;
        case "75": return 590;
        case "76": return 604;
        case "77": return 619;
        case "78": return 634;
        case "79": return 649;
        case "80": return 665;
        case "81": return 681;
        case "82": return 698;
        case "83": return 715;
        case "84": return 732;
        case "85": return 750;
        case "86": return 768;
        case "87": return 787;
        case "88": return 806;
        case "89": return 825;
        case "90": return 845;
        case "91": return 866;
        case "92": return 887;
        case "93": return 909;
        case "94": return 931;
        case "95": return 953;
        case "96": return 976;
    }
    return 0;
}
function eia96Multiplier(code){
    switch(code){
        case "Z": return 0.001;
        case "Y": 
        case "R": return 0.01;
        case "X": 
        case "S": return 0.1;
        case "A": return 1;
        case "B": 
        case "H": return 10;
        case "C": return 100;
        case "D": return 1000;
        case "E": return 10000;
        case "F": return 100000;
    }
    return 0;
}

$('button').click(function() {
    var text = $("#smdText")[0].innerHTML;

    if(this.id == "delete"){
        if(text.length > 0){
            text = text.slice(0,-1);
        }
    }
    else if(this.id == "clear"){
        text = "";
    }
    else if(text.length < 4){
        text += this.innerHTML.trim();
    }

    $("#smdText")[0].innerHTML = text;

    var value = null;
    var tolerance = "";
    if(text.length == 1 && text == "0"){
        value = 0;
    }
    else if(text.length > 2){
        if(text.length == 3 && eia96Multiplier(text[2]) != 0 && eia96Value(text.substr(0, 2)) > 0){
            var multiplier = eia96Multiplier(text[2]);
            value = eia96Value(text.substr(0, 2)) * multiplier;
            tolerance = " ± 1%";
        }
        else if(text.indexOf('R') >= 0) { 
            value = text.replace('R', '.');
        }
        else{
            var base = text.substr(0, text.length - 1);
            power = text.substr(text.length - 1, 1);
            if($.isNumeric(base) && $.isNumeric(power))
                value = base * Math.pow(10, power);
        }
    }

    $("#resistorValueText")[0].innerHTML = getValueString(value) + tolerance;
});