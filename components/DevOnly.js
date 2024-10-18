import { StandardButton, SmallerHeadline } from "@/styledcomponents";
import { useState } from "react";
import styled from "styled-components";

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

const DebugButton = styled(StandardButton)`
font-size: .7rem;
color: grey;
padding: 0.1rem;
width: 3rem;
min-width: 2rem;
min-height: 1rem;
border-radius: 4px;
border: 1px solid grey; 
background-color: lightgray;
`;

const DebugSection = styled.section`
background-color: lightgray;
height: fit-content;
`;

const LogContainer = styled.div`
position: relative; 
display: grid;
grid-template-columns: 1fr 1fr;
color: black;
 font-weight: 400;
 background-color: rgb(240 130 0 / 70%);
 width: 95%;
 height: fit-content;
 margin: .1rem;
 padding: .3rem;
 border-radius: 4px;
`;

const LogList = styled.ul`
  margin: 0;
  padding: .1rem;
  list-style-type: none;
`;


const LogListItem = styled.li`
font-size: 1rem;
  line-height: 1rem;
  width: 99%;
  margin: .25rem;
  padding: .4rem;
`;

export default function DevOnly({ gameState,  options, highscoreReset, squareState}) {
    const [logsAreShown, setLogsAreShown] = useState(false);

    const optionKeys = Object.keys(options);
    const optionValues = Object.values(options);
    const gameStateKeys = Object.keys(gameState);

    const squareStateKeys = Object.keys(squareState);
  
  function toggleShowLogs() {
      setLogsAreShown(!logsAreShown);
  }

  //needs confirm dialog even for devmode (does not rest now)
    function handleHighscoreReset() {
        highscoreReset();
}

    return (
        <><DevButtonContainer>
            <DebugButton onClick={toggleShowLogs}>log</DebugButton>
            <DebugButton onClick={handleHighscoreReset}>resetHs</DebugButton>
        </DevButtonContainer>
            {logsAreShown &&
                <DebugSection>
                    <SmallerHeadline>Options log</SmallerHeadline>
                    <LogContainer>
                    
                        <LogList>
                    {optionKeys.map((item, index) => index<=8 && <LogListItem key={index}>{item}</LogListItem>)}
                        </LogList>
                        <LogList>
                            {optionValues.map((item, index) => index <= 8 && <LogListItem key={index}>{item.toString()}</LogListItem>)}
                        </LogList>
                    </LogContainer>
                    <LogContainer>
                    
                    <LogList>
                {optionKeys.map((item, index) => index>9 && <LogListItem key={index}>{item}</LogListItem>)}
                    </LogList>
                    <LogList>
                {optionValues.map((item, index) => index>9 && <LogListItem key={index}>{item.toString()}</LogListItem>)}
                    </LogList>
                 </LogContainer>
                </DebugSection>}
        </>

    )
}