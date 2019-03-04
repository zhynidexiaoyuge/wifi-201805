import React from 'react';
import * as api from '../../api/api-logManage';
import Panel from '../../component/panel/Panel';
// 左侧导航
import ElescopicNav from '../../component/elescopicNav/elescopicNav';
// table
import Table from '../../component/table/table';
/**按钮 */
import Button from '../../component/button/button';
/**分页 */
import Pagination from '../../component/button/Pagination';
// 搜索框
import SerchInput from '../../component/input/input';
/**
 * 日志管理
 * @author zhy
 */
class LogManage extends React.Component {
  constructor() {
    super();
  }

  appear() {
  }

  disappear() {
  }

  render() {
    const me = this;
    return (
      <div>
        <Panel width={240} height={920} top={40} left={40}>
          <ElescopicNav width={238} ref='elescopicNav' />
        </Panel>
        <Panel width={1590} height={920} top={40} left={290} animation={"animated fadeInRight"}>
          <Table ref="tableList" width={1550} height={800} top={80} left={20}/>
          <SerchInput width={200} height={32} left={400} top={20} onSearch={me._searchFn.bind(this)} />
          <Button left={1440} top={20} data={['导出']} changeClick={this.buttonClick.bind(this)} />
          <Pagination type={1} ref={ref => { me.pagination = ref; }} style={{
            width: 980,
            height: 32,
            bottom: 40,
            right: 40,
          }} />
        </Panel>
      </div>
    )
  }
  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }
  buttonClick(){

  }
  // 搜索功能
  _searchFn(value) {
    console.log(value)
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
  componentDidMount() {
    const me = this;
    me._tokens.push(api.tableList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        let Listdata = {
          tdData: me._formaterData(res.data),
          thData: ["序号", "用户名", "登录名", "登录IP", "操作时间", "登录模块", "操作", "输入条件", "全选"],
          serialNumber:true //是否显示序号
        }
        me.refs.tableList._setData(Listdata)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));

    //左侧导航 
    me._tokens.push(api.elescopicNav.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        me.refs.elescopicNav._setData(res.data)
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

export default LogManage;
