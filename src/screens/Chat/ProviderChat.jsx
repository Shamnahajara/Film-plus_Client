import { useState , useEffect } from 'react'
import profile from '../../images/Murphy.jpeg'
import {AiOutlinePaperClip} from 'react-icons/ai'
import {RiSendPlaneFill} from 'react-icons/ri'
import {useSelector} from 'react-redux'
import axiosInstance from '../../api/axios'

function ProviderChat() {

    const {userId} = useSelector((state)=>state.User)
    const [user,setUser] = useState('')
    const [allUsers,setAllusers] = useState([])
    useEffect(()=>{
        axiosInstance.get(`/user/userInfo/${userId}`).then((res)=>{
            console.log(res.data.user)
            setUser(res.data.user)
        })
    },[])
  return (
    <div>
        <div>
            <div className='relative min-h-screen flex flex-col bg-gray-50' >
                {/* chat layout starts here */}
                <div className='flex-grow w-full max-w-7xl mx-auto lg:flex'>
                    <div className=' flex-1 min-w-0 xl:flex'>
                        <div className='border-b border-gray-200 xl:flex-shrink-0 xl:w-64  xl:border-r xl:border-gray-200 bg-gray-50'>
                            <div className='h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0'>
                                <div className='h-full relative'>

                                    <div className='relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:right-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4'>
                                        <div className='flex-shrink-0'>
                                            <img src={user.profileImage} alt=""  className='h-12 w-12 rounded-full'/>
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <a href=''  className='focus:outline-none'>
                                                <span className='absolute inset-0'/>
                                                <p className='text-sm font-bold text-red-600'>{user.name}</p>
                                                <p className='text-sm text-gray-500 truncate'>{user.email}</p>
                                            </a>
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
                                            <img src={profile} alt=""  className='w-10 h-10 rounded-full'/>
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <a href='#'className='focus:outline-none'>
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
                                            <img src={profile} alt=""  className='w-10 h-10 rounded-full'/>
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <a href='#'className='focus:outline-none'>
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
                                            <img src={profile} alt=""  className='w-10 h-10 rounded-full'/>
                                        </div>
                                        <div className='flex-1 min-w-0'>
                                            <a href='#'className='focus:outline-none'>
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

                {/* middle content starts here */}
                        <div className=' flex-1 p-2 sm:pb-6 justify-between flex flex-col h-screen hidden xl:flex'>
                          <div className='flex sm:items-center justify-between border-b border-gray-200 py-3'>
                            <div className='flex items-center space-x-4'>
                                <img src={profile} alt='' className='w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer'/>
                                <div className='flex flex-col leading-tight'>
                                    <div className='text-xl mt-1 flex items-center'>
                                        <span className='text-gray-700 mr-3'>Kina Nayer</span>
                                        <span className='text-green-500'>
                                            <svg width={10} height={10}>
                                                <circle cx={5} cy={5} r={5} fill='currentColor'/>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='flex items-center space-x-2'>
                                <button className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none '>
                                    <svg
                                     className='h-6 w-6'
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke='currentColor'>
                                     <path 
                                     strokeLinecap='round'
                                     strokeLinejoin='round'
                                     strokeWidth={2}
                                     d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/>
                                    </svg>
                                </button>

                                <button className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none '>
                                    <svg
                                     className='h-6 w-6'
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 24 24"
                                     stroke='currentColor'>
                                        <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 21.35c-0.45-0.41-1.17-0.41-1.62 0L2 13.5C2 10.42 4.42 8 7.5 8c1.74 0 3.41 0.81 4.5 2.09C13.59 8.81 15.26 8 16.99 8 20.07 8 22.49 10.42 22.49 13.5c0 3.88-4.87 6.92-10.49 7.85z"
                                        />
                                    </svg>
                                </button>
                            </div>
                          </div>
                          {/* messages starts here */}
                          <div id='messages' className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                          {/* first message */}
                            <div className='chat-message'>
                                <div className='flex items-end'>
                                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                                                Lorem ipsum
                                            </span>
                                        </div>
                                    </div>
                                    <img src={profile} alt="" className='w-6 h-6 rounded-full order-1'/>
                                </div>
                            </div>
                            {/* second message */}
                            <div className='chat-message'>
                                <div className='flex items-end'>
                                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                                                Lorem ipsum wwwwwww
                                            </span>
                                        </div>
                                    </div>
                                    <img src={profile} alt="" className='w-6 h-6 rounded-full order-1'/>
                                </div>
                            </div>
                            {/* another side  */}
                            <div className='chat-message'>
                                <div className='flex items-end justify-end'>

                                <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-red-500 text-white'>
                                                Lorem ipsum wwwwwww
                                            </span>
                                        </div>
                                    </div>
                                    <img src={profile} alt="" className='w-6 h-6 rounded-full order-2'/>
                                </div>
                            </div>
                            {/* third message  */}
                            <div className='chat-message'>
                                <div className='flex items-end'>
                                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                                                Lorem ipsum wwwwwww
                                            </span>
                                        </div>
                                    </div>
                                    <img src={profile} alt="" className='w-6 h-6 rounded-full order-1'/>
                                </div>
                            </div>
                            {/* .... */}
                            <div className='chat-message'>
                                <div className='flex items-end'>
                                    <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                                                Lorem ipsum wwwwwww shzxn
                                            </span>
                                        </div>
                                    </div>
                                    <img src={profile} alt="" className='w-6 h-6 rounded-full order-1'/>
                                </div>
                            </div>
                            {/* ,,,,,, */}
                            <div className='chat-message'>
                                <div className='flex items-end justify-end'>

                                <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-red-500 text-white'>
                                                Lorem ipsum wwwwwww
                                            </span>
                                        </div>
                                    </div>
                                    <img src={profile} alt="" className='w-6 h-6 rounded-full order-2'/>
                                </div>
                            </div>
                            {/* .. */}
                            <div className='chat-message'>
                                <div className='flex items-end justify-end'>
                                <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'>
                                        <div>
                                            <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-red-500 text-white'>
                                                okey cool
                                            </span>
                                        </div>
                                    </div>
                                    <img src={profile} alt="" className='w-6 h-6 rounded-full order-2'/>
                                </div>
                            </div>
                          </div>
                        {/* message ends hera */}
                        <div className='border-t-2 border-gray-200 px-4 pt-4  mb-16'>
                                <div className='relative flex'>
                                    <span className='absolute insert-y-0 flex  items-center'>
                                      <button 
                                        className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                          <AiOutlinePaperClip className='h-6 w-6'/>
                                      </button>
                                    </span>
                                    <input placeholder='type here' className='border focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-100 rounded-full py-3 border-gray-200'/>
                                      <button 
                                        className=' ml-1 inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                          <RiSendPlaneFill className='h-6 w-6 text-red-500'/>
                                      </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProviderChat