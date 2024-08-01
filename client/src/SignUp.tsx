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
    <div
      className="flex flex-col gap-y-4 bg-gradient-to-br dark:from-slate-800 to-slate-950 rounded-lg p-4
    "
    >
      <h2 className="text-3xl text-center">Sign Up</h2>
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

        <Link to={"/login"} className="text-sm">
          Already Registered?
        </Link>
        <div>
          <button type="submit" className="rounded-lg p-2">
            sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
