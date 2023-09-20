import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Autoplay } from 'swiper/modules'; 
import {Link} from 'react-router-dom'
import {FaRegCalendarAlt  } from 'react-icons/fa';
import {BsFillCartPlusFill} from 'react-icons/bs'
import {BiTime} from 'react-icons/bi'
import rentBanner from '../../../images/banner-rent.jpg'





function RentBanner() {
  return (
    <>
     
    <div className='relative w-full'>
      <Swiper
        direction='vertical'
        spaceBetween={0}
        slidesPerView={1} 
        loop={true}
        speed={1000}
        modules={[Autoplay]}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className='w-full xl:h-96 bg-dry lg:h-64 h-48'
      >
    
          <SwiperSlide  className='relative rounded overflow-hidden'>
            <img src={rentBanner} alt={``} className='w-full h-full object-cover' />
            <div className='absolute linear-bg xl:pl-52 sm:pl-32 pl-8 top-0 bottom-0 right-0 left-0 flex flex-col justify-center lg:gap-8 md:gap-5 gap-4'>
                <h1 className='xl:text-4xl truncate capitalize font-sans sm:text-2xl text-xl font-bold'>
                    Find producs & Make Master piece
                </h1>
                <div className='flex gap-5 items-center text-dryGray '>
                    <div className='flex items-center gap-2'>
    <span className='text-sm font-medium'>Film Plus provide here providing quality products from our users.Provide more product from you</span>
   </div>
  
  
                </div>
                <div className='flex gap-5 items-center'>
                    <Link to={`/addproduct`} className='bg-subMain hover:text-main transitions text-white px-8 py-3 rounded font-medium sm:text-sm text-xs '>
                     Add Product
                    </Link>
                   
                </div>
            </div>
          </SwiperSlide>
        
      </Swiper>
    </div>
    </>
  );
}

export default RentBanner;
