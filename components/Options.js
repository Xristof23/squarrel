import { SmallerHeadline, StyledSelect } from "@/styledcomponents";
import styled from "styled-components"

const OptionsForm = styled.form`
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 4px;
`;

const StandardLabel = styled.label`
  font-size: 0.9rem;
  width: 90%;
  margin: .5rem .5rem 1rem 0rem;
  padding: .2rem;
`;

const StyledNrInput = styled.input`
  font-size: 0.8rem;
  width: 4rem;
  margin: 0.3rem;
  padding: .2rem;
`;

const StyledInput = styled.input`
  min-width: 3.5rem;
  width: 66%;
  margin: 0.3rem;
  padding: .2rem;
`;

export default function Options({options, cardSet}) {

    function handleOptions() {
    
}

function handleSelect(optionValue) {
    const chosenArray = allSets.filter((set) => set.setName === optionValue);
    const chosenSet = chosenArray[0];
    setOptions({ ...options, cardSet: chosenSet, typeOfSet: chosenSet.typeOfSet, size: chosenSet.size ? chosenSet.size : options.size });
  }
    
    
    return(
    <OptionsForm>
    <SmallerHeadline>  Options </SmallerHeadline>
   
    <StandardLabel htmlFor="numberOfPlayers">Number of players: <StyledNrInput  name="numberOfPlayers" id="numberOfPlayers" type="number" min={1} max={3}
      onChange={(event) => setOptions({ ...options, numberOfPlayers: event.target.value })} value={numberOfPlayers} /></StandardLabel>

    <StandardLabel htmlFor="nameOfPlayer1">Player1: <StyledInput name="nameOfPlayer1" id="nameOfPlayer1" 
      onChange={(event) => setOptions({ ...options, nameOfPlayer1: event.target.value })} value={nameOfPlayer1} /></StandardLabel>
  
    {numberOfPlayers >= 2 && <StandardLabel htmlFor="nameOfPlayer2">Player2: <StyledInput name="nameOfPlayer2" id="nameOfPlayer2" 
      onChange={(event) => setOptions({ ...options, nameOfPlayer1: event.target.value })} value={nameOfPlayer2} /></StandardLabel>
     }
   {numberOfPlayers >= 3 && <StandardLabel htmlFor="nameOfPlayer3">Player3: <StyledInput name="nameOfPlayer3" id="nameOfPlayer3" 
      onChange={(event) => setOptions({ ...options, nameOfPlayer3: event.target.value })} value={nameOfPlayer3} /></StandardLabel>
   }
    <StandardLabel htmlFor="selectSet"  >Set:
      <StyledSelect aria-label="Choose a set of cards" id="selectSet"
        name="selectSet" value={`${cardSet.setName}`} onChange={(event) => handleSelect(event.target.value)}
      >
        <option value={""}>--Please choose a card set--</option>
        <option value="euAnimals">European animals (b&w)</option>
        <option value="wolfpack">Cult of wolves (b&w)</option>
        <option value="afrAnimals">African animals (colour)</option>
        <option value="happy">Being happy (colour)</option>
        <option value="jrpg">JRPG party members (colour)</option>
        <option value="ABCSet">Capital letters</option>
        <option value="abcDualSet">Two kinds of letters</option>
        <option value="smallNumbers">Small numbers</option>
        <option value="htmlSet">HTML Tags</option>
      </StyledSelect>
    </StandardLabel>
 
    <StandardLabel htmlFor="delayTime">Delay time<StyledNrInput name="delayTime" id="delayTime" type="number" min={500} max={8000} step="500"
      onChange={(event) => setOptions({ ...options, delayTime: event.target.value })} value={delayTime} /> ms</StandardLabel>
    <br/>
    <StandardLabel htmlFor="cardColumns">Size 4 x <input name="cardColumns" id="cardColumns" type="number" min={4} max={6}
      onChange={(event) => setOptions({ ...options, cardColumns: Number(event.target.value) })} value={cardColumns} /></StandardLabel>
    <p>  </p>

        </OptionsForm>
    )
}