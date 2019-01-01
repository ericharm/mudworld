const CommandMessenger = (args) => {
  const paths = args.paths
  const validCommands = {
    '/b': 'build',
    '/d': 'dig',
    '/w': 'whisper',
    '/g': 'global',
    '/m': 'mute',
    '/t': 'teleport'
  }
  // const messenger = args.messenger
  const commandMessenger = {
    dispatch: (data) => {
      const regexEval = data.message.match('^/[b,d,w,g,m,t] ')
      if (!regexEval) return this.invalidCommand()
      const type = validCommands[regexEval[0].trim()]
      const action = commandMessenger[type]
      console.log('action', action)
      if (action) action(data)
    },

    build: (data) => {
      const locationsPath = paths.locationsPath
      const userId = data.user.id
      window.post(locationsPath, { message: data.message, user_id: userId }).then((res) => {
        // message.value = '' // no, this is done in the Component
      })
    },

    invalidCommand: () => {
      // need a way to debug to a single user in the chat log
      // messenger.mapAction({ message: 'Invalid command' })
      console.log('Invalid command')
      return false
    }
  }
  return commandMessenger
}

export default CommandMessenger
