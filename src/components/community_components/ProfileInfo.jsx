import React from 'react'
import profile from '../../images/Murphy.jpeg'

function ProfileInfo() {
  return (
    <div className='bg-gray-50 pr-4 sm:pr-6 lg:pr-8 lg:flex-shrink-0 lg:border-l lg:border-gray-200 xl:pr-0 hidden xl:block'>
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
</div>
  )
}

export default ProfileInfo
