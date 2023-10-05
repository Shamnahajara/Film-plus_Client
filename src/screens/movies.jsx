import { useEffect, useState,Fragment } from 'react'
import Layout from '../layout/Layout'
import Movie from '../components/Movie'
import {CgSpinner} from 'react-icons/cg';
import axiosInstance from '../api/axios'
import { FaBullseye } from 'react-icons/fa';
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleDown, FaCheck } from "react-icons/fa";
import {toast} from 'react-hot-toast'
import { useSelector } from 'react-redux';

const categoriesData = [
  {
      _id:10749,
      title :'Romantic'
  },
      {
      _id:28,
      title :'Action'
  },
      {
      _id:12,
      title :'Adventure'
  }
  ,    {
      _id:27,
      title :'Horror'
  },    {
      _id:35,
      title :'Comedy'
  },    {
      _id:10770,
      title :'Sports'
  },    {
      _id:14,
      title :'Fantacy'
  },    {
      _id:10402,
      title :'Misicals'
  },    {
      _id:18,
      title :'Drama'
  },    {
      _id:53,
      title :'Thriller'
  },    {
      _id:37,
      title :'Western'

  }
]

const RateData = [
  { minRating: null, maxRating: null, title: "Sort By Rates" },
  { minRating: 1, maxRating: 2, title: "1-2 Stars" },
  { minRating: 2.1, maxRating: 4, title: "2.1-4 Stars" },
  { minRating: 4.1, maxRating: 6, title: "4.1-6 Stars" },
  { minRating: 6.1, maxRating: 8, title: "6.1-8 Stars" },
  { minRating: 8.1, maxRating: 10, title: "8.1-10 Stars" },
];
                            


function Movies() {
  const [movies,setMovies] = useState([])
  const maxPage =10
  const [page , setPage] = useState(maxPage)
  const [reload,setReload] = useState(FaBullseye)
  const [category, setCategory] = useState({ title: "Category" });
  const [rates, setRates] = useState(RateData[0]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [favorites,setFavorites] = useState([]) 
  const {userId} = useSelector((state)=>state.User)


  const Filter = [
    {
      value: category,
      onchange: setCategory,
      items: categoriesData,
    },
    {
      value: rates,
      onchange: setRates,
      items: RateData,
    },
  ];
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

// ................................fetching movies fron databse applying filter.......................................
  const fetchMovies = async (genreId, minRating, maxRating) => {
    try {
      const response = await axiosInstance.get('/user/getmovies');
      const filteredMovies = response.data.addedMovies.filter((movie) => {
        return !movie.unListed &&
          (genreId === null || movie.genre_ids.includes(genreId)) &&
          (minRating === null || movie.vote_average >= minRating) &&
          (maxRating === null || movie.vote_average <= maxRating);
      });
      setMovies(filteredMovies);
    } catch (err) {
      console.error(err);
    }
  };

// .....................onclick functions for set category,rating and load more data (pagination).........................
  const handleGenreChange = (genreId) => {
    fetchMovies(genreId, rates.minRating, rates.maxRating);
  };

  const handleRatingChange = (minRating, maxRating) => {
    fetchMovies(category._id, minRating, maxRating);
  };

  const HandleLoadingMore = () => {
    setPage(page + maxPage);
  };
// ..........................clear function for filter
  const clearFilters = () => {
      setInitialLoad(!initialLoad); 
    };

// ..............................initial loading and load of after choosing filter option..............................
  useEffect(() => {
    if (!initialLoad) {
      const fetchAllMovies = async () => {
        try {
          const response = await axiosInstance.get('/user/getmovies');
          const allMovies = response.data.addedMovies;
          setMovies(allMovies);
          
        } catch (err) {
          console.error(err);
        }
      };

      fetchAllMovies();
    } else {
      fetchMovies(category._id, rates.minRating, rates.maxRating);
    }
  }, [reload, category._id, rates.minRating, rates.maxRating, initialLoad])
  
  
  return (
    <Layout>
      <div className='min-height-screen container mx-auto px-2 my-6'>
        <div className="my-6 bg-dry border text-dryGray-800 grid md:grid-cols-4 lg:gap-12 gap-2 rounded p-6">
          {Filter.map((item, index) => (
            <Listbox key={index} value={item.value} onChange={(selected) => item.onchange(selected)}>
              <div className="relative">
                <Listbox.Button className="relative border border-gray-800 w-full text-white bg-main rounded-lg cursor-default py-4 pl-6 pr-10 text-left text-xs">
                  <span className="block truncate">{item.value.title}</span>
                  <span className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2">
                    <FaAngleDown className="h-5 w-5" aria-hidden="true"></FaAngleDown>
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1  w-full bg-white border border-gray-800 text-dryGray rounded-md shadow-lg max-h-60 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {item.items.map((item, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-subMain text-white" : "text-main"
                          }`
                        }
                        value={item}
                        onClick={() => {
                          if (item.value === "Sort By Rates") {
                            handleRatingChange(item.minRating, item.maxRating);
                            setInitialLoad(true)
                          } else {
                            handleGenreChange(item._id);
                            setInitialLoad(true)
                          }
                        }}
                      >
                        <>
                          <span
                            className={`block truncated ${
                              item.value === "Sort By Rates" ? "font-semibold" : "font-normal"
                            }`}
                          >
                            {item.title}
                          </span>
                          {item.value === "Sort By Rates" ? (
                            <span className="absolute insert-y-0 left-0 flex items-center pl-3">
                              <FaCheck className="h-3 w-3" aria-hidden="true"></FaCheck>
                            </span>
                          ) : null}
                        </>
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          ))}
           <div className='mb-4'>
          <button onClick={clearFilters} className='text-white   border border-subMain rounded py-2 px-2 cursor-pointer'>
            Clear Filters
          </button>
        </div>
        </div>
       
        <p className='text-lg font-medium my-6'>
          Total <span className='font-bold text-subMain'>{page}</span> Items founded
        </p>
        <div className='grid sm:mt-10 mt-6 xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
          {movies.slice(0, page).map((movie, index) => (
            <Movie remove={remove} favorites={favorites}  addTofav={ addTofav} key={index} movie={movie} />
          ))}
        </div>
        {/* loading more */}
        <div className='w-full flex-colo md:my-20 my-10'>
          <button onClick={HandleLoadingMore} className='flex-rows gap-3 text-white py-3 px-8 rounded font-semibold border-2 border-subMain'>
            Loading more <CgSpinner className='animate-spin'></CgSpinner>
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default Movies