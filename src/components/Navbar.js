import React, { useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


export default function Navbar(props) {
  
 

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

const[isMenuOpen, setIsMenuOpen]=useState(false);
  const [userName, setUserName] = useState("");
  let navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token");
    props.showAlert("Logged Out", "success");
    navigate("/login");
    handleScrollToTop();
  };

const closeMenu=()=>{
  setIsMenuOpen(false)
}
const toggleMenu=()=>{
  setIsMenuOpen(!isMenuOpen)
}




const firstCap = (str) => {
  const word = str.trim(" ");
  let idx = word.indexOf(" ");
  if (idx !== -1) {
    let firstWord = word.substring(0, idx);
    return firstWord.charAt(0).toUpperCase() + firstWord.slice(1);
  }
  return word.charAt(0).toUpperCase() + word.slice(1);
};




var nameChange=localStorage.getItem("token");
useEffect(() => {
  
  let getUserName = async () => {
    const response = await fetch("/api/auth/getuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
     
      
      response.ok ? setUserName(json.name) : setUserName("User");
      
    };
  if(localStorage.getItem("token")){
     getUserName();
  } 

  
  }, [nameChange]);


  let location = useLocation();


  return (
    <div>
      <nav
        className="navbar navbar-expand-lg fixed-top bg-body-tertiary"
        data-bs-theme="dark"
        style={{marginBottom:0}}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            CloudCanvas
          </Link>
          <button
            className={`navbar-toggler ${isMenuOpen?'collapse':""}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen?"true":"false"}
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isMenuOpen?"show":""}`}id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                  onClick={()=>{handleScrollToTop();closeMenu();}}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                  onClick={()=>{handleScrollToTop();closeMenu();}}
                >
                  About
                </Link>
              </li>
            </ul>



            {!localStorage.getItem("token") ? (
              <form className="d-flex" role="search">
                <Link
                  className="btn btn-primary mx-2"
                  to="/login"
                  role="button"
                  onClick={()=>{handleScrollToTop();closeMenu();}}
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-2"
                  to="/signup"
                  role="button"
                  onClick={()=>{handleScrollToTop();closeMenu();}}
                >
                  SignUp
                </Link>
              </form>
            ) : (
              <form className="d-flex">
                <h4 className="navbar-brand container-fluid text-light mt-2 mx-3 mb-2">{`Hello,  ${firstCap(userName)}`}</h4>
                <button className="btn btn-primary" onClick={()=>{handleLogout();closeMenu();}}>
                  Logout
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
