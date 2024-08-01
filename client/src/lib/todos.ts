export const api_url = import.meta.env.VITE_API_URL;

if (!api_url) {
  throw Error("Api url is undefined");
}

export const authToken = localStorage.getItem("auth-token") || "";

export const getAllTodos = async (label: string) => {
  try {
    const response = await fetch(`${api_url}/api/v1/user/todo/` + label, {
      headers: {
        authorization: authToken,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

type UpdateTodoType = {
  content?: string;
  status?: string;
};

export const updateTodo = async (todoId: string, todo: UpdateTodoType) => {
  try {
    const response = await fetch(
      `${api_url}/api/v1/user/todo?todoId=` + todoId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: authToken,
        },
        body: JSON.stringify(todo),
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteToDo = async (todoId: string) => {
  try {
    const response = await fetch(
      `${api_url}/api/v1/user/todo?todoId=` + todoId,
      {
        method: "DELETE",
        headers: {
          authorization: authToken,
        },
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

// export const getAllTodos = async () => {
//   try {
//     const response = await fetch(`${api_url}/get-all`);
//     if (response.ok) {
//       const result = (await response.json()) as {
//         todos: TodoType[];
//         label: string;
//       };
//       dispatch(setToDos({ todos: result.todos, todoLabel: result.label }));
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
