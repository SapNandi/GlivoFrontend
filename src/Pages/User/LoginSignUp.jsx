import React, { useRef, useState, useEffect } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../Components/Layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
// import Cookies from "universal-cookie";
import { login, clearError, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import locationData from "../../locationData.json";

const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  // const cookies = new Cookies();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [loacalUser, setLocalUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [countryName, setCountryName] = useState("");
  const [state, setState] = useState([]);
  const [stateName, setStateName] = useState("");

  const handlecounty = (e) => {
    const getcountryName = e.target.value;
    const getStatedata = locationData.find(
      (country) => country.country_name === getcountryName
    ).states;
    setState(getStatedata);
    setCountryName(getcountryName);
    console.log(getcountryName);
  };

  const handlestate = (e) => {
    const statename = e.target.value;
    console.log(statename);
    setStateName(statename);
  };

  const { name, email, password } = loacalUser;

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();

    // console.log(countryName, stateName);

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("country", countryName);
    myForm.set("state", stateName);
    myForm.set("avatar", avatar);

    dispatch(register(myForm));
    // console.log(myForm);
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else if (e.target.name === "country") {
      const getcountryName = e.target.value;
      const getStatedata = locationData.find(
        (country) => country.country_name === getcountryName
      ).states;
      setState(getStatedata);
      setCountryName(getcountryName);
    } else if (e.target.name === "state") {
      const statename = e.target.value;
      // console.log(statename);
      setStateName(statename);
    } else {
      setLocalUser({ ...loacalUser, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.info(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch, error, alert, isAuthenticated, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            <div>
              <div className="login_signUp_toggle">
                <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
              <div className="loginEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="loginPassword">
                <LockOpenIcon />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  required
                  name="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
                <div id="eyeContainer" onClick={handleShow}>
                  {show ? (
                    <AiFillEye
                      style={{
                        fontSize: "1.8rem",
                        color: "rgba(0, 0, 0, 0.623)",
                      }}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      style={{
                        fontSize: "1.8rem",
                        color: "rgba(0, 0, 0, 0.623)",
                      }}
                    />
                  )}
                </div>
              </div>
              <Link
                to="/password/forgot"
                style={{ fontFamily: "Roboto", fontWeight: 600 }}
              >
                Forget Password ?
              </Link>
              <input type="submit" value="Login" className="loginBtn" />
            </form>
            <form
              className="signUpForm"
              ref={registerTab}
              encType="multipart/form-data"
              onSubmit={registerSubmit}
            >
              <div className="signUpName">
                <FaceIcon />
                <input
                  type="text"
                  placeholder="Name"
                  required
                  name="name"
                  value={name}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpEmail">
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={email}
                  onChange={registerDataChange}
                />
              </div>
              <div className="signUpPassword">
                <LockOpenIcon />
                <input
                  type={show ? "text" : "password"}
                  placeholder="Password"
                  required
                  name="password"
                  value={password}
                  onChange={registerDataChange}
                />
                <div id="eyeContainer" onClick={handleShow}>
                  {show ? (
                    <AiFillEye
                      style={{
                        fontSize: "1.8rem",
                        color: "rgba(0, 0, 0, 0.623)",
                      }}
                    />
                  ) : (
                    <AiFillEyeInvisible
                      style={{
                        fontSize: "1.8rem",
                        color: "rgba(0, 0, 0, 0.623)",
                      }}
                    />
                  )}
                </div>
              </div>
              <div className="country">
                <LocationOnIcon />
                <select
                  name="country"
                  className="form-control"
                  onChange={registerDataChange}
                >
                  <option value="">Select Country</option>
                  {locationData.map((getcountry, index) => (
                    <option value={getcountry.country_name} key={index}>
                      {getcountry.country_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="state">
                <LocationOnIcon />
                <select
                  name="state"
                  className="form-control"
                  onChange={registerDataChange}
                >
                  <option value="">Select State</option>
                  {state.map((getstate, index) => (
                    <option value={getstate.state_name} key={index}>
                      {getstate.state_name}
                    </option>
                  ))}
                </select>
              </div>

              <div id="registerImage">
                <img src={avatarPreview} alt="Avatar Preview" />
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={registerDataChange}
                />
              </div>
              <input type="submit" value="Register" className="signUpBtn" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignUp;
