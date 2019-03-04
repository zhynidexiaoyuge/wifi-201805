import React, { Component } from 'react';
import ResizeManager from './component/common/ResizeManager';
import SceneTransitionRouter, { Route } from './component/common/SceneTransitionRouter';
import { Timer } from '@jusfoun-vis/common';
import TWEEN from '@tweenjs/tween.js';
import './App.css';
// nav
import Navigation from './component/navigation/Navigation';
// page
import HomePage from './page/home-page/HomePage';
import ComprehensiveInquiry from './page/comprehensiveInquiry/ComprehensiveInquiry';
import BKTask from './page/bKTask/BKTask';
import CollisionAnalysis from './page/collisionAnalysis/CollisionAnalysis';
import DataStatistics from './page/dataStatistics/DataStatistics';
import ControlManage from './page/home-page/ControlManage';
import UserManage from './page/userCenter/userManage';
import OrganizationManage from './page/userCenter/organizationManage';
import LogManage from './page/userCenter/logManage';
import RoleManage from './page/userCenter/roleManage';


// TWEEN
if (window.timer) window.timer.stop();
const timer = new Timer(Timer.REQUEST_ANIMATION_FRAME);
timer.on('timer', function () {
  TWEEN.update();
});
timer.start();
window.timer = timer;

/**
 * 渲染逻辑
 * @author msh
 */
class App extends Component {
  constructor(props) {
    super(props);
    const me = this;
    me._initHash();

    me._windowHashChangeHandler = function () {
      me._initHash();
    }
  }

  _initHash() {
    let hash = window.location.hash;
    if (hash === '' || hash === '#/')
      window.location.hash = '#/homepage';
  }

  _windowHashChangeHandler = undefined;

  componentDidMount() {
    const me = this;
    window.addEventListener('hashchange', me._windowHashChangeHandler);
  }

  componentWillUnmount() {
    const me = this;
    window.removeEventListener('hashchange', me._windowHashChangeHandler);
  }

  render() {
    const width = 1920;
    const height = 1080;
    const mode = window.resizeManagerMode || ResizeManager.MODE_DEBUG;
    return (
      <div className="app" style={{ width, height }}>
        <ResizeManager fullWidth={width} fullHeight={height} mode={mode} />
        <Navigation width={width} height={78} />
        <SceneTransitionRouter style={{
          width,
          height,
          position: 'relative',
        }}>
          <Route path={'/homepage'} exact component={HomePage} />
          <Route path={'/comprehensiveInquiry'} exact component={ComprehensiveInquiry} />
          <Route path={'/bKTask'} exact component={BKTask} />
          <Route path={'/collisionAnalysis'} exact component={CollisionAnalysis} />
          <Route path={'/dataStatistics'} exact component={DataStatistics} />
          <Route path={'/controlManage'} exact component={ControlManage} />
          <Route path={'/userManage'} exact component={UserManage} />
          <Route path={'/organizationManage'} exact component={OrganizationManage} />
          <Route path={'/logManage'} exact component={LogManage} />
          <Route path={'/roleManage'} exact component={RoleManage} />
        </SceneTransitionRouter>
      </div>
    );
  }
}

export default App;
