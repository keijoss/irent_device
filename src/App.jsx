import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/background/loginBg.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div
      style={{
        backgroundImage: `url(${viteLogo})`,
        backgroundSize:"cover",
        width:"100%",
        height:"100vh",
        backgroundRepeat:"no-repeat"
      }}
    >
    </div>
  );
}

export default App
