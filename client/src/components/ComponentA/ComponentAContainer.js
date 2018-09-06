import React, { Component } from 'react';

import ComponentA from './ComponentA';

class ComponentAContainer extends Component {
  render() {
    const { value } = this.props.data;

    return <ComponentA data={{ value }} />;
  }
}

export default ComponentAContainer;
