import React, { useState } from "react";
import {toast} from 'react-hot-toast'
import axiosInstance from '../../api/axios'
import {useSelector} from 'react-redux'

function CommunityLanding() {
    const [username,setUsername] = useState('')
    const [bio , setBio] = useState('')
    const [genre ,setGenre] = useState([])
    const {userId}  = useSelector((state)=>state.User)

    const handleSubmit = async ()=>{
        if(username.trim().length==0 || bio.trim().length==0|| genre.length == 0){
            toast.error('please fill all the fields for better expiriance')
        }else{
            axiosInstance.patch(`/partofcommunity/${userId}`)
        }
    }


  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://about.fb.com/wp-content/uploads/2022/12/Facebook-Messenger-%E2%80%A8Community-Chats_Header.jpg?w=1536)",
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-gray-100 text-4xl font-bold">
              Welcome to Film-Plus Vibrant Film Community!
            </h1>
            <p className="mb-5 text-gray-300">
              Lights, camera, action! Dive into a world where film enthusiasts,
              creators, and industry professionals unite. Our community is your
              backstage pass to all things cinematic. 🎬{" "}
            </p>
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn btn-primary  bg-subMain hover:bg-gray-500"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle ">
  <div className="modal-box">
    <h3 className="font-bold text-lg">"Let's Get to Know You Better 😊</h3>
    <p className="py-4">Before you become a part of our vibrant film community, please tell us a bit about yourself. These details will help other members connect with you and enrich your experience on [Your Website Name]. Don't worry, you can control what information is publicly visible.</p>
    <div className="form-control w-full max-w-xs">
  <label className="label">
    <span className="label-text">What is your name?</span>
  </label>
  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
</div>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    </>
  );
}

export default CommunityLanding;
