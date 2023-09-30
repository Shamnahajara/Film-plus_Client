
import {FaRegCalendarAlt} from 'react-icons/fa'


function FlexMovieItems({movie}) {
  return (
   <>
  
   <div className='flex items-center gap-2'>
    <FaRegCalendarAlt className='text-subMain w-3 h-3'/>
    <span className='text-sm font-medium'>{new Date(movie.release_date).toLocaleDateString()}</span>
   </div>
  
    </>
  )
}

export default FlexMovieItems