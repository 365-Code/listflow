import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../lib/models";

const initialState = {
  tasks: [] as TodoType[],
  label: "today",
  user: "",
  customLabels: [] as string[],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
    },
    setCustomLabelsRedux: (state, action: PayloadAction<string[]>) => {
      state.customLabels = action.payload;
    },
    addCustomLabelRedux: (state, action: PayloadAction<string>) => {
      state.customLabels.push(action.payload);
    },
    updateCustomLabelRedux: (
      state,
      action: PayloadAction<{ labelId: string; newLabel: string }>
    ) => {
      const labelId = action.payload.labelId.toLowerCase();
      const newLabel = action.payload.newLabel.toLowerCase();
      const index = state.customLabels.findIndex((i) => i == labelId);
      if (index != -1) {
        state.customLabels[index] = newLabel;
      }
    },
    deleteCustomLabelRedux: (
      state,
      action: PayloadAction<{ labelId: string }>
    ) => {
      const labelId = action.payload.labelId.toLowerCase();
      state.customLabels = state.customLabels.filter((lbl) => lbl != labelId);
    },
    changeLabelRedux: (state, action: PayloadAction<string>) => {
      state.label = action.payload;
    },
    setToDosRedux: (
      state,
      action: PayloadAction<{
        todos: TodoType[] | [];
        todoLabel: string;
      }>
    ) => {
      state.tasks = action.payload.todos;
      state.label = action.payload.todoLabel;
    },
    addToDoRedux: (state, action: PayloadAction<TodoType>) => {
      const newTodo = action.payload;
      state.tasks.push(newTodo);
    },
    deleteToDoRedux: (state, action: PayloadAction<{ todoId: string }>) => {
      state.tasks = state.tasks.filter(
        (todo) => todo._id != action.payload.todoId
      );
    },
    updateToDoRedux: (state, action: PayloadAction<TodoType>) => {
      state.tasks.forEach((todo) => {
        if (todo._id == action.payload._id) {
          todo = action.payload;
        }
      });
    },
    changeToDoStatusRedux: (state, action: PayloadAction<TodoType>) => {
      state.tasks.forEach((todo) => {
        if (todo._id == action.payload._id) {
          todo.status = action.payload.status;
        }
      });
    },
  },
});

export const {
  setUser,

  setToDosRedux,
  addToDoRedux,
  updateToDoRedux,
  deleteToDoRedux,

  changeToDoStatusRedux,
  changeLabelRedux,

  setCustomLabelsRedux,
  addCustomLabelRedux,
  updateCustomLabelRedux,
  deleteCustomLabelRedux,
} = todoSlice.actions;

export default todoSlice.reducer;
