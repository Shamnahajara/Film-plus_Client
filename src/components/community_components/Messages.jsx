import React from 'react'
import profile from '../../images/Murphy.jpeg'

function Messages() {
  return (
  
    <div className = ' flex-1 p-2 sm:pb-6 justify-between flex flex-col h-screen xl:flex'>
    <div className='flex sm:items-center justify-between border-b border-gray-200 py-3'>
        <div className='flex items-center space-x-4'>
            <img src={profile} alt='' className='w-10 sm:w-12 h-10 sm:h-12 rounded-full cursor-pointer' />
            <div className='flex flex-col leading-tight'>
                <div className='text-xl mt-1 flex items-center'>
                    <span className='text-gray-700 mr-3'>Kina Nayer</span>
                    <span className='text-green-500'>
                        <svg width={10} height={10}>
                            <circle cx={5} cy={5} r={5} fill='currentColor' />
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
                <img src={profile} alt="" className='w-6 h-6 rounded-full order-1' />
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
                <img src={profile} alt="" className='w-6 h-6 rounded-full order-1' />
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
                <img src={profile} alt="" className='w-6 h-6 rounded-full order-2' />
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
                <img src={profile} alt="" className='w-6 h-6 rounded-full order-1' />
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
                <img src={profile} alt="" className='w-6 h-6 rounded-full order-1' />
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
                <img src={profile} alt="" className='w-6 h-6 rounded-full order-2' />
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
                <img src={profile} alt="" className='w-6 h-6 rounded-full order-2' />
            </div>
        </div>
    </div>
    {/* message ends hera */}
    <div className='border-t-2 border-gray-200 px-4 pt-4  mb-16'>
        <div className='relative flex'>
            <span className='absolute insert-y-0 flex  items-center'>
                <button
                    className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300'>
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
                            d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h8m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                        />
                    </svg>
                </button>
            </span>
            <input placeholder='type here' className='border focus:ring-red-500 focus:border-red-500 w-full focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-100 rounded-full py-3 border-gray-200' />
        </div>
    </div>
</div>
  )
}

export default Messages