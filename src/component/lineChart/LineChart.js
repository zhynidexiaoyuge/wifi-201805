import React from 'react';
import echarts from 'echarts';

class LineCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  _setData(d) {
    // console.log(d)
    let me = this;
    me.flag = true;
    me.setState({
      data: d
    })
  }
  render() {
    return (
      <div ref={'lineCharts'} style={{
        width: 466,
        height: 272
      }}></div>
    )
  }
  componentDidMount() {
    let me = this;
    me.LineCharts = echarts.init(me.refs.lineCharts)
    me.options = {
      title: {
        text: 'ZD人活跃趋势',
        subtext: '单位：次',
        textStyle: {
          fontSize: 16,
          color: '#444b53'
        },
        subtextStyle: {
          color: '#2d3640',
          fontSize: 12,
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br />数据量：{c}'
      },
      grid: {
        left: '2%',
        right: '0%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: []
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      // dataZoom: [
      //   {
      //     type: "inside",
      //     filterMode: "none",
      //     start: 0,
      //     end: 40
      //   }
      // ],
      series: [
        {
          name: '单位',
          type: 'line',
          smooth: false,
          symbolSize: 7,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: "#2fd1c6",  // 会设置点和线的颜色，所以需要下面定制 line
              borderColor: "#fff"  // 点边线的颜色
            }
          },
          lineStyle: {//折线的颜色
            normal: {
              color: "#1ba0fc",
              width: 3,
              //shadowBlur:80
            },
          },
          data: [],
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgb(47, 209, 198)'
              }, {
                offset: 1,
                color: 'rgb(47, 209, 198,0.3)'
              }])
            }
          }
        }
      ]
    }
  }
  componentDidUpdate() {
    let me = this;
    if (!this.state.data) { return };
    if (this.flag) { this.flag = false } else { return };
    me.options.xAxis.data = me.state.data.Xdata;
    me.options.series[0].data = me.state.data.seriesData;
    me.LineCharts.setOption(me.options, true);

  }
  componentWillUnmount() {
    if (this.LineCharts) {
      this.LineCharts.dispose()
    }
  }
}
export default LineCharts;