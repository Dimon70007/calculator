import React from 'react';

const CreateButton = (props) => {
  const value = props.name.split('_')[1] || ' ';
  return (
    <button
      className={'btn btn-default'}
      type='button'
      name={props.name}
    >
      {value}
    </button>
  );
};

export default CreateButton;
