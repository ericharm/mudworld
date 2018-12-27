import React from 'react'
import User from '../User.js'
import Tile from '../Tile.js'
import Door from '../Door.js'
import MapMessenger from '../MapMessenger.js'

class MiniMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stage: null,
      tiles: [],
      users: [],
      locationId: null
    }
  }

  addControls () {
    window.addEventListener('keydown', (event) => {
      if (event.target !== document.getElementById('new-message')) {
        if (['w', 'a', 's', 'd'].indexOf(event.key) > -1) {
          window.post(window.paths.controlsPath, {
            user: window.user.id,
            instruction: event.key
          }, (res) => {
            console.log(res)
          })
        }
      }
    })
  }

  createStage () {
    let stage = new window.createjs.Stage('minimap')
    stage.scale = 1.5
    stage.regX = stage.regY = -100
    return stage
  }

  setupTiles () {
    this.state.tiles.forEach((tile) => {
      Tile(this.state.stage, tile)
    })
  }

  addDoors () {
    this.state.doors.forEach((door) => {
      Door(this.state.stage, door)
    })
  }

  addUsers () {
    this.state.users.forEach((user) => {
      this.setState({
        users: this.state.users.concat(User(this.state.stage, user))
      })
    })
  }

  removeUser (id) {
    console.log('remove', id)
    const user = this.state.users.find((user) => {
      return user.id === id
    })
    this.state.stage.removeChild(user.avatar)
    this.state.stage.update()
    const users = this.state.users.filter((user) => {
      return user.id !== id
    })
    this.setState({ users })
  }

  loadRoom (locationId) {
    const startLocationPath = this.props.context.paths.locationsPath + locationId
    window.get(startLocationPath).then((res) => {
      const data = res.data
      this.setState({
        tiles: data.tiles, doors: data.doors, roomName: data.name, users: data.users, locationId: data.id
      }, () => {
        this.setupTiles()
        this.addDoors()
        this.addUsers()
        this.state.stage.update()
      })
    })
  }

  clearStage () {
    this.state.stage.removeAllChildren()
  }

  subscribe () {
    window.App.mapMessages = window.App.cable.subscriptions.create('MapChannel', {
      received: (data) => {
        MapMessenger.handle(data, this)
      }
    })
  }

  componentDidMount () {
    const stage = this.createStage()
    this.setState({ stage }, () => {
      this.loadRoom(this.props.context.user.location_id)
    })
    this.addControls()
    this.subscribe()
  }

  render () {
    return (
      <React.Fragment>
        <div id='room-name'>{ this.state.roomName }</div>
        <canvas id='minimap' width='1400' height='800' />
      </React.Fragment>
    )
  }
}

export default MiniMap
