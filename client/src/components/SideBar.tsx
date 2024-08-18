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
import {
  changeLabelRedux,
  setCustomLabelsRedux,
  setToDosRedux,
} from "../redux/todoReducer";
import { useEffect, useState } from "react";
import { RootState } from "../redux/store";
import { fetchUserLabels, getAllTodos } from "../lib/todos";
import SearchBar from "./SearchBar";
import AddLabel from "./AddLabel";

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

  const customUserLabels = useSelector(
    (state: RootState) => state.todos.customLabels
  );

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

  const fetchLabels = async () => {
    try {
      const result = await fetchUserLabels();
      if (result.success) {
        dispatch(setCustomLabelsRedux(result.labels));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLabels();
  }, []);

  const [showSide, setShowSide] = useState(false);

  const customList = [
    {
      title: "DSA",
    },
    {
      title: "Work",
    },
    {
      title: "Home",
    },
    {
      title: "Favourite",
    },
    {
      title: "Imp",
    },
    {
      title: "College",
    },
    {
      title: "Office",
    },
    {
      title: "Tasks",
    },
    {
      title: "School",
    },
  ];

  return (
    <>
      <button
        onClick={() => setShowSide(true)}
        className="rounded-full border text-center flex justify-center items-center lg:p-3 p-2 absolute sm:hidden top-2 right-[7rem] lg:right-[9rem] z-10"
      >
        <div className="relative dark:text-white text-black flex justify-center items-center">
          <SidebarOpen className={"h-[1.1rem] transition-all w-[1.1rem]"} />
        </div>
      </button>
      <div
        id="sidebar"
        className={`
          ${showSide ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="block mb-2 sm:hidden"
          onClick={() => setShowSide(false)}
        >
          <SidebarCloseIcon className="w-[2rem] h-[2rem]" />
        </button>
        <SearchBar />
        <div className="flex-1 flex flex-col overflow-y-hidden">
          <div className="main-list">
            {mainList.map((li, i) => (
              <ListItem
                key={i}
                item={li}
                handleClick={() => handleLabel(li.title)}
              />
            ))}
          </div>
          <hr className="my-4 max-w-[90%] mx-auto w-full" />
          <div className="custom-list flex-1 overflow-y-scroll no-scrollbar">
            {customUserLabels.length > 0 &&
              customUserLabels.map((li, i) => (
                <ListItem
                  key={i}
                  type="custom"
                  item={{ title: li }}
                  handleClick={() => handleLabel(li)}
                />
              ))}
          </div>
          {customList.length < 0 && (
            <hr className="my-4 max-w-[90%] mx-auto w-full" />
          )}
          <AddLabel />
        </div>
      </div>
    </>
  );
};

export default SideBar;
