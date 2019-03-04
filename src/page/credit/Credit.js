import React from 'react';

/**
 * 信用全景
 * @author msh
 */
class Credit extends React.Component {
  constructor() {
    super();
  }

  appear() {
  }

  disappear() {
  }

  render() {
    return (
      <div>credit</div>
    )
  }
  _tokens = [];
  _clearTokens() {
    this._tokens.forEach(token => token.cancel());
    this._tokens = [];
  }
  componentDidMount() {

  }
  componentWillUnmount() {
    this._clearTokens();
  }
}

export default Credit;
