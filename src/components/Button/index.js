import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Button = (props) => (
  <button
    className="amr--menu-icon"
    onClick={props.onClick}>
    {props.children}
  </button>
);

export default Button
