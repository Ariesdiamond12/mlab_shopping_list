import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Writing from "../assets/write.jpg";
import PrivacyModal from "./PrivacyModal";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call to authenticate user
      // The username and password will be sent to the POST request
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        // If the server responds successfully the user data will be returned from the server and is going to be stored in the
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/shopping-list");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error authenticating user");
    }
  };

  return (
    <div className="relative w-full h-screen bg-zinc-800/90">
      <img
        className="absolute w-full h-full object-cover -z-50"
        src={Writing}
        alt=""
      />

      {/* Form */}
      <div className="flex justify-center items-center h-full">
        <form className="max-w-[400px] w-full mx-auto bg-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-center py-8">Login</h2>
          <div className="flex flex-col py-2">
            <label> Username</label>
            <input
              type="text"
              className="border p-2 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border p-2 rounded-lg"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <p>
              Don't have an account?{" "}
              <a className="text-[#0353a4]" href="./Registration">
                Sign up
              </a>
            </p>
          </div>
          <button
            className="w-full py-3 mt-8 mb-5 bg-[#001845] hover:bg-[#0353a4] relative text-white rounded-lg"
            onClick={handleSignIn}
          >
            Log In
          </button>
          <PrivacyModal/>
        </form>
      </div>
    </div>
  );
}

export default Login;
