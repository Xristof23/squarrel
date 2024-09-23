// initial states

const initialCardState = [];
const initialGameState = {progress: "game not started yet", openCardsBeforeClick: 0, cardsShown: 0, round: 1, score: 0, card0: {id: "a"}, card1: {id: "b"} };

// ASCII Sets
const ABCSet = { setName: "ABCSet", typeOfSet: "ASCII", setList: ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H"] };
const htmlSet = { setName: "htmlSet", typeOfSet: "ASCII", setList: ["<p>", "<h1>", "<div>", "<ol>", "<li>", "<main>", "<body>", "<form>", "<head>", "<img>"] }



// classic image sets bw
const euAnimals = { setName: "euAnimals", typeOfSet: "img", setList: ["bear", "boar", "deer", "fox", "hare", "hawk", "lynx", "mouse", "owl", "squirrel", "wolf"] }

// AscII sets with two different cards (not yet ready)
const abcDualSet = { setName: "abcDualSet", typeOfSet: "ASCII", setList: [{ pairNo: 1, half0: "a", half1: "A" }, "C", "D", "E", "F", "G", "H"] };

const htmlSpecialSet = { setName: "htmlSpecialSet", typeOfSet: "ASCII", setList: [{ pairNo: 1, half0: "a", half1: "A" }, "C","D", "E", "F", "G", "H"] };


export {
    initialCardState, 
    initialGameState,
   ABCSet, 
    htmlSet,
    euAnimals
}