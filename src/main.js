"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rerejs_1 = require("rerejs");
var parse2edge = function (pattern, g, s) {
    var child_size;
    switch (pattern.type) {
        case "Pattern":
            parse2edge(pattern.child, g, s);
            break;
        case "Sequence":
            child_size = pattern.children.length;
            var new_seq_first_1 = g.vertex_num + 1;
            g.vertex_num += child_size - 1;
            pattern.children.forEach(function (child_pattern, index) {
                var next_state;
                if (index == 0) {
                    next_state = { from: s.from, to: new_seq_first_1 };
                }
                else if (index == pattern.children.length - 1) {
                    next_state = { from: new_seq_first_1 + (index - 1), to: s.to };
                }
                else {
                    next_state = { from: new_seq_first_1 + (index - 1), to: new_seq_first_1 + index };
                }
                parse2edge(child_pattern, g, next_state);
            });
            break;
        case "Capture":
            parse2edge(pattern.child, g, s);
            break;
        case "Disjunction":
            child_size = pattern.children.length;
            var new_from_1_1 = g.vertex_num + 1;
            var new_to_1_1 = g.vertex_num + child_size + 1;
            g.vertex_num += child_size * 2;
            pattern.children.forEach(function (child_pattern, index) {
                var new_from_i = new_from_1_1 + index;
                var new_to_i = new_to_1_1 + index;
                // 個々の選択候補について、新しく初期状態と受理状態を作る
                g.edges.push({ from: s.from, to: new_from_i, char: 'ε' });
                g.edges.push({ from: new_to_i, to: s.to, char: 'ε' });
                var next_state = {
                    from: new_from_i,
                    to: new_to_i
                };
                parse2edge(child_pattern, g, next_state);
            });
            break;
        case "Many":
            console.log(s);
            // Manyについて、新しく初期状態と受理状態を作る
            var new_from = g.vertex_num + 1;
            var new_to = g.vertex_num + 2;
            g.vertex_num += 2;
            g.edges.push({ from: s.from, to: new_from, char: 'ε' });
            g.edges.push({ from: new_to, to: s.to, char: 'ε' });
            //繰り返しの遷移
            g.edges.push({ from: new_to, to: new_from, char: 'ε' });
            // 空文字の場合の遷移
            g.edges.push({ from: s.from, to: s.to, char: 'ε' });
            var next_state = { from: new_from, to: new_to };
            parse2edge(pattern.child, g, next_state);
            break;
        case "Char":
            g.edges.push({ from: s.from, to: s.to, char: pattern.raw });
            break;
    }
};
var graph2gvis = function (g) {
    console.log("digraph DFA {\n" +
        " rankdir=\"LR\"");
    g.edges.forEach(function (e) {
        console.log(" " + e.from + " -> " + e.to + " [label=\"" + e.char + "\"]");
    });
    console.log("}\n");
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
        vertex_num: 1,
        edges: new Array
    };
    var innial_state = { from: 0, to: 1 };
    parse2edge(pattern4, graph4, innial_state);
    graph2gvis(graph4);
};
main();
