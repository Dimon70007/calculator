import React from 'react';
import { BtnGroupContainerCss } from '../styles';

const BtnGroupContainer = props => (
  <div className={BtnGroupContainerCss.layout}>
    {/* childrenGroups */}
    {props.children.map(child => (
      <div>
        {child}
      </div>
    ))}
  </div>
  );

export default BtnGroupContainer;
