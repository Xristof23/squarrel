import styled from "styled-components";


const LilSquareContainer = styled.div`
position: relative;  
text-align: center;  
  padding: 0.1rem;
  min-height: 100px;
  height: ${({ $height }) => `${$height}px`};
  width: ${({ $height }) => `${$height}px`};
  border-radius: 4px;
  background-color: black;
`;

const LilSquareContainerWon = styled.div`
  text-align: center;  
  padding: 0.1rem;
  height: ${({ $height }) => `${$height}px`};
  width: ${({ $height }) => `${$height}px`};
  border: none;
  border-radius: 4px;
`;

const LilSquareFront = styled.div`
color: white;
font-weight: 700;
font-family: times;
font-size: ${({ $size }) => `${$size}rem`};
line-height: ${({ $height }) => `${$height}px`};
text-align: center;  
padding: auto;
height: 100%;
width: 100%;
`;

const CardImage = styled.img`
  display: block;
  height: ${({ $height }) => `${$height}px`};
  width: ${({ $height }) => `${$height}px`};
`;


export default function Card({ id, front, isShown, onTurn, noTurn, won, typeOfSet, setName, size, clickStop, cardHeight }) {

  console.log("cardHeight from card", cardHeight);
  //move away
  function getAltForImage() {

  }
  
  function handleCardClick(id, clickStop) {
    clickStop? noTurn() : onTurn(id);
  }
  if (won === true) {
    return (<LilSquareContainerWon $height={cardHeight} />)
   
  } else {
    return (
      <>
        <LilSquareContainer $height={cardHeight} onClick={() => handleCardClick(id, clickStop)
        }>
          {isShown ? (typeOfSet === "img" ?
            <CardImage $height={cardHeight - 4} src={`/images/${setName}/${front}`} alt="A bear in black & white" /> :
            <LilSquareFront $height={cardHeight} $size={size}>{front}</LilSquareFront>) :
            <CardImage $height={cardHeight} src="\images\SquarrelBackFarbe.png" />}</LilSquareContainer>
        
      </>)
  }
}
  
 
