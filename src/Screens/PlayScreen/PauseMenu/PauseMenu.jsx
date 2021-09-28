import React from "react"
import { useNavigate } from "react-router";
import "./PauseMenu.css";

export function PauseMenu({onResumeCallback}){
    const navigate  = useNavigate();
    const toMainMenu   = () => navigate("/");
  
    return (
        <div className={"pauseMenu__wrapper"}>
            <div className={"pauseMenu__menu"}>
                <h2 className={"pauseMenu__header"}>Pause menu</h2>
                <button 
                    className={`${"pauseMenu__row"} ${"pauseMenu__button"} `} 
                    onClick={onResumeCallback}>
                        Resume
                </button>
                <button 
                    className={`${"pauseMenu__row"} ${"pauseMenu__button"}`}
                    onClick={toMainMenu}>
                    Main menu
                </button>
            </div>
        </div>
    )
}