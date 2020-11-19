export type Edge = {
    char: string; // typescriptにchar型がない
    to: number;
}

export class SCC_Graph {
    nodes: Set<number>; // 頂点集合
    transitions: Map<number, Edge[]>; // 辺集合

    constructor(nodes_num: number){ // とりあえずanyとしている
        this.nodes = new Set<number>();
        this.transitions = new Map<number, Edge[]>();
        // setで左右ノードを追加すれば、sizeを考えなくていい

        for(let i = 0; i < nodes_num; i++){
            this.nodes.add(i);
            this.transitions.set(i, []);
        }

    }
}

export type direct_product_node = {
    left: number, 
    right: number
}
export type direct_product_edge = {
    char: string;
    to: direct_product_node;
}

export class direct_product_graph {
    nodes: Set<direct_product_node>;
    transitions: Map<direct_product_node, direct_product_edge[]>;

    constructor(g1_scc_array: number[], g2_scc_array: number[], g1: SCC_Graph, g2: SCC_Graph){
        this.nodes = new Set<direct_product_node>();
        this.transitions = new Map<direct_product_node, direct_product_edge[]>();
        
        /*
       for(let i = 0; i < g1.nodes.size; i++){
           for(let j = 0; j < g2.nodes.size; j++){
               this.nodes.add({left: i,right: j});
               this.transitions.set({left: i, right: j}, []);
           }
       }
       */
        g1_scc_array.forEach((n1) => {
            g2_scc_array.forEach((n2) => {
                this.nodes.add({left: n1, right: n2});
                this.transitions.set({left: n1, right: n2}, []);

                g1.transitions.get(n1)!.forEach((left_e: Edge) => {
                    g2.transitions.get(n2)!.forEach((right_e: Edge) => {
                        
                        if(left_e.char == right_e.char){
                            this.transitions.get(
                                [...this.transitions.keys()].filter(
                                    dpn => (dpn.left === n1 && dpn.right === n2)
                                )[0]
                            )!.push(
                                {char: left_e.char, to: {left: left_e.to, right: right_e.to}}
                            );
                            if(!this.transitions.get(
                                [...this.transitions.keys()].filter(
                                    dpn => (dpn.left === n1 && dpn.right === n2)
                                )[0]
                            )) {
                                this.nodes.add({left: left_e.to, right:right_e.to})
                            };
                        }
                    });
                });
            });
        });
    }
}
