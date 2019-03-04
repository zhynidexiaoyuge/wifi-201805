import React from 'react';
import * as api from '../../api/api-roleManage';
// 搜索框
import SerchInput from '../../component/input/input';
/**按钮 */
import Button from '../../component/button/button';
// table
import Table from '../../component/table/table';
// 弹框
import Dialog from '../../component/dialog/Dialog';

/**
 * 角色管理
 * @author zhy
 */
class RoleManage extends React.Component {
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
      <div style={{ width: '1920px', height: "1000px", background: '#f5f5f5', position: 'absolute', top: 0 }}>
        <div style={{ width: '1840px', height: "920px", background: '#fff', position: 'absolute', top: 40, left: 40, border: '1px solid #d2d2d2' }}>
          <SerchInput width={167} height={33} left={20} top={21} onSearch={me._searchFn.bind(this)} />
          <Button data={['添加角色','删除']} left={1580} top={14} changeClick={me._btnClick.bind(this)} />
          <Table ref="tableList" width={1800} height={800} top={80} left={20} onRoleManage={me._editTd.bind(this)}/>
          <Dialog title={'添加业务角色'} ref={'AddRole'} width={780} height={550} type={0}>
            添加业务角色
          </Dialog>
          <Dialog title={'成员列表'} ref={'roleList'} width={780} height={550} type={0}>
            成员列表
          </Dialog>
        </div>
      </div>
    )
  }
  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }
  _editTd(e,t,i){
    if(i==1 && e.target.innerHTML=="区域管理员"){
      this.refs.AddRole._open()
    }
    if(i==4){
      this.refs.roleList._open()
    }
  }
  _btnClick(){

  }
  _searchFn(){

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
          thData: ["序号", "角色名称", "继承角色", "角色描述", "用户数", "全选"],
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

export default RoleManage;
