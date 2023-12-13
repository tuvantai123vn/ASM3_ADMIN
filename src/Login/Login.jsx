import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./Login.css";
import UserAPI from "../API/UserAPI";
import { createBrowserHistory } from "history";
import { useCookies } from "react-cookie";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = createBrowserHistory();
  const [load, setLoad] = useState(false);
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const user = {
        email,
        password,
      };
      const responseData = await UserAPI.postSignUpAdmin(user);
      if (responseData) {
        console.log("responseData", responseData);
        setCookie('accessToken',responseData.data);
        console.log(cookies);
        history.push("/home");
        window.location.reload() 
        setLoad(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <div className="login">
            <div className="heading">
              <h2>Sign in</h2>
              <form>
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={onChangeEmail}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={onChangePassword}
                  />
                </div>

                <button type="button" className="float" onClick={onSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {load && <Redirect to='/home'/>}
    </div>
  );
}

export default Login;
