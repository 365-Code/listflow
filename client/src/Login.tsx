import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api_url } from "./lib/todos";
import { toast } from "react-toastify";
import { useAuth } from "./hooks/useAuth";

const Login = () => {
  const { login } = useAuth();

  const nav = useNavigate();

  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !auth.username ||
      !auth.password ||
      auth.username.length < 3 ||
      auth.password.length < 6
    ) {
      toast.error("Enter a valid username or password");
    }
    try {
      const response = await fetch(`${api_url}/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auth),
      });
      const res = await response.json();
      if (res.success) {
        toast.success("Logged in successfully");
        login(res.token);
        localStorage.setItem("auth-token", res.token);
        nav("/");
      } else {
        toast.error(res.msg);
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
    <div className="flex flex-col gap-y-4 bg-gradient-to-br from-slate-400 to-slate-500 dark:from-slate-800 dark:to-slate-950">
      <h2 className="text-3xl text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="border rounded-lg overflow-hidden max-w-full w-[320px] mb-2">
          <input
            value={auth.username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-2 outline-none border-none"
          />
        </div>
        <div className="border rounded-lg overflow-hidden max-w-full w-[320px] mb-2">
          <input
            value={auth.password}
            onChange={handleChange}
            type="text"
            name="password"
            placeholder="Password"
            className="w-full p-2 outline-none border-none"
          />
        </div>

        <Link to={"/sign-up"} className="text-sm">
          Not Registered?
        </Link>
        <div>
          <button type="submit" className="rounded-lg p-2">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
