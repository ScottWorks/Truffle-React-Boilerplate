import React, { Component } from 'react';

import Navbar from './NavBar';

class NavbarContainer extends Component {
  state = {
    balance: null,
    icon: null
  };

  componentDidMount = async () => {
    try {
      const { account, web3 } = this.props.data;

      const balance = await web3.eth.getBalance(account);
      const balanceInEther = web3.utils.fromWei(balance, 'ether');
      const balanceRounded = Number.parseFloat(balanceInEther).toPrecision(6);

      this.setState({
        balance: balanceRounded
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { account, icon } = this.props.data;
    const { balance } = this.state;

    return <Navbar data={{ account, balance, icon }} />;
  }
}

export default NavbarContainer;
