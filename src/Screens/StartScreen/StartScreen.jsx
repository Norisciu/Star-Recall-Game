import React, {  useRef, useState } from "react";
import { GameButton } from "../../GameUI/GameButton/GameButton.jsx";
import { SelectPlayModeMenu } from "./SelectPlayModeMenu/SelectPlayModeMenu.jsx";
import { placeStars } from "../../helpers/utils";
import { 
    START_SCREEN_VIEW_PLAY, 
    START_SCREEN_VIEW_SELECT, 
    START_SCREEN_STARS_COUNT 
} from "../../helpers/constants";

import "./StartScreen.css";




export function StartScreen() {
    const [screen, setScreen] = useState(START_SCREEN_VIEW_PLAY);
    const stars = useRef(placeStars(START_SCREEN_STARS_COUNT));

    return (
        <div className="game-screen game-screen--start">
            {stars.current}
            {screen === START_SCREEN_VIEW_SELECT ?
                <SelectPlayModeMenu /> :
                <>
                    <h1> Stars recall</h1>
                    <GameButton
                        onClickCallback={() => {
                            console.log("play button click");
                            setScreen(START_SCREEN_VIEW_SELECT)
                        }}
                        label="Play"
                        className="game-button--play" />
                </>
            }
        </div>
    )

}