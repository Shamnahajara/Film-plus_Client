

function User_Detail(props) {

  const user = props.user; 
  const setEdit = props.setEdit;

  return (
    <div className='flex justify-center items-center backdrop-blur-sm w-full h-full'>
      <div className="container justify-center py-5">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="p-4 col-span-2">
            <div className=''>
              <div className="card rounded-md bg-opacity-80 bg-white mb-4">
                <div className='flex justify-end p-2'>
                  <a onClick={() => setEdit(true)} className='bg-transparent text-blue-500 font-semibold hover:text-blue-700'>Edit Profile</a>
                </div>
                <div className="card-body text-center">
                    {user.profileImage?<img src={user.profileImage} alt="avatar" className="rounded-md h-40 w-40 mx-auto" />:
                    <img src='../../../../public/images/emptyProfile.webp' alt="avatar" className="rounded-md h-40 w-40 mx-auto" />}
                  <h5 className="my-3">{user.name}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 col-span-3">
            <div className="card p-2 rounded-md bg-opacity-80 bg-white mb-4">
              <div className="card-body">
                <div className="flex items-center">
                  <p className="w-1/3 font-semibold">Full Name</p>
                  <p className="text-black mb-0">{user.name}</p>
                </div>
                <hr className="my-2" />
                <div className="flex items-center">
                  <p className="w-1/3 font-semibold">Email</p>
                  <p className="text-black mb-0">{user.email}</p>
                </div>
                <hr className="my-2" />
                <div className="flex items-center">
                  <p className="w-1/3 font-semibold">Phone</p>
                  <p className="text-black mb-0">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User_Detail;
