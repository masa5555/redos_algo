"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rerejs_1 = require("rerejs");
var parse2edge = function (pattern, output, num) {
    switch (pattern.type) {
        case "Pattern":
            parse2edge(pattern.child, output, num);
            break;
        case "Char":
            output.push({ from: num, to: num + 1, char: pattern.raw });
            break;
        case "Disjunction":
            output.push({ from: num, to: num + 1, char: 'ε' });
            output.push({ from: num, to: num + 2, char: 'ε' });
            output.push({ from: num + 1, to: num + 3, char: pattern.children[0].raw });
            output.push({ from: num + 2, to: num + 4, char: pattern.children[1].raw });
            output.push({ from: num + 3, to: num + 5, char: 'ε' });
            output.push({ from: num + 4, to: num + 5, char: 'ε' });
            break;
        /*
        case "Seqence":
            console.log("Seqence");
            break;
        */
    }
};
var main = function () {
    var parser1 = new rerejs_1.Parser('a');
    var pattern1 = parser1.parse();
    var out1 = new Array;
    parse2edge(pattern1, out1, 0);
    console.log(out1);
    /*
    [ { from: 0, to: 1, char: 'a' } ]
    */
    var parser2 = new rerejs_1.Parser('a|b');
    var pattern2 = parser2.parse();
    //console.log(pattern2.child);
    var out2 = new Array;
    parse2edge(pattern2, out2, 0);
    console.log(out2);
    /*
    
    */
    /*
    const parser3 = new Parser('a+');
    const pattern3 = parser2.parse();
    console.log(pattern3);
    */
};
main();
