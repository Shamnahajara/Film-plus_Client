import {MdDelete} from 'react-icons/md'
import {GoEye} from 'react-icons/go'
import {Link} from 'react-router-dom'
import { imageURL } from '../api/constance'
const Head = 'text-xs text-left text-dry font-semibold px-6 py-2 uppercase'
const text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'


const Rows = (movie,i,remove)=>{

  
    return (
        <tr key={i}>
            <td className={`${text}`}>
                <div className='w-12 p-1 bg-dry border-boarder h-12 rounded overflow-hidden'>
                    <img className='h-full w-full object-cover' src={`${imageURL+movie.poster_path}`} alt=''/>
                </div>
            </td>
            <td className={`${text} truncate`}>{movie.title}</td>
            <td className={`${text}`}>{movie.original_language}</td>
            <td className={`${text}`}>{ new Date(movie.release_date).toLocaleDateString()}</td>
            <td className={`'text-sm text-left leading-6 whitespace-nowrap px-5 py-3' float-right flex-rows gap-2`}>
                <Link to={`/Movie/${movie._id}`} className='bg-boarder flex-rows gap-2 text-white  rounded flex-colo w-7 h-7'> <GoEye /> </Link>
                <button onClick={()=>remove(movie._id)} className='bg-subMain flex-rows gap-2 text-white  rounded flex-colo w-7 h-7'>
                   <MdDelete/>
                </button>
            </td>

        </tr>
    )

}


function Tables({data,remove}) {

  return (
    <div className='overflow-x-scroll overflow-hidden relative h-full'>
        <table className='w-full table-auto border border-boarder divide-y divide-boarder'>
          <thead>
            <tr className='bg-dryGray '>
                <th scope='col' className={`${Head}`}>Image</th>
                <th scope='col' className={`${Head}`}>Name</th>
                <th scope='col' className={`${Head}`}>language</th>
                <th scope='col' className={`${Head}`}>Year</th>
                <th scope='col' className={`${Head} text-end`}>Actions</th>

            </tr>
          </thead>
          <tbody className='bg-main divide-y divide-gray-800'>
            {data.map((movie,i) => Rows(movie,i,remove))}
          </tbody>
        </table>
    </div>
  )
}

export default Tables