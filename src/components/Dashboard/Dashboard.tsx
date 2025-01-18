import { useState } from 'react'
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../../public/vite.svg'
import Button from '../Button/Button'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebaseConfig'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const [count, setCount] = useState(0)
  const navigateTo = useNavigate()

  const handleSignOutClick = () => {
    signOut(auth).then(val => {
      console.log(val);
      navigateTo("/singin")
    })
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <Button className='btn-primary' text='Wyloguj' onClick={handleSignOutClick}/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Dashboard
