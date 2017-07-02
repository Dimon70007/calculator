import React from 'react';
import { BtnGroupContainerCss } from '../styles';

const BtnGroupContainer = props => (
  <div className={`${BtnGroupContainerCss.layout}`}>
    <table>
      <tbody>
        {props.children}
      </tbody>
    </table>
  </div>
  );

export default BtnGroupContainer;
