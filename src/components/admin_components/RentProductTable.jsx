import {FaEdit} from 'react-icons/fa'
const Head = 'text-xs text-left text-dry font-semibold px-6 py-2 uppercase'
const text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'


const Rows = (product,i,statusChange)=>{


    return (
        <tr key={i}>
            <td className={`${text}`}>
                <div className='w-12 p-1 bg-dry border-boarder h-12 rounded overflow-hidden'>
                    <img className='h-full w-full object-cover' src={product?.productImage[0]} alt=''/>
                </div>
            </td>
            <td className={`${text} truncate`}>{product.productName}</td>
            <td className={`${text}`}>{product.rentPrice}</td>
            <td className={`${text}`}>{product.locationName}</td>
            <td className={`${text} float-right flex-rows gap-2`}>

                {product.isUnlisted ? 
                <button onClick={()=>statusChange(product._id,product.isUnlisted)} className='bg-green-600 flex-rows gap-2 text-white  rounded flex-colo w-14 h-7'>
                 List
                </button>:
                <button onClick={()=>statusChange(product._id,product.isUnlisted)}  className='bg-subMain flex-rows gap-2 text-white  rounded flex-colo w-14 h-7'>
                 Unlist
                </button> 
                }
            </td>

        </tr>
    )

}


function ProductTable({products,statusChange}) {

  return (
    <div className='overflow-x-scroll overflow-hidden relative h-full'>
        <table className='w-full table-auto border border-boarder divide-y divide-boarder'>
          <thead>
            <tr className='bg-dryGray '>
                <th scope='col' className={`${Head}`}>Image</th>
                <th scope='col' className={`${Head}`}>Name</th>
                <th scope='col' className={`${Head}`}>Price</th>
                <th scope='col' className={`${Head}`}>Location</th>
                <th scope='col' className={`${Head} text-end`}>Actions</th>

            </tr>
          </thead>
          <tbody className='bg-main divide-y divide-gray-800'>
            {products.map((product,i) => Rows(product,i,statusChange))}
          </tbody>
        </table>
    </div>
  )
}

export default  ProductTable