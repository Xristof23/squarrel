import { SmallerHeadline } from "@/styledcomponents"
import { formatDuration } from "@/utils";
import { useState, useEffect, useCallback } from "react";
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
export default function Timer({runTimer, resetTimer, sendTime}) {
    const [timeTools, setTimeTools] = useState({ start: 0, running: false })
    const { start, running,  interval1 } = timeTools;
    const [timespan, setTimespan] = useState(0);

    function advancedTiming(run) {
        if (run === true) {
           const first = Date.now();
           setTimeTools({ start: first });

           function updateTimespan() {
               const newTimespan = (Date.now() - first);
               setTimespan(newTimespan);
           }
         
           const newIntervalId = setInterval(updateTimespan, 10);
           setTimeTools({ ...timeTools, interval1: newIntervalId })
        
       } else { 
           setTimeTools({ ...timeTools, running: false });
           const newIntervalId = interval1;
            clearInterval(newIntervalId);
            sendTime(timespan);
       }
   }
  
    useEffect(() => {
        advancedTiming(runTimer ? true : false);
    }, [runTimer])
    
    function resetToZero() {
        setTimespan(0);
    }


    resetTimer && resetToZero();

    return(
        <TimerSection>
            <SmallerHeadline> Time</SmallerHeadline>
            <TimeDisplay> {formatDuration(timespan, true)}
            </TimeDisplay> 
        </TimerSection>
    )
}