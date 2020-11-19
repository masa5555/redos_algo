import {Edge, SCC_Graph, direct_product_node, direct_product_graph, direct_product_edge} from "./type";
import {scc} from "./scc";


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

    console.log(group_num, group_array);

    // 強連結成分ごとに直積グラフをつくり、判定
    for(let i = 0; i < group_num; i++){
        const dpg1 = new direct_product_graph(g1_graph, g1_graph);
        
        for(let j = 0; j < g1_graph.nodes.size; j++){
            for(let k = 0; k < g1_graph.nodes.size; k++){
                if(i != group_array[j] || i != group_array[k]) continue;

                g1_graph.transitions.get(j)!.forEach((left_e: Edge) => {
                    g1_graph.transitions.get(k)!.forEach((right_e: Edge) => {
                        
                        if(left_e.char == right_e.char){
                            dpg1.transitions.get(
                                [...dpg1.transitions.keys()].filter(
                                    dpn => (dpn.left === j && dpn.right === k)
                                )[0]
                            )!.push(
                                {char: left_e.char, to: {left: left_e.to, right: right_e.to}}
                            );
                        }
                    });
                });
            }
        }
        
        if(i == 0) console.log(dpg1);
        
        // 未実装
        //console.log(searh_EDA(dpg1));
    }
}

main();