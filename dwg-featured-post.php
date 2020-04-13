<?php
/**
 * Plugin Name: Guteberg Featured Post
 * Plugin URI:  https://github.com/dianewallace/dw-gutenberg-featured-post
 * Description: Block with dropdown to select featured post.
 * Version:     1.0.0
 * Author:      Diane Wallace
 * Author URI:  http://dianewallace.co.uk
 * Text Domain: dwg-featured-post
 */

declare(strict_types=1);

defined( 'ABSPATH' ) or exit();

define( 'DWG_FEATURED_POST_URL', plugin_dir_url( __FILE__ ) );
define( 'DWG_FEATURED_POST_DIR', plugin_dir_path( __FILE__ ) );

define(
	'DWG_FEATURED_POST_DEFAULTS',
	[
		'heading' => [
			'type' => 'string',
			'default' => __( 'Featured Post', 'dwg-featured-post' )
		],
		'post_id' => [
			'type' => 'string',
			'default' => ''
		]
	]
);

require_once DWG_FEATURED_POST_DIR . 'blocks/init.php';

add_action( 'enqueue_block_editor_assets', 'dwg_featured_post_block_assets' );
add_action( 'init', 'dwg_featured_post_block_init' );
add_action( 'init', 'dwg_featured_post_register_meta' );
