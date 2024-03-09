// Code generated by the multiversx-sc build system. DO NOT EDIT.

////////////////////////////////////////////////////
////////////////// AUTO-GENERATED //////////////////
////////////////////////////////////////////////////

// Init:                                 1
// Endpoints:                           29
// Async Callback (empty):               1
// Total number of exported functions:  31

#![no_std]

// Configuration that works with rustc < 1.73.0.
// TODO: Recommended rustc version: 1.73.0 or newer.
#![feature(lang_items)]

multiversx_sc_wasm_adapter::allocator!();
multiversx_sc_wasm_adapter::panic_handler!();

multiversx_sc_wasm_adapter::endpoints! {
    shadowlands
    (
        init => init
        upgrade => upgrade
        stake => stake
        unstake => unstake
        claim => claim
        choose_faction => choose_faction
        donate => donate
        set_rewards_token_total_supply => set_rewards_token_total_supply
        set_rewards_token_amount_per_day => set_rewards_token_amount_per_day
        withdraw => withdraw
        restart_staking => restart_staking
        stop_staking => stop_staking
        calculateRewards => calculate_rewards
        getMyFaction => get_my_faction
        getCurrentRewards => get_current_rewards
        getNftNonce => get_nft_nonce
        getUnstakeTime => get_unstake_time
        getNftIdentifier => nft_identifier
        getMinimumStakingDays => minimum_staking_days
        getRewardsTokenId => rewards_token_id
        getRewardsTokenAmountPerDay => rewards_token_amount_per_day
        getStakingInfo => staking_info
        getStakingStatus => staking_status
        getStakingEndTime => staking_end_time
        getRewardsTokenTotalSupply => rewards_token_total_supply
        getNbrOfStakers => nbr_of_stakers
        getNbrOfNftStaked => nbr_of_nft_staked
        getFactionMembers => faction_members
        getPriceChooseFaction => price_choose_faction
        getFactionBank => faction_bank
    )
}

multiversx_sc_wasm_adapter::async_callback_empty! {}
