import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

function Rating({value}) {
  return (
    <>
    <span>
        {
            value >= 2 ? (<FaStar/>): value >= 0.5 ? (<FaStarHalfAlt/>) : (<FaRegStar/>)
        }
    </span>
    <span>
        {
            value >= 4 ? (<FaStar/>): value >= 2.5 ? (<FaStarHalfAlt/>) : (<FaRegStar/>)
        }
    </span>
    <span>
        {
            value >= 6? (<FaStar/>): value >= 4.5 ? (<FaStarHalfAlt/>) : (<FaRegStar/>)
        }
    </span>
    <span>
        {
            value >= 8 ? (<FaStar/>): value >= 6.5 ? (<FaStarHalfAlt/>) : (<FaRegStar/>)
        }
    </span>
    <span>
        {
            value >= 10 ? (<FaStar/>): value >= 8.5 ? (<FaStarHalfAlt/>) : (<FaRegStar/>)
        }
    </span>
    </>
  )
}

export default Rating