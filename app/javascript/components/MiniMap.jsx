import React, { useState, useContext, useEffect } from 'react'
import { Context, setUser, setStage } from '../Store.jsx'
import MiniMapService from '../MiniMapService.js'
import MapMessenger from '../MapMessenger.js'
import ChatMessenger from '../ChatMessenger.js'

const createStage = () => {
  let stage = new window.createjs.Stage('minimap-canvas')
  stage.scale = 1.5
  return stage
}

const MiniMap = () => {
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    dispatch(setStage(createStage()))
    if (state.currentUser) {
      console.log('loading room')
      MiniMapService({ state, dispatch }).loadRoom(state.currentUser.location_id)
      MiniMapService({ state, dispatch }).enableControls()
      subscribe()
    }
  }, [state.currentUser])


  const subscribe = () => {
    window.App.mapMessages = window.App.cable.subscriptions.create('MapChannel', {
      received: (data) => {
        // MiniMapService({ state, dispatch }).addUsers([data.user])
        // const action = MapMessenger({ state, dispatch })[data.type]
        // console.log('action', data.type)
        // if (action) action(data)
        // else console.log('Invalid action:', data.type)
        // MapMessenger is the handler for anything on this channel
        dispatch({ type: data.type, data })
        // MapMessenger({ dispatch }).handle(data)
        // dispatch(handleSocketMessage(data))
      }
    })
  }

  return (
    <React.Fragment>
      <div id='room-name'>{ state.currentRoom.name }</div>
      <div id='minimap'>
        <canvas id='minimap-canvas' width='1400' height='800' />
      </div>
    </React.Fragment>
  )
}

export default MiniMap
