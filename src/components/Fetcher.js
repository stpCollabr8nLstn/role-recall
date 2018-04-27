import React from 'react';

// Higher order component which:
//  1. Maps props to a url
//  2. Passes a `loading` boolean to its child component
//  3. Passes a `data` prop to its child component

export default (mapPropsToUrl) => (Component) => class Fetcher extends Component {
  state = {
    loading: true,
  }

  fetchData = (propsToMap) => {
    this.setState({
      loading: true,
    })
    const url = mapPropsToUrl(propsToMap);
    fetch(url)
      .then(res => res.json())
      .then(info => {
        this.setState({
          data: info,
          loading: false,
        })
      })
  }

  componentDidMount = () => {
    this.fetchData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.fetchData(nextProps);
  }

  render() {
    return <Component loading={this.state.loading} data={this.state.data}/>
  }
}
