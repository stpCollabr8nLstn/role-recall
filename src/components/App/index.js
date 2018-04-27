import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Menu from '../Menu/';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desktopView: false,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({ desktopView: window.innerWidth > 1056 });
  }

  render() {
    return (
      <Router>
        <div className="amr--main">
          <Menu showFlyout={this.props.desktopView}/>
        </div>
      </Router>
    );
  }
}
