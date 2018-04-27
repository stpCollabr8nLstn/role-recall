import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flyoutOpen: false,
    }
    this.toggleFlyout = this.toggleFlyout.bind(this);
  }

  static propTypes = {
    desktopView: PropTypes.bool,
    data: PropTypes.array,
  }

  static defaultProps = {
    desktopView: false,
    data: [],
  }

  closeFlyout = () => {
    this.setState({ flyoutOpen: false });
  }

  toggleFlyout = (e) => {
    e.preventDefault();
    this.setState({ flyoutOpen: !this.state.flyoutOpen });
  }

  render() {
    const { flyoutOpen } = this.state;
    const { desktopView, data } = this.props;
    const menu = data ? data.map((info, index) => (
      <li className="amr--menu-item" key={index+1}>
        <Link to={`/character/${index+1}`} tabIndex={0} className="amr--menu-link">{info.name}</Link>
      </li>)): '';

    const mobileMenu = (
      <nav>
        <div className="amr--menu__wrapper">
          <button onClick={this.toggleFlyout} tabIndex={0} className="amr--menu-icon">
            <span className="amr--menu-icon__line-top"></span>
            <span className="amr--menu-icon__line"></span>
            <span className="amr--menu-icon__line-bottom"></span>
          </button>

        </div>

        <aside className={classnames('amr--menu-list__mobile', {
          "amr--menu-list__mobile-open": flyoutOpen
        })}>
          <ul className="amr--menu-list">{menu}</ul>
        </aside>
        <div className={classnames({'amr--overlay': flyoutOpen})} onClick={this.closeFlyout}></div>
      </nav>
    )

    return (
        <div className="amr--menu">
          {desktopView ? (
            <aside>
              <ul className="amr--menu-list">{menu}</ul>
            </aside>
          ): mobileMenu }
        </div>
    );
  }
}
