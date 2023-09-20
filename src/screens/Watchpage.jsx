import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { API_KEY ,imageURL } from '../api/constance';
import { BiArrowBack } from 'react-icons/bi';
import { FaCloudDownloadAlt, FaHeart, FaPlay } from 'react-icons/fa';


function Watchpage() {
  let { id } = useParams();
  const [movie, setMovie] = useState({});
  const [trailerKey, setTrailerKey] = useState('');
  const [play, setPlay] = useState(false);


  const TMDB_MOVIE_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;

  useEffect(() => {
   
    fetch(TMDB_MOVIE_URL)
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        const trailer = data.videos.results.find((video) => video.type === 'Trailer');
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }, [id]);

  return (
    <Layout>
      <div className='container mx-auto bg-dry p-6 mb-12'>
        <div className='flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6'>
          <Link
            to={`/movie/${movie?.title}`}
            className='md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray'
          >
            <BiArrowBack />
            {movie?.title}
          </Link>
          <div className='flex-btn sm:w-auto w-full gap-5'>
            <button className='bg-white hover:text-subMain transition bg-opacity-30 text-white rounded-md px-4 py-3 text-sm'>
              <FaHeart />
            </button>
            <button className='bg-subMain flex-rows gap-2 hover:text-main transition text-white rounded-md px-8 font-medium py-3 text-sm'>
              <FaCloudDownloadAlt /> Download
            </button>
          </div>
        </div>

        {/* Watch video */}
        {play ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder='0'
            allowFullScreen
            className='rounded w-full h-full'
          />
          
        ) : (
          <div className='w-full h-screen rounded-lg overflow-hidden relative'>
            <div className='absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-col justify-center items-center'>
              <button
                onClick={() => setPlay(true)}
                className='bg-white text-subMain border border-subMain rounded-full w-20 h-20 font-medium text-xl'
              >
                <FaPlay />
              </button>
            </div>
            <img
              src={`${imageURL+movie.backdrop_path}`}
              alt='movie poster'
              className='w-full h-full object-cover rounded-lg'
            />
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Watchpage;
