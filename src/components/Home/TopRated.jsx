import { useState } from 'react'
import Titles from '../Titles'
import {BsBookmarkStarFill, BsCaretLeft, BsCaretRight} from 'react-icons/bs'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation,Autoplay} from 'swiper/modules'
import {BsHeart,BsHeartFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import Stars from '../Stars'
import { imageURL} from '../../api/constance';




function TopRated({toprated,addTofav,favorites, remove}) {
  const [nextEl ,setNextEl] = useState(null)
  const [prevEl ,setPrevEl] = useState(null)
  const classNames = 'hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white'

  

  return (
  <>
  <div className='may-16'>
    <Titles title='Top Rated' Icon={BsBookmarkStarFill}/>
    <div className='mt-10'>
        <Swiper 
        navigation={{nextEl,prevEl}}
        slidesPerView={4}
        spaceBetween={40}
        autoplay={true}
        speed={1000}
        loop={true}
        modules={[Navigation,Autoplay]}
        breakpoints={{
          0: {
              slidesPerView: 1,
              spaceBetween:10
          },
          768: {
              slidesPerView: 2,
              spaceBetween:20

          },
          1024: {
              slidesPerView: 3,
              spaceBetween:30
          },
          1280: {
              slidesPerView: 4,
              spaceBetween: 40,
          },
      }}
        >
          {
            toprated.map((movie,index)=>(
              <SwiperSlide key={index }>
                <div className='p-4 h-rate hovered border border-boarder bg-dry rounded-lg overflow-hidden'>
                   <img src={`${imageURL+movie.poster_path}`} alt=''
                   className='w-full h-full object-cover rounded-lg'/>
                </div>
                <div className='px-4 gap-6 flex-colo hoveres absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0'>
                  <button className='w-12 h-12 flex-colo transitions  rounded-full bg-white bg-opacity-30 text-subMain '>
                  {favorites.some((favMovie) => favMovie._id === movie._id) ? (
                               <BsHeartFill onClick={() => remove(movie._id)} />
                       ) : (
                               <BsHeart onClick={() => addTofav(movie._id)} />
                      )}
                  </button>
                  <Link className='font-semibold text-xl truncated line-clamp-2' to={`/movie/${movie._id}`}>
                    {movie.title}
                  </Link>
                  <div className='flex gap-2 text-star '>
                    <Stars value={movie.vote_average}/>
                  </div>
                </div>
              </SwiperSlide>
            ))
          }
        </Swiper>
        <div className='w-full px-1 flex-rows gap-6 pt-12'>
          <button className={classNames} ref={(node)=> setPrevEl(node)}>
            <BsCaretLeft/>
          </button>
          <button className={classNames} ref={(node)=> setNextEl(node)}>
            <BsCaretRight/>
          </button>
        </div>
    </div>
  </div>
  </>
  )
}

export default TopRated