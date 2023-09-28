const Head = 'text-xs text-left text-dry font-semibold px-6 py-2 uppercase'
const text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'

const Rows = (product,i,returned,sendMail)=>{

    const currentDate = new Date();
    const toDate = new Date(product.toDate);
    const isOnDue =  currentDate <= toDate;

    return (
        <tr key={i}>
            <td className={`${text}`}>
                <div className='w-12 p-1 bg-dry border-boarder h-12 rounded overflow-hidden'>
                    <img className='h-full w-full object-cover' src={product?.productId?.productImage[0]} alt=''/>
                </div>
            </td>
            <td className={`${text} truncate`}>{product.productId.productName}</td>
            <td className={`${text}`}>{product.userId.name}</td>
            <td className={`${text}`}>{ new Date(product.bookedAt).toLocaleDateString() }</td>
            <td className={`${text}`}>
              {
                product.returned ?
                <button  className='bg-green-600 flex-rows gap-2 text-white  rounded flex-colo w-14 h-7'>
                 returned
                </button> :
                !isOnDue ?
                <button  className='bg-red-600 flex-rows gap-2 text-white  rounded flex-colo w-14 h-7'>
                  onDue
               </button>:
                 <button  className='bg-yellow-600 flex-rows gap-2 text-white  rounded flex-colo w-14 h-7'>
                  Using
                </button> 
              }
            </td>
            <td className={`${text} float-right flex-rows gap-2`}>
              {
                !isOnDue && product.returned ?  <button onClick={()=>sendMail(product._id,product.productId._id)} className='border border-boarder flex-rows gap-2 text-blue-500  rounded flex-colo py-1 px-1 w-18 h-7'>
                Send mail
               </button> : <span className="text-green-500 px-1">completed</span>
              }
                {
                  product.returned ? <button 
                   onClick={()=>returned(product._id,product.productId)}
                   className='border border-boarder  flex-rows gap-2 text-green-500 py-1 px-1 rounded flex-colo w-18 h-7'>
                  Returned
                 </button> : ''
                }
               
            </td>
        </tr>
    )

}


function ProductTable({onrentProduct,returned,sendMail}) {
  
  return (
    <div className='overflow-x-scroll overflow-hidden relative h-full'>
        <table className='w-full table-auto border border-boarder divide-y divide-boarder'>
          <thead>
            <tr className='bg-dryGray '>
                <th scope='col' className={`${Head}`}>Image</th>
                <th scope='col' className={`${Head}`}>Product</th>
                <th scope='col' className={`${Head}`}>Rented By</th>
                <th scope='col' className={`${Head}`}>Booked At</th>
                <th scope='col' className={`${Head}`}>Rent Status</th>
                <th scope='col' className={`${Head}`}>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-main divide-y divide-gray-800'>
            {onrentProduct.map((product,i) => Rows(product,i,returned,sendMail))}
          </tbody>
        </table>
    </div>
  )
}

export default  ProductTable