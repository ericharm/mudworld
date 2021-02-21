// import User from './User.js'
// import MiniMapService from './MiniMapService.js'
// import { moveUser } from './Store.jsx'

// socket messages from the minimap channel get handled here
// maybe change the name to MiniMapChannelObserver
const MapMessenger = ({ state }) => {
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
        if (user) user.moveTo(data.user.x, data.user.y)
        // if (user.id === state.currentUser.id) {
        // dispatch(setCurrentUser(user))
        // MiniMapService({ state, dispatch }).center()
        // }
        // }
      }
      return state
    },

    enter: (data) => {
      // if (data.user.id === state.currentUser.id) {
      //   MiniMapService({ state, dispatch }).clearStage()
      //   MiniMapService({ state, dispatch }).loadRoom(data.user.location_id)
      // dispatch(addUsers(User(state.stage, data.user)))
      // } else if (data.location_id === map.state.locationId) {
      // }
      // const messenger = map.props.store.messenger
      // messenger.mapAction({ message: data.user.username + ' entered.', user: data.user })
      //   if (map.state.users.find((user) => { return user.id === data.user.id })) return null
      //   else {
      //     map.setState({
      //       users: map.state.users.concat(User(map.state.stage, data.user))
      //     }, () => { map.state.stage.update() })
      //   }
      // }
      return state
    },

    exit: (data) => {
      if (data.user.location_id === state.currentRoom.id) {
        // map.removeUser(data.user.id)
        const user = state.users[data.user.id]
        state.stage.removeChild(user.avatar)
        // state.stage.update()
        // stage.update()
        // setUsers(users.filter((user) => {
        //   return user.id !== id
        // }))
      }
      // const messenger = map.chatMessenger()
      // messenger.mapAction({ message: data.user.username + ' left the room.', user: data.user })
      // }
      return state
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
