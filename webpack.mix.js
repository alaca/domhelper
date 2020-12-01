const mix = require( 'laravel-mix' );

mix
	.setPublicPath( 'public' )
	.sourceMaps( false )
	.js( 'src/domhelper.js', 'public/' );
