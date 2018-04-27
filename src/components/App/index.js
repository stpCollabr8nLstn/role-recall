import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import classnames from 'classnames';
import Menu from '../Menu/';
import ClassDetail from '../ClassDetail';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desktopView: false,
      data: null,
    };

    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    fetch('http://www.dnd5eapi.co/api/classes/')
      .then(res => res.json())
      .then(classes => {
        this.setState({ data: classes.results })
      })
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    this.setState({ desktopView: window.innerWidth > 1056 });
  }

  render() {
    const { desktopView, data } = this.state;
    const mainClasses = classnames("amr--main", {
      "amr--main-desktop": desktopView,
    })

    return (
      <Router>
        <div className={mainClasses}>
          <Menu desktopView={desktopView} data={data} style={{'border-right': '1px solid #0033FF'}}/>
          <header className="amr--header">
            <h1 className="amr--title">Role Recall</h1>
          </header>
          {data && <Route path="/character/:index" render={({ match }) => (
            <ClassDetail index={match.params.index} desktop={desktopView} />
          )} />}
        </div>
      </Router>
    );
  }
}
