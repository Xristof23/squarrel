import styled from "styled-components";
import { useState } from "react";
import { initialCardState, initialGameState, ABCSet, htmlSet, euAnimals, allSets } from "@/memoryData";
import Card from "@/components/Card";
import TitleStart from "@/components/TitleStart";

const StyledMain = styled.main`
 display: grid;
  grid-template-columns: 228px 934px;
  grid-template-rows: 120px 228px 228px 228px 228px;
  width: 1180px;
  position: absolute;
  top: 0.5rem;
  left: 1rem;
  margin: auto;
  gap: 8px;
  flex-direction: row;
  padding: 0.5rem;
  margin: .5rem auto .5rem; 
  align-content: center;
`;

const UpperSection = styled.section`
grid-column: 1 / span 2; 
display: flex;
flex-direction: column; 
  margin: .5rem; 
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const TitleContainer = styled.div`
display: flex;
flex-direction: row; 
  width: 100%;
  height: 60%;
  border-radius: 4px;
`;

const ControlsContainer = styled.div`
display: flex;
flex-direction: row; 
padding: .5rem;
  width: 100%;
  height: 3rem;
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 4px;
`;

const OptionsContainer = styled.div`
  padding: .5rem;
  margin: .5rem; 
  min-width: 100px;
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: .5rem;
  margin: -.3rem auto 0;
  min-height: 40px;
  width: 14rem;
  height: 100%;
  align-content: center;
  align-items: center;
  border-radius: 4px;
`;

const MessageSlot = styled.div`
 color: black;
 font-weight: 400;
 background-color: darkorange;
 width: 80%;
 height: 100%;
 margin: 0.8rem auto .5rem;
 padding: 0.3rem;
 border-radius: 4px;
 border: 1px solid black;
margin: 0 auto 0; 
`;

const Stats = styled.div`
 display: flex;
flex-direction: row;
text-align: left; 
color: black;
padding: .5rem; 
width: 70%;
height: 90%;
border-radius: 4px;
`;

const SmallerHeadline = styled.h2`
font-size: 1.05rem;
font-weight: 600; 
margin: 0 0 0.4rem;
`;

const StatLine = styled.p`
margin: 1.5rem 0 0 -2.5rem;
text-align: left; 
`;


const SquareSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 0.12rem;
  width: 936px;
  height: 936px;
  margin: .5rem;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;



const StyledSelect = styled.select`
 padding: .3rem;
  margin: .3rem; 
