import React, { Component } from 'react';

import ComponentB from './ComponentB';

class ComponentBContainer extends Component {
  state = {
    contract: '',
    newValue: ''
  };

  handleChange = (key, value) => {
    this.setState({
      [key]: value
    });
  };

  setValue = async () => {
    const { account, contract } = this.props.data;
    const { newValue } = this.state;

    await contract.methods.set(newValue).send({ from: account });

    this.props.getValue();

    this.setState({
      newValue: ''
    });
  };

  render() {
    const { newValue } = this.state;

    return (
      <ComponentB
        data={{ newValue }}
        handleChange={this.handleChange}
        setValue={this.setValue}
      />
    );
  }
}

export default ComponentBContainer;
