import React from "react";
import "./GameButton.css"

export function GameButton({ label, onClickCallback = f => f, ...props }) {
    let className = `game-button ${props.className || ""}`;
    return (
        <button
            {...props}
            className={className}
            onClick={onClickCallback} >
            {label}
        </button>
    )
}