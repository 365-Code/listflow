import { useSelector } from "react-redux";
import TaskInput from "./TaskInput";
import Tasks from "./Tasks";
import { RootState } from "../redux/store";

const TodoItems = () => {
  const currTodos = useSelector((state: RootState) => state.todos);

  return (
    <div
      className="
      backdrop-blur-md flex-1 flex flex-col relative 
    dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 dark:text-slate-300 
    bg-gradient-to-br from-slate-500 to-slate-600 text-slate-950
    "
    >
      <h1 className="lg:text-4xl text-3xl px-6 py-4 font-medium mb-4 absolute bg-inherit backdrop-blur-sm w-full capitalize">
        {currTodos.label}
      </h1>
      <div className="overflow-y-scroll flex-1 no-scrollbar scroll-smooth lg:px-6 px-4 ">
        <h1 className="lg:text-4xl px-6 py-4 invisible text-3xl mb-4">
          {"Today"}
        </h1>
        <Tasks type="pending" tasks={currTodos.tasks} />
        <Tasks type="completed" tasks={currTodos.tasks} />
        <div className="h-[50px]" />
      </div>
      <TaskInput />
    </div>
  );
};

export default TodoItems;
