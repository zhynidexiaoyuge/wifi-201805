import React from 'react';
import * as api from '../../api/api-collisionAnalysis';
import Panel from '../../component/panel/Panel';
// table
import Table from '../../component/table/table';
/**分页 */
import Pagination from '../../component/button/Pagination';
/**按钮 */
import Button from '../../component/button/button';
// 弹框
import Dialog from '../../component/dialog/Dialog';

/**下拉框 */
import Select from '../../component/select/Select'
// 搜索框
import SerchInput from '../../component/input/input';
/**任务列表 */
import TaskList from '../../component/taskList/TaskList';
/**
 * 碰撞分析
 * @author zhy
 */
const dialogChildrens = ['dialogInfo', 'onlineRecord', 'trajectory', 'appApplication'];
class CollisionAnalysis extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0
    };
  }

  appear() {
    let me = this;
    let ref = me.refs;
    ref.collisionAnalysisPage.style.display = "block"
  }

  disappear() {
    let me = this;
    let ref = me.refs;
    ref.collisionAnalysisPage.style.display = "none"
  }
  // 下拉框选中事件
  selectChange(e) {
    console.log(e)
  }
  // 搜索功能
  _searchFn(value) {
    console.log(value)
  }
  /*添加任务 */
  _btnClick() {

  }
  render() {
    const me = this;
    return (
      <div style={{
        display: 'none'
      }} ref={'collisionAnalysisPage'}>
        <Panel width={1430} height={920} top={40} left={450} animation={"animated fadeInRight"}>
          <Button left={1170} top={20} data={['列为ZD人', '导出']} changeClick={this.buttonClick.bind(this)} />
          <Table ref="tableList" width={1390} height={800} top={80} left={20} onCollisionAnalysis={me._editTd.bind(this)} />
          <Pagination type={1} ref={ref => { me.pagination = ref; }} style={{
            width: 980,
            height: 32,
            bottom: 40,
            right: 40,
          }} />
          <Dialog title={'编辑用户'} ref={'AddDialog'} width={780} height={550} type={1} onTitleClick={this._dialogTitleClick.bind(this)}>
            <div ref="dialogInfo" style={{ display: 'none' }}>dialogInfo</div>
            <div ref="onlineRecord" style={{ display: 'none' }}>onlineRecord</div>
            <div ref="trajectory" style={{ display: 'none' }}>trajectory</div>
            <div ref="appApplication" style={{ display: 'none' }}>appApplication</div>
          </Dialog>
        </Panel>
        <Panel width={400} height={920} top={40} left={40}>

          <Select width={127} top={21} left={15}
            onSelectChange={me.selectChange.bind(this)}
            ref={'selectRef2'} />
          <SerchInput width={167} height={33} left={158} top={21} onSearch={me._searchFn.bind(this)} />
          <Button data={['添加']} left={20} top={77} changeClick={me._btnClick.bind(this)} />
          <TaskList ref={'taskListRef'} />
        </Panel>
      </div>
    )
  }
  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }
  _dialogTitleClick(e, t, i) {
    const me = this;
    for (let j = 0; j < dialogChildrens.length; j++) {
      me.refs[dialogChildrens[j]].style.display = 'none';
    }
    me.setState({
      activeIndex: i
    })
    me.refs[dialogChildrens[i]].style.display = 'block';
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
  buttonClick() {

  }
  // 单击event
  _editTd(e, t, i) {
    const me = this;
    if (i == 0) {
      me.refs.AddDialog._open();
      me.refs[dialogChildrens[me.state.activeIndex]].style.display = 'block';
    }
  }
  _editRow(e, t, i) {
    const me = this;
    me.setState({
      data: t
    })
    // this.refs.AddDialog._open();
  }
  componentDidMount() {
    const me = this;
    me.refs.selectRef2._setList(['全部任务', '进行中', '已完成']);
    me._tokens.push(api.tableList.send({}).then(res => {
      try {
        if (res.status !== 200) return;
        let Listdata = {
          tdData: me._formaterData(res.data),
          thData: ["M* *", "手机型号", "首次出现时间", "首次出现场所", "最近出现时间", "最近出现场所", "是否ZD人", "选择"],
          serialNumber: false //是否显示序号
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
            thData: ["M* *", "手机型号", "首次出现时间", "首次出现场所", "最近出现时间", "最近出现场所", "是否ZD人", "选择"],
            serialNumber: false //是否显示序号
          }
          me.refs.tableList._setData(Listdata)
        }
        catch (e) {
          console.log('出现异常', e)
        }
      }));

    });
    /**任务分析碰撞 */
    me._tokens.push(api.taskList.send({}).then(res => {
      try {
        if (res.status !== 200) return;

        me.refs.taskListRef._setData(res.data)
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

export default CollisionAnalysis;
