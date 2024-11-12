import styled from "styled-components";
import { useEffect, useState } from "react";
import useLocalStorageState from 'use-local-storage-state'
import { initialCardState, initialGameState, initialOptions } from "@/initialStatesAndPresets";
import Card from "@/components/Card";
import DevOnly from "@/components/DevOnly";
import Intro from "@/components/Intro";
import Timer from "@/components/Timer";
import Highscore from "@/components/Highscore";
import ResultMessage from "@/components/ResultMessage";
import {
  StyledMain,
  ButtonContainer,
  FirstSquare,
  FlexColumnWrapper,
  FlexRowWrapper,
  HighScoreContainer,
  NewSquareSection,
  NewOptionsContainer,
  DevSquare,
  UpperSection,
  MessageSlot,
  SmallerHeadline,
  SquareSection,
  StatLine,
  Stats,
  SmallerButton,
  StandardButton,
  SquarrelTitle,
  LeftSide,
  TitleContainer,
  BiggerButton,
  SetInfo,
} from "@/styledcomponents";
import { formatDuration, calculatePoints, sortEntries } from "@/utils";
import { v4 as uuidv4 } from 'uuid';
import GameOptions from "@/components/GameOptions";
import GameOptionsV2 from "@/components/GameOptionsV2";

const ControlsSection = styled.section`
  width: 100%;
  height: fit-content;
  border-radius: 4px;
  margin-bottom: .5rem;
`;

const TestButton = styled(StandardButton)`
flex-grow: 0;
background-color: red;
`;

const MinimalDisplay = styled.p`
text-align: left;  
 font-size: 0.95rem;
  width: 95%;
  margin: .5rem .5rem 1rem 0rem;
  padding: 0rem;
`;

const CardPlaceholder = styled.div`
  display: block;  
  position: relative;  
  text-align: center;  
  padding: 0.1rem;
  min-height: 100px;
  height: ${({ $height }) => `${$height}px`};
  width: ${({ $height }) => `${$height}px`};
  border-radius: 4px;
  border: 1px solid black;
`;

