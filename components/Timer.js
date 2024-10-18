import { FlexRowWrapper, SmallerHeadline, SmallerButton } from "@/styledcomponents";
import { formatDuration } from "@/utils";
import { useState } from "react";
import styled from "styled-components";

const TimerSection = styled.section`
width: 8rem;
`;

const TimeDisplay = styled.div`
    text-align: right; 
    font-size: 1rem;
    font-weight: 500; 
    padding: .5rem;
    margin: .5rem 0 0 .2rem;
    width: 6rem;
    height: 2rem;
    border-radius: 4px;
    border: 1px solid darkorange;
    background-color: white;
`;
export default function Timer({ timespan }) {
    const [timerIsShown, setTimerIsShown] = useState(true);

    return(
        <TimerSection>
            <FlexRowWrapper>
            <SmallerHeadline> Time</SmallerHeadline>
                <SmallerButton onClick={() => setTimerIsShown(!timerIsShown)} >{timerIsShown ? "▲" : "▼"}</SmallerButton>
                </FlexRowWrapper>
            {timerIsShown &&
                <TimeDisplay> {formatDuration(timespan, 1)}
                </TimeDisplay>}
        </TimerSection>
    )
}