export const gameConstants  =  (() => {
    const GAME_STATE_MEMORIZE = "GAME_STATE_MEMORIZE";
    const GAME_STATE_RECALL = "GAME_STATE_RECALL";
    const GAME_STATE_CHECK_ANSWER  =  "GAME_STATE_CHECK_ANSWER";
    const NUM_OF_WORDS = 4;
    const GAME_STATES_ORDER  =  [
        GAME_STATE_MEMORIZE , 
        GAME_STATE_RECALL , 
        GAME_STATE_CHECK_ANSWER
    ];

    const WORD_COLOR_MATCH  = "lightgreen";
    const WORD_COLOR_MISS  = "cadetblue";
    const WORD_COLOR_MISTAKE  = "crimson";
    const WORD_COLOR_NEUTRAL =  "azure";

    const LOW_WORDS  = 4;
    const HIGH_WORDS  = 19;

    const START_SCREEN_STARS_COUNT = 50;
    let starToSecondsAssoc  = [ 
        [4 , 30] , [9 , 45] , [12 , 70] , [15 , 120] , [19 , 200]
    ].reverse()
    

    return {
        GAME_STATE_MEMORIZE : GAME_STATE_MEMORIZE,
        GAME_STATE_RECALL : GAME_STATE_RECALL,
        GAME_STATE_CHECK_ANSWER : GAME_STATE_CHECK_ANSWER,
        NUM_OF_WORDS : NUM_OF_WORDS,
        GAME_STATES_ORDER : GAME_STATES_ORDER,
        WORD_COLOR_MATCH : WORD_COLOR_MATCH,
        WORD_COLOR_MISS : WORD_COLOR_MISS,
        WORD_COLOR_MISTAKE : WORD_COLOR_MISTAKE,
        WORD_COLOR_NEUTRAL : WORD_COLOR_NEUTRAL,
        LOW_WORDS : LOW_WORDS,
        HIGH_WORDS : HIGH_WORDS,
        START_SCREEN_STARS_COUNT : START_SCREEN_STARS_COUNT,
        GAME_TRIALS : 2,
        starToSecondsAssoc : starToSecondsAssoc
        
    }
})();

