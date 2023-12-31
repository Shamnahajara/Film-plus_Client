import { useState } from 'react'
import Titles from '../Titles'
import { BsBookmarkStarFill } from 'react-icons/bs'
import { Select } from '../UsedInputs'
import Rating from '../Stars'
import { FaRegEdit } from "react-icons/fa"
import { MdDelete } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function MovieRates({ deleteReview, movie, reviews, addReview,editReviews ,setEditRate,setEditReview,editReview,editRate}) {
  const Ratings = [
    {
      title: 'Poor 😞',
      value: 0,
    },
    {
      title: 'Fair 😐',
      value: 1,
    },
    {
      title: 'Good 😊',
      value: 2,
    },
    {
      title: 'Very good 😄',
      value: 3,
    },
    {
      title: 'Excellent 😃',
      value: 4,
    },
    {
      title: 'Masterpiece 🤩',
      value: 5,
    },
  ];
  const [rating, setRating] = useState(-1)
  const [review, setReview] = useState('')
  const {userId} = useSelector((state)=>state.User)
  const [selected,setSelected] = useState("")

  return (
    <>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
   
    <div className='xl:col-span-2 w-full flex flex-col gap-8'>
          <h3 className='text-xl text-text font-semibold'>
           Edit Review 
          </h3>
          <div className='text-sm w-full'>
            <Select label="Select rating"  options={Ratings} onChange={(e) => setEditRate(e.target.value)} />
            <div className='flex mt-4 text-lg gap-2 text-star '>
              <Rating value={editRate} />
            </div>
          </div>
          {/* message */}

          <div className="text-sm w-full">
            <label className="text-border font-semibold">Message</label>
            <textarea placeholder={selected?.review} value={editReview} onChange={(e) => setEditReview(e.target.value)} className="w-full bg-main h-40 mt-2 px-4 py-2 border border-border rounded " ></textarea>
          </div>
          {/* submit */}

          <button onClick={() => editReviews(selected._id)} className='bg-subMain text-white py-3 px-4 rounded  w-full flex-colo'>Submit</button>
        </div>
        </form>
  </div>
</dialog>
   
    <div className='my-12'>
      <Titles title='Reviwers' Icon={BsBookmarkStarFill} />
      <div className='mt-10 xl:grid flex-colo  grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20'>
        {/* write review  */}
        <div className='xl:col-span-2 w-full flex flex-col gap-8'>
          <h3 className='text-xl text-text font-semibold'>
            Review "{movie?.title}"
          </h3>
          <p className='text-sm leading-7 font-medium text-boarder'>
            write review for this movie. It will be posted on this page.You can write your review for this movie .this will be posted on this page.
          </p>
          <div className='text-sm w-full'>
            <Select label='Select Rating' options={Ratings} onChange={(e) => setRating(e.target.value)} />
            <div className='flex mt-4 text-lg gap-2 text-star '>
              <Rating value={rating} />
            </div>
          </div>
          {/* message */}

          <div className="text-sm w-full">
            <label className="text-border font-semibold">Message</label>
            <textarea onChange={(e) => setReview(e.target.value)} className="w-full bg-main h-40 mt-2 px-4 py-2 border border-border rounded " placeholder="'Make it Short and catchy...'"></textarea>
          </div>
          {/* submit */}

          <button onClick={() => addReview(movie._id, rating, review)} className='bg-subMain text-white py-3 px-4 rounded  w-full flex-colo'>Submit</button>
        </div>
        {/* reviwers */}
        <div className='col-span-3 flex flex-col gap-6'>
          <h3 className='text-xl text-text font-semibold'>Reviews ({reviews.length})</h3>
          <div className='w-full flex flex-col bg-main gap-6 rounded-lg md:p-12  p-6 h-header overflow-y-scroll'>
            {
              reviews.map((data, i) => (
                <div key={i} className='md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg'>
                  <div className='col-span-2 bg-main border border-gray-500 rounded-full h-16 hidden md:block'>
                    <img src={data?.userId?.profileImage} alt='' className='w-full h-16 rounded-full object-cover' />
                  </div>
                  <div className='col-span-7 flex flex-col gap-2'>
                    <h2>{data?.userId?.name}</h2>
                    <p className='text-xs leading-6 font-medium text-text'>{data?.review}</p>
                  </div>
                  {/* rates */}

                  <div className='col-span-3 flex-rows border-l border-boarder text-xs  gap-1 text-star'>
                    <Rating value={data?.rating} />
                  </div>
                  {
                    data.userId._id == userId ? 
                    <div className={`'text-sm text-left leading-6 whitespace-nowrap px-1 py-3' float-right flex-rows gap-2`}>
                    <Link  onClick={()=>{
                      setSelected(data)
                      document.getElementById('my_modal_3').showModal()}
                      } className='flex-rows gap-2 text-green-600  rounded flex-colo w-7 h-7'> <FaRegEdit /></Link>
                    <button onClick={()=>{
                      deleteReview(data._id)
                    }} className='flex-rows gap-2 text-red-600  rounded flex-colo w-7 h-7'>
                      <MdDelete />
                    </button>
                  </div>
                  :
                  ""
                  }
              
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
     </>
  )
}

export default MovieRates