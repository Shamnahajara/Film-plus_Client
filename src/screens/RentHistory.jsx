import SideBar from './dashboard/sidebar';
import {categoriesData} from '../Data/CategoriesData'
import Table2 from '../components/Table2';
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import axiosInstance from '../api/axios';




function RentHistory() {
  const {userId} = useSelector((state)=>state.User)
  const [rentProduct,setRentProduct] = useState([])

  useEffect(() => {
    axiosInstance.get(`/user/renthistory/${userId}`).then((res) => {
      setRentProduct(res.data.rentedProducts);
    });
  }, []);
  



  return (
    <SideBar>

      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Rent History</h2>       
        </div>
        <Table2 rentProduct={rentProduct} data={categoriesData} />
      </div>
    </SideBar>
  )
}

export default RentHistory;
