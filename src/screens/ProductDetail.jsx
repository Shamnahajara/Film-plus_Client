import { Link ,useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { Toaster } from 'react-hot-toast';
import detailBanner from '../images/banner2rent.jpg'
import { FaUserAlt,FaRupeeSign} from 'react-icons/fa';
import {BsFillChatLeftDotsFill, BsFillCartPlusFill} from 'react-icons/bs'
import {BiSolidPhoneCall} from 'react-icons/bi'
import { HiLocationMarker } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axios'
import RentFormModal from '../components/Modals/RentFormModal';
import {  useSelector } from 'react-redux';

function ProductDetail() {

  const [modalOpen,setModalOpen] = useState(false)
  const [Product,setProducts] = useState(null)
  const {userId} = useSelector((state)=>state.User)

 
  const onEditFunction = (id)=>{
    setProduct(id)
    setModalOpen(!modalOpen)
  }

  useEffect(()=>{
    if(modalOpen === false){
       setProducts()
    }
  })

    const {id} = useParams()
    const [product,setProduct] = useState([])

    useEffect(() => {
        axiosInstance.get(`/user/product/${id}`).then((res) => {
          if (res.data) {
            setProduct(res.data.product);
          }
        });
      }, [id]);



    return (
        <Layout>
            <Toaster toastOptions={{ duration: 4000 }} />
            <RentFormModal modalOpen={modalOpen} setModalOpen={setModalOpen}  />
            <div className='w-full xl:h-screen relative text-white'>
        <img src={detailBanner} alt='' className='w-full hidden xl:inline-block h-full object-cover'/>
      <div className='xl:bg-main bg-dry flex-colo xl:bg-opacity-90 xl:absolute top-0 left-0 right-0 bottom-0'>
        <div className='container px-3 mx-auto 2xl:px-32 xl:grid grid-cols-3 flex-colo py-10 lg:py-20 gap-8'>
            <div className='xl:col-span-1 w-full xl:order-none order-last h-header bg-dry border border-gray-800 rounded-lg overflow-hidden'>
            {product.productImage && product.productImage.length > 0 ? (
    <img src={product.productImage[0]} alt='' className='w-full h-full object-cover' />
  ) : (
    <p>No product image available</p>
  )}
            </div>
            <div className='col-span-2 md:grid grid-cols-5 gap-4 items-center'>
                <div className='col-span-3 flex flex-col gap-10'>
                    {/* tile */}
                    <h1 className='xl:text-4xl capitalize font-sans text-2xl font-bold'>
                        {product.productName}
                    </h1>
                    {/* flex-items */}
                    <div className='flex items-center gap-4 font-medium text-dryGray'>
                        
      
   <div className='flex items-center gap-2'>
    <HiLocationMarker className='text-subMain w-3 h-3'/>
    <span className='text-sm font-medium'>{product.locationName}</span>
   </div>
   
    </div>
    <div className='flex items-center gap-4 font-medium text-dryGray'>
            
   <div className='flex items-center gap-2'>
    <FaUserAlt className='text-subMain w-3 h-3'/>
    <span className='text-sm font-medium'>Provider :{product.providerId?.name} </span>
   </div>
   <div className='flex items-center gap-2'>
    <FaRupeeSign className='text-subMain w-3 h-3'/>
    <span className='text-sm font-medium'>Rent price : {product.rentPrice}</span>
   </div>
 
                    </div>
                    <div className='flex items-center gap-4 font-medium text-dryGray'>
            
            <div className='flex items-center gap-2'>
             <BiSolidPhoneCall className='text-subMain w-3 h-3'/>
             <span className='text-sm font-medium'> Contact Provider :{product.providerId?.phone} </span>
            </div>
            
          
            </div>
                    {/* description  */}
                    <p className='text-text text-sm leading-7'>{product.description}</p>
                    <div className='grid sm:grid-cols-5 grid-cols-2 gap-4 p-6 bg-main  rounded-lg'>
                       
                        {/* cart button  */}
                        {userId == product.providerId?._id ? " ":
                        <div className='col-span-1 flex-colo border-r border-boarder'>
                            <button onClick={()=>onEditFunction(product)} className='w-10 h-10 flex-colo rounded-lg bg-white bg-opacity-20'>
                                < BsFillCartPlusFill/>
                            </button>
                        </div>
}
                        {/* chat button */}
                        {userId == product.providerId?._id ?
                         <div className='sm:col-span-2 col-span-3 flex justify-end font-medium text-sm '>
                         <Link to="/productlists" className='bg-dry hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3 '>
                            Product Lists
                         </Link>
                       </div> : 
                         <div className='sm:col-span-2 col-span-3 flex justify-end font-medium text-sm '>
                         <Link to={`/chatwithprovider/${product.providerId?._id}`} className='bg-dry hover:bg-subMain transitions border-2 border-subMain rounded-full flex-rows gap-4 w-full sm:py-3 '>
                            <BsFillChatLeftDotsFill className='w-3 h-3'/> Chat with provider
                         </Link>
                       </div>
                         }
                       
                    </div>
                </div>
            </div>
        </div>
        </div> 
    </div>
        </Layout>
    );
}

export default ProductDetail;
