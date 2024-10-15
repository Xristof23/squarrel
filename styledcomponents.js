import styled from "styled-components";


const StyledMain = styled.main`
 display: grid;
  grid-template-columns: 200px 800px;
  grid-template-rows: 120px 200px 200px 200px 200px
  gap: 8px;
  min-width: 1008px;
  max-width: 1008px;
  position: absolute;
  top: 0;
  left: 0.5rem;
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
    background-color: lightgray;
  border: 1px solid black;
  border-radius: 4px;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: row; 
  min-width: 228px;
  min-height: 54px;
  border-radius: 4px;
`;

const SquarrelTitle = styled.div`
    font-size: 1.9rem;    
    text-align: right;
    font-weight: 800;
    flex-grow: 1;
    line-height: 54px;
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
 background-color: orange;
 min-width: 400px;
 width: 40%;
 height: 80%;
 margin: .5rem;
 padding: 0.3rem;
 border-radius: 4px;
 border: 2px solid darkorange;
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

const LeftSide = styled.div`
grid-row: 2 / span 4;   
padding: .5rem;
  margin: .5rem; 
  min-width: 100px;
  width: 100%;
  height: 100%;
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

//Buttons

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 1.5rem;
  width: 15rem;
  height: 3rem;
  align-content: center;
  align-items: flex-start;
  border-radius: 4px;
`;

const StandardButton = styled.button`
font-size: 0.95rem;
font-weight: 400; 
margin: 0.2rem;
padding: 0.2rem;
width: 4rem;
min-width: 3.5rem;
min-height: 2rem;
border-radius: 4px;
border: 1px solid darkorange;
background-color: white;
`;

const BiggerButton = styled(StandardButton)`
width: 6.2rem;
Height: 2.5rem;
margin: .2rem;
padding: .2rem;
`;

const SetInfo = styled.p`
font-size: 0.95rem;
width: 6rem;
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


const SquareSectionStatic = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 0.12rem;
  width: 936px;
  height: 936px;
  margin: .5rem;
  align-items: center;
  border-radius: 4px;
  justify-content: center;
`;

const StyledSelect = styled.select`
 padding: .3rem;
  margin: .3rem; 
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
    SquareSectionStatic,
    StatLine,
    Stats,
    StyledSelect,
    StandardButton,
  SquarrelTitle, 
    BiggerButton,
    DebugButton,
    DeleteButton,
  LeftSide,
    SetInfo
  }