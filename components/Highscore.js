import { StandardButton, SmallerHeadline, DeleteButton, FlexRowWrapper, StyledNrInput } from "@/styledcomponents";
import { sortEntries} from "@/utils";
import { useState } from "react";
import styled from "styled-components";

const HighscoreSection = styled.section`
  display: block;
  width: 100%;
  height: 100%; 
  margin-top: .1rem;
  padding: .5rem;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
  border: 1px solid black;
`;

const Disorder = styled.ul`
  margin: 0;
  padding: .1rem;
`;

const HighscoreEntry = styled.li`
  display: grid;
  grid-template-columns: 1.2fr 5fr 5fr 7fr 3fr 2.7fr 4fr 7fr 1fr;
  gap: 0.5rem; 
  font-size: 1rem;
  line-height: 1rem;
  width: 99%;
  margin: .25rem;
  padding: .4rem;
  align-items: center;
  background-color: orange;
  border: 1px solid black;
  border-radius: 4px;
`;

const HighscoreDetail = styled.div`
  text-align: left;
  width: 100%;
`;

const HighscoreListButton = styled.button`
  text-align: center;
  width: 4rem;
  margin: 0;
  border: 1px solid black;
  border-radius: 4px;
  padding: 2px;
`;

const HighscoreNumber = styled.div`
width: 100%;
text-align: right;
`;

const SmallerButton = styled(StandardButton)`
font-size: .8rem;
position: relative;
bottom: 2px;
line-height: .8rem;
margin: .3rem;
padding: 2px;
font-weight: 500;
height: 20px;
min-height: .9rem;
min-width: 2.5rem;
width: fit-content;
`;

const SmallerLabel = styled.label`
  font-size: .8rem;
  line-height: .8rem;
  position: relative;
  bottom: 8px;
  margin: .3rem;
  padding: 2px;
  height: 1.4rem;
`;

const SmallerNrInput = styled(StyledNrInput)`
 min-height: .8rem;
 height: 1.2rem;
  width: 3.3rem;
  margin: .3rem;
  padding: .2rem;
  border-radius: 4px;
`;

export default function Highscore({ highscore, devMode, clickedDelete, highscoreIsShown, clickedChangeShow, cardSectionHeight }) {
    const [sortValue, setSortValue] = useState("gameTime");
  const [lowToHigh, setLowToHigh] = useState(true);
  const [numberOfEntries, setNumberOfEntries] = useState(20);
    
    const sortedEntries = sortEntries(highscore, sortValue, lowToHigh);
  const shownEntries = sortedEntries.slice(0, numberOfEntries);
  
    function onDelete(id) {
        clickedDelete(id);
    }

    function onHandleShow() {
        clickedChangeShow();
    }
    return (
        <HighscoreSection>
          <FlexRowWrapper>
            <SmallerHeadline>Highscore</SmallerHeadline>
            <SmallerButton onClick={()=>setLowToHigh(!lowToHigh)} >{lowToHigh? "▲" : "▼"}</SmallerButton>
            <SmallerButton onClick={onHandleShow} >{highscoreIsShown ? "hide" : "show"}</SmallerButton>
            <SmallerLabel htmlFor="numberOfEntries">Top
              <SmallerNrInput name="numberOfEntries" id="numberOfEntries" type="number"
            min={5} max={sortedEntries.length -1} step="5"
            onChange={(event) => setNumberOfEntries(event.target.value)} value={numberOfEntries} />
            </SmallerLabel>
          </FlexRowWrapper> 
          <Disorder>
            <HighscoreEntry>
                    <HighscoreNumber>#</HighscoreNumber>
                    <HighscoreListButton onClick={() => {
                        setSortValue("gameTime");
                        setLowToHigh(!lowToHigh);}}>Time
                    </HighscoreListButton>
                    <HighscoreDetail >Name</HighscoreDetail>
                    <HighscoreListButton onClick={() => {
                        setSortValue("cardSet");
                        setLowToHigh(!lowToHigh);}
                    }>Cardset
                    </HighscoreListButton>
                    <HighscoreListButton onClick={() => {
                        setSortValue("gameSize");
                        setLowToHigh(!lowToHigh);}
                    }>Size
                    </HighscoreListButton>
                    <HighscoreListButton onClick={() => { 
                        setSortValue("rounds");
                        setLowToHigh(!lowToHigh);}
                      }>Rounds
                    </HighscoreListButton>
                    <HighscoreListButton onClick={() => {
                        setSortValue("completeScore");
                        setLowToHigh(!lowToHigh);}
                      }>Points
                    </HighscoreListButton>
                    <HighscoreListButton onClick={() => {
                        setSortValue("shortDate");
                        setLowToHigh(!lowToHigh);}
                      }>Date</HighscoreListButton>
             
                </HighscoreEntry>
          </Disorder>
          <Disorder>
                {shownEntries.map((entry, index) =>
            <HighscoreEntry key={entry.id} >
              <HighscoreNumber>{index + 1}</HighscoreNumber>
              <HighscoreDetail>{entry.gameTime}</HighscoreDetail>
              <HighscoreDetail>{entry.nameOfPlayer1}</HighscoreDetail>
              <HighscoreDetail>{entry.cardSet}</HighscoreDetail>
                        <HighscoreDetail>{entry.gameSize}</HighscoreDetail>
                        <HighscoreNumber>{entry.rounds}</HighscoreNumber>
              <HighscoreNumber>{entry.completeScore}</HighscoreNumber>
              <HighscoreDetail>{entry.shortDate}</HighscoreDetail>
 
               {devMode && <DeleteButton onClick={()=>onDelete(entry.id)}>x</DeleteButton>}
            </HighscoreEntry>)}
          </Disorder>    
        </HighscoreSection>
    )
}