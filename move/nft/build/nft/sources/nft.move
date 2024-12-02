module nft::nft {

    use std::string::{Self, String};

    public struct TouristPlaceNFT has key, store {
        id: UID,
        name: String,
        city: String,
        latitude: String,
        longitude: String,
    }

    public fun mint_tourist_place_nft (
        name: vector<u8>,
        city: vector<u8>,
        latitude: String,
        longitude: String,
        ctx: &mut TxContext,
    ) {
        let nft = TouristPlaceNFT {
            id: object::new(ctx),
            name: string::utf8(name),
            city: string::utf8(city),
            latitude,
            longitude,
        };
        transfer::public_transfer(nft, tx_context::sender(ctx));
    }

}

