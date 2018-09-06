import React, { Component } from 'react';

import ComponentA from './ComponentA';

class ComponentAContainer extends Component {
  componentDidMount = async () => {
    this.props.getValue();
  };

  render() {
    const { value } = this.props.data;

    return <ComponentA data={{ value }} />;
  }
}

export default ComponentAContainer;
