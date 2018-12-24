import React from 'react'

class ChatMessage extends React.Component {
  render () {
    return (
      <div className='chat-message'>
        {this.props.username &&
          <span className='message-user'>{this.props.username}</span>
        }
        <span className='message-text'>{this.props.message}</span>
      </div>
    )
  }
}

export default ChatMessage
