import React from 'react'
import MiniMap from './MiniMap.jsx'
import Chat from './Chat.jsx'

class MudWorld extends React.Component {
  constructor (props) {
    super(props)
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

  updateContext (contextUpdate) {
    let newContext = Object.assign(this.state.context, contextUpdate)
    this.setState({ context: newContext })
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
