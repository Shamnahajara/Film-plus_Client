
import Titles from '../Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../Movie';

function PopularMovies({popular,addTofav,favorites,remove}) {
 
  return (
    <div className='my-16'>
      <Titles title='popular movies' Icon={BsCollectionFill} /> 
      <div className='grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-flow-cols-2 grid-cols-1 gap-10'>
        {
          popular.slice(0,8).map((movie,index)=>(
            <Movie  remove={ remove} favorites={favorites} addTofav={addTofav} key={index} movie={movie}/>
          ))
        }
      </div>
    </div>
  );
}

export default PopularMovies;
