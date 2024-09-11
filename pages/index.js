import styled from "styled-components";
import { useEffect, useState } from "react";
import { initialState } from "@/initialData";


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
  margin: auto; 
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
const LilSquareContainer = styled.div`
  text-align: center;  
  padding: 0.1rem;
  min-height: 100px;
  height: 100%;
  width: 100%;
  border: 2px solid orange;
  border-radius: 5px;

`;

const LilSquareBack = styled.p`
color: orange;  
text-align: left;  
  padding: 0;
  line-height: 0.77rem;
  font-size: 0.77rem;
`;

const LilSquareFront = styled.div`
  text-align: center;  
  padding: 2.7rem;
  min-height: 100px;
  height: 100%;
  width: 100%;
  line-height: 3rem;
  font-size: 3rem;
`;

const LilTest = styled.div`
  text-align: center;  
  
  min-height: 50px;
  height: 100%;
  width: 100%;
  border: 2px solid orange;
  border-radius: 2px;
  line-height: 2rem;
  font-size: 2rem;
`;




// console.log(generateSquareArray("memory", 4));

export default function HomePage() {
  const [squareState, setSquareState] = useState(initialState);
  const [gameState, setGameState] = useState({ gameMode: "memory", progress: "noGame" });
  const { gameMode, progress } = gameState;
  const [message, setMessage] = useState("Welcome to  S Q U A R R E L");

  function generateSquareArray(mode, root) {
    const numberOfSquares = root ** 2;
    const cardSets = numberOfSquares / 2;
    const cardNumbers = [...Array(numberOfSquares + 1).keys()].slice(1);

    const backLetters = "s Q U A R R E L "

   const backSideArray = cardNumbers.map((number) => backLetters);
      console.log(backSideArray);

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
    setGameState({...gameState, progress: "generated"})
    setMessage(`Started a ${gameMode} game!`);
  }



 
  return (
    <>
      <SquarrelTitle>🟧 S Q U A R R E L 🟧</SquarrelTitle>
      <ButtonContainer><button onClick={handleStart}>START</button><MessageSlot>{message}</MessageSlot></ButtonContainer>
     <SquareSection>
        {progress === "generated" ? (squareState.map((square) => <LilSquareContainer key={square.id}><LilSquareBack>{square.back}</LilSquareBack></LilSquareContainer>)) : null}

    

      </SquareSection>
      {/* <SquareSection>
       <LilSquare>1</LilSquare>
       <LilSquare>2</LilSquare>
       <LilSquare>3</LilSquare>
       <LilSquare>4</LilSquare>
       <LilSquare>5</LilSquare>
       <LilSquare>6</LilSquare>
       <LilSquare>7</LilSquare>
       <LilSquare>8</LilSquare>
       <LilSquare>9</LilSquare>
       <LilSquare>10</LilSquare>
       <LilSquare>11</LilSquare>
       <LilSquare>12</LilSquare>
       <LilSquare>13</LilSquare>
       <LilSquare>14</LilSquare>
       <LilSquare>15</LilSquare>
     <LilSquare>16</LilSquare> 
     </SquareSection> */}
      

      <TestFlexContainer> </TestFlexContainer>
    </>
  );
}
