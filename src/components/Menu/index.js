import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flyoutOpen: false,
      data: null,
      currentClass: null,
    }
    this.toggleFlyout = this.toggleFlyout.bind(this);
  }

  static propTypes = {
    showFlyout: PropTypes.bool,
  }

  static defaultProps = {
    showFlyout: false
  }

  componentDidMount = () => {
    fetch('http://www.dnd5eapi.co/api/classes/')
      .then(res => res.json())
      .then(classes => {
        this.setState({ data: classes.results })
      })

  }

  getClassInfo = (url) => {
    fetch(url)
      .then(res => res.json())
      .then(currentClass => {
        this.setState({ currentClass })
      })
  }

  closeFlyout = () => {
    this.setState({ flyoutOpen: false });
  }

  toggleFlyout = (e) => {
    e.preventDefault();
    this.setState({ flyoutOpen: !this.state.flyoutOpen });
  }

  render() {
    const { data, flyoutOpen } = this.state;
      console.log(data);
    return (
      <div className="amr--menu">

        {flyoutOpen ? (
          <aside>
            <ul className="amr--menu-list" >
              <h3 className="amr--sub-title">Role Recall</h3>
              {data ? data.map((info, index) => (
                <li className="amr--menu-item" key={info.index}>
                  <Link to={`/class/${info.name}`}>{info.name}</Link>
                </li>)): (<div>Loading...</div>)}
            </ul>
            <div className="amr--overlay" onClick={this.closeFlyout}></div>
          </aside>
        ) : (
          <div>
            <button onClick={this.toggleFlyout} tabIndex={0} className="amr--menu-icon">
              <span className="amr--menu-icon__line-top"></span>
              <span className="amr--menu-icon__line"></span>
              <span className="amr--menu-icon__line-bottom"></span>
            </button>

          </div>

        )}
        <header className="amr--header">
          <h1 className="amr--title">Role Recall</h1>
        </header>
      </div>

    );
  }
}
