import ROUTES from "../../utils/routes";
import "./Header.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import { removeUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/slices/userSlice";
import { getMyData } from "../../store/slices/userSlice";
import { useEffect, useState } from "react";

const Header = () => {
  const { isAuth, token } = useAuth();
  const dispatch = useDispatch();

  const [myData, setMyData] = useState("");
  console.log(myData);

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(getMyData({ token }));
      setMyData(response.payload);
    };

    if (token) {
      fetchData();
    }
  }, [dispatch, token]);

  const logOutHandler = () => {
    dispatch(logOut(token));
  };
  return (
    <header className="header">
      <div className="container header__container">
        <Link className="logo header__logo" to={ROUTES.LANDINGPAGE}></Link>

        {isAuth ? (
          <div className="header__user">
            <div className="header__user-email">
              {myData && myData.email}
            </div>
            <button className="header__user-logout"
              onClick={logOutHandler}
             
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="header__links">
            <Link
              className="header__link header__link--register"
              to={ROUTES.REGISTER}
            >
              Register
            </Link>
            <Link
              className="header__link header__link--login"
              to={ROUTES.LOGIN}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
