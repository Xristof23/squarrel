import styled from "styled-components";
import { useState } from "react";
import { initialCardState, initialGameState, ABCSet, htmlSet, euAnimals } from "@/memoryData";
import Card from "@/components/Card";

const SquarrelTitle = styled.h1`
  text-align: center;
  font-weight: 800;
  line-height: 3.6rem;
  font-size: 3.5rem;
  padding: 2rem auto 2rem;  
  margin:  2rem auto 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: .5rem auto .5rem; 
  min-height: 40px;
  width: 50%;
  align-content: center;
  align-items: center;
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 5px;
`;

const FlexSection = styled.section`
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 1rem auto 1rem; 
  min-height: 40px;
  width: 50%;
  align-content: center;
  align-items: center;
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 5px;
`;

const OptionsContainer = styled.div`
padding: 0.5rem;
margin: .5rem; 
  width: 75%;
 background-color: white;
  border: 1px solid black;
  border-radius: 5px;
`;


const Stats = styled.div`
text-align: left; 
color: orange;
background-color: black;
padding: 0.5rem;
margin: .5rem; 
width: 25%;
border: 1px solid black;
border-radius: 5px;
`;


const ConfirmMessage = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 1rem auto 1rem; 
  min-height: 40px;
  width: 50%;
  align-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 5px;
`;


const MessageSlot = styled.div`
 color: darkorange;
 background-color: white;
 padding: 0.5rem;
  margin: auto; 
`;
const SquareSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 0.2rem;
  // width: 90vw;
  width: 600px;
height: 600px;
  margin: auto;
  align-items: center;
 
  border-radius: 2px;
  justify-content: center;
`;


export default function HomePage() {
  const [options, setOptions] = useState({ gameMode: "memory", root: 4, shuffle: true, set: euAnimals, typeOfSet: "img" });
  const { gameMode, root, shuffle, set, typeOfSet } = options;
  const [squareState, setSquareState] = useState(initialCardState);
  const [gameState, setGameState] = useState(initialGameState);
  const { progress, cardsShown, score, round, card0, card1 } = gameState;
  const [message, setMessage] = useState("Welcome to  S Q U A R R E L");
  
  // root: even numbers >= 4
  function generateSquareArray(root, shuffle, set) {
    const numberOfSquares = root ** 2;
    const cardNumbers = [...Array(numberOfSquares + 1).keys()].slice(1);

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    const { setName, typeOfSet, setList } = set;
    shuffleArray(setList);

    const backLetters = "s Q U A R R E L "
    const backSideArray = cardNumbers.map((number) => backLetters);
    
    const cardsArray = cardNumbers.map((number) => {
      const frontASCII = set === "smallNumbers" ? Math.ceil(number / 2) : setList[number - 1];
      const frontImage = `${setName}-${setList[Math.ceil(number / 2)]}.jpg`;

      const front = typeOfSet === "img" ? frontImage : frontASCII;
      const cardObject = { id: number, front, back: backSideArray, typeOfSet, isShown: false, won: false };
      return cardObject;
    });
    return shuffle === true ? shuffleArray(cardsArray) : cardsArray;
  }
  
  function handleStart() {
    setSquareState(generateSquareArray(root, shuffle, euAnimals));
   //not needed right now
    setGameState({ ...initialGameState, progress: "generated" });
    setMessage(`Started a ${gameMode} game! Click on a card to start!`);
  }

  //need two kinds of resets
  // total (not implemented yet)
  function handletotalReset() {
    setSquareState(initialCardState);
    setGameState({ ...gameState, progress: "no game started yet" });
    setMessage("no game started yet");
    }

  // restart
  function handleRestart() {
    //needs added confirm dialog
    setSquareState(squareState.map((card) => {
      const newCard = { ...card, isShown: false, won: false }
      return newCard;
    }));

    setGameState({ ...initialGameState, progress: "generated" });
   setMessage("Click on a card to start!");
      }
  
  function showDebugInfo() {
    console.log("Squarestate", squareState);
    console.log("Gamestate", gameState);
  }
  
  function cardClick(id) {
  
    //just for fun, will be replaced with next update of memorydata
    const cardClicked = squareState.find((card) => card.id === id).front;
    const cardName = cardClicked.slice(10, -4);

      //react to clicking on same card again
    cardsShown === 1 && card0.id === id ? setMessage("Turn another card!") : setMessage(`You turned card "${cardName}".`);
    //set Card to show
    let newSquareState = squareState.map((card) => card.id === id ? { ...card, isShown: true } : card
    );
    setSquareState(newSquareState);

   const filteredSquareState = newSquareState.filter((card) => card.isShown === true);
    setGameState({ ...gameState, cardsShown: filteredSquareState.length, card0: filteredSquareState[0] });
    const openCards = filteredSquareState.length;
   
    openCards === 2 ? setGameState({ ...gameState, card1: filteredSquareState[1] }) : null;

    function checkForMatchAndReset(openCards, card0) {
      if (openCards === 2) {
      
        const match = card0.front === filteredSquareState[1].front ? true : false;
        const wonCardState = squareState.map((card) => {
          if (card.front === card0.front) {
            return {
              ...card, won: true
            }
          } else {
            return card
          }
        });
  
        match ? setMessage("The cards match, yeah!") : setMessage("The cards do not match!");
        
      //reset CardState (squarestate)  and gamestate
        const afterRoundCardState = match? wonCardState : squareState;
        const resetCardState = afterRoundCardState.map((card) => {
            const updatedCard = { ...card, isShown: false };
            return updatedCard;
        });
        const timeToSee = match ? 500 : 3500;
        setTimeout(setSquareState, timeToSee, resetCardState);
        newSquareState = resetCardState;
        //check for game End
        const newScore = wonCardState.filter((card) => card.won === true).length; 
        const newRound = newScore < 16 ? gameState.round + 1 : "Game won.";
           //reset and gamestate
        const afterRoundGameState = { ...gameState, cardsShown: 0, score: (match ? gameState.score + 2 : gameState.score), round: newRound, card0: { id: "a" }, card1: { id: "b" } };
        setTimeout(() => {
          setGameState(afterRoundGameState);
          setMessage(match ? "You scored!" : "You may score next round!");
          newScore === 16 &&  setMessage("All cards won!");
        }, timeToSee + 500)
      }
    }
    checkForMatchAndReset(openCards, card0);
}

  return (
    <>
      <SquarrelTitle>🟧 S Q U A R R E L 🟧</SquarrelTitle>
      <FlexSection><OptionsContainer>Options</OptionsContainer>
        <Stats>
          Stats 
          <br />
          Open Cards: {cardsShown}
          <br />
          Won Cards: {score}
          <br />
          Round: {round}</Stats>
      </FlexSection>

      <ButtonContainer><button onClick={handleStart}>START</button>
        <MessageSlot>{message}</MessageSlot>
        <button onClick={handleRestart}>RESTART</button>
        <button onClick={showDebugInfo}>DEBUG</button>
      </ButtonContainer>
     
  
      <SquareSection>
        {progress === "generated" ? (squareState.map((square) => <Card onTurn={cardClick} key={square.id} id={square.id} front={square.front} frontImage={square.frontImage} back={square.back} isShown={square.isShown} won={square.won} typeOfSet={square.typeOfSet}  />)) : null}

      </SquareSection>
     
    </>
  );
}
