import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogo from "../../Assets/Image/google.svg";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";
import toast from "react-hot-toast";

const googleProvider = new GoogleAuthProvider();

const Signup = () => {
  const navigate = useNavigate();

  // for some extra error showing in the signUp page when value insert the input field:
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  // console.log(email);
  console.log(password);

  const handleBlurEmail = (event) => {
    if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(event.target.value)) {
      setEmail({ value: event.target.value, error: "" });
    } else {
      setEmail({ value: "", error: "Invalid Email" });
    }
  };
  const handleBlurPassword = (event) => {
    if (event.target.value.length < 7) {
      setPassword({ value: "", error: "Password too short" });
    } else {
      setPassword({ value: event.target.value, error: "" });
    }
  };
  const handleBlurConfirmPassword = (event) => {
    if (event.target.value === password.value) {
      setConfirmPassword({ value: event.target.value, error: "" });
    } else {
      setConfirmPassword({ value: "", error: "Password is not matched" });
    }
  };

  const handleSignUpWithGoogleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const handleFormSubmitWithEmailAndPass = (event) => {
    event.preventDefault();
    // const email = event.target.email.value;
    // const password = event.target.password.value;
    if (email.value === "") {
      setEmail({ value: "", error: "Email is Required" });
    }

    if (password.value === "") {
      setPassword({ value: "", error: "Password is Required" });
    }

    if (
      email.value &&
      password.value &&
      password.value === confirmPassword.value
    ) {
      createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((result) => {
          const user = result.user;
          navigate("/login");
          //  showing toast message:
          toast.success("User created successfully", {
            id: "success",
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error : ", error);
          if (errorMessage.includes("email-already-in-use")) {
            toast.error("Already Exist", { id: "error1" });
          } else {
            toast.error(errorMessage, { id: "error2" });
          }
        });
    }
  };
  return (
    <div className="auth-form-container ">
      <div className="auth-form">
        <h1>Sign Up</h1>
        <form onSubmit={handleFormSubmitWithEmailAndPass}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                onBlur={handleBlurEmail}
                type="email"
                name="email"
                id="email"
              />
            </div>

            {email?.error && <p className="error">{email?.error}</p>}
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                onBlur={handleBlurPassword}
                type="password"
                name="password"
                id="password"
              />
            </div>
            {password?.error && <p className="error">{password?.error}</p>}
          </div>
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <div className="input-wrapper">
              <input
                onBlur={handleBlurConfirmPassword}
                type="password"
                name="confirmPassword"
                id="confirm-password"
              />
            </div>
            {confirmPassword?.error && (
              <p className="error">{confirmPassword?.error}</p>
            )}
          </div>
          <button type="submit" className="auth-form-submit">
            Sign Up
          </button>
        </form>
        <p className="redirect">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
        <div className="horizontal-divider">
          <div className="line-left" />
          <p>or</p>
          <div className="line-right" />
        </div>
        <div className="input-wrapper">
          <button className="google-auth" onClick={handleSignUpWithGoogleAuth}>
            <img src={GoogleLogo} alt="" />
            <p> Continue with Google </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
