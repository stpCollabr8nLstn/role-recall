import React, { Component } from 'react';
import PropTypes from 'prop-types';
import createFetcher from '../Fetcher';

export default createFetcher (
  (props) => 'http://www.dnd5eapi.co/api/classes/' + props.index + '/' )
    (class ClassDetail extends Component {
      state = {
        detail: null
      }

      static propTypes = {
        loading: PropTypes.bool,
        data: PropTypes.object,
        desktop: PropTypes.bool,
      }

      static defaultProps = {
        desktop: true,
      }

      render() {
        const { data: detail } = this.props;

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

)
