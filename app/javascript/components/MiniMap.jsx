import React, { useState, useContext, useEffect } from 'react'
import { Context, setUser, setRoomies, setCurrentRoom, receivedMessage } from '../Store.jsx'

import Stage from '../Stage.js'
import Config from '../Config.js'
import Tile from '../Tile.js'
import Door from '../Door.js'
import User from '../User.js'

import MapMessenger from '../MapMessenger.js'
import { enableControls } from '../Controls.js'
import { get } from '../Http.js'

const MiniMap = () => {
  const { state, dispatch } = useContext(Context)

  function subscribe () {
    window.App.cable.subscriptions.create('MapChannel', {
      received: function (data) {
        // MapMessenger({ state, dispatch }).handle(data)
        dispatch(receivedMessage(data))
      }
    })
  }

  useEffect(() => {
    if (state.currentUser) {
      subscribe()
      Stage.set(new window.createjs.Stage('minimap-canvas'))
      Stage.loadRoom({ state, dispatch, locationId: state.currentUser.location_id })
      enableControls({ user: state.currentUser, controlsPath: state.paths.controlsPath })
    }
  }, [state.currentUser])

  useEffect(() => {
    MapMessenger({ state, dispatch }).handle(state.lastMessage)
  }, [state.lastMessage])

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
