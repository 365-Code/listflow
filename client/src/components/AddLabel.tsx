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
      <button
        onClick={() => setAdd(true)}
        className="flex items-center transition-all gap-x-2 p-2 w-full rounded-lg
        dark:bg-slate-800 hover:dark:bg-slate-900
        bg-slate-500 hover:bg-slate-600
      "
      >
        {add ? (
          <>
            <input
              autoFocus
              placeholder="Enter label"
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="outline-none w-full bg-transparent border-b border-blue-500"
              maxLength={20}
            />
            <CircleCheck color="violet" onClick={handleAddLabel} />
            <CircleXIcon color="white" onClick={() => setAdd(false)} />
          </>
        ) : (
          <>
            <PlusCircle color="#1d4ed8" className="h-[1.2rem] w-[1.2rem]" />
            <span className="text-white">Add Label</span>
          </>
        )}
      </button>
    </div>
  );
};

export default AddLabel;
