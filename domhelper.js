window.DOMHelper = ( function() {
    'use strict';

    const instances = [];

	class $ {

        elements = [];

        /**
         * Constructor
         *
         * @param {string|object} selector
         */
        constructor(selector) {
            if (typeof selector === 'string') {
                this.elements = document.querySelectorAll(selector);
            } else {
                this.elements = [selector];
            }
        }
        
        /**
         * Iterate elements
         * @param {Function} callback 
         */
        each(callback) {
            if (typeof callback === 'function') {
                this.elements.forEach((element, i) => {
                    callback(element, i);
                });
            }
        }

        /**
         * Attach event
         * 
         * @param {string} event 
         * @param {string|Function} selector 
         * @param {Function} callback 
         */
        on(event, selector, callback) {
            if (typeof selector === 'function') {
                this.each( element => {
                    element.addEventListener(event, function(e) {
                        const bindElement = selector.bind(e.target)
                        bindElement(e);
                    }, false)
                });
                return this;
            }
            // Event delegation
            if (typeof selector === 'string' && typeof callback === 'function') {
                this.each(element => {
                    element.addEventListener(event, function(e) {
                        if (e.target.matches(selector)) {
                            const bindElement = callback.bind(e.target)
                            bindElement(e);
                        }
                    }, false);
                });
            }
            return this;
        }

        /**
         * Add class to elements
         * @param {string} className 
         */
        addClass(className) {
            this.each(element => {
                element.classList.add(className);
            });
            return this;
        }

        /**
         * Remove class from elements
         * @param {string} className 
         */
        removeClass(className) {
            this.each(element => {
                element.classList.remove(className);
            });
            return this;
        }

        /**
         * 
         * @param {string} className 
         */
        toggleClass(className) {
            this.each(element => {
                element.classList.toggle(className);
            });
            return this;
        }

        /**
         * Show elements
         */
        show() {
            this.each(element => {
                element.style.display = '';
            });
            return this;
        }

        /**
         * Hide elements
         */
        hide() {
            this.each(element => {
                element.style.display = 'none';
            });
            return this;
        }

        /**
         * Toggle elements visibility
         */
        toggle() {
            this.each(element => {
                element.style.display = (element.style.display === 'none') ? '' : 'none';
            });
            return this;
        }

        /**
         * Set element attribute
         * 
         * @param {string} name 
         * @param {string} value 
         */
        attr(name, value) {
            this.each(element => {
                if (!value) {
                    return element.getAttribute(name);
                }
                element.setAttribute(name, value);
            });
            return this;
        }

        /**
         * Remove element attribute
         * 
         * @param {string} name 
         */
        removeAttr(name) {
            this.each(element => element.removeAttribute(name));
            return this;
        }

        /**
         * Update or get elements html content
         * @param {string} html 
         */
        html(html) {
            this.each( element => {
                if (!html) {
                    return element.innerHTML;
                }
                element.innerHTML = html;
            });
            return this;
        }

        /**
         * Update or get elements text content
         * @param {string} html 
         */
        text(text) {
            this.each( element => {
                if (!text) {
                    return element.innerText;
                }
                element.innerText = text;
            });
            return this;
        }

       /**
        * Get or set data attribute
        * @param {string} key 
        * @param {string} value 
        */
        data(key, value) {
            this.each( element => {
                if (!value) {
                    return element.dataset[key];
                }
                element.dataset[key] = value;
            });
            return this;
        }

        /**
         * Append node
         * @param {string} node 
         */
        append(node) {
            this.each(element => {
                element.append(node);
            });
            return this;
        }

        /**
         * Prepend node
         * @param {string} node 
         */
        prepend(node) {
            this.each(element => {
                element.prepend(node);
            });
            return this;
        }
    }

    // Instantiate
    return selector => {
        const instantiated = instances.find( instance => instance.selector === selector )

        // Check if selector is already instantiated
        if ( instantiated ) {
            return instantiated.instance;
        }

        const instance = new $(selector);

        instances.push({ selector, instance });

        return instance;
    }

}());
