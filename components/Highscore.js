import { StandardButton, SmallerHeadline, DeleteButton } from "@/styledcomponents";
import { sortEntriesHighToLow, sortEntriesLowToHigh } from "@/utils";
import { useState } from "react";
import styled from "styled-components";

const HighscoreSection = styled.section`
  display: block;
  width: 465px;
  height: 100%; 
  margin: .5rem -0.5rem .5rem .5rem;
  padding: .5rem;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;

const Disorder = styled.ul`
margin: 0;
padding: .1rem;
`;

const HighscoreEntry = styled.li`
  display: flex;
  font-size: 0.9rem;
  width: 98%;
  margin: .2rem;
  padding: .3rem;
  align-items: center;
  background-color: orange;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 4px;
`;

const HighscoreDetail = styled.span`
flex-grow: 1;
width: 25%;
align.self: left;
`;

const HighscoreNumber = styled.span`
flex-grow: 1;
width: 8%;
`;

export default function Highscore({highscore, devMode, clickedDelete}) {
    const [showHighscore, setShowHighscore] = useState(true);
    const shownEntries = highscore.toSorted(sortEntriesLowToHigh);

    function onDelete(id) {
        clickedDelete(id);
    }

    return (
        <HighscoreSection>
            <SmallerHeadline>Highscore</SmallerHeadline>
            <HighscoreEntry>
                <HighscoreNumber>#</HighscoreNumber>
                <HighscoreDetail>Time</HighscoreDetail>
                <HighscoreDetail>Name</HighscoreDetail>
                <HighscoreDetail>Cardset</HighscoreDetail>
                <HighscoreDetail>Points</HighscoreDetail>
                <HighscoreDetail>Date</HighscoreDetail>
            </HighscoreEntry>
          <Disorder>
        
             {shownEntries.map((entry, index) => <HighscoreEntry key={entry.id} >
              <HighscoreNumber>{index + 1}</HighscoreNumber>
              <HighscoreDetail>{entry.gameTime}</HighscoreDetail>
              <HighscoreDetail>{entry.nameOfPlayer1}</HighscoreDetail>
              <HighscoreDetail>{entry.cardSet}</HighscoreDetail>
              <HighscoreDetail>{entry.completeScore}</HighscoreDetail>
              <HighscoreDetail>{entry.shortDate}</HighscoreDetail>
              
               {devMode && <DeleteButton onClick={()=>onDelete(entry.id)}>x</DeleteButton>}
            </HighscoreEntry>)}
          </Disorder>
         
        </HighscoreSection>
    )
}