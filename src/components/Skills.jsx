import React from 'react'
import { SKILLS } from '../assets/constants'
import { motion } from 'framer-motion'

const containerVariants = {
    hidden : {opacity : 0,y:20},
    visible : {opacity : 1,y:0, tranisition:{
        duration: 1,
        staggerChildren: 0.5,
    }}
}

const itemVariants = {
    hidden:{
        opacity: 0,x: -20
    },
    visible: {opacity: 1,x: 0, transition:{duration: 1,staggerChildren: 0.5}}
}

function Skills() {
  return (
    <div className='container mx-auto' id="skills">
        <h2 className='mb-12 mt-20 text-center text-4xl'>Skills</h2>
        <motion.div 
        initial="hidden"
        whileInView="visible"
        variants={containerVariants}
        viewport={{once: true}}
        className='mx-2 flex flex-col flex-wrap sm:flex-row lg:flex-row item-center justify-center rounded-xl bg-gradient-to-b from-zinc-900 to-zinc-950 px-4 py-10 lg:px-20'>
            {SKILLS.map((skill,index)=>(
                // single skill div
                <motion.div 
                variants={itemVariants}
                key={index} className='mb-8 flex items-center justify-between'>
                    {/* icon and name of skill */}
                    <div className='flex items-center'>
                        {skill.icon}
                        <h3 className='px-6 text-xl lg:text-3xl'>{skill.name}</h3>
                    </div>

                    {/* progress bar */}
                    {/* <div className='text-md border-b-2 border-yellow-400 font-semibold lg:text-xl'>
                        <span>{skill.experience}</span>
                    </div> */}
                </motion.div>
            ))}
        </motion.div>
    </div>
  )
}

export default Skills