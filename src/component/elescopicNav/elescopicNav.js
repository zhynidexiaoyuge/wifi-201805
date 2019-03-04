import React from 'react';
import './elescopicNav.css';
/**
 * 列表
 * author @zhy
 */
// const list = [
//   {
//     name: '网安支队',
//     index: 0,
//     children: [
//       {
//         name: '游客画像',
//         path: '/tourist'
//       },
//       {
//         name: '目的地画像',
//         path: '/destination'
//       }
//     ]
//   },
//   {
//     name: '情报支队',
//     index: 1
//   },
//   {
//     name: '治安支队',
//     index: 2
//   },
//   {
//     name: '刑侦支队',
//     index: 3,
//   },
//   {
//     name: '禁毒支队',
//     index: 4
//   }
// ];
class ElescopicNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flag: true,
      active:-1,
      activeShow:-1
    };
    this.flag = true
  }
  _setData(d) {
    let me = this;
    me.setState({
      data: d,
    })
  }
  render() {
    let me = this;
    if (!me.state.data) { return null }
    return (
      <div style={{ width: me.props.width }}>
        <div className="toggleBox" ref="toggleBox" onClick={(e) => {
          me._clickNav(e, me.flag);
        }}><a className="toggleName">通州区公安分局</a><span ref="open" className="toggleOpen"></span></div>
        <div className="toggleListBox">
          <ul className="toggleList" ref="toggleList">
            {
              me.state.data.map((t, i) => {
                let activeIndex = me.state.active;
                let flag;
                let actveShow = t.children?'block':'none';
                if(i==activeIndex){
                  flag = true;
                }else{
                  flag = false;
                }
                return (
                  <li key={"zhy" + i} className="animated fadeInDown" style={{ animationDelay: 100 * i + 'ms' }}>
                    <span className={"title " +`${flag? 'active' : 'normal'}`} onClick={(e) => {
                    me._clickItems(e,i);
                  }} >{t.name}  <span className="toggleOpen" style={{display:actveShow}}></span></span>
                    {me.createLi(t.children,i)}
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
  createLi(list,i) {
    const me = this;
    if (!list) return false;
    else {
      let activeShow = i==me.state.activeShow?'block':'none'
      return (
        <ul className="levelMenu" style={{display:activeShow}}>
          {
            list.map((t, i) => {
              return (
                <li key={i} onClick={(e) => {
                  me._click(e);
                }}>{t.name}</li>
              )
            })
          }
        </ul>
      )
    }
  }

  _clickNav(e, flag) {
    e.stopPropagation();
    const me = this;
    let oLi = me.refs.toggleList.getElementsByTagName('li');
    if (flag) {
      me.refs.toggleList.className = "toggleList animated fadeOutUp";
      me.refs.open.style.transform = 'rotate(180deg)'
      setTimeout(function () {
        me.refs.toggleList.style.display = "none"
      }, 500)
    } else {
      me.refs.open.style.transform = 'rotate(0deg)'
      me.refs.toggleList.className = "toggleList animated fadeInDown"
      me.refs.toggleList.style.display = "block"
    }
    me.flag = !flag;
  }
  _clickItems(e,i) {
    if(i==this.state.active){
      this.setState({
        active:-1,
        activeShow:-1
      })
    }else{
      this.setState({
        active:i,
        activeShow:i
      })
    }
  }
  _click(e){
    e.stopPropagation();
  }
}
export default ElescopicNav;