import React from 'react';
// component
import * as api from '../../api/api-home-page';

import Panel from '../../component/panel/Panel';
//bar
import SingleBar from '../../component/bar/singleBar';
/**新增 */
import NewlyIncreased from '../../component/list/NewlyIncreased';
/**ZD人活跃趋势 */
import LineCharts from '../../component/lineChart/LineChart';
/**BK任务列表 */
import BkTaskList from '../../component/list/BKTaskList';
/**指针 */
import Pointer from '../../component/pointer/Pointer';
/**地图列表 */
import TableMap from '../../component/map/tableMap';
import HomeMap from '../../component/map/homeMap';

/**
 * 首页
 * @author zhy
 */
class HomePage extends React.Component {
  constructor() {
    super();
    const me = this;
  }

  render() {
    const me = this;
    return (
      <div>
        <div ref={'homePage'} style={{
          display: 'none'
        }}>
          <Panel width={500} height={300} top={40} left={1380} animation={'animated fadeInRight'}>
            <SingleBar ref="riseData" width={470} height={220} top={80} left={12} />
          </Panel>
          <Panel width={500} height={300} top={660} left={1380} animation={'animated fadeInRight'}>
            <NewlyIncreased width={500} ref={'newlyIncreasedRef'} />
          </Panel>
          <Panel width={500} height={300} top={350} left={1380} animation={'animated fadeInRight'}>
            <LineCharts ref={'activeTrendRef'} />
          </Panel>
          <Panel width={500} height={670} top={40} left={40}>
            <BkTaskList ref="taskList" />
          </Panel>
          <Panel width={500} height={239} top={720} left={40}>
            <Pointer ref={'pointerLeft'} left={20} top={32} id={'pointerOne'} type={0} startColor={'#4db9f5'} endColor={'#257cd7'} title={'今日设备在线率'} />
            <Pointer ref={'pointerRight'} left={262} top={32} id={'pointerTwo'} startColor={'#fedd86'} endColor={'#f6c345'} title={'今日场所在线率'}
            />
          </Panel>
          <TableMap left={569} top={41} ref={'mapList'} />
          <HomeMap />
        </div>
      </div>
    )
  }
  appear() {
    let me = this;
    let ref = me.refs;
    ref.homePage.style.display = "block"
    ref.pointerLeft.appear();
    ref.pointerRight.appear()
  }
  disappear() {
    let me = this;
    let ref = me.refs;
    ref.homePage.style.display = "none"
    ref.pointerLeft.disappear();
    ref.pointerRight.disappear()
  }
  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }
  componentDidMount() {
    let me = this;
    /**test */
    me._tokens.push(api.personnelIntegral.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        me.refs.newlyIncreasedRef._setData(res.data)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
    /**地图旁边 */
    me._tokens.push(api.mapList.send({}).then(res => {
      try {
        if (res.status !== 200) return;

        me.refs.mapList._setData(res.data)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));


    /**ZD人活跃趋势 */
    me._tokens.push(api.activeTrend.send({}).then(res => {

      try {
        if (res.status !== 200) return;
        me.refs.activeTrendRef._setData(res);
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
    // BK任务列表
    me._tokens.push(api.BktaskList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        me.refs.taskList._setData(res.data)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
    /**仪表盘 */
    me._tokens.push(api.pointer.send({}).then(res => {

      try {
        if (res.status !== 200) return;
        me.refs.pointerLeft._setData(res.data[0])
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
    me._tokens.push(api.pointer.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        me.refs.pointerRight._setData(res.data[1])
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

export default HomePage;
