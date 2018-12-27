import React from 'react'

class ChatMessage extends React.Component {
  render () {
    const color = this.props.from ? this.props.from.color || '#000000' : '#000000'
    return (
      <div className='chat-message'>
        {this.props.from && this.props.from.username &&
          <span className='message-user' style={{ color }}>{this.props.from.username}</span>
        }
        <span className='message-text'>{this.props.message}</span>
      </div>
    )
  }
}

export default ChatMessage
