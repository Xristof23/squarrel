import { BiggerButton, ButtonContainer, FlexRowWrapper } from "@/styledcomponents"
import { calculatePoints, formatDuration } from "@/utils"
import styled from "styled-components"

const ResultMessageContainer = styled.div`
 color: black;
 font-weight: 400;
 background-color: lightgrey;
 width: 80%;
 height: 80%;
 margin: .3rem;
 padding: 0.3rem;
 border-radius: 4px;
 border: 1px solid darkorange;
`;


export default function ResultMessage({timespan, gameSize, roundCount}) {
    
    const results = calculatePoints(timespan, gameSize, roundCount);
    const { basePoints, timeToBeat, timeBonus, roundsToBeat, roundBonus, roundMalus, completeScore } = results;
    return (
        <ResultMessageContainer>
            Base points: {basePoints} <br />
            Time: {formatDuration(timespan, 1)}<br />
            Time to beat: {formatDuration(timeToBeat)}<br />
            Time bonus: {timeBonus}<br />
            Rounds to beat: {roundsToBeat} <br />
            Rounds played: {roundCount} <br />
            Round bonus: {roundBonus}<br />
            Round malus: {roundMalus}<br />
            Result: {completeScore}<br />
          </ResultMessageContainer>
    )
}