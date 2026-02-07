import './App.css'
import Prompt from './Prompt'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Story Generator</h1>
        <p className="app-tagline">Type a word and press Enter to add the next sentence. Each turn gets an illustration and a voice reading.</p>
      </header>
      <main className="app-main">
        <Prompt />
      </main>
    </div>
  )
}

export default App
