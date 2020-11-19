import { direct_product_graph } from "./type";

import {direct_product_node, direct_product_edge} from "./type";

export function search_EDA(g: direct_product_graph): boolean {
    let has_same_node_dpn: boolean = false;
    let has_diff_node_dpn: boolean = false;

    g.nodes.forEach((dpn_in_set: direct_product_node) => {
        const dpe_array = g.transitions.get(
            [...g.transitions.keys()].filter(
                dpn => (dpn_in_set.left === dpn.left && dpn_in_set.right === dpn.right)
            )[0]
        );
        
        if(dpe_array != undefined && dpe_array.length >= 1){
            if(dpn_in_set.left == dpn_in_set.right){
                has_same_node_dpn = true;
            }else{
                has_diff_node_dpn = true;
            }
        }
    });

    return has_same_node_dpn && has_diff_node_dpn;
}