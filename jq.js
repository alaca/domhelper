window.DOMHelper = ( function() {
    'use strict';

    const instances = [];

	class $ {

        elements = [];

        constructor(selector) {
            if (typeof selector === 'string') {
                this.elements = document.querySelectorAll(selector);
            } else {
                this.elements = [selector];
            }
        }

        each(callback) {
            if (typeof callback === 'function') {
                this.elements.forEach((element, i) => {
                    callback(element, i);
                });
            }
        }

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

        addClass(className) {
            this.each(element => {
                element.classList.add(className);
            });
            return this;
        }

        removeClass(className) {
            this.each(element => {
                element.classList.remove(className);
            });
            return this;
        }

        toggleClass(className) {
            this.each(element => {
                element.classList.toggle(className);
            });
            return this;
        }

        show() {
            this.each(element => {
                element.style.display = '';
            });
            return this;
        }

        hide() {
            this.each(element => {
                element.style.display = 'none';
            });
            return this;
        }

        toggle() {
            this.each(element => {
                element.style.display = (element.style.display === 'none') ? '' : 'none';
            });
            return this;
        }

        attr(name, value) {
            this.each(element => {
                if (!value) {
                    return element.getAttribute(name);
                }
                element.setAttribute(name, value);
            });
            return this;
        }

        removeAttr(name) {
            this.each(element => element.removeAttribute(name));
            return this;
        }

        html(html) {
            this.each( element => {
                if (!html) {
                    return element.innerHTML;
                }
                element.innerHTML = html;
            });
            return this;
        }

        text(text) {
            this.each( element => {
                if (!text) {
                    return element.innerText;
                }
                element.innerText = text;
            });
            return this;
        }

        data(key, value) {
            this.each( element => {
                if (!value) {
                    return element.dataset[key];
                }
                element.dataset[key] = value;
            });
            return this;
        }
    }

    // Instantiate
    return selector => {
        const instantiated = instances.find( instance => instance.selector === selector )

        if ( instantiated ) {
            return instantiated.instance;
        }

        const instance = new $(selector);

        instances.push({ selector, instance });

        return instance;
    }

}());
