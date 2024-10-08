import { StandardButton, SmallerHeadline, DeleteButton } from "@/styledcomponents";
import { sortEntriesHighToLow, sortEntriesLowToHigh } from "@/utils";
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
  border: 1px solid orange;
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
    grid-template-columns: 1.2fr 5fr 6fr 7fr 2.5fr 3.5fr 7fr 1fr;
    gap: 0.5rem; 
  font-size: 0.8rem;
  line-height: 0.8rem;
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
width: 3rem;
`;

export default function Highscore({highscore, devMode, clickedDelete, highscoreIsShown, clickedChangeShow}) {
    const shownEntries = highscore.toSorted(sortEntriesLowToHigh);

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
                <HighscoreDetail>Time</HighscoreDetail>
                <HighscoreDetail>Name</HighscoreDetail>
                <HighscoreDetail>Cardset</HighscoreDetail>
                <HighscoreDetail>Size</HighscoreDetail>
                <HighscoreDetail>Points</HighscoreDetail>
                <HighscoreDetail>Date</HighscoreDetail>
                {devMode && <HighscoreDetail>x</HighscoreDetail>}
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
              <HighscoreNumber>{entry.completeScore}</HighscoreNumber>
              <HighscoreDetail>{entry.shortDate}</HighscoreDetail>
 
               {devMode && <DeleteButton onClick={()=>onDelete(entry.id)}>x</DeleteButton>}
            </HighscoreEntry>)}
          </Disorder>
         
        </HighscoreSection>
    )
}