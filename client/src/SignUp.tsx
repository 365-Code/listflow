import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./hooks/useAuth";
import { useLocalStorage } from "./hooks/useLocalStorage";

const SignUp = () => {
  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });
  const { login } = useAuth();
  const nav = useNavigate();

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: auth.username,
            password: auth.password,
          }),
        }
      );

      if (response.ok) {
        const res = await response.json();
        toast.success("Logged in successfully");
        login(res.token);
        useLocalStorage("auth-token", res.token);
        nav("/");
        setAuth({
          username: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuth({
      ...auth,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col gap-y-4 backdrop-blur-md bg-gradient-to-br from-slate-400 to-slate-500 dark:from-slate-900 py-8 dark:to-slate-950 p-4 rounded-lg w-[400px] max-w-full dark:text-slate-300">
      <h2 className="text-3xl text-center dark:text-slate-300">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="border-b focus-within:border-blue-500 transition-all overflow-hidden max-w-full mb-2 w-full">
          <input
            value={auth.username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 outline-none border-none dark:text-slate-300 text-slate-900 bg-transparent"
          />
        </div>
        <div className="border-b focus-within:border-blue-500 transition-all overflow-hidden max-w-full mb-2 w-full">
          <input
            value={auth.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 outline-none border-none dark:text-slate-300 text-slate-900 bg-transparent"
          />
        </div>

        <Link
          to={"/login"}
          className="text-sm underline hover:text-purple-400 transition-all"
        >
          Already Registered?
        </Link>
        <div className="w-[80%] mx-auto mt-4">
          <button
            type="submit"
            className="font-medium rounded-lg p-2 bg-blue-500 hover:bg-blue-600 w-full mx-auto"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
