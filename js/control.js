import { state } from './state.js'
import { showTime, startTimer } from './timer.js'

const btnStart = document.querySelector('.control__btn_start')
const btnStop = document.querySelector('.control__btn_stop')
const navigationBtns = document.querySelectorAll('.navigation__btn')

export const changeActiveBtn = (dataUse) => {
  if (dataUse) {
    navigationBtns.forEach((btn) => {
      if (btn.dataset.use === dataUse) {
        btn.classList.add('navigation__btn_active')
      } else {
        btn.classList.remove('navigation__btn_active')
      }
    })
  }

  navigationBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      navigationBtns.forEach((btn) => {
        btn.classList.remove('navigation__btn_active')
      })

      switch (btn.dataset.use) {
        case 'work':
          btn.classList.add('navigation__btn_active')
          state.status = btn.dataset.use
          stop()
          break
        case 'break':
          btn.classList.add('navigation__btn_active')
          state.status = btn.dataset.use
          stop()
          break
        case 'relax':
          btn.classList.add('navigation__btn_active')
          state.status = btn.dataset.use
          stop()
          break
      }
    })
  })
}

export const stop = () => {
  clearTimeout(state.timerId)
  state.isActive = false
  btnStart.textContent = 'Старт'
  state.timeLeft = state[state.status] * 60
  showTime(state.timeLeft)
}

export const initControl = () => {
  btnStart.addEventListener('click', () => {
    if (state.isActive) {
      clearTimeout(state.timerId)
      state.isActive = false
      btnStart.textContent = 'Старт'
    } else {
      state.isActive = true
      btnStart.textContent = 'Пауза'
      startTimer()
    }
  })

  btnStop.addEventListener('click', stop)
  showTime(state.timeLeft)
}

changeActiveBtn()
