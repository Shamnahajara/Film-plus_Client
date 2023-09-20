import { FaPlay, FaShareAlt,FaRegCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { imageURL } from '../../api/constance'



function MovieInfo({movie}) {
  return (
    <div className='w-full xl:h-screen relative text-white'>
        <img src={`${imageURL+movie.backdrop_path}`} alt='' className='w-full hidden xl:inline-block h-full object-cover'/>
      <div className='xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0'>
        <div className='container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8'>
            <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden'>
              <img src={`${imageURL+movie.poster_path}`} alt='' className='w-full h-full object-cover'/>
            </div>
            <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
                <div className='col-span-3 flex flex-col gap-10'>
                    {/* tile */}
                    <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>
                        {movie?.title}
                    </h1>
                    {/* flex-items */}
                    <div className='flex items-center gap-4 font-medium text-dryGray'>
                        <div className='flex-colo bg-subMain text-xs px-2 py-1 '>
                            HD 4K
                        </div>
                        <div className='flex items-center gap-2'>
                          <FaRegCalendarAlt className='text-subMain w-3 h-3'/>
                            <span className='text-sm font-medium'>{movie.release_date}</span>
                        </div>
                    </div>
                    {/* description  */}
                    <p className='text-text text-sm leading-7'>{movie?.overview}</p>
                    <div className='grid sm:grid-cols-5 grid-cols-2 gap-4 p-6 bg-main border border-gray-800 rounded-lg'>
                        {/* share */}
                        <div className='col-span-1 flex-colo border-r border-boarder'>
                            <button className='w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20'>
                                <FaShareAlt/>
                            </button>
                        </div>
                        {/* language */}
                        <div className='col-span-2 flex-colo font-medium text-sm '>
                            <p>Language : {' '} <span className='ml-2 truncate'>{movie?.original_language}</span> </p>
                        </div>
                        {/* watch button */}
                        <div className='sm:col-span-2 col-span-3 flex justify-end font-medium text-sm '>
                          <Link to={`/watch/${movie._id}`} className='bg-dry hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3 '>
                             <FaPlay className='w-3 h-3'/> Watch
                          </Link>
                        </div> 
                    </div>
                </div>
                
            

            </div>
        </div>
        </div> 
    </div>
  )
}

export default MovieInfo