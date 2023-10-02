import { Toaster } from 'react-hot-toast'
import AdminSidebar from '../../components/admin_components/AdminSidebar'
import CommunityTable from '../../components/admin_components/CommunityTable'
function CommunityList() {
    return (
        <AdminSidebar>
            <Toaster toastOptions={3000} />
            <div className='flex flex-col gap-6'>
                <div className='flex-btn gap-2'>
                    <h2 className='text-xl font-bold'>Users list</h2>
                </div>
                {/* community  table */} 
                <CommunityTable />
            </div>
        </AdminSidebar>
    )
}

export default CommunityList