import  { useEffect, useState } from 'react';
import profile from "../../../../public/images/emptyProfile.webp"
import { Toaster, toast } from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import { useSelector } from 'react-redux';

function Users_list() {
  const { token } = useSelector((state) => state.Admin);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

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
        setReload(!reload);
      })
      .catch((err) => {
        if (err?.response?.data?.errmsg) {
          toast.error(err?.response?.data?.errmsg);
        }
      });
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <Toaster toastOptions={3000} />
        <header className="bg-gradient-to-r from-blue-500 to-purple-500 py-6 rounded-b-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold text-white">User List</h1>
          </div>
        </header>
        <br></br>
        <br></br>

        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* rows */}
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                         {user.profileImage?<img src={user.profileImage} alt="Avatar Tailwind CSS Component" />:<img src={profile} alt="Avatar Tailwind CSS Component" />} 
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.name}</div>
                      </div>
                    </div> 
                  </td>
                  <td>{user.email}</td>
                  {user.phone? <td>{user.phone}</td>:<td><p>Not given</p></td>}
            
                  <td>
                    {user.isBlocked ? (
                      <button onClick={() => statusChange(user._id, user.isBlocked)} className="btn btn-sm btn-outline btn-error">
                        Unblock
                      </button>
                    ) : (
                      <button onClick={() => statusChange(user._id, user.isBlocked)} className="btn btn-sm btn-outline btn-success">
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Currently no users</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Users_list;
