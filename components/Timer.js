import { SmallerHeadline } from "@/styledcomponents"
import { formatDuration } from "@/utils";
import styled from "styled-components"

const TimerSection = styled.section`
width: 8rem;
`;

const TimeDisplay = styled.div`
    text-align: right; 
    font-size: 1rem;
    font-weight: 500; 
    padding: .5rem;
    margin: .5rem 0 0 0;
    height: 2rem;
    border-radius: 4px;
    border: 1px solid darkorange;
    background-color: white;
`;
export default function Timer({timespan}) {
  

    return(
        <TimerSection>
            <SmallerHeadline> Time</SmallerHeadline>
            <TimeDisplay> {formatDuration(timespan, 1)}
            </TimeDisplay> 
        </TimerSection>
    )
}