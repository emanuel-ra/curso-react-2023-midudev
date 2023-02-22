import { useEffect, useState } from 'react'
import './App.css'

const FollowMouse = () => {
  const [enable, setEnable] = useState()
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enable) {
      window.addEventListener('pointermove', handleMove)
    }
    // cleanup
    // -> cuando el componente se desmonta
    // -> cuando cambian las dependencias
    return () => { window.removeEventListener('pointermove', handleMove) }
  }, [enable])

  return (
    <>
      <div style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -25,
        top: -25,
        width: 50,
        height: 50,
        transform: `translate(${position.x}px, ${position.y}px)`
      }}
      />
      <button onClick={() => { setEnable(!enable) }}>{enable ? 'Desactivar' : 'Activar'}</button>
    </>
  )
}

function App () {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
