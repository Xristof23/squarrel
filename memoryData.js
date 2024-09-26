// initial states

const initialCardState = [];
const initialGameState = {progress: "game not started yet", cardsOpened: 0, cardsShown: 0, round: 1, score: 0, card0: {id: "a"}, card1: {id: "b"} };

// ASCII Sets
const ABCSet = { setName: "ABCSet", typeOfSet: "ASCII", setList: ["A", "B", "C", "D", "E", "F", "G", "H", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N" ] };
const htmlSet = { setName: "htmlSet", typeOfSet: "ASCII", setList: ["<p>", "<h1>", "<div>", "<ol>", "<li>", "<main>", "<body>", "<form>", "<head>", "<img>"] }



// classic image sets bw
const euAnimals = { setName: "euAnimals", typeOfSet: "img", setList: ["bear", "boar", "crane", "deer", "dog", "eagle", "elk", "fawn", "fox", "hare", "hawk", "lynx", "marten", "mouse", "owl", "racoon", "raven", "squirrel", "wildcat", "wolf"] }

// classic image sets colour
const afrAnimals = {
    setName: "afrAnimals", typeOfSet: "img", setList: [
        "butterfly", "cheetah", "cheetah", "crocodile", "elephant", "gazelle", "gazelle2", "giraffe", "hippo", "hyena", "leopard", "leopard2", "lion", "okapi", "rhino", "shoebill", "snake", "warthog", "warthog2", "zebra", "zebra2" ]}
// AscII sets with two different cards (not yet ready)
const abcDualSetlist = ABCSet.setList.map((letter, index) => {
    const pairObject = {
        half1: letter, half2: letter.toLowerCase()};
    return pairObject;  
      }
)

const abcDualSet = { setName: "abcDualSet", typeOfSet: "ASCIIDual", setList: abcDualSetlist };

//has to be filled
const htmlSpecialSet = { setName: "htmlSpecialSet", typeOfSet: "ASCIIDual", setList: [] };

const allSets = [euAnimals, afrAnimals, ABCSet, abcDualSet, htmlSet ]

export {
    initialCardState, 
    initialGameState,
   ABCSet, 
    htmlSet,
    euAnimals,
    allSets
}