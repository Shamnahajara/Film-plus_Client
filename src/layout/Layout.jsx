
import NavBar from './Navbar/NavBar'
import Footer from './Footer/Footer'
import { Toaster } from 'react-hot-toast'

function Layout({children}) {
  return (
    <>
    <div className='bg-main text-white'>
        <NavBar/>
        <Toaster toastOptions={3000} />
        {children}
        <Footer/>
    </div>
    </>
  )
}

export default Layout