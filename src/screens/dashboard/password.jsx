import SideBar from './sidebar'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import { useState} from 'react'
import {toast} from 'react-hot-toast'



function Password() {
  const [email,setEmail] = useState('');
  const [newpass,setNewpass] = useState('');
  const [rePass,setRepass] = useState('');
  const {userId} = useSelector((state)=>state.User)

  const handleSubmit = ()=>{
    if(email.trim().length === 0 || newpass.trim().length === 0 || rePass.trim().length === 0){
      toast.error("please fill all the field")
    }else if(newpass !== rePass){
      toast.error('Re-entered password is not match');
    }else{
      axiosInstance.patch(`/user/changepassword/${userId}`,{email,newpass,rePass}).then((res)=>{
        toast.success(res.data.message);
      }).catch((err)=>{
        toast.error(err?.res?.data?.errmsg);
      })
    }
  }

  return (
    <SideBar>
        <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold '>Change Password</h2>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Email</label>
        <input required type='text' placeholder='' onChange={(e)=>setEmail(e.target.value)} className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">New Password</label>
        <input required type='password' placeholder='Atleast 8 characters' onChange={(e)=>setNewpass(e.target.value)} className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Confirm password</label>
        <input required type='password' placeholder='Re-enter password' onChange={(e)=>setRepass(e.target.value)} className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        <div className='justify-end items-center my-4'>
            <button onClick={handleSubmit} className='bg-subMain font-medium transition hover:bg-main border border-subMain text-white  px-6 py-3 gap-4 rounded-lg w-full sm:w-auto '>
                Update
            </button>
        </div>

       </div>
    </SideBar>
  )
}

export default Password