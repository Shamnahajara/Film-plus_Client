import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../layout/Layout';
import MovieCasts from '../components/Single/MovieCasts';
import Titles from '../components/Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Movie from '../components/Movie';
import { API_KEY } from '../api/constance';
import { Toaster, toast } from 'react-hot-toast';
import axiosInstance from '../api/axios';
import MovieRates from '../components/Single/MovieRates'
import { FaPlay, FaShareAlt, FaRegCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { imageURL } from '../api/constance'
import { useSelector } from 'react-redux';
import Rating from '../components/Stars'

function SingleMovie() {
    const { id } = useParams();
    const { userId } = useSelector((state) => state.User)
    const [movie, setMovie] = useState({});
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [casts, setCasts] = useState([])
    const [reviews, setReviews] = useState([])
    const [reload, setReload] = useState(false)
    const [editRate, setEditRate] = useState(-1)
    const [editReview, setEditReview] = useState("")


    // ...............................................movie details ...................................................................................
    useEffect(() => {
        axiosInstance
            .get(`/user/singlemovie/${id}`)
            .then((res) => {
                setMovie(res.data.movie)
            })
    }, [id])

    // ...................................average rating of a movie.....................................................
    const [averageRating, setAverageRating] = useState(null);
    useEffect(() => {
        axiosInstance.get(`/user/averagerating/${id}`)
            .then((res) => {
                setAverageRating(res.data.averageRating);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [reload, id]);

    // ...................................finding related movies based on genre using tmdb api.................................................
    useEffect(() => {
        if (movie.genres) {
            const genreIds = movie.genres.map(genre => genre.id).join(',');
            axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreIds}`)
                .then((res) => {
                    setRelatedMovies(res.data.results);
                })
                .catch(error => {
                    console.error('Error fetching related movies:', error);
                });
        }
    }, [movie.genres]);

    // .........................................fetching casts deatails using tmdb api....................................................
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
            .then((res) => {
                const castMembers = res.data.cast;
                setCasts(castMembers);

            })
            .catch(error => {
                console.error('Error fetching cast details:', error);
            });
    }, [id]); 
    console.log (casts);


    // /...........................................movie reviews added by users.............................................
    useEffect(() => {
        axiosInstance.get(`/user/getReviews/${id}`)
            .then((res) => {
                if (res?.data) {
                    setReviews(res.data.reviews);
                }
            })
            .catch((error) => {
                console.error('Error fetching reviews:', error);
            });
    }, [reload]);

    // ................................................add movie reviews..................................................................
    const addReview = async (movieId, rating, review) => {
        if (rating === -1 || review.trim().length === 0) {
            toast.error('please fill all the fields')
        } else {
            axiosInstance.post('/user/addReview', { userId, movieId, rating, review }).then((res) => {
                if (res.status === 200) {
                    toast.success(res?.data?.message);
                }
                setReload(!reload)
            })
        }
    }

    // ..............................................EDIT-REVIEWS............................................................
    const editReviews = (reviewId) => {
        axiosInstance.patch(`/user/editreview/${reviewId}`, { editRate, editReview }).then((res) => {
            toast.success(res.data.message)
            setReload(!reload)
        }).catch((err) => {
            toast.error(err?.res?.data?.errmsg)
        })
    }

// .................................................DELETE-REVIEW....................................................................
const deleteReview = (reviewId)=>{
    axiosInstance.patch(`/user/deletereview/${reviewId}`).then((res)=>{
        toast.success(res.data.message)
        setReload(!reload)
    }).catch((err) => {
        toast.error(err?.res?.data?.errmsg)
    })
}

    return (
        <Layout>
            <Toaster toastOptions={{ duration: 4000 }} />
            <div className='w-full xl:h-screen relative text-white'>
                <img src={`${imageURL + movie.backdrop_path}`} alt='' className='w-full hidden xl:inline-block h-full object-cover' />
                <div className='xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0'>
                    <div className='container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8'>
                        <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden'>
                            <img src={`${imageURL + movie.poster_path}`} alt='' className='w-full h-full object-cover' />
                        </div>
                        <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
                            <div className='col-span-3 flex flex-col gap-10'>
                                {/* tile */}
                                <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>
                                    {movie.title}
                                </h1>
                                {/* flex-items */}
                                <div className='flex items-center gap-4 font-medium text-dryGray'>
                                    <div className='flex-colo bg-subMain text-xs px-2 py-1 '>
                                        HD 4K
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <FaRegCalendarAlt className='text-subMain w-3 h-3' />
                                        <span className='text-sm font-medium'>{new Date(movie.release_date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className='flex gap-2 text-star '>
                                    <Rating value={averageRating} />
                                </div>
                                {/* description  */}
                                <p className='text-text text-sm leading-7'>{movie.overview}</p>
                                <div className='grid sm:grid-cols-5 grid-cols-2 gap-4 p-6 bg-main border border-gray-800 rounded-lg'>
                                    {/* share */}
                                    <div className='col-span-1 flex-colo border-r border-boarder'>
                                        <button className='w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20'>
                                            <FaShareAlt />
                                        </button>
                                    </div>
                                    {/* language */}
                                    <div className='col-span-2 flex-colo font-medium text-sm '>
                                        <p>Language : {' '} <span className='ml-2 truncate'>{movie.original_language}</span> </p>
                                    </div>
                                    {/* watch button */}
                                    <div className='sm:col-span-2 col-span-3 flex justify-end font-medium text-sm '>
                                        <Link to={`/watch/${movie.tmdbId}`} className='bg-dry hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3 '>
                                            <FaPlay className='w-3 h-3' /> Watch
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mx-auto min-h-screen px-2 my-6 '>
                <MovieCasts casts={casts} />
                {/* Movie rate */}
                <MovieRates deleteReview={deleteReview} editReview={editReview} editRate={editRate} setEditReview={setEditReview} setEditRate={setEditRate} editReviews={editReviews} addReview={addReview} movie={movie} reviews={reviews} />
                {/* related */}
                <div className='my-16'>
                    <Titles title='Related Movies' Icon={BsCollectionFill} />
                    <div className='grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6'>
                        {
                            relatedMovies.slice(0, 8).map((movie, index) => (
                                <Movie key={index} movie={movie} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default SingleMovie;
