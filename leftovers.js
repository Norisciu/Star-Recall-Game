    // const computePoints  = words => {
    //     const results  =  { 
    //         matches : 0 , mistakes : 0 , misses: 0
    //     }

    //     words.forEach( { color } => color )

    // }

    // const words =  ["star" , "name" , "other" , "sun" , "moon" , "earth" , "another" , "thing" , "trouble"];





//   const checkWordResult = (word , aDtate) => {
//     let isSelected  =  word.selected;
//     let isIncluded = aDtate.selectedWords.map(e => e.name).includes(word.name);

//     if (isSelected && isIncluded){return {...word , color:"lightgreen"}}
//     else if (isSelected && !isIncluded){ return {...word , color:"crimson"}}
//     else if (!isSelected && isIncluded){return {...word , color:"cadetblue"}}
//     // else {return word}
//     else {return {...word , color:"azure"}}
//     // if (!state.selectedWords.includes(word) && word.selected){
//     //   return {...word , color:"red"}
//     // }
//     // else if (){

//     // }

//   }
  
//   // const [displayedWords , setDisplayedWords]  = useState(entryFromWords( randomWords(4 , words) ));
//   const getNextState  =  (state)=>{
//     const states =  ["MEMORIZE" , "SOLVE", "NEXT_TRIAL"];
//     let idx  = (states.indexOf(state) + 1) % 2;
//     return states[idx];
//   }


  
//   const toggleSelectWord  =  (wordName) => {
//     if(state.trialState != "SOLVE"){return}
//     dispatch({type:"TOGGLE_SELECT_WORD" , wordName: wordName});
//   }


  
//   const reducer  =  (state , action , ...argumeents) => {
//     // console.log("enter the reducer etnnnkoiuyt") MMnnnnnnkoiuy;
//     if (action.type === "NEXT_TRIAL"){
//       console.log("enxt trial");
//       return {...state , trialState : "MEMORIZE" , displayedWords:entryFromWords( randomWords(NUM_OF_WORDS , words) )};
//     }

//     else if (action.type === "NEXT"){
//       let sameWordsNum  =  randomInRange(2,4 );
//       // let sameWordsNum  =  Math.floor(Math.random()*state.numOfWords);
//       let differentWordsNum  = state.numOfWords   -  sameWordsNum;  
//       // Math.floor(Mat)
//       let wordNames  = state.displayedWords.map(word => word.name);
//       let differentWords  = words.filter(word => !wordNames.includes(word));
//       let sameWords  = shuffleArray(wordNames).slice(0,sameWordsNum);
//       let resultListWords =  shuffleArray(differentWords.slice(0,differentWordsNum).concat(sameWords));
      
//       let tempDisplayedWords  = state.displayedWords.slice();
//       return {
//         ...state  , 
//         trialState:getNextState(state.trialState),
//         displayedWords:entryFromWords(resultListWords),
//         selectedWords:tempDisplayedWords
//       }
//     }

//     else if (action.type === "TOGGLE_SELECT_WORD"){
//       console.log("some trouble..");
//       let resultList  = state.displayedWords.map(e => e.name === action.wordName ? {...e , selected:!e.selected} : e);
//       return {...state , displayedWords:resultList};
//       // `toggle ${argumeents}`);
//       // return state;
//     }

//     else if (action.type === "CHECK_ANSWER"){
//       console.log("check answer..");
//       console.log("check the little answer..");
//       let checkResult = state.displayedWords.map(word => checkWordResult(word , state));
//       return {...state , trialState:"NEXT_TRIAL" , displayedWords:checkResult , trial:state.trial+1};
//       // trialState:getNextState(state.trialState)
//     }
//     // return state;
//     // throw new Error("no matching action typevmmnnnnnnnnnjiuymmnnnnnkoiuykjhg ")))))))))));
//   }


//   const [state , dispatch] =  useReducer(reducer , current);

//   const checkAnswer = () => {
//     if (state.trialState === "NEXT_TRIAL"){
//       console.log("make trial..");
//       // dispatch({type:"MEMORIZE"});

//       dispatch({type:"NEXT_TRIAL"})
//     }
//     else {
//       dispatch({type:"CHECK_ANSWER"});
//     }
//     // "checking the provideid answer...");
//     // state);
//     // setDisplayedWords(checkResult);
//   }

  
//   // selectFun={checkWord}
//   // const selectWord  = (word) => {}

//   const nextState  =  (e) => {
//     // "click say")
//     e.preventDefault();
//     dispatch({type:"NEXT"})
//   }

//   if (state.trialState === "MEMORIZE"){
//     return (
//       <div className="App">
//         <div className="container">
//             <p className="problemQuestion">
//               Retain the following list of words
//             </p>
//             <div className="wordsList">
//               {state.displayedWords.map((word , idx) => <WordContainer key={idx} word={word.name} selected={word.selected} color={word.color} toggleSelectWord={toggleSelectWord}/>)}
//             </div>
//             <div className="buttonPlace">
//               <button className="aButton" onClick={nextState}>Next</button>
//             </div>  
//             {/* {undefined} */}
           
//             {/* <p>{state.trialState}</p> */}
//           </div>
//         </div> 
//        )
//   }
//   else {
//     return (
//       <div className="App">
//         <div className="container">
//           <p className="problemQuestion">
//                 Retain the following list of words
//           </p>
//           <div className="wordsList">
//             {state.displayedWords.map((word , idx) => <WordContainer key={idx}  word={word.name} selected={word.selected} color={word.color} toggleSelectWord={toggleSelectWord}/>)}
//           </div>
//           <div className="buttonPlace">
//             <button className="aButton" onClick={checkAnswer}>
//               {state.trialState === "SOLVE" ? "Check answer" : "Next trial"}
//             </button>
//           </div>
//           {/* <p>{state.trialState}</p> */}
//           {/* <p className="">{state.trial}</p> */}

//         </div>
//       </div>
//     )
//   }
  
        

    // </div>
  // );


// PlayScreen 
  // return (
    //     <div className={`${styles.gameScreen} ${styles.container}`}>
    //         <div className={`${styles.header} ${styles.content}`}>
    //             <span className={styles.trials}>Trial : {gameState.trial}</span>
    //             <span className={styles.points}>Points : {gameState.points}</span>

    //         </div>
    //         <div className={styles.mainContent}>
    //             { isCounterPlayMode() && <TimeBar 
    //                 timePerQuestion={TIME_PER_QUESTION} 
    //                 shouldRestart={isMemorizeState()} 
    //                 onTimeout={onMemorizeStepTimeout}
    //                 someProp={gameState.trialState}
    //                 isPause= {gameState.isPause}
    //                 // someProp  =  {gameState.displayedWords}
                    
    //                 />
    //             }
    //             <p className={styles.trialQuestion}>{gameState.trialStatement}</p>
    //             <StarsList trialState={gameState.trialState} stars = {gameState.displayedWords} toggleCallback={toggleStarName}/>
    //             <GameButton 
    //                 label = {gameState.buttonLabel} 
    //                 onClickCallback={onMemorizeStepTimeout}
    //                 // onClickCallback={nextAction}
    //             />
    //             {<button onClick={pauseGame}>Pause</button>}
    //             {gameState.isPause && <PauseMenu onResumeCallback={resumeGame} />}

    //         </div>
    //     </div>
    // )
//------------------