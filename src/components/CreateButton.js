import React from 'react';
import parseValue from './parseValue';
import { CreateButtonCss } from '../styles';

const noop = () => {};

const CreateButton = ({
                    name = 'btn_ ',
                    value = ' ',
                    // width = '5em',
                    // height = '2.5em',
                    btnSize = 'normal',
                    btnAction = noop }) => {
  const btnValue = parseValue(value);
  const clickHandler = (event) => {
    event.preventDefault();
    btnAction();
  };
  return (
    <button
      className={`btn btn-default ${CreateButtonCss[btnSize]}`}
      name={name}
      onClick={clickHandler}
    >
      {btnValue}
    </button>
  );
};

export default CreateButton;
