import { ButtonContainer, SmallerHeadline, StandardButton } from "@/styledcomponents"
import { useState, useEffect } from "react";
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
export default function Timer({runTimer, resetTimer}) {
    const [timeTools, setTimeTools] = useState({ start: 0, running: false })
    const { start, running,  interval1 } = timeTools;
    const [timespan, setTimespan] = useState(0);
    const [hundredth, setHundredth] = useState(0);


    function advancedTiming(run) {
         if (run === true) {
            const first = Date.now();
            setTimeTools({ start: first });

            function updateTimespan() {
                const newTimespan = (Date.now() - first);
                // const roundedTime = Math.round(newTimespan);
                setTimespan(newTimespan);

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
            //  const finalTime = (Date.now() - start);
             const finalTime = formatDuration(timespan, true);
             const finalHundredth = finalTime.slice(-2)
             setTimeout(()=>setHundredth(finalHundredth), 99);
             console.log(finalTime);
             console.log(finalTime.slice(-2));
        }
      
    }

    useEffect(()=>{
        advancedTiming(runTimer ? true : false);
        const finalTime = formatDuration(timespan, true);
        !runTimer && setHundredth(finalTime.slice(-2));
        !runTimer && console.log(finalTime);
    }, [runTimer])
    
    function resetToZero() {
        setTimespan(0);
        setHundredth(0);
    }

    resetTimer && resetToZero();

    function formatTo2digits(number) {
        const formattedNumber = number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
                    })
        return formattedNumber;
    }

    function formatDuration(number, highRes) {
        const allSeconds = Math.floor(number / 1000);
        const minutes = formatTo2digits(Math.floor(allSeconds / 60));
        const seconds = formatTo2digits(Math.floor(allSeconds % 60));
        const realHundredth = formatTo2digits(Math.round((number % 1000)/10));
        const minutesAndSeconds = `${minutes}:${seconds}`;
        const formattedDuration = highRes? `${minutesAndSeconds},${realHundredth}`: minutesAndSeconds;
        return formattedDuration;
}
   
    return(
        <TimerSection>
            <SmallerHeadline> Timer</SmallerHeadline>
            <TimeDisplay> {formatDuration(timespan)},{formatTo2digits(hundredth)}
            </TimeDisplay> 
            <ButtonContainer>
            <StandardButton onClick={()=>advancedTiming(true)}>Start</StandardButton>
            <StandardButton onClick={()=>advancedTiming(false)}>Stop</StandardButton>
            <StandardButton onClick={resetToZero}>Reset</StandardButton>
            </ButtonContainer>
        </TimerSection>
    )
}