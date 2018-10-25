import React from 'react';
import { withFauxDOM } from 'react-faux-dom';
import * as d3 from 'd3';
import cn from 'classnames';
import './style.css';

class TestSvg extends React.Component {
  state = {
    circles: []
  };

  componentDidMount = () => {
    // this.renderSvg();
  };


  renderSvg = () => {
    const { connectFauxDOM } = this.props;
    const faux = connectFauxDOM('g', 'chart');

    const graph = d3.select(faux);
    graph.append('circle').attr('r', '50');
  };

  onSvgClick = evt => {
    const { connectFauxDOM } = this.props;
    const faux = connectFauxDOM('g', 'chart');
    const graph = d3.select(faux);
    const { circles } = this.state;
    circles.push({ x: evt.clientX, y: evt.clientY });
    console.log(circles);
    
    graph
      .append('circle')
      .attr('r', '20')
      .attr('cx', `${evt.clientX}`)
      .attr('cy', `${evt.clientY}`);
    this.setState({ circles });
  };

  render() {
    console.log('rerender');
    
    return (
      <svg onClick={this.onSvgClick} className={cn('TestSvg__svg')}>
        {this.props.chart}
      </svg>
    );
  }
}

export default withFauxDOM(TestSvg);
