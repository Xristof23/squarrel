import { allSets } from "@/memoryData";
import { FlexRowWrapper, SmallerButton, SmallerNrInput, SmallerInput, StandardLabel, SmallerHeadline, StyledSelect, StyledInput, StyledNrInput } from "@/styledcomponents";
import { useState } from "react";
import styled from "styled-components"
import CardSetPreview from "./CardSetPreview";

const OptionsSection = styled.section`
  width: 100%;
  height: fit-content;
  border-radius: 4px;
  margin-bottom: .5rem;
`;

export default function GameOptions({options, onUpdateOptions}) {
  const [optionsAreShown, setOptionsareShown] = useState(true);
  
  const { numberOfPlayers, nameOfPlayer1, nameOfPlayer2, nameOfPlayer3, cardColumns, delayTime, cardSet, typeOfSet, size, timerWanted} = options;
  const { setName, setList } = cardSet;

  function handleOptions(optionsObject) {
    onUpdateOptions(optionsObject);
  }


function handleSelect(optionValue) {
  const chosenArray = allSets.filter((set) => set.setName === optionValue);
  const chosenSet = chosenArray[0];
  handleOptions({cardSet: chosenSet, typeOfSet: chosenSet.typeOfSet, size: chosenSet.size ? chosenSet.size : options.size });
}

    
  return (
      <OptionsSection>
      <FlexRowWrapper>
      <SmallerHeadline>  Options </SmallerHeadline>
        <SmallerButton onClick={() => setOptionsareShown(!optionsAreShown)} >{optionsAreShown ? "▲" : "▼"}</SmallerButton>
       
        </FlexRowWrapper> 
      {optionsAreShown && <>
        <StandardLabel htmlFor="numberOfPlayers">Players:
          <SmallerNrInput name="numberOfPlayers" id="numberOfPlayers" type="number" min={1} max={3}
            onChange={(event) => handleOptions({ numberOfPlayers: event.target.value })} value={numberOfPlayers} />
        </StandardLabel>
        <br />
        <StandardLabel htmlFor="nameOfPlayer1">Player1: <StyledInput name="nameOfPlayer1" id="nameOfPlayer1"
          onChange={(event) => handleOptions({ nameOfPlayer1: event.target.value })} value={nameOfPlayer1} />
        </StandardLabel>
        <br />
    
        {numberOfPlayers >= 2 &&
          <StandardLabel htmlFor="nameOfPlayer2">Player2: <StyledInput name="nameOfPlayer2" id="nameOfPlayer2"
            onChange={(event) => handleOptions({nameOfPlayer1: event.target.value})} value={nameOfPlayer2} />
          </StandardLabel>
        }
        {numberOfPlayers >= 3 &&
          <StandardLabel htmlFor="nameOfPlayer3">Player3: <StyledInput name="nameOfPlayer3" id="nameOfPlayer3"
            onChange={(event) => handleOptions({nameOfPlayer3: event.target.value })} value={nameOfPlayer3} />
          </StandardLabel>
        }
        <CardSetPreview previewHeight={160} cardSet={cardSet}  /> 
        <StandardLabel htmlFor="selectSet">
          <StyledSelect aria-label="Choose a set of cards" id="selectSet"
            name="selectSet" value={`${cardSet.setName}`} onChange={(event) => handleSelect(event.target.value)}
          >
            <option value={""}>--Please choose a card set--</option>
            <option value="euAnimals">European animals (b&w)</option>
            <option value="wolfpack">Cult of wolves (b&w)</option>
            <option value="afrAnimals">African animals (colour)</option>
            <option value="happy">Being happy (colour)</option>
            <option value="darkrpg">RPG characters (colour)</option>
            <option value="ABCSet">Capital letters</option>
            <option value="abcDualSet">Two kinds of letters</option>
            <option value="smallNumbers">Small numbers</option>
            <option value="htmlSet">HTML opening tags</option>
            <option value="htmlDualSet">HTML tag pairs</option>
          </StyledSelect>
        </StandardLabel>
   
        <StandardLabel htmlFor="delayTime">Delay time
          <StyledNrInput aria-label="Choose the delay time" name="delayTime" id="delayTime" type="number" min={400} max={8000} step="100"
          onChange={(event) => handleOptions({ delayTime: event.target.value })} value={delayTime} /> ms</StandardLabel>
        <br />
        <StandardLabel htmlFor="cardColumns">Size 4 x <SmallerNrInput name="cardColumns" id="cardColumns" type="number" min={4} max={8}
          onChange={(event) => handleOptions({ cardColumns: Number(event.target.value) })} value={cardColumns} /></StandardLabel>
        <FlexRowWrapper> Timer:
          <SmallerButton onClick={() => handleOptions({ timerWanted:!timerWanted })} >{timerWanted ? "yes" : "no"}</SmallerButton>
        </FlexRowWrapper>
      </>}
      </OptionsSection>
   
    )
}