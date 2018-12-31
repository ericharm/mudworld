import React from 'react'
import ChatMessage from './ChatMessage.jsx'
import ChatMessenger from '../ChatMessenger.js'

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
    this.messenger = ChatMessenger(this)
    // const newStore = Object.assign(this.props.store, { messenger: this.messenger })
    this.props.updateStore({ messenger: this.messenger })
    this.subscribe()
  }

  subscribe () {
    window.App.messages = window.App.cable.subscriptions.create('ChatChannel', {
      received: (data) => {
        this.messenger.handle(data, this)
      }
    })
  }

  addMessage (message) {
    if (message.location === this.props.store.user.location_id) {
      this.setState({ messages: this.state.messages.concat(message) }, () => {
        this.refreshScroll()
      })
    }
  }

  addStrangerMessage (message) {
    if (message.user.id !== this.props.store.user.id) {
      this.addMessage(message)
    }
  }

  refreshScroll () {
    const log = document.getElementById('chat-log')
    const messages = document.getElementById('chat-messages')
    log.scrollTop = messages.offsetHeight
  }

  handleSubmit (event) {
    event.preventDefault()
    const message = document.getElementById('new-message')
    const chatPath = this.props.store.paths.chatPath
    const locationsPath = this.props.store.paths.locationsPath
    const path = (message.value.length && message.value[0] === '/') ? locationsPath : chatPath
    window.post(path, { message: message.value, user: this.props.store.user }).then((res) => {
      console.log(res)
      message.value = ''
    })
  }

  render () {
    const messages = this.state.messages.map((message, i) => {
      return <ChatMessage from={message.from} message={message.message} meta={message.meta} key={i} />
    })
    return (
      <React.Fragment>
        <div id='chat-log'>
          <div id='chat-messages'>{messages}</div>
        </div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset>
            <input id='new-message' autoComplete='off' />
          </fieldset>
        </form>
      </React.Fragment>
    )
  }
}

export default Chat
