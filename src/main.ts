import { Parser } from "rerejs";

interface edge {
    from: number;
    to: number;
    char: string; 
}

var out: Array<edge> = new Array;

const parse2edge = (pattern: any) => {

    switch(pattern.type){
        case "Pattern":
            parse2edge(pattern.child);
            break;
        case "Char":
            out.push({from: pattern.range[0], to: pattern.range[1], char: pattern.raw})
            break;
        /*
        case "Seqence":
            console.log("Seqence");
            break;
        */
    }

    //return {from: 0, to: 1, char: 'a'};
} 


const main = () => {
    const parser1 = new Parser('a');
    const pattern1 = parser1.parse();

    console.log(pattern1);
    console.log(pattern1.child.range);
    
    parse2edge(pattern1);

    console.log(out);

    /*
    const parser2 = new Parser('(a|b)');
    const pattern2 = parser2.parse();
    console.log(pattern2);

    const parser3 = new Parser('a+');
    const pattern3 = parser2.parse();
    console.log(pattern3);  
    */

    // 出力
    /*
    console.log(
        "digraph DFA {\n" +
        " ra"
    );
    */
};

main();