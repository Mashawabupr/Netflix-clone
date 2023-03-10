import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function LogIn() {
  let { logIn } = UserAuth();
  let passwordREF = useRef();
  let emailREF = useRef();
  let history = useHistory();
  let [isError, setError] = useState(null);
  let handleForm = async (e) => {
    e.preventDefault();
    setError("");
    let email = emailREF.current.value;
    let password = passwordREF.current.value;
    try {
      await logIn(email, password);
      email = "";
      password = "";
      history.replace("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        alt="netflix-background"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/1ecf18b2-adad-4684-bd9a-acab7f2a875f/cc64d770-7293-4227-a688-12dc56973c86/GE-en-20230116-popsignuptwoweeks-perspective_alpha_website_large.jpg"
      />
      <div className="bg-black/60 h-screen w-full fixed top-0 left-0"></div>
      <div className="fixed px-4 py-24 z-50 w-full">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign in</h1>
            {isError ? (
              <p className="mt-2 text-red-600 text-xl">{isError}</p>
            ) : null}
            <form onSubmit={handleForm}>
              <input
                type="email"
                placeholder="Email or phone number"
                ref={emailREF}
                className=" my-[30px] w-full h-[50px] rounded-md bg-slate-100 p-2 text-black"
              ></input>
              <input
                type="password"
                ref={passwordREF}
                placeholder="Password"
                className=" mb-[30px] w-full h-[50px] rounded-md bg-slate-100 p-2 text-black"
              ></input>
              <button className="text-xl w-full bg-[#e50914] my-[10px] rounded-md p-[10px]">
                Sign in
              </button>

              <div className="text-gray-400 flex justify-start items-center mt-6">
                <p>New to Netflix?</p>
                <Link to="/sign" className="text-white ml-1">
                  Sign up now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
