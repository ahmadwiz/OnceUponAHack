import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Prompt from './Prompt'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h1>Welcome to the App</h1>
     <hr />
     <Prompt />

    </>
  )
}

export default App
