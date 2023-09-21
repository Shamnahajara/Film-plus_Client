
import Titles from '../../../components/Titles';
import { BsCollectionFill } from 'react-icons/bs';
import Product from '../../../components/user_components/sell_rent_components/Product'

function TopProducts({products,onEditFunction}) {
  console.log("products in top products",products)

  return (
    <div className='my-16'>
      <Titles title='Top Products' Icon={BsCollectionFill} /> 
      <div className='grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-flow-cols-2 grid-cols-1 gap-10'>   
            <Product onEditFunction={onEditFunction} products={products}/>        
      </div>
    </div>
  );
}

export default TopProducts;
