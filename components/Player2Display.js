import { FlexRowWrapper, SmallerButton, SmallerNrInput, SmallerInput, StandardLabel, SmallerHeadline, StyledSelect, StyledInput, StyledNrInput } from "@/styledcomponents";
import styled from "styled-components"

const DisplayDiv  = styled.div`
  display: block;
  flex-direction: column;
  width: 95%;
  border-radius: 4px;
`;

export default function Player2Display({options, onUpdateOptions, }) {
 
  const { nameOfPlayer2, cardSet, } = options;
  const { setName, setList } = cardSet;

  function handleOptions(optionsObject) {
    onUpdateOptions(optionsObject);
  }



  
  return (
    <DisplayDiv>
           <StandardLabel htmlFor="nameOfPlayer2">Player2: <StyledInput name="nameOfPlayer2" id="nameOfPlayer2"
           onChange={(event) => handleOptions({nameOfPlayer2: event.target.value})} value={nameOfPlayer2} />
          </StandardLabel>
      </DisplayDiv>
   
    )
}