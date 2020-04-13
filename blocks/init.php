<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package dwg-featured-post
 */

declare(strict_types=1);

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @since 1.3.0
 */
function dwg_featured_post_block_assets() {
	global $post;
	if( empty( $post ) ) $post = get_queried_object();
	wp_enqueue_script(
		'dwg-featured-post-blocks',
		trailingslashit( DWG_FEATURED_POST_URL ) . 'blocks/block.build.js',
		[
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-components',
			'wp-editor',
		],
		'1'
	);
}

/**
 * Register Featured post block.
 *
 * @since 1.3.0
 */
function dwg_featured_post_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type(
		'dwg/featured-post',
		[
			'attributes'      => DWG_FEATURED_POST_DEFAULTS,
			'editor_script'   => 'dwg-featured-post-blocks',
//			'render_callback' => 'dwg_featured_post'
		]
	);
}

/**
 * Register featured post meta field.
 */
function dwg_featured_post_register_meta() {

	register_meta(
		'post',
		'featured',
		[
			'show_in_rest'  => true,
			'single'        => true,
			'type'          => 'string',
			'auth_callback' => function() {
				return current_user_can( 'edit_posts' );
			}
		]
	);
}
