import { useState } from 'react'

import Canvas from './canvas';
import Cutomiser from './pages/Cutomiser';
import Home from './pages/Home';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <main className='app transition-all ease-in'>
      {/* <h1 className='head-text'>Three JS</h1> */}
      <Home/>
      <Canvas/>
      <Cutomiser/>
    </main>
    </>
  )
}

export default App
