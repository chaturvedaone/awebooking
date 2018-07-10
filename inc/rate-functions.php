<?php

use AweBooking\Model\Pricing\Base_Rate;
use AweBooking\Model\Pricing\Contracts\Rate;
use AweBooking\Model\Pricing\Base_Rate_Interval;
use AweBooking\Model\Pricing\Contracts\Rate_Interval;

/**
 * Gets the base rate by a room type.
 *
 * @param  \AweBooking\Model\Room_Type|int $room_type The room type ID.
 * @return \AweBooking\Model\Pricing\Base_Rate|null
 */
function abrs_get_base_rate( $room_type ) {
	return ( $room_type = abrs_get_room_type( $room_type ) )
		? new Base_Rate( $room_type )
		: null;
}

/**
 * Gets the base rate by a room type.
 *
 * @param  \AweBooking\Model\Room_Type|int $room_type The room type ID.
 *
 * @return \AweBooking\Model\Pricing\Base_Rate_Interval|null
 */
function abrs_get_base_rate_interval( $room_type ) {
	return ( $room_type = abrs_get_room_type( $room_type ) )
		? new Base_Rate_Interval( $room_type )
		: null;
}

/**
 * Retrieves the rate object.
 *
 * Just a placeholder function for pro version :).
 *
 * @param  mixed $rate The rate ID.
 * @return \AweBooking\Model\Pricing\Contracts\Rate|null
 */
function abrs_get_rate( $rate ) {
	return $rate instanceof Base_Rate ? $rate
		: apply_filters( 'abrs_get_rate_object', null, $rate );
}

/**
 * Retrieves the rate interval object.
 *
 * Just a placeholder function for pro version.
 *
 * @param  mixed $rate The rate interval ID.
 * @return \AweBooking\Model\Pricing\Contracts\Rate_Interval|null
 */
function abrs_get_rate_interval( $rate ) {
	return ( $rate instanceof Base_Rate_Interval ) ? $rate
		: apply_filters( 'abrs_get_rate_object', null, $rate );
}

/**
 * Query rates in a room type.
 *
 * Just a placeholder function for pro version.
 *
 * @param  \AweBooking\Model\Room_Type|int $room_type The room type ID.
 * @return \AweBooking\Support\Collection
 */
function abrs_query_rates( $room_type ) {
	return abrs_collect( apply_filters( 'abrs_query_rates', [], $room_type ) )
		->filter( function ( $rate ) {
			return $rate instanceof Rate;
		})->sortBy( function( Rate $rate ) {
			return $rate->get_priority();
		})->values();
}

/**
 * Query single rates inside rate.
 *
 * Just a placeholder function for pro version :).
 *
 * @param \AweBooking\Model\Pricing\Contracts\Rate|int $rate The rate belong to room type.
 * @return \AweBooking\Support\Collection
 */
function abrs_query_rate_intervals( $rate ) {
	return abrs_collect( apply_filters( 'abrs_query_rate_intervals', [], $rate ) )
		->filter( function ( $plan ) {
			return $plan instanceof Rate_Interval;
		})->sortBy( function ( Rate_Interval $rate ) {
			return $rate->get_priority();
		})->values();
}
