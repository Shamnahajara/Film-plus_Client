import AdminSidebar from '../../components/admin_components/AdminSidebar';
import RentProductTable from '../../components/admin_components/RentProductTable';
import axiosInstance from '../../api/axios';
import { useState,useEffect } from 'react';
import {toast} from 'react-hot-toast';

function ProductList() {
  const [products,setProducts] = useState([])
  const [reload,setReload] = useState(false)
  
  useEffect(()=>{
    axiosInstance.get('/admin/rentproducts').then((res)=>{
      setProducts(res.data.products)
    })
  },[reload])


  const statusChange = (productId,isUnlisted) => {
    axiosInstance
      .patch(
        `/admin/productStatus/${productId}`,
        {isUnlisted}
      )
      .then((res) => {
        toast.success(res?.data?.message);
        setReload(!reload);
      })
      .catch((err) => {
        if (err?.response?.data?.errmsg) {
          toast.error(err?.response?.data?.errmsg);
        }
      });
  };
 
  return (
    <AdminSidebar >
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Rent Products</h2>
        </div>
        <RentProductTable statusChange={statusChange} products={products}/>
      </div>
    </AdminSidebar>
  )
}

export default ProductList;
