#![no_std]

multiversx_sc::imports!();

use core::ops::Deref;
mod stake_info;
use stake_info::StakeInfo;

#[multiversx_sc::contract]
pub trait NftStaking {
    #[init]
    fn init(
        &self,
        nft_identifier: EgldOrEsdtTokenIdentifier,
        minimum_staking_days: u64,
        rewards_token_id: EgldOrEsdtTokenIdentifier,
        rewards_token_amount_per_day: BigUint,
        rewards_token_total_supply: BigUint,
        price_choose_faction: BigUint,
        price_bonus: BigUint,
    ) {
        self.nft_identifier().set(&nft_identifier);
        self.minimum_staking_days().set(&minimum_staking_days);
        self.rewards_token_id().set(&rewards_token_id);
        self.rewards_token_amount_per_day()
            .set(&rewards_token_amount_per_day);
        self.rewards_token_total_supply()
            .set(&rewards_token_total_supply);
        // if staking status is empty, set it to false
        if self.staking_status().is_empty() {
            self.staking_status().set(true);
        }
        // if staking end time is empty, set it to 0
        if self.staking_end_time().is_empty() {
            self.staking_end_time().set(0);
        }
        // if nbr of stakers is empty, set it to 0
        if self.nbr_of_stakers().is_empty() {
            self.nbr_of_stakers().set(0);
        }
        // if nbr of nft staked is empty, set it to 0
        if self.nbr_of_nft_staked().is_empty() {
            self.nbr_of_nft_staked().set(0);
        }
        // New factions system
        self.price_choose_faction().set_if_empty(&price_choose_faction);
        for i in 1..5 {
            if self.faction_bank(i).is_empty() {
                self.faction_bank(i).set(&BigUint::from(0u32));
            }
        }
        self.price_bonus().set_if_empty(&price_bonus);
    }

    #[upgrade]
    fn upgrade(&self,
        _nft_identifier: EgldOrEsdtTokenIdentifier,
        _minimum_staking_days: u64,
        _rewards_token_id: EgldOrEsdtTokenIdentifier,
        _rewards_token_amount_per_day: BigUint,
        _rewards_token_total_supply: BigUint,
        _price_choose_faction: BigUint,
        _price_bonus: BigUint,
    ) {
            // Currently we don't change stored data on upgrade
            // self.nft_identifier().set(&nft_identifier);
            // self.minimum_staking_days().set(&minimum_staking_days);
            // self.rewards_token_id().set(&rewards_token_id);
            // self.rewards_token_amount_per_day()
            //     .set(&rewards_token_amount_per_day);
            // self.rewards_token_total_supply()
            //     .set(&rewards_token_total_supply);
            // self.price_choose_faction().set_if_empty(&price_choose_faction);
            // for i in 1..5 {
            //     if self.faction_bank(i).is_empty() {
            //         self.faction_bank(i).set(&BigUint::from(0u32));
            //     }
            // }
            // self.price_bonus().set_if_empty(&price_bonus);
    }

