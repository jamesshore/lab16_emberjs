(function() {

var define, requireModule, require, requirejs;

(function() {

  var _isArray;
  if (!Array.isArray) {
    _isArray = function (x) {
      return Object.prototype.toString.call(x) === "[object Array]";
    };
  } else {
    _isArray = Array.isArray;
  }
  
  var registry = {}, seen = {}, state = {};
  var FAILED = false;

  define = function(name, deps, callback) {
  
    if (!_isArray(deps)) {
      callback = deps;
      deps     =  [];
    }
  
    registry[name] = {
      deps: deps,
      callback: callback
    };
  };

  function reify(deps, name, seen) {
    var length = deps.length;
    var reified = new Array(length);
    var dep;
    var exports;

    for (var i = 0, l = length; i < l; i++) {
      dep = deps[i];
      if (dep === 'exports') {
        exports = reified[i] = seen;
      } else {
        reified[i] = require(resolve(dep, name));
      }
    }

    return {
      deps: reified,
      exports: exports
    };
  }

  requirejs = require = requireModule = function(name) {
    if (state[name] !== FAILED &&
        seen.hasOwnProperty(name)) {
      return seen[name];
    }

    if (!registry[name]) {
      throw new Error('Could not find module ' + name);
    }

    var mod = registry[name];
    var reified;
    var module;
    var loaded = false;

    seen[name] = { }; // placeholder for run-time cycles

    try {
      reified = reify(mod.deps, name, seen[name]);
      module = mod.callback.apply(this, reified.deps);
      loaded = true;
    } finally {
      if (!loaded) {
        state[name] = FAILED;
      }
    }

    return reified.exports ? seen[name] : (seen[name] = module);
  };

  function resolve(child, name) {
    if (child.charAt(0) !== '.') { return child; }

    var parts = child.split('/');
    var nameParts = name.split('/');
    var parentBase;

    if (nameParts.length === 1) {
      parentBase = nameParts;
    } else {
      parentBase = nameParts.slice(0, -1);
    }

    for (var i = 0, l = parts.length; i < l; i++) {
      var part = parts[i];

      if (part === '..') { parentBase.pop(); }
      else if (part === '.') { continue; }
      else { parentBase.push(part); }
    }

    return parentBase.join('/');
  }

  requirejs.entries = requirejs._eak_seen = registry;
  requirejs.clear = function(){
    requirejs.entries = requirejs._eak_seen = registry = {};
    seen = state = {};
  };
})();

define('chai', ['exports'], function (exports) {

	'use strict';

	/* globals chai */

	var expect = chai.expect;
	var assert = chai.assert;

	var use = chai.use;
	var Assertion = chai.Assertion;

	exports.expect = expect;
	exports.assert = assert;
	exports.use = use;
	exports.Assertion = Assertion;

});
define('ember-mocha', ['exports', 'ember-mocha/describe-module', 'ember-mocha/describe-component', 'ember-mocha/describe-model', 'ember-mocha/it', 'ember-test-helpers'], function (exports, describeModule, describeComponent, describeModel, it, ember_test_helpers) {

  'use strict';

  Object.defineProperty(exports, 'describeModule', { enumerable: true, get: function () { return describeModule['default']; }});
  Object.defineProperty(exports, 'describeComponent', { enumerable: true, get: function () { return describeComponent['default']; }});
  Object.defineProperty(exports, 'describeModel', { enumerable: true, get: function () { return describeModel['default']; }});
  Object.defineProperty(exports, 'it', { enumerable: true, get: function () { return it['default']; }});
  Object.defineProperty(exports, 'setResolver', { enumerable: true, get: function () { return ember_test_helpers.setResolver; }});

});
define('ember-mocha/describe-component', ['exports', 'ember-mocha/mocha-module', 'ember-test-helpers'], function (exports, mocha_module, ember_test_helpers) {

  'use strict';

  function describeComponent(name, description, callbacks, tests) {
    mocha_module.createModule(ember_test_helpers.TestModuleForComponent, name, description, callbacks, tests);
  }

  describeComponent.only = mocha_module.createOnly(ember_test_helpers.TestModuleForComponent);

  describeComponent.skip = mocha_module.createSkip(ember_test_helpers.TestModuleForComponent);

  exports['default'] = describeComponent;

});
define('ember-mocha/describe-model', ['exports', 'ember-mocha/mocha-module', 'ember-test-helpers'], function (exports, mocha_module, ember_test_helpers) {

  'use strict';

  function describeModel(name, description, callbacks, tests) {
    mocha_module.createModule(ember_test_helpers.TestModuleForModel, name, description, callbacks, tests);
  }

  describeModel.only = mocha_module.createOnly(ember_test_helpers.TestModuleForModel);

  describeModel.skip = mocha_module.createSkip(ember_test_helpers.TestModuleForModel);

  exports['default'] = describeModel;

});
define('ember-mocha/describe-module', ['exports', 'ember-mocha/mocha-module', 'ember-test-helpers'], function (exports, mocha_module, ember_test_helpers) {

  'use strict';

  function describeModule(name, description, callbacks, tests) {
    mocha_module.createModule(ember_test_helpers.TestModule, name, description, callbacks, tests);
  }

  describeModule.only = mocha_module.createOnly(ember_test_helpers.TestModule);

  describeModule.skip = mocha_module.createSkip(ember_test_helpers.TestModule);

  exports['default'] = describeModule;

});
define('ember-mocha/it', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  function resetViews() {
    Ember['default'].View.views = {};
  }

  var originalIt = window.it;

  function wrap(specifier) {
    return function (testName, callback) {
      var wrapper;

      if (!callback) {
        wrapper = null;
      } else if (callback.length === 1) {
        wrapper = function(done) {
          resetViews();
          return callback.call(this, done);
        };
      } else {
        wrapper = function() {
          resetViews();
          return callback.call(this);
        };
      }

      if (wrapper) {
        wrapper.toString = function() {
          return callback.toString();
        };
      }

      return specifier(testName, wrapper);
    };
  }

  var wrappedIt = wrap(window.it);
  wrappedIt.only = wrap(window.it.only);
  wrappedIt.skip = function(testName, callback) {
    originalIt(testName);
  };

  exports['default'] = wrappedIt;

});
define('ember-mocha/mocha-module', ['exports', 'mocha', 'ember', 'ember-test-helpers'], function (exports, mocha, Ember, ember_test_helpers) {

  'use strict';

  exports.createModule = createModule;
  exports.createOnly = createOnly;
  exports.createSkip = createSkip;

  function createModule(Constructor, name, description, callbacks, tests, method) {
    var module;

    if (!tests) {
      if (!callbacks) {
        tests = description;
        callbacks = {};
      } else {
        tests = callbacks;
        callbacks = description;
      }
      module = new Constructor(name, callbacks);

    } else {
      module = new Constructor(name, description, callbacks);
    }


    function moduleBody() {
      mocha.beforeEach(function() {
        module.setup();
        var context = ember_test_helpers.getContext();
        var keys = Ember['default'].keys(context);
        for (var i = 0; i < keys.length; i++) {
          var key = keys[i];
          this[key] = context[key];
        }
      });

      mocha.afterEach(function() {
        module.teardown();
      });

      tests = tests || function() {};
      tests();
    }
    if (method) {
      mocha.describe[method](module.name, moduleBody);
    } else {
      mocha.describe(module.name, moduleBody);
    }
  }

  function createOnly(Constructor) {
    return function(name, description, callbacks, tests) {
      createModule(Constructor, name, description, callbacks, tests, "only");
    };
  }

  function createSkip(Constructor) {
    return function(name, description, callbacks, tests) {
      createModule(Constructor, name, description, callbacks, tests, "skip");
    };
  }

});
define('ember-test-helpers', ['exports', 'ember', 'ember-test-helpers/isolated-container', 'ember-test-helpers/test-module', 'ember-test-helpers/test-module-for-component', 'ember-test-helpers/test-module-for-model', 'ember-test-helpers/test-module-for-integration', 'ember-test-helpers/test-context', 'ember-test-helpers/test-resolver'], function (exports, Ember, isolatedContainer, TestModule, TestModuleForComponent, TestModuleForModel, TestModuleForIntegration, test_context, test_resolver) {

  'use strict';

  Object.defineProperty(exports, 'isolatedContainer', { enumerable: true, get: function () { return isolatedContainer['default']; }});
  Object.defineProperty(exports, 'TestModule', { enumerable: true, get: function () { return TestModule['default']; }});
  Object.defineProperty(exports, 'TestModuleForComponent', { enumerable: true, get: function () { return TestModuleForComponent['default']; }});
  Object.defineProperty(exports, 'TestModuleForModel', { enumerable: true, get: function () { return TestModuleForModel['default']; }});
  Object.defineProperty(exports, 'TestModuleForIntegration', { enumerable: true, get: function () { return TestModuleForIntegration['default']; }});
  Object.defineProperty(exports, 'getContext', { enumerable: true, get: function () { return test_context.getContext; }});
  Object.defineProperty(exports, 'setContext', { enumerable: true, get: function () { return test_context.setContext; }});
  Object.defineProperty(exports, 'setResolver', { enumerable: true, get: function () { return test_resolver.setResolver; }});

  Ember['default'].testing = true;

});
define('ember-test-helpers/isolated-container', ['exports', 'ember-test-helpers/test-resolver', 'ember'], function (exports, test_resolver, Ember) {

  'use strict';

  function exposeRegistryMethodsWithoutDeprecations(container) {
    var methods = [
      'register',
      'unregister',
      'resolve',
      'normalize',
      'typeInjection',
      'injection',
      'factoryInjection',
      'factoryTypeInjection',
      'has',
      'options',
      'optionsForType'
    ];

    function exposeRegistryMethod(container, method) {
      container[method] = function() {
        return container._registry[method].apply(container._registry, arguments);
      };
    }

    for (var i = 0, l = methods.length; i < l; i++) {
      exposeRegistryMethod(container, methods[i]);
    }
  }

  function isolatedContainer(fullNames) {
    var resolver = test_resolver.getResolver();
    var container;

    var normalize = function(fullName) {
      return resolver.normalize(fullName);
    };

    if (Ember['default'].Registry) {
      var registry = new Ember['default'].Registry();
      registry.normalizeFullName = normalize;

      container = registry.container();
      exposeRegistryMethodsWithoutDeprecations(container);

    } else {
      container = new Ember['default'].Container();

      //normalizeFullName only exists since Ember 1.9
      if (Ember['default'].typeOf(container.normalizeFullName) === 'function') {
        container.normalizeFullName = normalize;
      } else {
        container.normalize = normalize;
      }
    }

    container.optionsForType('component', { singleton: false });
    container.optionsForType('view', { singleton: false });
    container.optionsForType('template', { instantiate: false });
    container.optionsForType('helper', { instantiate: false });
    container.register('component-lookup:main', Ember['default'].ComponentLookup);
    container.register('controller:basic', Ember['default'].Controller, { instantiate: false });
    container.register('controller:object', Ember['default'].ObjectController, { instantiate: false });
    container.register('controller:array', Ember['default'].ArrayController, { instantiate: false });
    container.register('view:default', Ember['default']._MetamorphView);
    container.register('view:toplevel', Ember['default'].View.extend());
    container.register('view:select', Ember['default'].Select);
    container.register('route:basic', Ember['default'].Route, { instantiate: false });

    for (var i = fullNames.length; i > 0; i--) {
      var fullName = fullNames[i - 1];
      var normalizedFullName = resolver.normalize(fullName);
      container.register(fullName, resolver.resolve(normalizedFullName));
    }
    return container;
  }
  exports['default'] = isolatedContainer;

});
define('ember-test-helpers/test-context', ['exports'], function (exports) {

  'use strict';

  exports.setContext = setContext;
  exports.getContext = getContext;

  var __test_context__;

  function setContext(context) {
    __test_context__ = context;
  }

  function getContext() {
    return __test_context__;
  }

});
define('ember-test-helpers/test-module-for-component', ['exports', 'ember-test-helpers/test-module', 'ember', 'ember-test-helpers/test-resolver'], function (exports, TestModule, Ember, test_resolver) {

  'use strict';

  exports['default'] = TestModule['default'].extend({
    init: function(componentName, description, callbacks) {
      this.componentName = componentName;

      this._super.call(this, 'component:' + componentName, description, callbacks);

      this.setupSteps.push(this.setupComponent);
    },

    setupComponent: function() {
      var _this = this;
      var resolver = test_resolver.getResolver();
      var container = this.container;
      var context = this.context;

      var layoutName = 'template:components/' + this.componentName;

      var layout = resolver.resolve(layoutName);

      if (layout) {
        container.register(layoutName, layout);
        container.injection(this.subjectName, 'layout', layoutName);
      }

      context.dispatcher = Ember['default'].EventDispatcher.create();
      context.dispatcher.setup({}, '#ember-testing');

      this.callbacks.render = function() {
        var containerView = Ember['default'].ContainerView.create({container: container});
        Ember['default'].run(function(){
          var subject = context.subject();
          containerView.pushObject(subject);
          containerView.appendTo('#ember-testing');
        });

        _this.teardownSteps.unshift(function() {
          Ember['default'].run(function() {
            Ember['default'].tryInvoke(containerView, 'destroy');
          });
        });
      };

      this.callbacks.append = function() {
        Ember['default'].deprecate('this.append() is deprecated. Please use this.render() or this.$() instead.');
        return context.$();
      };

      context.$ = function() {
        this.render();
        var subject = this.subject();

        return subject.$.apply(subject, arguments);
      };
    }
  });

});
define('ember-test-helpers/test-module-for-integration', ['exports', 'ember', 'ember-test-helpers/test-module', 'ember-test-helpers/test-resolver', 'ember-test-helpers/test-context'], function (exports, Ember, TestModule, test_resolver, test_context) {

  'use strict';

  exports['default'] = TestModule['default'].extend({

    isIntegration: true,

    init: function(name, description, callbacks) {
      this._super.call(this, name, description, callbacks);
      this.setupSteps.push(this.setupIntegrationHelpers);
      this.teardownSteps.push(this.teardownView);
    },

    setupIntegrationHelpers: function() {
      var self = this;
      var context = this.context;
      context.dispatcher = Ember['default'].EventDispatcher.create();
      context.dispatcher.setup({}, '#ember-testing');
      this.actionHooks = {};

      context.render = function(template) {
        if (Ember['default'].isArray(template)) {
          template = template.join('');
        }
        if (typeof template === 'string') {
          template = Ember['default'].Handlebars.compile(template);
        }
        self.view = Ember['default'].View.create({
          context: context,
          controller: self,
          template: template,
          container: self.container
        });
        Ember['default'].run(function() {
          self.view.appendTo('#ember-testing');
        });
      };

      context.$ = function() {
        return self.view.$.apply(self.view, arguments);
      };

      context.set = function(key, value) {
        Ember['default'].run(function() {
          Ember['default'].set(context, key, value);
        });
      };

      context.get = function(key) {
        return Ember['default'].get(context, key);
      };

      context.on = function(actionName, handler) {
        self.actionHooks[actionName] = handler;
      };

    },

    setupContext: function() {

      test_context.setContext({
        container:  this.container,
        factory: function() {},
        dispatcher: null
      });

      this.context = test_context.getContext();
    },

    send: function(actionName) {
      var hook = this.actionHooks[actionName];
      if (!hook) {
        throw new Error("integration testing template received unexpected action " + actionName);
      }
      hook.apply(this, Array.prototype.slice.call(arguments, 1));
    },

    teardownView: function() {
      var view = this.view;
      if (view) {
        Ember['default'].run(function() {
          view.destroy();
        });
      }
    }

  });

});
define('ember-test-helpers/test-module-for-model', ['exports', 'ember-test-helpers/test-module', 'ember'], function (exports, TestModule, Ember) {

  'use strict';

  exports['default'] = TestModule['default'].extend({
    init: function(modelName, description, callbacks) {
      this.modelName = modelName;

      this._super.call(this, 'model:' + modelName, description, callbacks);

      this.setupSteps.push(this.setupModel);
    },

    setupModel: function() {
      var container = this.container;
      var defaultSubject = this.defaultSubject;
      var callbacks = this.callbacks;
      var modelName = this.modelName;

      if (DS._setupContainer) {
        DS._setupContainer(container);
      } else {
        container.register('store:main', DS.Store);
      }

      var adapterFactory = container.lookupFactory('adapter:application');
      if (!adapterFactory) {
        container.register('adapter:application', DS.FixtureAdapter);
      }

      callbacks.store = function(){
        var container = this.container;

        return container.lookup('store:main');
      };

      if (callbacks.subject === defaultSubject) {
        callbacks.subject = function(options) {
          var container = this.container;

          return Ember['default'].run(function() {
            return container.lookup('store:main').createRecord(modelName, options);
          });
        };
      }
    }
  });

});
define('ember-test-helpers/test-module', ['exports', 'ember', 'ember-test-helpers/isolated-container', 'ember-test-helpers/test-context', 'klassy', 'ember-test-helpers/test-resolver'], function (exports, Ember, isolatedContainer, test_context, klassy, test_resolver) {

  'use strict';

  exports['default'] = klassy.Klass.extend({
    init: function(subjectName, description, callbacks) {
      // Allow `description` to be omitted, in which case it should
      // default to `subjectName`
      if (!callbacks && typeof description === 'object') {
        callbacks = description;
        description = subjectName;
      }

      this.subjectName = subjectName;
      this.description = description || subjectName;
      this.name = description || subjectName;
      this.callbacks = callbacks || {};

      if (this.callbacks.integration) {
        this.isIntegration = callbacks.integration;      
        delete callbacks.integration;
      }

      this.initSubject();
      this.initNeeds();
      this.initSetupSteps();
      this.initTeardownSteps();
    },

    initSubject: function() {
      this.callbacks.subject = this.callbacks.subject || this.defaultSubject;
    },

    initNeeds: function() {
      this.needs = [this.subjectName];
      if (this.callbacks.needs) {
        this.needs = this.needs.concat(this.callbacks.needs)
        delete this.callbacks.needs;
      }
    },

    initSetupSteps: function() {
      this.setupSteps = [];
      this.contextualizedSetupSteps = [];

      if (this.callbacks.beforeSetup) {
        this.setupSteps.push( this.callbacks.beforeSetup );
        delete this.callbacks.beforeSetup;
      }

      this.setupSteps.push(this.setupContainer);
      this.setupSteps.push(this.setupContext);
      this.setupSteps.push(this.setupTestElements);

      if (this.callbacks.setup) {
        this.contextualizedSetupSteps.push( this.callbacks.setup );
        delete this.callbacks.setup;
      }
    },

    initTeardownSteps: function() {
      this.teardownSteps = [];
      this.contextualizedTeardownSteps = [];

      if (this.callbacks.teardown) {
        this.contextualizedTeardownSteps.push( this.callbacks.teardown );
        delete this.callbacks.teardown;
      }

      this.teardownSteps.push(this.teardownSubject);
      this.teardownSteps.push(this.teardownContainer);
      this.teardownSteps.push(this.teardownContext);
      this.teardownSteps.push(this.teardownTestElements);

      if (this.callbacks.afterTeardown) {
        this.teardownSteps.push( this.callbacks.afterTeardown );
        delete this.callbacks.afterTeardown;
      }
    },

    setup: function() {
      this.invokeSteps(this.setupSteps);
      this.contextualizeCallbacks();
      this.invokeSteps(this.contextualizedSetupSteps, this.context);
    },

    teardown: function() {
      this.invokeSteps(this.contextualizedTeardownSteps, this.context);
      this.invokeSteps(this.teardownSteps);
      this.cache = null;
      this.cachedCalls = null;
    },

    invokeSteps: function(steps, _context) {
      var context = _context;
      if (!context) {
        context = this;
      }

      for (var i = 0, l = steps.length; i < l; i++) {
        steps[i].call(context);
      }
    },

    setupContainer: function() {
      if (this.isIntegration) {
        this._setupIntegratedContainer();
      } else {
        this._setupIsolatedContainer();
      }
    },

    setupContext: function() {
      var subjectName = this.subjectName;
      var container = this.container;

      var factory = function() {
        return container.lookupFactory(subjectName);
      };

      test_context.setContext({
        container:  this.container,
        factory:    factory,
        dispatcher: null
      });

      this.context = test_context.getContext();
    },

    setupTestElements: function() {
      if (Ember['default'].$('#ember-testing').length === 0) {
        Ember['default'].$('<div id="ember-testing"/>').appendTo(document.body);
      }
    },

    teardownSubject: function() {
      var subject = this.cache.subject;

      if (subject) {
        Ember['default'].run(function() {
          Ember['default'].tryInvoke(subject, 'destroy');
        });
      }
    },

    teardownContainer: function() {
      var container = this.container;
      Ember['default'].run(function() {
        container.destroy();
      });
    },

    teardownContext: function() {
      var context = this.context;
      if (context.dispatcher) {
        Ember['default'].run(function() {
          context.dispatcher.destroy();
        });
      }
    },

    teardownTestElements: function() {
      Ember['default'].$('#ember-testing').empty();
      Ember['default'].View.views = {};
    },

    defaultSubject: function(options, factory) {
      return factory.create(options);
    },

    // allow arbitrary named factories, like rspec let
    contextualizeCallbacks: function() {
      var _this     = this;
      var callbacks = this.callbacks;
      var context   = this.context;
      var factory   = context.factory;

      this.cache = this.cache || {};
      this.cachedCalls = this.cachedCalls || {};

      var keys = Ember['default'].keys(callbacks);

      for (var i = 0, l = keys.length; i < l; i++) {
        (function(key) {

          context[key] = function(options) {
            if (_this.cachedCalls[key]) { return _this.cache[key]; }

            var result = callbacks[key].call(_this, options, factory());

            _this.cache[key] = result;
            _this.cachedCalls[key] = true;

            return result;
          };

        })(keys[i]);
      }
    },


    _setupIsolatedContainer: function() {
      this.container = isolatedContainer['default'](this.needs);
    },

    _setupIntegratedContainer: function() {
      var resolver = test_resolver.getResolver();
      var namespace = Ember['default'].Object.create({
        Resolver: { create: function() { return resolver; } }
      });

      if (Ember['default'].Application.buildRegistry) {
        var registry;
        registry = Ember['default'].Application.buildRegistry(namespace);
        registry.register('component-lookup:main', Ember['default'].ComponentLookup);
        this.registry = registry;
        this.container = registry.container();
      } else {
        this.container = Ember['default'].Application.buildContainer(namespace);
        this.container.register('component-lookup:main', Ember['default'].ComponentLookup);
      }
    }

  });

});
define('ember-test-helpers/test-resolver', ['exports'], function (exports) {

  'use strict';

  exports.setResolver = setResolver;
  exports.getResolver = getResolver;

  var __resolver__;

  function setResolver(resolver) {
    __resolver__ = resolver;
  }

  function getResolver() {
    if (__resolver__ == null) throw new Error('you must set a resolver with `testResolver.set(resolver)`');
    return __resolver__;
  }

});
define('klassy', ['exports'], function (exports) {

  'use strict';

  /**
   Extend a class with the properties and methods of one or more other classes.

   When a method is replaced with another method, it will be wrapped in a
   function that makes the replaced method accessible via `this._super`.

   @method extendClass
   @param {Object} destination The class to merge into
   @param {Object} source One or more source classes
   */
  var extendClass = function(destination) {
    var sources = Array.prototype.slice.call(arguments, 1);
    var source;

    for (var i = 0, l = sources.length; i < l; i++) {
      source = sources[i];

      for (var p in source) {
        if (source.hasOwnProperty(p) &&
          destination[p] &&
          typeof destination[p] === 'function' &&
          typeof source[p] === 'function') {

          /* jshint loopfunc:true */
          destination[p] =
            (function(destinationFn, sourceFn) {
              var wrapper = function() {
                var prevSuper = this._super;
                this._super = destinationFn;

                var ret = sourceFn.apply(this, arguments);

                this._super = prevSuper;

                return ret;
              };
              wrapper.wrappedFunction = sourceFn;
              return wrapper;
            })(destination[p], source[p]);

        } else {
          destination[p] = source[p];
        }
      }
    }
  };

  // `subclassing` is a state flag used by `defineClass` to track when a class is
  // being subclassed. It allows constructors to avoid calling `init`, which can
  // be expensive and cause undesirable side effects.
  var subclassing = false;

  /**
   Define a new class with the properties and methods of one or more other classes.

   The new class can be based on a `SuperClass`, which will be inserted into its
   prototype chain.

   Furthermore, one or more mixins (object that contain properties and/or methods)
   may be specified, which will be applied in order. When a method is replaced
   with another method, it will be wrapped in a function that makes the previous
   method accessible via `this._super`.

   @method defineClass
   @param {Object} SuperClass A base class to extend. If `mixins` are to be included
   without a `SuperClass`, pass `null` for SuperClass.
   @param {Object} mixins One or more objects that contain properties and methods
   to apply to the new class.
   */
  var defineClass = function(SuperClass) {
    var Klass = function() {
      if (!subclassing && this.init) {
        this.init.apply(this, arguments);
      }
    };

    if (SuperClass) {
      subclassing = true;
      Klass.prototype = new SuperClass();
      subclassing = false;
    }

    if (arguments.length > 1) {
      var extendArgs = Array.prototype.slice.call(arguments, 1);
      extendArgs.unshift(Klass.prototype);
      extendClass.apply(Klass.prototype, extendArgs);
    }

    Klass.constructor = Klass;

    Klass.extend = function() {
      var args = Array.prototype.slice.call(arguments, 0);
      args.unshift(Klass);
      return defineClass.apply(Klass, args);
    };

    return Klass;
  };

  /**
   A base class that can be extended.

   @example

   ```javascript
   var CelestialObject = Klass.extend({
     init: function(name) {
       this._super();
       this.name = name;
       this.isCelestialObject = true;
     },
     greeting: function() {
       return 'Hello from ' + this.name;
     }
   });

   var Planet = CelestialObject.extend({
     init: function(name) {
       this._super.apply(this, arguments);
       this.isPlanet = true;
     },
     greeting: function() {
       return this._super() + '!';
     },
   });

   var earth = new Planet('Earth');

   console.log(earth instanceof Klass);           // true
   console.log(earth instanceof CelestialObject); // true
   console.log(earth instanceof Planet);          // true

   console.log(earth.isCelestialObject);          // true
   console.log(earth.isPlanet);                   // true

   console.log(earth.greeting());                 // 'Hello from Earth!'
   ```

   @class Klass
   */
  var Klass = defineClass(null, {
    init: function() {}
  });

  exports.Klass = Klass;
  exports.defineClass = defineClass;
  exports.extendClass = extendClass;

});
define('mocha', ['exports'], function (exports) {

  'use strict';

  /* globals mocha, describe, it */

  exports.mocha = mocha;
  exports.describe = describe;
  exports.it = it;
  exports.before = before;
  exports.beforeEach = beforeEach;
  exports.after = after;
  exports.afterEach = afterEach;

});
define("ember", ["exports"], function(__exports__) {
  __exports__["default"] = window.Ember;
});

var emberMocha = requireModule("ember-mocha");

window.describeModule = emberMocha.describeModule;
window.describeComponent = emberMocha.describeComponent;
window.describeModel = emberMocha.describeModel;
window.it = emberMocha.it;
window.setResolver = emberMocha.setResolver;

})();
//# sourceMappingURL=ember-mocha.map