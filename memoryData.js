
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
        "butterfly", "cheetah", "cheetah2", "crocodile", "elephant", "gazelle", "gazelle2", "giraffe", "hippo", "hyena", "leopard", "leopard2", "lion", "okapi", "rhino", "shoebill", "snake", "warthog", "warthog2", "zebra", "zebra2" ]}

const happy = {
    setName: "happy", typeOfSet: "img", setList: [
        "bees", "bees2", "bees3", "butterflies", "butterflies2", "butterflies3", "cars", "cats", "computer", "computer2", "dogs", "dogs2", "dogs3", "laptops", "laptops4", "owls", "owls2", "people", "people2", "phones", "phones2",  "radios", "radios2" ]}

const darkrpg = {
    setName: "darkrpg", typeOfSet: "img", setList: [
        "barbarian", "barbarian2", "druid", "druid2", "fighterHood", "femalepriest", "femalepriest2", "femalepriest3", "fencerf", "greymage", "greymage2",
        "greymage3", "greymagef", "greymagef2", "greymagef3", "greymagef4", "knight", "knight2", "knight3", "magerogue", "redmage", "redmage2", "redmage3",
        "rogue", "rogue2", "rogue3", "rogue4", "roguef", "roguef2", "roguef3", "sellsword", "sellswordf","swordfighter"]
}

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

// initial states
const initialCardState = [];
const initialGameState = { running: false, gameWon: false, gameTime: 0, cardsShown: 0, card0: { id: "a" }, card1: { id: "b" } };
const initialOptions = {
    gameMode: "memory", numberOfPlayers: 1, nameOfPlayer1: "Squarrel", nameOfPlayer2: "Squirrel", nameOfPlayer3: "Square", cardRows: 4, cardColumns: 4, delayTime: 2000, shuffle: true,
    cardSet: euAnimals, typeOfSet: "img", size: 6
};

const allSets = [euAnimals, afrAnimals, happy, ABCSet, abcDualSet, htmlSet, smallNumbers, wolfpack, darkrpg ]

export {
    initialCardState, 
    initialGameState,
    initialOptions,
   ABCSet, 
    htmlSet,
    euAnimals,
    allSets
}