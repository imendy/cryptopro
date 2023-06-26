import { MdCancel } from 'react-icons/md'
import ReactDom from 'react-dom'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Form.module.css'
import { useAuth } from '../context/AuthContext'
import { motion } from "framer-motion";


function Modal({setOpenModal}) {
   const [_document, set_document] = useState(null)
  const { logout } = useAuth()

  useEffect(() => {
        set_document(document)
    }, [])

    if (!_document) { return null }
  
  return ReactDom.createPortal (
    <motion.div 
      initial={{ x: 500, opacity: 0, scale: 0.5 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      className="fixed z-30 w-[270px] h-[200px] top-0 right-5 min-[560px]:w-[500px] flex flex-col bg-gradient-to-r from-gray-400 to-black">
      <div className="flex  justify-between px-8  min-[560px]:px-16 md:px-40 md:p-8 border-gray-700 p-4 border-b ">
        <h2 className="text-sm font-bold min-[560px]:text-xl md:text-xl">Account</h2>
        <MdCancel 
          onClick={() => setOpenModal(false)} 
          className="text-purple-400 w-8 h-8 duration-300 hover:opacity-40 cursor-pointer hover:rotate-90"
          />
      </div>
      <div className="flex flex-col gap-3 p-4 justify-center items-center">
       <div className="input-button">
           <button 
             className={styles.button} 
             type="submit"
             onClick={() => {
                    logout()
                    setOpenModal(false)
                }}
            
             >
             <h2 className="relative z-20 px-8 ">Logout</h2>
           </button>
         </div>
      
      </div>
    </motion.div>,
        _document.getElementById('portal')
  )
}

export default Modal