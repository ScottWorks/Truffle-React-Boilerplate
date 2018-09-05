import React from 'react';

function NavBar(props) {
  const { account, balance, icon } = props;

  return (
    <div>
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
