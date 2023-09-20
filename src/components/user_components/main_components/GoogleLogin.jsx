import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-hot-toast';
import axiosInstance from '../../../api/axios';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../../store/slice/user'


function 
GoogleLoginComponent() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            googleLogin(codeResponse.access_token);
        },
        onError: (error) => {
            console.error('Login Failed:', error);
            toast.error('Google Login Failed');
        },
    });

    const googleLogin = (accessToken) => {
        axiosInstance
            .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`)
            .then((res) => {
                handleLogin(res.data);
            })
            .catch((err) => {
                console.error(err, 'Error');
            });
    };

    const handleLogin = (profile) => {
        axiosInstance
            .post('/user/googleLogin', { profile })
            .then((res) => {
                const { name, token, role, userId } = res.data;
                dispatch(userLogin({ name, token, role, userId }));
                navigate('/');
            })
            .catch((error) => {
                if (error.response?.data.errMsg) {
                    toast.error(error.response.data.errMsg);
                }
            });
    };

    return (
        <div >
            <GoogleLogin onSuccess={login} />
        </div>
    );
}

export default GoogleLoginComponent;