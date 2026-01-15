import React from 'react'
import { SOCIAL_MEDIA_LINKS } from "../assets/constants"
import logo from "../assets/logo.png"
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <div className='mb-8 mt-20'>
        <div className='flex items-center justify-center'>
            <motion.figure 
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 1.5,delay: 1}}>
                <img src={logo} alt="logo" width={200} className='mb-2' />
                <div className='mb-10 h-3 w-12 bg-yellow-400'></div>
            </motion.figure>
        </div>

        <div className='flex items-center justify-center gap-8'>
            {SOCIAL_MEDIA_LINKS.map((link,index)=>(
                <motion.a 
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.2,delay: 0.5*index}}
                href={link.href} key={index} target='_blank' rel='noopener noreferrer'>
                    {link.icon}
                </motion.a>
            ))}

        </div>
        <p className='mt-8 text-center text-sm tracking-wide text-gray-400'>
            &copy;Aftab. All rights reserved
        </p>
    </div>
  )
}

export default Footer
