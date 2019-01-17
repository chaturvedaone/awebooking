<?php
/**
 * The loader file.
 *
 * @package AweBooking
 */

/**
 * First, we need autoload via Composer to make everything works.
 */
require __DIR__ . '/vendor/autoload.php';

require_once __DIR__ . '/vendor/wplibs/form/functions.php';
require_once __DIR__ . '/vendor/wplibs/http/functions.php';
require_once __DIR__ . '/vendor/cmb2/cmb2/init.php';

// For dev only, will be remove in the future when packages stable.
$_dev_packages = [
	__DIR__ . '/awethemes/relationships/vendor/autoload.php',
];

foreach ( $_dev_packages as $_package ) {
	if ( file_exists( $_package ) ) {
		require_once $_package;
	}
}

// Require helpers & functions.
require trailingslashit( __DIR__ ) . 'inc/Support/helpers.php';
require trailingslashit( __DIR__ ) . 'inc/Core/sanitizer.php';

/**
 * Then, require the main class.
 */
require_once trailingslashit( __DIR__ ) . 'inc/Plugin.php';

/**
 * Alias the class "AweBooking\Plugin" to "AweBooking".
 */
class_alias( \AweBooking\Plugin::class, 'AweBooking', false );
