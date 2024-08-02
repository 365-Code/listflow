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

export const addToDo = async (label: string, content: string) => {
  try {
    const response = await fetch(`${api_url}/api/v1/user/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      body: JSON.stringify({
        label,
        content,
      }),
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

export const searchToDos = async (query: string) => {
  try {
    const response = await fetch(
      `${api_url}/api/v1/user/todo/search?query=` + query,
      {
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

export const fetchUserLabels = async () => {
  try {
    const response = await fetch(`${api_url}/api/v1/user/label`, {
      headers: {
        authorization: authToken,
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addCustomLabel = async (label: string) => {
  try {
    const response = await fetch(`${api_url}/api/v1/user/label`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      body: JSON.stringify({
        label,
      }),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomLabel = async (labelId: string, newLabel: string) => {
  try {
    const response = await fetch(
      `${api_url}/api/v1/user/label?labelId=` + labelId,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: authToken,
        },
        body: JSON.stringify({
          newLabel,
        }),
      }
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteCustomLabel = async (labelId: string) => {
  try {
    const response = await fetch(
      `${api_url}/api/v1/user/label?labelId=` + labelId,
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
