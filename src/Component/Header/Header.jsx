import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../Store/authSlice";
import { useEffect, useState } from "react";
import Person2Icon from "@mui/icons-material/Person2";
import { getDecodedToken } from "../../Backend/config";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // const decoded_token = getDecodedToken() === undefined ? '' : getDecodedToken();
  // console.log(decoded_token?.sub);

  useEffect(() => {
    if (isLoggedIn) {
      setName(localStorage.getItem("name"));
    } else {
      setName("User");
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white border-gray-200 px-1 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link className="flex items-center">
              <span className="font-bold text-3xl">Trip</span>
              <span className="text-orange-500 font-bold text-3xl">ti</span>
            </Link>

            <div className="flex justify-evenly items-center lg:order-2 gap-4">
              {isLoggedIn &&  (
                <div className="flex gap-2 place-items-center items-center">
                <div className="flex items-center gap-2 border border-1 rounded-md py-1 px-2">
                  <div className="border border-black rounded-full m-auto flex items-center justify-center">
                    <Person2Icon />
                  </div>

                  <Link to="/" className="flex items-center text-xl gap-2">
                    {/* {getDecodedToken().sub} */}
                    {name}
                  </Link>
                  
                </div>
                <div>
                  <Link to={"/cart"}>
                    <ShoppingCartIcon />
                  </Link>
                </div>
                </div>
              ) }
              
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/l"
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                >
                  Login
                </Link>
              )}
            </div>

            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to={"/"}
                    className={({ isActive }) =>
                      `${isActive ? "text-orange-700" : "text-gray-700"}
                                    block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `${isActive ? "text-orange-700" : "text-gray-700"}
                                    block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `${isActive ? "text-orange-700" : "text-gray-700"}
                                    block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
