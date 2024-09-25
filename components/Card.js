import styled from "styled-components";


const LilSquareContainer = styled.div`
position: relative;  
text-align: center;  
  padding: 0.1rem;
  min-height: 100px;
  height: 100%;
  width: 100%;
  // border: 2px solid orange;
  border-radius: 5px;
  background-color: black;
`;

const LilSquareContainerWon = styled.div`
  text-align: center;  
  padding: 0.1rem;
  min-height: 100px;
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 4px;
`;

const LilSquareFront = styled.div`
color: white;
font-weight: 700;
line-height: 8rem;
  font-size: 6rem;
text-align: center;  
padding: 2.7rem;
  height: 100%;
  width: 100%;
  
`;

const CardImage = styled.img`
  display: block;
  height: 226px;
  width: 226px;
`;



export default function Card({ id, front, back, isShown, onTurn, won, set, typeOfSet }) {
  
  function handleCardClick(id) {
    onTurn(id);
  }
  if (won === true) {
    return (<LilSquareContainerWon />)
   
  } else {
    return (
      // <LilSquareContainer onClick={() => handleCardClick(id)}>{isShown ? (typeOfSet === "img" ? <CardImage src={"public/images/eu-a-bear.jpeg"} alt={"an animal" } /> : <LilSquareFront>{front}</LilSquareFront>) : <LilSquareBack>{back}</LilSquareBack>}</LilSquareContainer>)
      <>
        <LilSquareContainer onClick={() => handleCardClick(id)}>{isShown ? (typeOfSet === "img" ? <CardImage src={`/images/${front}`} alt="A bear in black & white" /> : <LilSquareFront>{front}</LilSquareFront>) : <CardImage src="\images\SquarrelBackFarbe.png" />}</LilSquareContainer>
        
      </>)
  }
}
  
 
