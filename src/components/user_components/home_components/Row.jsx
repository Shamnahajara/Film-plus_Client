import {useState,useEffect} from 'react'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Movie from "./Movie";
import axios  from 'axios';
function Row({rowId,url,title,isPoster}) {
    const [movies,setMovies] = useState([])
    useEffect(()=>{
     axios.get(url).then((res)=>{
        setMovies(res.data.results)
     }).catch ((err)=>{
        console.log(err)
     })
    },[])
  const slideLeft = () => {
      var slider = document.getElementById('slider'+rowId);
      slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
      var slider = document.getElementById('slider'+rowId);
      slider.scrollLeft = slider.scrollLeft + 500;
    };
  return (
<>
  <style>
    {`
      .scroll-container::-webkit-scrollbar {
        display: none; 
      .scroll-container {
        overflow-x: scroll;
        scrollbar-width: none; 
        -ms-overflow-style: none; 
      }
    `}
  </style>
  <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
  <div className="relative flex items-center group">
    <MdChevronLeft
      onClick={slideLeft}
      className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
      size={40}
    />
    <div
      id={'slider'+rowId}
      className="scroll-container w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth relative"
    >
      {movies.map((item, id) => (
            <Movie key={id} item={item} poster={isPoster? true : false} />
          ))}
    </div>
    <MdChevronRight
      onClick={slideRight}
      className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
      size={40}
    />
  </div>
</>



  );
}
export default Row;
