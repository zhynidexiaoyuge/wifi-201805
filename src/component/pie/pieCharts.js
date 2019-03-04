import React, { Component } from 'react';
import echarts from 'echarts'
import circleLine from './circleLine.png';

const colors = [
  ["#3c9ee8", "#1d4efbz"], ["#22d2c0", "#1ca092"], ["#1ea898", "#11635a"], ["#82ebdd", "#47bdad"], ["#8ac851", "#6cad30"],
  ["#f2d78a", "#ccab4d"], ["#fad562", "#d6af37"], ["#fc355f", "#e50f3c"], ["#fd7dd8", "#da40ae"], ["#b860ef", "#9639d1"],
  ["#825dfb", "#5d37db"], ["#5d70fb", "#3448df"], ["#5b91ea", "#346dcc"], ["#11bfff", "#05adeb"], ["#75defc", "#3db5d7"],
]
class PieCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  };

  _setData(d) {
    this.setState({ data: d });
  };
  componentDidMount() {
    const me = this;
    const box = me.refs.box;
    me.chart = echarts.init(box);
    me._option = {
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: true,
          data: []
        }
      ]
    }
  };
  render() {
    let animation = this.props.animation || "animated fadeInLeft"
    return (
      <div >
        <div ref={'box'} style={{
          position: 'absolute',
          left: this.props.left,
          top: this.props.top,
          width: this.props.width,
          height: this.props.height,
        }} className={animation}>
        </div>
        <div style={{ width: 100, height: 110, position: 'absolute', left: 1404, top: 676 }}>
          <img src={circleLine} />
        </div>
      </div>

    )
  }
  componentDidUpdate() {
    const me = this;
    if (!me.state.data) { return }
    me._option.series[0].data = me.state.data.map((t, i) => {
      return {
        value: t.value,
        name: t.name,
        itemStyle: {
          color: colors[i][0]
        },
        labelLine: {
          normal: {
            show: true,
            lineStyle: {
              color: '#c7c7c7'
            }
          },
          emphasis: {
            show: true,
            lineStyle: {
              color: colors[i][1]
            }
          }
        },
        label: {
          normal: {
            show: true,
            color: '#818285',
            position: 'outside',

          },
          emphasis: {
            show: true,
            color: colors[i][1]
          }
        }
      }
    })
    me.chart.setOption(me._option)
  }
}
export default PieCharts;
