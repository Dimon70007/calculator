import React from 'react';
import CreateButton from './CreateButton';

const FirstButtonGroup = ({ btnNames = [], memoryAction }) => {
  const buttons = btnNames.map(btnName => (
    <CreateButton
      key={btnName}
      name={btnName}
      btnAction={memoryAction}
    />
  ));
  return (
    <tr>
      {buttons}
    </tr>
  );
};

export default FirstButtonGroup;
