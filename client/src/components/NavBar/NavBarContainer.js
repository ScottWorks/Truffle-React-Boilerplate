import React, { Component } from 'react';
import Identicon from 'identicon.js';

import Navbar from './NavBar';

class NavbarContainer extends Component {
  state = {
    balance: null,
    icon: null
  };

  componentDidMount = async () => {
    try {
      const { account, web3 } = this.props.data;

      console.log(web3, account);

      const balance = await web3.eth.getBalance(account);
      const balanceInEther = web3.utils.fromWei(balance, 'ether');
      const balanceRounded = Number.parseFloat(balanceInEther).toPrecision(6);

      const icon = new Identicon(account, 65).toString();

      this.setState({
        balance: balanceRounded,
        icon: icon
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { account } = this.props.data;
    const { balance, icon } = this.state;

    return <Navbar data={{ account, balance, icon }} />;
  }
}

export default NavbarContainer;
