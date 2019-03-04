import React, { Component } from 'react';
import echarts from 'echarts'
import './singleBar.css'

class SingleBar extends Component {
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
    // if (!me.state.data) { return false }
    me.chart = echarts.init(box);
    me._option = {
      grid: {
        top:'20%',
        left: '0%',
        right: '0%',
        bottom: '10%',
        containLabel: true
      },
      xAxis : [
        {
          type : 'category',
          axisTick:{
            show:false
          },
          axisLabel:{
            color:'#000'
          },
          axisLine:{
            lineStyle:{
              color:'#d2d2d2'
            }
          },
          data : [],
        }
      ],
      yAxis : [
        {
          type : 'value',
          axisLine:{
            show:false
          },
          axisTick:{
            show:false
          },
          axisLabel:{
            color:'#000'
          }
        }
      ],
      series : [
        {
          name:'直接访问',
            type:'bar',
            barGap:'-100%',
            barWidth: '30',
            silent: true,
            data:[60, 60, 60, 60, 60, 60, 60],
            itemStyle:{
              color: 'rgba(246,246,246,.7)',
            }
        },
        {
          name:'直接访问',
            type:'bar',
            barWidth: '30',
            data:[10, 52, 20, 34, 39, 30, 22],
            itemStyle:{
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#4db8f5'
              }, {
                offset: 1,
                color: '#257dd7'
              }])
            }
        }
      ]
    }
   
  };
  render() {
    return (
      <div>
        <div ref={'box'} style={{
          position: 'absolute',
          left: this.props.left,
          top: this.props.top,
          width: this.props.width,
          height: this.props.height,
        }}>
        </div>
        <div className="localRise rise">
          <div className="riseTitle">本周采集M*</div>
          <div className="riseCount" ref="localRise">1245345474</div>
        </div>
        <div className="totalRise rise">
          <div className="riseTitle">本M*</div>
          <div className="riseCount" ref="totalRise">1245345474</div>
        </div>
      </div>
      
    )
  }
  componentDidUpdate(){
    const me = this;
    const Max = Math.max(...me.state.data.seriesData)
    me._option.xAxis[0].data = me.state.data.seriesName;
    me._option.series[0].data = me.state.data.seriesData.map((t,i)=>{
      // let length = Max.toString();
      // console.log( length )
      return Max
    })
    me._option.series[1].data = me.state.data.seriesData;
    me.chart.setOption(me._option)
    me.refs.localRise.innerHTML =  me.state.data.localRise;
    me.refs.totalRise.innerHTML =  me.state.data.totalRise
  }
}
export default SingleBar;
