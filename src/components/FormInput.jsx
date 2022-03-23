import React from 'react';

const FormInput = ({ title, handleForm, handleInputValue }) => {
  return (
    <form className='form-input' onSubmit={handleForm}>
      <input type='text' value={title} onChange={handleInputValue} />
      <button className='btn btn-form' type='submit'>
        add todo
      </button>
    </form>
  );
};

export default FormInput;
