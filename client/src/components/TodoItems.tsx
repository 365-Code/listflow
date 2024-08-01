import { useSelector } from "react-redux";
import TaskInput from "./TaskInput";
import Tasks from "./Tasks";
import { RootState } from "../redux/store";

const TodoItems = () => {
  const currTodos = useSelector((state: RootState) => state.todos);

  // const tasks = [
  //   {
  //     id: "251c944c1d274cadb6d267d913d88655",
  //     content: "Go to Grocerry, buy eggs",
  //     status: "complete",
  //     label: "today",
  //   },
  //   {
  //     id: "251c944c1d274cadb6d267d913d88655",
  //     content: "Do a dsa problem a day",
  //     status: "incomplete",
  //     label: "important",
  //   },
  //   {
  //     id: "251c944c1d274cadb6d267d913d88655",
  //     content: "Sign up for a fest event ",
  //     status: "incomplete",
  //     label: "today",
  //   },
  //   {
  //     id: "251c944c1d274cadb6d267d913d88655",
  //     content:
  //       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum placeat unde ratione minima ex voluptas provident molestiae saepe optio sint eveniet asperiores doloribus aperiam velit eligendi, aliquid dolorem labore ad?",
  //     status: "incomplete",
  //     label: "today",
  //   },
  // ];

  return (
    <div className="dark:bg-gradient-to-br from-slate-800 to-slate-900 backdrop-blur-md flex-1 flex flex-col relative dark:text-slate-300">
      <h1 className="lg:text-4xl text-3xl px-6 py-4  mb-4 absolute bg-black/30 backdrop-blur-sm w-full capitalize">
        {currTodos.label}
      </h1>
      <div className="overflow-y-scroll flex-1 no-scrollbar scroll-smooth lg:px-6 px-4 ">
        <h1 className="lg:text-4xl px-6 py-4 invisible text-3xl mb-4">
          {"Today"}
        </h1>
        <Tasks
          type="pending"
          tasks={currTodos.tasks.filter((task) => task.status == "pending")}
        />
        <Tasks
          type="completed"
          tasks={currTodos.tasks.filter((task) => task.status == "completed")}
        />
        <div className="h-[50px]" />
      </div>
      <TaskInput />
    </div>
  );
};

export default TodoItems;
