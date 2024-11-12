import {  allSets } from "@/memoryData";

const [euAnimals, afrAnimals, ...rest] = allSets;

//presets
const beginner = { name: "beginner", numberOfPlayers: 1, numberDealt: 14, cardSet: euAnimals, delayTime: 2000 };
const advanced = { name: "advanced", numberOfPlayers: 1, numberDealt: 22, cardSet: afrAnimals, delayTime: 1500 };
const twoPlayers = { name: "twoPlayers", numberOfPlayers: 2, numberDealt: 22, cardSet: euAnimals, delayTime: 1800 };
const allPresets = [beginner, advanced, twoPlayers ];

// initial states
const initialCardState = [];
const initialGameState = { running: false, gameWon: false, gameTime: 0, cardsShown: 0, card0: { id: "a" }, card1: { id: "b" } };
const initialOptions = {
    gameMode: "memory", numberOfPlayers: 1, nameOfPlayer1: "Simone", nameOfPlayer2: "Jean-Paul", numberDealt: 14, cardRows: 4, cardColumns: 4, delayTime: 2000, shuffle: true,
    cardSet: euAnimals, typeOfSet: "img", size: 6, timerWanted: true
}

export {
    initialCardState, 
    initialGameState,
    initialOptions,
    allPresets
}