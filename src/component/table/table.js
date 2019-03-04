import React from 'react';
import './table.css';

/**
 * 组件框
 */
class Table extends React.Component {
  constructor(props) {
    super(props);
    const me = this;
    this.state = {};
    this.selectAllFlag = true
  }
  _setData(d) {
    let me = this;
    me.setState({
      data: d
    })
  }
  render() {
    const me = this;
    if(!me.state.data){return(<div></div>) }
    return (
      <div style={{width:me.props.width,height:me.props.height,position:'absolute',left:me.props.left,top:me.props.top}}>
        <table className="table"  cellSpacing="0" cellPadding="0" >
          <thead>
            <tr>
              {
                me.state.data.thData.map((t,i)=>{
                  let isActive = false;
                  t==="全选"? isActive=true:isActive=false;
                  return (
                    <th key={i} onClick={(e)=>{
                      me._selectAll(e,t,i)
                    }} className={isActive?"active":"normal"}>{t}</th>
                  )
                })
              }
            </tr>
          </thead>
          <tbody ref="tbody">
            {
              me.state.data.tdData.map((t,i)=>{
                let arr = [];
                if(me.state.data.serialNumber){
                   arr =[i+1];
                }else{
                   arr =[];
                }
                for(let j in t){
                  arr.push(t[j])
                };
                return (
                  <tr key={"zhy"+i} className="animated fadeInDown" style={{animationDelay:100 * i + 'ms'}}>
                    {
                      arr.map((t,i)=>{
                        if(t===true){
                          return (<td key={"zhyL"+i} onClick={(e)=>{
                            me._dubleClick(e,t,i);
                          }}><input type="checkbox"className="checkbox" onClick={(e,t,i)=>{
                            me._checkboxClick();
                          }} /></td>)
                        }
                        return (<td key={"zhyL"+i} onClick={(e)=>{
                          me._dubleClick(e,t,i);
                        }}><a>{t}</a></td>)
                      })
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
  //单选
  _checkboxClick(e,t,i){
    const selectedRow = this._getSelectedRow();
    const allTr = this.refs.tbody.getElementsByTagName('tr');
    for(let i=0;i<allTr.length;i++){
      allTr[i].className=""
    }
    for(let i=0;i<selectedRow.length;i++){
      selectedRow[i].className="active"
    }
  }
  _getLength(obj){
    let count = 0;
    for(var i in obj){ 
      count ++; 
    }
    return count; 
  }
  // 单击td事件
  // _select(e,t,i){
  //   let targetName = e.target.innerHTML;
  //   this.props.onTdClick(e,targetName,i); 
  // }
  // 单击td事件
  _dubleClick(e,t,i){
    const allTr = e.target.parentNode.parentNode.getElementsByTagName('td');
    const arr = [];
    for(let i=0;i<allTr.length-1;i++){
     arr.push(  allTr[i].children[0].innerHTML ) 
    }
    if(t==true){
      return 
    }
    this.props.onCollisionAnalysis?this.props.onCollisionAnalysis(e,t,i):'';
    this.props.onTrClick?this.props.onTrClick(e,arr,i):'';
    this.props.onRoleManage?this.props.onRoleManage(e,arr,i):'';
  }
  _selectAll(e,t,i){
    const me = this;
    const inputAll = me.refs.tbody.getElementsByClassName('checkbox');
    const allTr = this.refs.tbody.getElementsByTagName('tr');
    if(t==="全选"){
      if(me.selectAllFlag==true){
        for(let i=0;i<inputAll.length;i++){
          inputAll[i].checked =true
        }
        for(let i=0;i<allTr.length;i++){
          allTr[i].className="active"
        }
      } else {
        for(let i=0;i<inputAll.length;i++){
          inputAll[i].checked =false
        }
        for(let i=0;i<allTr.length;i++){
          allTr[i].className=""
        }
      } 
      me.selectAllFlag = !me.selectAllFlag;
    }
  }
  _getSelectedRow(){ //复选框中选中行
    const me = this;
    let trObj = [];
    let trArr = [];
    let inputAll = me.refs.tbody.getElementsByClassName('checkbox');
     for(let i=0;i<inputAll.length;i++){
      inputAll[i].checked ===true? trObj.push(inputAll[i]):'';
     }
     for(let i=0;i<trObj.length;i++){
      trArr.push(trObj[i].parentNode.parentNode)
     }
     return trArr
   
  }
  componentDidMount(){
    const me = this;
   
  }
  componentDidUpdate(){
    const me = this;
  }
}

export default Table;
