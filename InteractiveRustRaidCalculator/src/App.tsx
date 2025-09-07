
import React, { use } from 'react'
import SandboxArea from './SandboxArea'
import './App.css'
import useDragger from './hooks/useDragger'
import BuildingMovable from './components/BuildingMovable'

function App() {

  return (
    <main>
      <div className="sandbox-area">
        <BuildingMovable id={'sss'}></BuildingMovable>
        <BuildingMovable id={'aaa'}></BuildingMovable>
      </div>
      {/* <SandboxArea></SandboxArea> */}
    </main>
  )
}

export default App
