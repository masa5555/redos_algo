import {Edge, SCC_Graph} from "./type";
import {scc} from "./scc";

//type DirectProduct = [number, number];

/*
class direct_product_graph {
    node: Set<>
}
*/

/*
function product_tyokuseki_graph(G1: graph, G2: graph){
    // 抽象的Graph =>
    return new_G, mapi; // 直積グラフとmapi = {{id, 頂点のpair}, ...}
}
*/

const main = () => {
    const g1_v_size = 14;
    const g1_edges = [
        { from: 0, to: 2, char: 'ε' },
        { from: 4, to: 1, char: 'ε' },
        { from: 2, to: 6, char: 'ε' },
        { from: 7, to: 4, char: 'ε' },
        { from: 7, to: 6, char: 'ε' },
        { from: 2, to: 4, char: 'ε' },
        { from: 6, to: 7, char: 'Σ' },
        { from: 0, to: 3, char: 'ε' },
        { from: 5, to: 1, char: 'ε' },
        { from: 3, to: 8, char: 'ε' },
        { from: 9, to: 5, char: 'ε' },
        { from: 9, to: 8, char: 'ε' },
        { from: 3, to: 5, char: 'ε' },
        { from: 8, to: 10, char: 'ε' },
        { from: 12, to: 9, char: 'ε' },
        { from: 10, to: 12, char: 'a' },
        { from: 8, to: 11, char: 'ε' },
        { from: 13, to: 9, char: 'ε' },
        { from: 11, to: 13, char: 'a' }
    ];

    const graph = new SCC_Graph(g1_v_size, g1_edges);
    console.log(graph);

    // sccする(頂点のグループ分けをする)
    const [group_num, group_array] = scc(graph);

    console.log(group_num, group_array);

    // 強連結成分ごとに直積グラフをつくる
    for(let i = 0; i < group_num; i++){
        
    }

        // それぞれにEDAがあるか調べる　=> ありなし出力
}

main();