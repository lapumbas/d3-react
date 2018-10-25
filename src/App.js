import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './store/actions';
import * as d3 from 'd3';

import './App.css';

import TestSvg from './components/test-svg';

class App extends Component {
  onSvgClick = evt => {
    const graph = d3.select('.TestSvg__svg');

    graph
      .append('circle')
      .attr('r', '20')
      .attr('cx', `${evt.clientX}`)
      .attr('cy', `${evt.clientY}`)
      .style('fill', () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random()})`)
      .transition()
      .attr('r', `${Math.floor(Math.random() * 90)}`)
      .duration(1000);

    this.props.dispatch({
      type: actions.ADD_CIRCLE,
      payload: { x: evt.clientX, y: evt.clientY, rand: Math.random() * 100 + 10 }
    });
  };

  onMouseMove = evt => {
    const graph = d3.select('.TestSvg__svg');
    const { circles } = this.props;

    graph
      .selectAll('circle')
      .data(circles)
      .attr('cx', (d, i) => {
        const newX = d.x + Math.sin((evt.clientX - d.x) / d.rand) * 5;
        circles[i] = { ...circles[i], x: newX };
        this.props.dispatch({
          type: actions.MOVE_CIRCLES,
          payload: circles
        });
        return `${newX}`;
      })
      .attr('cy', (d, i) => {
        const newY = d.y + Math.sin((evt.clientY - d.y) / d.rand) * 5;
        circles[i] = { ...circles[i], y: newY };
        this.props.dispatch({
          type: actions.MOVE_CIRCLES,
          payload: circles
        });
        return `${newY}`;
      });
  };

  render() {
    return (
      <div className="App">
        <TestSvg onSvgClick={this.onSvgClick} onMouseMove={this.onMouseMove} />
      </div>
    );
  }
}

export default connect(state => ({
  circles: state.circles.circles
}))(App);
