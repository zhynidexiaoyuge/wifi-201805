import React from 'react';
import './list.css';
/**
 * 列表
 * author @zdd
 */
class BkTaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  _setData(d) {
    let me = this;
    me.setState({
      data: d
    })
  }
  _click(e){
    const me = this;
    e.preventDefault();
    e.stopPropagation();
    window.location.hash = "/controlManage"
  }
  render() {
    let me = this;
    if (!me.state.data) { return null }
    return (
      <div>
        <ul className={'Bklist-wrap'}>
          {
            me.state.data.map((s, i) => {
              return  <li key={"zhy"+i}  onClick={(e) => {
                me._click(e);
              }} className="animated fadeInDown" style={{animationDelay:100 * i + 'ms'}}><h3>{s.name}</h3><p className="Minner">{s.id}</p><p>{s.text}</p></li>
            })
          }
        </ul>
        <div className="wholeBtn animated fadeInDown">
          <div>查看全部</div>
        </div>
      </div>
    )
  }
  componentDidUpdate(){
  }
}
export default BkTaskList;