import Layout from '../layout/Layout'
import Banner from '../components/user_components/sell_rent_components/RentBanner'
import { Toaster } from 'react-hot-toast'
import TopProducts from '../components/user_components/sell_rent_components/TopProducts'
import NearestProduct from '../components/user_components/sell_rent_components/NearestProduct'
import { useEffect,useState } from 'react'
import axiosInstance from '../api/axios'
import RentFormModal from '../components/Modals/RentFormModal'
import {CgSpinner} from 'react-icons/cg';


function RentHome() {
  const [modalOpen,setModalOpen] = useState(false)
  const [Product,setProduct] = useState(null)

 
  const onEditFunction = (id)=>{
    setProduct(id)
    setModalOpen(!modalOpen)
  }

  useEffect(()=>{
    if(modalOpen === false){
       setProduct()
    }
  })

  const [products,setProducts] = useState([])
  const [load,setLoad] = useState(true)
  useEffect(() => {
    axiosInstance.get('/user/getproducts').then((res) => {
      if (res.data) {
        console.log("rent product ",res.data.products);
        const filteredProducts = res.data.products.filter((product) => {
          return !product.isUnlisted && !product.isRented;
        });
  
        setProducts(filteredProducts);
        setLoad(!load);
      }
    }).catch((err) => {
      console.error('errorproducts :', err)
    });
  }, []);
  
 

  return (
    <Layout>
      <Toaster toastOptions={3000} />
      <RentFormModal modalOpen={modalOpen} setModalOpen={setModalOpen} Product={Product} />
      <div className='container mx-auto min-h-screen px-2 mb-6'>
        <Banner/>
        <br></br>
        <br></br>
        <NearestProduct onEditFunction={onEditFunction} products={products}/>  
        <TopProducts onEditFunction={onEditFunction} products={products}/> 
            
      </div>
       
    </Layout>
  )
}

export default  RentHome