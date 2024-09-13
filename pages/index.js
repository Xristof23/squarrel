import styled from "styled-components";
import { useEffect, useState } from "react";
import { initialState } from "@/initialData";
import LilSquare from "@/components/LilSquare";


const ProgressBar = styled.div`
  width: 42%;
  max-width: 200px;
  height: 0.8rem;
  border: 1px solid var(--text-on-bright);
  position: relative;
  display: inline-block;
  margin: 0 0.5rem 0 0;
  border-radius: 6px;

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: ${({ $progress, $showDetails }) =>
      $showDetails ? `${$progress}%` : "0"};
    background: var(--text-on-bright);
    border-radius: 6px;
    transition: width 400ms;
    transition-delay: ${({ $showDetails }) => ($showDetails ? "500ms" : "0ms")};
  }
`;



const SquarrelTitle = styled.h1`
  text-align: center;
  font-weight: 800;
  line-height: 3.6rem;
  font-size: 3.5rem;
  padding: 2rem auto 2rem;  
  margin:  2rem auto 2rem;
`;

const TestFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  min-height: 400px;
  height: 90%;
  width: 90%;
  align-content: center;
  align-items: center;
  border: 2px solid black;
 
`;
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  margin: 1rem auto 1rem; 
  min-height: 40px;
  width: 50%;
  align-content: center;
  align-items: center;
  background-color: lightgray;
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
  const [squareState, setSquareState] = useState(initialState);
  const [gameState, setGameState] = useState({ gameMode: "memory", progress: "no game started yet", openCards: 0 });
  const {gameMode, progress, openCards } = gameState;
  const [message, setMessage] = useState("Welcome to  S Q U A R R E L");

  function generateSquareArray(mode, root) {
    const numberOfSquares = root ** 2;
    const cardSets = numberOfSquares / 2;
    const cardNumbers = [...Array(numberOfSquares + 1).keys()].slice(1);

    const backLetters = "s Q U A R R E L "
    const backSideArray = cardNumbers.map((number) => backLetters);
     

    const squareArray = cardNumbers.map((number) => {
        // const timeStamp = Date.now();
      
      const front = Math.ceil(number / 2);
      const squareObject = { id: number, mode, front, back: backSideArray, show: false };
      return squareObject;
    });
    return squareArray;
  }
  
  function handleStart() {
    setSquareState(generateSquareArray("memory", 4));
    setGameState({ ...gameState, progress: "generated" })

    setMessage(`Started a ${gameMode} game!`);
  }

  function handleReset() {
    setSquareState(initialState);
    setGameState({ ...gameState, progress: "no game started yet" });
    setMessage("no game started yet");
    }


  function turnAroundCard(id) {
    const filteredSquareState =  squareState.filter((card) => card.show === true);
    const openCardsCountBeforeClick = filteredSquareState.length;
    console.log("openCardsCountBeforeClick: ",openCardsCountBeforeClick)
    const newSquareState = squareState.map((card) => {
      if (card.id === id) {
        return {
          ...card, show: !card.show
        }
      
     } else {
      return card
     } 
    });
    
    setSquareState(newSquareState);
    const filteredSquareStatePostClick = newSquareState.filter((card) => card.show === true);
    const openCardsCount = filteredSquareStatePostClick.length;
    setGameState({ ...gameState, openCards: openCardsCount });
    setMessage(`You turned card no. ${id}. Open CardCount (post click): ${openCardsCount}`);
  }
 
  return (
    <>
      <SquarrelTitle>🟧 S Q U A R R E L 🟧</SquarrelTitle>
      <ButtonContainer><button onClick={handleStart}>START</button><MessageSlot>{message}</MessageSlot><button onClick={handleReset}>RESET</button></ButtonContainer>
     <SquareSection>
        {progress === "generated" ? (squareState.map((square) => <LilSquare onTurn={turnAroundCard} key={square.id} id={square.id} front={square.front} back={square.back} show={square.show} />)) : null}

    

      </SquareSection>
     
      

      
    </>
  );
}
