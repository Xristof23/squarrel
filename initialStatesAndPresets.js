import {  euAnimals } from "@/memoryData";

// initial states
const initialCardState = [];
const initialGameState = { running: false, gameWon: false, gameTime: 0, cardsShown: 0, card0: { id: "a" }, card1: { id: "b" } };
const initialOptions = {
    gameMode: "memory", numberOfPlayers: 1, nameOfPlayer1: "Squarrel", nameOfPlayer2: "Squirrel", nameOfPlayer3: "Square", cardRows: 4, cardColumns: 4, delayTime: 2000, shuffle: true,
    cardSet: euAnimals, typeOfSet: "img", size: 6, timerWanted: true
}
console.log("euAnimals i", euAnimals);
console.log("same", initialOptions.cardSet)
export {
    initialCardState, 
    initialGameState,
    initialOptions,
}