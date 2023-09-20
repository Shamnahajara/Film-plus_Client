import SideBar from '../sidebar';
import {MoviesData} from '../../../Data/MoviesData';
import {categoriesData} from '../../../Data/CategoriesData'
import {  HiPlusCircle } from 'react-icons/hi';
import Table2 from '../../../components/Table2';
import CategoryModal from '../../../components/Modals/CategoryModal';
import { useEffect, useState } from 'react';


function Categories() {
    const [modalOpen,setModalOpen] = useState(false)
    const [category,setCategory] = useState('')

    const onEditFunction = (id)=>{
      setCategory(id)
      setModalOpen(!modalOpen)
    }

    useEffect(()=>{
      if(modalOpen === false){
         setCategory()
      }
    })

  return (
    <SideBar>
        <CategoryModal modalOpen={modalOpen} setModalOpen={setModalOpen} category={category}/>
      <div className='flex flex-col gap-6'>
        <div className='flex-btn gap-2'>
          <h2 className='text-xl font-bold'>Categories</h2>
          <button 
          onClick={ ()=> setModalOpen(true)}
          className='bg-subMain flex-rows gap-4 font-medium transitions hover:bg-main  border border-subMain text-white py-2 px-4 rounded'>
            <HiPlusCircle/>Create
          </button>
        </div>
        <Table2 data={categoriesData} users={false} onEditFunction={onEditFunction}/>
      </div>
    </SideBar>
  )
}

export default Categories;
