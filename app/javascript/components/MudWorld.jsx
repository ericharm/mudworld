import React from 'react'
import MiniMap from './MiniMap.jsx'
import Chat from './Chat.jsx'
// const PathsContext = React.createContext('paths')

class MudWorld extends React.Component {
  constructor (props) {
    super(props)
    window.paths = {
      locationsPath: props.locationsPath,
      chatPath: props.chatPath,
      controlsPath: props.controlsPath
    }
    window.user = props.currentUser
    this.chat = React.createRef()

    this.state = {
      context: {
        paths: {
          locationsPath: props.locationsPath,
          chatPath: props.chatPath,
          controlsPath: props.controlsPath
        },
        user: props.currentUser,
        messenger: null
      }
    }
  }

  updateContext (context) {
    console.log(this.state.context, context)
    this.setState({ context })
  }

  render () {
    return (
      <React.Fragment>
        <div className='logo'>MUDworld</div>
        <MiniMap context={this.state.context} updateContext={this.updateContext.bind(this)} />
        <Chat context={this.state.context} updateContext={this.updateContext.bind(this)} />
      </React.Fragment>
    )
  }
}

export default MudWorld
