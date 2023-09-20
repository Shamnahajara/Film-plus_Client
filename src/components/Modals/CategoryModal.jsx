
import { Input } from '../UsedInputs'
import MainModal from './MainModal'


function CategoryModal({modalOpen, setModalOpen,category}) {
  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className='inline-block sm:w-4/5  rounded-md border border-boarder md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full  bg-main text-white'>
            <h2 className='text-3xl font-bold'>{category ? "Update" :"Create"}</h2>
            <form className='flex flex-col gap-6 text-left mt-6'>
            <Input label="Category Name" placeholder={category ? category?.title: "enter unique category"} type="text" bg={false}/>
            <button onClick={()=> setModalOpen(false)} className='w-full flex-colo py-4 hover:bg-transparent border-2 border-subMain rounded bg-subMain text-white'>
              {category ? "Edit": "Add"}
            </button>
            </form>
        </div>
    </MainModal>
  )
}

export default CategoryModal