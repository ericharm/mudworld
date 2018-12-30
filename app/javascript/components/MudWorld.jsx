import React from 'react'
import MiniMap from './MiniMap.jsx'
import Chat from './Chat.jsx'

class MudWorld extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      store: {
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

  updateStore (storeProp) {
    let store = Object.assign(this.state.store, storeProp)
    this.setState({ store })
  }

  render () {
    return (
      <React.Fragment>
        <div className='logo'>MUDworld</div>
        <MiniMap store={this.state.store} updateStore={this.updateStore.bind(this)} />
        <Chat store={this.state.store} updateStore={this.updateStore.bind(this)} />
      </React.Fragment>
    )
  }
}

export default MudWorld
