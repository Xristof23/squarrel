import { useEffect, useState } from "react";
import styled from "styled-components";

const SquarrelIntro = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    font-weight: 800;
    line-height: 7rem;
    font-size: 7rem;
    width: 100%;
    position: absolute;
    padding: 0;
    margin:  0;
    align-items: center;
    align-self: center;
  `;
  
  const IntroContainer = styled.section`
   display: block:
   width: 800px;
   height: 600px;
   gap: 8px;
   margin: .5rem auto .5rem; 
   align-content: center;
 `;
 
const Letter = styled.div`
    display: ${({ $isShown }) => $isShown? `block`: `none`}; 
    flex-grow: 1;
    text-align: center;
    padding: 0;  
    margin: .5rem;
  `;

export default function TitleStart({endOfIntro}) {

    const [testCount, setTestCount] = useState(0);

    function countLetters(delayTime, upperLimit) {
        const numbers = [...Array(upperLimit + 1).keys()].slice(1);
        numbers.forEach((number) => setTimeout(setTestCount, delayTime * number, number));
        //make letters disappear again
        const reverseNumbers = numbers.toReversed();
        setTimeout(()=> reverseNumbers.forEach((number, index) => 
            setTimeout(setTestCount, delayTime*index, number)
        ), delayTime*upperLimit + 800);
        //go to main
        setTimeout(()=>endOfIntro(), delayTime*upperLimit*2 +1100);
    }

    function makeTitleArray(string) {
        const array  = string.split("");
        array.unshift("🟧");
        array.push("🟧");
        return array;
    }
   
    const finalTitle = (makeTitleArray("SQUARREL"));
    
    useEffect(()=>{
        countLetters(250, 10);
    }, [])

    return (
        <IntroContainer>
            <SquarrelIntro>{finalTitle.map((letter, index) => <Letter key={index} $isShown={testCount >= index+1 ? true : false} >{letter}</Letter>)}</SquarrelIntro>
        </IntroContainer>)
}