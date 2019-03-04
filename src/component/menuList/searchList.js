import React from 'react';
import './add.css';
/**图片 */
import search from './img/search.png';
import add from './img/add.png';
import icon from './img/icon.png';
import down from './img/down.png'
class SearchList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  _setData(d) {
    this.setState({
      data: d
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
  render() {
    let me = this;
    return (
      <div style={{
        borderBottom: '1px solid #ccc'
      }}>
        <div className={'addList'}>
          <span style={{
            background: this.props.type == 0 ? `url(${search})` : `url(${add})`
          }} className={'search'} onClick={me._searchClick.bind(this)} />
          <span>{this.props.contents}</span>
          <span ref={'down'} src={down} className={'down'} onClick={me._downClick.bind(this)} />
        </div>
        <ul ref={'contentList'} className={'contentList animated fadeInDown'} style={{ display: 'none' }}>
          <li>66666666666</li>
          <li>66666666666</li>
          <li>66666666666</li>
          <li>66666666666</li>
          <li>66666666666</li>
          <li>66666666666</li>
          <li>66666666666</li>
          <li>66666666666</li>
          <li>66666666666</li>
          <li>66666666666</li>
        </ul>
      </div>
    )
  }
}
export default SearchList