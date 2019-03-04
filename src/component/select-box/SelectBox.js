import React from 'react';
import './selectBox.css';

/**
 * author xf
 * 默认多选框
 * type={'single'} 则为单选框
 * 可设置 width
 * 通过 _getRes() 可以拿到选择的结果
*/

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }

  appear() { }

  disappear() { }

  clicked(i) {
    this.setState({ index: i });
  }

  selected(i, e) {
    let node = e.target;
    const lists = this.refs.list.children;
    if (this.isSelect(node)) {
      if (node.innerText == '全部') {
        for (let n = 0; n < lists.length; n++) {
          lists[n].classList.remove('selected');
        }
        return
      }
      if (lists[0].innerText == '全部') {
        lists[0].classList.remove('selected');
      }
      node.classList.remove('selected');
    } else {
      if (node.innerText == '全部') {
        for (let n = 0; n < lists.length; n++) {
          lists[n].classList.add('selected');
        }
        return
      }
      let index = 1;
      for (let n = 0; n < lists.length; n++) {
        if (this.isSelect(lists[n])) { index++ }
        if (index == lists.length - 1) { lists[0].classList.add('selected'); }
      }
      node.classList.add('selected');
    }
  }

  isSelect(node) {
    return node.classList.contains('selected');
  }

  _getRes() {
    const me = this;
    const lists = me.refs.list.children;
    let arr = [];
    for (let n = 0; n < lists.length; n++) {
      let node = lists[n];
      let nodeClass = lists[n].classList;
      if (nodeClass.contains('selected') || nodeClass.contains('active')) {
        arr.push(node.innerText)
      }
    }
    return arr;
  }

  render() {
    let me = this;
    if (me.props.type == 'single') {
      return (
        <ul className={'select-box-wrap single'} style={{
          width: me.props.width,
          position: 'absolute',
          top: me.props.top,
          left: me.props.left
        }} ref={'list'}>
          {me.props.data.map((s, i) => {
            return (
              <li key={i}
                onClick={me.clicked.bind(me, i)}
                className={me.state.index == i ? 'active' : ''} >
                {s}
              </li>
            );
          })}
        </ul>
      );
    } else {
      return (
        <ul className={'select-box-wrap'} style={{
          width: me.props.width,
          top: me.props.top,
          left: me.props.left
        }} ref={'list'}>
          {me.props.data.map((s, i) => {
            let node = <li key={i} onClick={me.selected.bind(me, i)}>{s}</li>
            // if (i == 0) {
            //   node = <li key={i} onClick={me.selected.bind(me, i)} className={'selected'} >{s}</li>;
            // }
            return node;
          })}
        </ul>
      );
    }
  }
};

export default Page;
