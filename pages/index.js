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
  const [options, setOptions] = useState({ gameMode: "memory", root: 4, shuffle: false, set: euAnimals, typeOfSet: "img" });
  const { gameMode, root, shuffle, set, typeOfSet } = options;
  const [squareState, setSquareState] = useState(initialCardState);
  const [gameState, setGameState] = useState(initialGameState);
  const { progress, openCardsBeforeClick, cardsShown, score, cardClicks, match, card0, card1 } = gameState;
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
    
    const squareArray = cardNumbers.map((number) => {
      const frontASCII = set === "smallNumbers" ? Math.ceil(number / 2) : setList[number - 1];
      const frontImage = `${setName}-${setList[Math.ceil(number / 2)]}.jpg`;

      const front = typeOfSet === "img" ? frontImage : frontASCII;
      const squareObject = { id: number, front, back: backSideArray, typeOfSet, isShown: false, won: false };
      return squareObject;
    });
   
    return shuffle === true ? shuffleArray(squareArray) : squareArray;
  }
  
  function handleStart() {
    setSquareState(generateSquareArray(root, shuffle, euAnimals));
   //not needed right now
    setGameState({ ...gameState, progress: "generated" })

    setMessage(`Started a ${gameMode} game!`);
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

    setGameState(initialGameState);
   setMessage("Click on a card to start!");
      }
  
  

  
  
    function handleNoMatch(card0, card1) {
       //close cards delay needed or dialog
       const noMatchSquareState = squareState.map((card) => {
        if (card.id === card0.id) {
          return {
            ...card, isShown: !card.isShown
          }
        
       } else {
        return card
       } 
      })
        .map((card) => {
          if (card.id === card1.id) {
            return {
              ...card, isShown: !card.isShown
            }
          
         } else {
          return card
         } 
        });
      setSquareState(noMatchSquareState);
    }
  
  function turnAroundCard(id) {
    const filteredSquareStatePreClick = squareState.filter((card) => card.isShown === true);
    setGameState({...gameState, openCardsBeforeClick: filteredSquareStatePreClick.length })
    // const openCardsBeforeClick = filteredSquareStatePreClick.length;
      
    if (openCardsBeforeClick <= 1) {
      const newSquareState = squareState.map((card) => {
        if (card.id === id) {
          return {
            ...card, isShown: true
          }
        
       } else {
        return card
       } 
      });

      setSquareState(newSquareState);
      const filteredSquareState = newSquareState.filter((card) => card.isShown === true);
      const openCardsCount = filteredSquareState.length;
      setGameState({ ...gameState, cardsShown: openCardsCount, cardsClicked: gameState.cardClicks + 1, card0: filteredSquareState[0] });
      setMessage(`You turned card no. ${id}.`);
      card0.id === id ? setMessage("Turn another card") : setMessage(`You turned card no. ${id}.`);
      if (openCardsCount === 2) {
        setGameState({ ...gameState, card1: filteredSquareState[1] });
        if (card0.front === filteredSquareState[1].front) {
          setMessage("The cards match, yeah!");
          setGameState({ ...gameState, match: true });
          setTimeout(handleMatch, 1500, card0, card1);
        
          
        } else {
          setMessage("The cards do not match!");
          setTimeout(handleNoMatch, 2000, card0, card1);
          console.log("after no match");
        }
      }  
    }
    
    else {
      setMessage("Test");
    
      }

    
    //check for too many cards not needed, instead check for match and autoclos
         // card0.front === card1.front ? setMessage("The cards match, yeah!") : setMessage("The cards do not match!");
      // make cards disappear and count points
    
  }
 
  function handleMatch(card0) {
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
    const postWinGameState = { ...gameState, score: gameState.score + 2, match: false, }
    setGameState(postWinGameState);
    setMessage("You scored!");
    postMatchSquareState.map((card) => {
     if (card.front === card0.front) {
      return {
        ...card, isShown: false
      }
      } else {
      return card
      }
  });
 setTimeout(setSquareState, 1000, postMatchSquareState);
 setTimeout(setGameState, 1000, { ...postWinGameState, cardsShown: 0, card0: {id: "a"}, card1: {id: "b"} })
  }





  return (
    <>
      <SquarrelTitle>🟧 S Q U A R R E L 🟧</SquarrelTitle>
      <FlexSection><OptionsContainer>Options</OptionsContainer>
        <Stats>
          Stats(some only for dev)  
          <br />
          <br />
          Open cards before Click: {openCardsBeforeClick}
          <br />
          Open Cards: {cardsShown}
          <br />
          Card0.id: {card0.id}
          <br />
          Card1.id: {card1.id}
          <br />
          Won Cards: {score}
          <br />
          Cardclicks: {cardClicks}</Stats>
      </FlexSection>

      <ButtonContainer><button onClick={handleStart}>START</button><MessageSlot>{message}</MessageSlot> <button onClick={handleRestart}>RESTART</button></ButtonContainer>
     
  
      <SquareSection>
        {progress === "generated" ? (squareState.map((square) => <Card onTurn={turnAroundCard} key={square.id} id={square.id} front={square.front} frontImage={square.frontImage} back={square.back} isShown={square.isShown} won={square.won} typeOfSet={square.typeOfSet}  />)) : null}

  
      </SquareSection>
     
     
      
    </>
  );
}
