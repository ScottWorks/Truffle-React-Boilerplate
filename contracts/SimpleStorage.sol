pragma solidity ^0.4.24;

contract SimpleStorage {
    uint storedData;

    event LogStoredData(uint _storedData);

    function set(uint x) public {
        storedData = x;

        emit LogStoredData(storedData);
    }

    function get() public view returns (uint) {
        return storedData;
    }
}