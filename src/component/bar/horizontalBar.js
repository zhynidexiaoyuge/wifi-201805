import React, { Component } from 'react';
import echarts from 'echarts'
import './singleBar.css'

class HorizontalBar extends Component {
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
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                // formatter: function(params) {
                //     return params[1].name + ':' + '<br />' + params[1].value
                // }
            },
            grid: {
                top: '1%',
                left: '2%',
                right: '0%',
                bottom: '10%',
                containLabel: true
            },
            yAxis: [
                {
                    type: 'category',
                    position: 'right',
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: '#2d3640',
                        fontSize: 16
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#bbe1f5'
                        }
                    },
                    data: [],
                }
            ],
            xAxis: [
                {
                    type: 'value',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    axisLabel: {
                        color: '#2d3640',
                        fontSize: 16
                    },
                }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: '16',
                    data: [10, 52, 20, 34, 39, 30, 22],
                    itemStyle: {
                        barBorderRadius: 4,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                            offset: 0,
                            color: '#257cd7'
                        }, {
                            offset: 1,
                            color: '#4db9f5'
                        }])
                    }
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
            </div>

        )
    }
    componentDidUpdate() {
        const me = this;
        // const Max = Math.max(...me.state.data.value)
        me._option.yAxis[0].data = me.state.data.yData;
        // me._option.series[0].data = me.state.data.value.map((t, i) => {
        //     // let length = Max.toString();
        //     // console.log( length )
        //     // return Max
        // })
        me._option.series[0].data = me.state.data.seariesData;
        me.chart.setOption(me._option)
    }
    componentWillUnmount() {
        this.chart.dispose()
    }
}
export default HorizontalBar;
