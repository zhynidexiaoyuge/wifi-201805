import React from 'react';
import './add.css';
/**图片 */
import search from './img/search.png';
import icon from './img/icon.png';
import down from './img/down.png';
import icon1 from './img/icon1.png'
class AddList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  _setData(d) {
    this.setState({
      data: d
    })
  }
  _addList() {
    let me = this;
    if (!me.state.data) { return null }
    return me.state.data.map((s, index) => {
      return <li key={index}>
        <span className={"content"} style={{ color: '#6c7987' }}>{s}</span>
        <span className={'ipg'}></span>
      </li>
    })
  }
  /**点击查询 */
  _searchClick() {
    this.refs.contentList.style.display = "block";
    this.refs.contentList.className = 'contentList animated fadeInDown'
    this.refs.down.style.transform = 'rotate(180deg)'
  }
  /**点击箭头 */
  _downClick() {
    this.refs.contentList.style.display = 'none';
    this.refs.contentList.className = 'contentList animated fadeInUp'
    this.refs.down.style.transform = 'rotate(0deg)'
  }
  /**上一页 */
  previousPage() {

    if (this.props.types == 1) {
      this.props._previousPageIn()
    } else {
      this.props._previousPage()
    }
  }
  /*下一页 */
  nextPage() {


    if (this.props.types == 1) {
      this.props._nextPageIn()
    } else {
      this.props._nextPage()
    }

  }
  /**显示列表 */
  show() {

    if (this.props.types == 1) {
      this.props._showList()
    } else {
      this.props._show()
    }

  }
  render() {
    let me = this;
    return (
      <div>
        <div className={'increaceList'}>
          <span src={search} className={'search'} onClick={me._searchClick.bind(this)} />
          <span style={{ color: '#858f9a' }}>查询列表</span>
          <span ref={'down'} className={'down'} onClick={me._downClick.bind(this)} />
        </div>
        <div ref={'contentList'} className={'contentList animated fadeInDown'} style={{ display: 'none' }}>
          <ul className={'leftList'}><li style={{ fontSize: 16, color: '#2d3640' }}>发现目标</li>{me._addList()}</ul>
          <div className={'paginationList'}>
            <span onClick={me.previousPage.bind(this)}>上一页</span>
            <span onClick={me.nextPage.bind(this)} style={{ marginLeft: 10 }}>下一页</span>
            <span style={{ marginLeft: 220 }}>列表详情</span>
            <span onClick={me.show.bind(this)} className={'mark'}></span>
          </div>
        </div>
      </div>
    )
  }
}
export default AddList