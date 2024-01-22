import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { AuthContext } from "../context/authContext";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";

export default function Login() {
  const history = useHistory();
  const { setAccountId, setToken } = useContext(AuthContext);
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
    rememberMe: false, // Added rememberMe state
  });
  const [errors, setErrors] = useState({
    mail: "",
    password: "",
    username: "",
  });
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
  ]);
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });

    if (name === "email") {
      const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      const isValidMail = mailRegex.test(value);

      setErrors({
        ...errors,
        mail: isValidMail ? "" : "Invalid email address",
      });
    } else if (name === "password") {
      const passwordRegex = !/^.{8,16}$/;
      const isValidPassword = passwordRegex.test(value);
      setErrors({
        ...errors,
        password: isValidPassword
          ? ""
          : "Password is not in the correct format",
      });
    }
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let accountId = null;

      var raw = JSON.stringify({
        username: loginFormData.username,
        password: loginFormData.password,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      const response = await fetch(
        "http://localhost:8080/auth/token",
        requestOptions
      );
      if (!response.ok) {
        toast.error("Invalid username or password");
        throw Error(response.status);
      } else {
        accountId = await response.text();
        // setData(accountId);
        localStorage.setItem("token", accountId);
        if (loginFormData.rememberMe) {
          setCookie("username", loginFormData.username, { path: "/" });
          setCookie("password", loginFormData.password, { path: "/" });
        }
        localStorage.setItem("id", accountId);

        const tokenData = localStorage.getItem("token");

        const tokenObject = JSON.parse(tokenData);

        const token = tokenObject.token;

        const idData = localStorage.getItem("id");

        const idObject = JSON.parse(idData);

        const id = idObject.id;

        if (token && id) {
          console.log("Token:", token);
          console.log("ID:", id);
          localStorage.setItem("id", id);
          localStorage.setItem("token", token);
          setAccountId(id);
          setToken(token);
        } else {
          console.log("Token hoặc ID không tồn tại trong local storage.");
        }

        history.push("/");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };
  return (
    <>
      <section className="sign-in-section pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">
        <div className="container pt-120">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="form-area">
                <h1 className="tcn-1 text-center cursor-scale growUp mb-10">
                  SIGN IN
                </h1>
                <form onSubmit={handleLoginSubmit} className="sign-in-form">
                  <div className="single-input mb-6">
                    <input
                      type="username"
                      placeholder="Enter your username"
                      name="username"
                      id="username"
                    />
                  </div>
                  <div className="single-input mb-6">
                    <input
                      type="password"
                      placeholder="Enter your password"
                      id="password"
                      name="password"
                    />
                  </div>
                  <div className="text-center">
                    <button
                      className="bttn py-3 px-6 rounded bgp-1"
                      type="submit"
                      value="submit"
                    >
                      Sign In
                    </button>
                  </div>
                </form>
                <p className="tcn-4 text-center mt-lg-10 mt-6">
                  Don't have an account?{" "}
                  <Link
                    to="register"
                    className="text-decoration-underline tcp-1"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
