import React from 'react';
import './input.css';

/**
 * 组件框
 */
class Input extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
  }

  render() {
    const me = this;
    return (
      <div style={{
        width: me.props.width,
        height: me.props.height,
        position: 'absolute',
        left: me.props.left,
        top: me.props.top,
       }}>
          <input type="text" style={{
            width: me.props.width,
            height: me.props.height,
            position: 'absolute',
            left: 0,
            border:'1px solid #999999',
            padding:'0 40px 0 20px',
            top: 0,
            fontSize:'14px'
           }} placeholder={"请输入姓名或账号"} ref="inputValue" />
          <a onClick={(e)=>{
            me._search(e);
          }} style={{display:'inline-block',cursor:'pointer', width:30,height:34,position:'absolute',right:'-62px',top:0,background:"url('/static/image/search.png') center center no-repeat"}}></a>
      </div>
    )
  }
  _search(e){
    const me = this;
    let value = me.refs.inputValue.value;
    let onSearch = me.props.onSearch;
    if (!onSearch || typeof onSearch !== 'function') {
      throw new Error(`The props.onSelectChange of the Select component ${me.props.name || ''} is not correct.`)
    } else {
      onSearch(value);
    }
  }
}

export default Input;
