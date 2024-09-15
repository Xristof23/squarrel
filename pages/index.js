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

const CardCount = styled.div`
text-align: left; 
color: darkorange;
padding: 0.1rem;
margin: 0.5rem;`
  ;

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
  const [squareState, setSquareState] = useState(initialState);
  const [gameState, setGameState] = useState({ gameMode: "memory", progress: "no game started yet", cardsShown: 0, score: 0, match: false });
  const { gameMode, progress, cardsShown, score, match } = gameState;
  const [openedCards, setOpenedCards] = useState([]);
  const { card0, card1 } = openedCards;
  const [message, setMessage] = useState("Welcome to  S Q U A R R E L");

  function generateSquareArray(mode, root, shuffle) {
    const numberOfSquares = root ** 2;
    const cardSets = numberOfSquares / 2;
    const cardNumbers = [...Array(numberOfSquares + 1).keys()].slice(1);

    const backLetters = "s Q U A R R E L "
    const backSideArray = cardNumbers.map((number) => backLetters);
     
    const squareArray = cardNumbers.map((number) => {
        // const timeStamp = Date.now();
      
      const front = Math.ceil(number / 2);
      const squareObject = { id: number, mode, front, back: backSideArray, show: false, won: false };
      return squareObject;
    });
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    
    return shuffle === true ? shuffleArray(squareArray) : squareArray;
  }
  
  function handleStart() {
    setSquareState(generateSquareArray("memory", 4, false));
    setGameState({ ...gameState, progress: "generated" })

    setMessage(`Started a ${gameMode} game!`);
  }

  //need two kinds of resets
  // total
  function handletotalReset() {
    setSquareState(initialState);
    setGameState({ ...gameState, progress: "no game started yet" });
    setMessage("no game started yet");
    }

  // restart
  function handleRestart() {
    setSquareState(squareState.map((card) => {
      const newCard = { ...card, show: false, won: false }
      return newCard;
    }));
    setGameState({ ...gameState, progress: "generated", cardsShown: 0, score: 0, match: false });
    setOpenedCards([]);
      setMessage("Click on a card to start!");
      }
  
  
  function handleMatch(card0, card1) {
  
      const postMatchSquareState = squareState.map((card) => {
        if (card.front === card0.front) {
          return {
            ...card, won: true
          }
        
        } else {
          return card
        }
      });
      setSquareState(postMatchSquareState);
      setGameState({ ...gameState, score: gameState.score + 2 });
    setMessage("You scored!");
    }
  
  
    function handelNoMatch(card0, card1) {
       //close cards delay needed or dialog
       const noMatchSquareState = squareState.map((card) => {
        if (card.id === card0.id) {
          return {
            ...card, show: !card.show
          }
        
       } else {
        return card
       } 
      })
        .map((card) => {
          if (card.id === card1.id) {
            return {
              ...card, show: !card.show
            }
          
         } else {
          return card
         } 
        });
      setSquareState(noMatchSquareState);

    }
  
  function turnAroundCard(id) {
    //following 2 lines obsolete now?
    const filteredSquareStatePreClick =  squareState.filter((card) => card.show === true);
    const openCardsCountBeforeClick = filteredSquareStatePreClick.length;
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
    const filteredSquareState = newSquareState.filter((card) => card.show === true);
    const openCardsCount = filteredSquareState.length;
    setGameState({ ...gameState, cardsShown: openCardsCount });
    setMessage(`You turned card no. ${id}. Open CardCount: ${openCardsCount}`);
    //check for too many cards not needed, instead check for match and autoclose
    
    if (openCardsCount <= 1) {
      null
    } else {
      const card0 = filteredSquareState[0];
      const card1 = filteredSquareState[1]; 
      if (card0.front === card1.front) {
        setMessage("The cards match, yeah!");
        setGameState({ ...gameState, match: true });
        setOpenedCards([card0, card1]);
        console.log(card0);
        console.log(card1);
      } else {
        setMessage("The cards do not match!");
       

      }
      // card0.front === card1.front ? setMessage("The cards match, yeah!") : setMessage("The cards do not match!");
      // make cards disappear and count points
    }
  

  }
 
  return (
    <>
      <SquarrelTitle>🟧 S Q U A R R E L 🟧</SquarrelTitle>
      <ButtonContainer><button onClick={handleStart}>START</button><MessageSlot>{message}</MessageSlot><CardCount>Open: {cardsShown}  Score: {score} </CardCount>  <button onClick={handleRestart}>RESTART</button></ButtonContainer>
     {match && <ConfirmMessage><button onClick={()=>handleMatch(openedCards[0], openedCards[1])}>Ok</button></ConfirmMessage>}
      <SquareSection>
        {progress === "generated" ? (squareState.map((square) => <LilSquare onTurn={turnAroundCard} key={square.id} id={square.id} front={square.front} back={square.back} show={square.show} won={square.won} />)) : null}

    

      </SquareSection>
     
      

      
    </>
  );
}
