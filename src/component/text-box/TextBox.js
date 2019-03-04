import React from 'react';
import './textBox.css';

/**
 * author  xf
 * name  文字和文字框
 *
 * usemethod：
 *
 * import TextBox 后
 *
 * <TextBox title={"文本"} width={"800"} height={"600"} placeholder={'xxx'} ref='回调函数名称' />
 *
 * 回调函数里调用getText()可以得到文本框里面的内容
 *
 * width 宽度为文字和框总宽度
 *
 * 设置height为大框，默认单行不用设置height,默认40px
 *
 * type 值为 true 时，有背景色
 *
 * widthTitle 可以设置文字标题的长度
*/

class TextBox extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  _setData(d) {
    this.lock = true;
    this.setState({
      data: d
    });
  }

  _getText() {
    let me = this;
    let dist = {};
    dist[me.props.title] = me.refs.input.value;
    if (!me.props.title) { return me.refs.input.value }
    return dist;
  }

  componentDidUpdate() {
    let me = this;
    if (!me.lock) { return }
    me.refs.input.value = me.state.data;
    me.lock = false;
  }

  render() {
    let me = this;
    return (
      <div className={'text-input-box'} style={{
        width: me.props.width,
        height: me.props.height || 40,
        lineHeight: '40px',
        textAlign:'right',
        position:"absolute",
        left:me.props.left ||0,
        top:me.props.top ||0
      }}>
        {me.props.title ? <h1 style={{ fontSize: 14, minWidth: me.props.widthTitle || 60 }}>{me.props.title}</h1> : ''}
        <textarea style={{
          height: me.props.height || 32,
          lineHeight: !me.props.height ? '32px' : '',
          paddingTop: !me.props.height ? '' : 6.5,
          width: me.props.width,
          marginLeft: me.props.title ? 20 : 0,
          marginTop: me.props.title ? 2.5 : 5.5,
          background: me.props.type ? 'rgba(1,252,252,.1)' : 'transparent'
        }} placeholder={me.props.placeholder} ref={'input'} />
      </div>
    )
  }
};

export default TextBox;
