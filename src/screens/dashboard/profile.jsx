import SideBar from './sidebar'
import {FiUploadCloud} from 'react-icons/fi'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import { toast,Toaster } from 'react-hot-toast'
import { useState,useEffect } from 'react'

function Profile() {
    const { token } = useSelector((state) => state.User)
    const [user, setUser] = useState({})
    const [change, setChange] = useState(false)
    const [edit, setEdit] = useState(false)
    const [name, setNewName] = useState('')
    const [phone, setPhone] = useState('')
    const [profileImage, setNewProfile] = useState('')
    const regex_mobile = /^\d{10}$/

    useEffect(() => {
        axiosInstance.get('/user/userProfile', {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res?.data +'hereeee');
            setUser(res?.data?.user)
            setNewName(res?.data?.user?.name)
            setPhone(res?.data?.user?.phone)
            setNewProfile(res?.data?.user?.profileImage)
        
        }).catch((error) => {
            if (error.response.data) {
                toast.error(error.response.data.errMsg)
            } else {
                toast.error(error.message)
            }
        })
    }, [change])

    const submitEdits = async () => {
        if (name.trim().length === 0 || phone.toString().trim().length === 0 ){
            toast.error("Fill all the fields");
            console.log('ivadey illa');
        } else if (regex_mobile.test(phone) === false) {
            toast.error("Enter a valid mobile number");
            console.log('ivadey');
        } else {
            axiosInstance.patch('/user/editProfile', { name, profileImage, phone }, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((res) => {
                setEdit(false);
                setChange(!change);
                toast.success(res.data.message);
            }).catch((error) => {
                console.log(error);
                if (error?.response?.data) {
                    toast.error(error.response.data.errMsg);
                } else {
                    console.log(error.message);
                }
            });
        }
    };
    

    function isValidImage(logo) {
        const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        const extension = logo.substr(logo.lastIndexOf('.')).toLowerCase();
        return validExtensions.includes(extension);
    }

    const handleImageChange = (img) => {
        if (isValidImage(img.target.files[0].name)) {
            let reader = new FileReader()
            reader.readAsDataURL(img.target.files[0])
            reader.onload = () => {
                setNewProfile(reader.result)
            }
            reader.onerror = (err) => {
                console.log(err);
            }
        } else {
            toast.error('Add valid image')
        }
    };

  return (
     <SideBar>
        
       <div className='flex flex-col gap-6'>
        {
            !edit ?
            <>
                 <h2 className='text-xl font-bold '>Profile</h2>
       <div className="card card-side bg-main shadow-xl">
  <figure><img className='w-80 h-80' src={user.profileImage} alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">{user.name}</h2>
    <br></br>
    <p>{user.email}<br></br><br></br>
    {user.phone} <br></br><br></br>
    <button onClick={() => setEdit(true)} 
    className='bg-main font-medium transition hover:bg-subMain border border-subMain text-white  px-6 py-3 gap-4 rounded-lg w-full sm:w-auto'
    >Edit Profile</button>
    </p> 
   
  </div>
</div>
            </>:
            <>
        <h2 className='text-xl font-bold '>Edit- Profile</h2>
        <div className='w-full text-center'>
  <div className='px-6 pt-5 pb-6 border-2 border-boarder bg-main rounded-md cursor-pointer'>
    <span className='mx-auto flex-colo text-subMain text-3xl'>
      <FiUploadCloud />
    </span>
    <input type="file" name="photo" accept=".jpg,.jpeg,.png" id="file" onChange={handleImageChange} />
    
    <p className='text-xs text-boarder'>(only .jpg and .png files will be accepted)</p>
  </div>
</div>

     <div className="text-sm w-full">
        <label className="text-border font-semibold">Full Name</label>
        <input required type='text' value={name} onChange={(e) => setNewName(e.target.value)} placeholder={name} className='w-full text-sm mt-2 p-5 border border-boarder text-white bg-main'/>
        </div>
        <div className="text-sm w-full">
        <label className="text-border font-semibold">Mobile No</label>
        <input required type='text' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={phone}  className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`}/>
        </div>
        <div className='flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4'>
        <button
              type="button"
              onClick={() => { setEdit(false)}}
              className='bg-main font-medium  border-boarder text-white  px-6 py-3 gap-4 rounded-lg w-full sm:w-auto '>
                 close 
            </button>
            <button
              type="button"
              onClick={() => { submitEdits()}}
              className='bg-main font-medium transition hover:bg-subMain border border-subMain text-white  px-6 py-3 gap-4 rounded-lg w-full sm:w-auto '>
                 Update 
            </button>
        </div>
            </>
        }
       </div>
    </SideBar>
  )
}

export default Profile