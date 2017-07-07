import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BtnGroupContainer from '../components/BtnGroupContainer';
import FirstButtonGroup from '../components/FirstButtonGroup';
import SecondButtonGroup from '../components/SecondButtonGroup';
import ThirdButtonGroup from '../components/ThirdButtonGroup';
import { NUM_BTNS, MEM_BTNS, CMN_BTNS, FUNC_LEFT_BTNS, FUNC_RIGHT_BTNS } from '../constants';
import { normalizeField } from '../helpers';
import { AppCss } from '../styles';
import { btnAction } from '../actions';

class App extends React.Component {

  componentDidUpdate() {
    localStorage.setItem('fieldState', JSON.stringify(this.props.fieldState));
    localStorage.setItem('resultState', JSON.stringify(this.props.resultState));
    localStorage.setItem('memoryState', JSON.stringify(this.props.memoryState));
  }

  render() {
    const {
      memoryState,
      fieldState,
      resultState,
      btnActn,
    } = this.props;
    const normField = normalizeField(fieldState, 256);
    const fieldStr = (<div>
      {normField || ' '}
    </div>);
    const memStr = (<div className={memoryState ? 'pull-left' : 'pull-left hidden'}>
      {`M: ${memoryState}`}
    </div>);
    const resultStr = (<div className='pull-right'>
      {resultState.isCalculated ? resultState.value : resultState.arg}
    </div>);
    return (
      <div className={AppCss.App}>
        <div className={'panel panel-default'}>
          <div className='panel-heading'>
            <h3 className='panel-title'>Calculator</h3>
          </div>
          <div className='panel-body'>
            <div className='well text-primary' style={{ textAlign: 'right', height: '7em', 'overflow-x': 'hidden' }}>
              {fieldStr}
              <br />
              <div className='row'>
                {memStr}
                {resultStr}</div>
            </div>
            <BtnGroupContainer>
              <FirstButtonGroup
                btns={MEM_BTNS}
                onClick={btnActn}
              />
              <SecondButtonGroup
                btns={CMN_BTNS}
                onClick={btnActn}
              />
              <ThirdButtonGroup
                btnsLeft={FUNC_LEFT_BTNS}
                btnsRight={FUNC_RIGHT_BTNS}
                btnsCenter={NUM_BTNS}
                onClick={btnActn}
              />
            </BtnGroupContainer>
          </div>
        </div>
      </div>
    );
  }
}

// App.propTypes = {
//   children: PropTypes.node,
// };

const mapStateToProps = state => ({
  resultState: state.resultState,
  fieldState: state.fieldState,
  memoryState: state.memoryState,
});

const mapDispatchToProps = dispatch => ({
  btnActn: btn => () => dispatch(btnAction(btn)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
