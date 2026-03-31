import { useState } from 'react'
import { motion } from 'motion/react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

// Components
import { BarChart } from './components/BarChart'
import { AnimatedLineChart } from './components/AnimatedLineChart'
import { ScatterPlot } from './components/ScatterPlot'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <h1>Sample Components Board</h1>
        <div>
          <ScatterPlot />
          <BarChart />

          { /* Motion Wrappers */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <AnimatedLineChart />
          </motion.div>

          <p>
            You've reached the end! Wow!
          </p>
        </div>
      </section>
      <section id="spacer"></section>
    </>
  )
}

export default App
