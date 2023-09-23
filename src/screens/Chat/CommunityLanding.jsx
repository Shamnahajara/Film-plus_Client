import React, { useState } from "react";
import {toast} from 'react-hot-toast'
import axiosInstance from '../../api/axios'
import {useSelector} from 'react-redux'

function CommunityLanding() {
  const {userId}  = useSelector((state)=>state.User)
  
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
  <div className="modal-box bg-main">
    <h3 className="font-bold text-lg">"Let's Get to Know You Better" 😊</h3>
    <p className="py-4">Before you become a part of our vibrant film community, please tell us a bit about yourself. These details will help other members connect with you and enrich your experience on Film-Plus.</p>
    <div className="form-control w-full max-w-xs">
    <select className="select select-primary w-full max-w-xs" name="workingAs">
  <option disabled selected value="">👩‍🎬Working as</option>
  <option value="Videographer">Videographer</option>
  <option value="Editor">Editor</option>
  <option value="Writer">Writer</option>
  <option value="Film Critic">Film Critic</option>
  <option value="Sound Producer">Sound Producer</option>
  <option value="Actor/Actress">Actor/Actress</option>
  <option value="Director">Director</option>
  <option value="Producer">Producer</option>
  <option value="Cinematographer">Cinematographer</option>
  <option value="Production Designer">Production Designer</option>
  <option value="Costume Designer">Costume Designer</option>
  <option value="Makeup Artist">Makeup Artist</option>
  <option value="Film Student">Film Student</option>
  <option value="Other">Other</option>

</select>

<br></br>
<select className="select select-primary w-full max-w-xs" name="preferredLanguage">
  <option disabled selected value="">🍿Preferred language?</option>
  <option value="English">English</option>
  <option value="Spanish">Spanish</option>
  <option value="French">French</option>
  <option value="German">German</option>
  <option value="Hindi">Hindi</option>
  <option value="Arabic">Arabic</option>
  <option value="Chinese">Chinese</option>
  <option value="Japanese">Japanese</option>
  <option value="Korean">Korean</option>
  <option value="Russian">Russian</option>
  <option value="Portuguese">Portuguese</option>
  <option value="Italian">Italian</option>
  <option value="Dutch">Dutch</option>
  <option value="Swedish">Swedish</option>
  <option value="Other">Other</option>
</select>

 <br></br>
 <select className="select select-primary w-full max-w-xs" name="favoriteGenre">
  <option disabled selected value="">🎭Favorite genre?</option>
  <option value="Drama">Drama</option>
  <option value="Comedy">Comedy</option>
  <option value="Romantic">Romantic</option>
  <option value="Thriller">Thriller</option>
  <option value="Action">Action</option>
  <option value="Fantasy">Fantasy</option>
  <option value="Science Fiction">Science Fiction</option>
  <option value="Horror">Horror</option>
  <option value="Documentary">Documentary</option>
  <option value="Animation">Animation</option>
  <option value="Mystery">Mystery</option>
  <option value="Adventure">Adventure</option>
  <option value="Crime">Crime</option>
  <option value="Family">Family</option>
  <option value="Musical">Musical</option>
</select>
</div>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn btn-sm btn-outline btn-ghost">Close</button>
        </form>
        <button className="btn btn-sm btn-outline btn-primary ">Submit</button>
    </div>
  </div>
</dialog>
    </>
  );
}

export default CommunityLanding;
