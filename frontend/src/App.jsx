import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Prompt from './Prompt'
import Lights from './Lights'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className='header'>
      <h1 id='title'>Once Upon A Hack,</h1>
     <Lights />
    </div>
     <hr />
     <br />
     <Prompt />

    </>
  )
}

export default App
