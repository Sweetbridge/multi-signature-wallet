pragma solidity 0.4.18;

import "./Factory.sol";
import "./MultiSigWallet.sol";


/// @title Multisignature wallet factory - Allows creation of multisig wallet.
/// @author Stefan George - <stefan.george@consensys.net>
contract MultiSigWalletFactory is Factory {

    bool public prod = false;

    function MultiSigWalletFactory(bool prod_) {
        prod = prod_;
    }

    /*
     * Public functions
     */
    /// @dev Allows verified creation of multisignature wallet.
    /// @param _owners List of initial owners.
    /// @param _required Number of required confirmations.
    /// @return Returns wallet address.
    function create(address[] _owners, uint _required)
        public
        returns (address wallet)
    {
        uint24 delay = 120;
        if(prod) delay = 15 * 24 * 3600; //15 days
        wallet = new MultiSigWallet(_owners, _required, delay);
        register(wallet);
    }
}
