// initial states

const initialCardState = [];
const initialGameState = {progress: "game not started yet", cardsOpened: 0, cardsShown: 0, round: 1, score: 0, card0: {id: "a"}, card1: {id: "b"} };

// ASCII Sets
const ABCSet = { setName: "ABCSet", typeOfSet: "ASCII", size: 6, setList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] };
const htmlSet = { setName: "htmlSet", typeOfSet: "ASCII", size: 2.3, setList: ["<p>", "<h1>", "<h2>","<div>", "<section>", "<button>", "<span>","<ul>", "<ol>", "<li>", "<main>", "<body>", "<form>", "<a>",  "<head>", "<img>"] }
const smallNumbersSetlist = [...Array(51).keys()].slice(1);

const smallNumbers = { setName: "smallNumbers", typeOfSet: "ASCII", size: 6, setList: smallNumbersSetlist };


// classic image sets bw
const euAnimals = {
    setName: "euAnimals", typeOfSet: "img", setList: ["bear", "boar", "crane",
        "deer", "dog", "eagle", "elk", "fawn", "fox", "hare", "hawk", "lynx", "marten", "mouse", "owl", "racoon", "raven", "squirrel", "wildcat", "wolf"]
}

const wolfpack = {
    setName: "wolfpack", typeOfSet: "img", setList: ["direwolf", "direwolf3", "direwolf4", "huntingwolves2", "huntingwolves3", "huntingwolves4",
        "lonewolf", "lonewolf2", "lonewolf3", "lonewolf4", "polarwolf2", "polarwolf4", "runningwolves", "runningwolves2", "runningwolves3", "runningwolves4",
    "timberwolf", "timberwolf2", "timberwolf3", "timberwolf4", "werewolf", "werewolf2", "werewolf3", "wolfpack", "wolfpack2", "wolvesfeeding2"] };

// classic image sets colour
const afrAnimals = {
    setName: "afrAnimals", typeOfSet: "img", setList: [
        "butterfly", "cheetah", "cheetah", "crocodile", "elephant", "gazelle", "gazelle2", "giraffe", "hippo", "hyena", "leopard", "leopard2", "lion", "okapi", "rhino", "shoebill", "snake", "warthog", "warthog2", "zebra", "zebra2" ]}

const happy = {
    setName: "happy", typeOfSet: "img", setList: [
        "bees", "bees2", "bees3", "butterflies", "butterflies2", "butterflies3", "cars", "cats", "computer", "computer2", "dogs", "dogs2", "dogs3", "laptops", "laptops4", "owls", "owls2", "people", "people2", "phones", "phones2",  "radios", "radios2" ]}


// AscII sets with two different cards 
const abcDualSetlist = ABCSet.setList.map((letter, index) => {
    const pairObject = {
        half1: letter, half2: letter.toLowerCase()};
    return pairObject;  
      }
)

const abcDualSet = { setName: "abcDualSet", typeOfSet: "ASCIIDual", size: 6, setList: abcDualSetlist };

//(not yet ready) has to be filled
const htmlSpecialSet = { setName: "htmlSpecialSet", typeOfSet: "ASCIIDual", setList: [] };

const allSets = [euAnimals, afrAnimals, happy, ABCSet, abcDualSet, htmlSet, smallNumbers, wolfpack ]

export {
    initialCardState, 
    initialGameState,
   ABCSet, 
    htmlSet,
    euAnimals,
    allSets
}