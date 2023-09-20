import Side_bar from '../../components/admin_components/dashboard_components/Side_bar'
import Admin_home from '../../components/admin_components/dashboard_components/Admin_home'

function Home() {
  return (
    <>
    <div className='flex'>
    <Side_bar/>
    <Admin_home/>
    </div>
    </>
  )
}

export default Home