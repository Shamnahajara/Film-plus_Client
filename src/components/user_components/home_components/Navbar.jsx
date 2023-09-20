import logo from '../../../../public/images/logo-svg.svg'
import { useSelector,useDispatch } from 'react-redux'
import { userLogout } from '../../../store/slice/user'
import { useNavigate } from 'react-router-dom'
function Navbar() {
  const {token} = useSelector((state)=>state.User)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
    <div className="navbar bg-base-100">
    <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Home</a></li>
        <li><a>Rent&sell </a></li>
        <li><a>Community</a></li>
        <li><a>Watch list</a></li>
        <li><a>Profile</a></li>
      </ul>
    </div>
    <img src={logo} alt="Logo" className="w-10 h-10" />

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a onClick={()=>navigate('/')}>Home</a></li>
      <li><a>Rent&sell</a></li>
      <li><a>Community</a></li>
      <li><a>Whatch list</a></li>
      <li><a onClick={()=>navigate('/profile')}>Profile</a></li>
    </ul>
  </div>
  <div className="navbar-end">{
    token?<a onClick={()=>{
      dispatch(userLogout())
      navigate('/login')
    }} className="btn">Logout</a> : <a onClick={()=>{
        navigate('/login')
    }} className="btn">Login</a> 
  }
    
  </div>
</div>
    </>
  )
}

export default Navbar
