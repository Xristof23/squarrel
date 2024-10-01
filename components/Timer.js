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
    const { start, running, interval } = timeTools;
    const [timespan, setTimespan] = useState(0);
    const [testN, setTestN] = useState(0);

  
    function startTiming() {
        const first = Date.now();
        const run = true;
        setTimeTools({ start: first, running: run });
        function updateTimespan() { 
            const newTimespan = Math.round((Date.now() - first)/1000);
            setTimespan(newTimespan);
        }
        console.log(running);
        const nIntervId = setInterval(updateTimespan, 1000, timespan);
        
    }

    function advancedTiming(run) {
        const first = Date.now();
        console.log(Math.round(first/1000))
        if (run === true) {
            const running = true;
            setTimeTools({ start: first, running });
            function updateTimespan() {
                const newTimespan = Math.round((Date.now() - first) / 1000);
                setTimespan(newTimespan);
            }
            const nIntervId = setInterval(updateTimespan, 1000, timespan);
            setTimeTools({ ...timeTools, interval: nIntervId })
         
        } else { 
            const last = Date.now();
            console.log(Math.round(last/1000))
            const timeInSeconds = Math.round((last - start) / 1000);
            setTimeTools({ ...timeTools, running: false });
            console.log(timeInSeconds);
            const nIntervId = interval;
            clearInterval(nIntervId);
            setTimespan(timeInSeconds);
    }
    }

    

    function stopTiming() {
        const last = Date.now();
        const timeInSeconds = Math.round((last - start) /1000);
        setTimeTools({ ...timeTools, running: false });
        
        clearInterval(nIntervId);
        setTimespan(timeInSeconds);
        nIntervId = null;
        console.log("stop");
    }

    function ShowHundredth() {
        let n = 0;
        setInterval(()=>n++,500)
        return (
            <>
                {n}
            </>
        )
}

    return(
        <TimerSection>
            <SmallerHeadline> Timer</SmallerHeadline>
            <TimeDisplay> {timespan}</TimeDisplay>
            <ButtonContainer>
            <StandardButton onClick={()=>advancedTiming(true)}>Start</StandardButton>
            <StandardButton onClick={()=>advancedTiming(false)}>Stop</StandardButton>
            <StandardButton onClick={()=>setTimespan(0) }>Reset</StandardButton>
            </ButtonContainer>
        </TimerSection>
    )
}