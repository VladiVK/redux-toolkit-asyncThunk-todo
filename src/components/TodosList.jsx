import React from 'react';
import TodoItem from './TodoItem';
import { useSelector } from 'react-redux';

const TodosList = () => {
  const todos = useSelector((state) => state.todos.todos);
  return (
    <ul className='todos-container'>
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default TodosList;
