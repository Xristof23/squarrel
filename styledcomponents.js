import styled from "styled-components";


const StyledMain = styled.main`
 display: grid;
  grid-template-columns: 194px 800px;
  grid-template-rows: 78px 194px 194px 194px 194px;
  width: 99.5%;
  position: absolute;
  top: -1rem;
  left: -0.5rem;
  gap: 8px;
  flex-direction: row;
  padding: 0.5rem;
  margin: .5rem auto .5rem; 
  align-content: center;  
`;

const UpperSection = styled.section`
grid-column: 1 / span 3; 
display: flex;
flex-direction: row; 
  margin: .5rem; 
  width: 1040px;
  width: ${({ $upperWidth }) => $upperWidth};
  height: 100%;
  border-radius: 4px;
    background-color: rgb(240 130 0 / 30%);
  border: 1px solid black;
  border-radius: 4px;
  align-items: center;
`;

const LeftSide = styled.div`
grid-row: 2 / span 4;   
padding: .5rem;
  margin: .5rem; 
  // min-width: 50px;
  width: 100%;
  height: 100%;
  background-color: rgb(240 130 0 / 30%);
  border: 1px solid black;
  border-radius: 4px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-grow: 0;
  flex-direction: row; 
  min-width: 194px;
  width: 194px;
  min-height: 54px;
  border-radius: 4px;
`;

const SquarrelTitle = styled.div`
    font-size: 1.5rem;    
    text-align: right;
    font-weight: 800;
    flex-grow: 1;
    line-height: 48px;
    padding-right: .5rem;  
    margin: .5rem;
    border-radius: 4px;
  `;

const DevSquare = styled.div`
    font-weight: 800; 
    text-align: center;   
    flex-grow: 1;
    font-size: 1.25rem;
    // line-height: 54px;
    position: absolute;
    left: 32px;
    top: 42px;
  `;
  
const MessageSlot = styled.div`
 color: black;
 flex-grow: 1;
 font-weight: 400;
 background-color: rgb(240 130 0 / 70%);
 min-width: 400px;
 width: 40%;
 height: 80%;
 margin: .5rem;
 padding: 0.3rem;
 border-radius: 4px;
 border: 1px solid rgb(240 130 0 / 100%);
`;

const Stats = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
text-align: left; 
 margin: .5rem;
padding: 0.3rem;
min-width: 385px;
height: 80%;
border-radius: 4px;
`;

const ControlsContainer = styled.div`
display: flex;
flex-direction: row; 
padding: .5rem;
  width: 100%;
  height: 3rem;
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 4px;
`;

const Placeholder= styled.div`
  display: flex;
  flex-direction: row;
  padding: .5rem;
  margin: -.3rem auto 0;
  min-height: 40px;
  width: 14rem;
  height: 50%;
  align-content: center;
  align-items: center;
  border-radius: 4px;
`;

//Form
const StandardLabel = styled.label`
  font-size: 0.95rem;
  width: 95%;
  margin: .5rem .5rem 1rem 0rem;
  padding: .2rem;
`;

const StyledSelect = styled.select`
 padding: .3rem;
 width: 95%;
margin: 0.3rem .3rem .3rem 0; 
`;

const StyledNrInput = styled.input`
  font-size: 0.8rem;
  width: 4rem;
  margin: 0.3rem;
  padding: .2rem;
  border-radius: 4px;
`;

const SmallerNrInput = styled(StyledNrInput)`
 min-height: .8rem;
 height: 1.2rem;
  width: 3.3rem;
  margin: .3rem;
  padding: .2rem;
  border-radius: 4px;
`;

const StyledInput = styled.input`
  min-width: 3rem;
  width: 60%;
  margin: .2rem;
  padding: .2rem;
`;

//Buttons
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: fit-content;
  width: 100%;
  height: 3rem;
  align-content: center;
  align-items: flex-start;
  border-radius: 4px;
`;

const StandardButton = styled.button`
text-align: center;
font-size: 1rem;
font-weight: 400; 
flex-grow: 1;
margin: 0.2rem;
padding: 0.4rem;
width: 2.5rem;
min-width: fit-content;
min-height: 2rem;
border-radius: 4px;
border: 1px solid darkorange;
background-color: white;
`;

const SmallerButton = styled(StandardButton)`
font-size: .8rem;
flex-grow: 0;
position: relative;
bottom: 2px;
line-height: .8rem;
margin: .3rem;
padding: 2px;
min-height: .9rem;
min-width: fit-content;
width: 30px;
`;

const BiggerButton = styled(StandardButton)`
width: 4rem;
flex-grow: 1; 
min-width: fit-content;
min-height: 2rem;
margin: .2rem;
padding: .2rem;
background-color: white;

`;

const SetInfo = styled.p`
font-size: 0.95rem;
width: 97%;
margin: .2rem;
padding: 0.2rem;
border-radius: 4px;
border: 1px solid darkorange;
background-color: white;
`;

const DebugButton = styled(StandardButton)`
font-size: .7rem;
color: grey;
padding: 0.1rem;
width: 3rem;
min-width: 2rem;
min-height: 1rem;
border-radius: 4px;
border: 1px solid grey; 
background-color: lightgray;
`;

const DeleteButton = styled(StandardButton)`
color: red;
margin: 0.2rem;
padding: 0.1rem;
width: 2rem;
min-width: 2rem;
min-height: 1.5rem;
 border-radius: 4px;
border: 1px solid grey; 
background-color: lightgray;
`;





//wrapper
const FlexRowWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const FlexColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;


const SmallerHeadline = styled.h2`
font-size: 1.05rem;
font-weight: 600; 
margin: 0 0 0.4rem;
`;

const StatLine = styled.p`
margin: 1.5rem 0 0 -2.2rem;
text-align: left; 
`;


export {
    ButtonContainer,
    DevSquare,
    StyledMain,
    ControlsContainer,
    TitleContainer,
    UpperSection,
  FlexRowWrapper,
    FlexColumnWrapper,
    MessageSlot,
    Placeholder,
    SmallerHeadline,
    StatLine,
  Stats,
  StyledInput,
  StyledNrInput,
  SmallerNrInput,
    StandardLabel,
    StyledSelect,
  StandardButton,
    SmallerButton,
  SquarrelTitle, 
    BiggerButton,
    DebugButton,
    DeleteButton,
  LeftSide,
    SetInfo
  }