import React from 'react';
//

export default class extends React.Component {
  state = {
    ready: false
  };
  componentDidMount() {
    this.makeReady();
  }
  makeReady = () => {
    if (!this.state.ready) {
      this.setState({
        ready: true
      });
    }
  };
  render() {
    return this.state.ready ? (
      <div>
        <h1>404 - Oh no's! We couldn't find that page :(</h1>
      </div>
    ) : null;
  }
}