    #[payable("*")]
    #[endpoint]
    fn stake(&self) -> SCResult<()> {
        let payments: ManagedVec<EsdtTokenPayment<Self::Api>> = self.call_value().all_esdt_transfers().deref().clone();

        require!(self.staking_status().get(), "The staking is stopped");

        for payment in &payments {
            require!(
                payment.token_identifier == self.nft_identifier().get(),
                "Invalid nft identifier"
            );
            require!(payment.token_nonce != 0, "Invalid nft nonce");
            require!(payment.amount == 1, "You can only send 1 nft");
        }

        let caller: ManagedAddress = self.blockchain().get_caller();

        let cur_time: u64 = self.blockchain().get_block_timestamp();
        let unstake_time = cur_time + (self.minimum_staking_days().get() * 86400);

        if self.staking_info(&caller).is_empty() {
            let mut vec_nonce: ManagedVec<ManagedVec<u64>> = ManagedVec::new();
            for payment in &payments {
                let mut vec_item: ManagedVec<u64> = ManagedVec::new();
                vec_item.push(payment.token_nonce);
                vec_item.push(cur_time);
                vec_nonce.push(vec_item);
            }
            let stake_info = StakeInfo {
                address: self.blockchain().get_caller(),
                nft_nonce_with_lock_time: vec_nonce,
                unstake_time: unstake_time,
            };
            self.staking_info(&self.blockchain().get_caller())
                .set(&stake_info);
            self.nbr_of_stakers().set(self.nbr_of_stakers().get() + 1);
        } else {
            let mut stake_info = self.staking_info(&caller).get();
            // if nonce already exists, return error
            for payment in &payments {
                let mut vec_nonce: ManagedVec<ManagedVec<u64>> = stake_info.nft_nonce_with_lock_time.clone();
                // if nonce already exists, return error
                for n in vec_nonce.iter() {
                    require!(n.get(0) != payment.token_nonce, "You already staked this nft.");
                }
                let mut vec_item: ManagedVec<u64> = ManagedVec::new();
                vec_item.push(payment.token_nonce);
                vec_item.push(cur_time);
                vec_nonce.push(vec_item);
                stake_info.nft_nonce_with_lock_time = vec_nonce;
            }
            stake_info.unstake_time = unstake_time;
            self.staking_info(&caller).set(&stake_info);
        }
        self.nbr_of_nft_staked().set(self.nbr_of_nft_staked().get() + payments.len() as u64);

        Ok(())
    }

    #[endpoint]
    fn unstake(&self) -> SCResult<()> {
        let caller: ManagedAddress = self.blockchain().get_caller();
        let cur_time: u64 = self.blockchain().get_block_timestamp();

        require!(!self.staking_info(&caller).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&caller).get();
        require!(
            stake_info.unstake_time <= cur_time,
            "You can't unlock staking nft yet."
        );

        let nft_identifier = self.nft_identifier().get();
        let nft_nonce_with_lock_time = stake_info.nft_nonce_with_lock_time;
        let nbr_of_nonce: u64 = nft_nonce_with_lock_time.len() as u64;

        let amount = BigUint::from(1u32);

        // for each nft nonce, send nft back to caller
        for n in nft_nonce_with_lock_time.iter() {
            self.send().direct(
                &caller,
                &nft_identifier,
                n.get(0),
                &amount,
            );
        }

        self.staking_info(&caller).clear();

        if self.nbr_of_stakers().get() >= 1 {
            self.nbr_of_stakers().set(self.nbr_of_stakers().get() - 1);
        } else {
            self.nbr_of_stakers().set(0);
        }
        if self.nbr_of_nft_staked().get() >= nbr_of_nonce {
            self.nbr_of_nft_staked().set(self.nbr_of_nft_staked().get() - nbr_of_nonce);
        } else {
            self.nbr_of_nft_staked().set(0);
        }

        Ok(())
    }

    #[endpoint]
    fn claim(&self) -> SCResult<()> {
        let caller: ManagedAddress = self.blockchain().get_caller();
        let cur_time: u64 = self.blockchain().get_block_timestamp();
        let rewards_token_total_supply = self.rewards_token_total_supply().get();

        require!(!self.staking_info(&caller).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&caller).get();

        let nft_nonce_with_lock_time = stake_info.nft_nonce_with_lock_time;
        let unstake_time = stake_info.unstake_time;
        let reward_token_id = self.rewards_token_id().get();

        // calculate rewards
        let mut from_time = cur_time;
        if !self.staking_status().get() {
            from_time = self.staking_end_time().get();
        }
        let faction = self.get_my_faction(&caller);
        // nbr of referees who are stakers
        let mut nbr_of_referrees = 0;
        for referee in self.get_referees(&caller).iter() {
            if !self.staking_info(&referee).is_empty() {
                nbr_of_referrees += 1;
            }
        }
        // add 1 to nbr_of_referrees if he have a referrer
        if !self.get_referrer(&caller).is_empty() {
            nbr_of_referrees += 1;
        }
        let rewards_amount = self.calculate_rewards(&nft_nonce_with_lock_time, from_time, faction,nbr_of_referrees);

        // check the supply
        require!(
            rewards_amount <= rewards_token_total_supply,
            "You can't claim rewards more than total supply."
        );

        // send rewards
        self.send()
            .direct(&caller, &reward_token_id, 0, &rewards_amount);

        // remove rewards amount from rewards_token_total_supply
        if rewards_token_total_supply >= rewards_amount {
            self.rewards_token_total_supply()
                .set(&(rewards_token_total_supply - rewards_amount));
        } else {
            self.rewards_token_total_supply().set(&BigUint::from(0u32));
        }

        // update staking_info
        self.staking_info(&caller).clear();
        // replace index 1 value of each item of nft_nonce_with_lock_time with from_time
        let mut vec_nonce: ManagedVec<ManagedVec<u64>> = ManagedVec::new();
        for n in nft_nonce_with_lock_time.iter() {
            let mut vec_item: ManagedVec<u64> = ManagedVec::new();
            vec_item.push(n.get(0));
            vec_item.push(from_time);
            vec_nonce.push(vec_item);
        }
        let stake_info = StakeInfo {
            address: self.blockchain().get_caller(),
            nft_nonce_with_lock_time: vec_nonce,
            unstake_time: unstake_time,
        };
        self.staking_info(&self.blockchain().get_caller())
            .set(&stake_info);

        Ok(())
    }

