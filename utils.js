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
