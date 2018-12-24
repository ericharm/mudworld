import React from 'react'
import User from '../User.js'
import Tile from '../Tile.js'
import Config from '../Config.js'
const DOOR_COLOR = Config.DOOR_COLOR
const TILE_SIZE = Config.TILE_SIZE

const Door = (stage, door) => {
  const rect = new window.createjs.Shape()
  rect.x = door.x * TILE_SIZE
  rect.y = door.y * TILE_SIZE
  rect.graphics.beginStroke(DOOR_COLOR).drawRect(
    0, 0, TILE_SIZE, TILE_SIZE
  )
  stage.addChild(rect)
  return rect
}

class MiniMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      stage: null,
      tiles: [],
      users: []
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

  loadRoom (locationId) {
    window.get(window.paths.locationsPath + locationId).then((res) => {
      const data = res.data
      this.setState({
        tiles: data.tiles, doors: data.doors, roomName: data.name, users: data.users
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
        // MapMessenger.respond(data)
        console.log(data)
        if (data.type === 'move') {
          let user = this.state.users.find((user) => {
            return user.id === data.user.id
          })
          user.moveTo(data.user.x, data.user.y)
        }
        if (data.type === 'exit') {
          console.log('user', data.user.id, 'left.')
          // const user = this.state.users.find((user) => { return user.id === data.user.id })
          // this.state.stage.remove()
        }
        if (data.type === 'enter') {
          console.log('user', data.user.id, 'entered.')
          if (data.user.id === window.user.id) {
            this.clearStage()
            this.loadRoom(data.user.location_id)
          } else {
            // this.setState({ users: this.state.users.concat(User(data.user)) })
          }
        }
      }
    })
  }

  componentDidMount () {
    const stage = this.createStage()
    this.setState({ stage }, () => {
      this.loadRoom(window.user.location_id)
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
