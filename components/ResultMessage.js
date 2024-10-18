import { BiggerButton, SmallerHeadline, SmallerButton } from "@/styledcomponents"
import { calculatePoints, formatDuration } from "@/utils"
import styled from "styled-components"

const ResultMessageContainer = styled.div`
position: relative; 
color: black;
 font-weight: 400;
 background-color: rgb(240 130 0 / 70%);
 width: 50%;
 height: fit-content;
 margin: .1rem;
 padding: .3rem;
 border-radius: 4px;
 border: 1px solid black;
`;

const BoldResult = styled.span`
 font-weight: 600;
`;

const CloseButton = styled(SmallerButton)`
position: relative;  
left: 73%;
 top: -88%;
 line-height: .7rem;
 width: 1.3rem;
 height: 1.3rem;
 border-radius: 100%;
background-color: rgb(200 240 250 / 20%);
z-index: 2;
`;

export default function ResultMessage({timespan, gameSize, roundCount, closeResult}) {
    const results = calculatePoints(timespan, gameSize, roundCount);
    const { basePoints, timeToBeat, timeBonus, roundsToBeat, roundBonus, roundMalus, completeScore } = results;
    
    function handleCloseResult() {
        closeResult();
   }
   
    return (
        <ResultMessageContainer>
            
            <SmallerHeadline> You won!</SmallerHeadline>
            Base points: {basePoints} <br />
            Time: {formatDuration(timespan, 1)}<br />
            Time to beat: {formatDuration(timeToBeat)}<br />
            Time bonus: {timeBonus}<br />
            Rounds to beat: {roundsToBeat} <br />
            Rounds played: {roundCount} <br />
            Round bonus: {roundBonus}<br />
            Round malus: {roundMalus}<br />
            <BoldResult> Result: {completeScore}</BoldResult>
            <CloseButton onClick={handleCloseResult}>x</CloseButton>
          </ResultMessageContainer>
    )
}