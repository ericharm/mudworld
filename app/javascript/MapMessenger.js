import User from './User.js'

const MapMessenger = {
  handle: (data, map) => {
    const action = MapMessenger[data.type]
    if (action) action(data, map)
    else console.log('Invalid action:', data.type)
  },
  move: (data, map) => {
    if (data.user.location_id === map.state.locationId) {
      let user = map.state.users.find((user) => {
        return user.id === data.user.id
      })
      if (user) user.moveTo(data.user.x, data.user.y)
    }
  },
  enter: (data, map) => {
    console.log('user', data.user.id, 'entered location', data)
    if (data.user.id === map.props.context.user.id) {
      console.log('current user entered a new room')
      map.clearStage()
      map.loadRoom(data.user.location_id)
    } else if (data.location_id === map.state.locationId) {
      const messenger = map.props.context.messenger
      messenger.message({ message: data.user.username + ' entered.' })
      console.log('someone else entered current user\'s room')
      console.log(map.state.users.length)
      console.log(map.state.stage.children.length)
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
    }
  },
  connection: (data, map) => {
    console.log('somebody connected', data)
    MapMessenger.enter(data, map)
  },
  disconnection: (data, map) => {
    console.log('somebody disconnected', data)
    MapMessenger.exit(data, map)
  }
}

export default MapMessenger
