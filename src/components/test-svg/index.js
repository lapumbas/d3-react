import React from 'react';
import * as d3 from 'd3';
import cn from 'classnames';
import './style.css';

class TestSvg extends React.Component {
  state = {
    circles: []
  };

  onSvgClick = evt => {
    const graph = d3.select('.TestSvg__svg');
    const { circles } = this.state;
    circles.push({ x: evt.clientX, y: evt.clientY, rand: Math.random() * 200 + 300 });

    graph
      .append('circle')
      .attr('r', '20')
      .attr('cx', `${evt.clientX}`)
      .attr('cy', `${evt.clientY}`)
      .style('fill', () => `hsla(${Math.random() * 360}, 100%, 50%, ${Math.random()})`)
      .transition()
      .attr('r', `${Math.floor(Math.random() * 90)}`)
      .duration(1000);

    this.setState({ circles });
  };

  onMouseMove = evt => {
    const graph = d3.select('.TestSvg__svg');
    const { circles } = this.state;
    // console.log(circles);

    graph
      .selectAll('circle')
      .data(circles)
      .attr('cx', (d, i) => {
        const newX = d.x + Math.cos((evt.clientX - d.x) / d.rand) * 5;
        circles[i] = { ...circles[i], x: newX };
        this.setState({ circles });
        return `${newX}`;
      })
      .attr('cy', (d, i) => {
        const newY = d.y + Math.sin((evt.clientY - d.y) / d.rand) * 5;
        circles[i] = { ...circles[i], y: newY };
        this.setState({ circles });
        return `${newY}`;
      });
  };

  render() {
    return (
      <svg
        onClick={this.onSvgClick}
        onMouseMove={this.onMouseMove}
        className={cn('TestSvg__svg')}
      />
    );
  }
}

export default TestSvg;
