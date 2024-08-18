import { ChangeEvent, useEffect, useState } from "react";
import { TodoType } from "../lib/models";
import notify from "../assets/notify.wav";
import { Edit2, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  changeToDoStatusRedux,
  updateToDoRedux,
  deleteToDoRedux,
} from "../redux/todoReducer";
import { deleteToDo, updateTodo } from "../lib/todos";

const TodoItem = ({ item }: { item: TodoType }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [complete, setComplete] = useState(
    item.status == "completed" ? true : false
  );

  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState(item.content);

  const [del, setDel] = useState(false);
  const [edited, setEdited] = useState(false);

  const handleComplete = async () => {
    try {
      await updateTodo(item._id, {
        status: complete ? "completed" : "pending",
      });
      dispatch(
        changeToDoStatusRedux({
          ...item,
          status: complete ? "completed" : "pending",
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      handleComplete();
    }, 300);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete]);

  const handleEdit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;
    setEdited(true);
    try {
      await updateTodo(item._id, {
        content: content,
      });
      dispatch(updateToDoRedux({ ...item, content }));
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
      setEdited(false);
    }
  };

  const handleDelete = async () => {
    setDel(true);
    try {
      await deleteToDo(item._id);
      dispatch(deleteToDoRedux({ todoId: item._id }));
    } catch (error) {
      console.log(error);
    } finally {
      setDel(false);
    }
  };

  return (
    <div
      className={`relative w-full group/todoItem mb-2 p-3 rounded-sm flex items-center gap-x-2 ${
        item.status == "completed" ? "bg-transparent" : "bg-gray-600"
      }`}
    >
      <div
        style={{
          width: `${del || edited ? "100%" : "0"}`,
        }}
        className={`w-full h-full absolute ${
          del ? "bg-red-500" : edited ? "bg-blue-500" : "bg-transparent"
        } left-0 transition-all`}
      />
      <div
        className={`rounded-full flex justify-center items-center w-[1.2rem] h-[1.2rem] ${
          complete ? "scale-50 p-0" : "scale-100 p-1 border"
        } transition-all `}
      >
        <button
          onClick={() => {
            setComplete((prev) => !prev);
            if (!complete) {
              const audio = new Audio(notify);
              if (!audio) return;
              audio.play();
            }
          }}
          className={`${
            complete ? "bg-green-500" : "bg-transparent"
          } h-full w-full rounded-full m-auto transition-all`}
        />
      </div>
      {!edit ? (
        <p
          className={`text-wrap flex-1 ${
            item.status == "completed" ? "task-completed" : "task-pending"
          }`}
        >
          {item.content}
        </p>
      ) : (
        <form onSubmit={handleEdit} className="flex-1">
          <input
            type="text"
            value={content}
            autoFocus
            onChange={(e) => setContent(e.target.value)}
            className="text-wrap  w-full p-2 bg-transparent border"
          />
          <button type="button" className="hidden" />
        </form>
      )}
      {item.status == "pending" && (
        <div className="group-hover/todoItem:visible invisible flex gap-x-2 items-center w-fit justify-self-start">
          <button onClick={() => setEdit(!edit)} className="transition-all">
            <Edit2
              color="#3b82f6"
              className="w-[1.2rem] hover:stroke-blue-600 h-[1.2rem] hover:scale-110 transition-all
                hover:-translate-y-1
              "
            />
          </button>
          <button
            onClick={handleDelete}
            className="hover:-translate-y-[2px]  hover:scale-110 translate-y-0 transition-all"
          >
            <Trash2
              color="#ef4444"
              className="w-[1.2rem] hover:stroke-red-600 h-[1.2rem] hover:scale-110 
                hover:-translate-y-1 transition-all"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
