import { useSelector,useDispatch } from 'react-redux'
import { userLogout } from '../../store/slice/user'
import {Link, NavLink} from 'react-router-dom'
import {FaUser,FaUsers, FaHeart, FaSearch} from 'react-icons/fa'


function NavBar() {
    const hover = 'hover:text-subMain transitions text-white'
    const Hover = ({isActive})=>(isActive? 'text-subMain':hover )
    const {token} = useSelector((state)=>state.User)
    const dispatch = useDispatch()
  return (
    <>
    <div className='bg-main shadow-md sticky top-0 z-20'>
        <div className='container mx-auto py-6 px-2 lg:grid gap-10 grid-cols-7 justify-between items-center '>
           {/* Logo  */}
           <div className='col-span-1 lg:block hidden'>
            <Link to='/'>
                <p className='w-full text-subMain h-12 object-contain text-lg'>FILM-PLUS</p>
            </Link>
           </div>
           {/* search form */}
           <div className='col-span-3'>
               {/* <form className='w-full text-sm bg-dryGray rounded flex-btn gap-4'>
                <button type='submit' className='bg-subMain w-12 flex-colo h-12 rounded text-white'>
                <FaSearch/>
                </button>
                <input 
                 type='text'
                 placeholder='Search movies from here'
                 className='font-medium placeholder:text-boarder text-sm w-11/12 h-12 bg bg-transparent border-none px-2 text-black'/>
               </form> */}
           </div>
           {/* menus */}
           <div className='col-span-3 font-medium text-sm hidden xl:gap-14 2xl:gap-20 justify-between lg:flex xl:justify-end items-center'>
            <NavLink to="/" className={Hover}>Home</NavLink>
            <NavLink to="/movies" className={Hover}>Movies</NavLink> 
            <NavLink to="/rentandsell" className={Hover}>Rent&Sell</NavLink> 
            <NavLink to="/communities" className={Hover}>Communities</NavLink> 
            {
            token? <NavLink to='/login'className={Hover} onClick={()=>{dispatch(userLogout()) }} >Logout</NavLink> :
            <NavLink className={Hover} to='/login'>Login</NavLink> } 
            <NavLink to="/favorites" className={`${Hover} relative`}>
                <FaHeart className='w-6 h-6'/>
                <div className='w-5 h-5 flex-colo rounded-full text-xs bg-subMain text-white absolute -top-5 -right-1'>3</div>
            </NavLink> 
            <NavLink to="/profile" className={Hover}><FaUser className='w-6 h-6'/></NavLink>        
           
         
            </div>
        </div>
    </div>
    </>
  )
}

export default NavBar