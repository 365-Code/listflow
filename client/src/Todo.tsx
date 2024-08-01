import SideBar from "./components/SideBar";
import TodoItems from "./components/TodoItems";

const Todo = () => {
  return (
    <div className="flex overflow-hidden mx-auto lg:max-w-[1000px] lg:h-[600px] h-full max-w-full w-full rounded-lg">
      <SideBar />
      <TodoItems />
    </div>
  );
};

export default Todo;
