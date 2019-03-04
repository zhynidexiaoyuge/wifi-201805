import React from 'react';
import Button from '../button/button'
/*数据切换 */
const list = ['总数量', '今日增量', '七日增量', '月增量']
class DataSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  _clickList(e) {
    let me = this;
    console.log(e)
  }
  _buttonClick() {

  }
  render() {
    let me = this;
    return (
      <div style={{
        width: 1838,
        height: 57,
        borderBottom: '1px solid #ccc'
      }} >
        <ul className={'dataSwitch'} style={{
          display: 'flex',
          width: 545,
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 17,
          fontSize: 18
        }}>
          {list.map((s, i) => {
            return <li key={i} style={{
              flex: 1,
              height: 60,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} onClick={me._clickList.bind(this, i)}>{s}</li>
          })}
        </ul>
        <Button data={['导出']} left={1687} top={5} changeClick={me._buttonClick.bind(this)} />
      </div>
    )
  }
}
export default DataSwitch;