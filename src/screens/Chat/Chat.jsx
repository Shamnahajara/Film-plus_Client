import { AiOutlinePaperClip } from 'react-icons/ai'
import { RiSendPlaneFill } from 'react-icons/ri'
import axiosInstance from '../../api/axios'
import { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { CiMenuKebab } from 'react-icons/ci'
import { toast } from 'react-hot-toast'
import io from "socket.io-client"
const END_POINT = "https://api.filmplus.website"
// const END_POINT = "http://localhost:3000"
let socket;


function Chat() {
    const { userId } = useSelector((state) => state.User)
    const [user, setUser] = useState('')
    const [suggUsers, setSuggUsers] = useState([])
    const [chatList, setChatList] = useState([]);
    const [grpChat, setgrpChat] = useState([])
    const [communitylist, setCommunitylist] = useState([]);
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [reciever, setReciever] = useState('')
    const [chatId, setChatId] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [communitypro, setCommunityPro] = useState('')
    const [chatType, setChatType] = useState('community');
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef()




    useEffect(() => {
        socket = io(END_POINT)
        socket.emit('setup', userId)
        socket.on('connection', chatId?._id)
        return () => {
            socket.disconnect()
        }
    }, [chatId._id])

    // ................USER-INFO
    useEffect(() => {
        axiosInstance.get(`/user/userInfo`).then((res) => {
            setUser(res.data.user)
        })
    }, [])

    //..................CREATE-ONE-TO-ONE-CHAT
    const createChat = (recieverId) => {
        axiosInstance.post(`/user/createchat/${recieverId}`)
        setLoading(!loading)
    }

    // .................ACCEPT-REQUST-TO-RECIEVER
    const accept = (chatId) => {
        axiosInstance.patch(`/user/acceptreq/${chatId}`)
    }

    // ..................ADD-MESSAGE-AFTER-ACCEPTED-REQUEST
    const addMessage = async (chatId) => {
        try {
            if (message.trim().length !== 0) {
                await axiosInstance.post('/user/addmessagecommunity', { message, chatId, userId }).then((res) => {
                    let updMsg = [...messages, res.data.msg];
                    setMessages(updMsg);
                    setMessage('');
                    setLoading(!loading);
                    socket.emit('new message', res?.data?.msg, chatId);
                })
            }
        } catch (err) {
            console.error(err);
        }
    };

    // ........................SELECTED-ONE-TO-ONE-MESSAGE-POPULATE-MESSSAGES
    const accessmessage = async (recieverId) => {
        axiosInstance.get(`/user/accessmessage/${recieverId}`).then((res) => {
            setMessages(res.data.messages)
            setReciever(res.data.reciever)
            setChatId(res.data.chatId)
            socket.emit('joinChat', chatId?._id)

        })
    }

    // ....................SELECTED-GROUP-MESSAGE-POPULATE-MESSAGE
    const accessCommunityMsg = (chatId) => {
        axiosInstance.get(`/user/accesscommunitymsg/${chatId}`).then((res) => {
            setChatId(res.data.chatId)
            setMessages(res.data.messages)
            socket.emit('joinChat', chatId?._id)
        })
    }

    // .................CHAT-LIST-OF-USER-ONE-TO-ONE
    useEffect(() => {
        axiosInstance.get(`/user/chatlist/${userId}`).then((res) => {
            setChatList(res.data.oneOnOneChats)
            setgrpChat(res.data.groupChats)


        }).catch((err) => {
            console.error("chatlist error", err)
        })
    }, [userId,loading]);


    //...............COMMUNITY-LIST-OF-USER
    useEffect(() => {
        axiosInstance.get('/user/communitylist').then((res) => {
            setCommunitylist(res.data.communityList)
        })
    }, [userId,loading])

    //..................SUGGESTING-SIMILAR-USERS
    useEffect(() => {
        axiosInstance.get(`/user/connectmembers/${userId}`).then((res) => {
            setSuggUsers(res.data.similarUsers);
        }).catch((err) => {
            console.error('no users', err)
        })
    }, [userId,loading]);

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
                setCommunityPro(reader.result)
            }
            reader.onerror = (err) => {
                console.log(err);
            }
        } else {
            toast.error('Add valid image')
        }
    };

    // .....................CREATING-COMMUNITY
    const createCommunity = () => {
        if (name.trim().length == 0 || description.trim().length == 0) {
            toast.error('please fill all the field')
        } else {
            axiosInstance.post(`/user/createcommunity`, { name, description, communitypro }).then((res) => {
                if (res?.data?.errMsg) {
                    toast.error(res.data.errMsg)
                } else {
                    toast.success(res?.data?.message)
                    setLoading(!loading)
                }
            })
        }
    }
    // ....................JOIN-TO-COMMUNITY
    const joinCommunity = (chatId) => {
        axiosInstance.patch(`/user/jointocommunity/${chatId}`).then((res) => {
            toast.success(res.data.message)
        })
    }

    useEffect(() => {
        socket.on('messageResponse', (msg, room) => {

            if (room === chatId?._id) {
                let updMsg = [...messages, msg];
                setMessages(updMsg)
            }
        })
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, chatId]);


    return (
        <>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* dialog for user profile */}
                    <dialog id="my_modal_3" className='modal' >
                        <div className=" modal-box  w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-main dark:border-gray-700">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost border-none absolute right-2 top-2">✕</button>
                            </form>
                            <div className="flex flex-col items-center pb-9">
                                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user?.profileImage} alt="Bonnie image" />
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user?.name}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{user?.workingAs}</span>
                            </div>
                            <div className="flex flex-col items-start pb-10">
                                <h5 className="mb-1 text-sm  text-gray-900 dark:text-white">{user?.email}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{user.phone}</span>
                            </div>
                        </div>
                    </dialog>
                    {/* dialog for add community  */}
                    <dialog id="my_modal_4" className="modal">
                        <div className="modal-box bg-main">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                                <h3 className="font-bold text-lg">Create your own Community</h3>
                                <p className="py-4">Create a community where people who share your interests, passions, or goals can come together. Your community can be a hub for enthusiasts, professionals, hobbyists, or anyone with a common purpose.</p>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Community name?</span>
                                    </label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Community name" className="input input-bordered w-full max-w-xs" />
                                    <label className="label">
                                        <span className="label-text">Tell about community?</span>
                                    </label>
                                    <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" className="input input-bordered w-full max-w-xs" />
                                    <label className="label">
                                        <span className="label-text">Community Profile</span>
                                    </label>
                                    <input type="file" name="photo" accept=".jpg,.jpeg,.png" id="file" onChange={handleImageChange}
                                        className="file-input file-input-bordered w-full max-w-xs" />
                                </div>
                                <button onClick={createCommunity} className="btn btn-sm bg-subMain mt-2">Create</button>
                            </form>
                        </div>
                    </dialog>
                    <div>
                        <div className='relative min-h-screen flex flex-col bg-gray-50' >
                            {/* chat layout starts here   */}
                            <div className='flex-grow w-full max-w-7xl mx-auto lg:flex'>
                                <div className=' flex-1 min-w-0 xl:flex'>
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
                                                <label htmlFor="my-drawer" className="btn btn-sm  hover:bg-gray-100 border mb-1 rounded-full  h-2 w-60 border-subMain hover:border-subMain text-white hover:text-gray-600 bg-subMain drawer-button">suggested</label>
                                                <label onClick={() => document.getElementById('my_modal_4').showModal()} className="btn btn-sm  hover:bg-gray-100 border mb-1 rounded-full  h-2 w-60 border-white  text-white hover:text-gray-600 bg-blue-600 drawer-button">Add Community+</label>
                                                {/* Add the Community and One-to-One chat buttons here */}
                                                <div className="flex space-x-2 py-2   border-gray-500">
                                                    <button
                                                        onClick={() => {
                                                            setChatType('community')
                                                        }}
                                                        className={`btn btn-sm hover:bg-gray-100 border mb-1 rounded-full h-2 w-auto ${chatType === 'community' ? 'border-subMain text-white bg-subMain' : 'border-gray-200 text-gray-500'}`}
                                                    >
                                                        Communities
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setChatType('one-to-one')

                                                        }}
                                                        className={`btn btn-sm hover:bg-gray-100 border mb-1 rounded-full h-2 w-32 ${chatType === 'one-to-one' ? 'border-subMain text-white bg-subMain' : 'border-gray-200 text-gray-500'}`}
                                                    >
                                                        Chats
                                                    </button>
                                                </div>
                                                {/* search box ends */}
                                                {/* users */}
                                                {
                                                    chatType == 'one-to-one' ?
                                                        chatList.map((chat, i) => {
                                                            const otherUsers = chat.users.filter(user => user._id !== userId);
                                                            return (
                                                                <div
                                                                    onClick={() => {
                                                                        accessmessage(otherUsers[0]?._id);
                                                                    }} key={i} className="relative rounded-lg px-2 py-2 flex items-start space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 bg-gray-200">
                                                                    <div className="flex-shrink-0">
                                                                        <img src={otherUsers[0]?.profileImage} alt="" className="w-10 h-10 rounded-full" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <a className="focus:outline-none">
                                                                            <div className="flex items-center justify-between">
                                                                                <p className="text-sm font-bold text-red-600">{otherUsers[0]?.name}</p>
                                                                                <div className="text-gray-400 text-xs">{new Date(chat?.createdAt).toLocaleDateString()}</div>
                                                                            </div>
                                                                            <div className="flex items-center justify-between">
                                                                                <p className="text-sm text-gray-500 truncate">{chat?.latestMessage?.message}</p>
                                                                                {
                                                                                    chat.requested.accepted ? "" : <div className="text-white text-xs bg-blue-400 rounded-full px-1 py-0">Requested</div>
                                                                                }
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })
                                                        :
                                                        grpChat.map((chat, i) => {
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    onClick={() => {
                                                                        accessCommunityMsg(chat._id);
                                                                    }} className="relative rounded-lg px-2 py-2 flex items-start space-x-3 hover:border-gray-400 focus-within:ring-2 mb-3 bg-gray-200">
                                                                    <div className="flex-shrink-0">
                                                                        <img src={chat?.groupProfile} alt="" className="w-10 h-10 rounded-full" />
                                                                    </div>
                                                                    <div className="flex-1 min-w-0">
                                                                        <a className="focus:outline-none">
                                                                            <div className="flex items-center justify-between">
                                                                                <p className="text-sm font-bold text-red-600">{chat?.chatName}</p>
                                                                                <div className="text-gray-400 text-xs">{new Date(chat.createdAt).toLocaleDateString()}</div>
                                                                            </div>
                                                                            <div className="flex items-center justify-between">
                                                                                <p className="text-sm text-gray-500 truncate">{chat.latestMessage.message}</p>
                                                                            </div>
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })

                                                }
                                                {/* user end */}
                                            </div>
                                        </div>
                                    </div>
                                    {/* middle content starts here */}
                                    {
                                        chatId == "" ?
                                            <div className='flex-1 p-2 sm:pb-6 justify-between flex flex-col h-screen xl:flex'>
                                                {/* Other chat UI elements */}
                                                <div className="flex justify-center items-center h-full">
                                                    <p className="text-red-600">Select chat start messaging...</p>
                                                </div>
                                                {/* Other chat UI elements */}
                                            </div>
                                            : chatId?.requested?.accepted == false ? <div className='flex-1 p-2 sm:pb-6 justify-between flex flex-col h-screen xl:flex'>
                                                {/* Other chat UI elements */}
                                                <div className='flex sm:items-center justify-between border-b border-gray-200 py-3'>
                                                    <div className='flex items-center space-x-4'>
                                                        {
                                                            chatId?.isGroupchat == true ?

                                                                <img src={chatId?.groupProfile} alt='group profile' className='w-10 sm:w-12 h-10 sm:h-12 rounded-full border-none cursor-pointer' />
                                                                :
                                                                <img src={reciever?.profileImage} alt='user profile' className='w-10 sm:w-12 h-10 sm:h-12 rounded-full border-none cursor-pointer' />

                                                        }
                                                        <div className='flex flex-col leading-tight'>
                                                            <div className='text-xl mt-1 flex items-center'>
                                                                {/* {
                                                                    !chatId?.isGroupchat ?
                                                                        <span className='text-gray-700 mr-3'>{reciever?.name}</span>
                                                                        :
                                                                        <span className='text-gray-700 mr-3'>-------</span>

                                                                } */}
                                                                <span className='text-gray-700 mr-3'>{reciever?.name}</span>

                                                                {/* <span className='text-green-500'>
                                                                        <svg width={10} height={10}>
                                                                            <circle cx={5} cy={5} r={5} fill='currentColor' />
                                                                        </svg>
                                                                    </span> 
                                                                    */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='flex items-center space-x-2'>
                                                        <button className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none '>
                                                            <CiMenuKebab className='h-6 w-6' />
                                                        </button>
                                                    </div>
                                                </div>
                                                {
                                                    chatId?.requested?.requestId == userId ?
                                                        <div className="flex justify-center items-center h-full">
                                                            <div id="toast-interactive" className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                                                                <div className="flex">
                                                                    <div className="ml-3 text-sm font-normal">
                                                                        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white"> Requested</span>
                                                                        <div className="mb-2 text-sm font-normal">You requested to connect with {reciever.name} .After Accepted your request you cant start sending messages  </div>
                                                                    </div>
                                                                    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" aria-label="Close">
                                                                        <span className="sr-only">Close</span>
                                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        :
                                                        <div className="flex justify-center items-center h-full">
                                                            <div id="toast-interactive" className="w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400" role="alert">
                                                                <div className="flex">
                                                                    <div className="ml-3 text-sm font-normal">
                                                                        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Accept request</span>
                                                                        <div className="mb-2 text-sm font-normal">"I'm {reciever.name} excited to connect with you!  </div>
                                                                        <div className="grid grid-cols-2 gap-2">
                                                                            <div>
                                                                                <button onClick={() => accept(chatId._id, reciever._id)} className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">Accept</button>
                                                                            </div>
                                                                            <div>
                                                                                <button className="inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Delete</button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" aria-label="Close">
                                                                        <span className="sr-only">Close</span>
                                                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                                        </svg>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                }
                                                {/* Other chat UI elements */}
                                            </div> :
                                                <div className=' flex-1 p-2 sm:pb-6 justify-between flex flex-col h-screen xl:flex'>
                                                    <div className='flex sm:items-center justify-between border-b border-gray-200 py-3'>
                                                        <div className='flex items-center space-x-4'>
                                                            {
                                                                chatId?.isGroupchat == true ?

                                                                    <img src={chatId?.groupProfile} alt='group profile' className='w-10 sm:w-12 h-10 sm:h-12 rounded-full border-none cursor-pointer' />
                                                                    :
                                                                    <img src={reciever?.profileImage} alt='user profile' className='w-10 sm:w-12 h-10 sm:h-12 rounded-full border-none cursor-pointer' />

                                                            }
                                                            <div className='flex flex-col leading-tight'>
                                                                <div className='text-xl mt-1 flex items-center'>
                                                                    {
                                                                        !chatId?.isGroupchat ?
                                                                            <span className='text-gray-700 mr-3'>{reciever?.name}</span>
                                                                            :
                                                                            <span className='text-gray-700 mr-3'>{chatId?.chatName}</span>

                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className='flex items-center space-x-2'>
                                                            <button className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none '>
                                                                <CiMenuKebab className='h-6 w-6' />
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
                                                                                        <img src={message?.sender?.profileImage} alt="profile" className='w-6 h-6 rounded-full order-1' />
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
                                                    <div className='border-t-2 border-gray-200 px-4 pt-4  mb-16'>
                                                        <div className='relative flex'>
                                                            <span className='absolute insert-y-0 flex  items-center'>
                                                                <button
                                                                    className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                                                    <AiOutlinePaperClip className='h-6 w-6' />
                                                                </button>
                                                            </span>
                                                            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder='type here' type="text" className='border focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' />
                                                            <button
                                                                onClick={() => addMessage(chatId._id)}
                                                                className=' ml-1 inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
                                                                <RiSendPlaneFill className='h-6 w-6 text-red-500' />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                    }
                                </div>
                                {/* <div className='bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block'>
                                    <div className='h-full py-6 pl-6 lg:w-80 '>
                                        <div className='h-full relative'>
                                            <div className='m-auto text-center mb-10'>
                                                <img className='w-36 h-36 rounded-full m-auto' src={profile} alt="" />
                                                <h2 className='m-auto text-black text-2xl mt-2'>Kina Nayer</h2>
                                            </div>
                                            <div className='mb-2'>
                                                <h2 className='text-black'>Attachments</h2>
                                            </div>
                                            <div className='grid grid-cols-4 gap-2'>
                                                <div>
                                                    <div className='cursor-pointer bg-gray-300 hover:bg-gray-400 h-14  w-full'></div>
                                                </div>
                                                <div>
                                                    <div className='cursor-pointer bg-gray-300 hover:bg-gray-400 h-14  w-full'></div>
                                                </div>
                                                <div>
                                                    <div className='cursor-pointer bg-gray-300 hover:bg-gray-400 h-14  w-full'></div>
                                                </div>
                                                <div>
                                                    <div className='cursor-pointer bg-gray-300 hover:bg-gray-400 h-14  w-full'></div>
                                                </div>
                                                <div>
                                                    <div className='cursor-pointer bg-gray-300 hover:bg-gray-400 h-14  w-full'></div>
                                                </div>
                                                <div>
                                                    <div className='cursor-pointer bg-gray-300 hover:bg-gray-400 h-14  w-full'></div>
                                                </div>
                                                <div>
                                                    <div className='cursor-pointer bg-gray-300 hover:bg-gray-400 h-14  w-full'></div>
                                                </div>
                                                <div>
                                                    <div className='cursor-pointer bg-gray-300 hover:bg-gray-400 h-14  w-full'></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
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
                                                        <p className='text-sm text-gray-500 truncate'>{list?.latestMessage?.message}</p>
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
        </>
    )
}

export default Chat