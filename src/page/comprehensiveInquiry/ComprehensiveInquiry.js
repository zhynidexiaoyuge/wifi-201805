import React from 'react';
import Panel from '../../component/panel/Panel'
import * as api from '../../api/api-comprehensiveInquiry';


/**按钮 */
import Button from '../../component/button/button';
/**查询 */
import SearchList from '../../component/menuList/searchList';
import AddList from '../../component/menuList/addList';

import Table from '../../component/table/table';
import TzMap from '../../component/map/tzMap';

/**
 * 综合查询
 * @author zhy
 */
class ComprehensiveInquiry extends React.Component {
  constructor() {
    super();
    this.flag = true
  }

  appear() {
    let me = this;
    let ref = me.refs;
    me.refs.tzMap._setData();
    ref.compreshPage.style.display = "block"
  }

  disappear() {
    let me = this;
    let ref = me.refs;
    ref.compreshPage.style.display = "none"
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
  buttonClick(e) {
    console.log(e)
  }
  /**上一页 */
  _previousPages() {
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
  _nextPages() {
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
  /*点击列表 */
  _showList() {
    if (this.flag) {
      console.log(77)
      this.refs.panel.style.display = "block"
      this.refs.panel.className = "animated  fadeInLeft"
    }
  }
  _hide() {
    this.refs.panel.className = "animated  fadeOutLeft"
  }
  /**列表里边上一页 */
  _firstPage() {
    let me = this;
    me._tokens.push(api.tableList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        let Listdata = {
          tdData: me._formaterData(res.data),
          thData: ["序号", "用户名", "登录名", "组织机构", "角色", "手机", "注册时间", "最近登陆", "全选"],
          serialNumber: true //是否显示序号
        }
        me.refs.tableList._setData(Listdata)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));
  }
  _lastPage() {
    let me = this;
    me._tokens.push(api.firstPage.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        let Listdata = {
          tdData: me._formaterData(res.data),
          thData: ["序号", "用户名", "登录名", "组织机构", "角色", "手机", "注册时间", "最近登陆", "全选"],
          serialNumber: true //是否显示序号
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
      }} ref={'compreshPage'}>

        <TzMap width={1920} height={1080} ref="tzMap"/>
        <Panel width={500} height={89} left={40} top={41}>
          <Button left={10} top={20} data={['添加ZD人', '导入ZD人', '添加设备', '添加场所']} changeClick={this.buttonClick.bind(this)} />
        </Panel>
        <div ref={'panel'} style={{ display: 'none', position: 'absolute', width: 1355, height: 758, left: 540, top: 203 }} className={'animated fadeInLeft'}>
          <Panel ref={'panel'} width={1355} height={758}  >
            <Button left={1100} top={1} data={['添加ZD人', '导出']} />
            <Table ref="tableList" width={1341} height={696} top={52} left={0} />
            <div className={'paginationListLine'}>
              <span style={{ marginLeft: 63 }}>返回列表</span>
              <span onClick={me._hide.bind(this)} className={'markPointer'}></span>
              <span onClick={me._firstPage.bind(this)} style={{ position: 'absolute', right: 68, top: 0 }} >上一页</span>
              <span onClick={me._lastPage.bind(this)} style={{ marginLeft: 1153 }}>下一页</span>
            </div>
          </Panel>
        </div>
        <Panel width={500} height={820} left={40} top={141} >
          <SearchList ref={'searchListRef'} type={0} contents={'点击查询'} />
          <AddList ref={'addListRef'} _previousPage={me._previousPages.bind(this)}
            _nextPage={me._nextPages.bind(this)}
            _show={me._showList.bind(this)}
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
          thData: ["序号", "用户名", "登录名", "组织机构", "角色", "手机", "注册时间", "最近登陆", "全选"],
          serialNumber: true //是否显示序号
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

export default ComprehensiveInquiry;
