
import {Toaster} from 'react-hot-toast'

function Admin_home() {
  return (
    <div className="min-h-screen w-full ">
          <Toaster toastOptions={3000} />
          <header className="bg-gradient-to-r from-blue-500 to-purple-500 py-6 rounded-b-lg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h1 className="text-3xl font-extrabold text-white">DashBoard</h1>
  </div>
</header>
    </div>
  )
}

export default Admin_home


