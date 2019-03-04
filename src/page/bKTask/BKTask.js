import React from 'react';
import * as api from '../../api/api-bkTask';
import Panel from '../../component/panel/Panel';
/*下拉框 */
import Select from '../../component/select/Select'
// 搜索框
import SerchInput from '../../component/input/input';
import SearchList from '../../component/menuList/searchList';
import AddList from '../../component/menuList/addList';
/**按钮 */
import Button from '../../component/button/button';
/*表格 */
import Table from '../../component/table/table';
/**地图 */
import TzMap from '../../component/map/tzMap';
/**
 * BK管理
 * @author msh
 */
class BKTask extends React.Component {
  constructor() {
    super();
    this.flag = true
  }

  appear() {
    let me = this;
    let ref = me.refs;
    ref.bkTask.style.display = "block"
    me.refs.tzMap._setData()
  }

  disappear() {
    let me = this;
    let ref = me.refs;
    ref.bkTask.style.display = "none"
  }
  /**下拉框 */
  selectChange(e) {
    console.log(e)
  }
  /**搜索框 */
  _searchFn(value) {
    console.log(value)
  }
  /**上一页 */
  _previousPageIns() {
    let me = this;
    me._tokens.push(api.leftList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        me.refs.addListRef._setData(res.data)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
  }
  /**下一页 */
  _nextPageIns() {
    let me = this;
    me._tokens.push(api.nextList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        me.refs.addListRef._setData(res.data)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
  }
  /**点击列表显示右边 */
  _showLists() {
    if (this.flag) {
      this.refs.panel.style.display = "block"
      this.refs.panel.className = "animated  fadeInLeft"
    }
  }
  /**点击右边隐藏右边 */
  _hides() {
    this.refs.panel.className = "animated  fadeOutLeft"
  }
  _formaterData(listData) {
    const me = this;
    const thLength = listData.length;
    function getLength(obj) {
      let count = 0;
      for (var i in obj) {
        count++;
      }
      return count;
    }
    let arr = listData.map(function (t, i) {
      let length = getLength(t);
      let obj = {};
      let arr2 = [];
      for (let s in t) {
        arr2.push(t[s])
      }
      for (let j = 0; j < length; j++) {
        obj["td" + j] = arr2[j];
      }
      return obj
    })
    return arr;
  }
  /**右侧列表分页 */
  _firstPage() {
    let me = this;
    me._tokens.push(api.tableList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        let Listdata = {
          tdData: me._formaterData(res.data),
          thData: ["手机型号", "首次出现时间", "首次出现场所", "最近出现时间", "最近出现场所", "出现次数", "是否布控人", "选择"],
          serialNumber: false //是否显示序号
        }
        me.refs.tableList._setData(Listdata)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
  }
  /**右侧列表分页 */
  _lastPage() {
    let me = this;
    me._tokens.push(api.firstPage.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        let Listdata = {
          tdData: me._formaterData(res.data),
          thData: ["手机型号", "首次出现时间", "首次出现场所", "最近出现时间", "最近出现场所", "出现次数", "是否布控人", "选择"],
          serialNumber: false //是否显示序号
        }
        me.refs.tableList._setData(Listdata)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
  }
  render() {
    let me = this;
    return (
      <div style={{
        display: 'none'
      }} ref={'bkTask'}>
        <TzMap width={1920} height={1080} ref="tzMap"/>
        <Panel width={500} height={108} left={40} top={41}>
          <Select width={146} left={16} zIndex={10} top={20} onSelectChange={me.selectChange.bind(this)}
            ref={'selectRef2'} />
          <SerchInput width={255} height={32} left={170} top={21} onSearch={me._searchFn.bind(this)} />
          <div style={{ position: 'absolute', left: 25, top: 71, color: '#fc494d', fontSize: 16 }}><span>xxx任务</span>共发现<span>8个目标</span></div>
        </Panel>
        <div ref={'panel'} style={{ display: 'none', position: 'absolute', width: 1355, height: 758, left: 540, top: 203 }} className={'animated fadeInLeft'}>
          <Panel ref={'panel'} width={1355} height={758}  >
            <Button left={1100} top={1} data={['添加ZD人', '导出']} />
            <Table ref="tableList" width={1341} height={696} top={52} left={0} />
            <div className={'paginationListLine'}>
              <span style={{ marginLeft: 63 }}>返回列表</span>
              <span onClick={me._hides.bind(this)} className={'markPointer'}></span>
              <span onClick={me._firstPage.bind(this)} style={{ position: 'absolute', right: 68, top: 0 }} >上一页</span>
              <span onClick={me._lastPage.bind(this)} style={{ marginLeft: 1153 }}>下一页</span>
            </div>
          </Panel>
        </div>
        <Panel width={500} height={820} left={40} top={141} >
          <SearchList contents={'添加布控任务'} ref={'searchListRef'} />
          <AddList types={1} ref={'addListRef'} _previousPageIn={me._previousPageIns.bind(this)}
            _nextPageIn={me._nextPageIns.bind(this)}
            _showList={me._showLists.bind(this)}
          />
        </Panel>

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
    
    me.refs.selectRef2._setList(['全部任务', '发现目标', '布控中', '已结束'])
    me._tokens.push(api.leftList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        me.refs.addListRef._setData(res.data)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
    me._tokens.push(api.tableList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        let Listdata = {
          tdData: me._formaterData(res.data),
          thData: ["手机型号", "首次出现时间", "首次出现场所", "最近出现时间", "最近出现场所", "出现次数", "是否布控人", "选择"],
          serialNumber: false //是否显示序号
        }
        me.refs.tableList._setData(Listdata)
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

export default BKTask;
