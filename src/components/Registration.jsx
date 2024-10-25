import React, { useState } from "react";
import Writing from "../assets/write.jpg";
import { useNavigate } from "react-router-dom";

function Registration() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Simulate API call to register user
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surname, email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        // Store user data in local storage
        localStorage.setItem("userData", JSON.stringify(userData));
        navigate("/login");
      } else {
        setError("Error registering user");
      }
    } catch (error) {
      setError("Error registering user");
    }
  };

  return (
    <div className="relative w-full h-screen bg-zinc-800/90">
      <img
        className="absolute w-full h-full object-cover mix-blend-overlay -z-50 "
        src={Writing}
        alt=""
      />

      {/* Form */}
      <div className="flex justify-center items-center h-full">
        <form
          className="max-w-[400px] w-full mx-auto bg-white p-8 rounded-lg"
          onSubmit={handleRegister}
        >
          <h2 className="text-3xl font-bold text-center py-8">Registration</h2>
          <div className="flex flex-col py-2">
            <label> Name</label>
            <input
              type="text"
              className="border p-2 rounded-lg"
              value={name}
              required
              minLength="3"
              maxLength="8"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Surname</label>
            <input
              className="border p-2 rounded-lg"
              type="text"
              value={surname}
              required
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="border p-2 rounded-lg"
              type="text"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="border p-2 rounded-lg"
              type="password"
              value={password}
              required
              minLength="6"
              maxLength="12"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full py-3 mt-8 bg-[#001845] hover:bg-[#0353a4] relative text-white rounded-lg"
            type="submit"
          >
            Register
          </button>
          <div>
            <p>
              Already have an account?{" "}
              <a className="text-[#0353a4]" href="/">
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Registration;
