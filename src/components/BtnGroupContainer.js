import React from 'react';
import { BtnGroupContainerCss } from '../styles';

const BtnGroupContainer = props => (
  <div className='table table-right'>
    {props.children.map(child => (
      <tr style={{ 'text-align': 'right' }}>{child}</tr>
    ))}
  </div>
  );

export default BtnGroupContainer;
