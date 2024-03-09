multiversx_sc::imports!();
multiversx_sc::derive_imports!();

#[derive(TypeAbi, TopEncode, TopDecode, PartialEq, Debug)]
pub struct Spell<M: ManagedTypeApi> {
    numero: u64,
    start_at: u64,
    end_at: u64,
    bonus: BigUint,
}
