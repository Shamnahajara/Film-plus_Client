import { useState , useEffect } from "react"
import axiosInstance from "../../api/axios";
import {toast} from 'react-hot-toast'

function CommunityTable() {

    const [communities,setCommunities] = useState([]);
    const [reload,setReload] = useState(false)
    useEffect(()=>{
        axiosInstance.get('/admin/communities').then((res)=>{
            setCommunities(res.data.communities)
        })
    },[reload])

    const statusChange = (communityId, blocked) => {
        axiosInstance
          .patch(
            '/admin/communitystatus',
            { communityId, blocked },
           
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
    <div className="overflow-x-auto">
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th className='text-primary text-lg'>Community</th>
          <th className='text-primary text-lg'>Admin</th>
          <th className='text-primary text-lg'>Created At</th>
          <th className='text-primary text-lg'>Members</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {
            communities.map((community,i)=>(
                <tr key={i}>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={community.groupProfile} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{community.chatName}</div>
                     
                    </div>
                  </div>
                </td>
                <td>
                  {community.groupAdmin.name}
                  <br/>
                  <span className="badge badge-ghost badge-sm">{community.groupAdmin.email}</span>
                </td>
                <td>{new Date(community.createdAt).toLocaleDateString()}</td>
                <td>{community.users.length}</td>
                <td>{
                    community.isBlocked ? <button className="btn btn-sm btn-outline btn-accent" onClick={()=>statusChange(community._id,community.isBlocked)}>UnBlock</button> : 
                    <button className="btn btn-sm btn-outline btn-error" onClick={()=>statusChange(community._id,community.isBlocked)}>block</button>

                }</td> 
              </tr>
            ))
        }
       
      </tbody>
      {/* foot */}
    </table>
  </div>
  )
}

export default CommunityTable