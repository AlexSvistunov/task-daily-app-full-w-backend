import Auth from "../Auth/Auth";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../utils/routes";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/slices/userSlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickAuthRegister = (email, password) => {
    dispatch(signUp({ email, password })).then((data) => {
      if (data.payload.email) {
        alert(data.payload.email);
      }

      if (data.payload.password) {
        alert(data.payload.password);
      } else {
        navigate(ROUTES.LANDINGPAGE);
      }
    });
  };

  return (
    <>
      <Auth propWord={"Sign Up"} onClickAuth={onClickAuthRegister} />
    </>
  );
};


export default SignUp;
