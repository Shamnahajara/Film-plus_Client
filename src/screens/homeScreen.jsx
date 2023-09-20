import Layout from '../layout/Layout'
import Banner from '../components/Home/Banner'
import PopularMovies from '../components/Home/PopularMovies'
import TopRated from '../components/Home/TopRated'
import Promos from '../components/Home/Promos'
import { Toaster,toast} from 'react-hot-toast'
import axiosInstance from '../api/axios'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@chakra-ui/react'



function HomeScreen() {
     const {userId} = useSelector((state) => state.User )
     const [popular,setPopular] = useState([]);
     const [toprated,setToprated] = useState([]);
     const [favorites,setFavorites] = useState([]);
     const [reload,setReload] = useState([]);
//.........................................get popular movies......................................................
  useEffect(()=>{
    axiosInstance.get('/user/popularmovies').then((res)=>{
      setPopular(res.data.popularMovies)
    })
  },[reload])

//..........................................get top rated movies..................................................................................
  useEffect(()=>{
    axiosInstance.get('/user/topratedmovies').then((res)=>{
      setToprated(res.data.topratedMovies)
    })
  },[reload])

// ...........................................get favorites of users..................................................
useEffect(() => {
  axiosInstance.get(`/user/getfavorites/${userId}`
).then((res)=>{
   console.log('res.data',res.data.favoriteMovies)
   setFavorites(res.data.favoriteMovies)
}) .catch((error) => {
  console.error('Error fetching favorite movies:', error);
});
}, [userId,reload]);
// ............................................Add to favorites...........................................................
  const addTofav = async (movieId)=>{
      await axiosInstance.post('/user/addtofavorite',
        { movieId, userId:userId }
      ).then((res)=>{
        toast.success(res?.data?.message);
        setReload(!reload)
      }).catch ((err)=>{
        toast.error(err?.res?.data?.errmsg)
      })
  }

// ...........................................remove movies from favorites...............................................
const remove = (movieId)=>{
  axiosInstance.patch('/user/deleteFavorites',{movieId,userId}).then((res)=>{
  toast.success(res?.data?.message)
  setReload(!reload)
}).catch ((err)=>{
  if(err?.response?.data?.errmsg){
     toast.error(err?.response?.data?.errmsg)
  }
})
}

  return (
    <Layout>
      <Toaster toastOptions={3000} />
      <div className='container mx-auto min-h-screen px-2 mb-6'>
        <Banner favorites={favorites} remove={remove} addTofav={addTofav} popular={popular}/>
        <PopularMovies favorites={favorites} remove={remove} addTofav={addTofav} popular={popular}/>
        <Promos/>
        <TopRated favorites={favorites} remove={remove} addTofav={addTofav} toprated={toprated}/>       
      </div>
    </Layout>
  )
  }

export default  HomeScreen