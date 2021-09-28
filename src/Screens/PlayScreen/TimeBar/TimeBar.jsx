import { useEffect, useRef, useState } from "react";
import { useOnTimeoutCallback } from "./useOnTimeoutCallback";
import { TIME_PER_QUESTION } from "../../../helpers/constants";
import { gameConstants } from "../../../helpers/gameConstants";
import "./TimeBar.css";

export function TimeBar({
    timePerQuestion = TIME_PER_QUESTION ,  
    shouldRestart,
    onTimeout,
    someProp,
    isPause
}){

    let [timeBarWidth , setTimeBarWidth] = useState(timePerQuestion);
    const timerRef  = useRef();
    const lastUpdateTime =   useRef(0);
    const animStartTime  = useRef();
    const isRunning  = useRef(false);
    const onTimeoutCallbackRef = useOnTimeoutCallback(onTimeout);
    const timeSinceAnimationStart = useRef(0);
    

    useEffect(() => { start(); } , []);
    useEffect(() => () => stop() , []);

    useEffect(() => {
        if (isPause)  { return stop(); }
        return resume();
    } , [isPause])

    useEffect(() => {
        if (someProp === gameConstants.GAME_STATE_RECALL) {
            stop();
        }
    }  , [someProp])

    useEffect(() => {
        if (!shouldRestart) { return; }

        start(); 
    }, [shouldRestart]);


    const start =  () => {
        console.log("TimerBar start()");
        lastUpdateTime.current  = performance.now();
        timeSinceAnimationStart.current =  0;
        isRunning.current = true;
        timerRef.current =  requestAnimationFrame(decrementTimerBarUpdate);
    }

    const stop  =  () => {
        console.log("TimerBar stop()");
        isRunning.current = false;
        cancelAnimationFrame(timerRef.current);
    }

    const resume = () => {
        console.log("TimeBar resume()");
        isRunning.current = true;
        lastUpdateTime.current =  performance.now();
        timerRef.current  = requestAnimationFrame(decrementTimerBarUpdate);

    }

    const decrementTimerBarUpdate  =  currentTime => {

        if (!isRunning.current) { return; }

        let delta  = currentTime - lastUpdateTime.current;
        lastUpdateTime.current  =  currentTime;
        timeSinceAnimationStart.current += delta;
        let timePerQuestionMs  = timePerQuestion * 1000;
        let completionPercent  =  (timeSinceAnimationStart.current  / timePerQuestionMs) * 100;
        setTimeBarWidth(100 - completionPercent);

        if (completionPercent >= 100){
            setTimeBarWidth(0);
            stop();

            onTimeoutCallbackRef.current();
            return;
        }

        timerRef.current  = requestAnimationFrame(decrementTimerBarUpdate);

    }

    const decrementTimerBar =  (currentTime) => {
        console.log("TimeBar decrementTimerBar()");
        if (!isRunning.current) { return; }
     
        lastUpdateTime.current  = currentTime;
        let timeSinceAnimationStart  =  currentTime  - animStartTime.current;
        let timePerQuestionMs  = timePerQuestion * 1000;
        let completionPercent =  (timeSinceAnimationStart / timePerQuestionMs) *100;

        setTimeBarWidth(100 - completionPercent);
        if (completionPercent >= 100){
            setTimeBarWidth(0);
            stop();
            onTimeoutCallbackRef.current();
            return;
        }

        timerRef.current  = requestAnimationFrame(decrementTimerBar);
    }

    const debugOnTimeout  =  () => {
        if (isRunning.current) { return stop(); }
        resume();
    }

    return (
        <div className={"timeBar__timebar"} onClick ={debugOnTimeout} >
            <div  className={"timeBar__fill"} style={{width: `${timeBarWidth}%`}}></div> 
        </div>
    )

}
