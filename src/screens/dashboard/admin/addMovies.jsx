
import SideBar from '../sidebar'
// import Uploader from '../../components/Uploader'
import { Input, Message } from '../../../components/UsedInputs'
import Uploader from '../../../components/Uploader'
import poster from '../../../images/john-wick-poster.jpg'
import { UsersData } from '../../../Data/UsersData'
import { MdDelete } from 'react-icons/md'
import { FaEdit } from 'react-icons/fa'


function AddMovie() {
  return (
    <SideBar>
        <div className='flex flex-col gap-6'>
        <h2 className='text-xl font-bold '>Add Movies</h2>
        <div className='w-full grid md:grid-cols-2 gap-6'>
        <Input label="Movie title" placeholder="enter movie name" type="text" bg={true}/>
        <Input label="Hours" placeholder="Movie duration" type="text" bg={true}/>
        </div>
        <div className='w-full grid md:grid-cols-2 gap-6'>
        <Input label="Language" placeholder="English" type="text" bg={true}/>
        <Input label="Gener" placeholder="Action" type="text" bg={true}/>
        </div>
        <div className='w-full grid md:grid-cols-2 gap-6'>
        <Input label="Release date" placeholder="" type="date" bg={true}/>
        <Input label="rating" placeholder="out of 5" type="text" bg={true}/>
        </div>

        {/* images */}
        <div className='w-full grid md:grid-cols-2 gap-6'>
            {/* image without title */}
            <div className='flex flex-col gap-2'>
                <p className='text-boarder font-semibold text-sm '>Image without title</p>
                <Uploader/>
                <div className='p-2 w-32 h-32 bg-main border border-boarder rounded'>
                    <img src={poster} alt='' className='w-full h-full object-cover'/>
                </div>

            </div>
            {/* image with title */}
            <div className='flex flex-col gap-2'>
                <p className='text-boarder font-semibold text-sm '>Image with title</p>
                <Uploader/>
                <div className='p-2 w-32 h-32 bg-main border border-boarder rounded'>
                    <img src={poster} alt='' className='w-full h-full object-cover'/>
                </div>

            </div>       
        </div>

     {/* Description  */}
     <Message label='Description' placeholder='Synopsis of movie' bg={true}/>

     {/* castc */}

     <div className='w-full grid lg:grid-cols-2 gap-6 items-start'>
        <button className='w-full py-4 bg-main border border-subMain border-dashed text-white'>Add Casts</button>
        <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4'>
            {
            UsersData.map((user,i)=>(
                <div key={i} 
                className='p-2 italic text-xs text-white rounded flex-colo bg-main border border-boarder'> 
                <img src={poster} alt='' className='w-full h-24 object-cover rounded mb-2'/>
                <p>{user.name}</p>   
                <div className='flex-rows mt-2 w-full gap-2 '>
                    <button className='w-6 h-6 flex-colo bg-dry border border-boarder text-subMain rounded'><MdDelete/></button>
                    <button className='w-6 h-6 flex-colo bg-dry border border-boarder text-green-600 rounded'><FaEdit/></button>
                </div>           
                </div>

            ))}
        </div>
     </div>


        <div className='flex justify-end items-center my-4'>
            <button className='bg-subMain font-medium transition hover:bg-main border border-subMain text-white  px-6 py-3 gap-4 rounded-lg w-full sm:w-auto '>
                Update
            </button>
        </div>

       </div>
    </SideBar>
  )
}

export default AddMovie