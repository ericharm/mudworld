const ChatMessenger = (chatRoom) => {
  const messenger = {
    handle: (data) => {
      const action = messenger[data.type]
      if (action) action(data)
      else console.log('Invalid action:', data.type)
    },
    message: (data) => {
      chatRoom.addMessage(data)
    },
    connection: (data) => {
      chatRoom.addMessage(data.user.username + ' connected.')
    }
  }
  return messenger
}

export default ChatMessenger
