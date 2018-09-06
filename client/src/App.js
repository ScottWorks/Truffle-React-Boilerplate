import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import getContractInstance from './utils/getContractInstance';
import getWeb3 from './utils/getWeb3';

import ComponentAContainer from './components/ComponentA/ComponentAContainer';
import ComponentBContainer from './components/ComponentB/ComponentBContainer';
import NavBarContainer from './components/NavBar/NavBarContainer';

import SimpleStorageContract from './contracts/SimpleStorage.json';

class App extends Component {
  state = {
    account: null,
    contract: null,
    isLoading: true,
    value: null,
    web3: null
  };

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const contract = await getContractInstance(web3, SimpleStorageContract);

      this.setState(
        {
          account: accounts[0],
          contract: contract,
          web3: web3
        },
        () => this.handleLoading()
      );
    } catch (error) {
      console.log(error);
    }
  };

  componentDidUpdate = async () => {
    const { account, web3 } = this.state;

    await web3.currentProvider.publicConfigStore.on('update', (result) => {
      let newAccount = result.selectedAddress;

      if (account !== newAccount) {
        this.setState({
          account: newAccount
        });
      }
    });
  };

  getValue = async () => {
    const { contract } = this.state;

    let value = await contract.methods.get().call();

    this.setState({
      value: value
    });
  };

  handleLoading = () => {
    this.setState({
      isLoading: false
    });
  };

  render() {
    const { account, contract, isLoading, value, web3 } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading all the goodies...</p>
        </div>
      );
    } else {
      return (
        <div>
          <NavBarContainer data={{ account, web3 }} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <ComponentAContainer
                  data={{
                    ...props,
                    account,
                    contract,
                    value,
                    web3
                  }}
                  getValue={this.getValue}
                />
              )}
            />
            <Route
              path="/:account"
              render={(props) => (
                <ComponentBContainer
                  data={{
                    ...props,
                    account,
                    contract
                  }}
                  getValue={this.getValue}
                />
              )}
            />
          </Switch>
        </div>
      );
    }
  }
}

export default App;
