import { useEffect } from "react";
import styled from "styled-components";

const SquarrelTitle = styled.h1`
    text-align: left;
    font-weight: 800;
    line-height: 3.1rem;
    font-size: 3rem;
    width: 80%;
    padding: 0;  
    margin:  0 0 0 .2rem;
  `;
  

export default function TitleStart() {
    function convertTitle() {
        const titleString = "🟧 S Q U A R R E L 🟧";
        const titleArray = titleString.split("");
        return titleArray;
    }
    const shownTitle = convertTitle();
    
    function DisplayTitleLetter({ item, index, delayTime }) {
        // setTimeout(() => { item }, index * delayTime);
        setTimeout(() => { return <>{item}</> }, index * delayTime);
    }
    
    // useEffect(()=>{
    //     displayTitleLetter("test", 1, 1000);
    // }, [])

    return (
    <>
            <SquarrelTitle>🟧 S Q U A R R E L 🟧</SquarrelTitle>
            {/* <SquarrelTitle>{shownTitle.map((letter) => letter)}</SquarrelTitle> */}
            {/* <SquarrelTitle>{shownTitle.map((letter, index) => <DisplayTitleLetter key={index} item={letter} delayTime={200}/>)}</SquarrelTitle> */}
    </>)
}