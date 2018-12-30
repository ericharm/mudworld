import React from 'react'
import User from '../User.js'
import Tile from '../Tile.js'
import Door from '../Door.js'
import Config from '../Config.js'
import MapMessenger from '../MapMessenger.js'
const nipplejs = require('nipplejs')

class MiniMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stage: null,
      tiles: [],
      neighborTiles: [],
      users: [],
      locationId: null
    }
    this.joystickControls = {
      'dir:up': 'w',
      'dir:left': 'a',
      'dir:down': 's',
      'dir:right': 'd'
    }
  }

  addControls () {
    window.addEventListener('keydown', (event) => {
      if (event.target !== document.getElementById('new-message')) {
        if (['w', 'a', 's', 'd'].indexOf(event.key) > -1) {
          this.move(event.key)
        }
      }
    })
    this.enableJoystick()
  }

  enableJoystick () {
    var self = this
    var nextMove = null
    var currentDistance = 0
    nipplejs.create({
      zone: document.querySelector('#minimap'),
      color: 'blue',
      multitouch: true
    }).on('end', function (evt, data) {
      if (nextMove && currentDistance > 10) self.move(self.joystickControls[nextMove])
      nextMove = null
      currentDistance = 0
    }).on('dir:up dir:left dir:down dir:right', function (evt, data) {
      nextMove = evt.type
    }).on('move', function (evt, data) {
      currentDistance = data.distance
    })
  }

  move (key) {
    const controlsPath = this.props.store.paths.controlsPath
    window.post(controlsPath, { user: this.props.store.user.id, instruction: key }).then((res) => {
      // console.log(res)
    })
  }

  createStage () {
    let stage = new window.createjs.Stage('minimap-canvas')
    stage.scale = 1.5
    return stage
  }

  setupTiles () {
    this.state.tiles.forEach((tile) => {
      Tile(this.state.stage, tile)
    })
    this.state.neighborTiles.forEach((tile) => {
      Tile(this.state.stage, tile, { obscured: true })
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
    const user = Object.assign(this.props.store.user, { location_id: locationId })
    this.props.updateStore({ user })
    const startLocationPath = this.props.store.paths.locationsPath + locationId
    window.get(startLocationPath).then((res) => {
      const data = res.data
      this.setState({
        tiles: data.tiles,
        neighborTiles: data.neighbor_tiles,
        doors: data.doors,
        roomName: data.name,
        users: data.users,
        locationId: data.id
      }, () => {
        this.setupTiles()
        this.addDoors()
        this.addUsers()
        this.center()
        this.state.stage.update()
      })
    })
  }

  center () {
    const canvas = document.getElementById('minimap-canvas')
    const width = canvas.getBoundingClientRect().width
    const height = canvas.getBoundingClientRect().height
    const ratio = width / canvas.width
    const center = { x: width * ratio, y: height * ratio }
    const user = {
      x: this.props.store.user.x * Config.TILE_SIZE,
      y: this.props.store.user.y * Config.TILE_SIZE
    }
    const x = (center.x - user.x) * -1
    const y = (center.y - user.y) * -1
    this.state.stage.regX = x
    this.state.stage.regY = y
    this.state.stage.update()
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
      this.loadRoom(this.props.store.user.location_id)
    })
    this.addControls()
    this.subscribe()
  }

  render () {
    return (
      <React.Fragment>
        <div id='room-name'>{ this.state.roomName }</div>
        <div id='minimap'>
          <canvas id='minimap-canvas' width='1400' height='800' />
        </div>
      </React.Fragment>
    )
  }
}

export default MiniMap
