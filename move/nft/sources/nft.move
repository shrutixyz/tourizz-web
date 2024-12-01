module nft::nft;

use std::string::{Self, String};

public struct TouristPlaceNFT has key, store {
    id: UID,
    name: String,
    city: String,
    latitude: u32,
    longitude: u32,
}

public fun mint_tourist_place_nft(
    name: vector<u8>,
    city: vector<u8>,
    latitude: u32,
    longitude: u32,
    ctx: &mut TxContext,
): TouristPlaceNFT {
    TouristPlaceNFT {
        id: object::new(ctx),
        name: string::utf8(name),
        city: string::utf8(city),
        latitude,
        longitude,
    }
}
