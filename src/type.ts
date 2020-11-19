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

    constructor(g1: SCC_Graph, g2: SCC_Graph){
        this.nodes = new Set<direct_product_node>();
        this.transitions = new Map<direct_product_node, direct_product_edge[]>();

       for(let i = 0; i < g1.nodes.size; i++){
           for(let j = 0; j < g2.nodes.size; j++){
               this.nodes.add({left: i,right: j});
               this.transitions.set({left: i, right: j}, []);
           }
       }
    }
}
