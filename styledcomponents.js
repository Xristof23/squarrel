import styled from "styled-components";

const StyledMain = styled.main`
 display: grid;
  grid-template-columns: 228px 934px;
  grid-template-rows: 120px 228px 228px 228px 228px;
  width: 98%;
  position: absolute;
  top: 0;
  left: 0.5rem;
  margin: .2rem;
  gap: 8px;
  flex-direction: row;
  padding: 0.5rem;
  margin: .5rem auto .5rem; 
  align-content: center;
`;

const UpperSection = styled.section`
grid-column: 1 / span 2; 
display: flex;
flex-direction: column; 
  margin: .5rem; 
  width: 100%;
  height: 100%;
  border-radius: 4px;
`;

const TitleContainer = styled.div`
display: flex;
flex-direction: row; 
  width: 100%;
  height: 60%;
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

const OptionsContainer = styled.div`
  padding: .5rem;
  margin: .5rem; 
  min-width: 100px;
  width: 100%;
  height: 100%;
  background-color: lightgray;
  border: 1px solid black;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: .5rem;
  margin: -.3rem auto 0;
  min-height: 40px;
  width: 14rem;
  height: 100%;
  align-content: center;
  align-items: center;
  border-radius: 4px;
`;

const MessageSlot = styled.div`
 color: black;
 font-weight: 400;
 background-color: darkorange;
 width: 80%;
 height: 100%;
 margin: 0.8rem auto .5rem;
 padding: 0.3rem;
 border-radius: 4px;
 border: 1px solid black;
margin: 0 auto 0; 
`;

const Stats = styled.div`
 display: flex;
flex-direction: row;
text-align: left; 
color: black;
padding: .5rem; 
width: 70%;
height: 90%;
border-radius: 4px;
`;

const SmallerHeadline = styled.h2`
font-size: 1.05rem;
font-weight: 600; 
margin: 0 0 0.4rem;
`;

const StatLine = styled.p`
margin: 1.5rem 0 0 -2.5rem;
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

const StandardButton = styled.button`
font-size: 1rem;
font-weight: 500; 
margin: 0.2rem;
padding: 0.2rem;
min-width: 3rem;
min-height: 2rem;
`;

const StyledInput = styled.input`
min-width: 3.5rem;
`;



export {
    ButtonContainer,
    StyledMain,
    OptionsContainer,
    ControlsContainer,
    TitleContainer,
    UpperSection,
    MessageSlot,
    SmallerHeadline,
    SquareSectionStatic,
    StatLine,
    Stats,
    StyledSelect,
    StyledInput,
    StandardButton
}