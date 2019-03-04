import React from 'react';

import person from './img/person.png';
import equipment from './img/equipment .png';

class HomeMap extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let me = this;
    let animation = me.props.animation || "animated fadeInLeft"
    return (
      <div style={{
        position: 'absolute',
        left: 571,
        top: 176
      }} className={animation}>
        <ul className={'icons'}>
          <li><img src={person} /><span>BK人员</span></li>
          <li><img src={equipment} /><span>离线设备</span></li>
        </ul>
      </div>
    )
  }
}
export default HomeMap;