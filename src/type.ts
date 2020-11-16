export type Edge = {
    char: string; // typescriptにchar型がない
    to: number;
}

export class SCC_Graph {
    nodes: Set<number>; // 頂点集合
    transitions: Map<number, Edge[]>; // 辺集合

    constructor(size: number, edge: any){ // とりあえずanyとしている
        this.nodes = new Set<number>();
        this.transitions = new Map<number, Edge[]>();
        for(let i = 0; i < size; i++){
            this.nodes.add(i);
            this.transitions.set(i, []);
        }

        for(const e of edge){
            this.transitions.get(e.from)!.push({char: e.char, to: e.to});
        }
    }
}