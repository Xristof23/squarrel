import styled from "styled-components";


const LilSquareContainer = styled.div`
  text-align: center;  
  padding: 0.1rem;
  min-height: 100px;
  height: 100%;
  width: 100%;
  border: 2px solid orange;
  border-radius: 5px;

`;

const LilSquareBack = styled.p`
color: orange;  
text-align: left;  
  padding: 0;
  line-height: 0.77rem;
  font-size: 0.77rem;
`;

const LilSquareFront = styled.div`
  text-align: center;  
  padding: 2.7rem;
  min-height: 100px;
  height: 100%;
  width: 100%;
  line-height: 3rem;
  font-size: 3rem;
`;



export default function LilSquare({id, front, back, show, onTurn}) {
  
  function handleCardClick(id) {
    onTurn(id);
  }
  
  
  return (
    
    <LilSquareContainer onClick={()=>handleCardClick(id)}>{show? <LilSquareFront>{front}</LilSquareFront> : <LilSquareBack>{back}</LilSquareBack>}</LilSquareContainer>)
}