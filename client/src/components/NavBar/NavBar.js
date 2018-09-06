import React from 'react';

import { Link } from 'react-router-dom';

function NavBar(props) {
  const { account, balance, icon } = props.data;

  return (
    <div>
      <Link to={`/`}>Home</Link>
      <br />

      <Link to={`/${account}`}>Account</Link>

      <div>
        <img src={`data:image/png;base64,${icon}`} />
      </div>

      <div>
        <p>{account}</p>
        <p>{balance} Ξ</p>
      </div>
    </div>
  );
}

export default NavBar;
