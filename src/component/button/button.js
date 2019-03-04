import React from 'react';
/**css */
import './button.css';


/**
 * data：data={['查询','导出','重置']}
 * 点击事件里边的是参数 index
 * @zdd
 */
class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tabActive: ''
    }
  }
  _click(index) {
    let me = this;
    me.setState({
      tabActive: index
    });
    this.props.changeClick(index)
  }
  render() {
    let me = this;
    let active = me.state.tabActive;

    return (
      <div style={{
        display: 'flex',
        position: 'absolute',
        left: this.props.left,
        top: this.props.top

      }}>
        {
          this.props.data.map((s, i) => {
            return <div key={i} onClick={this._click.bind(this, i)} className={`btn ${active === i ? 'btnActive' : ''}`}><a>{s}</a>
            </div>
          })
        }
      </div >
    )
  }
  componentDidMount() {
  }
}
export default Button;