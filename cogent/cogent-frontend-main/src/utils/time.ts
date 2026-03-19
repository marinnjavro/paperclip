export const getDifferenceInSeconds = (startDate: Date, endDate: Date) =>
  Math.abs(startDate.getTime() - endDate.getTime()) / 1000

export const secondsToMinutesAndSeconds = (totalSeconds: number) => {
  var minutes = Math.floor(totalSeconds / 60)
  var seconds = Math.floor(totalSeconds % 60)

  return `${minutes}:${seconds}`
}

export function formatTime(time: number) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600)
  var mins = ~~((time % 3600) / 60)
  var secs = ~~time % 60

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = ''
  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }
  ret += '' + String(mins).padStart(2, '0') + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs

  return ret
}
