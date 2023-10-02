import { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import axiosInstance from '../../api/axios'
import { imageURL } from '../../api/constance'
import Rating from '../../components/Stars'
import { MdDelete, MdRateReview } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { FaRegEdit } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import { Select } from '../../components/UsedInputs'
import Titles from '../../components/Titles'

function ReviewTable() {
    const [reviews, setReviews] = useState([])
    const [reload, setReload] = useState(false)
    const [selected, setSelected] = useState("")
    const [editRate, setEditRate] = useState(-1)
    const [editReview, setEditReview] = useState("")
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

    useEffect(() => {
        axiosInstance.get(`/user/listuserreviews`).then((res) => {
            setReviews(res.data.reviews)
        })
    }, [reload])

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
    const deleteReview = (reviewId) => {
        axiosInstance.patch(`/user/deletereview/${reviewId}`).then((res) => {
            toast.success(res.data.message)
            setReload(!reload)
        }).catch((err) => {
            toast.error(err?.res?.data?.errmsg)
        })
    }
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
                                <Select label="Select rating" options={Ratings} onChange={(e) => setEditRate(e.target.value)} />
                                <div className='flex mt-4 text-lg gap-2 text-star '>
                                    <Rating value={selected.rating} />
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
            <div className="ml-10 mr-10">

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th className='text-primary text-lg'>Movie</th>
                                <th className='text-primary text-lg'>Review</th>
                                <th className='text-primary text-lg'>Rating</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row  */}
                            {
                                reviews.map((review, i) => (
                                    <tr key={i}>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={`${imageURL + review.movieId.poster_path}`} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold"> {review.movieId.title}</div>
                                                    <div className="text-sm opacity-50">{new Date(review.movieId.release_date).toLocaleDateString()}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{review.review}</td>
                                        <td> <div className='flex gap-2 text-star '>
                                            <Rating value={review.rating} />
                                        </div></td>
                                        <td>
                                            <div className={`'text-sm text-left leading-6 whitespace-nowrap px-1 py-3' float-right flex-rows gap-2`}>
                                                <Link onClick={() => {
                                                    setSelected(review)
                                                    document.getElementById('my_modal_3').showModal()
                                                }
                                                } className='flex-rows gap-2 text-green-600  rounded flex-colo w-7 h-7'> <FaRegEdit /></Link>
                                                <button onClick={() => {
                                                    deleteReview(review._id)
                                                }} className='flex-rows gap-2 text-red-600  rounded flex-colo w-7 h-7'>
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))
                            }

                            {/* row ends */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export default ReviewTable