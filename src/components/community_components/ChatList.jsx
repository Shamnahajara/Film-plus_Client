import { useEffect, useState } from 'react'
import axiosInstance from '../../api/axios'
import profile from '../../images/Murphy.jpeg'



function ChatList() {
    const [user, setUser] = useState('')

    useEffect(() => {
        axiosInstance.get(`/user/userInfo`).then((res) => {
            setUser(res.data.user)
        })
    }, [])
    return (
        <>
            {/* dialog for user profile */}
            <dialog id="my_modal_3" className='modal' >
                <div className=" modal-box  w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-main dark:border-gray-700">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost border-none absolute right-2 top-2">✕</button>
                    </form>
                    <div className="flex flex-col items-center pb-9">
                        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user?.profileImage} alt="User profile" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{user?.workingAs}</span>
                    </div>
                    <div className="flex flex-col items-start pb-10">
                        <h5 className="mb-1 text-sm  text-gray-900 dark:text-white">{user?.email}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</span>
                    </div>
                </div>
            </dialog>
            <div className='border-b border-gray-200 xl:flex-shrink-0 xl:w-64  xl:border-r xl:border-gray-200 bg-gray-50'>
                <div className='h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                    <div className='h-full relative'>
                        <div className='relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:right-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4'>
                            <div className='flex-shrink-0'>
                                <img src={user?.profileImage} alt="" className='h-12 w-12 rounded-full' />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <button onClick={() => document.getElementById('my_modal_3').showModal()} href='' className='focus:outline-none'>
                                    <span className='absolute inset-0' />
                                    <p className='text-sm font-bold text-red-600'>{user.name}</p>
                                    <p className='text-sm text-gray-500 truncate'>{user.email}</p>
                                </button>
                            </div>
                        </div>
                        <div className='mb-4'>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                                    <svg
                                        className='h-5 w-5 text-gray-400'
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zm-6 4a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input placeholder='Search here' className='focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm  border-gray-100 rounded-full p-2 border' />
                            </div>
                        </div>
                        {/* search box ends */}
                        {/* users */}
                        <div className='relative rounded-lg px-2 py-2  flex items-start space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 bg-gray-200'>
                            <div className='flex-shrink-0'>
                                <img src={profile} alt="" className='w-10 h-10 rounded-full' />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <a href='#' className='focus:outline-none'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-bold text-red-600'>Lina Dry</p>
                                        <div className='text-gray-400 text-xs '>
                                            12:35 AM
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-gray-500 truncate'>Hi</p>
                                        <div className='text-white text-xs bg-red-400 rounded-full px-1 py-0'>2</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* users 2 */}
                        <div className='relative rounded-lg px-2 py-2  flex items-start space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 bg-gray-200'>
                            <div className='flex-shrink-0'>
                                <img src={profile} alt="" className='w-10 h-10 rounded-full' />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <a href='#' className='focus:outline-none'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-bold text-red-600'>Lina Dry</p>
                                        <div className='text-gray-400 text-xs '>
                                            12:35 AM
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-gray-500 truncate'>Hi</p>
                                        <div className='text-white text-xs bg-red-400 rounded-full px-1 py-0'>2</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* users 3 */}
                        <div className='relative rounded-lg px-2 py-2  flex items-start space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 bg-gray-200'>
                            <div className='flex-shrink-0'>
                                <img src={profile} alt="" className='w-10 h-10 rounded-full' />
                            </div>
                            <div className='flex-1 min-w-0'>
                                <a href='#' className='focus:outline-none'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm font-bold text-red-600'>Lina Dry</p>
                                        <div className='text-gray-400 text-xs '>
                                            12:35 AM
                                        </div>
                                    </div>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-gray-500 truncate'>Hi</p>
                                        <div className='text-white text-xs bg-red-400 rounded-full px-1 py-0'>2</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* user end */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatList