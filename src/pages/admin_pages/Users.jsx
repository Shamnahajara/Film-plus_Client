
import Side_bar from '../../components/admin_components/dashboard_components/Side_bar'
import Users_list from '../../components/admin_components/user_manage_components/Users_list'

function Users() {
  return (
    <div className='flex'>
        <Side_bar/>
        <Users_list/>
    </div>
  )
}

export default Users