import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
  }

  static defaultProps = {
    onClick: () => {}
  }

  render() {
    const { onClick, children } = this.props;

    return (
      <button
        className="amr--button"
        onClick={onClick}>
        {children}
      </button>
    );
  }
}
