/**
 * WordPress dependencies.
 */

const {
	Component
} = wp.element;

const {
	BaseControl,
	SelectControl
} = wp.components;

const {
	withSelect,
	withDispatch,
} = wp.data;

const {
	compose,
} = wp.compose;

const { __ } = wp.i18n;

/**
 * Custom Component that gets post ids from meta and passes that to a post query.
 */
class MetaDropdown extends Component {
	render () {
		const {
			label,
			multiple = false,
			value,
			onChange,
			posts,
			meta,
		} = this.props;

		if ( !posts ) {
			return __( 'Loading summits...', 'dwg-featured-post' );
		}

		if ( posts.length === 0 ) {
			return __( 'No summits to select', 'dwg-featured-post' );
		}

		let post = posts[ 0 ];

		let options = [];
		let option = { value: '', label: __( 'Choose a summit for this block', 'dwg-featured-post' ) };
		options.push( option );

		for ( let i = 0; i < posts.length; i++ ) {
			option = { value: posts[ i ].id, label: posts[i].meta.featured + ' - ' + posts[ i ].title.raw };
			options.push( option );
		}

		return (
			<SelectControl
				multiple={ multiple }
				label={ label }
				value={ value }
				onChange={ onChange }
				options={ options }
			/>
		)
	}
}

// Fetch the posts by ID.
const applyWithSelect = withSelect( ( select ) => {

	const { getEntityRecords } = select( 'core' );
	const { getEditedPostAttribute } = select( 'core/editor' );
	let query = { per_page: -1, orderby: 'slug', order: 'asc', parent: 0, status: ['publish', 'future'] };

	return {
		posts : getEntityRecords( 'postType', 'post', query ),
		meta  : getEditedPostAttribute( 'meta' ),
	}
} )

// Combine the higher-order components.
export default compose( [
	applyWithSelect
] )( MetaDropdown );
