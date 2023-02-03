import { alarm } from './alarm.js'
import { changeActiveBtn } from './control.js'
import { state } from './state.js'
import { showTodo, updateTodo } from './todo.js'

const minutesElem = document.querySelector('.time__minutes')
const secondsElem = document.querySelector('.time__seconds')

export const showTime = (seconds) => {
  const min = Math.floor(seconds / 60)
  const sec = seconds % 60
  minutesElem.textContent = min < 10 ? `0${min}` : min
  secondsElem.textContent = sec < 10 ? `0${sec}` : sec
}

export const startTimer = () => {
  const countDown = new Date().getTime() + state.timeLeft * 1000

  state.timerId = setInterval(() => {
    state.timeLeft -= 1
    showTime(state.timeLeft)

    if (!(state.timeLeft % 5)) {
      const now = new Date().getTime()
      state.timeLeft = Math.floor((countDown - now) / 1000)
      console.log('синхронизация времени')
    }

    if (state.timeLeft > 0 && state.isActive) {
      return
    }

    clearTimeout(state.timerId)

    if (state.status === 'work') {
      state.activeTodo.pomodoro += 1
      updateTodo(state.activeTodo)

      if (state.activeTodo.pomodoro % state.count) {
        state.status = 'break'
      } else {
        state.status = 'relax'
      }
    } else {
      state.status = 'work'
    }

    alarm()
    state.timeLeft = state[state.status] * 60
    changeActiveBtn(state.status)
    showTodo()
    startTimer()
  }, 1000)
}
