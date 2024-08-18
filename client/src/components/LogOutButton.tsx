import { useAuth } from "../hooks/useAuth";
import { Power } from "lucide-react";

const LogOutButton = () => {
  const { user, logout } = useAuth();

  const handleLogOut = () => {
    localStorage.removeItem("auth-token");
    logout();
  };

  if (!user) return null;

  return (
    <button
      onClick={handleLogOut}
      className="rounded-full border hover:bg-red-400 transition-all hover:border-red-400 text-center flex justify-center items-center lg:p-3 p-2 absolute top-2 right-[4rem] lg:right-[4.3rem]"
    >
      <div className="relative dark:text-white text-slate-800 flex justify-center items-center">
        <Power className={"h-[1.1rem] transition-all w-[1.1rem]"} />
      </div>
    </button>
  );
};

export default LogOutButton;
