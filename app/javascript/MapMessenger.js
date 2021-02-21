// import User from './User.js'
// import MiniMapService from './MiniMapService.js'
import { setCurrentUser, setRoomies } from './Store.jsx'
import Stage from './Stage.js'

// socket messages from the minimap channel get handled here
// maybe change the name to MiniMapChannelObserver
const MapMessenger = ({ state, dispatch }) => {
  const messenger = {
    handle: (data) => {
      const action = messenger[data.type]
      if (action) action(data)
      else console.log('Invalid action:', data.type)
    },

    build: (data) => {
      if (state.currentRoom.locationId === data.user.location_id) console.log('build')// map.loadRoom(data.user.location_id)
    },

    dig: (data) => {
      if (state.currentRoom.locationId === data.tile.location_id) console.log('dig')// map.loadRoom(data.tile.location_id)
    },

    move: (data) => {
      // ignore users moving in other rooms
      if (data.user.location_id === state.currentRoom.id) {
        const user = state.users[data.user.id]
        if (user) {
          user.moveTo(data.user.x, data.user.y)
          if (user.id === state.currentUser.id) {
            dispatch(setCurrentUser(user))
            Stage.center(user)
          }
        }
      }
    },

    enter: (data) => {
      console.log('enter')
      if (data.user.id === state.currentUser.id) {
        Stage.clear()
        Stage.loadRoom({ state, dispatch, locationId: data.user.location_id })
      // const messenger = map.props.store.messenger
      // messenger.mapAction({ message: data.user.username + ' entered.', user: data.user })
      //   if (map.state.users.find((user) => { return user.id === data.user.id })) return null
      //   else {
      //     map.setState({
      //       users: map.state.users.concat(User(map.state.stage, data.user))
      //     }, () => { map.state.stage.update() })
      //   }
      // }
      }
    },

    exit: (data) => {
      if (data.user.location_id === state.currentRoom.id) {
        const user = state.users[data.user.id]
        Stage.removeChild(user.avatar)
        const users = state.users
        delete users[user.id]
        dispatch(setRoomies(users))
      }
      // const messenger = map.chatMessenger()
      // messenger.mapAction({ message: data.user.username + ' left the room.', user: data.user })
      // }
    },

    connection: (data) => {
      // const messenger = map.chatMessenger()
      // messenger.mapAction({ message: data.user.username + ' connected.', user: data.user })
      messenger.enter(data)
    },

    disconnection: (data, map) => {
      // const messenger = map.chatMessenger()
      // messenger.mapAction({ message: data.user.username + ' disconnected.', user: data.user })
      MapMessenger.exit(data, map)
    }
  }

  return messenger
}

export default MapMessenger