export default function HomePage() {
  const [whatIsShown, setWhatIsShown] = useState({ introIsShown: true, mainIsShown: false, newDesign: false, newOptions: false , highscoreIsShown: false, setInfoIsShown: false, resultIsShown: false });
  const { introIsShown, mainIsShown, highscoreIsShown, setInfoIsShown, resultIsShown, newDesign, newOptions  } = whatIsShown;
  const [devMode, setDevMode] = useState(false);
  // const [options, setOptions] = useLocalStorageState("options", { defaultValue: initialOptions });
  //use this alt as long as working on GameOptionsV2
  const [options, setOptions] = useState(initialOptions);
  const { gameMode, numberOfPlayers, nameOfPlayer1, nameOfPlayer2, nameOfPlayer3, cardRows, cardColumns, numberDealt, cardSet, shuffle, delayTime, typeOfSet, size, timerWanted } = options;
  const [activePlayer, setActivePlayer] = useState(nameOfPlayer1);
  const zeroPoints = [{ name: nameOfPlayer1, points: 0 }, { name: nameOfPlayer2, points: 0 }, { name: nameOfPlayer3, points: 0 }]
  const [scores, setScores] = useState(zeroPoints);
  const [squareState, setSquareState] = useState(initialCardState);
  const [squareCount, setSquareCount] = useState(0);
  const [gameState, setGameState] = useState(initialGameState);
  const { running, cardsShown, gameWon, card0, card1 } = gameState;
  const [count, setCount] = useState({ cardCount: 0, roundCount: 1 });
  const { cardCount, roundCount } = count;
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

  const cardSectionHeight = windowHeight - 20;
  const cardHeight = cardSectionHeight / 4 - 6;
  const shiftRight = cardSectionHeight / 8 + 1;
  const moreColumns = cardColumns - 4;
  const upperWidth = `${202 + cardSectionHeight + moreColumns * (shiftRight * 2)}px`;
  const overallMaxwidth = windowWidth - 20;

  //old: card rows = 4 for now, 4 <= cardColumns <= 8 changing!!
  function generateCardsArray(numberOfCards, shuffle, cardSet) {
    const cardNumbers = [...Array(numberOfCards).keys()];

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
      const frontImage = setList[Math.floor(number / 2)];
      const front = typeOfSet === "img" ? frontImage : frontASCII;
      const pairId = setName.includes("Dual") ? Math.floor(number / 2) : front;
      const cardObject = { id: number, front, pairId, back: "back", typeOfSet, isShown: false, won: false };
      return cardObject;
    });
    
    return shuffle === true ? shuffleArray(cardsArray) : cardsArray;

  }
  
  function handleStart() {
    setClickStop(false);
    setScores(zeroPoints);
    setWhatIsShown({ ...whatIsShown, highscoreIsShown: false, resultIsShown: false });
    setSquareState(generateCardsArray(numberDealt, shuffle, cardSet));
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
    setScores(zeroPoints);
    setActivePlayer(nameOfPlayer1);
    setCount({ cardCount: 0, roundCount: 1 });
    setWhatIsShown({ ...whatIsShown, highscoreIsShown: false });
    setSquareState(generateCardsArray(numberDealt, shuffle, cardSet));
    setMessage("Game reset. Click start to begin a new game.");
  }

  function handleDelete(id) {
    const newArray = highscore.filter((element) => element.id != id);
    setHighscore(newArray);
  }

  function switchPlayer() {
    const players = [nameOfPlayer1, nameOfPlayer2, nameOfPlayer3];
    const chosenPlayers = players.slice(0, numberOfPlayers);
    const activeIndex = chosenPlayers.indexOf(activePlayer);
    const nextPlayer = activeIndex === numberOfPlayers - 1 ? nameOfPlayer1 : chosenPlayers[activeIndex + 1];
    setActivePlayer(nextPlayer);
}
  
  function cardClick(id) {
    const cardName = squareState.find((card) => card.id === id).front;

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
        card.pairId === card0.pairId ? { ...card, won: true } : card
      );
    //set speed
      const timeToSee = match ? delayTime / 4 : delayTime;

      if (match === true) {
        setMessage(`You turned card "${cardName}". The cards match, yeah!`);
        const newScores = scores.map((item) => item.name === activePlayer ? {...item, points: item.points + 2} : item);
        setScores(newScores);
        
      } else {
        setMessage(`You turned card "${cardName}". The cards do not match!`);
        numberOfPlayers >1 && setTimeout(switchPlayer, timeToSee);
      }
    
      //reset CardState (squarestate) 
      const afterRoundCardState = match ? wonCardState : squareState;
        const resetCardState = afterRoundCardState.map((card) => {
            const updatedCard = { ...card, isShown: false };
            return updatedCard;
        });
        
      //reset 1
      setTimeout(setClickStop, timeToSee, false);
      setTimeout(setSquareState, timeToSee, resetCardState);
      newSquareState = resetCardState;
      
      //check for game end (works for single and multiplayer)
      const arrayOfWonCards = wonCardState.filter((card) => card.won === true);
      const newScore = arrayOfWonCards.length; 
      newScore === numberDealt && advancedTiming(false);
      //reset 2
      const afterRoundGameState = { ...gameState, cardsShown: 0, card0: { id: "a" }, card1: { id: "b" } };
      setTimeout(() => {
          setGameState(afterRoundGameState);
          setMessage(match ? "You scored!" : "You may score next round!");
  
        if (newScore === numberDealt) { 
          const sortedPoints = sortEntries(scores, "points", false);
          const winner = sortedPoints[0].name;
          setMessage(`Game won after ${roundCount} rounds. Congratulations, ${winner}!`);
          setGameState({ ...gameState, running: false, gameWon: true });
          numberOfPlayers <=1 && makeHighscoreEntry(timespan);
          numberOfPlayers <=1 && setWhatIsShown({ ...whatIsShown, resultIsShown: true });
          };
        }, timeToSee + 300)
      }
    
   openCards === 2 && checkForMatchAndReset(filteredSquareState);
}

function noClick() {
  const newMessage = gameIsPaused ? "Game is paused!" : message.includes("reset") ? "Click start to begin a new game." : "Sorry, only two cards can be shown at the same time!" ;
  setMessage(newMessage);
}
  
  function makeHighscoreEntry(timespan) {
    const gameSize = numberDealt;
    
    const timestamp = Date.now();
    const highscoreDate = new Date(timestamp).toString();
    const gameTime = formatDuration(timespan, 1);
    const results = calculatePoints(timespan, gameSize, roundCount);
    const completeScore = results.completeScore;
    const shortDate = highscoreDate.slice(4, 21);
    const newEntry = { id: uuidv4(6), timestamp, shortDate, timespan, gameTime, gameSize, rounds: roundCount, completeScore, cardSet: cardSet.setName, nameOfPlayer1 }
    setHighscore([...highscore, newEntry]);
  }

  // delete or make work
  function doHighscoreReset() {
    setMessage("Do you really want to reset the complete highscore? This is not reversible!");
  }

  function giveCards(delayTime, upperLimit) {
    const numbers = [...Array(upperLimit).keys()];
    numbers.forEach((number) => setTimeout(setSquareCount, delayTime * number, number));  
}

  function updateOptions(updatedOptions) {
    setOptions({ ...options, ...updatedOptions });
  }


