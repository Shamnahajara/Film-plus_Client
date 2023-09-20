import { FaHeart } from "react-icons/fa";

import { imageURL } from "../../../api/constance";
function Movie({item,poster}) {
  return (
    <>
      <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
        <img className="w-full h-auto block" src={poster==true ?imageURL+item.poster_path:imageURL+item.backdrop_path} alt="" />
        <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
          <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
            <button className="btn btn-outline btn-error">My list+</button>
          </p>

          <p onClick="">
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          </p>
        </div>
      </div>
    </>
  );
}

export default Movie;