    #[payable("*")]
    #[endpoint]
    fn choose_faction(&self, #[payment_token] payment_token: EgldOrEsdtTokenIdentifier,
        #[payment_amount] payment_amount: BigUint, faction: u64) -> SCResult<()> {
        // faction have to be 1, 2, 3 or 4
        require!(faction >= 1 && faction <= 4, "Invalid faction number");
        // caller have to pay price_choose_faction to join a faction
        require!(
            payment_token == self.rewards_token_id().get(),
            "Invalid payment token"
        );
        require!(
            payment_amount == self.price_choose_faction().get(),
            "Invalid payment amount"
        );

        let caller: ManagedAddress = self.blockchain().get_caller();
        let my_faction = self.get_my_faction(&caller);
        // if caller already joined a faction, return error
        require!(my_faction == 0, "You already joined the faction number: {}", my_faction);
        
        self.faction_members(faction).insert(caller);
        Ok(())
    }

    #[payable("*")]
    #[endpoint]
    fn donate(&self, #[payment_token] payment_token: EgldOrEsdtTokenIdentifier,
        #[payment_amount] payment_amount: BigUint, faction: u64) -> SCResult<()> {
        // faction have to be 1, 2, 3 or 4
        require!(faction >= 1 && faction <= 4, "Invalid faction number");
        // caller have to pay price_choose_faction to join a faction
        require!(
            payment_token == self.rewards_token_id().get(),
            "Invalid payment token"
        );
        // return an error if a bonus exist and if the bonus is not expired
        if !self.faction_bonus(faction).is_empty() {
            let bonus_end = self.faction_bonus(faction).get();
            require!(bonus_end <= self.blockchain().get_block_timestamp(), "A bonus is already active for this faction");
        }

        let caller: ManagedAddress = self.blockchain().get_caller();
        let my_faction = self.get_my_faction(&caller);
        require!(my_faction == faction, "You are not in the faction number: {}", faction);

        self.faction_bank(faction).set(&self.faction_bank(faction).get() + &payment_amount);

        // if the bank is equal or greater than the bonus price, the bonus is activated and the bonus price is removed from the bank
        if self.faction_bank(faction).get() >= self.price_bonus().get() {
            self.faction_bonus(faction).set(self.blockchain().get_block_timestamp() + 604800);
            self.faction_bank(faction).set(&self.faction_bank(faction).get() - &self.price_bonus().get());
        }


        Ok(())
    }

    #[endpoint]
    fn refer(&self, referrer: ManagedAddress) -> SCResult<()> {
        let referee: ManagedAddress = self.blockchain().get_caller();
        // check if the referrer is already set
        require!(self.get_referrer(&referee).is_empty(), "You already have a referrer");
        // check if the referrer is not the referee
        require!(referrer != referee, "You can't refer yourself");
        // check if the referrer is a staker
        require!(!self.staking_info(&referrer).is_empty(), "The referrer is not a staker");
        // check if the referee is not already a referee of the referrer
        require!(!self.get_referees(&referrer).contains(&referee), "You are already a referee of the referrer");

        // set the referrer
        self.get_referrer(&referee).set(&referrer);
        // add the referee to the referrer's referees
        self.get_referees(&referrer).insert(referee);
        

        Ok(())
    }

