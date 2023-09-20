const Head = 'text-xs text-left text-dry font-semibold px-6 py-2 uppercase'
const text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'
import profile from '../../images/emptyProfile.webp'


const Rows = (user,i,statusChange)=>{

    return (
        <tr key={i}>
            <td className={`${text}`}>
                <div className='w-12 p-1 bg-dry border-boarder h-12 rounded overflow-hidden'>
                {user.profileImage?<img src={user.profileImage} className='h-full w-full object-cover' alt="Avatar Tailwind CSS Component" />:
                <img src={profile} className='h-full w-full object-cover' alt="Avatar Tailwind CSS Component" />} 
                </div>
            </td>
            <td className={`${text} truncate`}>{user.name}</td>
            <td className={`${text}`}>{user.email}</td>
            {
            user.phone ?  <td className={`${text}`}>{user.phone}</td> :
            <td className={`${text}`}>Not given</td>
            }
          
            <td className={`${text} float-right flex-rows gap-4`}>
               {
                user.isBlocked ?  <button onClick={()=>statusChange(user._id,user.isBlocked)} className='bg-subMain  flex-rows gap-2 text-white  rounded flex-colo w-16 h-10'>
                  UnBlock
               </button> :
                <button onClick={()=>statusChange(user._id,user.isBlocked)} className='bg-main border border-dryGray flex-rows gap-2 text-white  rounded flex-colo w-12 h-10'>
                 Block
                </button>
               }
               
            </td>

        </tr>
    )

}


function UserTable({users, statusChange}) {

  return (
    <div className='overflow-x-scroll overflow-hidden relative h-full'>
        <table className='w-full table-auto border border-boarder divide-y divide-boarder'>
          <thead>
            <tr className='bg-dryGray '>
                <th scope='col' className={`${Head}`}>Image</th>
                <th scope='col' className={`${Head}`}>Name</th>
                <th scope='col' className={`${Head}`}>Email</th>
                <th scope='col' className={`${Head}`}>Mobile no</th>
                <th scope='col' className={`${Head} text-end`}>Actions</th>

            </tr>
          </thead>
          <tbody className='bg-main divide-y divide-gray-800'>
            {users.map((user,i) => Rows(user,i,statusChange))}
          </tbody>
        </table>
    </div>
  )
}

export default UserTable