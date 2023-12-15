multiversx_sc::imports!();
multiversx_sc::derive_imports!();

use multiversx_sc::types::heap::Vec;

#[derive(TypeAbi, TopEncode, TopDecode, PartialEq, Debug)]
pub struct StakeInfo<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    pub nft_nonce: Vec<u64>,
    pub lock_time: u64,
    pub unstake_time: u64,
}
