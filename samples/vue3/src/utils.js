const formatTime = floatTime => {
  const time = Math.floor(floatTime)
  const second = (time % 60).toString().padStart(2, '0')
  const minute = (((time - second) / 60) % 60).toString().padStart(2, '0')
  const hour = (time - second - minute * 60) / 60 / 60
  return [].concat(hour > 0 ? hour : [], [minute, second]).join(':')
}

export {formatTime}