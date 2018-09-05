import React, { Component } from 'react';
import Identicon from 'identicon.js';

import Navbar from './Navbar';

class NavbarContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      balance: null,
      icon: null
    };
  }

  componentDidMount = async () => {
    try {
      const { account, web3 } = this.props.data;

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
