export default class Timer {
  constructor(endDate, timeZone) {
    this.timeZone = timeZone
    this.deadLine = endDate.substring(0, 10) + 'T' + endDate.substring(11)
  }

  diffCalc() {
    const nowDate = new Date()
    const nowDateString = nowDate.toLocaleString('en-US', { timeZone: this.timeZone })

    return (Date.parse(this.deadLine) - Date.parse(nowDateString)) / 1000
  }

  timeDiffCalc() {
    let diffInMilliSeconds = this.diffCalc()
    if (diffInMilliSeconds < 0) return false

    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;

    const seconds = diffInMilliSeconds - minutes * 60;

    let difference = '';
    // if (days > 0) {
    //   difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    // }

    difference += this.formatNumberString(hours) + ':'
    difference += this.formatNumberString(minutes) + ':'
    difference += this.formatNumberString(seconds);

    return difference;
  }

  formatNumberString(number) {
    number = number.toString()
    return number.length === 1 ? '0' + number : number
  }
}