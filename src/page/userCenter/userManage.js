import React from 'react';
import * as api from '../../api/api-userManage';
import Panel from '../../component/panel/Panel';
// 左侧导航
import ElescopicNav from '../../component/elescopicNav/elescopicNav';
// table
import Table from '../../component/table/table';
// 搜索框
import SerchInput from '../../component/input/input';
/**按钮 */
import Button from '../../component/button/button';
/**分页 */
import Pagination from '../../component/button/Pagination';
// 弹框
import Dialog from '../../component/dialog/Dialog';
// 文本框
import TextBox from '../../component/text-box/TextBox';
// 单选框
import SelectBox from '../../component/select-box/SelectBox';
/**下拉框 */
import Select from '../../component/select/Select';


/**
 * 用户管理
 * @author zhy
 */
class userManage extends React.Component {
  constructor() {
    super();
    this.state={};
  }

  appear() {
  }

  disappear() {
  }
  // 下拉框选中事件
  selectChange(e) {
    console.log(e)
  }
  render() {
    const me = this;
    return (
      <div>
        <Panel width={240} height={920} top={40} left={40}>
          <ElescopicNav width={238} ref='elescopicNav' />
        </Panel>
        <Panel width={1590} height={920} top={40} left={290} animation={"animated fadeInRight"}>
          <Table ref="tableList" width={1550} height={800} top={80} left={20} onTrClick={me._editRow.bind(this)} />
          <SerchInput width={200} height={32} left={20} top={20} onSearch={me._searchFn.bind(this)} />
          <Button left={1150} top={20} data={['添加用户', '删除账号', '导出']} changeClick={this.buttonClick.bind(this)} />
          <Pagination type={1} ref={ref => { me.pagination = ref; }} style={{
            width: 980,
            height: 32,
            bottom: 40,
            right: 40,
          }} />
          {/* 编辑用户 */}
          <Dialog title={'编辑用户'} ref={'AddDialog'} width={570} height={680} type={0}>
            <TextBox title={'登录名:'} width={500} left={20} top={30} ref="loginName"/>
            <TextBox title={'用户名:'} width={500} left={20} top={76} ref="userName"/>
            <TextBox title={'密码:'} width={500} left={20} top={124} ref="passWord"/>
            <TextBox title={'邮箱:'} width={500} left={20} top={170} ref="email"/>
            <TextBox title={'手机号:'} width={500} left={20} top={216} ref="telphp"/>
            <TextBox title={'登录IP地址:'} width={512} left={8} top={262} ref="ipAdress"/>
            <TextBox title={'UKEYID:'} width={500} left={20} top={308} ref="UKEYID"/>
            <TextBox title={'有效期:'} width={500} left={20} top={352} ref="validity"/>
            <div style={{
              width: 280,
              height: 40,
              position: 'absolute',
              left: 48,
              top:408,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h1 style={{
                color: '#fff',
                fontSize: 14,
                color:'#000'
              }}>角色:</h1>
              <SelectBox width={200} zIndex={2} data={['民警', '区域管理员']} type={'single'} />
            </div>
            <div style={{
              width: 372,
              position: 'absolute',
              top:450,
              left:0
            }}>
              <p style={{
                color: '#000',
                fontSize: 14,
                lineHeight: '40px'
              }}>所属组织机构:</p>
              <Select width={420} top={2.5} left={100}
                onSelectChange={me.selectChange.bind(this)}
                ref={'selectRef'} />
            </div>
            <div style={{
              width: 372,
              position: 'absolute',
              top:500,
              left:22
            }}>
              <p style={{
                color: '#000',
                fontSize: 14,
                lineHeight: '40px'
              }}>所属地区:</p>
              <Select width={420} top={2.5} left={76}
                onSelectChange={me.selectChange.bind(this)}
                ref={'selectRef2'} />
            </div>
            <Button left={170} top={560} data={['确定', '取消']} changeClick={this.buttonClickSure.bind(this)} />
          </Dialog>
        </Panel>
      </div>
    )
  }
  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }
  //添加删除按钮
  buttonClick(i) {
    console.log(i)
    const me = this;
    switch (i){
      case 0:
        me._appendUser();
        break;
      case 1:
        me._removeUser();
        break;
      default:
        break;
    }
  }
  //弹框button
  buttonClickSure(i) {
    const me = this;
    me.refs.AddDialog._close();
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
  // 搜索功能
  _searchFn(value) {
    console.log(value)
  }
  //删除用户
  _removeUser(){

  }
  //添加用户
  _appendUser(){
    const me = this;
      me.refs.loginName._setData('');
      me.refs.userName._setData( '' )
      me.refs.passWord._setData('')
      me.refs.email._setData( '' )
      me.refs.telphp._setData( '')
      me.refs.ipAdress._setData( "" )
      me.refs.UKEYID._setData( '' )
      me.refs.validity._setData( '' )
    this.refs.AddDialog._open();
  }
  // 编辑表格
  _editRow(e,t,i) {
    const me = this;
    me.setState({
      data:t
    })
    this.refs.AddDialog._open();
  }
  componentDidUpdate(){
    const me = this;
    me.refs.loginName._setData(me.state.data[2]);
    me.refs.userName._setData( me.state.data[1] )
    me.refs.passWord._setData('******')
    me.refs.email._setData( '这里是什么' )
    me.refs.telphp._setData( me.state.data[5] )
    me.refs.ipAdress._setData( "192.168.1.1" )
    me.refs.UKEYID._setData( '这里是什么' )
    me.refs.validity._setData( '这里是什么' )
  }
  componentDidMount() {
    const me = this;
    // 下拉列表
    me.refs.selectRef._setList(['请选择', '投资理财', '行业分类', '重点分类']);
    me.refs.selectRef2._setList(['请选择', '投资理财', '行业分类', '重点分类']);
    me._tokens.push(api.tableList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        let Listdata = {
          tdData: me._formaterData(res.data),
          thData: ["序号", "用户名", "登录名", "组织机构", "角色", "手机", "注册时间", "最近登陆", "全选"],
          serialNumber:true //是否显示序号
        }
        me.refs.tableList._setData(Listdata)
      }
      catch (e) {
        console.log('出现异常', e)
      }
    }));

    const pagination = me.pagination;
    pagination.on('click', function (i) {
      let aaa = "data" + parseInt(Math.random() * 10);
      me._tokens.push(api.tableList.send({}).then(res => {
        try {
          if (res.status !== 200) return;
          let Listdata = {
            tdData: me._formaterData(res[aaa]),
            thData: ["序号", "用户名", "登录名", "组织机构", "角色", "手机", "注册时间", "最近登陆", "全选"],
            serialNumber:true //是否显示序号
          }
          me.refs.tableList._setData(Listdata)
        }
        catch (e) {
          console.log('出现异常', e)
        }
      }));
    });
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

export default userManage;
