import { API_KEY ,imageURL} from '../../../api/constance'
import { useEffect,useState } from 'react'
import axios from 'axios';
function Home_body() {
   const [movies,SetMovies] = useState([]);

   useEffect(()=>{
     axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`).then((res)=>{
     console.log(res.data.results)
     const number = Math.floor(Math.random() * res.data.results.length)
     SetMovies(res.data.results[number]);
     })
   },[])

  return (
    <>
    <div className='w-full h-[600px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
        <img
          className='w-full h-full object-cover'
          src={`${imageURL+movies.backdrop_path}`}
          alt=""
        />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movies.title}</h1>
          <div className='my-4'>
            <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
              Play
            </button>
            <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
              Watch Later
            </button>
          </div>
          <p className='text-gray-400 text-sm'>
            Released: {movies.release_date}
          </p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
            {movies.overview}
          </p>
        </div>
      </div>
    </div>
</>
  )
}

export default Home_body