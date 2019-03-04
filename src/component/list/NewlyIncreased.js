import React from 'react';
import './list.css';
/**
 * 列表
 * author @zdd
 */
class NewlyIncreased extends React.Component {
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
  render() {
    let me = this;
    if (!me.state.data) { return null }
    return (
      <div>
        <div style={{
          position: 'relative',
          height: "299px",
          overflow: 'hidden'
        }}>
          <div id={'news'} ref={'news'}>
            <ul className={'list-wrap'} ref={'oUl'}>
              {me.state.data.map((s, i) => {
                return < li className="animated fadeInDown" key={i} style={{ animationDelay: 100 * i + 'ms' }}>{s}</li>
              })}
            </ul>
            <ul className={'list-wrap'} ref={'oUlFloow'}></ul>
          </div>
        </div>
      </div>
    )
  }
  roll() {
    let me = this;
    me.liEle = me.refs.oUl;


    me.cloneUlEle = me.refs.oUlFloow;
    me.container = me.refs.news;
    if (me.liEle.children.length > 5) {
      me.cloneUlEle.innerHTML = me.liEle.innerHTML;
      let num = 0;
      me._timer = setInterval(function () {
        num--;
        for (let i = 0; i < me.refs.oUl.children.length; i++) {
          me.refs.oUl.children[i].className = ''
        }
        if (num <= -(me.container.offsetHeight / 2)) {

          num = 0;
        } else {
          me.container.style.top = num + 'px';
        }
      }, 30)
    }
  }
  componentDidUpdate() {
    let me = this;
    clearInterval(me._timer);
    me.roll();
    me.container.addEventListener('mouseover', function () {
      clearInterval(me._timer);
    });
    me.container.addEventListener('mouseout', function () {
      me.roll();
    })
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }
}
export default NewlyIncreased;