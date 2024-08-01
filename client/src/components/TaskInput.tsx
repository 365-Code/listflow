import { PlusCircle } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addToDoRedux } from "../redux/todoReducer";
import { api_url, authToken } from "../lib/todos";

const TaskInput = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const currLabel = useSelector((state: RootState) => state.todos.label);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;

    try {
      const response = await fetch(`${api_url}/api/v1/user/todo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authToken,
        },
        body: JSON.stringify({
          label: currLabel,
          content,
        }),
      });

      if (response.ok) {
        const res = await response.json();
        dispatch(addToDoRedux(res.todo));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setContent("");
    }
  };

  return (
    <div className="absolute bottom-2 w-full">
      <form
        onSubmit={handleSubmit}
        className="max-w-[85%] px-4 rounded-lg overflow-hidden mx-auto flex items-center 
        bg-gradient-to-r dark:from-slate-900/90 dark:to-slate-950/90
        from-slate-400 to-slate-500
        backdrop-blur-sm"
      >
        <PlusCircle color="#7c3aed" />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add New Task Here"
          type="text"
          className="flex-1 p-4 dark:placeholder:text-slate-300 placeholder:text-slate-950 bg-transparent text-primary dark:text-primary-dark outline-none border-none"
        />
        <button type="submit" className="hidden" />
      </form>
    </div>
  );
};

export default TaskInput;
