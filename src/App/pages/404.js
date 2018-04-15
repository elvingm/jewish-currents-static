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
      <section className="g-content-wrap">
        <h2>Whoops. We can't find that page.</h2>
      </section>
    ) : null;
  }
}
