import { Parser } from "rerejs";

interface edge {
    from: number;
    to: number;
    char: string; 
}

const parse2edge = (pattern: any, output: Array<edge>, num: number) => {

    switch(pattern.type){
        case "Pattern":
            parse2edge(pattern.child, output, num);
            break;
        case "Char":
            output.push({from: num, to: num+1, char: pattern.raw})
            break;
        case "Disjunction":
            output.push({from: num, to: num+1, char: 'ε'});
            output.push({from: num, to: num+2, char: 'ε'});
            output.push({from: num+1, to: num+3, char: pattern.children[0].raw});
            output.push({from: num+2, to: num+4, char: pattern.children[1].raw});
            output.push({from: num+3, to:num+5, char: 'ε'});
            output.push({from: num+4, to:num+5, char: 'ε'});
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

    var out1: Array<edge> = new Array;
    parse2edge(pattern1, out1, 0);
    
    console.log(out1);
    /*
    [ { from: 0, to: 1, char: 'a' } ]
    */

    const parser2 = new Parser('a|b');
    const pattern2 = parser2.parse();
    //console.log(pattern2.child);

    var out2: Array<edge> = new Array;
    parse2edge(pattern2, out2, 0);
    console.log(out2);

    /*
    
    */

    /*
    const parser3 = new Parser('a+');
    const pattern3 = parser2.parse();
    console.log(pattern3);  
    */
};

main();