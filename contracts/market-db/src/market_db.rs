#![no_std]  

multiversx_sc::imports!();

#[multiversx_sc::contract]
pub trait MarketDb {

    #[init]
    fn init(&self, token_id: EgldOrEsdtTokenIdentifier, price: BigUint, nft_identifier: EgldOrEsdtTokenIdentifier) {
        self.token_id().set_if_empty(&token_id);
        self.price().set_if_empty(&price);
        self.nft_identifier().set_if_empty(&nft_identifier);
        self.bank().set_if_empty(BigUint::from(0u32));
    }

    #[upgrade]
    fn upgrade(&self, token_id: EgldOrEsdtTokenIdentifier, price: BigUint, nft_identifier: EgldOrEsdtTokenIdentifier) {
        self.token_id().set(&token_id);
        self.price().set(&price);
        self.nft_identifier().set(&nft_identifier);
    }


    #[payable("*")]
    #[endpoint]
    fn buy(
        &self,
        #[payment_token] payment_token: EgldOrEsdtTokenIdentifier,
        #[payment_amount] payment_amount: BigUint,
        nft_identifier: EgldOrEsdtTokenIdentifier,
        nft_nonce: u64,
    ) -> SCResult<()> {
        require!(
            payment_token == self.token_id().get(),
            "Invalid payment token"
        );

        require!(
            payment_amount == self.price().get(),
            "Invalid payment amount"
        );
        
        require!(
            nft_identifier == self.nft_identifier().get(),
            "Invalid nft identifier"
        );

        let caller = self.blockchain().get_caller();

        let amount = BigUint::from(1u32);
        self.send().direct(&caller, &nft_identifier, nft_nonce, &amount);

        // Add the amount to the bank
        let bank = self.bank().get();
        self.bank().set(&bank + &payment_amount);


        Ok(())
    }


    #[only_owner]
    #[endpoint]
    fn withdraw(&self) -> SCResult<()> {

        let caller = self.blockchain().get_caller();
        let token_id = self.token_id().get();
        let bank = self.bank().get();

        self.send()
            .direct(&caller, &token_id, 0, &bank);

        // reset the bank
        self.bank().set(BigUint::from(0u32));

        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn change_price(&self, price: BigUint) -> SCResult<()> {

        self.price().set(&price);

        Ok(())
    }

    #[only_owner]
    #[endpoint]
    fn change_nft_identifier(&self, nft_identifier: EgldOrEsdtTokenIdentifier) -> SCResult<()> {

        self.nft_identifier().set(&nft_identifier);

        Ok(())
    }


    #[view(getBank)]
    #[storage_mapper("bank")]
    fn bank(&self) -> SingleValueMapper<BigUint>;

    #[view(getTokenId)]
    #[storage_mapper("token_id")]
    fn token_id(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[view(getNftIdentifier)]
    #[storage_mapper("nft_identifier")]
    fn nft_identifier(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[view(getPrice)]
    #[storage_mapper("price")]
    fn price(&self) -> SingleValueMapper<BigUint>;

    

   



}
