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
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./hooks/useAuth";
import LogOutButton from "./components/LogOutButton";

function App() {
  return (
    <main className="h-screen overflow-hidden w-full flex flex-col justify-center items-center dark dark:bg-gray-800 bg-gray-400">
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
      <ToastContainer />
    </main>
  );
}

export default App;
