import { useState,useEffect } from 'react';
import AdminSidebar from '../../components/admin_components/AdminSidebar';
import { toast,Toaster } from 'react-hot-toast';
import Movietable from '../../components/admin_components/Movietable';
import axios from 'axios'
import { API_KEY } from '../../api/constance';
import axiosInstance from '../../api/axios';
import {RiMovie2Fill} from 'react-icons/ri';
import {SiThemoviedatabase} from 'react-icons/si'

function MovieLists() {

  const [movies,setMovies] = useState([])
  const [addedMovies,setAddedMovies] = useState([])
  const [change ,setChange] = useState(false)
  const [reload,setReload] = useState(false)
  const [moviesInDatabase, setMoviesInDatabase] = useState([]); 
  

  
//..................................Calculate the first day of the current month.............................................
useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; //month is starting from zero
    const currentYear = currentDate.getFullYear();
    const firstDayOfMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`;
  
// ..................................Calculate the first day of the previous month.........................................
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const firstDayOfPreviousMonth = `${previousYear}-${previousMonth.toString().padStart(2, '0')}-01`;
  
    const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${firstDayOfPreviousMonth}&primary_release_date.lte=${firstDayOfMonth}&sort_by=popularity.desc`;
  
// ........................................fetching movies based on the endpoint............................................
    axios.get(endpoint).then((res) => {
      setMovies(res.data.results);
    });
  }, [reload]);

// ............................................adding movies to database .................................................
  const addMovie = async (movie)=>{
   axiosInstance.post('/admin/addmovie',{movie}).then((res)=>{
     toast.success(res?.data?.message);
     setReload(!reload)
   }).catch((err)=>{
      toast.error(err?.res?.data?.errmsg)
   })
 
  }

//...................................... fetching movies from database for listing...........................................
  useEffect(()=>{
    axiosInstance.get('/admin/movies').then((res)=>{
      setAddedMovies(res?.data?.addedMovies)
      const movieIdsInDatabase = res?.data?.addedMovies.map((movie) => movie.tmdbId);
      setMoviesInDatabase(movieIdsInDatabase);
    }).catch((err)=>{
       toast.error(err?.res?.data?.errmsg)
    })
  },[reload])

//...........................................unlisting and listing of movie..........................................
 const unlist = async (movieId,unListed)=>{
  axiosInstance.patch(`/admin/unlistmovie/${movieId}`,{unListed}).then((res)=>{
    toast.success(res?.data?.message)
    setReload(!reload);
  }).catch ((err)=>{
    toast.error(err?.res?.data?.errmsg)
  })
 }

  return (
    <AdminSidebar >
      
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          {
            !change ? <h2 className='text-xl font-bold'>Add movies to DB</h2>:
            <h2 className='text-xl font-bold'>Movies in DB</h2>
          }
          {
            !change ? 
            <button
            onClick={()=>setChange(true)}
            className='bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main  border border-subMain text-white py-2 px-4 rounded'>
               <RiMovie2Fill/>Added Movies
            </button> :
             <button
             onClick={()=>setChange(false)}
             className='bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main  border border-subMain text-white py-2 px-4 rounded'>
                <SiThemoviedatabase/>Add More
             </button> 
          }
        </div>
        {/* movie table */}
        {
          change ? <Movietable unlist={unlist}  movies = {addedMovies} changes={true}/>:
          <Movietable  addMovie={addMovie} 
          movies={movies.filter((movie) => !moviesInDatabase.includes(movie.id))} />
        }
      </div>
    </AdminSidebar >
  )

      }
export default MovieLists;
