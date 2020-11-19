import {Edge, SCC_Graph, direct_product_node, direct_product_graph, direct_product_edge} from "./type";
import {scc} from "./scc";
import {search_EDA} from "./eda";


const main = () => {
    /*
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
    */
    const g1_edges = [
        {from: 0, to: 0, char: 'a'},
        {from: 0, to: 1, char: 'a'},
        {from: 1, to: 0, char: 'a'} 
    ];
    const g1_node_num = 2;
    
    const g1_graph = new SCC_Graph(g1_node_num);
    for(const e of g1_edges){
        g1_graph.transitions.get(e.from)!.push({char: e.char, to: e.to});
    }
    console.log(g1_graph);

    // sccする(頂点のグループ分けをする)
    const [group_num, group_array] = scc(g1_graph);

    // 強連結成分ごとに直積グラフをつくり、判定
    for(let i = 0; i < group_num; i++){
        
        // 各強連結成分に必要なノードのindex配列を渡したい
        const scc_array1 = group_array
            .map((value, index) => {
                if(value==i) return index; 
                else return -1;
            }).filter(value => value >= 0);
        console.log(scc_array1);
        const scc_array2 = scc_array1;

        const dpg = new direct_product_graph(scc_array1, scc_array2, g1_graph, g1_graph);
        
        
        if(i == 0) console.log(dpg);
        console.log("hasEDA =", search_EDA(dpg));
        
        // 未実装
        //console.log(search_IDA(dpg));
    }
}

main();