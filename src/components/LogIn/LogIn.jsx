import Auth from "../Auth/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ROUTES from "../../utils/routes";

import { login } from "../../store/slices/userSlice";

const LogIn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onClickAuthLogin = async (email, password) => {
    await dispatch(login({ email, password })).then((data) => {
      console.log('data', data);
      

      navigate(ROUTES.LANDINGPAGE);
    });
  };

  return (
    <>
      <Auth propWord={"Log In"} onClickAuth={onClickAuthLogin} />
    </>
  );
};

export default LogIn;
