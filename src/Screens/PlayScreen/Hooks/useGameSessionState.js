import React, { useEffect, useState } from "react";
import { gameConstants } from "../../../helpers/gameConstants";
import { initWords } from "../../../helpers/utils";
import words from "../../../starNamesData/starNames";
import { randomInRange, shuffleArray, entryFromWords, clamp } from "../../../helpers/utils";
import { TIME_PER_QUESTION } from "../../../helpers/constants";
import { useNavigate } from "react-router";

const initState = {
    selectedWords: [],
    namesToMemorize: [],
    namesForRecall: [],

    trial: 1,
    trialState: gameConstants.GAME_STATE_MEMORIZE,
    numOfWords: gameConstants.NUM_OF_WORDS,
    displayedWords: [],
    trialStatement: "Memorize these star names",
    buttonLabel: "Next",

    points: 0,

    trialStatement: "Memorize these star names",
    timeAvailable: TIME_PER_QUESTION,

}

// hook usd for keeping track of state in the current playing session
export const useGameSessionState = () => {
    const [gameState, setGameState] = useState(initState);
    const navigation = useNavigate();


    useEffect(() => {
        console.log("PlayScreen() useEffect([]) init words");
        initGame();
    }, [])

    const initGame = () => {
        console.log("PlayScreen initGame()");
        const words = initWords();
        const trialTimeAvailable = getAvailableTime(initState.numOfWords);

        setGameState({
            ...initState,
            timeAvailable: trialTimeAvailable,
            displayedWords: words
        });
    }

    const nextState = () => {
        console.log("PlayScreen() nextState");
        // console.log(gameState);

        const { trialState } = gameState;
        const gameStates = gameConstants.GAME_STATES_ORDER;
        let stateIdx = gameStates.indexOf(trialState);
        let nextIdx = (stateIdx + 1) % gameStates.length;
        return gameStates[nextIdx];
    }

    const nextAction = () => {
        console.log("nextAction()");
        console.log(gameState);
        if (isEndGame()) {
            navigation(`/EndGame/${gameState.points}`);
        }
        let state = nextState();
        let stateToActionMap = new Map([
            [gameConstants.GAME_STATE_MEMORIZE, onMemorize],
            [gameConstants.GAME_STATE_RECALL, onRecall],
            [gameConstants.GAME_STATE_CHECK_ANSWER, onCheckAnswer]

        ]);

        const actionCallback = stateToActionMap.get(state)
        return actionCallback();
    }

    const onMemorize = () => {
        let words = initWords();
        let wordNames = words.map(word => word.name);
        setGameState({
            ...gameState,
            trialStatement: "Memorize these words",
            trialState: gameConstants.GAME_STATE_MEMORIZE,
            displayedWords: initWords(gameState.numOfWords),
            namesToMemorize: wordNames,
        });
    }

    const onRecall = () => {
        console.log("onRecall()");

        let resultListWords = buildListOfWordsForRecallState();
        let wordNames = gameState.displayedWords.map(word => word.name);

        setGameState({
            ...gameState,
            trialStatement: "Recall the words you memorize (not all words will appear)",

            trialState: gameConstants.GAME_STATE_RECALL,
            displayedWords: entryFromWords(resultListWords),
            namesToMemorize: wordNames,
            namesForRecall: resultListWords
        })
    }

    const buildListOfWordsForRecallState = () => {
        let sameWordsNum = randomInRange(2, 4);
        let differentWordsNum = gameState.numOfWords - sameWordsNum;
        let wordNames = gameState.displayedWords.map(word => word.name);
        let differentWords = removeWordsFromList(words, wordNames);
        let sameWords = wordNames.slice(0, sameWordsNum);
        let resultListWords = shuffleArray(differentWords.slice(0, differentWordsNum).concat(sameWords));

        return resultListWords;
    }


    const removeWordsFromList = (wordList, wordsToRemove) => wordList.filter(word => !wordsToRemove.includes(word))

    const onCheckAnswer = () => {
        let { namesToMemorize } = gameState;
        let checkResult = gameState.displayedWords.map(word => checkWord(word, namesToMemorize));
        let results = getResults(checkResult);
        let nextNumberOfStars = adjustNumberOfStars(checkResult, gameState.numOfWords);
        let nextTrialTimeAvailable = getAvailableTime(nextNumberOfStars);
        let trialPoints = computePoints(results);

        setGameState({
            ...gameState,
            trialState: "NEXT_TRIAL",
            displayedWords: checkResult,
            trial: gameState.trial + 1,
            numOfWords: nextNumberOfStars,
            points: gameState.points + trialPoints,
            timeAvailable: nextTrialTimeAvailable
        });
    }

    const checkWord = (word, wordsToMemorize) => {
        const isWordSelection = word.selection;
        const isWordToMemorize = wordsToMemorize.includes(word.name);
        if (isWordSelection && isWordToMemorize) {
            return { ...word, color: gameConstants.WORD_COLOR_MATCH }
        }

        else if (isWordSelection && !isWordToMemorize) {
            return { ...word, color: gameConstants.WORD_COLOR_MISTAKE }
        }

        else if (!isWordSelection && isWordToMemorize) {
            return { ...word, color: gameConstants.WORD_COLOR_MISS }
        }

        else {
            return { ...word, color: gameConstants.WORD_COLOR_NEUTRAL }
        }
    }

    const adjustNumberOfStars = (checkResults, starNamesCount) => {
        let results = {
            misses: 0, matches: 0, mistakes: 0
        }

        checkResults.forEach(word => {
            if (word.color === gameConstants.WORD_COLOR_MISS) {
                results.misses++;
            }

            else if (word.color === gameConstants.WORD_COLOR_MATCH) {
                results.matches++;
            }

            else if (word.color === gameConstants.WORD_COLOR_MISTAKE) {
                results.misses++;
            }


        })

        let modifier = [-1, 0, 1][Math.max(1 - results.misses, -1) + 1];
        return clamp(
            gameConstants.LOW_WORDS,
            starNamesCount + modifier,
            gameConstants.HIGH_WORDS
        );

    }

    const onMemorizeStepTimeout = () => nextAction();

    const getAvailableTime = (starsCount) => {

        starsCount = clamp(
            gameConstants.LOW_WORDS,
            starsCount,
            gameConstants.HIGH_WORDS
        )
        return gameConstants.starToSecondsAssoc
                .find(([stars, _]) => starsCount >= stars)[1];
    }

    const getResults = words => {
        let results = {
            misses: 0, matches: 0, mistakes: 0
        }

        words.forEach(word => {
            if (word.color === gameConstants.WORD_COLOR_MISS) {
                results.misses++;
            }

            else if (word.color === gameConstants.WORD_COLOR_MATCH) {
                results.matches++;
            }

            else if (word.color === gameConstants.WORD_COLOR_MISTAKE) {
                results.misses++;
            }
        })

        return results;
    }

    const computePoints = ({ misses, matches, mistakes }) => {
        const points = matches * 100 - (mistakes * 10) - misses * 5;
        return Math.max(0, points);
    }

    const toggleStarSelection = name => {
        if (gameState.trialState != gameConstants.GAME_STATE_RECALL) {
            return;
        }

        const resultList = gameState.displayedWords.map(star => star.name === name ? toggleStar(star) : star);
        setGameState({ ...gameState, displayedWords: resultList });
    }

    const toggleStar = star => ({ ...star, selection: !star.selection })
    const isMemorizeState = () => gameState.trialState === gameConstants.GAME_STATE_MEMORIZE;

    const isEndGame = () => gameState.trial > gameConstants.GAME_TRIALS;

    return [
        gameState,
        onMemorizeStepTimeout,
        isMemorizeState,
        isEndGame,
        toggleStarSelection
    ];
}