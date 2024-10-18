import styled from "styled-components";
import { useEffect, useState } from "react";
import useLocalStorageState from 'use-local-storage-state'
import {  allSets } from "@/memoryData";
import { initialCardState, initialGameState, initialOptions } from "@/initialStatesAndPresets";
import Card from "@/components/Card";
import Intro from "@/components/Intro";
import Timer from "@/components/Timer";
import Highscore from "@/components/Highscore";
import ResultMessage from "@/components/ResultMessage";

import {
  StyledMain,
  ButtonContainer,
  HighScoreContainer,
  DevSquare,
  UpperSection,
  MessageSlot,
  SmallerHeadline,
  StatLine,
  Stats,
  StandardButton,
  DebugButton,
  SquarrelTitle,
  LeftSide,
  TitleContainer,
  FlexColumnWrapper,
  FlexRowWrapper,
  StandardLabel,
  StyledInput,
  StyledNrInput,
  StyledSelect,
  SmallerButton,
  SmallerNrInput,
  BiggerButton,
  SetInfo
} from "@/styledcomponents";
import { formatDuration, calculatePoints } from "@/utils";
import { v4 as uuidv4 } from 'uuid';
import GameOptions from "@/components/GameOptions";

const SquareSection = styled.section`
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr 1fr 1fr ${({ $addColumns, $fraction }) => $addColumns >= 1? $fraction.repeat($addColumns) : null};
  grid-template-rows: 1fr 1fr 1fr 1fr;
  left: ${({ $shiftRight }) => $shiftRight ? `${$shiftRight}px` : "0px"};
  gap: 8px;
  height: ${({ $height }) => `${$height}px`};
  width: ${({ $height }) => `${$height}px`};
  margin: .5rem;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;

const DevButtonContainer = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  min-height: 35px;
  top: 60px;
  left: 30px;
  width: 10rem;
  height: 5rem;
  align-content: center;
  align-items: center;
  border-radius: 4px;
  z-index: 2;
`;

