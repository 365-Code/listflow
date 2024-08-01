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
    }, 500);
    return () => clearTimeout(debounce);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complete]);

  const handleEdit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content) return;
    try {
      await updateTodo(item._id, {
        content: content,
      });
      dispatch(updateToDoRedux({ ...item, content }));
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteToDo(item._id);
      dispatch(deleteToDoRedux({ todoId: item._id }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`w-full mb-2 p-3 rounded-sm flex items-center gap-x-2 ${
        item.status == "completed" ? "bg-transparent" : "bg-gray-600"
      }`}
    >
      <div
        className={`rounded-full flex justify-center items-center w-[1.2rem] h-[1.2rem] ${
          complete ? "scale-50 p-0" : "scale-100 p-1 border"
        } transition-all `}
      >
        <button
          onClick={() => {
            setComplete(!complete);
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
      {!complete && (
        <div className="flex gap-x-2 items-center w-fit justify-self-start">
          <button
            onClick={() => setEdit(!edit)}
            className="hover:-translate-y-[2px] hover:scale-110 translate-y-0 transition-all"
          >
            <Edit2 className="h-[1.2rem] w-[1.2rem]" color="#3b82f6" />
          </button>
          <button
            onClick={handleDelete}
            className="hover:-translate-y-[2px]  hover:scale-110 translate-y-0 transition-all"
          >
            <Trash2 className="h-[1.2rem] w-[1.2rem]" color="#ef4444" />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
