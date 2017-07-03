import React from 'react';
import parseValue from './parseValue';

const noop = () => {};

const CreateButton = ({
                    name = 'btn_ ',
                    value = ' ',
                    width = '5em',
                    height = '2.5em',
                    btnAction = noop }) => {
  const btnValue = parseValue(value);
  const clickHandler = (event) => {
    event.preventDefault();
    btnAction();
  };
  return (
    <button
      className={'btn btn-default'}
      style={{ 'margin-bottom': '5px', 'margin-left': '5px', width, height, 'font-size': '1em' }}
      name={name}
      onClick={clickHandler}
    >
      {btnValue}
    </button>
  );
};

export default CreateButton;
