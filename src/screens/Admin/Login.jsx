import { Link } from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import { toast,Toaster } from 'react-hot-toast'
import axiosInstance from '../../api/axios'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch} from 'react-redux'
import { adminLogin } from '../../store/slice/admin'


function Login() {
const navigate = useNavigate()
const dispatch = useDispatch()


const [email,setEmail] = useState('')
const [password,setPassword] = useState('')

const handleLogin = ()=>{
    if(email.trim().length ==0 || password.trim().length == 0){
        toast.error('Please fill all the field')
    }else{
        axiosInstance.post('/admin/login',{email,password}).then((res)=>{
            if(res.data.message){
                toast.success(res?.data?.message)
                const name = res.data.name
                const role = res.data.role
                const token = res.data.token

                dispatch(adminLogin({name,role,token}))
                navigate('/admin')
 }
}).catch ((err)=>{
            toast.error(err?.response?.data?.errmsg)
        })
    }
}
  return (
     <>
         <Toaster toastOptions={{ duration: 4000 }} />
        <div className='container mx-auto px-2 my-24 flex-colo'>
         <div className='w-full 2xl:w-2/5 gap-8 p-8 sm:p-14 md:w-3/5 flex-colo  bg-dry rounded-lg border  border-boarder '>
            <h1 className='w-full h-full object-contain font-bold text-subMain text-center'>FILM-PLUS</h1>
            <div className="text-sm w-full">
        <label className="text-border font-semibold">Email</label>
        <input required type='email' placeholder='enter your email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full text-sm mt-2 p-5 border border-boarder text-white bg-main'/>
        </div>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Password</label>
        <input required type='password' placeholder='*********' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full text-sm mt-2 p-5 border border-boarder text-white bg-main'/>
        </div>
            <Link to="/dashboard" onClick={()=>handleLogin()} className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
               <FiLogIn/> Login
            </Link>
            <p className='text-center text-boarder '>
               Dont have an account?{" "}<Link to="/register" className='text-dryGray font-semibold ml-2'>Register</Link>
            </p>
         </div>
        </div>
        </>
  )
}

export default Login