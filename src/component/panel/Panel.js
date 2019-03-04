import React from 'react';
import './panel.css';

/**
 * 组件框
 */
class Panel extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
  }

  render() {
    const me = this;
    const props = me.props;
    const padding = me.props.padding || 0;
    const type = props.type;
    const animation = me.props.animation || "animated fadeInLeft"
    return (
      <div style={{
        width: me.props.width,
        height: me.props.height,
        border: '1px solid #d2d2d2',
        background: '#fff',
        padding: padding,
        boxSizing: 'border-box',
        position: 'absolute',
        left: me.props.left,
        top: me.props.top,
        display: me.props.display

      }} className={animation}>
        {me.props.children}
      </div>
    )
  }
}

export default Panel;
