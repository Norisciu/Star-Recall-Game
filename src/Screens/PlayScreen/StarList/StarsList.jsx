import React from "react"
import { StarName } from "./StarName";

export function StarsList({ stars, toggleCallback, trialState }) {
    let contents = stars.map((star, idx) => {
        const animDelay = ((1 / (19 * 2)) * idx)
        return (
            <StarName
                {...star}
                toggleCallback={toggleCallback}
                trialState={trialState}
                animationDelay={animDelay} />
        )
    });
    return (
        <div className="stars-container">
            {contents}
        </div>
    )
}
