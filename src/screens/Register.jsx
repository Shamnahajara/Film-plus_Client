import Layout from '../layout/Layout'
import { FiLogIn } from 'react-icons/fi'
import {useState} from 'react'
import { toast} from 'react-hot-toast'
import {useNavigate,Link} from 'react-router-dom'
import axiosInstance from '../api/axios'


function Register() {
   const navigate = useNavigate()
   const [name, setName] = useState('');
   const [email,setEmail]= useState('');
   const [phone,setPhone] = useState('');
   const [password,setPassword] = useState('');
   const [Repassword,setRePassword] = useState('');
   const [Err,setErr] = useState(null)

   const regex_password = /^(?=.*?[A-Z])(?=.*[a-z])(?=.*[0-9]){8,16}/
   const regex_mobile = /^\d{10}$/


   async function handleSubmit(){
     try{
       axiosInstance.post('/user/register',{name,email,phone,password}).then((res)=>{
         if(res.data.message){
           toast.success(res.data.message)
           navigate('/login')
         }
       }).catch((err)=>{
         if(err.response.status === 404){
           console.log('here')
           navigate('/serverError')

         }else if(err.response.status === 500){
           console.log('here guyss')
           navigate('/serverError')
         }else if(err?.response?.data){
            toast.error(err?.response?.data?.errmsg)
         }
       })

     } catch (error){
       console.log(error)
     }
   }

   function onSignup(){
     if(name.trim().length==0 || email.trim().length==0 || phone.trim().length==0 ||password.trim().length==0 ||Repassword.trim().length==0 ){
         setErr('Fill all the fields')
     }else{
       if ((regex_mobile.test(phone) == false)) {
         setErr('Enter valid mobile number')
       } else if (regex_password.test(password) == false) {
         setErr('Use strong password')
       } else if (password !== Repassword) {
         setErr("Password doesn't match")
       } else {
         handleSubmit()
       }
     }

   }
  return (
    <Layout>
    <div className='container mx-auto px-2 my-24 flex-colo'>
     <div className='w-full 2xl:w-2/5 gap-8 p-8 sm:p-14 md:w-3/5 flex-colo  bg-dry rounded-lg border  border-boarder '>
        <h1 className='w-full h-full text-4xl object-contain font-medium text-subMain text-center'>FILM-PLUS</h1>
        
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Full Name</label>
        <input onChange={(e) => setName(e.target.value)} required type='text' placeholder='Enter your name' className="bg-main w-full text-sm mt-2 p-5 border border-boarder text-white" />
        </div>

        <div className="text-sm w-full">
        <label className="text-border font-semibold">Email</label>
        <input onChange={(e) => setEmail(e.target.value)} required type='email' placeholder='Enter email' className="bg-main w-full text-sm mt-2 p-5 border border-boarder text-white" />
        </div>

        <div className="text-sm w-full">
        <label className="text-border font-semibold">Mobile</label>
        <input  onChange={(e) => setPhone(e.target.value)}  required type='text' placeholder='Enter mobile number' className="bg-main w-full text-sm mt-2 p-5 border border-boarder text-white" />
        </div>

        <div className="text-sm w-full">
        <label className="text-border font-semibold">Password</label>
        <input  onChange={(e) => setPassword(e.target.value)} required type='password' placeholder='Enter strong password' className="bg-main w-full text-sm mt-2 p-5 border border-boarder text-white" />
        </div>

        <div className="text-sm w-full">
        <label className="text-border font-semibold">Confirm Password</label>
        <input  onChange={(e) => setRePassword(e.target.value)}  required type='password' placeholder='re-enter your password' className="bg-main w-full text-sm mt-2 p-5 border border-boarder text-white" />
        </div>
        <div className='flex justify-center'>
            <span className='text-red-600 text-sm'>{Err ? Err : '[password should contain A-Z&a-z&1-9]'}</span>
         </div>
        <Link onClick={() => onSignup()}  className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
           <FiLogIn/> Register
        </Link>
        <p className='text-center text-boarder '>
           Already have an account?{" "}<Link to="/login" className='text-dryGray font-semibold ml-2'>Login</Link>
        </p>
     </div>
    </div>
 </Layout>
  )
}

export default Register