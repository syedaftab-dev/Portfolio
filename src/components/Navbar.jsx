import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { NAVIGATION_LINKS } from '../assets/constants'
import { FaBars } from 'react-icons/fa6'
import { FaTimes } from 'react-icons/fa'


function Navbar() {

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    // for smooth scrolling and closing mobile menu
    const handleLinkClick = (e, href) => {
        e.preventDefault()
        console.log(e)
        const targetElement = document.querySelector(href);

        if(targetElement){
            const offset = -85; // height of navbar
            const elementPosition = targetElement.getBoundingClientRect().top; // position of target(#about) section 
            const offsetPosition = elementPosition + window.scrollY + offset; // position of target element relative to document
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        setIsMobileMenuOpen(false);
    }
  return (
    <div>
        <nav className='fixed left-0 right-0 top-4 z-50'>
            {/* {"desktop version"} */}
            <div className='mx-auto hidden max-w-2xl items-center justify-center rounded-lg bg-black/20 py-3 backdrop-blur-lg lg:flex gap-6'>
                {/* logo on left of navbar */}
                <div className='flex justify-between gap-6'>
                    <div>
                        <a href="#">
                            <img src={logo} alt="logo" width={90} />
                        </a>
                    </div>
                </div>
                {/* other nav elements */}
                <ul className='flex items-center gap-4'>
                    {NAVIGATION_LINKS.map((item,index)=>(
                        <li key={index}>
                            <a href={item.href} className='text-sm hover:text-yellow-400' 
                            onClick={(e)=>handleLinkClick(e,item.href)}>
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* MOBILE MENU */}

            <div className='rounded-lg backdrop-blur-md lg:hidden'>
                <div className='flex items-center justify-between'>
                    <div>
                        <a href="#">
                            <img src={logo} alt="logo" width={90} className='m-2'/>
                        </a>
                    </div>
                    <div className='flex items-center'>
                        <button className='focus:outline-none lg:hidden' onClick={toggleMobileMenu}>
                            {isMobileMenuOpen ? (
                                <FaTimes className="m-2 h-6 w-5"/> 
                            ):(
                                <FaBars className="m-2 h-6 w-5"/>
                            )}
                        </button>
                    </div>
                </div>
                {isMobileMenuOpen && (
                    <ul className='ml-4 mt-4 flex flex-col gap-4 backdrop-blur-md'>
                        {NAVIGATION_LINKS.map((item,index)=>(
                            <li key={index}>
                                <a href={item.href} className='text-sm hover:text-yellow-400' 
                                onClick={(e)=>handleLinkClick(e,item.href)}>
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </nav>
    </div>
  )
}

export default Navbar