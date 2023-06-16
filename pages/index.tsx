import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Login from '../components/Login'
import Header from '../components/Header'



import UserDashboard from './users';
import { useAuth } from '../context/AuthContext'


const Home: NextPage = () => {

  const { currentUser } = useAuth()

  
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>CryptoPro</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
       <Header />
     
     {!currentUser && <Login />}
     {currentUser && <UserDashboard/>}
     
      
    </div>
  )
}

export default Home
