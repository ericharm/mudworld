import React from 'react'
import MiniMap from './MiniMap.jsx'
import Chat from './Chat.jsx'
const PathsContext = React.createContext('paths')

class MudWorld extends React.Component {
  constructor (props) {
    super(props)
    window.paths = {
      locationsPath: props.locationsPath,
      chatPath: props.chatPath,
      controlsPath: props.controlsPath
    }
    window.user = props.currentUser
  }

  render () {
    return (
      <PathsContext.Provider value={this.props.locationsPath}>
        <React.Fragment>
          <div className='logo'>MUDworld</div>
          <MiniMap />
          <Chat />
        </React.Fragment>
      </PathsContext.Provider>
    )
  }
}

export default MudWorld
