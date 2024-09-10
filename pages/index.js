import styled from "styled-components";
import { useEffect, useState } from "react";


const ProgressBar = styled.div`
  width: 42%;
  max-width: 200px;
  height: 0.8rem;
  border: 1px solid var(--text-on-bright);
  position: relative;
  display: inline-block;
  margin: 0 0.5rem 0 0;
  border-radius: 6px;

  &::after {
    content: "";
    position: absolute;
    height: 100%;
    width: ${({ $progress, $showDetails }) =>
      $showDetails ? `${$progress}%` : "0"};
    background: var(--text-on-bright);
    border-radius: 6px;
    transition: width 400ms;
    transition-delay: ${({ $showDetails }) => ($showDetails ? "500ms" : "0ms")};
  }
`;



const SquarrelTitle = styled.h1`
  text-align: center;
  font-weight: 800;
  line-height: 3.6rem;
  font-size: 3.5rem;
  padding: 2rem auto 2rem;  
  margin:  2rem auto 2rem;
`;

const MainFlexContainer = styled.div`
  display: flex;

  flex-direction: column;
  padding: 0.5rem;
  min-height: 400px;
  height: 100%;
  width: 100%;
  align-content: center;
  align-items: center;
  border: 1px solid black;
 
`;

const SquareSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 0.2rem;
  // width: 90vw;
  width: 600px;
height: 600px;
  margin: auto;
  align-items: center;
 
  border-radius: 2px;
  justify-content: center;
`;
const LilSquare = styled.div`
text-align: center;  
  padding: 2.7rem;
  min-height: 100px;
  height: 100%;
  width: 100%;
 border: 2px solid orange;
  border-radius: 2px;
   line-height: 3rem;
  font-size: 3rem;
`;



export default function HomePage() {
  return (
    <>
      <SquarrelTitle>🟧 S Q U A R R E L 🟧</SquarrelTitle>
      <SquareSection>
        <LilSquare>1</LilSquare>
        <LilSquare>2</LilSquare>
        <LilSquare>3</LilSquare>
        <LilSquare>4</LilSquare>
        <LilSquare>5</LilSquare>
        <LilSquare>6</LilSquare>
        <LilSquare>7</LilSquare>
        <LilSquare>8</LilSquare>
        <LilSquare>9</LilSquare>
        <LilSquare>10</LilSquare>
        <LilSquare>11</LilSquare>
        <LilSquare>12</LilSquare>
        <LilSquare>13</LilSquare>
        <LilSquare>14</LilSquare>
        <LilSquare>15</LilSquare>
        <LilSquare>16</LilSquare>
    

      </SquareSection>
    </>
  );
}
