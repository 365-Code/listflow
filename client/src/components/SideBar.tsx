import {
  Calendar,
  Home,
  SidebarCloseIcon,
  SidebarOpen,
  Star,
  Sun,
} from "lucide-react";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import { changeLabelRedux, setToDosRedux } from "../redux/todoReducer";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { getAllTodos } from "../lib/todos";
import SearchBar from "./SearchBar";

const mainList = [
  {
    title: "Today",
    icon: <Sun className="w-[1.2rem] h-[1.2rem]" color="#eab308" />,
  },
  {
    title: "Important",
    icon: <Star className="w-[1.2rem] h-[1.2rem]" color="#e11d48" />,
  },
  {
    title: "Planned",
    icon: (
      <Calendar className="w-[1.2rem] h-[1.2rem] bggreen" color="#22c55e" />
    ),
  },
  {
    title: "Tasks",
    icon: <Home className="w-[1.2rem] h-[1.2rem] bgbl" color="#3b82f6" />,
  },
];

const SideBar = () => {
  const currLabel = useSelector((state: RootState) => state.todos.label);
  const dispatch = useDispatch();

  const handleLabel = (label: string) => {
    dispatch(changeLabelRedux(label));
    if (window.innerWidth < 640) {
      setShowSide(false);
    }
  };

  const fetchTask = async () => {
    try {
      const result = await getAllTodos(currLabel);
      if (result.success) {
        dispatch(
          setToDosRedux({
            todos: result.todos,
            todoLabel: currLabel,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearTodos = () => {
    dispatch(
      setToDosRedux({
        todos: [],
        todoLabel: currLabel,
      })
    );
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchTask();
    }, 100);
    clearTodos();
    return () => clearTimeout(debounce);
  }, [currLabel]);

  const [showSide, setShowSide] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowSide(true)}
        className="rounded-full border text-center flex justify-center items-center p-4 absolute sm:hidden top-2 right-[9rem] z-10"
      >
        <div className="relative dark:text-white text-black flex justify-center items-center">
          <SidebarOpen className={"h-[1.1rem] transition-all w-[1.1rem]"} />
        </div>
      </button>
      <div
        id="sidebar"
        className={`
          absolute top-0 left-0 z-10 bg-slate-900 w-[90%] h-full
          sm:z-auto sm:top-auto sm:left-auto sm:relative 
          dark:bg-gradient-to-br dark:from-slate-800/70 dark:to-slate-950/80 dark:text-slate-300 
          bg-gradient-to-br from-slate-600/80 to-slate-600 text-slate-950 
          sm:w-[250px] sm:translate-x-0 
          lg:w-[250px] 
          px-2 py-4 transition-all 
          ${showSide ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="block mb-2 sm:hidden"
          onClick={() => setShowSide(false)}
        >
          <SidebarCloseIcon className="w-[2rem] h-[2rem]" />
        </button>
        <SearchBar />
        <div className="main-list">
          {mainList.map((li, i) => (
            <ListItem
              key={i}
              item={li}
              handleClick={() => handleLabel(li.title)}
            />
          ))}
        </div>
        <hr className="my-4 max-w-[90%] mx-auto" />
        <div className="custom-list"></div>
      </div>
    </>
  );
};

export default SideBar;
