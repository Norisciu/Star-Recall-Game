import React from "react";
import "./SelectModeCard.css";

export function SelectModeCard({
    image = "",
    name = "Card name",
    explainer = "Card explainer",
    onClickCallback = f => f
}) {

    return (

        <div
            onClick={onClickCallback}
            className="selectModeCard selectModeCard__playmode"
        >
            <div className="selectModeCard__contents">
                <img
                    className="selectModeCard__icon selectModeCard__icon--feather"
                    src={`${window.location.origin}/icons/${image}`}
                    alt="feather"
                />
                <h4 className="selectModeCard__name">
                    {name}
                </h4>

                <p className="selectModeCard__explainer">
                    {explainer}
                </p>
            </div>
        </div>


    )

}