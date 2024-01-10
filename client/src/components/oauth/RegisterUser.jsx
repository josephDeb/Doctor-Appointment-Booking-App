import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.username || !values.email || !values.password) {
      alert("Please Fill out all fields");
      setError(false);
    }

    setError(true);
    setWarning(true);
    const res = await fetch("api/users/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    try {
      setError(false);
      setWarning(false);
      const data = await res.json();
      if (data.Status) {
        Swal.fire({
          title: "Successfully created!",
          text: "Login now!",
          icon: "success",
        });
      }
      navigate("/");
    } catch (error) {
      setError(false);
      alert("Something went wrong");
    }
  };

  return (
    <div className="relative flex flex-col justify-center max-w-screen-xl mx-auto min-h-screen overflow-hidden">
      <div className="w-[88%] p-6 m-auto bg-white/50 rounded-md shadow-xl lg:max-w-sm">
        <h1 className="text-3xl font-semibold text-center text-red-700 uppercase">
          Sign up
        </h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="mb-2">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              onChange={(e) =>
                setValues({ ...values, username: e.target.value })
              }
              type="text"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-red-700 focus:ring-red-800 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="username"
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
              autoComplete=""
              type="password"
              className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-red-700 focus:ring-red-800 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a className="text-[15px] text-red-700 hover:underline">
            Forget Password?
          </a>
          <p className="text-red-600 text-lg"></p>
          <div className="mt-2">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-700 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-500"
            >
              {error ? (
                <div className="lds-hourglass font-semibold">Loading</div>
              ) : (
                <p>Submit</p>
              )}
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a
            onClick={() => navigate("/")}
            className="font-medium text-red-700 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterUser;
