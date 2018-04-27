import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClassDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: null
    }

  }

  componentWillReceiveProps(nextProps) {
    const url = 'http://www.dnd5eapi.co/api/classes/' + nextProps.index + '/';
    fetch(url)
      .then(res => res.json())
      .then(info => {
        this.setState({ detail: info})
      })
  }

  static propTypes = {
    index: PropTypes.string,
    desktop: PropTypes. bool,
  }

  static defaultProps = {
    index: '1',
    desktop: true,
  }

  render() {
    const { detail } = this.state;

    return (
      <div className="amr--detail__wrapper" style={this.props.desktop ? {left: '35%'} : {}}>
        {detail && (
          <div className="amr--detail">
            <h2>{detail.name}</h2>
            <p>Hit Die: {detail.hit_die}</p>
            <p>Saving Throws: {detail.saving_throws.map(saveThrow => {
              return <li key={saveThrow.name}>{saveThrow.name}</li>
            })}</p>
            <p>Proficiencies: {detail.proficiencies.map(p => {
              return <li key={p.name}>{p.name}</li>
            })}</p>

          </div>

        )}

      </div>
    );
  }
}
