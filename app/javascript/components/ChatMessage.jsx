import React from 'react'

class ChatMessage extends React.Component {
  render () {
    const color = this.props.color || '#000000'
    return (
      <div className='chat-message'>
        {this.props.username &&
          <span className='message-user' style={{ color }}>{this.props.username}</span>
        }
        <span className='message-text'>{this.props.message}</span>
      </div>
    )
  }
}

export default ChatMessage
