import { useEffect, useState } from "react";
import styled from "styled-components";

const SquarrelIntro = styled.div`
    display: flex;
    flex-direction: row;
    text-align: center;
    font-weight: 800;
    line-height: 8rem;
    font-size: 8rem;
    width: 100%;
    padding: 0;  
    margin:  6rem auto 6rem;
  `;
  
  const Letter = styled.div`
    text-align: center;
    padding: 0;  
    margin:  0.5rem;
  `;
  



function RenderIntro({ titleString, delaytime }) {
    const titleArray = titleString.split("");
    const readyArray = titleArray.map((thing, index) => {
        const object = { letter: thing, show: false, delay: index*delaytime };
        return object;
    })

    return (
        <>
            <Letter>🟧</Letter>
            {readyArray.map((eins, index) =>
                <Letter key={index} >{eins.show&& eins.letter}</Letter> 
                
            
            )
            } 
            <Letter>🟧</Letter>
    </>
    )
}


export default function TitleStart() {

    const [showDelayedText, setShowDelayedText] = useState({ firstSquare: false, s: false, q: false });

async function delay(ms)  {
    return new Promise((resolve) => 
        setTimeout(resolve, ms));
};
const delayArray = [500, 1000, 1500]
    
    async function showStuff(delayArray) {
        console.log("clicked");
        gi
        await delay(500);
        const showFirst = {...showDelayedText, firstSquare: true}
        setShowDelayedText(showFirst);
        await delay(1000);
        const showSecond = {...showFirst, s: true }
        setShowDelayedText(showSecond);
        await delay(1500);
        setShowDelayedText({...showDelayedText, firstSquare: true, s: true, q: true});
        console.log(showDelayedText);
};

    
    function convertTitle() {
        const titleString = "🟧 S Q U A R R E L 🟧";
        const titleArray = titleString.split("");
        return titleArray;
    }
    const shownTitle = convertTitle();
    
   
    
    
    // useEffect(()=>{
    //     displayTitleLetter("test", 1, 1000);
    // }, [])

    return (
    <><button onClick={showStuff}>start</button>
            {/* <SquarrelIntro><RenderIntro titleString="SQUARREL" delaytime={200}/></SquarrelIntro> */}
            {/* <SquarrelIntro>🟧 S Q U A R R E L 🟧</SquarrelIntro> */}
            
            <SquarrelIntro>
            {showDelayedText.firstSquare && (
                    <div>🟧</div>)}
           {showDelayedText.s && (
                    <div> S</div>)}
                
                {showDelayedText.q && (
                <div> Q</div>)}
                </SquarrelIntro>
    </>)
}