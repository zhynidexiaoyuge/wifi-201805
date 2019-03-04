import React from 'react';
import './dialog.css';



const titleList = ['M* *信息','上网记录','查看轨迹','APP应用'];
class Dialog extends React.Component {
  constructor() {
    super();
    this.state = {
      display: 'none',
      activeIndex:0
    };
  }

  _open() {
    this.setState({
      display: 'block'
    });
    this.refs.bgBox.parentNode.style.zIndex = 10;
    this.refs.bgBox.classList.remove('zoomOut');
    this.refs.bgBox.classList.add('zoomIn');
  }

  _close() {
    this.refs.bgBox.classList.remove('zoomIn');
    this.refs.bgBox.classList.add('zoomOut');
    this.refs.bgBox.parentNode.style.zIndex = '';
    setTimeout(() => {
      this.setState({
        display: 'none',
      });
    }, 1000)
  }

  render() {
    let me = this;
    let titleType0 = me.props.type==0?'block':'none';
    let titleType1 = me.props.type==1?'block':'none';
    return (
      <div style={{
        position: 'absolute',
        width: 1920,
        height: 1080,
        zIndex: 99,
        background: 'rgba(0,0,0,0.5)',
        left: 0,
        top: 0,
        display: me.state.display
      }} ref="bgBox" className="animated">
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: me.props.width,
          height: me.props.height,
          marginLeft: -me.props.width / 2,
          marginTop: -me.props.height / 2,
          backgroundColor: '#fff',
          borderRadius: 8
        }} ref='dialog'>
          <div className="diaLogTitle diaLogTitleType0" style={{display:titleType0}}>
            <h3>{me.props.title || '请添加标签'}</h3>
            <span className="diaLogClose" onClick={() => {
              me._close();
            }}></span>
          </div>
          <div className="diaLogTitle diaLogTitleType1" style={{display:titleType1}}>
            <ul className="TitleTypeNav">
              {
                titleList.map((t,i)=>{
                  let activeIndex = me.state.activeIndex
                  return (
                    <li className={i==activeIndex?"active":'normal'} onClick={(e)=>{
                      me._titleClick(e,t,i);
                    }} key={i}>{t}</li>
                  )
                })
              }
            </ul>
            <span className="diaLogClose" onClick={() => {
              me._close();
            }}></span>
          </div>
          <div style={{position:'relative'}}>
            {me.props.children}
          </div>
        </div>
      </div>
    )
  }
  _titleClick(e,t,i){
    const me = this;
    me.setState({
      activeIndex:i
    })
    me.props.onTitleClick(e,t,i);
  }
  componentDidMount() {
    const me = this;
    const left = -me.refs.bgBox.parentNode.offsetLeft - 1 + "px";
    const top = -me.refs.bgBox.parentNode.offsetTop - 80 + "px";
    me.refs.bgBox.style.left = left;
    me.refs.bgBox.style.top = top;
  }
};

export default Dialog;
