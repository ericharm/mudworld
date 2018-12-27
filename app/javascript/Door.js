import Config from './Config.js'
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

export default Door
