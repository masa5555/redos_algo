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
} 


const main = () => {
    const parser1 = new Parser('a');
    const pattern1 = parser1.parse();

    //console.log(pattern1);
    
    parse2edge(pattern1);

    console.log(out);
    /*
    出力：[ { from: 0, to: 1, char: 'a' } ]
    */

    /*
    const parser2 = new Parser('(a|b)');
    const pattern2 = parser2.parse();
    console.log(pattern2);

    const parser3 = new Parser('a+');
    const pattern3 = parser2.parse();
    console.log(pattern3);  
    */
};

main();