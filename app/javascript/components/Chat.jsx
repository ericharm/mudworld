import React from 'react'
import ChatMessage from './ChatMessage.jsx'

class Chat extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
    this.subscribe()
  }

  subscribe () {
    window.App.messages = window.App.cable.subscriptions.create('ChatChannel', {
      received: (data) => {
        console.log(data)
        // ChatMessenger.respond(data)
        if (data.type === 'message') {
          this.setState({ messages: this.state.messages.concat(data) }, () => {
            this.refreshScroll()
          })
        }
        if (data.type === 'connection') {
          this.setState({
            messages: this.state.messages.concat({ message: data.user.username + ' connected.' })
          }, () => {
            this.refreshScroll()
          })
        }
      }
    })
  }

  refreshScroll () {
    const log = document.getElementById('chat-log')
    const messages = document.getElementById('chat-messages')
    log.scrollTop = messages.offsetHeight
  }

  handleSubmit (event) {
    event.preventDefault()
    const message = document.getElementById('new-message')
    window.post(window.paths.chatPath, { message: message.value }).then((res) => {
      console.log(res)
    })
    message.value = ''
  }

  render () {
    const messages = this.state.messages.map((message, i) => {
      return <ChatMessage username={message.from} message={message.message} meta={message.meta} key={i} />
    })
    return (
      <React.Fragment>
        <div id='chat-log'>
          <div id='chat-messages'>{messages}</div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <input id='new-message' autoComplete='off' />
          </fieldset>
        </form>
      </React.Fragment>
    )
  }
}

export default Chat
