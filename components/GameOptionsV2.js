import { allSets } from "@/memoryData";
import { FlexRowWrapper, SmallerButton, SmallerNrInput, SmallerInput, StandardLabel, SmallerHeadline, StyledSelect, StyledInput, StyledNrInput } from "@/styledcomponents";
import { useEffect, useState } from "react";
import styled from "styled-components"
import CardSetPreview from "./CardSetPreview";
import { allPresets } from "@/initialStatesAndPresets";


const MinimalOptionsSection = styled.section`
  width: 95%;
  height: ${({ $height }) => `${$height}px`};
  border-radius: 4px;
  margin-bottom: 1.5rem;
`;

export default function GameOptionsV2({ cardHeight, options, onUpdateOptions }) {
  const [minimal, setMinimal] = useState(true);
  const [preset, setPreset] = useState("beginner");
  const { numberOfPlayers, nameOfPlayer1, nameOfPlayer2, numberDealt, cardColumns, delayTime, cardSet, typeOfSet, size, timerWanted } = options;
  // const { setName, setList } = cardSet;

  const [beginner, advanced, twoPlayers ] = allPresets;

  function handleOptions(optionsObject) {
    onUpdateOptions(optionsObject);
  }


function handleSelectPreset(optionValue) {
  const chosenArray = allPresets.filter((preset) => preset.name === optionValue);
  const chosenPreset = chosenArray[0];s
  setPreset(chosenPreset.name);
 
  handleOptions({ cardSet: chosenPreset.cardSet, numberDealt: chosenPreset.numberDealt, delayTime: chosenPreset.delayTime });
 
}
  
  return (
      <MinimalOptionsSection $height={cardHeight/4}>
      {!minimal && <SmallerHeadline>  Options </SmallerHeadline>}
      {!minimal && <StandardLabel htmlFor="numberOfPlayers">Players:
        <SmallerNrInput name="numberOfPlayers" id="numberOfPlayers" type="number" min={1} max={2}
          onChange={(event) => handleOptions({ numberOfPlayers: event.target.value })} value={numberOfPlayers} />
      </StandardLabel>}
   
      <StandardLabel htmlFor="nameOfPlayer1">Player1: {}
        <StyledInput $width={cardHeight/2 } name="nameOfPlayer1" id="nameOfPlayer1"
          onChange={(event) => handleOptions({ nameOfPlayer1: event.target.value })} value={nameOfPlayer1} />
        </StandardLabel>
        
    
        {numberOfPlayers >= 2 &&
          <StandardLabel htmlFor="nameOfPlayer2">Player2: <StyledInput name="nameOfPlayer2" id="nameOfPlayer2"
            onChange={(event) => handleOptions({nameOfPlayer2: event.target.value})} value={nameOfPlayer2} />
          </StandardLabel>
        }
   
        {/* <CardSetPreview previewHeight={160} cardSet={cardSet}  />  */}
        <StandardLabel htmlFor="selectPreset">
          <StyledSelect aria-label="Choose a preset" id="selectPreset"
            name="selectPreset" value={`${preset}`} onChange={(event) => handleSelectPreset(event.target.value)}
          >
            <option value={""}>--Please choose a preset--</option>
            <option value="beginner">Beginner</option>
            <option value="advanced">Advanced</option>
            <option value="twoPlayers">2 players</option>
            <option value="expert">Expert</option>
      
          </StyledSelect>
        </StandardLabel>
     
    </MinimalOptionsSection>

    )
}