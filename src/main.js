"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rerejs_1 = require("rerejs");
var parse2edge = function (pattern, g, s) {
    switch (pattern.type) {
        case "Pattern":
            parse2edge(pattern.child, g, s);
            break;
        case "Sequence":
            pattern.children.forEach(function (child_pattern, index) {
                var next_state;
                if (index == 0) {
                    next_state = { from: s.from, to: g.vertex_num + 1 };
                    parse2edge(child_pattern, g, next_state);
                    g.vertex_num++;
                }
                else if (index == pattern.children.length - 1) {
                    next_state = { from: g.vertex_num, to: s.to };
                    parse2edge(child_pattern, g, next_state);
                }
                else {
                    next_state = { from: g.vertex_num, to: g.vertex_num + 1 };
                    parse2edge(child_pattern, g, next_state);
                    g.vertex_num++;
                }
            });
            break;
        case "Capture":
            break;
        case "Disjunction":
            /*
            output.push({from: num, to: num+1, char: 'ε'});
            output.push({from: num, to: num+2, char: 'ε'});
            output.push({from: num+1, to: num+3, char: pattern.children[0].raw});
            output.push({from: num+2, to: num+4, char: pattern.children[1].raw});
            output.push({from: num+3, to:num+5, char: 'ε'});
            output.push({from: num+4, to:num+5, char: 'ε'});
            */
            break;
        case "Many":
            /*
            const many_from: number = vertex
            parse2edge(pattern.child, g);
            
            output.push({from: num, to: num+1, char: 'ε'})
            output.push({from: num+1, to: num+1, char: pattern.child.raw});
            */
            break;
        case "Char":
            g.edges.push({ from: s.from, to: s.to, char: pattern.raw });
            break;
    }
};
var main = function () {
    /*
    const parser1 = new Parser('a');
    const pattern1 = parser1.parse();

    var out1: Array<edge> = new Array;
    parse2edge(pattern1, out1, 0);
    
    console.log(out1);
    [ { from: 0, to: 1, char: 'a' } ]
    */
    /*
    const parser2 = new Parser('a|b');
    const pattern2 = parser2.parse();

    var out2: Array<edge> = new Array;
    parse2edge(pattern2, out2, 0);

    [
        { from: 0, to: 1, char: 'ε' },
        { from: 0, to: 2, char: 'ε' },
        { from: 1, to: 3, char: 'a' },
        { from: 2, to: 4, char: 'b' },
        { from: 3, to: 5, char: 'ε' },
        { from: 4, to: 5, char: 'ε' }
    ]
    */
    /*
    const parser3 = new Parser('a*');
    const pattern3 = parser3.parse();

    var out3: Array<edge> = new Array;
    parse2edge(pattern3, out3, 0);
    [ { from: 0, to: 0, char: 'a' } ]
    */
    var parser4 = new rerejs_1.Parser('a(aa|bb)*d');
    var pattern4 = parser4.parse();
    var graph4 = {
        vertex_num: 0,
        edges: new Array
    };
    var innial_state = { from: 0, to: 1 };
    parse2edge(pattern4, graph4, innial_state);
    console.log(graph4);
};
main();
