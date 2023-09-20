import { useState } from 'react';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { GoEye } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { imageURL } from '../../api/constance';
import { FaSearch } from 'react-icons/fa';

const Head = 'text-xs text-left text-dry font-semibold px-6 py-2 uppercase';
const text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3';

const Rows = (movie, i,addMovie,changes,unlist) => {
  return (
    <tr key={i}>
      <td className={`${text}`}>
        <div className='w-12 p-1 bg-dry border-boarder h-12 rounded overflow-hidden'>
          <img className='h-full w-full object-cover' src={`${imageURL + movie.poster_path}`} alt='' />
        </div>
      </td>
      <td className={`${text} truncate`}>{movie.title}</td>
      <td className={`${text}`}>{movie.original_language}</td>
      <td className={`${text}`}> {new Date(movie.release_date).toLocaleDateString() }</td>
      <td className={`${text} float-right flex-rows gap-2`}>
        {
          changes ? movie.unListed ? <button onClick={() => {unlist(movie._id,movie.unListed)}} className='bg-blue-600 flex-rows gap-2 text-white  rounded flex-colo w-14 h-7'>
            list
        </button>:<button onClick={() => {unlist(movie._id,movie.unListed)}} className='bg-red-600 flex-rows gap-2 text-white  rounded flex-colo w-14 h-7'>
            Un-list
        </button> : <button onClick={() => {addMovie(movie)}} className='bg-green-600 flex-rows gap-2 text-white  rounded flex-colo w-14 h-7'>
          <AiOutlineAppstoreAdd /> Add
        </button>
        }
       
      </td>
    </tr>
  );
};

function Movietable({ movies,addMovie,changes,unlist }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input changes
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='overflow-x-scroll overflow-hidden relative h-full'>
      <div className='col-span-3 mb-4'>
               <form className='w-full text-sm bg-dryGray rounded flex-btn gap-4'>
                <button  className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
                <FaSearch/>
                </button>
                <input 
                 type='text'
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                 placeholder='Search movies from here'
                 className='font-medium placeholder:text-boarder text-sm w-11/12 h-12 bg bg-transparent border-none px-2 text-black'/>
               </form>
           </div>
      <table className='w-full table-auto border border-boarder divide-y divide-boarder'>
        <thead>
          <tr className='bg-dryGray '>
            <th scope='col' className={`${Head}`}>Image</th>
            <th scope='col' className={`${Head}`}>Name</th>
            <th scope='col' className={`${Head}`}>Language</th>
            <th scope='col' className={`${Head}`}>Year</th>
            <th scope='col' className={`${Head} text-end`}>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-main divide-y divide-gray-800'>
          {filteredMovies.map((movie, i) => Rows(movie, i,addMovie,changes,unlist))}
        </tbody>
      </table>
    </div>
  );
}

export default Movietable;
