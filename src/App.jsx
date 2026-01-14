import React from 'react'
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';  

const App = () => {
  return (
        <main className='overflow-x-hidden bg-black tracking-tighter text-gray-200 antialiased'>
          <Navbar/>
          <HeroSection/>
          <About/>
          <Projects/>
          <Skills/>
          <Achievements/>
          <Testimonials/>
          <ContactForm/>
        </main>
  )
}

export default App;