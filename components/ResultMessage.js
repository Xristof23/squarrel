import { BiggerButton, ButtonContainer, FlexRowWrapper } from "@/styledcomponents"
import { calculatePoints, formatDuration } from "@/utils"
import styled from "styled-components"

const ResultMessageContainer = styled.div`
 color: black;
 font-weight: 400;
 background-color: #99CCEE;
 width: 50%;
 height: fit-content;
 margin: .2rem;
 padding: .3rem;
 border-radius: 4px;
 border: 1px solid black;
`;

const BoldResult = styled.span`
font-weight: 600;
`;


export default function ResultMessage({timespan, gameSize, roundCount}) {
    
    const results = calculatePoints(timespan, gameSize, roundCount);
    const { basePoints, timeToBeat, timeBonus, roundsToBeat, roundBonus, roundMalus, completeScore } = results;
    return (
        <ResultMessageContainer>
            <BoldResult> You won!</BoldResult><br />
            Base points: {basePoints} <br />
            Time: {formatDuration(timespan, 1)}<br />
            Time to beat: {formatDuration(timeToBeat)}<br />
            Time bonus: {timeBonus}<br />
            Rounds to beat: {roundsToBeat} <br />
            Rounds played: {roundCount} <br />
            Round bonus: {roundBonus}<br />
            Round malus: {roundMalus}<br />
            <BoldResult> Result: {completeScore}</BoldResult>
          </ResultMessageContainer>
    )
}