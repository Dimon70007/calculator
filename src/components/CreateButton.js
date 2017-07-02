import React from 'react';
import parseValue from './parseValue';

const noop = () => {};
const parseName = name => name.split('_')[1] || ' ';

const CreateButton = ({
                    name = 'btn_ ',
                    width = '5em',
                    height = '2.5em',
                    btnAction = noop }) => {
  const value = parseName(name);
  const btnValue = parseValue(value);
  const clickHandler = btnVal => (event) => {
    event.preventDefault();
    btnAction(btnVal);
  };
  return (
    <button
      className={'btn btn-default'}
      style={{ 'margin-bottom': '5px', 'margin-left': '5px', width, height, 'font-size': '1em' }}
      name={name}
      onClick={clickHandler(name)}
    >
      {btnValue}
    </button>
  );
};

export default CreateButton;
