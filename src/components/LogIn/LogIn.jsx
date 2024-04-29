import Auth from "../Auth/Auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import ROUTES from "../../utils/routes";
import { setUser } from "../../store/slices/userSlice";

import { login } from "../../store/slices/userSlice";

const LogIn = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onClickAuth = async (email, password) => {
    const response = await dispatch(login({ email, password })).then((data) => {
      if (data.payload["non_field_errors"]) {
        alert(data.payload["non_field_errors"][0]);
        return;
      }

      navigate(ROUTES.LANDINGPAGE);
    });
  };

  return (
    <>
      <Auth propWord={"Log In"} onClickAuth={onClickAuth} />
    </>
  );
};

export default LogIn;
