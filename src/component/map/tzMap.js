import React from 'react';
const BMap = window.BMap;
class TzMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  _setData(d) {
    let me = this;
    me.setState({
      data: d
    })
  }
  render() {
    let me = this;
    return (
      <div style={{
        width: this.props.width,
        height: this.props.height,
        position: 'relative'
      }} ref="tzMap" className="1111">
      </div>
    )
  }
    

   
    
  componentDidUpdate() {
    const me = this;
    const mapId = me.refs.tzMap
    const map = new BMap.Map(mapId);
    // map.centerAndZoom(new BMap.Point(115.450, 40.215), 11);
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    map.enableScrollWheelZoom(true);
    const bdary = new BMap.Boundary(); 
    bdary.get("北京市通州区", function(rs){   
			map.clearOverlays();   
			var count = rs.boundaries.length; 
			if (count === 0) {
				alert('未能获取当前输入行政区域');
				return ;
			}
      var pointArray = [];
			for (var i = 0; i < count; i++) {
				var ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff4747"}); 
				map.addOverlay(ply);  
				pointArray = pointArray.concat(ply.getPath());
			}    
			//map.setViewport(pointArray);     
		}); 
  }
}
export default TzMap;