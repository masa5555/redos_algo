import {edge, Graph} from "./type";

function dfs(g1: Array<number[]>, order: number[], visited: boolean[], v: number): void {
    visited[v] = true;
    g1[v].forEach((next_v: number) => {
        if(!visited[next_v])
            dfs(g1, order, visited, next_v);
    });
    order.push(v);
}

function rdfs(g2: Array<number[]>, ret: number[], visited: boolean[], v: number, cur: number): void {
    visited[v] = true;
    ret[v] = cur;

    g2[v].forEach((next_v: number) => {
        if(!visited[next_v])
            rdfs(g2, ret, visited, next_v, cur);
    });
}

export function scc(g: Graph): Array<number> {
    // 頂点数
    const v_sum: number = g.vertex_num + 1;

    // 頂点ごとのグループ番号を返す配列
    const ret: number[] = new Array(v_sum).fill(-1);

    // フラグ配列
    const visited: boolean[] = new Array(v_sum).fill(false);

    // 順方向と逆方向のグラフを構成
    var g1: Array<Array<number>> = Array.from(new Array(v_sum), () => []);
    var g2: Array<Array<number>> =  Array.from(new Array(v_sum), () => []);

    g.edges.forEach((e: edge) => {
        g1[e.from].push(e.to);
        g2[e.to].push(e.from);
    });

    // DFSの帰りがけ順を格納する
    var order: number[] = new Array();
    
    // 一回目のDFS
    for(var v: number = 0; v < v_sum; v++){
        if(!visited[v]) 
            dfs(g1, order, visited, v);
    }

    // ２回めのDFS
    visited.fill(false);

    var cur: number = 0;
    for(var v: number = v_sum-1; v >= 0; v--){
        if(!visited[order[v]]){
            rdfs(g2, ret, visited, order[v], cur++);
        }
    }
    
    return ret;
}