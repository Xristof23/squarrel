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


export function sortEntriesLowToHigh(a, b) {
    if (a.gameTime < b.gameTime) {
      return -1;
    }
    if (a.gameTime > b.gameTime) {
      return 1;
    }
    return 0;
  }

 export function sortEntriesHighToLow(a, b) {
    if (a.gameTime > b.gameTime) {
      return -1;
    }
    if (a.gameTime < b.gameTime) {
      return 1;
    }
    return 0;
  }

export function formatDuration(number, resolution) {
    const allSeconds = Math.floor(number / 1000);
    const minutes = formatTo2digits(Math.floor(allSeconds / 60));
    const seconds = formatTo2digits(Math.floor(allSeconds % 60));
    const tenth = formatTo1digit(Math.round((number % 1000) / 100));
    const realHundredth = formatTo2digits(Math.round((number % 1000)/10));
    const minutesAndSeconds = `${minutes}:${seconds}`;
    const formattedDuration = resolution===2? `${minutesAndSeconds},${realHundredth}`: resolution===1?`${minutesAndSeconds},${tenth}`: minutesAndSeconds;
    return formattedDuration;
}
