import React from 'react';
import './nav.css';
/**
 * 导航列表
 * @type {[null,null,null,null,null]}
 * {{name:'名称',path:'路径'}}
 */
const navList = [
  {
    name: '首页',
    path: '/homepage',
    index: 0,
    icon: 'home'
  },
  {
    name: '综合查询',
    index: 1,
    path: '/comprehensiveInquiry',
    icon: 'search'
  },
  {
    name: 'BK管理',
    path: '/bKTask',
    index: 2,
    icon: 'address'
  },
  {
    name: '碰撞分析',
    path: '/collisionAnalysis',
    index: 3,
    icon: 'anysis'
  },
  {
    name: '数据统计',
    path: '/dataStatistics',
    index: 4,
    icon: 'count'
  },
  {
    name: '用户管理',
    path: '/userManage',
    index: 5
  },
  {
    name: '组织机构管理',
    path: '/organizationManage',
    index: 6
  },
  {
    name: '角色管理',
    path: '/roleManage',
    index: 7
  },
  {
    name: '日志管理',
    path: '/logManage',
    index: 8
  }
];
const subNav = [

]

/**
 * 导航
 * @author msh
 */
class Navigation extends React.Component {
  constructor() {
    super();
    const me = this;
    const width = 1920;
    const height = 80;
    const timer = null;
    const outTimer = null;

    const active = me._setActive().name;
    const activeIndex = me._setActive().index;
    me.oldPath = '';
    me.state = {
      active,
      activeIndex: activeIndex

    };
    me._width = width;
    me._height = height;
  }
  _setActive() {
    let hash = window.location.hash;
    if (hash == "#/controlManage") {
      hash = "#/homepage"
    }
    const item = navList.find((item) => {
      return hash.indexOf(item.path) != -1;
    });
    const name = item ? item.name : '全域营销';
    return item;
  }

  render() {
    const me = this;
    const width = me._width;
    const height = me._height;
    return (
      <div
        className={'nav animated'}
        style={{
          width: me.props.width,
          height: me.props.height,
        }}
        ref={ref => {
          me.container = ref;
        }}
      >
        <div className="navBox" style={{ width, height, background: '#21a3dd' }}>
          <div className="wifiLogo animated fadeInLeft"></div>
          <div className="navBg" ref="navBg"></div>
          <ul className="navList animated fadeInLeft" ref="navList">
            {
              navList.map((t, i) => {
                if (i > 4) { return };
                const isActive = t.name == me.state.active;
                return (
                  <li key={i} className={isActive ? 'normal' : 'normal'}>
                    <a onClick={(e) => {
                      me._click(e, t.name, t.path, i);
                    }} onMouseOver={(e) => {
                      me._mouseOver(e, i)
                    }} onMouseOut={(e) => {
                      me._mouseOut(e, i)
                    }}><span style={{ background: "url('/static/image/nav/" + t.icon + ".png') center center no-repeat" }}></span>{t.name}</a>
                  </li>
                )
              })
            }
          </ul>
          <div className="sectionCore animated fadeInRight">
            <a className="personalCenter"><img src="/static/image/nav/pop.png" /></a>
            <span className="message" onMouseOver={(e) => {
              me._subNavOver(e);
            }} onMouseOut={(e) => {
              me._subNavOut(e);
            }}>你好，王警官</span>
            <a className="ring"><img src="/static/image/nav/ring.png" /></a>
            <a className="back"><img src="/static/image/nav/back.png" /></a>
          </div>
        </div>

        <div className="userCenter" ref="userCenter" onMouseOver={(e) => {
          clearTimeout(me.outTimer)
        }} onMouseOut={(e) => {
          me._subNavOut(e)
        }}>
          <ul>
            {
              navList.map((t, i) => {
                if (i < 5) { return };
                return (
                  <li key={'zhy' + i} onClick={(e) => {
                    me._subNavLiClick(e, t.name, t.path, t.index);
                  }}>{t.name}</li>
                )
              })
            }
          </ul>
        </div>

      </div>
    )
  }

  componentDidMount() {
    const me = this;
    const container = me.container;
    const classList = container.classList;
    classList.add('fadeInDown');
    window.onhashchange = () => {
      const active = me._setActive().name;
      const activeIndex = me._setActive().index;
      me.setState({
        active,
        activeIndex: activeIndex
      });
      me._changeBgOffset()
    }
    me._changeBgOffset()
  }
  _mouseOver(e, i) {
    let me = this;
    const oUl = me.refs.navBg;
    const oLi = me.refs.navList.getElementsByTagName('li');
    oUl.style.display = 'block';
    const offSetLeft = oLi[i].offsetLeft;
    clearTimeout(me.timer)
    me.refs.navBg.style.left = offSetLeft + 430 + 'px'
  }
  _mouseOut(e, i, activeIndex) {
    let me = this;
    me.timer = setTimeout(function () {
      me._changeBgOffset()
    }, 400)
  }
  _changeBgOffset() {
    let me = this;
    const oUl = me.refs.navBg;
    const oLi = me.refs.navList.getElementsByTagName('li');
    if (me.state.activeIndex >= 5) {
      oUl.style.left = oLi[0].offsetLeft + 290 + 'px';
      oUl.style.display = 'none';
    } else {
      oUl.style.display = 'block';
      oUl.style.left = oLi[me.state.activeIndex].offsetLeft + 430 + 'px'
    }

  }
  _subNavOver(e) {
    const me = this;
    clearTimeout(me.outTimer);
    me.refs.userCenter.style.display = 'block';
    me.refs.userCenter.className = "userCenter animated zoomInDown";
  }
  _subNavOut(e) {
    const me = this;
    me.outTimer = setTimeout(function () {
      me.refs.userCenter.style.display = 'none';
    }, 1000)
  }
  _subNavLiClick(e, name, path, index) {
    console.log(e)
    const me = this;
    e.preventDefault();
    e.stopPropagation();
    me.setState({
      active: name,
      activeIndex: index
    });
    window.location.hash = path;
    me.refs.userCenter.className = "userCenter animated zoomOutUp";
    setTimeout(function () {
      me.refs.userCenter.style.display = 'none'
    }, 1000);
  }
  _click(e, name, path, i) {
    console.log(name)
    const me = this;
    e.preventDefault();
    e.stopPropagation();
    me.setState({
      active: name,
      activeIndex: i
    });
    if (path !== me.oldPath) {
      window.location.hash = path || '/tourist';
      me.oldPath = path;
    }
    window.location.hash = path
  }
}

export default Navigation;
