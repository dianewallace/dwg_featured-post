import MetaDropdown from '../components/MetaDropdown';

( function( wp ) {
	/**
	 * Registers a new block provided a unique name and an object defining its behavior.
	 * @see https://github.com/WordPress/gutenberg/tree/master/blocks#api
	 */
	const { registerBlockType } = wp.blocks;

	/**
	 * Component used for server-side rendering a preview of dynamic blocks to display in the editor.
	 * @see https://github.com/WordPress/gutenberg/tree/master/packages/components/src/server-side-render
	 */
	const { ServerSideRender } = wp.components;

	/**
	 * Components used to generate block controls.
	 * @see https://github.com/WordPress/gutenberg/tree/master/packages/components
	 */
	const { TextControl } = wp.components;

	/**
	 * Inspector Controls appear in the post settings sidebar when a block is being edited.
	 * @see https://github.com/WordPress/gutenberg/tree/master/packages/editor/src/components/inspector-controls
	 */
	const { InspectorControls } = wp.blockEditor;

	/**
	 * Retrieves the translation of text.
	 * @see https://github.com/WordPress/gutenberg/tree/master/i18n#api
	 */
	const { __ } = wp.i18n;

	/**
	 * Every block starts by registering InspectorControls new block type definition.
	 * @see https://wordpress.org/gutenberg/handbook/block-api/
	 */
	registerBlockType( 'dwg/featured-post', {
		/**
		 * This is the display title for your block, which can be translated with `i18n` functions.
		 * The block inserter will show this name.
		 */
		title: __( 'Featured Post', 'dwg-featured-post' ),

		/**
		 * An icon property should be specified to make it easier to identify a block.
		 * These can be any of WordPress’ Dashicons, or a custom svg element.
		 */
		icon: 'media-default',

		/**
		 * Blocks are grouped into categories to help users browse and discover them.
		 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
		 */
		category: 'widgets',

		/**
		 * The edit function describes the structure of your block in the context of the editor.
		 * This represents what the editor will render when the block is used.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#edit
		 *
		 * @param {Object} [props] Properties passed from the editor.
		 * @return {Element}       Element to render.
		 */
		edit: props => {
			const {
				attributes: {
					heading,
					post_id,
					options = [],
				}
			} = props;

			const updateHeading = newValue => {
				props.setAttributes( { heading: newValue } );
			};

			const updateContentId = newValue => {
				props.setAttributes( { post_id: newValue } );
			};

			const isEmpty = post_id.length > 0 ? false : true;

			return (
				<div>
					{ isEmpty ? (
						__( 'Please add a Summit to the Block Control.', 'dwg-featured-post' )
					) : (
						<ServerSideRender
							block='dwg/featured-post'
							attributes={ props.attributes }
						/>
					) }
					{ /* Add controls to the Block sidebar */ }
					<InspectorControls>
						<TextControl
							label='Block Title'
							placeholder='Add your title here...'
							value={ props.attributes.heading }
							onChange={ updateHeading }
						/>
						<MetaDropdown
							label={ __( 'Select a Summit:' ) }
							value={ props.attributes.post_id }
							onChange={ updateContentId }
							options={ options }
						/>
					</InspectorControls>
				</div>
			);
		},

		/**
		 * The save function defines the way in which the different attributes should be combined
		 * into the final markup, which is then serialized by Gutenberg into `post_content`.
		 * @see https://wordpress.org/gutenberg/handbook/block-edit-save/#save
		 *
		 * @return {Element}       Element to render.
		 */
		save: function() {
			// return null for ServerSideRender. Otherwise return return el();
			return null
		}
	} );
} )(
	window.wp
);
