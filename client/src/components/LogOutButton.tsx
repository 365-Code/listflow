import { useAuth } from "../hooks/useAuth";
import { LogOut } from "lucide-react";

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
      className="rounded-full border text-center flex justify-center items-center p-4 absolute top-2 right-[5rem]"
    >
      <div className="relative dark:text-white text-black flex justify-center items-center">
        <LogOut className={"h-[1.1rem] transition-all w-[1.1rem]"} />
      </div>
    </button>
  );
};

export default LogOutButton;
