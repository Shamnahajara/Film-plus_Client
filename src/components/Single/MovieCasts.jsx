import { FaUserFriends } from 'react-icons/fa';
import Titles from '../Titles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

function MovieCasts({ casts }) {
    return (
        <div className='my-12'>
            <Titles title='Casts' Icon={FaUserFriends} />
            <div className='mt-10'>
                <Swiper
                    autoplay={{
                        delay: 1000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    speed={1000}
                    modules={[Autoplay]}
                    spaceBetween={10}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        400: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                        1280: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {casts.map((castMember, index) => (
                        <SwiperSlide key={index}>
                            <div className='w-full p-3 italic text-xs text-text rounded flex-col bg-dry border border-gray-800'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w185${castMember.profile_path}`}
                                    alt={`${castMember.name} profile`}
                                />
                                <p>{castMember.name}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default MovieCasts;
