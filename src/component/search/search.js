/***综合查询页----点击查询 */
import React from 'react';
import './search.css'
/**
 * 搜索框
 */
import bgs from './img/search.png';

/*下拉框 */
import Select from '../select/Select';

const list = [
  {
    name: '通州区',
    val: '123'
  },
  {
    name: '通州区3333',
    val: '12345'
  },
  {
    name: '通州区eeee',
    val: '12345'
  }
]
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true
    }
    this.flag = true
  }
  _setData(d) {
    let me = this;
    me.setState({
      data: d,
    })
  }
  /**点击查询 */
  _search(e) {
    const me = this;
    console.log(me.refs.inputVal.value)
    return me.refs.inputVal.value
  }
  /*文本框获取焦点*/
  _appear(e) {
    const me = this;
    me.refs.toggleList.className = "toggleList animated fadeInDown"
    me.refs.toggleList.style.display = "block";
    me.refs.searchList.style.transform = 'rotate(0deg)'
  }
  /**点击收起 */
  _disappears(e) {
    e.stopPropagation();
    const me = this;
    let oLi = me.refs.toggleList.getElementsByTagName('li');
    me.refs.searchList.style.transform = 'rotate(180deg)'
    me.refs.toggleList.className = "toggleList animated fadeInUp"
    setTimeout(function () {
      me.refs.toggleList.style.display = "none"
    }, 500)
  }
  /**列表 */
  _clickItems(e) {

  }
  // 下拉框选中事件
  selectChange(e) {
    console.log(e)
  }
  render() {
    let me = this;
    return (
      <div style={{
        zIndex: 2
      }}>
        <div className={'wrapList'}>
          <img src={bgs} style={{
            marginRight: 28,
            cursor: 'pointer'
          }} onClick={(e) => {
            me._search(e);
          }} />
          <input type="text" placeholder={"点击查询"}
            style={{
              width: this.props.width,
              height: this.props.height,
            }} ref={'inputVal'} onFocus={(e) => {
              me._appear(e);
            }} />
          <a style={{
            display: 'block',
            width: 20,
            height: 13,
            background: "url('/static/image/down.png') no-repeat",
            position: 'absolute',
            left: 461,
            top: 20,
            cursor: 'pointer'
          }} ref={'searchList'} onClick={(e) => {
            me._disappears(e);
          }} />
          <div className="toggleListBox">
            <ul className="toggleList" ref="toggleList" style={{
              display: 'none'
            }}>
              {
                list.map((t, i) => {
                  return (
                    <li key={"zhy" + i} onClick={(e) => {
                      me._clickItems(e);
                    }} className="animated fadeInDown" >{t.name}</li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    let me = this;
  }
}
export default Search