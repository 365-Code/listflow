import { CalendarRange, Check, Edit2, Trash2, X } from "lucide-react";
import React, { useMemo, useState } from "react";
import { randomColor } from "../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { deleteCustomLabel, updateCustomLabel } from "../lib/todos";
import {
  deleteCustomLabelRedux,
  updateCustomLabelRedux,
} from "../redux/todoReducer";
interface ListItemProps {
  item: {
    icon?: React.ReactNode;
    title: string;
  };
  type?: string;
  handleClick: () => void;
}

const ListItem = ({ item, handleClick, type }: ListItemProps) => {
  const currLabel = useSelector((state: RootState) => state.todos.label);

  const [edit, setEdit] = useState(false);
  const [label, setLabel] = useState(item.title);
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeLabel = async () => {
    try {
      const result = await updateCustomLabel(item.title, label);
      if (result.success) {
        dispatch(
          updateCustomLabelRedux({
            labelId: item.title,
            newLabel: label,
          })
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  };

  const handleDeleteLabel = async () => {
    try {
      const result = await deleteCustomLabel(item.title);
      if (result.success) {
        dispatch(deleteCustomLabelRedux({ labelId: item.title }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const color = useMemo(() => {
    return randomColor();
  }, []);

  return (
    <button
      onClick={handleClick}
      className={`p-2 group/listItem rounded-lg transition-all flex items-center justify-start gap-x-2 mt-2 ${
        item.title.toLowerCase() == currLabel.toLowerCase()
          ? "active-list-item"
          : "listItem"
      } w-full`}
    >
      {item.icon ? (
        item.icon
      ) : (
        <CalendarRange color={color} className="h-[1.2rem] w-[1.2rem]" />
      )}
      {edit ? (
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          autoFocus
          className="p-1 flex-1 w-full outline-none border-none bg-transparent"
        />
      ) : (
        <span className="flex-1 text-left truncate capitalize">
          {item.title}
        </span>
      )}
      {type == "custom" &&
        (edit ? (
          <>
            <Check
              onClick={handleChangeLabel}
              color="#4ade80"
              className="hover:stroke-green-500 hover:scale-110 transition-all w-[1rem] h-[1rem]"
            />
            <X
              onClick={() => {
                setLabel(item.title);
                setEdit(false);
              }}
              color="#cbd5e1"
              className="hover:scale-110 w-[1rem] h-[1rem]"
            />
          </>
        ) : (
          <div className="flex items-center gap-x-2 group-hover/listItem:visible invisible">
            <Edit2
              onClick={() => setEdit(true)}
              color="#3b82f6"
              className="w-[1rem] hover:stroke-blue-600 h-[1rem] hover:scale-125 transition-all
                hover:-translate-y-1
              "
            />
            <Trash2
              onClick={handleDeleteLabel}
              color="#ef4444"
              className="w-[1rem] hover:stroke-red-600 h-[1rem] hover:scale-125 
                hover:-translate-y-1 transition-all"
            />
          </div>
        ))}
    </button>
  );
};

export default ListItem;
