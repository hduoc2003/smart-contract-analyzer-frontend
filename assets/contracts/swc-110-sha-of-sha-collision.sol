pragma solidity ^0.4.22;

contract ShaOfShaCollission{

    mapping(bytes32=>uint) m;

    function set(uint x){
        m[keccak256(abi.encodePacked("A", x))] = 1;
    }
    function check(uint x){
        assert(m[keccak256(abi.encodePacked(x, "B"))] == 0);
    }

}