import { Parser } from "rerejs";

interface edge {
    from: number;
    to: number;
    char: string; 
}

interface state {
    from: number;
    to: number;
}

interface graph {
    vertex_num: number;
    edges: Array<edge>;
}

const parse2edge = (pattern: any, g: graph, s: state): void => {
    var child_size: number;
    
    switch(pattern.type){
        case "Pattern": // rerejsのParser初期フォーマット
            parse2edge(pattern.child, g, s);
            break;

        case "Sequence": // /ccccc/
            child_size = pattern.children.length;
            const new_seq_first: number = g.vertex_num + 1;
            g.vertex_num += child_size-1;

            pattern.children.forEach((child_pattern: any, index: number) => {
                var next_state: state;
                if(index == 0){
                    next_state = {from: s.from, to: new_seq_first};
                }else if(index == pattern.children.length-1){
                    next_state = {from: new_seq_first + (index-1), to: s.to};
                }else{
                    next_state = {from: new_seq_first + (index-1), to: new_seq_first + index};
                }
                parse2edge(child_pattern, g, next_state);
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

                const next_state: state = {
                    from: new_from_i, 
                    to: new_to_i
                };
                parse2edge(child_pattern, g, next_state);
            });
            break;

        case "Many": // /a*/
            // Manyについて、新しく初期状態と受理状態を作る
            const new_from: number = g.vertex_num + 1;
            const new_to: number = g.vertex_num + 2;
            g.vertex_num += 2;

            g.edges.push({from: s.from, to: new_from, char: 'ε'});
            g.edges.push({from: new_to, to: s.to, char: 'ε'});

            //繰り返しの遷移
            g.edges.push({from: new_to, to: new_from, char: 'ε'});

            // 空文字の場合の遷移
            g.edges.push({from: s.from, to: s.to, char: 'ε'});

            const next_state: state = {from: new_from, to: new_to};
            parse2edge(pattern.child, g, next_state);
            break;

        case "Char":
            g.edges.push({from: s.from, to: s.to, char: pattern.raw});
            break;
    }
} 

const graph2gvis = (g: graph): void => {
    console.log("digraph ε-NFA {");
    console.log(" rankdir=\"LR\"");

    g.edges.forEach((e: edge) => {
        console.log(
            ` ${e.from} -> ${e.to} [label="${e.char}"]`
            //" " + e.from + " -> " + e.to + " [label=\"" + e.char + "\"]"
        );
    });

    console.log("}");
};

const main = () => {
    // OK
    const parser1 = new Parser('a(aa|bb)*d');
    const pattern1 = parser1.parse();
    
    var graph1: graph = {
        vertex_num: 1,
        edges: new Array
    };
    const innial_state: state = {from: 0, to: 1};
    parse2edge(pattern1, graph1, innial_state);

    graph2gvis(graph1);

    /*
    digraph DFA {
        rankdir="LR"
        0 -> 2 [label="a"]
        2 -> 4 [label="ε"]
        5 -> 3 [label="ε"]
        5 -> 4 [label="ε"]
        2 -> 3 [label="ε"]
        4 -> 6 [label="ε"]
        8 -> 5 [label="ε"]
        6 -> 10 [label="a"]
        10 -> 8 [label="a"]
        4 -> 7 [label="ε"]
        9 -> 5 [label="ε"]
        7 -> 11 [label="b"]
        11 -> 9 [label="b"]
        3 -> 1 [label="d"]
    }
    */

   const parser2 = new Parser('(a*)*');
   const pattern2 = parser2.parse();
   
   var graph2: graph = {
       vertex_num: 1,
       edges: new Array
   };
   parse2edge(pattern2, graph2, innial_state);

   graph2gvis(graph2);
}

main();