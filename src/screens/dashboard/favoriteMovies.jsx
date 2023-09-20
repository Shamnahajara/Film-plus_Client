import { useEffect, useState } from 'react';
import SideBar from './sidebar';
import Tables from '../../components/Tables';
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/axios';
import { Toaster,toast } from 'react-hot-toast';

function FavoriteMovies() {
  const { userId } = useSelector((state) => state.User);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [reload,setReload] = useState(false)


  useEffect(() => {
      axiosInstance.get(`/user/getfavorites/${userId}`
    ).then((res)=>{
       setFavoriteMovies(res.data.favoriteMovies)
    }) .catch((error) => {
      console.error('Error fetching favorite movies:', error);
    });
  }, [userId,reload]);

 
  
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
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Favorite Movies</h2>
          <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>Delete All</button>
        </div>
        <Tables remove={remove} data={favoriteMovies} />
      </div>
    </SideBar>
  );
}

export default FavoriteMovies;
