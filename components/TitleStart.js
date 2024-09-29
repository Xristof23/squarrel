import { useEffect } from "react";
import styled from "styled-components";

const SquarrelTitle = styled.h1`
    text-align: left;
    font-weight: 800;
    line-height: 2.7rem;
    font-size: 2.7rem;
    width: 100%;
    padding: 0;  
    margin:  1rem .5rem 0;
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