    // Owner endpoints

    #[only_owner]
    #[endpoint]
    fn set_rewards_token_total_supply(&self, total_supply: BigUint) -> SCResult<()> {
        self.rewards_token_total_supply().set(&total_supply);
        Ok(())
    }

    // set rewards_token_amount_per_day
    #[only_owner]
    #[endpoint]
    fn set_rewards_token_amount_per_day(&self, amount: BigUint) -> SCResult<()> {
        self.rewards_token_amount_per_day().set(&amount);
        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn withdraw(&self, amount: BigUint) -> SCResult<()> {
        let caller = self.blockchain().get_caller();

        let token_id = self.rewards_token_id().get();

        self.send()
            .direct(&caller, &token_id, 0, &amount);

        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn restart_staking(&self) -> SCResult<()> {
        self.staking_end_time().set(0);
        self.staking_status().set(true);
        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn stop_staking(&self) -> SCResult<()> {
        let cur_time: u64 = self.blockchain().get_block_timestamp();
        self.staking_end_time().set(cur_time);
        self.staking_status().set(false);
        Ok(())
    }

    #[view(countMyReferees)]
    fn count_my_referees(&self, address: &ManagedAddress) -> u64 {
        // count the number of referees who are stakers
        let mut nbr_of_referrees = 0;
        for referee in self.get_referees(&address).iter() {
            if !self.staking_info(&referee).is_empty() {
                nbr_of_referrees += 1;
            }
        }
        // add 1 to nbr_of_referrees if he have a referrer
        if !self.get_referrer(&address).is_empty() {
            nbr_of_referrees += 1;
        }
        return nbr_of_referrees;
    }

    // Utils
    #[view(calculateRewards)]
    fn calculate_rewards(&self, nft_nonce_with_lock_time: &ManagedVec<ManagedVec<u64>>, from_time: u64, faction: u64, nbr_of_referrees: u64) -> BigUint {
        let mut rewards_amount = BigUint::from(0u32);
        for n in nft_nonce_with_lock_time.iter() {
            let mut staked_days = 0u64;
            if from_time > n.get(1) {
                staked_days = (from_time - (n.get(1) - (n.get(1) % 86400))  ) / 86400;
            }
            rewards_amount += self.rewards_token_amount_per_day().get() * staked_days;
        }
        // if a bonus is active for the faction of the call, add the bonus to the rewards
        if faction != 0 && !self.faction_bonus(faction).is_empty() {
            let bonus_end = self.faction_bonus(faction).get();
            if bonus_end > from_time {
                // 25% bonus
                rewards_amount += &rewards_amount * &BigUint::from(25u32) / &BigUint::from(100u32);
            }
        }
        // bonus of 2% for each of my referrees
        rewards_amount += &rewards_amount * &BigUint::from(nbr_of_referrees * 2) / &BigUint::from(100u32);

        return rewards_amount;
    }


    #[view(getMyFaction)]
    fn get_my_faction(&self, address: &ManagedAddress) -> u64 {
        for i in 1..5 {
            if self.faction_members(i).contains(&address) {
                return i;
            }
        }
        return 0;
    }

    // Views and storage

    #[view(getCurrentRewards)]
    fn get_current_rewards(&self, address: &ManagedAddress) -> BigUint {
        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let cur_time: u64 = self.blockchain().get_block_timestamp();

        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&address).get();

        let mut from_time = cur_time;
        if !self.staking_status().get() {
            from_time = self.staking_end_time().get();
        }

        let faction = self.get_my_faction(&address);
        // nbr of referees who are stakers
        let mut nbr_of_referrees = 0;
        for referee in self.get_referees(&address).iter() {
            if !self.staking_info(&referee).is_empty() {
                nbr_of_referrees += 1;
            }
        }
        // add 1 to nbr_of_referrees if he have a referrer
        if !self.get_referrer(&address).is_empty() {
            nbr_of_referrees += 1;
        }
        return self.calculate_rewards(&stake_info.nft_nonce_with_lock_time, from_time,faction,nbr_of_referrees);
    }

    #[view(getNftNonce)]
    fn get_nft_nonce(&self, address: &ManagedAddress) -> ManagedVec<u64> {
        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&address).get();
        let nft_nonce: ManagedVec<u64> = stake_info.nft_nonce_with_lock_time.iter().map(|x| x.get(0)).collect();
        return nft_nonce;
    }

    // #[view(getLockTime)]
    // fn get_lock_time(&self, address: &ManagedAddress) -> u64 {
    //     require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
    //     let stake_info = self.staking_info(&address).get();
    //     let lock_time: u64 = stake_info.lock_time;
    //     return lock_time;
    // }

    #[view(getUnstakeTime)]
    fn get_unstake_time(&self, address: &ManagedAddress) -> u64 {
        require!(!self.staking_info(&address).is_empty(), "You didn't stake!");
        let stake_info = self.staking_info(&address).get();
        let unstake_time: u64 = stake_info.unstake_time;
        return unstake_time;
    }

    #[view(getNftIdentifier)]
    #[storage_mapper("nft_identifier")]
    fn nft_identifier(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[view(getMinimumStakingDays)]
    #[storage_mapper("minimum_staking_days")]
    fn minimum_staking_days(&self) -> SingleValueMapper<u64>;

    #[view(getRewardsTokenId)]
    #[storage_mapper("rewards_token_id")]
    fn rewards_token_id(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[view(getRewardsTokenAmountPerDay)]
    #[storage_mapper("rewards_token_amount_per_day")]
    fn rewards_token_amount_per_day(&self) -> SingleValueMapper<BigUint>;

    #[view(getStakingInfo)]
    #[storage_mapper("staking_info")]
    fn staking_info(&self, address: &ManagedAddress) -> SingleValueMapper<StakeInfo<Self::Api>>;

    #[view(getStakingStatus)]
    #[storage_mapper("staking_status")]
    fn staking_status(&self) -> SingleValueMapper<bool>;

    #[view(getStakingEndTime)]
    #[storage_mapper("staking_end_time")]
    fn staking_end_time(&self) -> SingleValueMapper<u64>;

    #[view(getRewardsTokenTotalSupply)]
    #[storage_mapper("rewards_token_total_supply")]
    fn rewards_token_total_supply(&self) -> SingleValueMapper<BigUint>;

    #[view(getNbrOfStakers)]
    #[storage_mapper("nbr_of_stakers")]
    fn nbr_of_stakers(&self) -> SingleValueMapper<u64>;

    #[view(getNbrOfNftStaked)]
    #[storage_mapper("nbr_of_nft_staked")]
    fn nbr_of_nft_staked(&self) -> SingleValueMapper<u64>;

    #[view(getFactionMembers)]
    #[storage_mapper("faction_members")]
    fn faction_members(&self, faction: u64) -> UnorderedSetMapper<ManagedAddress>;

    #[view(getPriceChooseFaction)]
    #[storage_mapper("price_choose_faction")]
    fn price_choose_faction(&self) -> SingleValueMapper<BigUint>;

    #[view(getFactionBank)]
    #[storage_mapper("faction_bank")]
    fn faction_bank(&self, faction: u64) -> SingleValueMapper<BigUint>;

    #[view(getPriceBonus)]
    #[storage_mapper("price_bonus")]
    fn price_bonus(&self) -> SingleValueMapper<BigUint>;

    #[view(getFactionBonus)]
    #[storage_mapper("faction_bonus")]
    fn faction_bonus(&self, faction: u64) -> SingleValueMapper<u64>;

    #[view(getReferees)]
    #[storage_mapper("get_referees")]
    fn get_referees(&self, address: &ManagedAddress) -> UnorderedSetMapper<ManagedAddress>;

    #[view(getReferrer)]
    #[storage_mapper("get_referrer")]
    fn get_referrer(&self, address: &ManagedAddress) -> SingleValueMapper<ManagedAddress>;
}
