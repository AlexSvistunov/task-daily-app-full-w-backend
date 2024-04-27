
import Auth from '../Auth/Auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import ROUTES from '../../utils/routes';
import { setUser } from '../../store/slices/userSlice';

import { login } from '../../store/slices/userSlice';


const LogIn = () => {

  const navigate = useNavigate()
  
  const dispatch = useDispatch()

  const onClickAuth = async (email, password) => {

    dispatch(login({email, password})).then(data => {
      if(data.type === 'user/login/fulfilled') {
        navigate(ROUTES.LANDINGPAGE)
      }
    })

  }


  return (
    <>
      <Auth propWord={'Log In'} onClickAuth={onClickAuth}/>
    </>
  )
}

export default LogIn