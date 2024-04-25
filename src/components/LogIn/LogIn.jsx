
import Auth from '../Auth/Auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ROUTES from '../../utils/routes';
import { setUser } from '../../store/slices/userSlice';


const LogIn = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const onClickAuth = (email, password) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email, password)
      .then((userDetails) => {
        dispatch(setUser({ email, token: userDetails.user.uid }));
        navigate(ROUTES.LANDINGPAGE)
        localStorage.setItem('token', userDetails.user.uid )
        localStorage.setItem('email', email )
      })

      .catch((error) => {
        console.log(error);
      })

  }


  return (
    <>
      <Auth propWord={'Log In'} onClickAuth={onClickAuth}/>
    </>
  )
}

export default LogIn