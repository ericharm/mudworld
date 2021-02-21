import { setCurrentRoom, setRoomies } from './Store.jsx'
import { get } from './Http.js'
import Config from './Config.js'
import Tile from './Tile.js'
import Door from './Door.js'
import User from './User.js'

const Stage = () => {
  let stage = null //  new window.createjs.Stage('minimap-canvas')
  // stage.scale = 1.5

  const self = {
    set: (stage_) => {
      stage = stage_
    },

    loadRoom: ({ state, dispatch, locationId }) => {
      const path = state.paths.locationsPath + locationId
      get(path).then((res) => {
        const data = res.data
        dispatch(setCurrentRoom(data))
        self.clear()
        self.addTiles({ tiles: data.tiles, neighborTiles: data.neighbor_tiles })
        self.addDoors(data.doors)
        const roomies = self.addRoomies(data.users)
        dispatch(setRoomies(roomies))
        self.center(state.currentUser)
      })
    },

    clear: () => {
      stage.removeAllChildren()
    },

    addTiles: ({ tiles, neighborTiles }) => {
      tiles.forEach((tile) => {
        Tile(stage, tile)
      })
      neighborTiles.forEach((tile) => {
        Tile(stage, tile, { obscured: true })
      })
    },

    addDoors: (doors) => {
      doors.forEach((door) => {
        Door(stage, door)
      })
    },

    addRoomies: (roomies) => {
      // roomies.forEach((user) => {
      //   User(stage, user)
      // })
      return roomies.reduce((accum, user) => {
        accum[user.id] = User(stage, user)
        return accum
      }, {})
    },

    center: (currentUser) => {
      const canvas = document.getElementById('minimap-canvas')
      const width = canvas.getBoundingClientRect().width
      const height = canvas.getBoundingClientRect().height
      const ratio = width / canvas.width
      const center = { x: width * ratio, y: height * ratio }
      const user = {
        x: currentUser.x * Config.TILE_SIZE,
        y: currentUser.y * Config.TILE_SIZE
      }
      const x = (center.x - user.x) * -1
      const y = (center.y - user.y) * -1
      stage.regX = x
      stage.regY = y
      stage.update()
    },

    removeChild: (child) => {
      stage.removeChild(child)
      stage.update()
    }
  }

  return self
}

const stage = Stage()
export default stage
