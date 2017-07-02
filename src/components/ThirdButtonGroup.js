import React from 'react';
import CreateButton from './CreateButton';
import { itemsWrapper } from '../helpers';

const itemFunc = (btnName, onClick) => {
  const wrap = btn => (<span key={btnName} className='col'>
    {btn}
  </span>);
  switch (btnName) {
    case 'btn_0':
      return wrap(<CreateButton btnAction={onClick} name={btnName} width='10.363em' />);
    case 'btn_=':
      return wrap(<CreateButton btnAction={onClick} name={btnName} height='5.363em' />);
    default:
      return wrap(<CreateButton btnAction={onClick} name={btnName} />);
  }
};
const groupFunc = (items, key) => (<div key={key}>
  {items}
</div>);

const ThirdButtonGroup = ({
                          namesLeft = [],
                          namesRight = [],
                          namesCenter = [],
                          numOnClick,
                          operationOnClick,
                          funcOnClick }) => {
  const namesRightHead = namesRight.slice(0, 4);
  const namesRightTail = namesRight.slice(4);
  const buttonsLeft = itemsWrapper({
    names: namesLeft,
    itemFunc,
    groupFunc,
    groupCount: 5,
    itemArgs: [funcOnClick],
    // groupArgs: [],
  });
  const buttonsCenter = itemsWrapper({
    names: namesCenter,
    itemFunc,
    groupFunc,
    groupCount: 3,
    itemArgs: [numOnClick],
    // groupArgs: [],
  });
  const buttonsRightOne = itemsWrapper({
    names: namesRightHead,
    itemFunc,
    groupFunc,
    groupCount: 1,
    itemArgs: [operationOnClick],
    // groupArgs: [],
  });
  const buttonsRightTwo = itemsWrapper({
    names: namesRightTail,
    itemFunc,
    groupFunc,
    groupCount: 1,
    itemArgs: [operationOnClick],
    // groupArgs: [],
  });

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              {buttonsLeft}
            </td>
            <td>
              {buttonsCenter}
            </td>
            <td>
              {buttonsRightOne}
            </td>
            <td>
              {buttonsRightTwo}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ThirdButtonGroup;
