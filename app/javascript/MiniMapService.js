// import { setUsers, setCurrentRoom } from './Store.jsx'
// import Config from './Config.js'
// import Door from './Door.js'
// // import MapMessenger from './MapMessenger.js'
// import Tile from './Tile.js'
// import User from './User.js'
// const nipplejs = require('nipplejs')
//
// const joystickControls = {
//   'dir:up': 'w',
//   'dir:left': 'a',
//   'dir:down': 's',
//   'dir:right': 'd'
// }
//
// const MiniMapService = ({ state, dispatch }) => {
//   const addUsers = (users) => {
//     dispatch(setUsers(
//       users.reduce((accum, user) => {
//         accum[user.id] = User(state.stage, user)
//         return accum
//       }, {})
//     ))
//   }
//
//   const addTiles = ({ tiles, neighborTiles }) => {
//     tiles.forEach((tile) => {
//       Tile(state.stage, tile)
//     })
//     neighborTiles.forEach((tile) => {
//       Tile(state.stage, tile, { obscured: true })
//     })
//     state.stage.update()
//   }
//
//   const addDoors = (doors) => {
//     doors.forEach((door) => {
//       Door(state.stage, door)
//     })
//   }
//
//   const center = () => {
//     const canvas = document.getElementById('minimap-canvas')
//     const width = canvas.getBoundingClientRect().width
//     const height = canvas.getBoundingClientRect().height
//     const ratio = width / canvas.width
//     const center = { x: width * ratio, y: height * ratio }
//     const user = {
//       x: state.currentUser.x * Config.TILE_SIZE,
//       y: state.currentUser.y * Config.TILE_SIZE
//     }
//     const x = (center.x - user.x) * -1
//     const y = (center.y - user.y) * -1
//     state.stage.regX = x
//     state.stage.regY = y
//     state.stage.update()
//   }
//
//   const clearStage = () => {
//     state.stage.removeAllChildren()
//   }
//
//   const enableControls = () => {
//     enableKeyboardControls()
//     enableJoystick()
//   }
//
//   const enableJoystick = () => {
//     var nextMove = null
//     var currentDistance = 0
//     nipplejs.create({
//       zone: document.querySelector('#minimap'),
//       color: 'blue',
//       multitouch: true
//     }).on('end', function (evt, data) {
//       if (nextMove && currentDistance > 10) move(joystickControls[nextMove])
//       nextMove = null
//       currentDistance = 0
//     }).on('dir:up dir:left dir:down dir:right', function (evt, data) {
//       nextMove = evt.type
//     }).on('move', function (evt, data) {
//       currentDistance = data.distance
//     })
//   }
//
//   const enableKeyboardControls = () => {
//     window.addEventListener('keydown', (event) => {
//       if (event.target !== document.getElementById('new-message')) {
//         if (['w', 'a', 's', 'd'].indexOf(event.key) > -1) {
//           move(event.key)
//         }
//       }
//     })
//   }
//
//   const loadRoom = (locationId) => {
//     // console.log('load room')
//     // const user = Object.assign(state.currentUser, { location_id: locationId })
//     // // update the current user's location id whenever loading a new room
//     // // maybe this should be a new method that doesn't replace the whole user
//     // dispatch(setCurrentUser(user))
//     const startLocationPath = state.paths.locationsPath + locationId
//     window.get(startLocationPath).then((res) => {
//       const data = res.data
//       console.log('loadRoom', data)
//       dispatch(setCurrentRoom(data))
//       clearStage()
//       addTiles({ tiles: data.tiles, neighborTiles: data.neighbor_tiles })
//       addDoors(data.doors)
//       addUsers(data.users)
//       center()
//       state.stage.update()
//     })
//   }
//
//   const move = (key) => {
//     const controlsPath = state.paths.controlsPath
//     window.post(controlsPath, { user: state.currentUser.id, instruction: key }).then((res) => {
//       console.log(res)
//     })
//   }
//
//   return { addUsers, clearStage, enableControls, loadRoom }
// }
//
// export default MiniMapService
