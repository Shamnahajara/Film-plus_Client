import { FaRegListAlt, FaUser } from 'react-icons/fa'
import SideBar from '../sidebar' 
import { HiViewGridAdd } from 'react-icons/hi'
import Tables from '../../../components/Tables'
import { MoviesData } from '../../../Data/MoviesData'

function Dashboard() {
    const dashboardData =[
        {
            bg:'bg-orange-600',
            icon: FaRegListAlt,
            title:'Total Movies',
            total:90
        },
        {
            bg:'bg-blue-600',
            icon: HiViewGridAdd,
            title:'Total Categories', 
            total:15 
        },
        {
            bg:'bg-green-600',
            icon: FaUser,
            title:'Total Users',
            total:193
        }
    ]
  return (
    <SideBar>
        <h2 className='text-xl font-bold'>Dashboard</h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
            {
                dashboardData.map((data,index)=>(
                  <div key={index} className='p-4 rounded bg-main border-boarder grid grid-cols-4 gap-2'>
                    <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg} `} >
                        <data.icon />
                    </div>
                    <div className='col-span-3'>
                        <h2>{data.title}</h2>
                        <p className='mt-2 font-bold'>{data.total}</p>
                    </div>
                  </div>
                ))
             }
        </div>
        <h3 className='text-md font-medium my-6 text-boarder'>Recent Movies</h3>
        <Tables data={MoviesData.slice(0,5)} />

    </SideBar>
  )
}

export default Dashboard


