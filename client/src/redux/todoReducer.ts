import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoType } from "../lib/models";

const initialState = {
  tasks: [] as TodoType[],
  label: "today",
  user: "",
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
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
  addToDoRedux,
  deleteToDoRedux,
  updateToDoRedux,
  changeToDoStatusRedux,
  setToDosRedux,
  changeLabelRedux,
  setUser
} = todoSlice.actions;

export default todoSlice.reducer;
