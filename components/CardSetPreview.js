import { FlexRowWrapper } from "@/styledcomponents";
import styled from "styled-components";


const PreviewContainer = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: 1fr 1fr;
gap: 0px;
margin: .5rem 0 .5rem 0; 
   height: ${({ $height }) => `${$height}px`};
 width: ${({ $height }) => `${$height}px`};
 background-color: black;
  border: 2px solid black;
  border-radius: 4px;
`;

const CardImage = styled.img`
  display: block;
  height: ${({ $height }) => `${$height}px`};
  width: ${({ $height }) => `${$height}px`};
`;


//use alt function from card

export default function CardSetPreview({ cardSet, previewHeight }) {
  const { setName, setList } = cardSet;
  const shownSetList = setList.slice(0,4)
  // const front = `${setName}-${setList[0]}.jpg`;
  return(
    <PreviewContainer onClick={()=>console.log("click for previeW")} $height={previewHeight}>
    {shownSetList.map((element, index) =>{
       const front = `${setName}-${element}.jpg`;
      return <CardImage key={index} $height={previewHeight/2} src={`/images/${setName}/${front}`} alt={`An ${element}.jpg`} />
    })
    }
</PreviewContainer>)
};