const arrayForEmpty = [...Array(numberDealt).keys()];


  return (
    <>
      {introIsShown && <Intro overallMaxwidth={overallMaxwidth} endOfIntro={handleEndOfIntro} />}

      {mainIsShown && !newDesign ?
        <StyledMain>
        <UpperSection $maxwidth={overallMaxwidth} $upperWidth={upperWidth}>
          <TitleContainer><DevSquare onClick={() => setDevMode(!devMode)}>🟧</DevSquare><SquarrelTitle> SQUARREL</SquarrelTitle>
           
          </TitleContainer>
            <MessageSlot>{message}</MessageSlot>
          <Stats>
          
            <StatLine>Round: <br /> {roundCount} </StatLine>
            <StatLine>{nameOfPlayer1} {activePlayer === nameOfPlayer1 && "(active)" }<br />
              Won cards: {scores[0].points} 🟧 </StatLine>
            <StatLine>{numberOfPlayers > 1 && <> {nameOfPlayer2}  {activePlayer === nameOfPlayer2 && "(active)" }<br />
                                                  Won cards: {scores[1].points} 🟧</>}
            </StatLine>
          </Stats>
        </UpperSection>
        <LeftSide>
          <GameOptions options={options} onUpdateOptions={updateOptions}/>
          <ControlsSection>
            <SmallerHeadline>Controls</SmallerHeadline>
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
            </ControlsSection>
            {timerWanted && <Timer timespan={timespan} minimalTimer={false} />}
            <TestButton onClick={() => setWhatIsShown({ ...whatIsShown, newDesign: !newDesign })}>
                    {newDesign ? "switch to old" : "switch to new"}
            </TestButton>
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
        {devMode && <DevOnly options={options} gameState={gameState} highscoreReset={doHighscoreReset} />}
      </StyledMain> : null
      }
      {newDesign && <NewSquareSection $height={cardSectionHeight} $addColumns={cardColumns - 4} $fraction="1fr " $shiftRight={shiftRight * (cardColumns - 4)}>
        <FirstSquare $height={cardHeight}>
        <ControlsSection>
            <FlexRowWrapper>
              <StandardButton $width={cardHeight / 5} onClick={handleStart}>►</StandardButton>
                {/* <StandardButton onClick={handlePause}>{gameIsPaused ? "continue" : "pause"}</StandardButton> */}
              <StandardButton onClick={handleReset}>reset</StandardButton>
              <StandardButton onClick={() => setWhatIsShown({ ...whatIsShown, highscoreIsShown: !highscoreIsShown, resultIsShown: false })}>
                  highscore
                </StandardButton>
            </FlexRowWrapper>
             
          </ControlsSection>
         
          <GameOptionsV2 options={options} onUpdateOptions={updateOptions} />
        
          <FlexRowWrapper>
            {timerWanted && <Timer timespan={timespan} minimalTimer={true} />}
            <MinimalDisplay> Points: {scores[0].points} 🟧
            </MinimalDisplay>
            </FlexRowWrapper>
        </FirstSquare>
        <HighScoreContainer $width={cardSectionHeight}>
          {resultIsShown &&
            <ResultMessage closeResult={() => setWhatIsShown({ ...whatIsShown, resultIsShown: false })} roundCount={roundCount} timespan={timespan} gameSize={cardColumns * cardRows} />
          }
          {highscoreIsShown &&
            <Highscore cardSectionHeight={cardSectionHeight} highscore={highscore} devMode={devMode} clickedDelete={handleDelete} highscoreIsShown={highscoreIsShown}
            clickedChangeShow={() => setWhatIsShown({ ...whatIsShown, highscoreIsShown: !highscoreIsShown })} />}
        </HighScoreContainer> 
       
        {running === true ? (squareState.map((square, index) =>
          <Card onTurn={cardClick} noTurn={noClick} key={square.id} id={square.id} isVisible={squareCount >= index ? true : false}
            front={square.front} frontImage={square.frontImage} back={square.back} isShown={square.isShown} won={square.won} typeOfSet={square.typeOfSet}
            setName={cardSet.setName} clickStop={clickStop} size={size} cardHeight={cardHeight} />)) :
          (arrayForEmpty.map((item, index) =>
            <CardPlaceholder key={index}  $height={cardHeight} />))}
        <FirstSquare $height={cardHeight}>
        <TestButton onClick={() => setWhatIsShown({ ...whatIsShown, newDesign: !newDesign })}>
                    {newDesign ? "to  old" : "to new"}
                </TestButton>
          <TitleContainer>
            <DevSquare onClick={() => setDevMode(!devMode)}>🟧</DevSquare><SquarrelTitle> SQUARREL</SquarrelTitle>
           
           </TitleContainer>
        </FirstSquare>
      </NewSquareSection>}
    </>
  );
}
