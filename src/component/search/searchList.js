/***综合查询页----查询列表 */
import React from 'react';
import icons from './img/icon.png';
/**
 *
 */
const list = [
  {
    name: '列表1',
    index: 0
  },
  {
    name: '列表2',
    index: 1
  },
  {
    name: '列表3',
    index: 2
  },
  {
    name: '列表4',
    index: 3
  },
  {
    name: '列表5',
    index: 4
  }
];
class SearchList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true
    }
    this.flag = true
  }
  searchClick() {
    console.log(11)
  }
  _setData(d) {
    let me = this;
    me.setState({
      data: d,
    })
  }
  render() {
    let me = this;
    return (
      <div style={{
        position: 'absolute',
        zIndex: 1
      }}>
        <div className={'searchList'} >
          <img src={icons} />
          <span ref={'searchCon'}>查询列表</span>
          <span style={{
            display: 'block',
            width: 20,
            height: 13,
            background: "url('/static/image/down.png') no-repeat",

            position: 'absolute',
            left: 461,
            top: 20,
            cursor: 'pointer',

          }} ref={'searchList'}
            onClick={(e) => {
              me._clickNav(e, me.flag);
            }}
          ></span>

        </div>
        <div className="toggleListBox">
          <ul className="toggleList" ref="toggleList" style={{
            display: 'none',
          }}>
            {
              list.map((t, i) => {
                return (
                  <li key={"zhy" + i} onClick={(e) => {
                    me._clickItems(e);
                  }} className="animated " style={{ animationDelay: 100 * i + 'ms' }}>{t.name}</li>
                )
              })
            }
          </ul>
        </div>
      </div >
    )
  }
  _clickNav(e, flag) {
    e.stopPropagation();
    const me = this;
    let oLi = me.refs.toggleList.getElementsByTagName('li');
    if (flag) {
      me.refs.toggleList.className = "toggleList animated fadeInDown";
      me.refs.searchList.style.transform = 'rotate(180deg)'
      setTimeout(function () {
        me.refs.toggleList.style.display = "block"
      }, 500)
    } else {
      me.refs.searchList.style.transform = 'rotate(0deg)'
      me.refs.toggleList.className = "toggleList animated fadeOutUp"
      me.refs.toggleList.style.display = "none"
    }
    me.flag = !flag;
  }
  _clickItems(e) {
    let me = this;
    console.log(me)

  }
}
export default SearchList