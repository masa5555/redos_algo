import {Edge, SCC_Graph} from "./type";

function dfs(g1: SCC_Graph, order: number[], visited: boolean[], v: number): void {
    visited[v] = true;
    g1.transitions.get(v)!.forEach((edge: Edge) => {
        if(!visited[edge.to]){
            dfs(g1, order, visited, edge.to);
        }
    });
    order.push(v);
}

function rdfs(g2: SCC_Graph, scc_array: number[], visited: boolean[], v: number, comp_num: number): void {
    visited[v] = true;
    scc_array[v] = comp_num;

    g2.transitions.get(v)!.forEach((edge: Edge) => {
        if(!visited[edge.to]){
            rdfs(g2, scc_array, visited, edge.to, comp_num);
        }
    });
}

export function scc(g: SCC_Graph): [number, number[]] {
    // nodeのグループ分けを返す
    const scc_array: number[] = new Array(g.nodes.size).fill(-1);

    const visited: boolean[] = new Array(g.nodes.size).fill(false);

    // 逆方向のグラフを構成
    let rg: SCC_Graph = new SCC_Graph(g.nodes.size, []);
    for(let v = 0; v < g.nodes.size; v++){
        console.log(g.transitions.get(v)!);
        g.transitions.get(v)!.forEach((e) =>{
            rg.transitions.get(e.to)!.push({char: e.char, to: v});
        });
    }

    console.log(rg);

    // DFSの帰りがけ順格納
    let order: number[] = [];

    // 1回目のDFS
    for(let v = 0; v < g.nodes.size; v++){
        if(!visited[v]){
            dfs(g, order, visited, v);
        }
    }

    // 2回目のDFS
    visited.fill(false);
    let comp_size: number = 0;
    for(let v = g.nodes.size-1; v >= 0; v--){
        if(!visited[order[v]]){
            rdfs(rg, scc_array, visited, order[v], comp_size++);
        }
    }

    return [comp_size, scc_array];
}