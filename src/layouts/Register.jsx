import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import { AuthContext } from "../context/authContext";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const history = useHistory();
  const { setAccountId, setToken } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [signupFormData, setSignupFormData] = useState({
    username: "",
    mail: "",
    password: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
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

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({
      ...signupFormData,
      [name]: value,
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        name === "mail"
          ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
            ? ""
            : "Invalid email address"
          : name === "password"
          ? /^.{8,16}$/.test(value)
            ? ""
            : "Password must be between 8 and 16 characters"
          : name === "username"
          ? /^[a-zA-Z0-9]{8,16}$/.test(value)
            ? ""
            : "Username must be between 8 and 16 characters"
          : prevErrors[name],
    }));
  };

  const validateForm = () => {
    const { mail, password, username } = signupFormData;
    const validationErrors = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
      validationErrors.mail = "Invalid email address";
    }

    if (!/^.{8,16}$/.test(password)) {
      validationErrors.password =
        "Password must be between 8 and 16 characters";
    }

    if (!/^[a-zA-Z0-9]{8,16}$/.test(username)) {
      validationErrors.username =
        "Username must be between 8 and 16 characters";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      toast.error("Please fix the form errors!!!");
      return;
    }

    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });

    if (response.status === 200) {
      setSuccessMessage("User registered successfully!");
      toast.success("User registered successfully!");
      setSignupFormData({ username: "", mail: "", password: "" });
      history.push("/login");
    } else {
      const errorMessage = await response.text();
      setError(errorMessage || "Registration failed. Please check your input.");
      toast.error(
        errorMessage || "Registration failed. Please check your input."
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <section className="sign-in-section pb-120 pt-120 mt-sm-15 mt-10">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="form-area">
                <h1 className="tcn-1 text-center cursor-scale growUp mb-10">
                  SIGN UP
                </h1>
                {error && <div className="error-message">{error}</div>}
                {successMessage && (
                  <div className="success-message">{successMessage}</div>
                )}
                <form onSubmit={handleSignupSubmit} className="sign-in-form">
                  <div className="single-input mb-3">
                    <input
                      type="text"
                      placeholder="Enter your Username"
                      onChange={handleSignupChange}
                      name="username"
                      id="username"
                    />
                    {errors.username && (
                      <div className="error-message text-danger">
                        {errors.username}
                      </div>
                    )}
                  </div>
                  <div className="single-input mb-3">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      onChange={handleSignupChange}
                      name="mail"
                      id="mail"
                    />
                    {errors.mail && (
                      <div className="error-message text-danger">
                        {errors.mail}
                      </div>
                    )}
                  </div>
                  <div className="single-input mb-3">
                    <div className="password-input">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        onChange={handleSignupChange}
                        name="password"
                        id="password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="toggle-password-btn"
                      >
                        {showPassword ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="error-message text-danger">
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <button
                      className="bttn py-3 px-6 rounded bgp-1"
                      type="submit"
                      value="submit"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
                <p className="tcn-4 text-center mt-lg-10 mt-6">
                  Already have an account?{" "}
                  <Link to="login" className="text-decoration-underline tcp-1">
                    Sign In
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
