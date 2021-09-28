import React from "react"
import { gameConstants } from "../../../helpers/gameConstants";

const getClass =  (trialState , selection) => {
    let classes  = ["star-tag"];
    if (trialState === gameConstants.GAME_STATE_MEMORIZE) {
        classes.push( "star-tag-transition");
    }

    if (selection) {
        classes.push("selection")
    }

    return classes.join(" ");
}

export function StarName ({ name , color , toggleCallback , selection , trialState , animationDelay }) {
    const classValue  = getClass(trialState , selection);
    return (
        <div 
            style={{backgroundColor : color , animationDelay: `${animationDelay}s`}} 
            className={classValue}
            onClick= {() => toggleCallback(name)}
        > 
            {name} 
        </div>
    )
}