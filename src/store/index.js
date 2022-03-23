import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './todoSlice';
// конфигуратор и будет возвращать состояние
// редьюсеры в рамках пакета toolkit обычно называют слайсами - срезами
export default configureStore({
  reducer: {
    todos: todosReducer,
  },
});
