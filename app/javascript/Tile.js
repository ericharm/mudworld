import Config from './Config.js'
const TILE_SIZE = Config.TILE_SIZE
const TILE_OUTLINE = Config.TILE_OUTLINE

const Tile = (stage, tile) => {
  const rect = new window.createjs.Shape()
  rect.graphics.beginStroke(TILE_OUTLINE).drawRect(
    tile.x * TILE_SIZE, tile.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
  )
  stage.addChild(rect)
  return rect
}

export default Tile
