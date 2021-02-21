import React, { useContext, useEffect } from 'react'
import { Context, setCurrentUser, setPaths } from '../Store.jsx'
import MiniMap from './MiniMap.jsx'
import Chat from './Chat.jsx'

const MudWorld = (props) => {
  const { dispatch } = useContext(Context)

  useEffect(() => {
    dispatch(setCurrentUser(props.user))
    dispatch(setPaths(props.paths))
  }, [])

  return (
    <React.Fragment>
      <MiniMap />
    </React.Fragment>
  )
}

export default MudWorld
