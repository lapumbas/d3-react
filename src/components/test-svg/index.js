import React from 'react';
import cn from 'classnames';
import './style.css';

class TestSvg extends React.Component {

  render() {
    return (
      <svg
        onClick={this.props.onSvgClick}
        onMouseMove={this.props.onMouseMove}
        className={cn('TestSvg__svg')}
      />
    );
  }
}

export default TestSvg;
