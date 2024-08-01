import { CalendarRange } from "lucide-react";
import React from "react";
import { randomColor } from "../lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
interface ListItemProps {
  item: {
    icon?: React.ReactNode;
    title: string;
  };
  handleClick: () => void;
}

const ListItem = ({ item, handleClick }: ListItemProps) => {
  const currLabel = useSelector((state: RootState) => state.todos.label);

  return (
    <button
      onClick={handleClick}
      className={`p-2 rounded-lg transition-all flex items-center justify-start gap-x-2 mt-2 ${
        item.title.toLowerCase() == currLabel.toLowerCase()
          ? "active-list-item"
          : "listItem"
      } w-full`}
    >
      {item.icon ? (
        item.icon
      ) : (
        <CalendarRange
          color={randomColor()}
          className="h-[1.2rem] w-[1.2rem]"
        />
      )}
      <span className="truncate capitalize">{item.title}</span>
    </button>
  );
};

export default ListItem;
