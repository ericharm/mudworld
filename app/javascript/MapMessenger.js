import User from './User.js'

// socket messages from the minimap channel get handled here
// maybe change the name to MiniMapChannelObserver
const MapMessenger = {
  handle: (data, map) => {
    const action = MapMessenger[data.type]
    if (action) action(data, map)
    else console.log('Invalid action:', data.type)
  },

  build: (data, map) => {
    if (map.state.locationId === data.user.location_id) map.loadRoom(data.user.location_id)
  },

  dig: (data, map) => {
    if (map.state.locationId === data.tile.location_id) map.loadRoom(data.tile.location_id)
  },

  move: (data, map) => {
    if (data.user.location_id === map.state.locationId) {
      let user = map.state.users.find((user) => {
        return user.id === data.user.id
      })
      if (user) {
        user.moveTo(data.user.x, data.user.y)
        if (user.id === map.props.store.user.id) {
          map.props.updateStore({ user })
          map.center()
        }
      }
    }
  },

  enter: (data, map) => {
    if (data.user.id === map.props.store.user.id) {
      map.clearStage()
      map.loadRoom(data.user.location_id)
    } else if (data.location_id === map.state.locationId) {
      const messenger = map.props.store.messenger
      messenger.mapAction({ message: data.user.username + ' entered.', user: data.user })
      if (map.state.users.find((user) => { return user.id === data.user.id })) return null
      else {
        map.setState({
          users: map.state.users.concat(User(map.state.stage, data.user))
        }, () => { map.state.stage.update() })
      }
    }
  },

  exit: (data, map) => {
    if (data.user.location_id === map.state.locationId) {
      map.removeUser(data.user.id)
      const messenger = map.chatMessenger()
      messenger.mapAction({ message: data.user.username + ' left the room.', user: data.user })
    }
  },

  connection: (data, map) => {
    const messenger = map.chatMessenger()
    messenger.mapAction({ message: data.user.username + ' connected.', user: data.user })
    MapMessenger.enter(data, map)
  },

  disconnection: (data, map) => {
    const messenger = map.chatMessenger()
    messenger.mapAction({ message: data.user.username + ' disconnected.', user: data.user })
    MapMessenger.exit(data, map)
  }
}

export default MapMessenger
