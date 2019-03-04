/*碰撞分析--------任务栏列表 */
import React from 'react';
import bgs from '../list/img/clock.png';
import bgActive from '../list/img/clockActive.png';
/*弹框 */
import Dialog from '../../component/dialog/Dialog'
class TaskList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  _setData(d) {
    this.setState({
      data: d
    })
  }
  _clickName(e) {
  }
  _addList() {
    let me = this;
    if (!me.state.data) { return null }
    return me.state.data.map((s, index) => {
      return <li key={index} >
        <span><i onClick={me._clickName.bind(this, index)}>{s.name}</i><i className={'clock'} ></i></span>
        <span>{s.time}</span>
        <span>{s.state}</span>
      </li >
    })
  }
  render() {
    let me = this;
    return (
      <div style={{
        position: 'absolute',
        top: 148
      }}>
        <ul className={'taskList'}>
          <li className={'titleList'} >
            <span>任务名称</span>
            <span>任务耗时</span>
            <span>任务状态</span>
          </li>
          {
            me._addList()
          }
        </ul>
      </div>
    )
  }
}
export default TaskList;
