import React from 'react';
import ReactComponentWithEventDispatcher from './ReactComponentWithEventDispatcher';
import Button from './ButtonC';
import {createElement} from '@jusfoun-vis/common';
import './pagination.css';

/**
 * 分页
 * @author msh
 * type值为 true 的时候会显示 “共为您找到相关结果{this.state.count}个”
 */
class Pagination extends ReactComponentWithEventDispatcher {
  constructor() {
    super();
    this.activeIndex = 1;
    this.state = {
      total: 20,
      count: 998,
      activeIndex: this.activeIndex
    };
  }

  appear() {
    this.refs.container.style.display = 'block';
  }

  disappear() {
    this.refs.container.style.display = 'none';
  }

  componentDidMount() {
    const me = this;
    const state = me.state;
    const total = state.total;
    const firstPageButton = me.firstPageButton;
    firstPageButton.backgroundColor = [
      {
        offset: 0,
        color: '#f00'
      },
      {
        offset: 1,
        color: '#0ff'
      }
    ];
    firstPageButton.text = '首页';
    firstPageButton.borderRadius = 20;
    firstPageButton.fontLetterSpace = 0;
    firstPageButton.disabled = true;
    firstPageButton.on('click', function (e) {
      if (me.activeIndex <= 1) return;
      me.activeIndex = 1;
      me.updateState();
      me._fire();
    });

    const pervPageButton = me.pervPageButton;
    pervPageButton.backgroundColor = [
      {
        offset: 0,
        color: '#f00'
      },
      {
        offset: 1,
        color: '#0ff'
      }
    ];
    pervPageButton.text = '上一页';
    pervPageButton.borderRadius = 20;
    pervPageButton.fontLetterSpace = 0;
    pervPageButton.on('click', function (e) {
      if (me.activeIndex < 1) return;
      me.activeIndex--;
      me.updateState();
      me._fire();
    });

    const nextPageButton = me.nextPageButton;
    nextPageButton.backgroundColor = [
      {
        offset: 0,
        color: '#f00'
      },
      {
        offset: 1,
        color: '#0ff'
      }
    ];
    nextPageButton.text = '下一页';
    nextPageButton.borderRadius = 20;
    nextPageButton.fontLetterSpace = 0;
    nextPageButton.on('click', function (e) {
      if (me.activeIndex > total) return;
      me.activeIndex++;
      me.updateState();
      me._fire();
    });

    const endPageButton = me.endPageButton;
    endPageButton.backgroundColor = [
      {
        offset: 0,
        color: '#f00'
      },
      {
        offset: 1,
        color: '#0ff'
      }
    ];
    endPageButton.text = '末页';
    endPageButton.borderRadius = 20;
    endPageButton.fontLetterSpace = 0;
    endPageButton.on('click', function (e) {
      if (me.activeIndex >= total) return;
      me.activeIndex = total;
      me.updateState();
      me._fire();
    });

    const confirmPageButton = me.confirmPageButton;
    confirmPageButton.backgroundColor = [
      {
        offset: 0,
        color: '#4db9f5'
      },
      {
        offset: 1,
        color: '#257dd7'
      }
    ];
    confirmPageButton.fontColor = '#fff';
    confirmPageButton.borderRadius = 20;
    confirmPageButton.fontLetterSpace = 0;
    confirmPageButton.on('click', function (e) {
      me.activeIndex = +me.input.value;
      if (me.activeIndex < 1) me.activeIndex = 1;
      if (me.activeIndex > total) me.activeIndex = total;
      if (me.activeIndex === me.state.activeIndex) return false;
      me.updateState();
      me._fire();
    });

    me.componentDidUpdate();
  }

  updateState() {
    const me = this;
    me.isInputChange = false;

    me.setState({
      activeIndex: me.activeIndex
    });
  }

  _fire() {
    this.fire({
      type: 'click',
      index: this.state.activeIndex
    })
  }

  inputChange(e) {
    this.isInputChange = true;
    this.setState({
      activeIndex: e.target.value
    })
  }

  componentDidUpdate() {
    const me = this;
    const state = me.state;
    const activeIndex = state.activeIndex;
    const total = state.total;

    if (me.isInputChange) return;

    const firstPageButton = me.firstPageButton;
    firstPageButton._id = 1;
    const pervPageButton = me.pervPageButton;
    pervPageButton._id = 1;
    const nextPageButton = me.nextPageButton;
    nextPageButton._id = total;
    const endPageButton = me.endPageButton;
    endPageButton._id = total;

    const buttons = [firstPageButton, pervPageButton, nextPageButton, endPageButton];

    buttons.forEach((t) => {
      if (t._id === activeIndex) {
        t.disabled = true;
        t.fontColor = '#00fffc';
        t.borderColor = "#f00";
        t.backgroundColor = 'rgba(255,255,255,.2)';
      } else {
        t.backgroundColor = [
          {
            offset: 0,
            color: '#4db9f5'
          },
          {
            offset: 1,
            color: '#267ed8'
          }
        ];
        t.fontColor = '#fff';
        t.disabled = false;
      }
    });

    me.isInputChange = false;
  }

  render() {
    const me = this;
    const state = me.state;
    const style = me.props.style;
    const total = state.total;
    const count = state.count;
    const activeIndex = state.activeIndex;
    return (
      <div
        style={style}
        className={'pagination-container'}
        ref={'container'}
      >
        <p className={`pagination-count ${me.props.type ? 'active' : ''}`}>共为您找到相关结果{count}个</p>
        <Button
          disabled={true}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.firstPageButton = ref;
          }}
        />
        <Button
          disabled={true}
          style={{
            position: 'absolute',
            top: 0,
            left: 128,
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.pervPageButton = ref;
          }}
        />
        <Button
          style={{
            position: 'absolute',
            top: 0,
            left: 256,
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.nextPageButton = ref;
          }}
        />
        <Button
          style={{
            position: 'absolute',
            top: 0,
            left: 384,
            width: 108,
            height: 32
          }}
          ref={ref => {
            me.endPageButton = ref;
          }}
        />
        <div className={'pagination-input'}>
          当前
          <input ref={ref => {
            me.input = ref;
          }} type="text" value={activeIndex} onChange={me.inputChange.bind(me)}/>
          页
        </div>
        <Button
          text={'确认'}
          style={{
            position: 'absolute',
            top: 0,
            left: 750,
            width: 108,
            height: 32,
          }}
          ref={ref => {
            me.confirmPageButton = ref;
          }}
        />
        <div className={'pagination-total'}>共{total}页</div>
      </div>
    )
  }
}

export default Pagination;
