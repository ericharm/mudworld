import Config from './Config.js'
const TILE_SIZE = Config.TILE_SIZE
const TILE_OUTLINE = Config.TILE_OUTLINE
const OBSCURED_TILE_COLOR = Config.OBSCURED_TILE_COLOR

const Tile = (stage, tile, options) => {
  const color = options && options.obscured ? OBSCURED_TILE_COLOR : TILE_OUTLINE
  const rect = new window.createjs.Shape()
  rect.graphics.beginStroke(color).drawRect(
    tile.x * TILE_SIZE, tile.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
  )
  stage.addChild(rect)
  return rect
}

export default Tile
