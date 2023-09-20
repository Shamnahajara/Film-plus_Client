import SideBar from '../sidebar';
import Tables from '../../../components/Tables';
import {MoviesData} from '../../../Data/MoviesData';


function MoviesLists() {

  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Movies Lists</h2>
          <button className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>Delete All</button>
        </div>
        <Tables data={MoviesData} admin={false}/>
      </div>
    </SideBar>
  )
}

export default MoviesLists;
