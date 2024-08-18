import { Provider } from "react-redux";
import ThemeToggle from "./components/ThemeToggle";
import "./global.css";
import Todo from "./Todo";
import { store } from "./redux/store";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import PrivateRoute from "./PrivateRoute";
import "react-toastify/dist/ReactToastify.css";
import { Bounce, ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/useAuth";
import LogOutButton from "./components/LogOutButton";

function App() {
  return (
    <main
      className="h-screen overflow-hidden w-full flex flex-col justify-center items-center
      bg-gradient-to-br dark:from-slate-700 dark:to-slate-800
      from-slate-400 to-slate-500
      "
    >
      <Provider store={store}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Todo />} />
            </Route>
          </Routes>
          <LogOutButton />
          <ThemeToggle />
        </AuthProvider>
      </Provider>

      <ToastContainer
        toastClassName={"bg-black"}
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </main>
  );
}

export default App;
