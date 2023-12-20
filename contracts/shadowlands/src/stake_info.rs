multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[derive(TypeAbi, TopEncode, TopDecode, PartialEq, Debug)]
pub struct StakeInfo<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    // 0 : nonce
    // 1 : lock_time
    pub nft_nonce_with_lock_time: ManagedVec<M, ManagedVec<M, u64>>,
    pub unstake_time: u64,
}
