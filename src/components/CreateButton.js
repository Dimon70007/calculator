import React from 'react';

const CreateButton = ({ name = 'btn_ ', width = '5em', height = '2.5em' }) => {
  const value = name.split('_')[1] || ' ';
  return (
    <button
      className={'btn btn-default'}
      style={{ 'min-width': width, 'min-height': height }}
      type='button'
      name={name}
    >
      {value}
    </button>
  );
};

export default CreateButton;