export default function HomePage() {
  const [whatIsShown, setWhatIsShown] = useState({ introIsShown: true, mainIsShown: false, highscoreIsShown: false, setInfoIsShown: false, resultIsShown: false});
  const { introIsShown, mainIsShown, optionsAreShown,  highscoreIsShown, setInfoIsShown, resultIsShown} = whatIsShown;
  const [devMode, setDevMode] = useState(false);
  const [options, setOptions] = useLocalStorageState("options", { defaultValue: initialOptions });
  const { gameMode, numberOfPlayers, nameOfPlayer1, nameOfPlayer2, nameOfPlayer3, cardRows, cardColumns, cardSet, shuffle, delayTime, typeOfSet, size, timerWanted } = options;
  //only temp try this
  // const cardSet = allSets[0];
  const [squareState, setSquareState] = useState(initialCardState);
  const [squareCount, setSquareCount] = useState(0);
  const [gameState, setGameState] = useState(initialGameState);
  const { running, cardsShown, gameWon, card0, card1 } = gameState;
  const [count, setCount] = useState({ cardCount: 0, roundCount: 1 });
  const { cardCount, roundCount } = count;
  const [points, setPoints] = useState(0);
  const [message, setMessage] = useState("Welcome to  S Q U A R R E L ! You can now play with up to 32 cards. Wanna try?");
  const [clickStop, setClickStop] = useState(false);
  const [gameIsPaused, setGameIsPaused] = useState(false);
  const [highscore, setHighscore]= useLocalStorageState("highscore", {
    defaultValue: []
  })

  //for timer 
  const [storedInterval, setStoredInterval] = useState(0);
  const [timespan, setTimespan] = useState(0);
  
  function advancedTiming(run, lapTime) {
    let newIntervalId;
     if (run === true) {
        const firstTime = Date.now();
      
        function updateTimespan() {
            const newTimespan = !lapTime? (Date.now() - firstTime) : (Date.now() - firstTime + lapTime);
            setTimespan(newTimespan);
        }
      if (!newIntervalId) {
        const newIntervalId = setInterval(updateTimespan, 100);
        setStoredInterval(newIntervalId);
      }
     
    } else { 
       const newIntervalId = storedInterval;
       clearInterval(newIntervalId);
    }
}

  function handleEndOfIntro() {
  setWhatIsShown({...whatIsShown,  introIsShown: false, mainIsShown: true })
}
 
  //responsive
  const isWindowClient = typeof window === "object";
  
  const [windowWidth, setWindowWidth] = useState(
      isWindowClient ? window.innerWidth : undefined
  );
  const [windowHeight, setWindowHeight] = useState(
    isWindowClient ? window.innerHeight : undefined
  );
  
    useEffect(() => {  
      function setSize() {
        setWindowWidth(window.innerWidth);
        setWindowHeight(window.innerHeight);
      }
      if (isWindowClient) {
        window.addEventListener("resize", setSize);
  
        return () => window.removeEventListener("resize", setSize);
      }
    }, [isWindowClient, setWindowWidth, setWindowHeight]);

  const cardSectionHeight = windowHeight - 99;
  const cardHeight = cardSectionHeight / 4 - 6;
  const shiftRight = cardSectionHeight / 8 + 1;
  const moreColumns = cardColumns - 4;
  const upperWidth = `${202 + cardSectionHeight + moreColumns * (shiftRight * 2)}px`;
  const overallMaxwidth = windowWidth - 20;

  // card rows = 4 for now, 4 <= cardColumns <= 8 
  function generateCardsArray(cardRows, cardColumns, shuffle, cardSet) {
    const numberOfSquares = cardColumns * cardRows;

    const cardNumbers = [...Array(numberOfSquares).keys()];

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

    //may need to made clearer and better expandable (react to more sets) with future update
    const cardsArray = cardNumbers.map((number) => {
      const ASCIIDualFront = setName.includes("Dual") ? (number % 2 === 0 ? setList[Math.floor(number / 2)].half2 : setList[Math.floor(number / 2)].half1) : "no front";
      const frontASCII = setName.includes("Dual")? ASCIIDualFront : setList[Math.floor(number / 2)];
      const frontImage = `${setName}-${setList[Math.floor(number / 2)]}.jpg`;
      const front = typeOfSet === "img" ? frontImage : frontASCII;
      const pairId = setName.includes("Dual") ? Math.floor(number / 2) : front;
      const cardObject = { id: number, front, pairId, back: "back", typeOfSet, isShown: false, won: false };
      return cardObject;
    });
    
    return shuffle === true ? shuffleArray(cardsArray) : cardsArray;

  }
  
  function handleStart() {
    setClickStop(false);
    setPoints(0);
    setWhatIsShown({ ...whatIsShown, highscoreIsShown: false, resultIsShown: false });
    setSquareState(generateCardsArray(cardRows, cardColumns, shuffle, cardSet));
    setGameState({ ...initialGameState, running: true });
    giveCards(80, cardColumns * cardRows);
    setTimespan(0);
    advancedTiming(true);
    setCount({ cardCount: 0, roundCount: 1 });
    setMessage(`Started a ${gameMode} game. Click on a card to start!`);
  }

  function handlePause() {
    switch (gameIsPaused) {
      case false:
        setMessage("Game paused.");
        setClickStop(true);
        advancedTiming(false);
        break;
      case true:
        setClickStop(false);
        advancedTiming(true, timespan);
        setMessage("Game continues.");
        break;
    }
    setGameIsPaused(!gameIsPaused);
  }

  function handleReset() {
    advancedTiming(false);
    setTimespan(0);
    setClickStop(true);
    setGameIsPaused(false);
    setPoints(0);
    setCount({ cardCount: 0, roundCount: 1 });
    if (cardColumns > 4) {
      setWhatIsShown({ ...whatIsShown, highscoreIsShown: false })
    };
    setSquareState(generateCardsArray(cardRows, cardColumns, shuffle, cardSet));
    setMessage("Game reset. Click start to begin a new game.");
  }

  //umbauen auf ohne console.log evtl auslagern
  function showDebugInfo() {
    console.log("Squarestate", squareState);
    console.log("Gamestate", gameState);
    console.log("Options", options);
  }

  function cardClick(id) {
    //may move this to Card component
    const cardClicked = squareState.find((card) => card.id === id).front;
    const cutLength = cardSet.setName.length + 1;
    const cardName = typeOfSet === "img" ? cardClicked.slice(cutLength, -4) : cardClicked;

    //counting cards and rounds etc
    if (cardsShown === 1 && card0.id === id) {
      setMessage("Turn another card!");
    } else {
      setMessage(`You turned card "${cardName}".`);
      const newCount = cardCount + 1;
      const newRound = Math.ceil(newCount / 2);
      setCount({cardCount: newCount, roundCount: newRound});
    }
  
    //set Card to show
    let newSquareState = squareState.map((card) => card.id === id ? { ...card, isShown: true } : card
    );
    setSquareState(newSquareState);

    const filteredSquareState = newSquareState.filter((card) => card.isShown === true);
    setGameState({ ...gameState, cardsShown: filteredSquareState.length, card0: filteredSquareState[0] });
    const openCards = filteredSquareState.length;
  
    //will only run if opencards = 2
    function checkForMatchAndReset(filteredState) {
      setClickStop(true);
      const card0 = filteredState[0];
      const card1 = filteredState[1];
      setGameState({ ...gameState, card1: card1 });
      const match = card0.pairId === card1.pairId ? true : false;
      const wonCardState = squareState.map((card) => 
          card.pairId === card0.pairId ? {...card, won: true} : card
         );
      match ? setMessage("The cards match, yeah!") : setMessage("The cards do not match!");
      match && setPoints(points + 2);  

      //reset CardState (squarestate) 
      const afterRoundCardState = match ? wonCardState : squareState;
        const resetCardState = afterRoundCardState.map((card) => {
            const updatedCard = { ...card, isShown: false };
            return updatedCard;
        });
        
      //set speed
      const timeToSee = match ? delayTime / 4 : delayTime;
   
      //reset 1
      setTimeout(setClickStop, timeToSee, false);
      setTimeout(setSquareState, timeToSee, resetCardState);
      newSquareState = resetCardState;
      
      //needed for check for game end (change for new points State?)
      const arrayOfWonCards = wonCardState.filter((card) => card.won === true);
      const newScore = arrayOfWonCards.length; 
      newScore === (cardColumns * cardRows) && advancedTiming(false);
      //reset 2
      const afterRoundGameState = { ...gameState, cardsShown: 0, card0: { id: "a" }, card1: { id: "b" } };
      setTimeout(() => {
          setGameState(afterRoundGameState);
          setMessage(match ? "You scored!" : "You may score next round!");

          if(newScore === (cardColumns * cardRows)) {
            setMessage(`Game won in ${roundCount} rounds.`);
            setGameState({ ...gameState, running: false, gameWon: true});
            makeHighscoreEntry(timespan);
            setWhatIsShown({...whatIsShown, resultIsShown: true})
          
          };
        }, timeToSee + 300)
      }
    
   openCards === 2 && checkForMatchAndReset(filteredSquareState);
}

function noClick() {
  const newMessage = gameIsPaused ? "Game is paused!" : message.includes("reset") ? "Click start to begin a new game." : "Sorry, only two cards can be shown at the same time!" ;
  setMessage(newMessage);
}
  
  function handleSelect(optionValue) {
    const chosenArray = allSets.filter((set) => set.setName === optionValue);
    const chosenSet = chosenArray[0];
    setOptions({ ...options, cardSet: chosenSet, typeOfSet: chosenSet.typeOfSet, size: chosenSet.size ? chosenSet.size : options.size });
  }
  
  function makeHighscoreEntry(timespan) {
    const gameSize = cardColumns * cardRows;
    const timestamp = Date.now();
    const highscoreDate = new Date(timestamp).toString();
    const gameTime = formatDuration(timespan, 1);
    const results = calculatePoints(timespan, gameSize, roundCount);
    const completeScore = results.completeScore;
    const shortDate = highscoreDate.slice(4, 21);
    const newEntry = { id: uuidv4(6), timestamp, shortDate, timespan, gameTime, gameSize, rounds: roundCount, completeScore, cardSet: cardSet.setName, nameOfPlayer1 }
    setHighscore([...highscore, newEntry]);
  }

  //needs confirm dialog even for devmode
  function handleHighscoreReset() {
    setMessage("Do you really want to reset the complete highscore?")
    // setHighscore([]);
}

  function handleDelete(id) {
    const newArray = highscore.filter((element) => element.id != id);
    setHighscore(newArray);
  }

  function giveCards(delayTime, upperLimit) {
    const numbers = [...Array(upperLimit).keys()];
    numbers.forEach((number) => setTimeout(setSquareCount, delayTime * number, number));  
}

  function updateOptions(updatedOptions) {
    
    console.log(updatedOptions);
    setOptions({ ...options, ...updatedOptions });
  }
  
  return (
    <>
      {introIsShown && <Intro endOfIntro={handleEndOfIntro} />}
      {mainIsShown && <StyledMain>
        <UpperSection $maxwidth={overallMaxwidth} $upperWidth={upperWidth}>
          <TitleContainer><DevSquare onClick={()=>setDevMode(!devMode) }>🟧</DevSquare><SquarrelTitle> SQUARREL</SquarrelTitle>
          </TitleContainer>
            <MessageSlot>{message}</MessageSlot>
          <Stats>
            <SmallerHeadline>Stats<br /> </SmallerHeadline>
            <StatLine>Won cards: {points} 🟧 Round: {roundCount} 🟧
            </StatLine>
          </Stats>
        </UpperSection>
        <LeftSide>
          <GameOptions options={options} onUpdateOptions={updateOptions}/>
        
          {/* <SmallerHeadline>  Options </SmallerHeadline> 
         <StandardLabel htmlFor="numberOfPlayers">Nr. of players:
            <SmallerNrInput name="numberOfPlayers" id="numberOfPlayers" type="number" min={1} max={3}
              onChange={(event) => setOptions({ ...options, numberOfPlayers: event.target.value })} value={numberOfPlayers} />
          </StandardLabel><br />
   
            <StandardLabel htmlFor="nameOfPlayer1">Player1: <StyledInput name="nameOfPlayer1" id="nameOfPlayer1"
              onChange={(event) => setOptions({ ...options, nameOfPlayer1: event.target.value })} value={nameOfPlayer1} /></StandardLabel><br />
        
            {numberOfPlayers >= 2 && <StandardLabel htmlFor="nameOfPlayer2">Player2: <StyledInput name="nameOfPlayer2" id="nameOfPlayer2"
              onChange={(event) => setOptions({ ...options, nameOfPlayer1: event.target.value })} value={nameOfPlayer2} /></StandardLabel>
            }
            {numberOfPlayers >= 3 && <StandardLabel htmlFor="nameOfPlayer3">Player3: <StyledInput name="nameOfPlayer3" id="nameOfPlayer3"
              onChange={(event) => setOptions({ ...options, nameOfPlayer3: event.target.value })} value={nameOfPlayer3} /></StandardLabel>
            }
            <StandardLabel htmlFor="selectSet">
              <StyledSelect aria-label="Choose a set of cards" id="selectSet"
                name="selectSet" value={`${cardSet.setName}`} onChange={(event) => handleSelect(event.target.value)}
              >
                <option value={""}>--Please choose a card set--</option>
                <option value="euAnimals">European animals (b&w)</option>
                <option value="wolfpack">Cult of wolves (b&w)</option>
                <option value="afrAnimals">African animals (colour)</option>
                <option value="happy">Being happy (colour)</option>
                <option value="darkrpg">RPG characters (colour)</option>
                <option value="ABCSet">Capital letters</option>
                <option value="abcDualSet">Two kinds of letters</option>
                <option value="smallNumbers">Small numbers</option>
                <option value="htmlSet">HTML opening tags</option>
                <option value="htmlDualSet">HTML tag pairs</option>
              </StyledSelect>
            </StandardLabel>
       
            <StandardLabel htmlFor="delayTime">Delay time<StyledNrInput name="delayTime" id="delayTime" type="number" min={400} max={8000} step="100"
              onChange={(event) => setOptions({ ...options, delayTime: event.target.value })} value={delayTime} /> ms</StandardLabel>
            <br />
            <StandardLabel htmlFor="cardColumns">Size 4 x <SmallerNrInput name="cardColumns" id="cardColumns" type="number" min={4} max={8}
              onChange={(event) => setOptions({ ...options, cardColumns: Number(event.target.value) })} value={cardColumns} /></StandardLabel>
          <FlexRowWrapper> Timer: <SmallerButton onClick={() => setWhatIsShown({ ...whatIsShown, timerWanted: !timerWanted })} >{timerWanted? "yes" : "no"}</SmallerButton></FlexRowWrapper>
          <br /> */}

            <SmallerHeadline>Controls </SmallerHeadline>
            <FlexColumnWrapper>
              <ButtonContainer>
                <StandardButton onClick={handleStart}>start</StandardButton>
                <StandardButton onClick={handlePause}>{gameIsPaused ? "continue" : "pause"}</StandardButton>
                <StandardButton onClick={handleReset}>reset</StandardButton>
              </ButtonContainer>
              <ButtonContainer>
                <BiggerButton onClick={() => setWhatIsShown({ ...whatIsShown, setInfoIsShown: !setInfoIsShown })}>
                  set info
                </BiggerButton>
                <BiggerButton onClick={() => setWhatIsShown({ ...whatIsShown, highscoreIsShown: !highscoreIsShown, resultIsShown: false })} >
                  highscore
                </BiggerButton>
              </ButtonContainer>
              {setInfoIsShown &&
                <SetInfo>
                  Cards: {cardSet.setList.length}
                  <br></br>
                  MaxSize: {cardSet.setList.length * 2}
                  <br></br>
                  Type: {typeOfSet}</SetInfo>}
            </FlexColumnWrapper>
            <br />
          {timerWanted && <Timer timespan={timespan} />}
        </LeftSide>
        <SquareSection $height={cardSectionHeight} $addColumns={cardColumns - 4} $fraction="1fr " $shiftRight={shiftRight * (cardColumns - 4)} >
          {running === true ? (squareState.map((square, index) =>
            <Card onTurn={cardClick} noTurn={noClick} key={square.id} id={square.id} isVisible={squareCount >= index ? true : false}
              front={square.front} frontImage={square.frontImage} back={square.back} isShown={square.isShown} won={square.won} typeOfSet={square.typeOfSet}
              setName={cardSet.setName} clickStop={clickStop} size={size} cardHeight={cardHeight} />)) : null}
        </SquareSection>
        <HighScoreContainer $width={cardSectionHeight}>
          {resultIsShown &&
            <ResultMessage closeResult={() => setWhatIsShown({ ...whatIsShown, resultIsShown: false })} roundCount={roundCount} timespan={timespan} gameSize={cardColumns * cardRows} />
          }
          {highscoreIsShown &&
            <Highscore cardSectionHeight={cardSectionHeight} highscore={highscore} devMode={devMode} clickedDelete={handleDelete} highscoreIsShown={highscoreIsShown}
            clickedChangeShow={() => setWhatIsShown({ ...whatIsShown, highscoreIsShown: !highscoreIsShown })} />}
        </HighScoreContainer> 
        {devMode && <DevButtonContainer>
            <DebugButton onClick={showDebugInfo}>log</DebugButton>
            <DebugButton onClick={handleHighscoreReset}>resetHs</DebugButton>
            <DebugButton onClick={()=>setWhatIsShown({...whatIsShown, resultIsShown: !resultIsShown})}>result</DebugButton>
          </DevButtonContainer>}
      </StyledMain>
      }
    </>
  );
}
