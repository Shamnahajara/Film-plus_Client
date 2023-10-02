import { Routes,Route,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import Login from "../pages/admin_pages/Login";
// import Home from "../pages/admin_pages/Home";
import Home from '../screens/Admin/Dasboard'
// import Users from "../pages/admin_pages/Users";
import Login from '../screens/Admin/Login';
import Users from '../screens/Admin/UsersList'
import Movies from '../screens/Admin/MovieLists'
import ProductList from '../screens/Admin/ProductList'
import CommunityList from "../screens/Admin/CommunityList";

function Admin_route() {

  const admin = useSelector((state)=>state.Admin)
  return (
    <Routes>
        <Route path='/' element={admin.token!==null? <Home/>:<Navigate to={'/admin/login'}/>}/>
        <Route path='/login' element={admin.token !== null?<Navigate to={'/admin'}/> :<Login/> }/>
        <Route path="/users" element={admin.token !== null?<Users/> :<Navigate to={'/admin/login'}/>}/>
        <Route path="/movieslists" element={admin.token !== null ? <Movies/> : <Navigate to={'/admin/login'}/>} />
        <Route path='/rentProducts' element={admin.token !== null ? <ProductList/>:<Navigate to={'/admin/login'}/>} />
        <Route path='/communities' element={admin.token !== null ? <CommunityList/> : <Navigate to={'/admin/login'}/>}/>
    </Routes>
  )
}

export default Admin_route
