import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { searchToDos } from "../lib/todos";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { changeLabelRedux, setToDosRedux } from "../redux/todoReducer";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const handleQuery = async () => {
    if (!query || query === undefined) {
      dispatch(changeLabelRedux("today"));
      return;
    }
    try {
      const res = await searchToDos(query);
      if (res.success) {
        dispatch(
          setToDosRedux({
            todoLabel: "Search",
            todos: res.results,
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleQuery();
    }, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <div className="overflow-hidden font-normal rounded-lg shadow-sm focus-within:border-blue-500 border transition-all shadow-white/50 flex items-center px-2">
      <Search className="h-[1.2rem] w-[1.2rem] " />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search ..."
        className="w-full p-2 dark:text-slate-300 bg-transparent text-slate-900 outline-none border-none"
      />
    </div>
  );
};

export default SearchBar;
