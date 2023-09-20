import { useState,useEffect } from 'react';
import UserTable from '../../components/admin_components/UserTable'
import AdminSidebar from '../../components/admin_components/AdminSidebar';
import axiosInstance from '../../api/axios';
import { useSelector } from 'react-redux';
import { toast,Toaster } from 'react-hot-toast';
import { userBlock } from '../../store/slice/user';
import { useDispatch } from 'react-redux';



function UsersList() {
  const [users,setUsers] = useState([])
  const [reload,setReload] = useState(false)
  const {token} = useSelector((state)=>state.Admin )
  const dispatch = useDispatch()
  useEffect(() => {
    axiosInstance
      .get('/admin/users', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res?.data?.users);
      })
      .catch((err) => {
        if (err?.response?.data?.errmsg) {
          toast.error(err?.response?.data?.errmsg);
        }
      });
  }, [token, reload]);

  
  const statusChange = (userId, blocked) => {
    axiosInstance
      .patch(
        '/admin/userStatus',
        { userId, blocked },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        const isblocked = res?.data?.isblocked
        dispatch(userBlock({isblocked}))
        setReload(!reload);
      })
      .catch((err) => {
        if (err?.response?.data?.errmsg) {
          toast.error(err?.response?.data?.errmsg);
        }
      });
  };

  return (
    <AdminSidebar >
      <Toaster toastOptions={3000} />
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Users list</h2>         
        </div>
        {/* user table */}
        <UserTable users={users} statusChange={statusChange} />
      </div>
    </AdminSidebar >
  )
}

export default UsersList;
