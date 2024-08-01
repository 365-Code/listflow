import { ChevronDown } from "lucide-react";
import { TodoType } from "../lib/models";
import { useState } from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface TasksProps {
  tasks: TodoType[];
  type: "completed" | "pending";
}

const Tasks = ({ tasks, type }: TasksProps) => {
  const [toggle, setToggle] = useState(true);
  const currTodos = useSelector((state: RootState) => state.todos.tasks);

  return (
    <div className="mb-2">
      {currTodos.length == 0 && type == "pending" && <h1>No Task Yet</h1>}
      {currTodos.length > 0 && type == "completed" && (
        <div className="w-full flex items-center gap-x-2 mb-2">
          <button
            onClick={() => setToggle(!toggle)}
            className="flex items-center"
          >
            <ChevronDown
              className={`transition-all h-[1.2rem] w-[1.2rem] ${
                toggle ? "rotate-0" : "-rotate-90"
              }`}
            />
            <span className="font-medium capitalize">{type}</span>
          </button>
          <div className="h-1 w-full bg-slate-300" />
        </div>
      )}
      <div
        className={` ${
          toggle ? "h-full" : "h-0 overflow-hidden"
        } transition-all `}
      >
        {tasks?.map(
          (task, i) => task.status == type && <TodoItem key={i} item={task} />
        )}
      </div>
    </div>
  );
};

export default Tasks;
