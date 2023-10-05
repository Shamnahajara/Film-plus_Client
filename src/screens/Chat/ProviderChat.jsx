import { useState, useEffect, useRef } from 'react'
import { AiOutlinePaperClip } from 'react-icons/ai'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import axiosInstance from '../../api/axios'
import io from "socket.io-client"
import { useParams } from 'react-router-dom'
const END_POINT = "https://api.filmplus.website"
// const END_POINT = "http://localhost:3000"
let socket;

function ProviderChat() {
    const { providerId } = useParams()
    const { userId } = useSelector((state) => state.User)
    const [user, setUser] = useState('')
    const [otherUser, setOtherUser] = useState('')
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const [provider, setProvider] = useState([])
    const [loading, setLoading] = useState(false)
    const [chatId, setChatId] = useState('')
    const [chats, setChats] = useState([])
    const bottomRef = useRef()


    useEffect(() => {
        socket = io(END_POINT)
        socket.emit('setup', userId)
        socket.on('connection', chatId)
        return () => {
            socket.disconnect()
        }
    }, [chatId])

    // ...ACCESS-MESSAGE
    const accessMessage = (recieverId) => {
        axiosInstance.get(`/user/providerChat/${recieverId}`).then((res) => {
            setMessages(res.data.messages)
            setChatId(res.data.chatId)
            setOtherUser(res.data.otherUser)

            socket.emit('joinChat', chatId)
        })
    }

    // ...USER-INFO
    useEffect(() => {
        axiosInstance.get(`/user/userInfo`).then((res) => {
            setUser(res.data.user)
        }).catch((err) => {
            console.err("failed to fetch all users", err)
        })
    }, [userId])


    // ....CHAT-LISTS
    useEffect(() => {
        if (providerId) {
            axiosInstance.get(`/user/providerInfo/${providerId}`).then((res) => {
                setProvider(res.data.provider)
            })
            accessMessage(providerId)

        } else {

            axiosInstance.get(`/user/chatslist/${userId}`)
                .then((response) => {
                    setChats(response.data.results);
                })
                .catch((error) => {
                    console.error('Error fetching chat data:', error);
                });
        }

    }, [userId]);


    // .....ADD MESSAGE
    const addMessage = async () => {
        try {
            if (message.trim().length !== 0) {
                await axiosInstance.post('/user/addmessage', { message, chatId, userId }).then((res) => {
                    let updMsg = [...messages, res.data.msg];
                    setMessages(updMsg);
                    setMessage('');
                    setLoading(true);
                    socket.emit('new message', res?.data?.msg, chatId);
                });
            }
        } catch (err) {
            console.error(err);
        }
    };


    useEffect(() => {
        socket.on('messageResponse', (msg, room) => {

            if (room === chatId) {
                let updMsg = [...messages, msg];
                setMessages(updMsg)
            }
        })
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, chatId]);

    return (
        <div className='relative min-h-screen  flex flex-col bg-gray-50' >
            {/* chat layout starts here */}
            <div className='flex-grow w-full max-w-7xl mx-auto lg:flex'>
                <div className=' flex-1 min-w-0 xl:flex'>
                    {providerId ? "" :
                        <div className="border border-gray-200 xl:flex-shrink-0 xl:w-64 xl:border-r xl:border-gray-200 bg-gray-50">
                            <div className="h-full pl-4 pr-2 py-6 sm:pl-6 lg:pl-8 xl:pl-0">
                                <div className="h-full relative">
                                    {/* User Profile */}
                                    <div className="relative rounded-lg px-2 py-2 flex items-center space-x-3 hover:border-gray-400 focus-within:right-2 focus-within:ring-offset-2 focus-within:ring-red-500 mb-4">
                                        <div className="flex-shrink-0">
                                            <img src={user?.profileImage} alt="" className="h-12 w-12 rounded-full" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <a href="#" className="focus:outline-none">
                                                <span className="absolute inset-0" />
                                                <p className="text-sm font-bold text-red-600">{user.name}</p>
                                                <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                            </a>
                                        </div>
                                    </div>
                                    {/* Search Box */}
                                    <div className="mb-4">
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg
                                                    className="h-5 w-5 text-gray-400"
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
                                            <input
                                                placeholder="Search here"
                                                className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-100 rounded-full p-2 border"
                                            />
                                        </div>
                                    </div>
                                    {/* Users */}
                                    {
                                        chats.map((chat, i) => {
                                            const otherUsers = chat.users.filter(user => user._id !== userId);
                                            return (
                                                <div onClick={() => accessMessage(otherUsers[0]._id)} key={i} className="relative rounded-lg px-2 py-2 flex items-start space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 bg-gray-200">
                                                    <div className="flex-shrink-0">
                                                        <img src={otherUsers[0]?.profileImage} alt="" className="w-10 h-10 rounded-full" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <a href="#" className="focus:outline-none">
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm font-bold text-red-600">{otherUsers[0]?.name}</p>
                                                                <div className="text-gray-400 text-xs">{new Date(chat.createdAt).toLocaleDateString()}</div>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <p className="text-sm text-gray-500 truncate">{otherUsers[0]?.email}</p>
                                                                {/* <div className="text-white text-xs bg-red-400 rounded-full px-1 py-0"></div> */}
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }


                                    {/* User end */}
                                </div>
                            </div>
                        </div>
                    }

                    {/* middle content starts here */}


                    <div className=' flex-1 p-2 sm:pb-6 justify-between flex flex-col h-screen xl:flex'>
                        <div className='flex sm:items-center justify-between border-b border-gray-200 py-3'>

                            <div className='flex items-center space-x-4'>
                                <img src={otherUser?.profileImage} alt='' className='w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer' />
                                <div className='flex flex-col leading-tight'>
                                    <div className='text-xl mt-1 flex items-center'>
                                        <span className='text-gray-700 mr-3'>{otherUser?.name}</span>
                                        {/* <span className='text-green-500'>
                                            <svg width={10} height={10}>
                                                <circle cx={5} cy={5} r={5} fill='currentColor' />
                                            </svg>
                                        </span> */}
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
                                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
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

                        {/* messages start here */}
                        <div id='messages' className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'>
                            {/* first message */}
                            <div>
                                {
                                    messages?.length === 0 || messages === undefined ? (
                                        <div className="flex justify-center items-center h-full">
                                            <p className="text-gray-500">Start sending messages</p>
                                        </div>
                                    ) : (
                                        <div>
                                            {messages.map((message, i) => (
                                                <div key={i} className='chat-message'>
                                                    {message.sender._id === userId ? (
                                                        <div className='flex items-end justify-end mb-1'>
                                                            <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'>
                                                                <div>
                                                                    <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-red-500 text-white'>
                                                                        {message.message}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <img src={user?.profileImage} alt="" className='w-6 h-6 rounded-full order-2' />
                                                        </div>
                                                    ) : (
                                                        <div className='flex items-end mb-1'>
                                                            <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                                                                <div>
                                                                    <span className='px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-200 text-gray-600'>
                                                                        {message.message}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <img src={message?.sender?.profileImage} alt="" className='w-6 h-6 rounded-full order-1' />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            <div ref={bottomRef} />
                                        </div>
                                    )
                                }
                            </div>
                            {/* place bottomRef here, outside of individual message containers */}
                        </div>
                        {/* message ends here */}


                        <div className='border-t-2 border-gray-200  px-4 pt-4  mb-16'>
                            <div className='relative flex'>
                                <span className='absolute insert-y-0 flex  items-center'>
                                    <button
                                        className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                        <AiOutlinePaperClip className='h-6 w-6' />
                                    </button>
                                </span>
                                <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='type here' type="text" className='border focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' />
                                <button
                                    onClick={addMessage}
                                    className=' ml-1 inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                    <RiSendPlaneFill className='h-6 w-6 text-red-500' />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProviderChat