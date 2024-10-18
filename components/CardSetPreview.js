import styled from "styled-components";


const ImageContainer = styled.div`
padding: .5rem;
margin: .5rem; 
  width: 100%;
 background-color: white;
  border: 1px solid black;
  border-radius: 5px;
`;

const CardImage = styled.img`
  display: block;
  height: ${({ $height }) => `${$height}px`};
  width: ${({ $height }) => `${$height}px`};
`;




export default function Cardfront() {
  return <ImageContainer>
  
    <CardImage />
</ImageContainer>
};