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
  min-width: 228px;
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 4px;
`;

const LilSquareFront = styled.div`
color: white;
font-weight: 700;
font-family: times;
font-size: ${({ $size }) => `${$size}rem`};
// line-height: ${({ $size }) => `${$size + 1}rem`};
line-height: 228px;
text-align: center;  
padding: auto;
height: 100%;
width: 100%;
  max-width: 230px;
`;

const CardImage = styled.img`
  display: block;
  height: 226px;
  width: 226px;
`;



export default function Card({ id, front, isShown, onTurn, noTurn, won, typeOfSet, setName, size, clickStop }) {
  
  function handleCardClick(id, clickStop) {
    clickStop? noTurn() : onTurn(id);
  }
  if (won === true) {
    return (<LilSquareContainerWon />)
   
  } else {
    return (
      // <LilSquareContainer onClick={() => handleCardClick(id)}>{isShown ? (typeOfSet === "img" ? <CardImage src={"public/images/eu-a-bear.jpeg"} alt={"an animal" } /> : <LilSquareFront>{front}</LilSquareFront>) : <LilSquareBack>{back}</LilSquareBack>}</LilSquareContainer>)
      <>
        <LilSquareContainer onClick={() => handleCardClick(id, clickStop)
        }>
          {isShown ? (typeOfSet === "img" ? <CardImage src={`/images/${setName}/${front}`} alt="A bear in black & white" /> : <LilSquareFront $size={size}>{front}</LilSquareFront>) : <CardImage src="\images\SquarrelBackFarbe.png" />}</LilSquareContainer>
        
      </>)
  }
}
  
 
