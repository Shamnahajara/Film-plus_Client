
import { imageURL } from '../api/constance'
import {Link} from 'react-router-dom'
import { BsHeart,BsHeartFill } from 'react-icons/bs'

function Movie({movie,addTofav,favorites=[], remove}) {
 
  return (
    <>
    <div className=' p-1 hover:scale-95 transition-transform relative rounded overflow-hidden'>
      <Link to={`/movie/${movie._id}`} className='w-full '>
      <img src={`${imageURL+movie.poster_path}`} alt='' className='w-full h-64 object-cover'/>
      </Link>
      <div className='absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3'>
        <h3 className='font-semibold truncate'>{movie.title}</h3>
        <button className='h-9 w-9 text-sm flex-colo bg-transparent border-2 border-white rounded-md  text-subMain'>
        {favorites.some((favMovie) => favMovie._id === movie._id) ? (
                               <BsHeartFill onClick={() => remove(movie._id)} />
                       ) : (
                               <BsHeart onClick={() => addTofav(movie._id)} />
                      )} 
        </button>
      </div>
      
    </div>
    </>
  )
}

export default Movie