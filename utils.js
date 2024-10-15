export   function calculatePoints(timespan, gameSize, rounds) {
  // const timeToBeat = gameSize === 24 ? 50000 : gameSize === 20 ? 40000 : 30000;
  const timeToBeat = 30000 + (gameSize - 16) * 2000;
  console.log(timeToBeat);
  const timeBonus = timespan < timeToBeat ? Math.round((timeToBeat - timespan) / 33.3) : 0;
  const roundsToBeat = Math.round(gameSize * 0.9);
  const roundBonusArray = [0, 1, 2, 4, 8, 16, 32, 64]
  const roundBonus = rounds < roundsToBeat ? roundBonusArray[(roundsToBeat - rounds)] * 100 : 0
  const roundMalus = rounds > roundsToBeat ? (rounds - roundsToBeat) * 15 : 0;
  const completeScore = gameSize * 15 + timeBonus + roundBonus - roundMalus;
  return completeScore;
}

export function formatTo2digits(number) {
    const formattedNumber = number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
                })
    return formattedNumber;
}

export function formatTo1digit(number) {
    const formattedNumber = number.toLocaleString('en-US', {
        minimumIntegerDigits: 1,
        useGrouping: false
                })
    return formattedNumber;
}


export function sortEntries(array, Criterium, lowToHigh) {
  function sortLowToHigh(a,b) {
    if (a[Criterium]  < b[Criterium]) {
      return -1;
    }
    if (a[Criterium]  > b[Criterium]) {
      return 1;
    }
    return 0;
  }
  function sortHighToLow(a,b) {
    if (a[Criterium]  > b[Criterium]) {
      return -1;
    }
    if (a[Criterium]  < b[Criterium]) {
      return 1;
    }
    return 0;
  }
  const sortedArray = array.toSorted(lowToHigh? sortLowToHigh : sortHighToLow);
  return sortedArray;
  }

export function formatDuration(number, resolution) {
    const allSeconds = Math.floor(number / 1000);
    const minutes = formatTo2digits(Math.floor(allSeconds / 60));
    const seconds = formatTo2digits(Math.floor(allSeconds % 60));
    const tenth = (Math.floor((number % 1000) / 100));
    const realHundredth = formatTo2digits(Math.floor((number % 1000)/10));
    const minutesAndSeconds = `${minutes}:${seconds}`;
    const formattedDuration = resolution===2? `${minutesAndSeconds},${realHundredth}`: resolution===1?`${minutesAndSeconds},${tenth}`: minutesAndSeconds;
    return formattedDuration;
}
