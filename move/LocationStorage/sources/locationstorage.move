
// module locationStorage::locationStorage {
//     use sui::object::{Self, UID};
//     use sui::tx_context::{Self, TxContext};
//     use sui::transfer;
//     use std::vector;

//     // Define the Location struct that will store latitude and longitude
//     public struct Location has key {
//         id: UID,
//         latitude: u64,   // Latitude
//         longitude: u64,  // Longitude
//     }

//     // Define the LocationStorage struct that stores multiple location IDs
//     public struct LocationStorage has key {
//         id: UID,
//         location_ids: vector<UID>,  // A vector holding the IDs of stored locations
//     }

//     // Initialize the LocationStorage and move it to the sender's address
//     public fun create_location_storage(ctx: &mut TxContext) {
//         let location_storage = LocationStorage {
//             id: object::new(ctx),
//             location_ids: vector::empty<UID>(),
//         };
//         transfer::transfer(location_storage, tx_context::sender(ctx)); // Move the new LocationStorage to the sender
//     }

//     // Add a location to the LocationStorage
//     public fun add_location(ctx: &mut TxContext, storage: &mut LocationStorage, latitude: u64, longitude: u64) {
//         let new_location = Location { 
//             id: object::new(ctx),
//             latitude, 
//             longitude 
//         };
//         vector::push_back(&mut storage.location_ids, new_location.id); // Add new location ID to the vector
//         transfer::transfer(new_location, tx_context::sender(ctx)); // Transfer the new Location object to the sender
//     }

//     // Fetch all stored location IDs
//     public fun get_all_location_ids(storage: &LocationStorage): vector<UID> {
//         storage.location_ids
//     }
// }

module locationStorage::locationStorage {
    use sui::dynamic_object_field as dof;
    use sui::package;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    public struct Marker has key, store {
        id: UID,
        latitude: u32,
        positive_latitude: bool,
        longitude: u32,
        positive_longitude: bool,
    }

    public struct MarkerList has key, store {
        id: UID,
        markers: vector<Marker>,
    }

    public fun initialise_marker(ctx: &mut TxContext) {
        let marker_list = MarkerList {
            id: object::new(ctx),
            markers: vector::empty(),
        };
        transfer::share_object(marker_list);
    }

    public fun add_marker(
        marker_list: &mut MarkerList,
        latitude: u32,
        positive_latitude: bool,
        longitude: u32,
        positive_longitude: bool,
        ctx: &mut TxContext
    ) {
        let marker = Marker {
            id: object::new(ctx),
            latitude,
            positive_latitude,
            longitude,
            positive_longitude,
        };
        vector::push_back(&mut marker_list.markers, marker);
    }

    public fun get_markers(marker_list: &MarkerList): &vector<Marker> {
        &marker_list.markers
    }
}

