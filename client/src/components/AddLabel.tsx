import { CircleCheck, CircleXIcon, PlusCircle } from "lucide-react";
import { useState } from "react";
import { addCustomLabel } from "../lib/todos";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addCustomLabelRedux } from "../redux/todoReducer";

const AddLabel = () => {
  const [add, setAdd] = useState(false);

  const [label, setLabel] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleAddLabel = async () => {
    if (!label) {
      return;
    }
    try {
      const res = await addCustomLabel(label);

      if (res.success) {
        dispatch(addCustomLabelRedux(label));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLabel("");
      setAdd(false);
    }
  };

  return (
    <div>
      {add ? (
        <div
          onFocus={() => setAdd(true)}
          onBlur={() => setAdd(false)}
          className="flex items-center gap-x-2 p-2 border dark:border-slate-700 border-slate-500 rounded-lg "
        >
          <input
            autoFocus
            placeholder="Enter label"
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            className="outline-none w-full opacity-0 animate-appear bg-transparent border-b border-blue-500"
            maxLength={20}
          />
          <CircleCheck
            color="#8b5cf6"
            className="hover:stroke-violet-600 transition-all hover:scale-110"
            onClick={handleAddLabel}
          />
          <CircleXIcon
            color="#e2e8f0"
            className="hover:stroke-slate-300 slate transition-all hover:scale-110"
            onClick={() => setAdd(false)}
          />
        </div>
      ) : (
        <>
          <button
            onClick={() => {
              setAdd(true);
            }}
            className="flex animate-appear items-center transition-all gap-x-2 p-2 w-full rounded-lg
        dark:bg-slate-800 hover:dark:bg-slate-900
        bg-slate-500 hover:bg-slate-700 
      "
          >
            <PlusCircle color="#1d4ed8" className="h-[1.2rem] w-[1.2rem]" />
            <span className="text-white">Add Label</span>
          </button>
        </>
      )}
    </div>
  );
};

export default AddLabel;
