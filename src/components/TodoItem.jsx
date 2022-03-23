import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoAsync, toggleStatusAsync } from '../store/todoSlice';
const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  return (
    <li key={id} className='todo-item'>
      <input
        className='todo-item__input'
        type='checkbox'
        checked={completed}
        // onChange={() => dispatch(toggleTodoIsComplete({ id }))}
        // здесь id не как объект передаем!
        // меняем статус и с сервера и в UI
        onChange={() => dispatch(toggleStatusAsync(id))}
      />
      <span className='todo-item__text'>{title}</span>
      <button
        className='btn btn-delete'
        // onClick={() => dispatch(deleteTodo({ id }))}
        // здесь id не как объект передаем!
        // удаляем и с сервера и UI
        onClick={() => dispatch(deleteTodoAsync(id))}
      >
        delete
      </button>
    </li>
  );
};

export default TodoItem;
