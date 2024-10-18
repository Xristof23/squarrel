
import { getAltForImage } from "@/utils";
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
  border: 3px solid darkorange;
  border-radius: 4px;
`;

const CardImage = styled.img`
  display: block;
  height: ${({ $height }) => `${$height}px`};
  width: ${({ $height }) => `${$height}px`};
   border: 1px solid black;
`;

const LilSquareFront = styled.div`
color: white;
font-weight: 700;
font-family: times;
font-size: ${({ $size }) => `${$size}rem`};
line-height: ${({ $height }) => `${$height}px`};
text-align: center;  
padding: auto;
height: ${({ $height }) => `${$height}px`};
width: ${({ $height }) => `${$height}px`};
border: 1px solid white;
background-color: black;
`;


export default function CardSetPreview({ cardSet, previewHeight }) {
  const { setName, setList, typeOfSet, size } = cardSet;
  const htmlDualPreview = ["<img>", "</head>", "<head>", "</img>",]
  const abcDualPreview = ["a", "Z", "b", "A"]
  const shownSetList = setName==="abcDualSet"? abcDualPreview : setName==="htmlDualSet"? htmlDualPreview : setList.slice(0, 4);
 
  return( 
    <PreviewContainer onClick={()=>console.log("click for previeW")} $height={previewHeight}>
      {shownSetList.map((element, index) => {
        if (typeOfSet === "img") {
          const altString = getAltForImage(element);
          return <CardImage key={index} $height={previewHeight / 2 - 1} src={`/images/${setName}/${element}.jpg`} alt={altString} /> 
        } else {
          return <LilSquareFront key={index} $height={previewHeight / 2 - 1} $size={size / 2}>{element}</LilSquareFront>
        }   
    })
    }
</PreviewContainer>)
};