import '../sass/main.scss';
/**
 * @fileoverview File to group all the DOM events.
 */
import { SampleDefault } from './components/sample/default.js';
import DOMEvents from './common/dom-events.js';
import { firebaseService } from './services/firebase';

/**
 * Array with the configuration of the components to initialize.
 * @type {!Array<!Object>}
 */
const components = [
  {
    component: SampleDefault,
    key: '.sample',
  },
];

/**
 * Array with the configuration of the services to initialize.
 * All services need a method called initializes.
 * @type {!Array<!Object>}
 */
const services = [
  firebaseService,
];

/**
 * Maps over the services and initialize them.
 * @param {!Array<!Object>} services
 * @private
 */
function initializeServices_(services) {
  services.forEach((service) => {
    service.initialize();
  });
}

/**
 * Maps over all the components and initialize them based
 *    on the instances of the root param.
 * @param {!HTMLDocument} root
 * @param {!Array<!Object>} components
 * @private
 */
function initializePageComponents_(root, components) {
  components.forEach(({ component, key }) => {
    const instances = /** type{!Array<!Element>}**/(root.querySelectorAll(key));
    // eslint-disable-next-line new-cap
    instances.forEach((instance) => new component(instance));
  });
}

/**
 * Calls initialize functions for services and components when HTML has been
 * loaded and parsed.
 */
document.addEventListener(DOMEvents.DOM_CONTENT_LOADED, () => {
  console.log('initializing components...');
  initializeServices_(services);
  initializePageComponents_(document, components);
});
