multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[derive(TypeAbi, TopEncode, TopDecode, PartialEq, Debug)]
pub struct StakeInfo<M: ManagedTypeApi> {
    pub address: ManagedAddress<M>,
    pub nft_nonce: ManagedVec<M, u64>,
    pub lock_time: u64,
    pub unstake_time: u64,
}
