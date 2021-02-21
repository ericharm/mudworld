import { post } from './Http.js'
const nipplejs = require('nipplejs')

export const enableControls = ({ controlsPath, user }) => {
  const joystickControls = {
    'dir:up': 'w',
    'dir:left': 'a',
    'dir:down': 's',
    'dir:right': 'd'
  }

  const enableJoystick = () => {
    var nextMove = null
    var currentDistance = 0
    nipplejs.create({
      zone: document.querySelector('#minimap'),
      color: 'blue',
      multitouch: true
    }).on('end', function (evt, data) {
      if (nextMove && currentDistance > 10) move(joystickControls[nextMove])
      nextMove = null
      currentDistance = 0
    }).on('dir:up dir:left dir:down dir:right', function (evt, data) {
      nextMove = evt.type
    }).on('move', function (evt, data) {
      currentDistance = data.distance
    })
  }

  const enableKeyboardControls = () => {
    window.addEventListener('keydown', (event) => {
      if (event.target !== document.getElementById('new-message')) {
        if (['w', 'a', 's', 'd'].indexOf(event.key) > -1) {
          move(event.key)
        }
      }
    })
  }

  const move = (key) => {
    post(controlsPath, { user: user.id, instruction: key }).then((res) => {
      console.log(res)
    })
  }

  enableKeyboardControls()
  enableJoystick()
}
