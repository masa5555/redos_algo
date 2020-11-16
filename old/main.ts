import { Parser } from "rerejs";
import {edge, State, Graph} from "./type";
import {scc} from "./scc";

const parse2edge = (pattern: any, g: Graph, s: State): void => {
    let child_size: number;
    let new_from: number;
    let new_to: number;

    switch(pattern.type){
        case "Pattern": // rerejsのParser初期フォーマット
            parse2edge(pattern.child, g, s);
            break;

        case "Sequence": // /ccccc/
            child_size = pattern.children.length;
            const new_seq_first: number = g.vertex_num + 1;
            g.vertex_num += child_size-1;

            pattern.children.forEach((child_pattern: any, index: number) => {
                var next_State: State;
                if(index == 0){
                    next_State = {from: s.from, to: new_seq_first};
                }else if(index == pattern.children.length-1){
                    next_State = {from: new_seq_first + (index-1), to: s.to};
                }else{
                    next_State = {from: new_seq_first + (index-1), to: new_seq_first + index};
                }
                parse2edge(child_pattern, g, next_State);
            });
            break;

        case "Capture": // /(a)/
            parse2edge(pattern.child, g, s);
            break;

        case "Disjunction": // 選択　/a|a/
            child_size = pattern.children.length;
            const new_from_1: number = g.vertex_num + 1;
            const new_to_1: number = g.vertex_num + child_size + 1;
            g.vertex_num += child_size*2;

            pattern.children.forEach((child_pattern: any, index: number) => {
                const new_from_i: number = new_from_1 + index;
                const new_to_i: number = new_to_1 + index;

                // 個々の選択候補について、新しく初期状態と受理状態を作る
                g.edges.push({from: s.from, to: new_from_i, char: 'ε'});
                g.edges.push({from: new_to_i, to: s.to, char: 'ε'});

                const next_State: State = {
                    from: new_from_i, 
                    to: new_to_i
                };
                parse2edge(child_pattern, g, next_State);
            });
            break;

        case "Many": // /a*/
            // Manyについて、新しく初期状態と受理状態を作る
            new_from = g.vertex_num + 1;
            new_to = g.vertex_num + 2;
            g.vertex_num += 2;

            g.edges.push({from: s.from, to: new_from, char: 'ε'});
            g.edges.push({from: new_to, to: s.to, char: 'ε'});

            //繰り返しの遷移
            g.edges.push({from: new_to, to: new_from, char: 'ε'});

            // 空文字の場合の遷移
            g.edges.push({from: s.from, to: s.to, char: 'ε'});

            parse2edge(pattern.child, g, {from: new_from, to: new_to});
            break;

        case "Some": // /a+/
            new_from = g.vertex_num + 1;
            new_to = g.vertex_num + 2;
            g.vertex_num += 2;

            g.edges.push({from: s.from, to: new_from, char: 'ε'});
            g.edges.push({from: new_to, to: s.to, char: 'ε'});

            //繰り返しの遷移
            g.edges.push({from: new_to, to: new_from, char: 'ε'});

            parse2edge(pattern.child, g, {from: new_from, to: new_to});
            break;
        
        case "Dot":
            g.edges.push({from: s.from, to: s.to, char: 'Σ'});
            break;

        case "Class":
            break;

        case "Char":
            g.edges.push({from: s.from, to: s.to, char: pattern.raw});
            break;
    }
} 

const graph2gvis = (g: Graph): void => {
    console.log("digraph εNFA {");
    console.log(" rankdir=\"LR\"");

    g.edges.forEach((e: edge) => {
        console.log(` ${e.from} -> ${e.to} [label="${e.char}"]`);
    });

    console.log("}");
};

const parse_regexp2vis = (exp: string): void => {
    const parser = new Parser(exp);
    const pattern = parser.parse();
    const graph = new Graph();
    const initial_state = new State();
    parse2edge(pattern, graph, initial_state);
    //console.log(graph);
    //graph2gvis(graph);

    console.log(scc(graph));
};

const main = () => {
    // それぞれの頂点からの遷移にidをつける。
    // 新しく変数：頂点ごとの遷移先リスト　を作って、そのリストのサイズで頂点のidをつける

    //parse_regexp2vis('(a*)*');
    /*
    digraph εNFA {
    rankdir="LR"
    0 -> 2 [label="ε"]
    3 -> 1 [label="ε"]
    3 -> 2 [label="ε"]
    0 -> 1 [label="ε"]
    2 -> 4 [label="ε"]
    5 -> 3 [label="ε"]
    5 -> 4 [label="ε"]
    2 -> 3 [label="ε"]
    4 -> 5 [label="a"]
    }

    [ 0, 2, 1, 1, 1, 1 ]
    */

    /*
    const parser3 = new Parser('(a+)+');
    const pattern3 = parser3.parse();
    console.log(pattern3);

    const parser4 = new Parser('aa?..a');
    const pattern4 = parser4.parse();
    console.log(pattern4.child);

    const parser6 = new Parser('[a-z]');
    const pattern6 = parser6.parse();
    console.log(pattern6);
    console.log(pattern6.child);
    */

   parse_regexp2vis('(.*|(a|a)*)');
}

main();
