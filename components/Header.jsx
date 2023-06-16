import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { FaUserCircle } from 'react-icons/fa'
import Modal from './Modal'
import Link from 'next/link';
import Head from 'next/head';



import { useState, useEffect } from 'react'

const Header = ({title}) => {

   const [openModal, setOpenModal] = useState(false)
   const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
   
  

  // useEffect only runs on the client, so now we can safely show the UI
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}
	const currentTheme = theme === "system" ? systemTheme : theme;

  
  return (
    <>
       <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      {openModal && <Modal setOpenModal={setOpenModal} />}
     <div className="flex items-center justify-between p-6  min-[560px]:px-16 md:px-40 md:p-8">
         <Link href='/'>
            <a>
                <h1 className="text-xl font-bold min-[560px]:text-2xl md:text-2xl bg-gradient-to-r from-purple-400 to-emerald-300 text-transparent inline-block bg-clip-text animate-pulse">CryptoPro</h1>
            </a>
           </Link>
      
        
       
     

       
      <div className="flex items-center space-x-4 max-[360px]:pl-16">
         <FaUserCircle
          onClick={() => setOpenModal(true)}
          className="text-purple-400 w-6 h-6 duration-300 hover:opacity-40 cursor-pointer"
          />
        
        {currentTheme === "dark" ? (
				<SunIcon
					className="h-6 w-6 cursor-pointer text-yellow-500"
					onClick={() => setTheme("light")}
				/>
			) : (
				<MoonIcon
					className="h-5 w-5 cursor-pointer text-slate-600"
					onClick={() => setTheme("dark")}
				/>
			)}  
      </div>
    </div>
  </>
  )
}

export default Header