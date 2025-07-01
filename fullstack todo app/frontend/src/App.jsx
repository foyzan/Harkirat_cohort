import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'

function App() {
  const [count, setCount] = useState(0)

  return <main style={{height: "100vh", width : "100%", display : "flex", justifyContent: "center", alignItems : "center", backgroundColor : "#11131c"}}>

  <CreateTodo/>
  
  </main>
}

export default App
