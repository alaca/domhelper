# DOM Helper

A small helper utility that provides basic methods for DOM manipulation. API inspired by jQuery.

## API

* [.on(event, [selector], function)](#onevent-selector-function)
* [.each(function)](#eachfunction)
* [.addClass(className|array)](#addclassclassnamearray)
* [.removeClass(className|array)](#removeclassclassnamearray)
* [.toggleClass(className|array)](#toggleclassclassnamearray)
* [.hasClass(className)](#hasclassclassname)
* [.closest(selector)](#closestselector)
* [.parent()](#parent)
* [.first()](#first)
* [.last()](#last)
* [.eq(index)](#eqindex)
* [.remove()](#remove)
* [.show()](#show)
* [.hide()](#hide)
* [.toggle()](#toggle)
* [.attr(name, [value])](#attrname-value)
* [.removeAttr(name)](#removeattrname)
* [.html([html])](#htmlhtml)
* [.text([text])](#texttext)
* [.data(key, [value])](#datakey-value)
* [.append(node|string)](#appendnodestring)
* [.prepend(node|string)](#prependnodestring)
* [.css(styles)](#cssstyles)

#### .on(event, [selector], function)

Attach an event handler function to the selected elements.

```js
$( '#elementId' ).on( 'click', function() {
	console.log( $( this ).html() );
} );
```

Event delegation

```js
$( document ).on( 'click', '#elementId', function() {
	console.log( $( this ).html() );
} );
```

#### .each(function)

Iterate over a NodeList object, executing a function for each matched Element.

```js
$( 'li' ).each( function( element, index ) {
	console.log( $( element ).html() );
} );
```

#### .addClass(className|array)

Adds the specified class to element.

```js
$( '#elementId' ).addClass( 'test-class' );
```

Adding multiple classes.

```js
$( '#elementId' ).addClass( [ 'one', 'two' ] );
```

#### .removeClass(className|array)

Removes the specified class from element.

```js
$( '#elementId' ).removeClass( 'test-class' );
```

Removing multiple classes.

```js
$( '#elementId' ).removeClass( [ 'one', 'two' ] );
```

#### .toggleClass(className|array)

Add or remove class from element, depending on the class's presence.

```js
$( '#elementId' ).toggleClass( 'test-class' );
```


Toggle multiple classes.

```js
$( '#elementId' ).toggleClass( [ 'one', 'two' ] );
```

#### .hasClass(className)

Determine whether any of the matched elements are assigned the given class.

```js
if ( $( '#elementId' ).hasClass( 'test-class' ) ) {
	console.log( 'yep' );
}
```

#### .closest(selector)

Get the first element that matches the selector by testing the element itself and traversing up through its ancestors in
the DOM tree.

```js
const closestSection = $( '#elementId' ).closest( '.section' );
console.log( closestSection.html() );
```

#### .parent()

Get the parent element.

```js
const parentElement = $( '#elementId' ).parent();
console.log( parentElement.html() );
```

#### .first()

Reduce the set of matched elements to the first in the set.

```js
$( '#navigation li' ).first().addClass( 'first' );
```

#### .last()

Reduce the set of matched elements to the final one in the set.

```js
$( '#navigation li' ).last().addClass( 'last' );
```

#### .eq(index)

Reduce the set of matched elements to the one at the specified index.

```js
$( '#navigation li' ).eq( 2 ).addClass( 'third' );
```

#### .remove()

Remove the set of matched elements from the DOM.

```js
$( '.section' ).remove();
```

#### .show()

Display the matched elements.

```js
$( '.section' ).show();
```

#### .hide()

Hide the matched elements.

```js
$( '.section' ).hide();
```

#### .toggle()

Display or hide the matched elements.

```js
$( '.section' ).toggle();
```

#### .attr(name, [value])

Get the value of an attribute for the first element in the set of matched elements or set attribute for every matched
element.

Set attribute

```js
$( 'a' ).attr( 'href', 'https://github.com/alaca/domhelper' );
```

Get attribute

```js
const href = $( 'a.latest' ).attr( 'href' );
console.log( href );
```

#### .removeAttr(name)

Remove an attribute from each element in the set of matched elements.

```js
$( 'a' ).removeAttr( 'href' );
```

#### .html([html])

Get the HTML contents of the first element in the set of matched elements or set the HTML contents to matched elements.

Get HTML contents

```js
const htmlContent = $( '.section' ).html();
console.log( htmlContent );
```

Set HTML contents

```js
$( '.section' ).html( '<h1>Section content</h1>' );
```

#### .text([text])

Get the text contents of the first element in the set of matched elements or set the text content to matched elements.

Get text content

```js
const textContent = $( '.section' ).text();
console.log( textContent );
```


Set text content

```js
$( '.section' ).text( 'Section content' );
```

#### .data(key, [value])

Store arbitrary data associated with the specified element or return the value that was set.

```js
$( '.section' ).data( 'info', 'Additional info' );
```

Get data attribute value

```js
const info = $( '.section' ).data( 'info' );
console.log( info );
```

#### .append(node|string)

Insert content to the end of each element in the set of matched elements.

```js
$( '.section' ).append( ' this is appended text' );
```

Append node

```js
const element = $( document.createElement( 'div' ) ).text( 'Appended element content' );
$( '.section' ).append( element );
```

#### .prepend(node|string)

Insert content to the beginning of each element in the set of matched elements.

```js
$( '.section' ).prepend( ' this is prepended text' );
```

Prepend node

```js
const element = $( document.createElement( 'div' ) ).text( 'Prepended element content' );
$( '.section' ).prepend( element );
```

#### .css(styles)

Set CSS styles of each element in the set of matched elements.

```js
$( '.section' ).css( {
	color: 'red',
	fontWeight: 'bold'
} );
```

Using string literals 

```js
const styles = `
    folor: red; 
    font-weight: bold;
`;

$( '.section' ).css( styles );
```
