import { MdRateReview } from "react-icons/md"
import ReviewTable from "./dashboard/ReviewTable"
import SideBar from "./dashboard/sidebar"
import Titles from "../components/Titles"



function UserReviews() {

  return (
    <SideBar>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <Titles title='Reviews you added' Icon={MdRateReview} />
        </div>
        <ReviewTable />
      </div>
    </SideBar>
  )
}

export default UserReviews