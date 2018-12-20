import React from 'react'
const TILE_SIZE = 20
const TILE_OUTLINE = '#666666'

class MiniMap extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tiles: [],
      stage: null
    }
  }

  componentDidMount () {
    window.get(window.locationsPath + 1).then((res) => {
      let self = this
      this.setState({ tiles: res.data.tiles }, () => {
        let stage = new window.createjs.Stage('minimap')
        self.state.tiles.forEach((tile) => {
          const rect = new window.createjs.Shape()
          rect.graphics.beginStroke(TILE_OUTLINE).drawRect(
            tile.x * TILE_SIZE, tile.y * TILE_SIZE, TILE_SIZE, TILE_SIZE
          )
          stage.addChild(rect)
        })
        self.setState({ stage })
        stage.update()
      })
    })
  }

  render () {
    return (
      <canvas id='minimap' width='700' height='400' />
    )
  }
}

export default MiniMap
