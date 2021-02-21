import React from 'react'
import Store from '../Store.jsx'
import MudWorld from './MudWorld.jsx'

const App = (props) => {
  return (
    <Store>
      <MudWorld user={props.currentUser} paths={props.paths} />
    </Store>
  )
}

export default App
