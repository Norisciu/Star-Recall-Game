import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import "./EndGameScreen.css";

export function EndGameScreen(){
    
    const navigation  = useNavigate();
    const { points }  = useParams();

    const toPlayScreen  =  () => navigation(-1);
    const toMainMenu  =  () => navigation("/");


    return  (
        <div className={"endGameScreen__container"}>
            <h2 className={"endGameScreen__header"}>
                { `Well done ! You've got ${points} points`}
            </h2>
            <button className={"endGameScreen__button"} onClick={toPlayScreen}>
                Play again
            </button>
            <button className={"endGameScreen__button"} onClick={toMainMenu}>
                Main menu
            </button>
        </div>
    )
}