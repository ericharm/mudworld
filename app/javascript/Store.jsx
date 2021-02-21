import React, { useReducer, useEffect } from 'react'
import MapMessenger from './MapMessenger.js'
export const Context = React.createContext()

const initialState = {
  currentRoom: {},
  currentUser: null,
  paths: {},
  stage: null,
  users: {}
}

export const setStage = (stage) => { return { type: 'SET_STAGE', stage } }
export const setCurrentUser = (user) => { return { type: 'SET_USER', user } }
export const setUsers = (users) => { return { type: 'SET_USERS', users } }
export const setPaths = (paths) => { return { type: 'SET_PATHS', paths } }
export const setCurrentRoom = (room) => { return { type: 'SET_ROOM', room } }

// actions from socket messages
export const moveUser = (user) => { return { type: 'MOVE_USER', user } }

// export const handleSocketMessage = (message) => { return { type: 'HANDLE_MESSAGE', message } }

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_STAGE': return { ...state, stage: action.stage }
    case 'SET_USER': return { ...state, currentUser: action.user }
    case 'SET_USERS': return { ...state, users: action.users }
    case 'SET_PATHS': return { ...state, paths: action.paths }
    case 'SET_ROOM': return { ...state, currentRoom: action.room }

    case 'move': return MapMessenger({ state }).move(action.data)
    case 'exit': return MapMessenger({ state }).exit(action.data)

    default:
      console.warn('UNKNOWN ACTION', action.type)
      return state
  }
}

const Store = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const debug = false

  useEffect(() => {
    if (debug) console.log('%c Store %o', 'color: green; font-weight: bold;', state)
  }, [state])

  return (
    <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>
  )
}

export default Store
