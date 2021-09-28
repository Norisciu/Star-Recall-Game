import React from "react";
import { StarsList } from "./StarList/StarsList.jsx";
import { GameButton } from "../../GameUI/GameButton/GameButton.jsx";
import { TimeBar } from "./TimeBar/TimeBar.jsx";
import { useParams } from "react-router";
import { PauseMenu } from "./PauseMenu/PauseMenu";
import { usePlayScreenState } from "./Hooks/usePlayScreenState";
import { useGameSessionState } from "./Hooks/useGameSessionState";
import "./playScreen.css";


export function PlayScreen({ }) {

    const { playMode } = useParams();
    const [
        gameState,
        onMemorizeStepTimeout,
        isMemorizeState,
        isEndGame,
        toggleStarName
    ] = useGameSessionState();
    const [
        screenState,
        pauseGame,
        resumeGame,
        isInCounterPlayMode
    ] = usePlayScreenState(playMode);


    return (
        <div className="game-screen game-screen__container">
            <div className="game-screen__header content">
                <span className="play-screen__trials">
                    Trial : {gameState.trial}
                </span>
                <span className="play-screen__points">
                    Points : {gameState.points}
                </span>

            </div>
            <div className="game-screen__main content">
                {isInCounterPlayMode() && <TimeBar
                    timePerQuestion={gameState.timeAvailable}
                    shouldRestart={isMemorizeState()}
                    onTimeout={onMemorizeStepTimeout}
                    someProp={gameState.trialState}
                    isPause={gameState.isPause}

                />
                }
                <p className="game-screen__trial-question">{gameState.trialStatement}</p>

                <div className="play-screen__container ">
                    <StarsList
                        stars={gameState.displayedWords}
                        toggleCallback={toggleStarName}
                        trialState={gameState.trialState}
                    />
                    <div className="play-screen__button-controls">
                        <GameButton
                            className="play-screen__button"

                            label={gameState.buttonLabel}
                            onClickCallback={onMemorizeStepTimeout}
                        />
                        <GameButton
                            className="play-screen__button"
                            label={"Pause"}
                            onClickCallback={pauseGame}
                        />
                    </div>

                </div>

                {screenState.isPause && <PauseMenu onResumeCallback={resumeGame} />}

            </div>
        </div>
    )


}