`;

const StandardButton = styled.button`
font-size: 1rem;
font-weight: 500; 
margin: 0.2rem;
padding: 0.2rem;
min-width: 3rem;
min-height: 2rem;
`;

const StyledInput = styled.input`
min-width: 3.5rem;
`;

const SmalllStyledInput = styled.input`
min-width: 2rem;
`;

export default function HomePage() {
  const [options, setOptions] = useState({ gameMode: "memory", root: 4, delayTime: 3000, shuffle: true, cardSet: euAnimals, typeOfSet: "img" });
  const { gameMode, root, shuffle, delayTime, cardSet, typeOfSet } = options;
  const [squareState, setSquareState] = useState(initialCardState);
  const [gameState, setGameState] = useState(initialGameState);
  const { progress, cardsShown, score, round, card0, card1 } = gameState;
  const [message, setMessage] = useState("Welcome to  S Q U A R R E L");

  // root: even numbers 4 <= root <= 6 (8)
  function generateSquareArray(root, shuffle, cardSet) {
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
    const { setName, typeOfSet, setList } = cardSet;
    shuffleArray(setList);

    const backLetters = "s Q U A R R E L "
    const backSideArray = cardNumbers.map((number) => backLetters);
    
    const cardsArray = cardNumbers.map((number) => {
      const frontASCII = cardSet === "smallNumbers" ? Math.ceil(number / 2) : setList[number - 1];
      const frontImage = `${setName}-${setList[Math.ceil(number / 2)]}.jpg`;

      const front = typeOfSet === "img" ? frontImage : frontASCII;
      const cardObject = { id: number, front, back: backSideArray, typeOfSet, isShown: false, won: false };
      return cardObject;
    });
    return shuffle === true ? shuffleArray(cardsArray) : cardsArray;
  }
  
  function handleStart() {
    setSquareState(generateSquareArray(root, shuffle, cardSet));
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
    console.log("Options", options);
  }
  
  function cardClick(id) {

    //just for fun, might be replaced with next update of memorydata
    const cardClicked = squareState.find((card) => card.id === id).front;
    const cardName = typeOfSet === "img" ? cardClicked.slice(10, -4) : cardClicked;

   //react to clicking on same card again
    cardsShown === 1 && card0.id === id ? setMessage("Turn another card!") : setMessage(`You turned card "${cardName}".`);

    //react to third card (not) open at this place?

    //set Card to show
    let newSquareState = squareState.map((card) => card.id === id ? { ...card, isShown: true } : card
    );
    setSquareState(newSquareState);

    const filteredSquareState = newSquareState.filter((card) => card.isShown === true);
    setGameState({ ...gameState, cardsShown: filteredSquareState.length, card0: filteredSquareState[0] });
    const openCards = filteredSquareState.length;
  
    //will only run if opencards = 2
    function checkForMatchAndReset(filteredState) {
      const card0 = filteredState[0];
      const card1 = filteredState[1];
      setGameState({ ...gameState, card1: card1 });
      const match = card0.front === card1.front ? true : false;
        
      const wonCardState = squareState.map((card) => 
          card.front === card0.front ? {...card, won: true} : card
         );
  
      match ? setMessage("The cards match, yeah!") : setMessage("The cards do not match!");
        
      //reset CardState (squarestate)  and gamestate
        const afterRoundCardState = match? wonCardState : squareState;
        const resetCardState = afterRoundCardState.map((card) => {
            const updatedCard = { ...card, isShown: false };
            return updatedCard;
        });
        
        //set speed
      const timeToSee = match ? delayTime / 5 : delayTime;
      
      //reset 1
        setTimeout(setSquareState, timeToSee, resetCardState);
        newSquareState = resetCardState;
      
        //check for game End
        const newScore = wonCardState.filter((card) => card.won === true).length; 
        const newRound = newScore < 16 ? gameState.round + 1 : "Game won.";
        //reset 2
        const afterRoundGameState = { ...gameState, cardsShown: 0, score: (match ? gameState.score + 2 : gameState.score), round: newRound, card0: { id: "a" }, card1: { id: "b" } };
        setTimeout(() => {
          setGameState(afterRoundGameState);
          setMessage(match ? "You scored!" : "You may score next round!");
          newScore === root**2 && setMessage("All cards won!");
        }, timeToSee + 500)
      }
    
   openCards === 2 && checkForMatchAndReset(filteredSquareState);
}


  function handleSelect(optionValue) {
    const chosenArray = allSets.filter((set) => set.setName === optionValue);
    const chosenSet = chosenArray[0];
    setOptions({ ...options, cardSet: chosenSet, typeOfSet: chosenSet.typeOfSet });
}
  
  return (
    <>
     
      
      <StyledMain>
        <UpperSection>
          <TitleContainer>
            <TitleStart />
          <Stats>
            <SmallerHeadline>Stats<br/> </SmallerHeadline>
              
              <StatLine>🟧 Open Cards: {cardsShown}  🟧 Won Cards: {score}  🟧 Round: {round}</StatLine>
            </Stats>
          </TitleContainer>
          <ControlsContainer>
          <ButtonContainer>
            <StandardButton onClick={handleStart}>start</StandardButton>
            <StandardButton onClick={handleRestart}>restart</StandardButton>
            <StandardButton onClick={showDebugInfo}>debug</StandardButton>
          </ButtonContainer>
          <MessageSlot>{message}</MessageSlot>
         
          </ControlsContainer>
          </UpperSection>
        <OptionsContainer>
        <SmallerHeadline>  Options </SmallerHeadline>
          <label htmlFor="selectSet"  >Set:
            <StyledSelect aria-label="Choose a set of cards" id="selectSet" 
              name="selectSet" value={cardSet}
              onChange={(event) => handleSelect(event.target.value)}
    
            >
          <option value="">--Please choose a card set--</option>
          <option value="euAnimals">European animals in b&w</option>
          <option value="ABCSet">Letters</option>
          <option value="htmlSet">HTML Tags</option>
            </StyledSelect>
            {cardSet.setName}
          </label> 
          <br/>
          <label htmlFor="delayTime">Delay time<StyledInput name="delayTime" id="delayTime" type="number" min={1500} max={10000} step="500"  onChange={(event) => setOptions({ ...options, delayTime: event.target.value})}  value={delayTime} />  ms</label>
          <br/>
          <label htmlFor="root">Size<input name="root" id="root" type="number" min={4} max={8} set={2} onChange={(event) => setOptions({ ...options, root: Number(event.target.value) })} value={root} />x {root}</label>
        </OptionsContainer>
  
      <SquareSection>
        {progress === "generated" ? (squareState.map((square) => <Card onTurn={cardClick} key={square.id} id={square.id} front={square.front} frontImage={square.frontImage} back={square.back} isShown={square.isShown} won={square.won} typeOfSet={square.typeOfSet}  />)) : null}

        </SquareSection>
        
    
      </StyledMain>

    </>
  );
}
