import { alarm } from './alarm.js'
import { state } from './state.js'

const minutesElem = document.querySelector('.time__minutes')
const secondsElem = document.querySelector('.time__seconds')

const showTime = (seconds) => {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  minutesElem.textContent = min < 10 ? `0${min}` : min
  secondsElem.textContent = sec < 10 ? `0${sec}` : sec
}

export const startTimer = () => {
  state.timeLeft--

  showTime(state.timeLeft)

  if (state.timeLeft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 100)
  }

  if (state.timeLeft <= 0) {
    alarm()
  }
}
