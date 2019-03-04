/**数据统计分析---横向柱状图 */
import React from 'react';
import echarts from 'echarts';
const list = [0, 20, 40, 60, 80, 100, 120, 140]
class TransverseBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  _setData(d) {
    this.flag = true;
    this.setState({
      data: d
    })
  }
  _hover(e) {
    this.refs['tooltip' + e].style.display = 'block';
  }
  _out(e) {
    this.refs['tooltip' + e].style.display = 'none';
  }
  _list() {
    let me = this;
    return list.map((s, index) => {
      if (index < 6) {
        return <div key={index} style={{
          width: 1,
          height: 320,
          borderLeft: '0.5px solid #ccc',
          borderRight: '0.5px solid #ccc',
          flex: 1

        }}>
          <span style={{ fontSize: 12, color: '#737980', position: 'absolute', top: 889, marginLeft: -7 }}>{s}</span>
        </div>
      } else {
        return <span key={index} style={{ fontSize: 12, color: '#737980', position: 'absolute', top: 889, left: 923 }}>{list[list.length - 1]}</span>
      }
    })
  }
  _addLlist() {
    let me = this;
    if (!me.state.data) { return null }
    return me.state.data.map((s, index) => {
      let w = s.value;
      let top = undefined;
      if (index < 15) {
        top = (index + 1) * 22

      } else {
        top = 0
      }
      return <li key={index} ref={'list' + index} onMouseOver={me._hover.bind(this, index)} onMouseOut={me._out.bind(this, index)}>
        <div style={{
          width: 1063,
          display: 'flex'
        }}>
          <span style={{
            width: w + 'px',
            height: 16,
            background: "linear-gradient(to right, #257cd7 , #4db9f5)",
            borderRadius: '4px',
            display: 'block',
            marginRight: 10,
            marginTop: 6
          }} ></span>
          <span style={{ width: (875 - w) + 'px', display: 'block', overflow: 'hidden', color: '#1397fe', borderTop: '1px dashed #209dda', marginTop: 14 }}></span>
          <span style={{ float: 'right', fontSize: 16, marginLeft: 30, color: '#2d3640' }}>{s.name}</span>
          <div ref={'tooltip' + index} style={{
            width: 150,
            height: 50,
            background: 'rgba(1,5,7,0.5)',
            color: '#fff',
            fontSize: 16,
            display: 'block',
            position: 'absolute',
            left: 600,
            top: top,
            display: 'none',
            borderRadius: '5px',
            padding: 10
          }} >
            <span>{s.name}</span><br />
            <span>{s.value}</span>
          </div>
        </div>
      </li>
    })
  }
  render() {
    let me = this;
    let animation = me.props.animation || "animated fadeInLeft"
    return (
      <div>
        <div className={animation} style={{
          width: 1063,
          height: 358,
          position: 'absolute',
          left: this.props.left,
          top: this.props.top
        }} >
          <ul>
            {me._addLlist()}
          </ul>
        </div>
        <div  style={{
          display: 'flex',
          width: 888,
          height: 320,
          marginTop: 500,
          marginLeft: 40
        }}>{me._list()}
        </div>
      </div>
    )
  }
  componentDidUpdate() {
    let me = this;
    if (!this.flag) { this.flag = true };
    if (!me.state.data) { return };

  }
  componentDidMount() {

  }
  componentWillUnmount() {

  }
}
export default TransverseBar;