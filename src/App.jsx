import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// Components
import { BarChart } from './components/BarChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <div>
          <h1>Sample BarChart</h1>
          <BarChart divId={"bar-chart"}/>
          <p>
            Edit <code>src/components/BarChart/index.jsx</code> and save to test <code>BarChart</code>
          </p>
        </div>
      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
