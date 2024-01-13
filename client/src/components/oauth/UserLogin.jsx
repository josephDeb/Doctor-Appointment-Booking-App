import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      alert("PLease fill up all fields");
    }

    dispatch(signInStart());
    axios.defaults.withCredentials = true;
    const res = await fetch("/api/users/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    try {
      const data = await res.json();
      if (data.Status) {
        dispatch(signInSuccess(data));
        navigate("/admin-dashboard");
        console.log(data);
      } else {
        alert(`${data.Error}`);
        setStatus(`${data.Error}`);
        console.log(data);
        dispatch(signInFailure());
      }
    } catch (err) {
      console.log(err);
      dispatch(signInFailure());
    }
  };

  return (
    <div className="relative flex flex-col justify-center max-w-screen-xl mx-auto min-h-screen overflow-hidden manjari">
      <div className="w-[88%] p-6 m-auto bg-white/80 rounded-md shadow-xl lg:max-w-sm">
        <h1 className="text-3xl font-semibold text-center text-red-700 uppercase">
          Sign in
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-red-700 focus:ring-red-800 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              minLength={6}
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-red-700 focus:ring-red-800 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a className="text-[15px] text-red-700 hover:underline">
            Forget Password?
          </a>

          <p className="text-red-600 text-lg">{status}</p>

          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-500"
            >
              <p>Submit</p>
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Dont have an account?{" "}
          <a
            onClick={() => navigate("/sign-up")}
            className="font-medium text-red-700 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
