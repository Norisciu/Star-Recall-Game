import { useState } from "react";
import { playmodes } from "../../../helpers/constants";

const initPlayScreenState = {
    isPause: false,
    playMode: null
}


// custom hook for keeping track of "screen state" 
// things like wether the screen is on pause/resume mode or the play mode (with/without counter)

export const usePlayScreenState = (playMode) => {
    const [gameConfig, setGameConfig] = useState({
        ...initPlayScreenState,
        playMode: playMode
    });

    const setPause = (pauseValue) => setGameConfig({
        ...gameConfig,
        isPause: pauseValue
    });

    const isInCounterPlayMode = () => gameConfig.playMode === playmodes.PLAY_MODE_COUNTER;

    const pauseGame = () => setGameConfig({
        ...gameConfig,
        isPause: true
    });

    const resumeGame = () => setGameConfig({
        ...gameConfig,
        isPause: false
    });


    return [gameConfig, pauseGame, resumeGame, isInCounterPlayMode ];
}



