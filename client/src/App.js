import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import getContractInstance from './utils/getContractInstance';
import getWeb3 from './utils/getWeb3';

import ComponentAContainer from './components/ComponentA/ComponentAContainer';
import ComponentBContainer from './components/ComponentB/ComponentBContainer';
import NavBarContainer from './components/NavBar/NavBarContainer';

import SimpleStorageContract from './contracts/SimpleStorage.json';

class App extends Component {
  constructor() {
    super();

    this.state = {
      account: null,
      isLoading: true,
      web3: null
    };
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();

      const contract = await getContractInstance(web3, SimpleStorageContract);

      this.setState({
        account: accounts[0],
        contract: contract,
        web3: web3
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentWillUpdate = async (prevProps) => {
    const { account, web3 } = this.state;

    console.log(prevProps.account, account);

    if (prevProps.account !== account) {
      const accounts = await web3.eth.getAccounts();

      this.setState({
        account: accounts[0]
      });
    }
  };

  handleLoading = () => {
    this.setState({
      isLoading: false
    });
  };

  render() {
    const { account, isLoading, web3 } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading all the goodies...</p>
        </div>
      );
    }

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
                  web3
                }}
              />
            )}
          />
          <Route
            path="/:id"
            render={(props) => (
              <ComponentBContainer
                data={{
                  ...props,
                  account,
                  web3
                }}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
