import {FiUser} from 'react-icons/fi'
import sideImg from '../../images/avangers.jpg'

function Promos() {
  return (
    <div className='my-20 py-10 md:px-20 px-8 bg-dry'>
      <div className='lg:grid lg:grid-cols-2 lg:gap-10 items-center'>
        <div className='flex lg:gap-10 gap-6 flex-col'>
          <h1 className='xl:text-3xl text-xl capitalize font-sans  font-medium xl:leading-relaxed text-white'>
            Find your Favorites &<br /> Watch trailers from our website
            </h1>
            <p className='text-text text-sm xl:text-base leading-6 xl:leading-8'>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English
            </p>
            <div className='flex gap-4 md:text-lg text-sm'>
              <div className='flex-colo bg-black text-subMain px-6 py-3 rounded-md'>
                HD 4K
              </div>
               <div className='flex-rows gap-4 bg-black text-subMain px-6 py-3 rounded-md'>
                <FiUser/> 2K
              </div>

            </div>
        </div>
        <div>
           <img src={sideImg} alt='' className='border border-border p-1 hover:scale-95 transitions relative rounded w-full object-contain'/>
        </div>
      </div>
    </div>
  )
}

export default Promos