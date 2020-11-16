export interface edge {
    from: number;
    to: number;
    char: string; 
    //id: number;
}

export class State {
    from: number;
    to: number;

    constructor(){
        this.from = 0;
        this.to = 1;
    }
}

export class Graph {
    vertex_num: number;
    edges: Array<edge>;

    constructor(){
        this.vertex_num = 1;
        this.edges = new Array<edge>();
    }
}