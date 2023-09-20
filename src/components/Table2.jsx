
const Head = 'text-xs text-left text-dry font-semibold px-6 py-2 uppercase'
const text = 'text-sm text-left leading-6 whitespace-nowrap px-5 py-3'


const Rows = (data,i)=>{
  const currentDate = new Date();
  
  const toDate = new Date(data.toDate);
  const isOnDue =  currentDate <= toDate;
    return (
        <tr key={i}>
         
            <td className={`${text}`}>
                <div className='w-12 p-1 bg-dry border-boarder h-12 rounded overflow-hidden'>
                    <img className='h-full w-full object-cover' src={data.productId?.productImage[0]} alt=''/>
                </div>
            </td>
            <td className={`${text}`}>{data?.productId?.productName}</td>
            <td className={`${text}`}>{data.amount}</td>
            <td className={`${text}`}>{new Date(data.fromDate).toLocaleDateString()}</td>
            <td className={`${text}`}>{new Date(data.toDate).toLocaleDateString()}</td>
            <td className={`${text} float-right flex-rows gap-2`}>
               {
                data.returned ?
                <button  className='border border-boarder text-green-500  rounded bg-dry flex-rows gap-2 py-1 px-2'>
                Returned
              </button>:
                isOnDue ? 
               <button  className='border border-boarder text-yellow-500  rounded bg-dry flex-rows gap-2 py-1 px-2'>
               Using
             </button>:<button className='border border-boarder bg-subMain flex-rows gap-2 text-white  rounded flex-colo w-16 h-7'>
                On Due
              </button>
               }               
            </td>
        </tr>
    )

}


function Table2({rentProduct}) {
  

  return (
    <div className='overflow-x-scroll overflow-hidden relative h-full'>
        <table className='w-full table-auto border border-boarder divide-y divide-boarder'>
          <thead>
            <tr className='bg-dryGray '>
                <th scope='col' className={`${Head}`}>Image</th>
                <th scope='col' className={`${Head}`}>Produc tName</th>
                <th scope='col' className={`${Head}`}>Rent Price</th>
                <th scope='col' className={`${Head}`}>From</th>
                <th scope='col' className={`${Head}`}>To</th>   
                <th scope='col' className={`${Head} text-end`}>Status</th>        
            </tr>
          </thead>
          <tbody className='bg-main divide-y divide-gray-800'>
            { rentProduct.map((data,i) => Rows(data,i,))}
          </tbody>
        </table>
    </div>
  )
}

export default Table2