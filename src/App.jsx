import React from 'react'
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';

const App = () => {
  return (
        <main className='overflow-x-hidden bg-black tracking-tighter text-gray-200 antialiased'>
          <Navbar/>
          <HeroSection/>
          <About/>
        </main>
  )
}

export default App;