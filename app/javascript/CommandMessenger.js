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
      console.log(regexEval)
      if (!regexEval) return this.invalidCommand()
      else {
        const type = validCommands[regexEval[0].trim()]
        const action = commandMessenger[type]
        const value = data.message.match('^/[b,d,w,g,m,t] (.*)+')[1]
        if (action) action(data, value)
      }
    },

    build: (data, value) => {
      const locationsPath = paths.locationsPath
      const userId = data.user.id
      window.post(locationsPath, { message: value, user_id: userId })
    },

    dig: (data, value) => {
      const tilesPath = paths.tilesPath
      const userId = data.user.id
      window.post(tilesPath, { message: value, user_id: userId }).then((res) => {
        console.log(res)
      })
    },

    whisper: (data) => {
      // not implemented
    },

    global: (data) => {
      // not implemented
    },

    mute: (data) => {
      // not implemented
    },

    teleport: (data) => {
      // not implemented
    },

    invalidCommand: () => {
      // need a way to debug to a single user in the chat log
      console.log('Invalid command')
      return false
    }
  }
  return commandMessenger
}

export default CommandMessenger
