import { ButtonContainer, SmallerHeadline, StandardButton } from "@/styledcomponents"
import { useState } from "react";
import styled from "styled-components"

const TimerSection = styled.section`
width: 8rem;
`;

const TimeDisplay = styled.div`
text-align: right; 
font-size: 1rem;
font-weight: 500; 
margin: 0 0 0 1rem;
padding: .5rem;

`;
export default function Timer() {
    const [timeTools, setTimeTools] = useState({ start: 0, running: false })
    const { start, running, interval1, interval2 } = timeTools;
    const [timespan, setTimespan] = useState(0);
    const [hundredth, setHundredth] = useState(0);


    function advancedTiming(run) {
        const first = Date.now();
        
        if (run === true) {
            const running = true;
            setTimeTools({ start: first, running });

            function updateTimespan() {
                const newTimespan = (Date.now() - first) / 1000;
                const roundedTime = Math.round(newTimespan);
                setTimespan(roundedTime);
                
                function fakeHundredth() {
                    const numbers = [...Array(100).keys()];
                   numbers.forEach((number) => setTimeout(setHundredth, 10 * number, number));        
                }
                fakeHundredth();
            }
          
            const newIntervalId = setInterval(updateTimespan, 1000);
            setTimeTools({ ...timeTools, interval1: newIntervalId })
         
        } else { 
            setTimeTools({ ...timeTools, running: false });
            const newIntervalId = interval1;
            clearInterval(newIntervalId);
        }
      
    }

    

    function formatHundredth(number) {
        const formattedNumber = number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
                    })
        return formattedNumber;
    }

    return(
        <TimerSection>
            <SmallerHeadline> Timer</SmallerHeadline>
            <TimeDisplay> {timespan},{formatHundredth(hundredth)}
            </TimeDisplay>
            <ButtonContainer>
            <StandardButton onClick={()=>advancedTiming(true)}>Start</StandardButton>
            <StandardButton onClick={()=>advancedTiming(false)}>Stop</StandardButton>
                <StandardButton onClick={() => {
                    setTimespan(0);
                    setHundredth(0);
                }
                 }>Reset</StandardButton>
            </ButtonContainer>
        </TimerSection>
    )
}