import React from 'react';
import './tableMap.css';
class TableMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  _setData(d) {
    let me = this;
    me.setState({
      data: d
    })
  }
  _addContent() {
    let me = this;
    let colors = undefined;
    let content = undefined;
    return me.state.data.map((s, i) => {
      if (i === 0) {
        colors = this.props.colors || '#1f7ccc';
        content = "人"
      }
      else if (i === 1) {
        colors = this.props.colorList || '#21ace0';
        content = "台"
      }
      else if (i === 2) {
        colors = '#188daa'
      }
      else if (i === 3) {
        colors = '#1ea898'
      }
      else if (i === 4) {
        colors = '#1f7ccc'
      }
      else if (i === 5) {
        colors = '#21ace0'
      }
      else if (i === 6) {
        colors = '#6579d4'
      }
      else if (i === 7) {
        colors = '#508bbc'
      }
      return <dl key={i} className={'tableMap'} style={{
        borderColor: colors,
      }}>
        <dt style={{
          width: this.props.width || 223,
          height: 52,
          fontSize: 22,
          textAlign: 'center',
          backgroundColor: colors,
          color: '#fff',
          borderRadius: '10px 10px 0px 0px'

        }}>{s.name}</dt>
        <dd style={{
          width: this.props.dlWidth || 219,
          height: 62,
          border: '2px solid',
          borderColor: colors,
          textAlign: 'center',

        }}>
          <span style={{ fontSize: '26px', color: colors }}>{s.value}</span>
          <i style={{ fontSize: '18px', marginLeft: 5, display: this.props.display }}>{content}</i>
        </dd>
      </dl >
    })
  }
  render() {
    let me = this;
    if (!me.state.data) { return null }
    let animation = me.props.animation || "animated fadeInLeft"
    return (
      <div style={{
        position: 'absolute',
        left: this.props.left,
        top: this.props.top,
        display: 'flex',
        flexDirection: 'cloumn'
      }} className={animation}>
        {me._addContent()}
      </div>
    )
  }
}
export default TableMap;