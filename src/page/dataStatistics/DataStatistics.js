import React from 'react';
/**common */
import * as api from '../../api/api-dataStatistics';
//bar
import LargeBar from '../../component/bar/largeBar';
/**component */
import Button from '../../component/button/button';
import DataSwitch from '../../component/dataSwitch/dataSwitch';
import TableMap from '../../component/map/tableMap';
/**单选按钮 */
import SelectBox from '../../component/select-box/SelectBox';
/**列表柱图 */
import TransverseBar from '../../component/bar/transverseBar';
import HorizontalBar from '../../component/bar/horizontalBar';
import PieCharts from '../../component/pie/pieCharts'
/**
 * 数据统计
 * @author msh
 */
class DataStatistics extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
  appear() {
    let me = this;
    let ref = me.refs;
    ref.dataStatisticsPage.style.display = "block"
  }

  disappear() {
    let me = this;
    let ref = me.refs;
    ref.dataStatisticsPage.style.display = "none"
  }

  render() {
    let me = this;
    return (
      <div ref={'dataStatisticsPage'} style={{
        display: 'none'
      }}>
        <div style={{ width: '1920px', height: "1000px", background: '#f5f5f5', position: 'absolute', top: 0 }}>
          <div style={{ width: '1836px', height: "930px", background: '#fff', position: 'absolute', top: 40, left: 40, border: '1px solid #d2d2d2' }}>
            <LargeBar ref="riseData" width={1790} height={274} top={280} left={20} />
            <DataSwitch />
            <TableMap left={21} top={85} ref={'mapList'} display={'none'} width={203} dlWidth={199} colors={'#fc6366'} colorList={'#f4c533'} />
            <SelectBox width={579} left={58} top={234} type={'single'} data={['MAC', '手机', '微信', 'QQ', '设备数', '设备在线率']} />
            <HorizontalBar width={1063} height={358} left={40} top={550} ref={'transverseBarRef'} />
            <PieCharts width={700} height={400} top={530} left={1110} ref="pieChart" />
          </div>
        </div >
      </div>
    )
  }
  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }
  componentDidMount() {
    let me = this;
    //pieChart
    me._tokens.push(api.pieChart.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        me.refs.pieChart._setData(res.data)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
    /**列表 */
    me._tokens.push(api.dataList.send({}).then(res => {
      try {
        if (res.status !== 200) return;

        me.refs.mapList._setData(res.data)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));

    // 数据采集
    me._tokens.push(api.riseData.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        const data = {
          seriesData: [],
          seriesName: [],
          localRise: res.localRise || 0,
          totalRise: res.totalRise || 0
        }
        data.seriesData = res.data.map((t, i) => {
          return t.value
        })
        data.seriesName = res.data.map((t, i) => {
          return t.name
        })
        me.refs.riseData._setData(data)

      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
    /**景点展示 */
    me._tokens.push(api.transverseBar.send({}).then(res => {
      try {
        if (res.status !== 200) return;

        me.refs.transverseBarRef._setData(res)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
  }
  componentWillUnmount() {
    this._clearTokens();
  }
}

export default DataStatistics;
