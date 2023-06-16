import { FcGoogle } from 'react-icons/fc'
import { GoMarkGithub } from 'react-icons/go'
import { HiAtSymbol } from "react-icons/hi";
import { HiEye } from "react-icons/hi";
import { HiEyeOff } from "react-icons/hi";
import { useState } from 'react'
import styles from '../styles/Form.module.css'
import { useAuth } from '../context/AuthContext'
import 
{ 
  signInWithPopup, 
  GoogleAuthProvider

} from "firebase/auth";
import { auth} from '../firebase'

function Login() {

  const [show, setShow] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  

  const { login, signup, currentUser } = useAuth()
  
async function submitHandler(e) {
          e.preventDefault();
        if (!email || !password) {
            setError('Please enter email and password')
            return
        }
        if (isLoggedIn) {
            try {
                await login(email, password)
            } catch (err) {
                setError('Incorrect email or password')
            }
            return
        }
        await signup(email, password)
    }

    const GoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    const authorization = auth;
    const result =  await signInWithPopup(authorization, provider);

    console.log(result);
  }
  
  return (
    <div className=" mt-2 flex flex-col justify-center items-center  p-6 min-[560px]:px-16 md:px-40 md:p-8">
      <h1 className="text-2xl font-bold py-4 text-gray-600 uppercase">{isLoggedIn ? 'Explore!' : 'Register!'}</h1>
       {error && <div className="border border-rose-400 text-rose-400 text-center w-full rounded-xl py-1 mt-2 mb-2">{error}</div>}
        <p className="text-gray-400  mx-auto text-sm">Explore an amazing experience, come in and have a great time!</p>
       <form className="flex flex-col gap-5 mt-8">
          <div className={styles.input_group}>
            <input 
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               className={styles.input_text}
              />
             <span className="icon flex items-center px-2">
               <HiAtSymbol size={15} />
             </span>
          </div>
          <div className={styles.input_group}>
            <input 
              type={`${show ? 'text' : 'password'}`}
              name="password"
              placeholder="Password"
               value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input_text}
              />
             <span className="icon flex items-center px-2" onClick={() => setShow(!show)}>
               {show ? <HiEyeOff size={15} /> : <HiEye size={15} />}
             </span>
          </div>

           {/* login buttons */}
         <div className="input-button">
           <button 
             className={styles.button} 
             type="submit"
             onClick={submitHandler}
             >
               <h2 className="relative z-20">Login</h2> 
            
             
           </button>
         </div>
         <div className="input-button">
           <button 
             className={styles.button_custom} 
             type="button"
             onClick={() => GoogleSignIn()}
             >
             Sign in with Google <FcGoogle size="15" />
           </button>
         </div>
        
       
       </form>
         <div onClick={() => setIsLoggedIn(!isLoggedIn)}>
            {
             !isLoggedIn ? 
               <h2 className="mt-4 text-sm cursor-pointer">Have an account? <span className="text-blue-600 font-medium text-sm cursor-pointer duration-300 hover:scale-105"> Sign In</span></h2> 
               : 
               <h2 className="mt-4 text-sm cursor-pointer">Dont have an account yet?<span className="text-blue-600 font-medium text-sm cursor-pointer"> Sign Up</span></h2>
             }
         </div>
            
      
       
    </div>
  )
}

export default Login