import React from 'react';

function ComponentB(props) {
  const { handleChange, setValue } = props;

  return (
    <div>
      <br />
      <input
        type="number"
        placeholder="Enter Value"
        onChange={(e) => handleChange('newValue', e.target.value)}
      />
      <input type="button" value="Submit" onClick={setValue} />
    </div>
  );
}

export default ComponentB;
