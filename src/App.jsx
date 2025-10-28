import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [city, setCity] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleSearch = () =>{
    fetchWeather()
  }

  return (
    <>
      <div className={`max-h-screen w-11/12 mx-auto bg-gradient-to-b from-blue-500 to-indigo-700 flex flex-col items-center justify-center p-6`}>
        <h1 className='text-3xl font-bold text-white mt-10 mb-6'>
          🌦 Weather Pro
        </h1>
        <form onSubmit={handleSearch} className='flex gap-3'>
          <input
            type="text"
            placeholder='Enter city...'
            value={city}
            onChange={e => setCity(e.target.value)}
            className='px-4 border border-gray-500 rounded-md text-gray-700' />
            <button type='submit'>
              {loading? "loading":"Search"}
            </button>
        </form>
      </div>
    </>
  )
}

export default App
