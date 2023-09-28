import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Forbidden from './pages/error_pages/Forbidden'
import Server_error from './pages/error_pages/Server_error'
import VerifyEmail from './pages/user_pages/main/VerifyEmail'
import ResetPass from './pages/user_pages/main/ResetPass'
import AdminRoute from './routes/Admin_route'
import HomeScreen from './screens/homeScreen';
import AboutUs from './screens/AboutUs'
import Notfound from './screens/notFound';
import ContactUs from './screens/Address';
import Movies from './screens/movies'
import SingleMovie from './screens/singleMovie';
import Watchpage from './screens/Watchpage';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/dashboard/profile'
import Aos from 'aos'
import Password from './screens/dashboard/password';
import FavoriteMovies from './screens/dashboard/favoriteMovies';
import MoviesLists from './screens/dashboard/admin/movieLists';
import Dashboard from './screens/dashboard/admin/dashboard';
import RentHistory from './screens/RentHistory'
import Users from './screens/dashboard/admin/users'
import AddMovie from './screens/dashboard/admin/addMovies'
import RentHome from './screens/RentHome'
import AddProduct from './components/user_components/sell_rent_components/AddProduct'
import ProductDetail from './screens/ProductDetail'
import ProductLists from './screens/ProductLists'
import PaymentSuccess from './components/PaymentSuccess'
import PaymentFail from './components/PaymentFail'
import Community from './screens/Community'
import Chatwithprovider from './screens/Chatwithprovider'
import CommunityChat from './screens/CommunityChat'


function App() {
   Aos.init()
   const user = useSelector((state)=>state.User)
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomeScreen/>} />
        <Route path='/register' element={user.token!== null? <Navigate to='/'/>:<Register/>}/>
        <Route path='/emailVerify/:userId' element={<VerifyEmail/>} />
        <Route path='/resetPassword/:userId' element={<ResetPass/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/profile' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ? <Profile/>:<Navigate to='/'/>} />
        <Route path='/aboutUs' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ? <AboutUs/>:<Navigate to='/login'/>} />
        <Route path='/contactUs' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ? <ContactUs/> :<Navigate to='/login'/>} />
        <Route path='/movies' element={user.isBlocked ? <Navigate to='/forbiden' />: user.token !== null? <Movies />: <Navigate to='/login' />}/>
        <Route path='/Movie/:id' element={user.isBlocked ? <Navigate to='/forbiden' />:<SingleMovie/>} />
        <Route path='/watch/:id' element={user.isBlocked ? <Navigate to='/forbiden' />:<Watchpage/>} />
        <Route path='/password' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<Password/>:<Navigate to='/login'/>} />
        <Route path='/favorites' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token!== null ? <FavoriteMovies/>:<Navigate to='/login'/>} />
        <Route path='/movieslists' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<MoviesLists/>:<Navigate to='/login'/>} />
        <Route path='/dasboard' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<Dashboard/>:<Navigate to='/login'/>} />
        <Route path='/renthistory' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<RentHistory />:<Navigate to='/login'/>} />
        <Route path='/users' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<Users/>:<Navigate to='/login'/>} />
        <Route path='/addmovie' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<AddMovie/>:<Navigate to='/login'/>} />

       {/* Rent & Sell routes */}
       <Route path='/rentandsell' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<RentHome/>:<Navigate to='/login'/>} />
       <Route path='/addproduct' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<AddProduct/>:<Navigate to='/login'/>} />
       <Route path='/productDetail/:id' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<ProductDetail/>:<Navigate to='/login'/>} />
       <Route path='/productlists' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<ProductLists/>:<Navigate to='/login'/>} />
       <Route path='/chatwithprovider/:providerId' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<Chatwithprovider/>:<Navigate to='/login'/>} />
       <Route path='/chat' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<Chatwithprovider/>:<Navigate to='/login'/>} />

       
       {/* Payment Routes */}
       <Route path="/paymentSuccess/:load" element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<PaymentSuccess/>:<Navigate to='/login'/>} />
       <Route path='/paymentFail' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<PaymentFail/>:<Navigate to='/login'/>} />

       {/* Community page routes */}
       <Route path='/communities' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<Community/>:<Navigate to='/login'/>} />    
       <Route path='/communityChat' element={user.isBlocked ? <Navigate to='/forbiden' />:user.token !== null ?<CommunityChat/>:<Navigate to='/login'/>} /> 

        {/*ADMIN-ROUTE*/}
        <Route path='/admin/*' element={<AdminRoute/>}/>
        
        {/* NOT FOUND PAGE*/}
        <Route path='*' element={<Notfound/>} />

        {/* 500 SERVER ERROR*/}
        <Route path='/serverError' element={<Server_error/>}/>

        {/* ACCESS DENIED*/}
        <Route path='/forbiden' element={<Forbidden/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
