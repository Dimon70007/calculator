import React from 'react';
import CreateButton from './CreateButton';

const SecondButtonGroup = ({
  btns = [],
  onClick,
 }) => {
  const buttons = btns.map(btn => (
    <CreateButton
      key={btn.name}
      name={btn.name}
      value={btn.value}
      btnAction={onClick(btn)}
    />
  ));
  return (
    <tr>
      {buttons}
    </tr>
  );
};

export default SecondButtonGroup;
