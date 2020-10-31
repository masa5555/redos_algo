"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rerejs_1 = require("rerejs");
var out = new Array;
var parse2edge = function (pattern) {
    switch (pattern.type) {
        case "Pattern":
            parse2edge(pattern.child);
            break;
        case "Char":
            out.push({ from: pattern.range[0], to: pattern.range[1], char: pattern.raw });
            break;
        /*
        case "Seqence":
            console.log("Seqence");
            break;
        */
    }
    //return {from: 0, to: 1, char: 'a'};
};
var main = function () {
    var parser1 = new rerejs_1.Parser('a');
    var pattern1 = parser1.parse();
    console.log(pattern1);
    console.log(pattern1.child.range);
    parse2edge(pattern1);
    console.log(out);
    /*
    const parser2 = new Parser('(a|b)');
    const pattern2 = parser2.parse();
    console.log(pattern2);

    const parser3 = new Parser('a+');
    const pattern3 = parser2.parse();
    console.log(pattern3);
    */
    // 出力
    /*
    console.log(
        "digraph DFA {\n" +
        " ra"
    );
    */
};
main();
