import Auth from "../Auth/Auth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../utils/routes";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/slices/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickAuth = (email, password) => {
    const auth = getAuth();
    
  };

  return (
    <>
      <Auth propWord={"Sign Up"} onClickAuth={onClickAuth} />
    </>
  );
};

// redux persist

export default SignUp;
