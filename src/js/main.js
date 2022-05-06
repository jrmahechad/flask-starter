/**
 * @fileoverview File to group all the DOM events.
 */
import { SampleDefault } from './components/sample/default.js'
import DOMEvents from './common/dom-events.js';

/**
 * Array with the configuration of the components to initialize.
 * @type {!Array<!Object>}
 */
const components = [
  {
    component: SampleDefault,
    key: '.sample',
  },
]

/**
 * Maps over all the components and initialize them based
 *    on the instances of the root param.
 * @param {!HTMLDocument} root
 * @param {!Array<!Object>} components
 * @private
 */
 function initializePageComponents_(root, components) {
  components.forEach(({ component, key, services = [] }) => {
    const instances = /** type{!Array<!Element>}**/(root.querySelectorAll(key));
    instances.forEach((instance) => new component(instance, ...services));
  });
}

 /**
 * Calls initialize functions for services and components when HTML has been
 * loaded and parsed.
 */
document.addEventListener(DOMEvents.DOM_CONTENT_LOADED, () => {
  console.log('initializing components...')
  initializePageComponents_(document, components);
});