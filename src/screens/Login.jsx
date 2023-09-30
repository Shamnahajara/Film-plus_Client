import { FiLogIn } from 'react-icons/fi'
import { useState } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import { useNavigate, Link } from 'react-router-dom'
import axiosInstance from '../api/axios'
import { useDispatch } from 'react-redux'
import { userLogin } from '../store/slice/user'
import { GoogleOAuthProvider } from '@react-oauth/google'
import GoogleLoginComponent from '../components/user_components/main_components/GoogleLogin'
const CLIENTID = '1070072108029-fag87uqcnh33gplrfpenb6np1fo2kicc.apps.googleusercontent.com'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reMail, setRemail] = useState(false);
  const [forgott, setForgott] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogin() {
    if (email.trim().length == 0 || password.trim().length == 0) {
      toast.error('fill all the fields')
    } else {
      axiosInstance.post('/user/login', { email, password, reMail }).then((res) => {
        if (res.data) {
          toast.success(res.data.message)
          const name = res.data.name
          const token = res.data.token
          const role = res.data.role
          const userId = res.data.userId
          dispatch(userLogin({ name, token, role, userId }))
          navigate('/')
        }
      }).catch((err) => {
        if (err?.response.status === 401) {
          setRemail(true)
          toast.error(err?.response.data.errmsg)
        } else if (err?.response?.status === 500) {
          navigate('/serverError')
        } else if (err?.response?.data) {
          toast.error(err?.response?.data?.errmsg)
        }
      })
    }
  }

  const forgotPassword = () => {
    axiosInstance.post('/user/forgotPassword', { email }).then((res) => {
      toast.success(res.data.message)
    }).catch((error) => {
      if (error.response.data.errmsg) {
        toast.error(error.response.data.errmsg)
      }

    })
  }
  return (

    <>
      <Toaster toastOptions={{ duration: 4000 }} />
      {forgott ? 
      <main id="content" role="main" className="w-screen flex h-screen items-center max-w-md mx-auto p-6">
        <div className="mt-7 w-full bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Forgot password?</h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Remember your password?{' '}
                <span onClick={() => setForgott(false)} className="text-blue-600 decoration-2 hover:underline font-medium">
                  Login here
                </span>
              </p>
            </div>

            <div className="mt-5">
              <form>
                <div className="grid gap-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold ml-1 mb-2 dark:text-white">Email address</label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm"
                        required
                        aria-describedby="email-error"
                      />
                    </div>
                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">Please include a valid email address so we can get back to you</p>
                  </div>
                  <button
                    onClick={forgotPassword}
                    type="submit"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                  >
                    Reset password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main> :
        <div className='container mx-auto px-2 my-24 flex-colo'>
          <div className='w-full 2xl:w-2/5 gap-8 p-8 sm:p-14 md:w-3/5 flex-colo  bg-dry rounded-lg border  border-boarder '>
            <h1 className='w-full h-full object-contain text-subMain text-center'>FILM-PLUS</h1>
            <div className="text-sm w-full">
              <label className="text-border font-semibold">Email</label>
              <input onChange={(e) => setEmail(e.target.value)} required type='text' placeholder='Enter Email' className={`w-full text-sm mt-2 p-5 border border-boarder text-white bg-main`} />
            </div>
            <div className="text-sm w-full">
              <label className="text-border font-semibold">Password</label>
            </div>
            {reMail == true ? '' : <><input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-sm mt-2 p-5 border border-boarder text-white bg-main "
              name="password"
              placeholder="Password" />
              <GoogleOAuthProvider clientId={CLIENTID}>
                <GoogleLoginComponent />
              </GoogleOAuthProvider>
            </>
            }

            <button
              onClick={() => { handleLogin(), reMail ? toast.success('Check your mail') : '' }}
              className='bg-subMain transitions hover:bg-main flex-rows gap-4 text-white p-4 rounded-lg w-full'>
              <FiLogIn /> {reMail == true ? 'Verify mail' : "Login Account"}
            </button>
            <p className='text-center text-boarder '>
              Dont have an account?{" "}<Link to="/register" className='text-dryGray font-semibold ml-2'>Register</Link>
            </p>
            <p className='text-center text-boarder '>
              <Link onClick={() => setForgott(true)} className='text-blue-600 font-semibold ml-2'>Forget your Password?</Link>
            </p>

          </div>
        </div>
      }
    </>
  )
}

export default Login