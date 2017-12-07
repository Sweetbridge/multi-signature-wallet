pragma solidity 0.4.18;

import "./Factory.sol";
import "./MultiSigWalletWithDailyLimit.sol";


/// @title Multisignature wallet factory for daily limit version - Allows creation of multisig wallet.
/// @author Stefan George - <stefan.george@consensys.net>
contract MultiSigWalletWithDailyLimitFactory is Factory {
    bool public prod = false;

    function MultiSigWalletWithDailyLimitFactory(bool prod_) public {
        prod = prod_;
    }

    /*
     * Public functions
     */
    /// @dev Allows verified creation of multisignature wallet.
    /// @param _owners List of initial owners.
    /// @param _required Number of required confirmations.
    /// @param _dailyLimit Amount in wei, which can be withdrawn without confirmations on a daily basis.
    /// @return Returns wallet address.
    function create(address[] _owners, uint _required, uint _dailyLimit) public returns (address wallet)
    {
        uint24 delay = 120;
        if(prod) delay = 15 * 24 * 3600;
        wallet = new MultiSigWalletWithDailyLimit(_owners, _required, _dailyLimit, delay);
        register(wallet);
    }
}
