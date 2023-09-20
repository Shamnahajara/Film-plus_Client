import SideBar from '../sidebar';
import {  HiPlusCircle } from 'react-icons/hi';
import Table2 from '../../../components/Table2';
import CategoryModal from '../../../components/Modals/CategoryModal';
import { useState } from 'react';
import { UsersData } from '../../../Data/UsersData';


function Users() {
    const [modalOpen,setModalOpen] = useState(false)

  return (
    <SideBar>
       <CategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Users</h2>
          <button 
          onClick={()=>setModalOpen(true)}
          className='bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main  border border-subMain text-white py-2 px-4 rounded'>
            <HiPlusCircle/>Create
          </button>
        </div>
        <Table2 data={UsersData} users={true}/>
      </div>
    </SideBar>
  )
}

export default Users;
