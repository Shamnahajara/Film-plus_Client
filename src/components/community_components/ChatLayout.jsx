
function ChatLayout({ children }) {
    return (
        
                <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
            <div>
                <div className='relative min-h-screen flex flex-col bg-gray-50' >
                    {/* chat layout starts here */}
                    <div className='flex-grow w-full max-w-7xl mx-auto lg:flex'>
                        {children}
                    </div>
                </div>
            </div>
            </div>
                <div className="drawer-side mt-24">
                    <ul className="menu p-4  w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <div className='h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                            <div className='h-full relative'>
                                <label htmlFor="my-drawer" className="btn btn-sm  hover:bg-gray-100 border mb-1 rounded-full  h-2 w-60 border-subMain hover:border-subMain text-white hover:text-gray-600 bg-subMain drawer-button">suggested</label>
                                <p className='pl-2'>Film-plus suggests users who have similar interests to you </p>
                                <br></br>

                                {/* users */}
                                {
                                    suggUsers.map((user, i) => (
                                        <div key={i} className='relative rounded-lg px-2 py-2  flex items-start space-x-3 focus-within:ring-2 mb-3 '>
                                            <div className='flex-shrink-0'>
                                                <img src={user.profileImage} alt="" className='w-10 h-10 rounded-full' />
                                            </div>
                                            <div className='flex-1 min-w-0'>
                                                <a href='#' className='focus:outline-none'>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-sm font-bold text-red-600'>{user.name}</p>
                                                    </div>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-sm text-gray-500 truncate'>{user.workingAs}</p>
                                                        <div className='text-white text-xs bg-red-400 rounded-full px-1 py-0'>
                                                            <button onClick={() => createChat(user._id)}>Connect</button></div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    ))
                                }
                                <br></br>
                                <p className='pl-2 text-primary'>Communities</p>
                                {
                                    communitylist.map((list, i) => (
                                        <div key={i} className='relative rounded-lg px-2 py-2  flex items-start space-x-3 focus-within:ring-2 mb-3 '>
                                            <div className='flex-shrink-0'>
                                                <img src={list.groupProfile} alt="" className='w-10 h-10 rounded-full' />
                                            </div>
                                            <div className='flex-1 min-w-0'>
                                                <a href='#' className='focus:outline-none'>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-sm font-bold text-red-600'>{list.chatName}</p>
                                                    </div>
                                                    <div className='flex items-center justify-between'>
                                                        <p className='text-sm text-gray-500 truncate'>lorumipsum</p>
                                                        <div className='text-white place-items-center  text-xs w-16 bg-green-400 rounded-full px-1 py-0'>
                                                            <button className="ml-4" onClick={() => joinCommunity(list._id)}>Join</button>
                                                        </div>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    )

                                    )
                                }
                                {/* user end */}
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
            
            
     
    )
}

export default ChatLayout