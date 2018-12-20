import React from 'react'
import MiniMap from './MiniMap.jsx'
const PathsContext = React.createContext('paths')

class MudWorld extends React.Component {
  constructor (props) {
    super(props)
    window.locationsPath = props.locationsPath
  }

  componentDidMount () {
    // this.props.currentUser.tile = this.state.tiles[0]
  }

  subscribe () {
    window.App.messages = window.App.cable.subscriptions.create('ChatChannel', {
      received: (data) => {
        console.log(data)
      }
    })
  }

  render () {
    return (
      <PathsContext.Provider value={this.props.locationsPath}>
        <React.Fragment>
          <div>MUDworld</div>
          <MiniMap />
        </React.Fragment>
      </PathsContext.Provider>
    )
  }
}

export default MudWorld
