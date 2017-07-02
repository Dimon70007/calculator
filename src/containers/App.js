import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BtnGroupContainer from '../components/BtnGroupContainer';
import FirstButtonGroup from '../components/FirstButtonGroup';
import SecondButtonGroup from '../components/SecondButtonGroup';
import ThirdButtonGroup from '../components/ThirdButtonGroup';
import { funcSelector } from '../controllers';
import { NUMS_BTN_NAMES, MEM_BTN_NAMES, CMN_BTN_NAMES, FUNC_RIGHT_BTN_NAMES, FUNC_LEFT_BTN_NAMES } from '../constants';
import { AppCss } from '../styles';

class App extends React.Component {

  componentWillUnmount() {
    localStorage.setItem('fieldState', JSON.stringify(this.props.fieldState));
    localStorage.setItem('resultState', JSON.stringify(this.props.resultState));
  }

  render() {
    const fieldStr = (<p>
      {this.props.fieldState.join('')}
    </p>);
    const resultStr = (<p>
      {this.props.resultState.value}
    </p>);
    return (
      <div className={AppCss.App}>
        <div className={'panel panel-default'}>
          <div className='panel-heading'>
            <h3 className='panel-title'>Calculator</h3>
          </div>
          <div className='panel-body'>
            <div className='well text-primary' style={{ textAlign: 'right' }}>
              {fieldStr}
              {resultStr}
            </div>
            <BtnGroupContainer>
              <FirstButtonGroup btnNames={MEM_BTN_NAMES} />
              <SecondButtonGroup
                btnNames={CMN_BTN_NAMES}
                clear={this.clear}
                clearWithMemory={this.clearWithMemory}
              />
              <ThirdButtonGroup
                namesLeft={FUNC_LEFT_BTN_NAMES}
                namesRight={FUNC_RIGHT_BTN_NAMES}
                namesCenter={NUMS_BTN_NAMES}
                numOnClick={funcSelector[NUMS_BTN_NAMES]}
                operationOnClick={this.changeLast}
                funcOnClick={this.addFunc}
              />
            </BtnGroupContainer>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};

const mapStateToProps = state => ({
  resultStr: state.resultState,
  fieldState: state.fieldState,
  memoryState: state.memoryState,
});

export default connect(mapStateToProps)(App);
