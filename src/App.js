import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync, fetchTodos } from './store/todoSlice';

// components
import FormInput from './components/FormInput';
import TodosList from './components/TodosList';
function App() {
  const { todos, status, error } = useSelector((state) => state.todos);
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchTodos());
  // }, []);

  const handleForm = (e) => {
    e.preventDefault();
    if (title.trim().length) {
      dispatch(addTodoAsync(title));
      setTitle('');
    }
  };

  const handleInputValue = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <div className='container-center'>
        <h1>Todos</h1>

        <FormInput
          title={title}
          handleForm={handleForm}
          handleInputValue={handleInputValue}
        />

        <div className='btn-container'>
          <button
            className='btn btn-form'
            onClick={() => dispatch(fetchTodos())}
          >
            fetch data
          </button>
        </div>
        {status === 'loading' && <h2>Loading...</h2>}
        {status === 'rejected' && <h2>An Error: {error}</h2>}
        {todos.length > 0 && <TodosList />}
      </div>
    </div>
  );
}

export default App;
