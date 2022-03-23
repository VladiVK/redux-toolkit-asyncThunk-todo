import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  status: null,
  error: null,
};

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=10'
      );

      if (!response.ok) {
        throw new Error('Server Error!');
      }
      const data = response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { method: 'DELETE' }
      );
      if (!response.ok) {
        throw new Error('Can`t delete this task. Server error.');
      }
      // если же у нас response.ok, значит на сервере удалили
      // и може удалить из интерфейса обычны способом
      dispatch(deleteTodo({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleStatusAsync = createAsyncThunk(
  'todos/toggleStatusAsync',
  async function (id, { rejectWithValue, getState, dispatch }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );
      if (!response.ok) {
        throw new Error('Can`t toggle status. Server error.');
      }

      dispatch(toggleTodoIsComplete({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async function (todoText, { rejectWithValue, dispatch }) {
    try {
      const newTodo = {
        // обычный id сервер сформирует сам
        title: todoText,
        userId: 1,
        completed: false,
      };
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        }
      );
      if (!response.ok) {
        throw new Error('Can`t send data. Server error.');
      }

      const data = await response.json();
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// helper function
const setError = (state, action) => {
  state.status = 'rejected';
  state.error = action.payload;
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      // state.todos.push({
      //   id: new Date().toISOString(),
      //   completed: false,
      //   title: action.payload.title,
      // });
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleTodoIsComplete: (state, action) => {
      // мутации не будет из-за проки( осбенностей толкит)
      const newTodo = state.todos.find((todo) => todo.id === action.payload.id);
      newTodo.completed = !newTodo.completed;
      //   state.todos = state.todos.map((todo) => {
      //     return todo.id === action.payload.id
      //       ? { ...todo, completed: !todo.completed }
      //       : todo;
      //   });
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      return {
        ...state,
        status: 'resolved',
        todos: [...state.todos, ...action.payload],
      };
    },
    // обработка ошибок
    // [fetchTodos.rejected]: (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.payload;
    // },
    [fetchTodos.rejected]: setError,
    // обработка ошибок
    // [deleteTodoAsync.rejected]: (state, action) => {
    //   state.status = 'rejected';
    //   state.error = action.payload;
    // },
    [deleteTodoAsync.rejected]: setError,
    [toggleStatusAsync.rejected]: setError,
  },
});

export const { addTodo, deleteTodo, toggleTodoIsComplete } = todoSlice.actions;
export default todoSlice.reducer;
