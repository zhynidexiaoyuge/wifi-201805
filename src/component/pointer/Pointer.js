import React, { Component } from 'react';
import * as d3 from 'd3';
import circle1 from './img/circle1.png';
import circle2 from './img/circle2.png';
import arrow from './img/arrow.png';
/**
 * 首页仪表盘
 * @zdd
 */
class Pointer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  };
  _setData(d) {
    let me = this;
    me.setState({
      data: d
    })
  }
  appear() {
    let me = this;
    let angleData = 1.8 * me.state.data - 160;
    setTimeout(function () {
      me.refs.icon.style.transform = `rotate(${angleData}deg)`;
    }, 1000);
    me.refs.content.innerHTML = me.state.data
    me._draw()
  }
  disappear() {
    let me = this;
    me.refs.icon.style.transform = 'rotate(-166deg)';
    d3.select(me.refs.pointer).select('.changeTransgorm').remove();
    me.refs.content.innerHTML = 0
  }
  render() {
    return (
      <div style={{
        position: 'absolute',
        left: this.props.left,
        top: this.props.top
      }}>
        <dl>
          <dt>
            <div ref={'pointer'} style={{
              textAlign: 'center'
            }}>
              <div>
                <i style={{
                  width: 126,
                  height: 73,
                  background: 'url(' + arrow + ')',
                  display: 'block',
                  position: 'absolute',
                  left: 70,
                  top: 66,
                  zIndex: 2,
                  transform: 'rotate(-160deg)',
                  transition: 'all 1s linear'
                }} ref={'icon'}></i>
                <i style={{
                  width: 126,
                  height: 73,
                  background: this.props.type == 0 ? `url(${circle1})` : `url(${circle2})`,
                  display: 'block',
                  position: 'absolute',
                  left: 77,
                  top: 66,
                  zIndex: 9
                }} ></i>
              </div>
              <div style={{
                position: 'absolute',
                left: 97,
                top: 90,
                zIndex: 10
              }}>
                <b style={{
                  fontSize: 20
                }} ref={'content'}>0</b>
                <i style={{
                  fontSize: 16
                }}>%</i>
              </div>
            </div>
          </dt>
          <dd style={{
            position: 'absolute',
            left: 53,
            top: 141,
            fontSize: 16
          }}>{this.props.title}</dd>
        </dl>
      </div>
    )
  };
  /**弧生成器 */
  _cerateArc(r, R, start, end) {
    let me = this;
    let arc = d3.arc()
      .innerRadius(r)
      .outerRadius(R)
      .startAngle(start)
      .endAngle(end)
    return arc();
  }
  /*画动画的弧*/
  _draw() {
    let me = this;
    let transG = this.svg.append('g')
      .attr('class', 'changeTransgorm')
      .attr("transform", `translate(${me.width / 2},${me.height / 2})`)
      .append('path')
      .transition()
      .duration(1000)
      .delay(1000)
      .ease(d3.easeLinear)
      .attrTween('d', function (d, i, a) {
        return function (t) {
          return me._cerateArc(me.r, me.R, -me.M / 2, (me.M / 100 * me.state.data) * t - me.M / 2)
        }
      })
      .attr('fill', function () {
        return "url(#" + me.linearGradient.attr("id") + ")";
      })
  }
  componentDidMount() {
    let me = this;
    me.width = 220, me.height = 205
    me.R = 85;
    me.r = 0;
    me.M = Math.PI;
    me.smallR = me.R + 5;
    me.startAngle = me.M / 5;
    me.scaleAngleFor = -me.M / 2;
    me.scaleAngleTo = me.M / 2;
    /**svg */
    this.svg = d3.select(me.refs.pointer).append('svg')
      .attr('width', me.width)
      .attr('height', me.height);

    /**渐变色 */
    this.linearGradient = me.svg.append("linearGradient")
      .attr("id", this.props.id || "linearColor")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");
    let stop1 = this.linearGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", me.props.startColor);
    let stop2 = this.linearGradient.append("stop")
      .attr("offset", "100%")
      .style("stop-color", me.props.endColor);
  }
  componentDidUpdate() {
    let me = this;
    let data = [0, 20, 40, 60, 80, 100].map((s, i) => {
      let start = me.scaleAngleFor + i * me.startAngle;
      let end = start + me.startAngle - 2 * Math.PI / 180;
      let val = s;
      return {
        start,
        end,
        val
      }
    });
    /*画半圆弧------ */
    let g = me.svg.append('g')
      .attr("transform", `translate(${this.width / 2},${this.height / 2})`);
    g.append('text')
      .attr('dx', -103)
      .attr('dy', 3)
      .attr('fill', '#575c63')
      .attr('font-size', 12)
      .text(0 + '%');
    g.append('path')
      .attr('d', function (d, i) { return me._cerateArc(me.r, me.R, -me.M / 2, me.M / 2) })
      .attr('fill', '#eee');
    /**画文字的弧 */
    let gText = me.svg.selectAll('g')
      .data(data)
      .enter();
    let gg = gText.append('g')
      .attr("transform", `translate(${me.width / 2},${me.height / 2})`)
    /**根据数据的------弧  */
    gg.append('path')
      .attr('d', function (d, i) {
        if (i > 5) { return }
        let path = me._cerateArc(me.smallR - 2, me.smallR, d.start, d.end - Math.PI / 90);
        return path;
      })
      .attr('fill', '#fff');
    /**添加文字---------- */
    gg.append("text")
      .attr('dy', function (d, i) {
        if (i == 0) { return 3 }
        if (i == 1) { return 5 }
        if (i == 2) { return 10 }
        if (i == 3) { return 9 }
        if (i == 4) { return 4 }
        if (i == 5) { return 0 }
      })
      .attr('dx', function (d, i) {
        if (i == 0) { return -9 }
        if (i == 1) { return -12 }
        if (i == 2) { return -9 }
        if (i == 3) { return -13 }
        if (i == 4) { return -10 }
        if (i == 5) { return -20 }
      })
      .attr('fill', '#575c63')
      .attr('font-size', 12)
      .attr('x', function (d, i) {
        return (me.smallR + 10) * Math.sin(d.start)
      })
      .attr('y', function (d, i) {
        return -(me.smallR + 10) * Math.cos(d.start)
      })
      .text(function (d, i) {
        return d.val + '%'
      });

    /***旋转角度----------- */
    // let angleData = 1.8 * me.state.data - 160
    // setTimeout(function () {
    //   me.refs.icon.style.transform = `rotate(${angleData}deg)`;
    // }, 1000)

    /**中心点----- */
    me.refs.icon.style.transformOrigin = '36px 36px';
  }
}
export default Pointer;