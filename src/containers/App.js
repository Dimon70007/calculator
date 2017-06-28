import React from 'react';
import PropTypes from 'prop-types';
import { AppCss } from '../styles';
import BtnGroupContainer from '../components/BtnGroupContainer';
import FirstButtonGroup from '../components/FirstButtonGroup';
import SecondButtonGroup from '../components/SecondButtonGroup';
import ThirdButtonGroup from '../components/ThirdButtonGroup';
import { NUMS_BTN_NAMES, MEM_BTN_NAMES, CMN_BTN_NAMES, FUNC_RIGHT_BTN_NAMES, FUNC_LEFT_BTN_NAMES } from '../constants';
// import css from '../styles/bootstrap/customizations.scss';

class App extends React.PureComponent {
  render() {
    const {
      children,
    } = this.props;
    return (
      <div className={AppCss.App}>
        <div className={'panel panel-default'}>
          <div className='panel-heading'>
            <h3 className='panel-title'>Calculator</h3>
          </div>
          <div className='panel-body'>
            <div className='well text-primary' style={{ 'text-align': 'right' }}>
              <p>
                outer data
              </p>
            </div>
            <BtnGroupContainer>
              <FirstButtonGroup btnNames={MEM_BTN_NAMES} />
              <SecondButtonGroup btnNames={CMN_BTN_NAMES} />
              <ThirdButtonGroup
                namesLeft={FUNC_LEFT_BTN_NAMES}
                namesRight={FUNC_RIGHT_BTN_NAMES}
                namesCenter={NUMS_BTN_NAMES}
              />
            </BtnGroupContainer>
          </div>
        </div>
        {children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

export default App;
