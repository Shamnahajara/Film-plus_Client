import SideBar from '../screens/dashboard/sidebar';
import ProductTable from '../components/user_components/sell_rent_components/ProductTable';
import ProviderList from '../screens/ProviderList'
import axiosInstance from '../api/axios';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import {toast} from 'react-hot-toast';
import EditProductModal from '../components/Modals/EditProductModal';
import axios from 'axios';




function ProductLists() {
    const [modalOpen,setModalOpen] = useState(false)
    const [Product,setProduct] = useState(null)
    const {userId} = useSelector((state)=>state.User)
    const [products , setProducts] = useState([])
    const [reload,setReload] = useState(false)
    const [change,setChange] = useState(false)
    const [onrentProduct,setOnrentProduct] = useState([])
    const providerId = userId

    const onEditFunction = (id)=>{
      setProduct(id)
      setModalOpen(!modalOpen)
    }
  
    useEffect(()=>{
      if(modalOpen === false){
         setProduct()
      }
    })

    useEffect(()=>{
      axiosInstance.get(`/user/providerlist/${providerId}`).then((res)=>{
        setOnrentProduct(res.data.rentals)
        console.log("====",onrentProduct)
      }).catch((err)=>{
        console.error(err)
      })
    },[])

    const  returned = (rentalId,productId)=>{
     axiosInstance.patch(`/user/returned/${rentalId}`,{productId}).then((res)=>{
        toast.success(res.data.message);
     })
    }

    const sendMail = (rentalId,productId)=>{
      axiosInstance.post('/user/rentonduemail',{rentalId,productId}).then((res)=>{
        toast.success(res.data.message)
      }).catch((err)=>{
        toast.error(err?.res?.data?.errmsg)
      })
    }
  

    useEffect(() => {
        axiosInstance.get(`user/productlists/${userId}`).then((res) => { 
          if (res.data) {
            setProducts(res.data.products);
            
          }
        });
      }, [userId,reload]);


      const unlist = (productId,unlisted)=>{
        axiosInstance.patch(`/user/liststatus/${productId}`,{unlisted}).then((res)=>{
          toast.success(res?.data?.message)
          setReload(!reload)
       })
  
      }
  
    


  return (
    <SideBar>
   
      <EditProductModal modalOpen={modalOpen} setModalOpen={setModalOpen} Product={Product} />
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          {
            change ? <h2 className='text-xl font-bold'>Provider List</h2> :
            <h2 className='text-xl font-bold'> Products Lists</h2>
          }

          {
            change ?           <button
            onClick={()=>setChange(false)}
            className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>Product list</button>: 
            <button
            onClick={()=>setChange(true)}
            className='bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded'>Provider List</button>
          }
        

        </div>
        {
          change ? <ProviderList sendMail={sendMail} returned={returned} onrentProduct={onrentProduct}   unlist={unlist}/> :
          <ProductTable onEditFunction={onEditFunction}  products={products} unlist={unlist} />
        }
        
      </div>
    </SideBar>
  )
}

export default ProductLists;
