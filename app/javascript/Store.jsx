import React, { useReducer, useEffect } from 'react'
export const Context = React.createContext()

const initialState = {
  currentRoom: {},
  currentUser: null,
  paths: {},
  users: {},
  lastMessage: { type: null }
}

// export const setStage = (stage) => { return { type: 'SET_STAGE', stage } }
export const setCurrentRoom = (room) => { return { type: 'SET_ROOM', room } }
export const setCurrentUser = (user) => { return { type: 'SET_USER', user } }
export const setRoomies = (roomies) => { return { type: 'SET_ROOMIES', roomies } }
export const setPaths = (paths) => { return { type: 'SET_PATHS', paths } }
export const receivedMessage = (message) => { return { type: 'RECEIVED_MESSAGE', message } }

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': return { ...state, currentUser: action.user }
    case 'SET_ROOMIES': return { ...state, users: action.roomies }
    case 'SET_PATHS': return { ...state, paths: action.paths }
    case 'SET_ROOM': return { ...state, currentRoom: action.room }
    case 'RECEIVED_MESSAGE': return { ...state, lastMessage: action.message }

    default:
      console.warn('UNKNOWN ACTION', action.type)
      return state
  }
}

const Store = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const debug = true

  useEffect(() => {
    if (debug) console.log('%c Store %o', 'color: green; font-weight: bold;', state)
  }, [state])

  return (
    <Context.Provider value={{ state, dispatch }}>{props.children}</Context.Provider>
  )
}

export default Store
