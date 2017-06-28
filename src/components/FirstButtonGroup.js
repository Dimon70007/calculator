import React from 'react';
import CreateButton from './CreateButton';
import { FirstButtonGroupCss } from '../styles';

const FirstButtonGroup = ({ btnNames = [] }) => {
  const buttons = btnNames.map(btnName => (
    <CreateButton key={btnName} name={btnName} />
  ));
  return (
    <div className={`btn-group ${FirstButtonGroupCss.group}`}>
      {buttons}
    </div>
  );
};

export default FirstButtonGroup;
