import React from "react";
import { SelectModeCard } from "../SelectModeCard/SelectModeCard.jsx";
import { useNavigate } from "react-router";
import { imageNames , playmodes } from "../../../helpers/constants";
import "./SelectPlayModeMenu.css";

export function SelectPlayModeMenu(){
    const navigate =  useNavigate();
    const navigateTo  =  (playmode) => {
        console.log("SelectPlayModeMenu navigate()");
        navigate(`playScreen/${playmode}`);
    }

    return (
        <>
            <h1 className="selectPlayModeMenu__name">Select play mode</h1>
            <div className="play-modes-container"  >
                <SelectModeCard
                    image = {imageNames.COUNTER_IMAGE_NAME}
                    name="Counter"
                    explainer="Play under time pressure"
                    onClickCallback = { () => navigateTo(playmodes.PLAY_MODE_COUNTER) }
                />
                <SelectModeCard 
                    image = {imageNames.FEATHER_IMAGE_NAME}
                    name="Relax"
                    explainer="Play without time" 
                    onClickCallback = { () => navigateTo(playmodes.PLAY_MODE_RELAX) }
                />
            </div>
        </>
    )
}