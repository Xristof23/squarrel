import { StandardButton, SmallerHeadline, DeleteButton } from "@/styledcomponents";
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

const FlexRowWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

const Disorder = styled.ul`
margin: 0;
padding: .1rem;
`;

const HighscoreEntry = styled.li`
    display: grid;
    grid-template-columns: 1.2fr 5fr 5fr 7fr 3fr 3fr 4fr 7fr 1fr;
    gap: 0.5rem; 
  font-size: 1rem;
  line-height: 1rem;
  width: 98%;
  margin: .2rem;
  padding: .5rem;
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
line-height: .8rem;
margin: .1rem .5rem .5rem 1rem;
padding: 2px;
font-weight: 500;
height: 20px;
min-height: .9rem;
min-width: 2.5rem;
width: fit-content;
`;

export default function Highscore({ highscore, devMode, clickedDelete, highscoreIsShown, clickedChangeShow }) {
    const [sortValue, setSortValue] = useState("gameTime");
    const [lowToHigh, setLowToHigh] = useState(true);
    
    const shownEntries = sortEntries(highscore, sortValue, lowToHigh);
 
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
                <SmallerButton onClick={onHandleShow} >{highscoreIsShown ? "hide" : "show"}</SmallerButton>
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
               <HighscoreListButton onClick={()=>setLowToHigh(!lowToHigh)} >{lowToHigh? "▲" : "▼"}</HighscoreListButton>
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
                        <HighscoreDetail>{entry.rounds}</HighscoreDetail>
              <HighscoreNumber>{entry.completeScore}</HighscoreNumber>
              <HighscoreDetail>{entry.shortDate}</HighscoreDetail>
 
               {devMode && <DeleteButton onClick={()=>onDelete(entry.id)}>x</DeleteButton>}
            </HighscoreEntry>)}
          </Disorder>    
        </HighscoreSection>
    )
}