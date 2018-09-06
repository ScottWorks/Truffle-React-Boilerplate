import React from 'react';

function ComponentA(props) {
  const { value } = props.data;

  return (
    <div>
      <br />
      <p>{`Value: ${value}`}</p>
    </div>
  );
}

export default ComponentA;
