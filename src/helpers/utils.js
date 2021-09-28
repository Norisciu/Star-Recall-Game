import words from "../starNamesData/starNames";
import { gameConstants } from "./gameConstants";
import { Star } from "../Screens/StartScreen/Star/Star.jsx";

const constructEntry = word => ({
    name: word,
    selection: false,
    color: "azure"
});

export const shuffleArray = (arr) => {
    let array = arr.slice();
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const randomWords = (numWords, words) => {
    return shuffleArray(words).slice(0, numWords);
}

export const entryFromWords = (words) => {
    return words.map(constructEntry);
}

export const initWords = (wordsCount = gameConstants.NUM_OF_WORDS) => entryFromWords(randomWords(wordsCount, words));


export const randomInRange = (begin, end) => {
    if (begin > end) { return randomInRange(end, begin) }
    let difference = Math.abs(begin - end);
    return begin + 1 + Math.floor(Math.random() * difference);
}

export const clamp = (low, value, high) => {
    if (value >= high) { return high; }
    if (value <= low) { return low; }
    return value;
}

// function usd for placing stars randomly across the screen
export const placeStars = starsCount => {
    let starStyles = [];
    for (let k = 0; k < starsCount; k++) {
        const randomLeft = randomInRange(0, 100);
        const randomTop = randomInRange(0, 100);
        const randomDelay = Math.random() * 3;
        let starStyle = {
            left: randomLeft,
            top: randomTop,
            delay: randomDelay
        };
        starStyles.push(starStyle);
    }

    return starStyles.map(({ left, top, delay }) => {
        let starPosition = {
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${delay}s`
        }

        return <Star style={starPosition} />
    });
}