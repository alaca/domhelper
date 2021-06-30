window.DOMHelper = ( function() {
	'use strict';

	/**
	 *
	 * @type {<Object>[]}
	 */
	const instances = [];

	class $ {

		/**
		 *
		 * @type {Object[]|NodeListOf<Object>}
		 */
		elements;

		/**
		 * Constructor
		 *
		 * @param {string|object} selector
		 */
		constructor( selector ) {
			if ( typeof selector === 'string' ) {
				this.elements = document.querySelectorAll( selector );
			} else {
				this.elements = [ selector ];
			}
		}

		/**
		 * Iterate elements
		 * @param {Function} callback
		 */
		each( callback ) {
			this.elements.forEach( ( element, i ) => {
				callback( element, i );
			} );
		}

		/**
		 * Attach event
		 *
		 * @param {string} event
		 * @param {string|Function} selector
		 * @param {Function} [callback]
		 * @return {$}
		 */
		on( event, selector, callback ) {
			if ( typeof selector === 'function' ) {
				this.each( element => {
					element.addEventListener( event, function( e ) {
						const bindElement = selector.bind( e.target );
						bindElement( e );
					}, false );
				} );
				return this;
			}
			// Event delegation
			if ( typeof selector === 'string' && typeof callback === 'function' ) {
				this.each( element => {
					element.addEventListener( event, function( e ) {
						if ( e.target.matches( selector ) ) {
							const bindElement = callback.bind( e.target );
							bindElement( e );
						}
					}, false );
				} );
			}
			return this;
		}

		/**
		 * Add class to elements
		 * @param {string} className
		 * @return {$}
		 */
		addClass( className ) {
			this.each( element => {
				element.classList.add( className );
			} );
			return this;
		}

		/**
		 * Remove class from elements
		 * @param {string} className
		 * @return {$}
		 */
		removeClass( className ) {
			this.each( element => {
				element.classList.remove( className );
			} );
			return this;
		}

		/**
		 *
		 * @param {string} className
		 * @return {$}
		 */
		toggleClass( className ) {
			this.each( element => {
				element.classList.toggle( className );
			} );
			return this;
		}

		/**
		 * @param {string} className
		 * @return {boolean}
		 */
		hasClass( className ) {
			return this.elements[ 0 ].classList.contains( className );
		}

		/**
		 * Get closest element
		 *
		 * @param {string} selector
		 * @return {$}
		 */
		closest( selector ) {
			return new $( this.elements[ 0 ].closest( selector ) );
		}

		/**
		 * Get parent element
		 *
		 * @return {$}
		 */
		parent() {
			return new $( this.elements[ 0 ].parentElement );
		}

		/**
		 * Get first element
		 *
		 * @return {$}
		 */
		first() {
			return new $( this.elements[ 0 ] );
		}

		/**
		 * Get last element
		 *
		 * @return {$}
		 */
		last() {
			return new $( this.elements[ this.elements.length - 1 ] );
		}

		/**
		 * @param {number} index
		 * @return {$}
		 */
		eq( index ) {
			return new $( this.elements[ index ] );
		}

		/**
		 * Remove elements
		 */
		remove() {
			this.each( element => {
				element.parentNode.removeChild( element );
			} );
		}

		/**
		 * Show elements
		 *
		 * @return {$}
		 */
		show() {
			this.each( element => {
				element.style.display = '';
			} );
			return this;
		}

		/**
		 * Hide elements
		 *
		 * @return {$}
		 */
		hide() {
			this.each( element => {
				element.style.display = 'none';
			} );
			return this;
		}

		/**
		 * Toggle elements visibility
		 *
		 * @return {$}
		 */
		toggle() {
			this.each( element => {
				element.style.display = ( element.style.display === 'none' ) ? '' : 'none';
			} );
			return this;
		}

		/**
		 * Set element attribute
		 *
		 * @param {string} name
		 * @param {string} [value]
		 * @returns {string|$}
		 */
		attr( name, value ) {
			if ( ! value ) {
				return this.elements[ 0 ].getAttribute( name );
			}
			this.each( element => {
				element.setAttribute( name, value );
			} );
			return this;
		}

		/**
		 * Remove element attribute
		 *
		 * @param {string} name
		 * @return {$}
		 */
		removeAttr( name ) {
			this.each( element => element.removeAttribute( name ) );
			return this;
		}

		/**
		 * Update or get elements html content
		 * @param {string} [html]
		 * @returns {string|$}
		 */
		html( html ) {
			if ( ! html ) {
				return this.elements[ 0 ].innerHTML;
			}
			this.each( element => {
				element.innerHTML = html;
			} );
			return this;
		}

		/**
		 * Update or get elements text content
		 * @param {string} [text]
		 * @returns {string|$}
		 */
		text( text ) {
			if ( ! text ) {
				return this.elements[ 0 ].innerText;
			}
			this.each( element => {
				element.innerText = text;
			} );
			return this;
		}

		/**
		 * Get or set data attribute
		 * @param {string} key
		 * @param {string} [value]
		 * @returns {string|$}
		 */
		data( key, value ) {
			if ( ! value ) {
				return this.elements[ 0 ].dataset[ key ];
			}
			this.each( element => {
				element.dataset[ key ] = value;
			} );
			return this;
		}

		/**
		 * Append node
		 * @param {(Node|string)} node
		 * @return {$}
		 */
		append( node ) {
			this.each( element => {
				element.append( node );
			} );
			return this;
		}

		/**
		 * Prepend node
		 * @param {(Node|string)} node
		 * @return {$}
		 */
		prepend( node ) {
			this.each( element => {
				element.prepend( node );
			} );
			return this;
		}

		/**
		 * @param {Object.<string, string>} styles
		 * @example {fontWeight: 'bold'}
		 * @return {$}
		 */
		css( styles ) {
			this.each( element => {
				for ( const [ property, value ] of Object.entries( styles ) ) {
					element.style[ property ] = value;
				}
			} );
			return this;
		}
	}

	// Instantiate
	return selector => {
		const instantiated = instances.find( instance => instance.selector === selector );

		// Check if selector is already instantiated
		if ( instantiated ) {
			return instantiated.instance;
		}

		const instance = new $( selector );

		instances.push( { selector, instance } );

		return instance;
	};

}() );
