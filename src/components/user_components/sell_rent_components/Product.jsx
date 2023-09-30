
import {Link, Navigate} from 'react-router-dom'
import { BsFillCartPlusFill } from 'react-icons/bs'

function Product({products,onEditFunction}) {
 
  return (
<>
    {
      products.map((product)=>(
        
        <div  key={product._id} className='border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden'>
        <Link to={`/productDetail/${product._id}`} className='w-full '>
        <img src={product?.productImage[0]} alt='' className='w-full h-64 object-cover'/>
        </Link>
        <div className='absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3'>
          <h3 className='font-semibold truncate'>{product.productName}</h3>
          {
              product.isRented  ? 
                  <button  className="w-14 h-12 flex-colo transitions hover:bg-subMain hover:text-subMain rounded-md bg-white bg-opacity-30 text-yellow-400">
                    Booked
                  </button>:
                   <button onClick={()=>onEditFunction(product)} className="w-14 h-12 flex-colo  rounded-md transitions hover:bg-subMain hover:text-white text-yellow-400  bg-white bg-opacity-30">
                    Rent $
                  </button>
                  }
        </div>
      </div>
      ))
    }
</>
  )
}

export default Product