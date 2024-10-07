export function formatTo2digits(number) {
    const formattedNumber = number.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
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


export function formatDuration(number, highRes) {
    const allSeconds = Math.floor(number / 1000);
    const minutes = formatTo2digits(Math.floor(allSeconds / 60));
    const seconds = formatTo2digits(Math.floor(allSeconds % 60));
    const realHundredth = formatTo2digits(Math.round((number % 1000)/10));
    const minutesAndSeconds = `${minutes}:${seconds}`;
    const formattedDuration = highRes? `${minutesAndSeconds},${realHundredth}`: minutesAndSeconds;
    return formattedDuration;
}
