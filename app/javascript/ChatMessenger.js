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
    mapAction: (data) => {
      chatRoom.addStrangerMessage(data)
    }
  }
  return messenger
}

export default ChatMessenger
