import React, { useContext, createContext, useState, useEffect, useRef, cloneElement, useReducer, useLayoutEffect, forwardRef, useMemo, useImperativeHandle, Fragment as Fragment$2 } from 'react';
import require$$0 from 'react-is';
import axios from 'axios';
import UAParser from 'ua-parser-js';
import 'core-js/proposals/relative-indexing-method';
import { createPortal } from 'react-dom';
import { jsx, jsxs as jsxs$1, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { jsx as jsx$1, jsxs, Fragment } from '@emotion/react/jsx-runtime';
import mitt from 'mitt';
import { css, ClassNames, keyframes } from '@emotion/react';
import useDimensions from 'react-cool-dimensions';
import { ResizeObserver } from '@juggle/resize-observer';
import useOnclickOutside from 'react-cool-onclickoutside';
import _get from 'dlv';

var logs = {
	bitmovin: false,
	level: "error"
};
var style$a = {
	width: "100%",
	height: "100%"
};
var ui = false;
var BitmovinConfig = {
	logs: logs,
	style: style$a,
	ui: ui
};

var desktop = [
	{
		device: {
			type: "desktop"
		},
		os: {
			name: "*",
			version: "*"
		},
		browser: {
			name: "Chrome",
			version: "60"
		}
	},
	{
		device: {
			type: "desktop"
		},
		os: {
			name: "*",
			version: "*"
		},
		browser: {
			name: "Safari",
			version: "11"
		}
	},
	{
		device: {
			type: "desktop"
		},
		os: {
			name: "*",
			version: "*"
		},
		browser: {
			name: "Firefox",
			version: "60"
		}
	},
	{
		device: {
			type: "desktop"
		},
		os: {
			name: "*",
			version: "*"
		},
		browser: {
			name: "Edge",
			version: "15"
		}
	},
	{
		device: {
			type: "desktop"
		},
		os: {
			name: "Windows",
			version: "8.1"
		},
		browser: {
			name: "IE",
			version: "11"
		}
	}
];

var mobile = [
	{
		device: {
			type: "mobile"
		},
		os: {
			name: "Android",
			version: "5"
		},
		browser: {
			name: "Chrome",
			version: "60"
		}
	},
	{
		device: {
			type: "mobile"
		},
		os: {
			name: "Android",
			version: "5"
		},
		browser: {
			name: "Chrome WebView",
			version: "60"
		}
	},
	{
		device: {
			type: "mobile"
		},
		os: {
			name: "iOS",
			version: "11"
		},
		browser: {
			name: "Mobile Safari",
			version: "11"
		}
	},
	{
		device: {
			type: "tablet"
		},
		os: {
			name: "Android",
			version: "5"
		},
		browser: {
			name: "Chrome",
			version: "60"
		}
	},
	{
		device: {
			type: "tablet"
		},
		os: {
			name: "Android",
			version: "5"
		},
		browser: {
			name: "Chrome WebView",
			version: "60"
		}
	},
	{
		device: {
			type: "tablet"
		},
		os: {
			name: "iOS",
			version: "11"
		},
		browser: {
			name: "Mobile Safari",
			version: "11"
		}
	}
];

var config = {
  BitmovinConfig,
  SupportEnvironment: {
    desktop,
    mobile
  }
};

var propTypes = {exports: {}};

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret$3 = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret$3;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var printWarning$1 = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret$2 = ReactPropTypesSecret_1;
  var loggedTypeFailures = {};
  var has$1 = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning$1 = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes$1(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (has$1(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$2);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning$1(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning$1(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes$1.resetWarningCache = function() {
  if (process.env.NODE_ENV !== 'production') {
    loggedTypeFailures = {};
  }
};

var checkPropTypes_1 = checkPropTypes$1;

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactIs$1 = require$$0;
var assign = objectAssign;

var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
var checkPropTypes = checkPropTypes_1;

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret$1) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret$1);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs$1.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (process.env.NODE_ENV !== 'production') {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret$1) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret$1);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = ReactPropTypesSecret_1;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var ReactIs = require$$0;

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  propTypes.exports = factoryWithTypeCheckers(ReactIs.isElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  propTypes.exports = factoryWithThrowingShims();
}

var PropTypes = propTypes.exports;

const queryString = object => object && typeof object === 'object' && Object.getOwnPropertyNames(object).map(name => `${name}=${encodeURIComponent(object[name])}`).join('&');
function convertToSeconds(timeString) {
  const [hours, minutes, seconds] = timeString.split(':').map(parseFloat);
  return hours * 3600 + minutes * 60 + seconds;
}
function getVersion() {
  try {
    // eslint-disable-next-line no-undef
    return "1.11.0";
  } catch (e) {
    return undefined;
  }
}
function getPopoverPosition(rect, target, boundary) {
  const rectX = rect.x || rect.left;
  const boundaryX = boundary.x || boundary.left;
  const maxLeft = boundary.width - rect.width;
  const targetCenter = (target.left + target.right) / 2 - boundaryX;
  const center = rectX + rect.width / 2 - boundaryX;
  const alignLeft = rectX + (targetCenter - center) - boundaryX;
  return {
    left: Math.max(0, Math.min(alignLeft, maxLeft)),
    top: target.top - rect.height
  };
} // eslint-disable-next-line consistent-return

const nearest = (items, diff) => {
  if (!items.length) {
    return;
  }

  return items.reduce((a, b) => Math.abs(diff(a)) > Math.abs(diff(b)) ? b : a, items[0]);
};

const LanguageCode$1 = {
  EN: 'en',
  JA: 'ja',
  ZHTW: 'zh-TW'
};
const EnvironmentErrorName = {
  NOT_SUPPORT_DEVICE: 'KKS.ERROR.DEVICE_IS_NOT_SUPPORTED',
  NOT_SUPPORT_OS: 'KKS.ERROR.OS_IS_NOT_SUPPORTED',
  NOT_SUPPORT_OS_VERSION: 'KKS.ERROR.PLEASE_UPGRADE_OS',
  NOT_SUPPORT_BROWSER: 'KKS.ERROR.BROWSER_IS_NOT_SUPPORTED',
  NOT_SUPPORT_BROWSER_VERSION: 'KKS.ERROR.PLEASE_UPGRADE_BROWSER'
};
const SeekOrigin = {
  START: 'START',
  CURRENT: 'CURRENT'
};
const CastState = {
  NO_DEVICES_AVAILABLE: 'NO_DEVICES_AVAILABLE',
  CONNECTED: 'CONNECTED',
  CONNECTING: 'CONNECTING',
  NOT_CONNECTED: 'NOT_CONNECTED'
};
const ItemType$1 = {
  VIDEOS: 'videos',
  LIVES: 'lives'
};

/* eslint-disable no-plusplus */
const parser = new UAParser();
function getOS() {
  return parser.getOS();
}
function getDevice() {
  const device = parser.getDevice();
  const osName = getOS().name;
  if (device.type === undefined && osName === 'Android') device.type = 'tablet';
  return device;
}
function getBrowser() {
  return parser.getBrowser();
}
function needNativeHls() {
  // Don't let Android phones play HLS, even if some of them report supported
  // This covers Samsung & OPPO special cases
  const isAndroid = /android/i.test(navigator.userAgent); // canPlayType isn't reliable across all iOS verion / device combinations, so also check user agent

  const isSafari = /^((?!chrome|android).)*(safari|iPad|iPhone)/i.test(navigator.userAgent); // ref: https://stackoverflow.com/a/12905122/4578017
  // none of our supported browsers other than Safari response to this

  const canPlayHls = document.createElement('video').canPlayType('application/vnd.apple.mpegURL');
  return isAndroid || /firefox/i.test(navigator.userAgent) ? '' : isSafari ? 'maybe' : canPlayHls;
}

const isDesktop = () => !getDevice().type;

const isIOS = () => /iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

function compareVersion(v1, v2) {
  if (!/\d+(\.\d+)*/.test(v1)) throw Error(`the version format ${v1} is wrong`);
  if (!/\d+(\.\d+)*/.test(v2)) throw Error(`the version format ${v2} is wrong`);
  const v1parts = v1.split('.').map(p => Number(p));
  const v2parts = v2.split('.').map(p => Number(p));

  for (let i = 0, I = Math.max(v1parts.length, v2parts.length); i < I; i++) {
    if (v1parts[i] !== v2parts[i]) {
      return (v1parts[i] || 0) - (v2parts[i] || 0);
    }
  }

  return 0;
}

const validateEnvironment = (supportEnvironmentList = []) => {
  if (supportEnvironmentList.length === 0) {
    return;
  }

  const device = getDevice();
  const os = getOS();
  const browser = getBrowser();

  const toUnique = list => Array.from(new Set(list));

  const validators = [{
    filter: ({
      device: {
        name,
        type
      }
    }) => name === '*' || type === 'desktop' && device.type === undefined || type === device.type,
    errorName: EnvironmentErrorName.NOT_SUPPORT_DEVICE,
    getErrorProps: list => ({
      allowDevices: toUnique(list.map(env => env.device.type))
    })
  }, {
    filter: ({
      os: {
        name
      }
    }) => name === '*' || name === os.name,
    errorName: EnvironmentErrorName.NOT_SUPPORT_OS,
    getErrorProps: list => ({
      allowOSs: toUnique(list.map(env => env.os.name))
    })
  }, {
    filter: ({
      os: {
        version
      }
    }) => version === '*' || compareVersion(os.version, version) >= 0,
    errorName: EnvironmentErrorName.NOT_SUPPORT_OS_VERSION,
    getErrorProps: list => ({
      minVersion: list[0].os.version
    })
  }, {
    filter: ({
      browser: {
        name
      }
    }) => name === browser.name,
    errorName: EnvironmentErrorName.NOT_SUPPORT_BROWSER,
    getErrorProps: list => ({
      allowBrowsers: toUnique(list.map(env => env.browser.name))
    })
  }, {
    filter: ({
      browser: {
        version
      }
    }) => compareVersion(browser.version, version) >= 0,
    errorName: EnvironmentErrorName.NOT_SUPPORT_BROWSER_VERSION,
    getErrorProps: list => ({
      minVersion: list[0].browser.version
    })
  }];
  let scopes = supportEnvironmentList;

  for (let i = 0; i < validators.length; i++) {
    const validator = validators[i];
    const newScopes = scopes.filter(validator.filter);

    if (newScopes.length === 0) {
      return {
        name: validator.errorName,
        ...validator.getErrorProps(scopes)
      };
    }

    scopes = newScopes;
  }
}; // IE doesn't support pointer query, assume it always have pointer


const havePointerQuery = 'not all and (pointer: coarse), screen and (-ms-high-contrast: active), (-ms-high-contrast: none)';

/* eslint-disable no-param-reassign */
const VideoSourceTypeMap = {
  'application/dash+xml': {
    sourceKeyName: 'dash',
    extension: 'mpd'
  },
  'application/x-mpegurl': {
    sourceKeyName: 'hls',
    extension: 'm3u8'
  }
};
const mimeTypes = {
  hls: 'application/x-mpegurl',
  dash: 'application/dash+xml'
};

const getExtensionByType = srcType => {
  var _VideoSourceTypeMap$s;

  return (_VideoSourceTypeMap$s = VideoSourceTypeMap[srcType]) === null || _VideoSourceTypeMap$s === void 0 ? void 0 : _VideoSourceTypeMap$s.extension;
};

const isStringSourceWithProperExtension = (url, srcType) => {
  if (typeof url === 'string') {
    const extension = url.split('.').at(-1); // eslint-disable-next-line eqeqeq

    if (extension == getExtensionByType(srcType)) return true;
  }

  return false;
};

const matchType = (source, manifestType) => {
  var _source$type, _source$type2;

  return ((_source$type = source.type) === null || _source$type === void 0 ? void 0 : _source$type.includes(manifestType)) || ((_source$type2 = source.type) === null || _source$type2 === void 0 ? void 0 : _source$type2.toLowerCase()) === mimeTypes[manifestType] || isStringSourceWithProperExtension(source.src || source, manifestType);
};

const getDrmOptions$1 = fallbackDrm => {
  if (!(fallbackDrm !== null && fallbackDrm !== void 0 && fallbackDrm.url)) {
    return;
  }

  const drmOptions = {
    licenseUri: fallbackDrm.url,
    headers: fallbackDrm.headers
  };
  return {
    widevine: drmOptions,
    fairplay: { ...drmOptions,
      certificateUri: `${fallbackDrm.url}/fairplay_cert`
    },
    playready: drmOptions
  };
};
/**
 * @typedef {{src: string, type: string}} SourceObject
 * @typedef {{hls: string, dash: string}} SourceObjectAlt backward compatiable form
 *
 * @param {SourceObject[]|SourceObject|SourceObjectAlt|string} sourceOptions
 * @param {{preferManifestType?: ('dash'|'hls')}} options
 * @return {{src: string, type: string, drm: Object}}
 */


const getSource = (sourceOptions, {
  preferManifestType,
  fallbackDrm
} = {}) => {
  if (sourceOptions.dash || sourceOptions.hls) {
    const {
      dash,
      hls
    } = sourceOptions;
    return getSource([hls && {
      src: hls,
      type: mimeTypes.hls
    }, dash && {
      src: dash,
      type: mimeTypes.dash
    }].filter(Boolean), {
      preferManifestType,
      fallbackDrm
    });
  }

  if (!Array.isArray(sourceOptions)) {
    return getSource([sourceOptions], {
      preferManifestType,
      fallbackDrm
    });
  }

  if (fallbackDrm) {
    return getSource(sourceOptions.map(option => ({ ...(option.src ? option : {
        src: option
      }),
      drm: getDrmOptions$1(fallbackDrm)
    }), {
      preferManifestType
    }));
  }

  const matched = sourceOptions.find(source => !preferManifestType || matchType(source, preferManifestType));
  const selected = matched || sourceOptions[0];

  if (!selected) {
    return;
  }

  const type = matched && preferManifestType === 'hls' && mimeTypes.hls;
  return { ...(selected.src ? selected : {
      src: selected
    }),
    type
  };
};

const matchAll = (input, pattern) => {
  const flags = [pattern.global && 'g', pattern.ignoreCase && 'i', pattern.multiline && 'm'].filter(Boolean).join('');
  const clone = new RegExp(pattern, flags);
  return Array.from(function* () {
    let matched = true;

    while (1) {
      matched = clone.exec(input);

      if (!matched) {
        return;
      }

      yield matched;
    }
  }());
};

const rewriteUrls = (manifest, sourceUrl) => manifest.replace(/((#EXT-X-MEDIA:.*URI=")([^"]*))|((#EXT-X-STREAM-INF.*\n)(.*)(?=\n))/g, (...matches) => [matches[2], matches[5], new URL(matches[3] || matches[6], sourceUrl)].filter(Boolean).join(''));

const filterHlsManifestQualities = (manifest, filter) => {
  if (!filter) {
    return;
  }

  const profiles = matchAll(manifest, /RESOLUTION=(\d+)x(\d+)/g).map(([, width, height]) => ({
    width: +width,
    height: +height
  }));
  const allowed = filter(profiles) || profiles;
  const newManifest = manifest.replace(/#EXT-X-STREAM-INF.*RESOLUTION=(\d+)x(\d+).*\n.*\n/g, (item, width, height) => allowed.some(p => p.width === +width && p.height === +height) ? item : '');
  return newManifest !== manifest && newManifest;
};

const meetRestriction = (quality, {
  minHeight,
  maxHeight
} = {}) => !(quality.height < minHeight || quality.height > maxHeight);

const selectHlsQualities = async (source, restrictions = {}) => {
  if (!needNativeHls() || !(restrictions.minHeight || restrictions.maxHeight)) {
    return source;
  }

  const selected = getSource(source, {
    preferManifestType: 'hls'
  });

  if (!((selected === null || selected === void 0 ? void 0 : selected.type.toLowerCase()) === mimeTypes.hls)) {
    return source;
  }

  const filtered = filterHlsManifestQualities((await axios.get(selected.src)).data, items => items.filter(item => meetRestriction(item, restrictions)));

  if (filtered) {
    return { ...selected,

      /*
        Native Safari couldn't support blob .m3u8. and will throw MediaError: 4
        We find the hacky method: dataURI.
        By the way, bitmovin also use this form even user gives the blob URI.
      */
      src: `data:application/x-mpegURL,${encodeURI(rewriteUrls(filtered, selected.src))}`
    };
  }

  return source;
};

const selectRestrictedQuality = (availableQualities, {
  suggested,
  restrictions
}) => {
  if (meetRestriction(suggested, restrictions)) {
    return suggested.id;
  }

  const allowed = availableQualities.filter(quality => meetRestriction(quality, restrictions));
  return (nearest(allowed, item => item.height - suggested.height) || suggested).id;
};
 // for unit test

let lastError = '';
const defaultOptions = {
  ignoreErrors: ['AbortError: The play() request was interrupted', 'i.context.logger'],
  beforeSend: event => {
    if (lastError.message === event.exception.values[0].value && Date.now() - lastError.date < 10000) {
      lastError.date = Date.now();
      return null;
    }

    lastError = {
      date: Date.now(),
      message: event.exception.values[0].value
    };
    return event;
  }
};

const addSentry = ({
  key,
  ...options
}) => {
  const script = document.createElement('script');
  script.crossorigin = 'anonymous';
  script.src = `https://js.sentry-cdn.com/${key}.min.js`;
  script.addEventListener('load', () => {
    window.Sentry.onLoad(() => {
      window.Sentry.init({ ...defaultOptions,
        ...options
      });
    });
  }, {
    once: true
  });
  document.body.append(script);
};

/* eslint-disable react/prop-types */
const extensionContext = /*#__PURE__*/createContext();

const SlotProvider = ({
  slotRef,
  children
}) => {
  const [slots, setSlots] = useState();
  useEffect(() => {
    setSlots(slotRef.current);
  }, []);
  return /*#__PURE__*/jsx(extensionContext.Provider, {
    value: slots,
    children: children
  });
};

const FunctionBarExtension = ({
  children
}) => {
  const slots = useContext(extensionContext);
  return slots !== null && slots !== void 0 && slots.functionBar ? /*#__PURE__*/createPortal(children, slots.functionBar) : '';
};

/* eslint-disable jsx-a11y/no-static-element-interactions */

/* @jsxImportSource @emotion/react */
const backdropStyle = {
  position: 'absolute',
  zIndex: 1,
  top: 0,
  left: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  alignContent: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0)',
  transform: 'translateY(-100%)',
  transition: 'background-color 0.5s ease, transform 0s 0.5s'
};
const backdropOpenStyle = {
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  transform: 'translateY(0)',
  transition: 'background-color 0.5s ease',
  '~ .overlay-backdrop': {
    display: 'none'
  }
}; // eslint-disable-next-line react/prop-types

const Backdrop = ({
  open,
  children,
  onClick,
  ...rest
}) => jsx$1("div", {
  css: [backdropStyle, open && backdropOpenStyle, process.env.NODE_ENV === "production" ? "" : ";label:Backdrop;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJhY2tkcm9wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWdDSSIsImZpbGUiOiJCYWNrZHJvcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9ucyAqL1xuLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuXG5jb25zdCBiYWNrZHJvcFN0eWxlID0ge1xuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgekluZGV4OiAxLFxuICB0b3A6IDAsXG4gIGxlZnQ6IDAsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgZmxleFdyYXA6ICd3cmFwJyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGFsaWduQ29udGVudDogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMCknLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0xMDAlKScsXG4gIHRyYW5zaXRpb246ICdiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZSwgdHJhbnNmb3JtIDBzIDAuNXMnLFxufVxuXG5jb25zdCBiYWNrZHJvcE9wZW5TdHlsZSA9IHtcbiAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjYpJyxcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gIHRyYW5zaXRpb246ICdiYWNrZ3JvdW5kLWNvbG9yIDAuNXMgZWFzZScsXG4gICd+IC5vdmVybGF5LWJhY2tkcm9wJzoge1xuICAgIGRpc3BsYXk6ICdub25lJyxcbiAgfSxcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L3Byb3AtdHlwZXNcbmNvbnN0IEJhY2tkcm9wID0gKHtvcGVuLCBjaGlsZHJlbiwgb25DbGljaywgLi4ucmVzdH0pID0+IChcbiAgPGRpdlxuICAgIGNzcz17W2JhY2tkcm9wU3R5bGUsIG9wZW4gJiYgYmFja2Ryb3BPcGVuU3R5bGVdfVxuICAgIGNsYXNzTmFtZT1cIm92ZXJsYXktYmFja2Ryb3BcIlxuICAgIG9uQ2xpY2s9e2V2ZW50ID0+IHtcbiAgICAgIGlmIChldmVudC50YXJnZXQgPT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgb25DbGljaz8uKClcbiAgICAgIH1cbiAgICB9fVxuICAgIHsuLi5yZXN0fVxuICA+XG4gICAge29wZW4gJiYgY2hpbGRyZW59XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBCYWNrZHJvcFxuIl19 */"],
  className: "overlay-backdrop",
  onClick: event => {
    if (event.target === event.currentTarget) {
      onClick === null || onClick === void 0 ? void 0 : onClick();
    }
  },
  ...rest,
  children: open && children
});

/* @jsxImportSource @emotion/react */
const panelStyle = {
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',
  maxWidth: '100%',
  position: 'absolute',
  bottom: '0',
  transition: 'transform 0s 0.5s',
  transform: 'translateY(100%)',
  '> *:last-of-type': {
    flex: '0 auto',
    transition: 'transform 0.5s ease, opacity 0.5s ease',
    transform: 'translateY(100%)',
    opacity: '0'
  }
};
const panelOpenStyle = {
  transition: 'transform 0s 0s',
  transform: 'translateY(0)',
  '> *:last-of-type': {
    transform: 'translateY(0)',
    opacity: '1'
  }
}; // this is for replacing recommendation panel in future

const panelClosedStyle = height => height && {
  '> *:last-of-type': {
    // workaround IE 11 CSS calc() bug
    transform: `translateY(100%) translateY(-${height})`
  }
};

const BottomPanel = ({
  open,
  style,
  backdrop = true,
  pinned = false,
  minimizedHeight,
  button,
  children,
  onClose
}) => {
  const Wrap = backdrop ? Backdrop : props => props.children;
  return jsxs(Fragment, {
    children: [jsx$1(FunctionBarExtension, {
      children: button
    }), jsx$1(Wrap, {
      open: open,
      onClick: onClose,
      children: jsx$1("div", {
        css: [panelStyle, open ? panelOpenStyle : panelClosedStyle(minimizedHeight), open && style, process.env.NODE_ENV === "production" ? "" : ";label:BottomPanel;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJvdHRvbVBhbmVsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTBEVSIsImZpbGUiOiJCb3R0b21QYW5lbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCB7RnVuY3Rpb25CYXJFeHRlbnNpb259IGZyb20gJy4vdWlFeHRlbnNpb25zJ1xuaW1wb3J0IEJhY2tkcm9wIGZyb20gJy4vQmFja2Ryb3AnXG5cbmNvbnN0IHBhbmVsU3R5bGUgPSB7XG4gIGFsaWduU2VsZjogJ2NlbnRlcicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIG1heFdpZHRoOiAnMTAwJScsXG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICBib3R0b206ICcwJyxcbiAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwcyAwLjVzJyxcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgxMDAlKScsXG4gICc+ICo6bGFzdC1vZi10eXBlJzoge1xuICAgIGZsZXg6ICcwIGF1dG8nLFxuICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cyBlYXNlLCBvcGFjaXR5IDAuNXMgZWFzZScsXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgxMDAlKScsXG4gICAgb3BhY2l0eTogJzAnLFxuICB9LFxufVxuXG5jb25zdCBwYW5lbE9wZW5TdHlsZSA9IHtcbiAgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwcyAwcycsXG4gIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLFxuICAnPiAqOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICBvcGFjaXR5OiAnMScsXG4gIH0sXG59XG5cbi8vIHRoaXMgaXMgZm9yIHJlcGxhY2luZyByZWNvbW1lbmRhdGlvbiBwYW5lbCBpbiBmdXR1cmVcbmNvbnN0IHBhbmVsQ2xvc2VkU3R5bGUgPSBoZWlnaHQgPT5cbiAgaGVpZ2h0ICYmIHtcbiAgICAnPiAqOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICAgIC8vIHdvcmthcm91bmQgSUUgMTEgQ1NTIGNhbGMoKSBidWdcbiAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoMTAwJSkgdHJhbnNsYXRlWSgtJHtoZWlnaHR9KWAsXG4gICAgfSxcbiAgfVxuXG5jb25zdCBCb3R0b21QYW5lbCA9ICh7XG4gIG9wZW4sXG4gIHN0eWxlLFxuICBiYWNrZHJvcCA9IHRydWUsXG4gIHBpbm5lZCA9IGZhbHNlLFxuICBtaW5pbWl6ZWRIZWlnaHQsXG4gIGJ1dHRvbixcbiAgY2hpbGRyZW4sXG4gIG9uQ2xvc2UsXG59KSA9PiB7XG4gIGNvbnN0IFdyYXAgPSBiYWNrZHJvcCA/IEJhY2tkcm9wIDogcHJvcHMgPT4gcHJvcHMuY2hpbGRyZW5cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8RnVuY3Rpb25CYXJFeHRlbnNpb24+e2J1dHRvbn08L0Z1bmN0aW9uQmFyRXh0ZW5zaW9uPlxuICAgICAgPFdyYXAgb3Blbj17b3Blbn0gb25DbGljaz17b25DbG9zZX0+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjc3M9e1tcbiAgICAgICAgICAgIHBhbmVsU3R5bGUsXG4gICAgICAgICAgICBvcGVuID8gcGFuZWxPcGVuU3R5bGUgOiBwYW5lbENsb3NlZFN0eWxlKG1pbmltaXplZEhlaWdodCksXG4gICAgICAgICAgICBvcGVuICYmIHN0eWxlLFxuICAgICAgICAgIF19XG4gICAgICAgICAgY2xhc3NOYW1lPXtwaW5uZWQgJiYgJ3Bpbm5lZCd9XG4gICAgICAgID5cbiAgICAgICAgICB7Y2hpbGRyZW59XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9XcmFwPlxuICAgIDwvPlxuICApXG59XG5cbkJvdHRvbVBhbmVsLnByb3BUeXBlcyA9IHtcbiAgb3BlbjogUHJvcFR5cGVzLmJvb2wsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBiYWNrZHJvcDogUHJvcFR5cGVzLmJvb2wsXG4gIHBpbm5lZDogUHJvcFR5cGVzLmJvb2wsXG4gIG1pbmltaXplZEhlaWdodDogUHJvcFR5cGVzLnN0cmluZyxcbiAgYnV0dG9uOiBQcm9wVHlwZXMubm9kZSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgQm90dG9tUGFuZWxcbiJdfQ== */"],
        className: pinned && 'pinned',
        children: children
      })
    })]
  });
};

BottomPanel.propTypes = {
  open: PropTypes.bool,
  style: PropTypes.object,
  backdrop: PropTypes.bool,
  pinned: PropTypes.bool,
  minimizedHeight: PropTypes.string,
  button: PropTypes.node,
  children: PropTypes.node,
  onClose: PropTypes.func
};

/* eslint-disable no-bitwise */
const uuidv4 = () => {
  const crypto = window.crypto || window.msCrypto;
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
};

/* eslint-disable no-empty */
const storageKey = 'playcraft-tab-lock';
const lockRenewTime = 3000;

const ensureTabLock = () => {
  let saved = {};

  try {
    saved = JSON.parse(localStorage[storageKey]);
  } catch (e) {
    console.log('Can read saved data for tab lock.', e);
  }

  const {
    expireTime
  } = saved;

  if (Date.now() <= expireTime) {
    return;
  }

  const id = uuidv4();

  const renewLock = () => {
    localStorage[storageKey] = JSON.stringify({
      id,
      expireTime: Date.now() + lockRenewTime * 3
    });
  };

  const renewInterval = setInterval(renewLock, lockRenewTime);

  const releaseLock = () => {
    clearInterval(renewInterval);
    window.removeEventListener('beforeunload', releaseLock);
    window.removeEventListener('unload', releaseLock);
    localStorage[storageKey] = {
      expireTime: Date.now() - 1
    };
  };

  window.addEventListener('beforeunload', releaseLock);
  window.addEventListener('unload', releaseLock);
  return releaseLock;
};

var en = {
	"KKS.YES": "Yes",
	"KKS.NO": "No",
	"KKS.OK": "OK",
	"KKS.CANCEL": "Cancel",
	"KKS.TRYAGAIN": "Try again",
	"KKS.LEAVE": "Leave",
	"KKS.BACK": "Back",
	"KKS.DELETE": "Delete",
	"KKS.PLAY.WITH.QUALITY": "Play this quality",
	"KKS.QUALITY": "Quality",
	"KKS.SUBTITLES": "Subtitles",
	"KKS.AUDIO": "Audio",
	"KKS.SETTING.OFF": "off",
	"KKS.SETTING": "Setting",
	"KKS.SETTING.CONFLICT": "Setting conflict",
	"KKS.CONFLICT.MESSAGE": "The video quality is higher than auto quality default setting",
	"KKS.SETTING.AUTO": "Auto",
	"KKS.SETTING.AUTOPLAY": "Autoplay",
	"KKS.SETTING.VERSION": "Version",
	"KKS.SETTING.SUBTITLE": "Subtitle",
	"KKS.SETTING.DUBBED": "Dubbed",
	"KKS.SETTING.SPEED": "Speed",
	"KKS.PROGRAM.TITLE": "Can’t play program",
	"KKS.PROGRAM.MESSAGE": "No response or this program is not on air",
	"KKS.AUTOPLAY.NEXT.EPISODE": "Auto-play next episode",
	"KKS.ENDROLL.COUNTDOWN": "Next: in {timeLeft} seconds",
	"KKS.SSAI.LEARN.MORE": "Learn more",
	"KKS.SSAI.SKIP.AD": "Skip",
	"KKS.SSAI.SECONDS": "seconds",
	"KKS.PLAYER.PLAY": "Play",
	"KKS.PLAYER.PAUSE": "Pause",
	"KKS.PLAYER.REPLAY": "Replay",
	"KKS.PLAYER.REWIND": "Rewind",
	"KKS.PLAYER.PREVIOUS": "Previous Video",
	"KKS.PLAYER.NEXT": "Next Video",
	"KKS.PLAYER.FORWARD": "Forward",
	"KKS.PLAYER.MUTE": "Mute",
	"KKS.PLAYER.UNMUTE": "Unmute",
	"KKS.PLAYER.FULLSCREEN": "Full Screen",
	"KKS.PLAYER.FULLSCREEN.EXIT": "Exit Full Screen",
	"KKS.PLAYER.CAST": "Chromecast",
	"KKS.PLAYER.CAST.DISCONNECT": "Stop casting",
	"KKS.PLAYER.PLAY.NEXT": "Play next video",
	"KKS.PLAYER.EXIT": "Leave",
	"KKS.PROGRAM.ENDED": "The live event has ended.\nClick OK to back to previous page.",
	"KKS.CASTING": "You are casting via Chromecast",
	"KKS.CAST.CONNTECTED": "[{CHROMECAST}] is connected. Now you can cast on it",
	"KKS.CAST.STATUS": "[{VIDEO}] is casting on [{CHROMECAST}]",
	"KKS.ERROR": "Something went wrong. Please try again later.({code})",
	"KKS.ERROR.PLAYCRAFT.401": "Please login to play this video.({CODE})",
	"KKS.ERROR.PLAYCRAFT.404": "This video does not exist.({CODE})",
	"KKS.ERROR.PLAYCRAFT.429": "The user has sent too many requests in a given amount of time.({CODE})",
	"KKS.ERROR.PLAYCRAFT.503": "Service maintenance is in progress. Please try again later.({CODE})",
	"KKS.ERROR.PLAYCRAFT.1000": "You does not have valid permission to play this content.({CODE})",
	"KKS.ERROR.PLAYCRAFT.1001": "Sorry, download of this video is not permitted.({CODE})",
	"KKS.ERROR.PLAYCRAFT.1002": "You have reached the maximum number of simultaneously playback device. Please quit playback on other devices and try again.({CODE})",
	"KKS.ERROR.PLAYCRAFT.1003": "Sorry, the service is not available in your location.({CODE})",
	"KKS.ERROR.PLAYCRAFT.1004": "You have reached maximum allowed download limit. Please remove some downloaded video to proceed.({CODE})",
	"KKS.ERROR.NETWORK_ERROR": "There is something wrong with your internet connection. Please kindly check and try again.({code})",
	"KKS.ERROR.DRM_RESTRICTED_OUTPUT": "External display is not allowed in current DRM policy, please unplug external display and try again.({code}/{name})",
	"KKS.ERROR.DEVICE_IS_NOT_SUPPORTED": "This device is not supported. Please use {allowDevices} to enjoy this video.",
	"KKS.ERROR.OS_IS_NOT_SUPPORTED": "This os is not supported. Please use {allowOSs} to enjoy this video.",
	"KKS.ERROR.PLEASE_UPGRADE_OS": "This os version is too low. Please upgrade to version {minVersion} or higher.",
	"KKS.ERROR.BROWSER_IS_NOT_SUPPORTED": "This browser is not supported. Please use {allowBrowsers} to enjoy this video.",
	"KKS.ERROR.PLEASE_UPGRADE_BROWSER": "This browser version is too low. Please upgrade to version {minVersion} or higher."
};

var ja = {
	"KKS.YES": "はい",
	"KKS.NO": "いいえ",
	"KKS.OK": "OK",
	"KKS.CANCEL": "キャンセル",
	"KKS.TRYAGAIN": "再生を再開する",
	"KKS.LEAVE": "戻る",
	"KKS.BACK": "戻る",
	"KKS.DELETE": "削除",
	"KKS.PLAY.WITH.QUALITY": "この画質で再生されます",
	"KKS.QUALITY": "映像品質",
	"KKS.AUDIO": "音声",
	"KKS.SETTING.OFF": "オフ",
	"KKS.SUBTITLES": "字幕",
	"KKS.SETTING": "再生設定",
	"KKS.SETTING.CONFLICT": "ご視聴する動画は、デフォルト画質設定に一致しません。",
	"KKS.CONFLICT.MESSAGE": "このビデオの画質がデフォルト設定より高いです。",
	"KKS.SETTING.AUTO": "自動",
	"KKS.SETTING.AUTOPLAY": "自動再生",
	"KKS.SETTING.VERSION": "字幕・吹替",
	"KKS.SETTING.SUBTITLE": "字幕",
	"KKS.SETTING.DUBBED": "吹替",
	"KKS.SETTING.SPEED": "スピード",
	"KKS.AUTOPLAY.NEXT.EPISODE": "次のエピソードを自動で再生する。",
	"KKS.PROGRAM.TITLE": "番組を再生できません。",
	"KKS.PROGRAM.MESSAGE": "反応が有りません。もしくは、この番組はオンエアされていません。",
	"KKS.ENDROLL.COUNTDOWN": "{timeLeft} 秒後に再生します",
	"KKS.SSAI.LEARN.MORE": "もっと見る",
	"KKS.SSAI.SKIP.AD": "スキップ",
	"KKS.SSAI.SECONDS": "秒",
	"KKS.PLAYER.PLAY": "再生",
	"KKS.PLAYER.PAUSE": "一時停止",
	"KKS.PLAYER.REPLAY": "再生",
	"KKS.PLAYER.REWIND": "巻戻し",
	"KKS.PLAYER.PREVIOUS": "前話",
	"KKS.PLAYER.NEXT": "次話",
	"KKS.PLAYER.FORWARD": "早送り",
	"KKS.PLAYER.MUTE": "ミュート",
	"KKS.PLAYER.UNMUTE": "ミュート解除",
	"KKS.PLAYER.FULLSCREEN": "全画面",
	"KKS.PLAYER.FULLSCREEN.EXIT": "全画面終了",
	"KKS.PLAYER.CAST": "クロームキャスト",
	"KKS.PLAYER.CAST.DISCONNECT": "クロームキャスト解除",
	"KKS.PLAYER.PLAY.NEXT": "次話再生",
	"KKS.PROGRAM.ENDED": "このライブイベントはすでに終了しました。\nOKをクリックして前のページに戻ってください。",
	"KKS.PLAYER.EXIT": "終了",
	"KKS.CASTING": "クロームキャストによって画面が表示されています",
	"KKS.CAST.CONNTECTED": "[{CHROMECAST}] に接続しました。今からキャストできます。",
	"KKS.CAST.STATUS": "[{VIDEO}]は [{CHROMECAST}]にキャストしています。",
	"KKS.ERROR": "システムエラーが発生しました。({code})",
	"KKS.ERROR.PLAYCRAFT.401": "作品を視聴するには、ログインが必要です。({CODE})",
	"KKS.ERROR.PLAYCRAFT.404": "ご指定の作品は見つかりませんでした。({CODE})",
	"KKS.ERROR.PLAYCRAFT.429": "The user has sent too many requests in a given amount of time.({CODE})",
	"KKS.ERROR.PLAYCRAFT.503": "現在システムメンテナンス中のためご利用いただけません。しばらく経ってから再度ご利用ください。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1000": "この動画を視聴する権限がありません。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1001": "ご指定の作品はダウンロードできません。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1002": "同時に利用できる上限に達したため、現在ご利用いただけません。別のデバイスでの利用が終了後にご利用をお試しください。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1003": "お客さまがご利用の地域ではご指定の作品は再生できません。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1004": "ダウンロードできる上限数に達しました。\nご利用いただくためにはダウンロード済みの作品を削除してからお試しください。({CODE})",
	"KKS.ERROR.NETWORK_ERROR": "インターネットに接続できませんでした。設定を確認してください。({code})",
	"KKS.ERROR.DRM_RESTRICTED_OUTPUT": "一部外部出力についてはご利用いただけません。({code}/{name})",
	"KKS.ERROR.DEVICE_IS_NOT_SUPPORTED": "お使いのデバイスに対応していません。{allowDevices} でこの作品を見てください。",
	"KKS.ERROR.OS_IS_NOT_SUPPORTED": "お使いのOSに対応していません。 {allowOSs} でこの作品を見てください。",
	"KKS.ERROR.PLEASE_UPGRADE_OS": "お使いのOSが古いです。{minVersion} 以上にアップグレード してください。",
	"KKS.ERROR.BROWSER_IS_NOT_SUPPORTED": "お使いのブラウザに対応していません。 {allowBrowsers} でこの作品を見てください。",
	"KKS.ERROR.PLEASE_UPGRADE_BROWSER": "お使いのブラウザが古いです。 {minVersion} 以上にアップグレード してください。"
};

var zhTW = {
	"KKS.YES": "是",
	"KKS.NO": "否",
	"KKS.OK": "ＯＫ",
	"KKS.CANCEL": "取消",
	"KKS.TRYAGAIN": "請再試一次",
	"KKS.LEAVE": "離開",
	"KKS.BACK": "返回",
	"KKS.DELETE": "刪除",
	"KKS.PLAY.WITH.QUALITY": "播放此畫質",
	"KKS.QUALITY": "畫質",
	"KKS.SUBTITLES": "字幕",
	"KKS.AUDIO": "音訊",
	"KKS.SETTING.OFF": "關閉",
	"KKS.SETTING": "設定",
	"KKS.SETTING.CONFLICT": "找不到此播放畫質",
	"KKS.CONFLICT.MESSAGE": "這部影片可選擇高於事先設定之畫質",
	"KKS.SETTING.AUTO": "自動",
	"KKS.SETTING.AUTOPLAY": "自動播放",
	"KKS.SETTING.VERSION": "Version",
	"KKS.SETTING.SUBTITLE": "字幕",
	"KKS.SETTING.DUBBED": "配音",
	"KKS.SETTING.SPEED": "播放速度",
	"KKS.AUTOPLAY.NEXT.EPISODE": "自動播放下一話",
	"KKS.PROGRAM.TITLE": "此節目已播放完畢",
	"KKS.PROGRAM.MESSAGE": "此節目已播放完畢",
	"KKS.ENDROLL.COUNTDOWN": "下一話將於 {timeLeft} 秒後播放",
	"KKS.SSAI.LEARN.MORE": "看更多",
	"KKS.SSAI.SKIP.AD": "略過廣告",
	"KKS.SSAI.SECONDS": "秒",
	"KKS.PLAYER.PLAY": "播放",
	"KKS.PLAYER.PAUSE": "暫停",
	"KKS.PLAYER.REPLAY": "重播",
	"KKS.PLAYER.REWIND": "前十秒",
	"KKS.PLAYER.PREVIOUS": "上一集",
	"KKS.PLAYER.NEXT": "下一集",
	"KKS.PLAYER.FORWARD": "後十秒",
	"KKS.PLAYER.MUTE": "靜音",
	"KKS.PLAYER.UNMUTE": "解除靜音",
	"KKS.PLAYER.FULLSCREEN": "全螢幕",
	"KKS.PLAYER.FULLSCREEN.EXIT": "離開全螢幕",
	"KKS.PLAYER.CAST": "Chromecast",
	"KKS.PLAYER.CAST.DISCONNECT": "停止投放",
	"KKS.PLAYER.PLAY.NEXT": "播放下一集",
	"KKS.PROGRAM.ENDED": "直播已結束。\n按ok鍵回到前一頁。",
	"KKS.PLAYER.EXIT": "離開",
	"KKS.CASTING": "透過Chromecast播放中。",
	"KKS.CAST.CONNTECTED": "[{CHROMECAST}]已連結。現在可以開始投放。",
	"KKS.CAST.STATUS": "[{VIDEO}]正在[{CHROMECAST}]上播放。",
	"KKS.ERROR": "系統發生錯誤。請稍後再嘗試。({code})",
	"KKS.ERROR.PLAYCRAFT.401": "請登入再播放。({CODE})",
	"KKS.ERROR.PLAYCRAFT.404": "此影片不存在。({CODE})",
	"KKS.ERROR.PLAYCRAFT.503": "系統正在維護中，請稍後再嘗試。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1000": "您沒有播放此影片的權限。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1001": "您沒有下載此影片的權限。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1002": "您超過同時播放上限。請關閉其他播放器後再嘗試播放。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1003": "您所在地區無法播放此影片。({CODE})",
	"KKS.ERROR.PLAYCRAFT.1004": "您已經超過下載影片上線。請移除已下載影片後再嘗試。({CODE})",
	"KKS.ERROR.NETWORK_ERROR": "網路連線發生錯誤，請稍後再嘗試。({code})",
	"KKS.ERROR.DRM_RESTRICTED_OUTPUT": "此影片無法在外接螢幕上播放。請拔除外接螢幕再試一次。",
	"KKS.ERROR.DEVICE_IS_NOT_SUPPORTED": "此裝置並不支援。請用{allowDevices}再試一次",
	"KKS.ERROR.OS_IS_NOT_SUPPORTED": "此OS 並不支援。請用{allowOSs}再試一次。",
	"KKS.ERROR.PLEASE_UPGRADE_OS": "此OS 並不支援。請升版到{miniVersion}以上。",
	"KKS.ERROR.BROWSER_IS_NOT_SUPPORTED": "此瀏覽器並不支援。請使用{allowBrowsers}。",
	"KKS.ERROR.PLEASE_UPGRADE_BROWSER": "此瀏覽器並不支援。請升版到{minVersion}以上。"
};

var LANGS = {
  en,
  ja,
  'zh-tw': zhTW
};

const ID = PropTypes.oneOfType([PropTypes.number, PropTypes.string]);
const LanguageCode = PropTypes.oneOf(Object.values(LanguageCode$1));
const SupportEnvironmentItem = PropTypes.shape({
  device: PropTypes.shape({
    type: PropTypes.string
  }),
  os: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.string
  }),
  browser: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.string
  })
});
const ItemType = PropTypes.oneOf(Object.values(ItemType$1));
const VideoInfo = PropTypes.shape({
  contentId: ID,
  contentType: ItemType,
  licenseId: ID
});
const TextCode = PropTypes.oneOf(Array.from(new Set(Object.entries(LANGS).reduce((res, langItem) => res.concat(Object.keys(langItem[1])), []))));
var Types = {
  LanguageCode,
  SupportEnvironmentItem,
  VideoInfo,
  TextCode,
  ItemType
};

const on$1 = (target, name, handler) => {
  target.addEventListener(name, handler);
  return () => target.removeEventListener(name, handler);
};

const once$1 = (target, name, handler) => {
  const oneTime = (...args) => {
    handler(...args);
    target.removeEventListener(name, oneTime);
  };

  target.addEventListener(name, oneTime);
  return () => target.removeEventListener(name, oneTime);
};

const waitFor = (check, handler) => {
  const checkInterval = setInterval(() => {
    if (check()) {
      clearInterval(check);
      handler();
    }
  }, 50);
  return () => clearInterval(checkInterval);
};

/* eslint-disable no-param-reassign */
const keySystems = {
  widevine: 'com.widevine.alpha',
  fairplay: 'com.apple.fps.1_0',
  playready: 'com.microsoft.playready'
};

const getDrmOptions = source => {
  const drm = source.drm && Object.entries(source.drm).reduce((result, [keySystemId, options]) => {
    const uri = options.licenseUri || options;

    if (uri) {
      const keySystemName = keySystems[keySystemId] || keySystemId;
      result.servers[keySystemName] = uri;

      if (options.certificateUri) {
        result.advanced[keySystemName] = {
          serverCertificateUri: options.certificateUri
        };
      }
    }

    return result;
  }, {
    servers: {},
    advanced: {}
  });
  const extensions = source.drm && Object.entries(source.drm).reduce((result, [keySystemId, options]) => {
    if (options.headers) {
      const keySystemName = keySystems[keySystemId] || keySystemId;
      result[keySystemName] = {
        headers: options.headers
      };
    }

    return result;
  }, {});
  return [drm, {
    drm: extensions
  }];
};

const FairplayKeySystem = {
  prepareContentId: contentUri => {
    const uriParts = contentUri.split('://');
    const contentId = uriParts[1] || '';
    return uriParts[0].slice(-3).toLowerCase() === 'skd' ? contentId : '';
  },
  prepareCertificate: cert => new Uint8Array(cert),
  prepareMessage: (keyMessageEvent, keySession) => {
    const spc = encodeURIComponent(keyMessageEvent.messageBase64Encoded);
    const assetId = encodeURIComponent(keySession.contentId);
    return `spc=${spc}&asset_id=${assetId}`;
  },
  prepareLicense: license => {
    if (license.substr(0, 5) === '<ckc>' && license.substr(-6) === '</ckc>') {
      return license.slice(5, -6);
    }

    return license;
  }
};

const getConfig = (config, {
  host,
  widevine = {},
  fairplay = {}
}) => {
  const widevineHeaders = { ...config.headers,
    ...(widevine === null || widevine === void 0 ? void 0 : widevine.headers)
  };
  const fairplayHeaders = { ...config.headers,
    ...(fairplay === null || fairplay === void 0 ? void 0 : fairplay.headers)
  };
  return {
    widevine: {
      LA_URL: host.widevine,
      ...config,
      headers: widevineHeaders
    },
    fairplay: {
      LA_URL: host.fairplay,
      ...config,
      headers: fairplayHeaders,
      certificateURL: `${host.fairplay.replace(/\/$/, '')}/fairplay_cert`,
      certificateHeaders: fairplay.certificateHeaders,
      ...FairplayKeySystem
    },
    playready: {
      LA_URL: host.playready,
      ...config
    }
  };
};
/**
 * @param {object}
 * @param {object} .host
 * @param {string} .host.widevine
 * @param {string} .host.fairplay
 * @param {string} .host.playready
 * @param {string} .token
 * @param {object} .headers
 * @param {object} .widevine
 * @param {WidevineLevels} .widevine.level
 * @param {string[]} .widevine.blockedDevices Some devices doesn't play well
 * with hardware based Widevine, so don't enforce it
 */


const getEnterpriseDrmConfig = ({
  host,
  token,
  headers = {}
}) => {
  const config = {
    withCredentials: false,
    headers: {
      'X-Custom-Data': `token_type=playback&token_value=${token}`,
      'X-Custom-Header': queryString(headers)
    }
  };
  return getConfig(config, {
    host
  });
};

const getBVKDrmConfig = ({
  host,
  token
}) => {
  const config = {
    withCredentials: false,
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const fairplay = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    certificateHeaders: {
      Authorization: `Bearer ${token}`
    }
  };
  return getConfig(config, {
    host,
    fairplay
  });
};

const defaultCertificateUrl = url => `${url === null || url === void 0 ? void 0 : url.replace(/\/$/, '')}/fairplay_cert`;

/* eslint-disable no-param-reassign */

const SHAKA_LIVE_DURATION = 4294967296;

const isFinite = duration => duration < SHAKA_LIVE_DURATION;

const isEnded = media => isFinite(media.initialDuration) && media.initialDuration - media.currentTime < 1 && media.ended; // When donwload bandwidth is low, Safari may report time update while buffering, ignore it.


const isBuffered = media => Array.from({
  length: media.buffered.length
}, (_, index) => ({
  start: media.buffered.start(index),
  end: media.buffered.end(index)
})).some( // in Safari buffered is clipped to integer
range => range.start <= media.currentTime && media.currentTime <= range.end + 1);

const getMediaTime = (media, plugins = []) => {
  const {
    duration,
    ...data
  } = Object.assign({
    currentTime: media.currentTime,
    bufferTime: Math.max(...Array.from({
      length: media.buffered.length
    }, (_, index) => media.buffered.end(index))),
    duration: media.initialDuration // monkey patched, duration may change for DASH playback

  }, ...plugins.map(plugin => {
    var _plugin$getPlaybackSt2;

    return (_plugin$getPlaybackSt2 = plugin.getPlaybackStatus) === null || _plugin$getPlaybackSt2 === void 0 ? void 0 : _plugin$getPlaybackSt2.call(plugin);
  }));
  return { ...data,
    ...((!isFinite(media.initialDuration) || Math.abs(media.duration - media.initialDuration) < 0.1) && {
      duration
    })
  };
};

const subscribePlaybackState = (media, updateState) => {
  const lastUpdate = {
    state: '',
    time: 0
  };

  const updateIfChanged = (event, state) => {
    lastUpdate.time = media.currentTime;
    lastUpdate.eventTime = Date.now();

    if (state !== lastUpdate.state) {
      lastUpdate.state = state;
      lastUpdate.batched = media.webkitDisplayingFullscreen;

      if (!lastUpdate.batched) {
        updateState(event, state);
      }
    }
  };

  const updateBufferingState = event => {
    if (!media.paused && !media.ended) {
      updateIfChanged(event, 'buffering');
    }
  };

  const updatePlaybackTime = event => {
    if (!media.paused && isBuffered(media) && media.currentTime - lastUpdate.time > 0.01) {
      updateIfChanged(event, 'playing');
    }
  };

  const updateEnd = event => {
    if (isEnded(media)) {
      updateIfChanged(event, 'ended');
      return true;
    }
  };

  const registered = [on$1(media, 'error', event => updateIfChanged(event, 'error')), on$1(media, 'waiting', updateBufferingState), on$1(media, 'loadstart', event => updateIfChanged(event, 'loading')), on$1(media, 'canplay', event => media.paused ? updateIfChanged(event, 'paused') : updatePlaybackTime(event)), on$1(media, 'pause', event => {
    if (!updateEnd(event)) {
      updateIfChanged(event, 'paused');
    }
  }), on$1(media, 'seeking', updateBufferingState), on$1(media, 'timeupdate', updatePlaybackTime), on$1(media, 'ended', updateEnd), on$1(media, 'webkitendfullscreen', event => {
    // webkitDisplayingFullscreen is still true at the moment, can sync bake to target state
    // if paused by native exit fullscreen button, should resume playing
    const resultState = lastUpdate.state === 'paused' && Date.now() - lastUpdate.eventTime < 50 ? 'playing' : lastUpdate.state;
    updateState(event, resultState);
    waitFor(() => !media.webkitDisplayingFullscreen, () => {
      if (lastUpdate.batched && lastUpdate.state !== resultState) {
        updateState(event, lastUpdate.state);
      }
    });
  })];
  return () => registered.forEach(off => off());
};

const load = async (media, {
  player,
  startTime,
  plugins = [],
  drm
}, source) => {
  const preferred = getSource(source, {
    preferManifestType: needNativeHls() ? 'hls' : 'dash',
    fallbackDrm: drm
  });
  const merged = await plugins.reduce(async (loadChain, plugin) => {
    var _plugin$load;

    const currentSource = await loadChain;
    const overrides = await ((_plugin$load = plugin.load) === null || _plugin$load === void 0 ? void 0 : _plugin$load.call(plugin, currentSource, {
      video: media,
      player,
      source: currentSource,
      startTime
    }));
    return overrides ? { ...currentSource,
      ...(overrides.url && {
        src: overrides.url
      }),
      ...(overrides.startTime >= 0 && {
        startTime: overrides.startTime
      })
    } : currentSource;
  }, { ...preferred,
    options: {
      startTime
    }
  });
  media.addEventListener('durationchange', () => {
    // media duration may change when playing VOD to live or SSAI streams, save it here for convenience
    media.initialDuration = media.duration;
  }, {
    once: true
  });
  const [drmOptions, extensions] = getDrmOptions(preferred);
  player.configure({
    drm: drmOptions
  });
  player.configureExtensions(extensions); // There's no use case that changing DRM options without changing manifest URL, just skip

  if (player.lastSrc === merged.src) {
    console.info('src is unchanged, skip load', merged.src);
    return;
  }

  player.lastSrc = merged.src;
  return player.unload().then(() => player.load(merged.src, merged.startTime, merged.type)).then(() => media.dispatchEvent(new Event('canplay'))).catch(error => {
    media.dispatchEvent(Object.assign(new CustomEvent('error'), {
      error
    }));
  });
};

const seek = (media, {
  player,
  plugins = []
}, time, issuer) => {
  // TODO skip seeking to too near point, consider SSAI cases
  const seekPlugin = plugins.find(plugin => typeof plugin.handleSeek === 'function' && plugin.isActive());

  const seekInternal = seekTime => {
    var _player$seek;

    // when playing in Bitmovin, must call player.seek to sync internal time
    (_player$seek = player.seek) === null || _player$seek === void 0 ? void 0 : _player$seek.call(player, seekTime, issuer); // player.seek sets time after adding segments,
    // set again to reflect instantly

    media.currentTime = seekTime;
    media.dispatchEvent(new Event('seeking'));
    once$1(media, 'seeked', () => {
      // when seeking to the end it may result in a few seconds earlier
      if (Math.abs(seekTime - media.currentTime) > 0.5) {
        media.currentTime = seekTime;
      }
    });
  };

  if (seekPlugin) {
    seekPlugin.handleSeek(time, seekInternal);
  } else {
    seekInternal(time);
  }
};

const seekToLive = (media, player) => {
  var _player$seekRange;

  if (needNativeHls()) {
    seek(media, {
      player
    }, Number.MAX_SAFE_INTEGER);
  } else if (((_player$seekRange = player.seekRange()) === null || _player$seekRange === void 0 ? void 0 : _player$seekRange.end) > 0) {
    /**
     * Seeking to MAX_SAFE_INTEGER may cuased the player keep buffering for DASH.
     * We choose to seek to the seekRange().end instead.
     * Notice that seekRange().end is not supported for Bitmovin,
     * but Bitmovin will resume from the live edge for DASH as default.
     */
    seek(media, {
      player
    }, player.seekRange().end);
  }
};

const setVolume = (media, {
  player
}, level) => {
  var _player$setVolume;

  player === null || player === void 0 ? void 0 : (_player$setVolume = player.setVolume) === null || _player$setVolume === void 0 ? void 0 : _player$setVolume.call(player, level * 100);
  media.volume = level;
  media.muted = level <= 0;
};

const syncPlaybackState = (media, {
  player,
  plugins = []
}, target) => {
  if (media.webkitDisplayingFullscreen) {
    return; // iOS fullscreen is native UI only, no need to sync
  }

  if (target === 'paused' && !media.paused) {
    return media.pause();
  }

  if (target === 'playing') {
    if (isEnded(media)) {
      seek(media, {
        player
      }, 0);
    }

    if (media.paused) {
      var _player$play;

      const onResumePlugin = plugins.find(p => {
        var _p$isActive;

        return p.onResume && ((_p$isActive = p.isActive) === null || _p$isActive === void 0 ? void 0 : _p$isActive.call(p));
      });

      if (onResumePlugin) {
        onResumePlugin.onResume(seekToLive.bind(undefined, media, player));
      } else if (player.isLive()) {
        seekToLive(media, player);
      }

      (_player$play = player.play) === null || _player$play === void 0 ? void 0 : _player$play.call(player).catch(error => console.warn(error));
      return media.play();
    }
  }
};

const setPlaybackRate = (media, {
  player
}, rate) => {
  var _player$setPlaybackSp;

  if (!rate) return;
  player === null || player === void 0 ? void 0 : (_player$setPlaybackSp = player.setPlaybackSpeed) === null || _player$setPlaybackSp === void 0 ? void 0 : _player$setPlaybackSp.call(player, rate);
  media.playbackRate = rate;
};

const setQuality = (_, {
  player
}, restrictions) => {
  var _player$setAdaptation, _player$setQuality;

  // For Bitmovin
  (_player$setAdaptation = player.setAdaptationHandler) === null || _player$setAdaptation === void 0 ? void 0 : _player$setAdaptation.call(player, ({
    availableQualities,
    suggested
  }) => selectRestrictedQuality(availableQualities, {
    suggested,
    restrictions
  })); // For Shaka

  (_player$setQuality = player.setQuality) === null || _player$setQuality === void 0 ? void 0 : _player$setQuality.call(player, restrictions);
};

const getSubtitles = (_, {
  player
}) => {
  var _player$getSubtitles;

  if (!player) return []; // For missing tag CLOSED-CAPTIONS=NONE in .m3u8

  const filterHandler = track => track.value !== 'unknown';

  return (player === null || player === void 0 ? void 0 : (_player$getSubtitles = player.getSubtitles()) === null || _player$getSubtitles === void 0 ? void 0 : _player$getSubtitles.filter(filterHandler)) || [];
};

const setSubtitle = (_, {
  player
}, language) => {
  if (!language) {
    return;
  }

  player === null || player === void 0 ? void 0 : player.setSubtitleTrack(language);
};

const subscribeSubtitles = (_, {
  player
}, updateSubtitles) => {
  var _player$on, _player$on2;

  const handleEnter = event => {
    const {
      text,
      start,
      end,
      subtitleId: id
    } = event;
    updateSubtitles({
      id,
      text,
      start,
      end
    });
  };

  const handleExit = () => updateSubtitles({
    text: ''
  });

  (_player$on = player.on) === null || _player$on === void 0 ? void 0 : _player$on.call(player, 'cueenter', handleEnter);
  (_player$on2 = player.on) === null || _player$on2 === void 0 ? void 0 : _player$on2.call(player, 'cueexit', handleExit);
  return () => {
    var _player$off, _player$off2;

    updateSubtitles({
      text: ''
    });
    (_player$off = player.off) === null || _player$off === void 0 ? void 0 : _player$off.call(player, 'cueenter', handleEnter);
    (_player$off2 = player.off) === null || _player$off2 === void 0 ? void 0 : _player$off2.call(player, 'cueeexit', handleExit);
  };
};

const getAudio = (_, {
  player
}) => {
  var _player$getAudio;

  return player === null || player === void 0 ? void 0 : (_player$getAudio = player.getAudio()) === null || _player$getAudio === void 0 ? void 0 : _player$getAudio.lang;
};

const setAudio = (_, {
  player
}, audioLanguage) => {
  player === null || player === void 0 ? void 0 : player.setAudioTrack(audioLanguage);
};

const getAudioList = (_, {
  player
}) => {
  if (!player) return [];
  return player.getAudioList();
};

const modes = {
  videos: 'video',
  lives: 'live'
};
const logEventNames = {
  playbackBegan: 'video_playback_began',
  playbackStarted: 'video_playback_started',
  playbackStopped: 'video_playback_stopped',
  playbackEnded: 'video_playback_ended',
  bufferingStarted: 'video_buffering_started',
  bufferingEnded: 'video_buffering_ended',
  seeked: 'video_seeking_ended',
  playbackError: 'video_playback_error_occurred',
  playing: 'play',
  paused: 'pause',
  rewind: 'rewind',
  forward: 'forward',
  previousEpisode: 'previous_episode',
  nextEpisode: 'next_episode',
  openSettings: 'setting_page_entered',
  closeSettings: 'setting_page_exited',
  adPlaybackStarted: 'ad_playback_started',
  adPlaybackStopped: 'ad_playback_stopped'
};

const mapLogEvents = ({
  video,
  session = video,
  version,
  playerName,
  getPlaybackStatus = () => video
}) => {
  var _session$getContent;

  const emitter = mitt();
  const state = {
    status: 'init',
    seeking: false,
    playerStartTime: Date.now(),
    moduleStartTime: Date.now(),
    content: ((_session$getContent = session.getContent) === null || _session$getContent === void 0 ? void 0 : _session$getContent.call(session)) || {}
  };

  const commonPropties = () => {
    var _state$content$sectio;

    return {
      player_name: playerName,
      playback_module_version: version,
      playback_mode: modes[state.content.type],
      playback_session_id: state.sessionId,
      id: state.content.id,
      name: state.content.title,
      ...(state.content.type === 'videos' && {
        current_position: state.currentTime,
        video_total_duration: state.duration
      }),
      ...(state.content.type === 'lives' && {
        section_id: (_state$content$sectio = state.content.section) === null || _state$content$sectio === void 0 ? void 0 : _state$content$sectio.id,
        name_2: state.content.channelName
      }),
      SSAI: state.ssaiProvider || 'None'
    };
  };

  const dispatchStart = () => {
    if (state.status === 'started') {
      return;
    }

    state.status = 'started';
    state.lastStartTime = Date.now();
    const eventName = state.isPlayingAd ? 'adPlaybackStarted' : 'playbackStarted';
    emitter.emit(eventName, commonPropties());
  };

  const dispatchStop = () => {
    if (state.status !== 'started') {
      return;
    }

    state.status = 'stopped';
    const played = (Date.now() - state.lastStartTime) / 1000;

    if (state.isPlayingAd) {
      state.adPlayedDuration += played;
    } else {
      state.playedDuration += played;
    }

    const eventName = state.isPlayingAd ? 'adPlaybackStopped' : 'playbackStopped';
    emitter.emit(eventName, { ...commonPropties(),
      ...(state.isPlayingAd && {
        ad_played_duration: played
      })
    });
  };

  const registered = [on$1(video, 'error', event => {
    var _event$error, _event$error2, _event$error2$data;

    emitter.emit('playbackError', {
      module_error_code: ((_event$error = event.error) === null || _event$error === void 0 ? void 0 : _event$error.code) || ((_event$error2 = event.error) === null || _event$error2 === void 0 ? void 0 : (_event$error2$data = _event$error2.data) === null || _event$error2$data === void 0 ? void 0 : _event$error2$data.code),
      ...commonPropties()
    });
  }), once$1(video, 'playerStarted', () => {
    state.playerStartTime = Date.now();
  }), on$1(video, 'durationchange', () => {
    // duration may change when playing an ad stitched stream, take only initial value
    if (!state.duration) {
      state.duration = getPlaybackStatus().duration;
    }
  }), once$1(video, 'canplay', () => {
    state.status = 'began';
    state.sessionId = uuidv4();
    state.playedDuration = 0;
    emitter.emit('playbackBegan', {
      player_startup_time: (state.playerStartTime - state.moduleStartTime) / 1000,
      video_startup_time: (Date.now() - state.moduleStartTime) / 1000,
      ...commonPropties()
    });
  }), on$1(video, 'playing', dispatchStart), on$1(video, 'waiting', () => {
    if (!state.bufferingStartTime) {
      emitter.emit('bufferingStarted', commonPropties());
      state.bufferingStartTime = Date.now();
    }
  }), on$1(video, 'timeupdate', () => {
    state.currentTime = getPlaybackStatus().currentTime;

    if (state.bufferingStartTime) {
      emitter.emit('bufferingEnded', {
        buffering_second: (Date.now() - state.bufferingStartTime) / 1000,
        ...commonPropties()
      });
      state.bufferingStartTime = undefined;
    }
  }), on$1(video, 'pause', dispatchStop), on$1(video, 'seeking', () => {
    state.seekingFrom = state.currentTime;
  }), on$1(session, 'userSeeking', () => {
    state.seeking = true;
  }), on$1(video, 'seeked', () => {
    if (state.seeking) {
      emitter.emit('seeked', {
        seeking_from: state.seekingFrom,
        seeking_to: video.currentTime,
        ...commonPropties()
      });
    }

    state.seeking = false;
  }), on$1(session, 'sectionChange', () => {
    dispatchStop();
    state.content = session.getContent();
    dispatchStart();
  }), once$1(video, 'emptied', () => {
    if (state.status === 'started') {
      dispatchStop();
    }

    state.status = 'init';
    emitter.emit('playbackEnded', {
      video_playback_ended_at_percentage: state.currentTime / state.duration,
      video_total_played_duration: state.playedDuration,
      ...(state.ssaiProvider && {
        ad_total_played_duration: state.adPlayedDuration
      }),
      ...commonPropties()
    });
  }), once$1(video, 'loadedAdMetadata', event => {
    state.ssaiProvider = event.data.provider;
    state.adPlayedDuration = 0;
  }), on$1(session, 'adBreakStarted', () => {
    dispatchStop();
    state.isPlayingAd = true;

    if (!state.seeking) {
      dispatchStart();
    }
  }), on$1(session, 'adBreakEnded', () => {
    dispatchStop();
    state.isPlayingAd = false;

    if (!state.seeking) {
      dispatchStart();
    }
  })];
  return {
    addEventListener: (name, handler) => emitter.on(name, handler),
    all: handler => emitter.on('*', handler),
    emit: (name, {
      currentTime
    }) => {
      emitter.emit(name, {
        current_position: currentTime,
        ...commonPropties()
      });
    },
    updateContent: content => {
      state.content = content;
    },
    reset: () => registered.forEach(off => off())
  };
};

const deepEqual = (current, updated) => JSON.stringify(current) === JSON.stringify(updated);

const HEARTBEAT_INTERVAL_MS = 10000;
const UPDATE_INTERVAL_MS = 10000;

const isContentExpired = content => typeof (content === null || content === void 0 ? void 0 : content.end_time) === 'number' && content.end_time * 1000 <= Date.now();

const startPlaybackSession = async (playbackApi, options = {}) => {
  const emitter = mitt();
  const {
    type,
    id,
    getCurrentTime,
    cache
  } = options;
  const {
    onChangeContent,
    onSourceChange,
    onInvalidToken,
    heartbeatTime = HEARTBEAT_INTERVAL_MS,
    updateTime = UPDATE_INTERVAL_MS
  } = options;
  const state = {}; // get last playback time to start playback fast
  // getContent is not critical, so don't block playback if it hangs or fails(ignored in API logic)

  const loadContent = () => {
    var _options$cache, _options$cache$get;

    return Promise.race([// eslint-disable-next-line no-use-before-define
    updateContent((_options$cache = options.cache) === null || _options$cache === void 0 ? void 0 : (_options$cache$get = _options$cache.get(`${type}/${id}`)) === null || _options$cache$get === void 0 ? void 0 : _options$cache$get.content), new Promise(resolve => {
      setTimeout(resolve, UPDATE_INTERVAL_MS);
    })]);
  };

  const getPlaybackInfo = async () => {
    var _cache$get;

    state.sources = ((cache === null || cache === void 0 ? void 0 : (_cache$get = cache.get(`${type}/${id}`)) === null || _cache$get === void 0 ? void 0 : _cache$get.playbackInfo) || (await playbackApi.getPlaybackInfo({
      type,
      id,
      token: state.token
    }))).sources;
    onSourceChange === null || onSourceChange === void 0 ? void 0 : onSourceChange(state.sources);
  };

  async function updateContent(contentInCache) {
    var _state$content;

    const content = !contentInCache || isContentExpired(contentInCache) ? await playbackApi.getContent({
      type,
      id
    }) : contentInCache;

    if (!deepEqual(content, state.content)) {
      state.content = content;
      onChangeContent === null || onChangeContent === void 0 ? void 0 : onChangeContent({
        type,
        ...content,
        sources: state.sources
      });
    }

    if (content.end_time && content.end_time === ((_state$content = state.content) === null || _state$content === void 0 ? void 0 : _state$content.end_time)) {
      clearTimeout(state.endTimeoutId);
      state.endTimeoutId = setTimeout(() => {
        loadContent();
        getPlaybackInfo();
      }, content.end_time * 1000 - Date.now());
    }
  }

  const waitForContent = loadContent();
  const sessionInfo = await playbackApi.startPlayback({
    type,
    id
  });
  const requestParams = {
    type,
    id,
    token: sessionInfo.token
  };
  state.token = sessionInfo.token;
  await getPlaybackInfo();
  let updateIntervalId;

  if (type === 'lives') {
    updateIntervalId = setInterval(updateContent, updateTime);
  }

  let lastPlayedTime;

  const updateLastPlayed = () => {
    const currentTime = getCurrentTime === null || getCurrentTime === void 0 ? void 0 : getCurrentTime();

    if (currentTime >= 0 && lastPlayedTime !== currentTime) {
      lastPlayedTime = currentTime;
      playbackApi.updateLastPlayed({ ...requestParams,
        time: currentTime
      });
    }
  };

  if (type === 'videos') {
    updateIntervalId = setInterval(updateLastPlayed, updateTime);
  }

  const heartbeatIntervalId = setInterval(() => playbackApi.heartbeat(requestParams).catch(error => {
    var _error$response;

    if (/4\d\d/.test((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status)) {
      clearInterval(heartbeatIntervalId);
      onInvalidToken === null || onInvalidToken === void 0 ? void 0 : onInvalidToken(error);
    }
  }), heartbeatTime);

  const end = () => {
    updateLastPlayed();
    clearInterval(updateIntervalId);
    clearInterval(heartbeatIntervalId);
    clearTimeout(state.endTimeoutId);
    emitter.emit('playbackEnded');
    return playbackApi.endPlayback(requestParams);
  };

  await waitForContent;
  return { ...state,
    token: sessionInfo.token,
    drmPortalUrl: sessionInfo.drm_portal_url,
    updateLastPlayed,
    end
  };
};

const preload = (playbackApi, preloadList, currentContent, cache, options = {}) => {
  const {
    updateTime = 10000
  } = options;

  const fetchData = () => {
    preloadList.forEach(async ({
      contentType: type,
      contentId: id
    }) => {
      var _cache$get, _cache$get$content;

      if (id === currentContent.id && type === currentContent.type) return;
      const endTime = (_cache$get = cache.get(`${type}/${id}`)) === null || _cache$get === void 0 ? void 0 : (_cache$get$content = _cache$get.content) === null || _cache$get$content === void 0 ? void 0 : _cache$get$content.end_time;
      if (typeof endTime === 'number' && endTime * 1000 >= Date.now()) return;

      try {
        const {
          token
        } = await playbackApi.startPlayback({
          type,
          id
        });
        const waitForContent = playbackApi.getContent({
          type,
          id
        });
        const waitForPlaybackInfo = playbackApi.getPlaybackInfo({
          type,
          id,
          token
        });
        const [content, playbackInfo] = await Promise.all([waitForContent, waitForPlaybackInfo]);
        cache.set(`${type}/${id}`, {
          content,
          playbackInfo
        });
        playbackApi.endPlayback({
          type,
          id,
          token
        });
      } catch (e) {
        console.error(e);
      }
    });
  };

  fetchData();
  const fetchDataIntervalID = setInterval(fetchData, updateTime);
  return () => clearInterval(fetchDataIntervalID);
};

const getSourceTypeSettings = sources => {
  if (!((sources === null || sources === void 0 ? void 0 : sources.length) > 1)) {
    return;
  }

  const items = sources.map(source => {
    var _source$subdub, _source$type;

    return {
      value: source.subdub || source.type,
      label: ((_source$subdub = source.subdub) === null || _source$subdub === void 0 ? void 0 : _source$subdub.toUpperCase()) || ((_source$type = source.type) === null || _source$type === void 0 ? void 0 : _source$type.toUpperCase())
    };
  });

  const getDefault = preferred => (items.find(item => item.value === preferred) || items[0] || {}).value;

  return {
    name: 'source-type',
    title: 'KKS.SETTING.VERSION',
    items,
    getDefault
  };
};

/* eslint-disable no-param-reassign */

const waitMs = time => new Promise(resolve => {
  setTimeout(resolve, time);
});

const handleRequestError = (result, {
  onError,
  retryTimes = 0
}) => result.catch(error => onError(error, {
  retry: () => handleRequestError(axios(error.config), {
    onError,
    retryTimes: retryTimes + 1
  }),
  retryTimes
}));

const ignoreMinorError = async (event, {
  retry,
  retryTimes
} = {}) => {
  var _event$response, _event$response2, _event$config;

  console.warn(event);

  if ((((_event$response = event.response) === null || _event$response === void 0 ? void 0 : _event$response.message) === 'Network Error' || /502|503/.test((_event$response2 = event.response) === null || _event$response2 === void 0 ? void 0 : _event$response2.status)) && retryTimes < 3) {
    await waitMs(3000);
    return retry();
  }

  if (/start$|info$|heartbeat$/.test((_event$config = event.config) === null || _event$config === void 0 ? void 0 : _event$config.url)) {
    return Promise.reject(event);
  }

  console.log('Ignore non-critical playback API fail', event);
  return new Promise(() => {});
};

const createApi = ({
  host,
  accessToken,
  deviceId,
  headers,
  params
}, {
  onError = ignoreMinorError
} = {}) => {
  const getHeaders = () => ({ ...(accessToken && {
      Authorization: accessToken
    }),
    ...(deviceId && {
      'X-Device-ID': deviceId
    }),
    'Content-type': 'application/json',
    ...headers
  });

  const request = (url, {
    method
  } = {}) => handleRequestError(axios(url, {
    method,
    headers: getHeaders(),
    params
  }), {
    onError
  }).then(response => response.data);

  const sessionRequest = (path, {
    method = 'POST',
    type,
    id,
    token
  }) => handleRequestError(axios(`${host}/sessions/${type}/${id}/playback/${deviceId}/${path}`, {
    method,
    headers: getHeaders(),
    params: { ...params,
      playback_token: token
    }
  }), {
    onError
  }).then(response => response.data);

  return {
    getContent: ({
      type,
      id
    }) => request(`${host}/${type}/${id}`, {}),
    startPlayback: ({
      type,
      id
    }) => request(`${host}/sessions/${type}/${id}/playback/${deviceId}/start`, {
      method: 'POST'
    }),
    getPlaybackInfo: ({
      type,
      id,
      token
    }) => sessionRequest('info', {
      method: 'GET',
      type,
      id,
      token
    }),
    heartbeat: ({
      type,
      id,
      token
    }) => sessionRequest('heartbeat', {
      type,
      id,
      token
    }),
    updateLastPlayed: ({
      type,
      id,
      token,
      time
    }) => sessionRequest(`position/${Math.floor(time)}`, {
      type,
      id,
      token
    }),
    endPlayback: ({
      type,
      id,
      token
    }) => sessionRequest('end', {
      type,
      id,
      token
    })
  };
};

const getStreamInfo = (sources = [], {
  type = '',
  licenseUri,
  certificateUri,
  licenseHeaders: headers,
  thumbnailEnabled
} = {}) => {
  const activeSource = sources.find(source => (source.subdub || source.type) === type) || sources[0];
  return ((activeSource === null || activeSource === void 0 ? void 0 : activeSource.manifests) || []).map(manifest => ({ ...manifest,
    type: manifest.protocol,
    src: manifest.url,
    drm: {
      fairplay: {
        licenseUri,
        certificateUri,
        headers
      },
      widevine: {
        licenseUri,
        headers
      },
      playready: {
        licenseUri,
        headers
      }
    },
    qualityOptions: manifest.resolutions.map(({
      height
    }) => ({
      label: height,
      value: height,
      options: {
        maxHeight: height
      }
    }))
  })).concat(thumbnailEnabled && activeSource !== null && activeSource !== void 0 && activeSource.thumbnail_seeking_url ? {
    type: 'thumbnail',
    src: activeSource.thumbnail_seeking_url
  } : []);
};

const getContentInfo = data => {
  var _data$time, _data$time2;

  return {
    title: data.title,
    channelTitle: data.subtitle,
    end: data.end,
    section: {
      id: data.section_id,
      start: data.start_time,
      end: data.end_time
    },
    previous: data.prev_video,
    next: data.next_video,
    startTime: (_data$time = data.time) === null || _data$time === void 0 ? void 0 : _data$time.last_position,
    chapters: [((_data$time2 = data.time) === null || _data$time2 === void 0 ? void 0 : _data$time2.end_start_position) && {
      type: 'ending',
      start: data.time.end_start_position
    }].filter(Boolean)
  };
};

const formattedTime = sourceTime => {
  const time = sourceTime >= 0 ? sourceTime : 0;
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  const minutes = Math.floor(time / 60 % 60).toString().padStart(2, '0');
  const hours = time >= 3600 && Math.floor(time / 60 / 60 % 60).toString();
  return [hours, minutes, seconds].filter(Boolean).join(':');
};

const linkPluginEvents = (plugins, handlers) => {
  const registered = plugins.map(plugin => Object.entries(handlers).map(([eventName, handler]) => {
    var _plugin$on;

    return (_plugin$on = plugin.on) === null || _plugin$on === void 0 ? void 0 : _plugin$on.call(plugin, eventName, event => handler(event, plugin));
  }));
  return () => [].concat(...registered).forEach(removeListener => removeListener === null || removeListener === void 0 ? void 0 : removeListener());
};

const Message = ({
  code,
  property,
  defaultValue,
  wrap: Wrap = 'span'
}) => {
  const {
    getMessage,
    translate
  } = useContext(context);
  const message = getMessage(code, property) || translate(defaultValue);
  return Wrap ? /*#__PURE__*/jsx(Wrap, {
    children: message
  }) : message;
};

Message.propTypes = {
  code: Types.TextCode,
  property: PropTypes.object,
  defaultValue: Types.TextCode,
  wrap: PropTypes.elementType
};

const context = /*#__PURE__*/React.createContext();

const IntlProvider = ({
  locale = LanguageCode$1.EN,
  messages = {},
  children
}) => {
  const translations = Object.assign({}, LANGS[locale.toLowerCase()], messages);

  const formatMessage = (descriptor = '', values) => (translations[(descriptor === null || descriptor === void 0 ? void 0 : descriptor.id) || descriptor] || '').replace(/{(\S+?)}/gi, (substring, name) => {
    var _values$name;

    return [].concat((_values$name = values[name]) !== null && _values$name !== void 0 ? _values$name : substring).join(', ');
  }) || descriptor.defaultMessage || descriptor.id || '';

  const intl = {
    formatMessage,
    translate: formatMessage,
    getMessage: formatMessage
  };
  return /*#__PURE__*/jsx(context.Provider, {
    value: intl,
    children: children
  });
};

IntlProvider.propTypes = {
  locale: Types.LanguageCode,
  messages: PropTypes.object,
  children: PropTypes.node
};

const useIntl = () => useContext(context);

const FormattedMessage = ({
  id,
  defaultMessage,
  values
}) => {
  const intl = useIntl();
  return intl.formatMessage({
    id,
    defaultMessage
  }, values);
};

var I18n = {
  Context: context,
  Message
};

var icon = {
  pause: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxyZWN0IHdpZHRoPSIxMiIgaGVpZ2h0PSI0MiIgeD0iNiIgeT0iMyIgcng9IjIiLz48cmVjdCB3aWR0aD0iMTIiIGhlaWdodD0iNDIiIHg9IjMwIiB5PSIzIiByeD0iMiIvPjwvZz48L3N2Zz4=',
  play: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik01IDR2NDBsMzgtMjB6Ii8+PC9nPjwvc3ZnPg==',
  replay: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGQ9Ik00MC41IDl2OC45YTI1LjYgMjUuNiAwIDEgMS0yNS42IDI0LjVINnYxLjFBMzQuNSAzNC41IDAgMSAwIDQwLjUgOXoiLz48cGF0aCBkPSJNNDAgMHYyN0wyMCAxMy41eiIvPjwvZz48L3N2Zz4=',
  back: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz48ZyBmaWxsPSdub25lJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnPjxwYXRoIGQ9J00wIDBoMzZ2MzZIMHonIG9wYWNpdHk9Jy41Jy8+PHBhdGggc3Ryb2tlPScjRkZGJyBzdHJva2Utd2lkdGg9JzQnIGQ9J00yMCAyTDQgMThsMTYgMTZNNSAxOGgzMC4wMDcnLz48L2c+PC9zdmc+Cg==',
  forward10: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGQ9Ik0xOCA0djRhMTEuNSAxMS41IDAgMSAwIDExLjQ5IDExaDRsLjAxLjVBMTUuNSAxNS41IDAgMSAxIDE4IDR6Ii8+PHBhdGggZD0iTTE4IDB2MTJsOS02em0tNC44NCAyNXYtNy45N2gtLjA0bC0yLjUxIDEuNzRWMTYuOWwyLjU1LTEuNzdoMi4wNVYyNWgtMi4wNXptOC4xMi4yMmMtMi40OCAwLTQtMS45OC00LTUuMTcgMC0zLjE4IDEuNTMtNS4xNCA0LTUuMTQgMi40NyAwIDMuOTggMS45NSAzLjk4IDUuMTMgMCAzLjE5LTEuNSA1LjE4LTMuOTggNS4xOHptMC0xLjY2YzEuMTcgMCAxLjg5LTEuMjYgMS44OS0zLjVzLS43Mi0zLjUtMS45LTMuNWMtMS4xNSAwLTEuODggMS4yNy0xLjg4IDMuNXMuNzEgMy41IDEuODkgMy41eiIvPjwvZz48L3N2Zz4=',
  rewind10: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGQ9Ik0xOCA0djRBMTEuNSAxMS41IDAgMSAxIDYuNTEgMTloLTR2LjVBMTUuNSAxNS41IDAgMSAwIDE4IDR6Ii8+PHBhdGggZD0iTTE4IDB2MTJMOSA2em0tNC44NCAyNXYtNy45N2gtLjA0bC0yLjUxIDEuNzRWMTYuOWwyLjU1LTEuNzdoMi4wNVYyNWgtMi4wNXptOC4xMi4yMmMtMi40OCAwLTQtMS45OC00LTUuMTcgMC0zLjE4IDEuNTMtNS4xNCA0LTUuMTQgMi40NyAwIDMuOTggMS45NSAzLjk4IDUuMTMgMCAzLjE5LTEuNSA1LjE4LTMuOTggNS4xOHptMC0xLjY2YzEuMTcgMCAxLjg5LTEuMjYgMS44OS0zLjVzLS43Mi0zLjUtMS45LTMuNWMtMS4xNSAwLTEuODggMS4yNy0xLjg4IDMuNXMuNzEgMy41IDEuODkgMy41eiIvPjwvZz48L3N2Zz4=',
  volumeHight: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTIxLjgwOCAxYTE2LjI2NSAxNi4yNjUgMCAwIDEgNi43NzcgMy4yMTkgMTYuOTEgMTYuOTEgMCAwIDEgNC42OTIgNS44MDJBMTYuOTYgMTYuOTYgMCAwIDEgMzUgMTcuNTQ3YzAgMi42Ni0uNTc0IDUuMTY4LTEuNzIzIDcuNTI1YTE2LjkxIDE2LjkxIDAgMCAxLTQuNjkyIDUuODAzIDE2LjI2NSAxNi4yNjUgMCAwIDEtNi43NzcgMy4yMTh2LTMuODk4YTEyLjQ1NiAxMi40NTYgMCAwIDAgNC44NS0yLjYzIDEzLjE2OCAxMy4xNjggMCAwIDAgMy4zMzMtNC40NjUgMTMuMTA5IDEzLjEwOSAwIDAgMCAxLjIwMS01LjU1M2MwLTEuOTY1LS40LTMuODE2LTEuMjAxLTUuNTU0YTEzLjE2OCAxMy4xNjggMCAwIDAtMy4zMzItNC40NjUgMTIuNDU2IDEyLjQ1NiAwIDAgMC00Ljg1MS0yLjYzVjF6Jy8+IDxwYXRoIGZpbGw9JyNGRkYnIGQ9J00yNi41MjMgMTcuNTQ3YzAgMS42NjItLjQyMyAzLjE2NS0xLjI3IDQuNTFhOC40NTMgOC40NTMgMCAwIDEtMy40NDUgMy4xMDZWOS45M2MxLjQ1LjcyNSAyLjYgMS43NiAzLjQ0NSAzLjEwNS44NDcgMS4zNDUgMS4yNyAyLjg0OCAxLjI3IDQuNTF6TTEgMTEuODhoNy41MjVMMTggMi40MDV2MzAuMjgzbC05LjQ3NS05LjQ3NUgxeicvPiA8L2c+IDwvc3ZnPg==',
  volumeLow: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTI2LjUyMyAxNy41NDdjMCAxLjY2Mi0uNDIzIDMuMTY1LTEuMjcgNC41MWE4LjQ1MyA4LjQ1MyAwIDAgMS0zLjQ0NSAzLjEwNlY5LjkzYzEuNDUuNzI1IDIuNiAxLjc2IDMuNDQ1IDMuMTA1Ljg0NyAxLjM0NSAxLjI3IDIuODQ4IDEuMjcgNC41MXpNMSAxMS44OGg3LjUyNUwxOCAyLjQwNXYzMC4yODNsLTkuNDc1LTkuNDc1SDF6Jy8+IDwvZz4gPC9zdmc+',
  mute: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTEgMTEuODhoNy41MjVMMTggMi40MDV2MzAuMjgzbC05LjQ3NS05LjQ3NUgxeicvPiA8ZyBmaWxsLXJ1bGU9J25vbnplcm8nPiA8cGF0aCBkPSdNMjAgMTFoMTR2MTRIMjB6Jy8+IDxwYXRoIGZpbGw9JyNGRkYnIGQ9J00zMS45NCAxMC45NGwyLjEyIDIuMTItMTIgMTItMi4xMi0yLjEyeicvPiA8cGF0aCBmaWxsPScjRkZGJyBkPSdNMTkuOTQgMTMuMDZsMi4xMi0yLjEyIDEyIDEyLTIuMTIgMi4xMnonLz4gPC9nPiA8L2c+IDwvc3ZnPg==',
  setting: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjgnLz4gPHBhdGggZmlsbD0nI0ZGRicgZmlsbC1ydWxlPSdub256ZXJvJyBkPSdNMjMuMzA4IDMxLjQ3M2wtLjI2MyAyLjI3QTEuNDM0IDEuNDM0IDAgMCAxIDIxLjYxMSAzNWgtNy4yMjJjLS43MzQgMC0xLjM1MS0uNTQtMS40MzQtMS4yNTdsLS4yNjMtMi4yN2ExNS4xMzQgMTUuMTM0IDAgMCAxLTQuMDA3LTIuMTlsLTIuMDU0Ljg3N2ExLjQ1NyAxLjQ1NyAwIDAgMS0xLjgyNi0uNTlsLTMuNjExLTYuMTRhMS40IDEuNCAwIDAgMSAuMzkxLTEuODQ3bDEuNjM3LTEuMTg3YTEzLjk0MiAxMy45NDIgMCAwIDEgMC00Ljc5MmwtMS42MzctMS4xODdhMS40IDEuNCAwIDAgMS0uMzkxLTEuODQ4bDMuNjEtNi4xMzhhMS40NTcgMS40NTcgMCAwIDEgMS44MjctLjU5bDIuMDU0Ljg3NmExNS4xMzQgMTUuMTM0IDAgMCAxIDQuMDA3LTIuMTlsLjI2My0yLjI3Yy4wODMtLjcxNi43LTEuMjU3IDEuNDM0LTEuMjU3aDcuMjIyYy43MzQgMCAxLjM1MS41NCAxLjQzNCAxLjI1N2wuMjYzIDIuMjdhMTUuMTM0IDE1LjEzNCAwIDAgMSA0LjAwNyAyLjE5bDIuMDU0LS44NzdhMS40NTcgMS40NTcgMCAwIDEgMS44MjYuNTlsMy42MTEgNi4xNGExLjQgMS40IDAgMCAxLS4zOTEgMS44NDdsLTEuNjM3IDEuMTg3YTEzLjk0MyAxMy45NDMgMCAwIDEgMCA0Ljc5MmwxLjYzNyAxLjE4N2ExLjQgMS40IDAgMCAxIC4zOTEgMS44NDhsLTMuNjEgNi4xMzhhMS40NTcgMS40NTcgMCAwIDEtMS44MjcuNTlsLTIuMDU0LS44NzZhMTUuMTM0IDE1LjEzNCAwIDAgMS00LjAwNyAyLjE5ek0xOCAyNmE4IDggMCAxIDAgMC0xNiA4IDggMCAwIDAgMCAxNnonLz4gPC9nPiA8L3N2Zz4=',
  check: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyMCcgaGVpZ2h0PScyMCcgdmlld0JveD0nMCAwIDIwIDIwJz48cGF0aCBmaWxsPScjRkZGJyBmaWxsLXJ1bGU9J25vbnplcm8nIGQ9J00yLjkwMiA5LjI2MWExLjA4NyAxLjA4NyAwIDAgMC0xLjU3NiAwIDEuMTgzIDEuMTgzIDAgMCAwIDAgMS42MzJsNS41NzEgNS43NjljLjQzNS40NSAxLjE0LjQ1IDEuNTc2IDBsMTEuMi0xMS42OTJhMS4xODMgMS4xODMgMCAwIDAgMC0xLjYzMiAxLjA4NyAxLjA4NyAwIDAgMC0xLjU3NSAwTDcuNjg1IDE0LjIxNCAyLjkwMiA5LjI2MXonLz48L3N2Zz4K',
  enterFullScreen: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTMwIDMwdi05aDR2MTNIMjF2LTRoOXptNC0yNHY5aC00VjZoLTlWMmgxM3Y0ek02IDMwaDl2NEgyVjIxaDR2OXpNNiAyaDl2NEg2djlIMlYyaDR6Jy8+IDwvZz4gPC9zdmc+',
  leaveFullScreen: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNicgdmlld0JveD0nMCAwIDM2IDM2Jz4gPGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz4gPHBhdGggZD0nTTAgMGgzNnYzNkgweicgb3BhY2l0eT0nLjUnLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTExIDJoNHYxM2gtNHonLz4gPHBhdGggZmlsbD0nI0ZGRicgZD0nTTIgMTFoMTN2NEgyek0xMSAzNGg0VjIxaC00eicvPiA8cGF0aCBmaWxsPScjRkZGJyBkPSdNMiAyNWgxM3YtNEgyek0zNCAxMXY0SDIxdi00eicvPiA8cGF0aCBmaWxsPScjRkZGJyBkPSdNMjUgMnYxM2gtNFYyek0zNCAyNXYtNEgyMXY0eicvPiA8cGF0aCBmaWxsPScjRkZGJyBkPSdNMjUgMzRWMjFoLTR2MTN6Jy8+IDwvZz4gPC9zdmc+',
  previousEpisode: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik0zMiAzMlY0TDExIDE4em0tMjEgMFY0SDR2Mjh6Ii8+PC9nPjwvc3ZnPg==',
  nextEpisode: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiI+PGRlZnM+PGZpbHRlciBpZD0iYSIgaGVpZ2h0PSIxNTAlIj48ZmVHYXVzc2lhbkJsdXIgaW49IlNvdXJjZUFscGhhIiBzdGREZXZpYXRpb249IjMiLz48ZmVPZmZzZXQgZHg9IjIiIGR5PSIyIiByZXN1bHQ9Im9mZnNldGJsdXIiLz48ZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVGdW5jQSB0eXBlPSJsaW5lYXIiIHNsb3BlPSIuNyIvPjwvZmVDb21wb25lbnRUcmFuc2Zlcj48ZmVNZXJnZT48ZmVNZXJnZU5vZGUvPjxmZU1lcmdlTm9kZSBpbj0iU291cmNlR3JhcGhpYyIvPjwvZmVNZXJnZT48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBmaWx0ZXI9InVybCgjYSkiPjxwYXRoIGZpbGw9IiNGRkYiIGQ9Ik00IDMyVjRsMjEgMTR6bTIxIDBWNGg3djI4eiIvPjwvZz48L3N2Zz4=',
  pauseCircle: 'data:image/png;base64,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',
  playCircle: 'data:image/png;base64,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',
  playCircleBorder: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyOSIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBmaWxsPSIjRkZGIiBkPSJNMjIgMTcuMTJ2MjYuM2ExIDEgMCAwMDEuNTQuODRsMjAuNy0xMy4xNWExIDEgMCAwMDAtMS42OWwtMjAuNy0xMy4xNWExIDEgMCAwMC0xLjU0Ljg1eiIvPjwvZz48L3N2Zz4=',
  arrowTop: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwdjE2aDE2VjB6IiBvcGFjaXR5PSIuNSIvPjxwYXRoIGZpbGw9IiNDQ0MiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTIuNTcgMTAuMjdhLjgzLjgzIDAgMDEtMS4xNC0xLjJsNi01LjY4Yy4zMi0uMy44Mi0uMyAxLjE0IDBsNiA1LjY3YS44My44MyAwIDExLTEuMTQgMS4yMUw4IDUuMTVsLTUuNDMgNS4xMnoiLz48L2c+PC9zdmc+',
  close: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI5LjY1IDQuMDVhMS4yIDEuMiAwIDEwLTEuNy0xLjdsLTI1LjYgMjUuNmExLjIgMS4yIDAgMDAxLjcgMS43bDI1LjYtMjUuNnoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMi4zNSA0LjA1YTEuMiAxLjIgMCAxMTEuNy0xLjdsMjUuNiAyNS42YTEuMiAxLjIgMCAwMS0xLjcgMS43TDIuMzUgNC4wNXoiLz48L3N2Zz4=',
  castNotConnected: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6bTAtNHYyYTUgNSAwIDAxNSA1aDJhNyA3IDAgMDAtNy03em0wLTR2MmE5IDkgMCAwMTkgOWgyQTExIDExIDAgMDAxIDEwem0yMC03SDNhMiAyIDAgMDAtMiAydjNoMlY1aDE4djE0aC03djJoN2EyIDIgMCAwMDItMlY1YTIgMiAwIDAwLTItMnoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6Ii8+PC9nPjwvc3ZnPg==',
  castConnected: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6bTAtNHYyYTUgNSAwIDAxNSA1aDJhNyA3IDAgMDAtNy03em0xOC03SDV2MS42M0ExMy4wMyAxMy4wMyAwIDAxMTMuMzcgMTdIMTlWN3pNMSAxMHYyYTkgOSAwIDAxOSA5aDJBMTEgMTEgMCAwMDEgMTB6bTIwLTdIM2EyIDIgMCAwMC0yIDJ2M2gyVjVoMTh2MTRoLTd2Mmg3YTIgMiAwIDAwMi0yVjVhMiAyIDAgMDAtMi0yeiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiLz48L2c+PC9zdmc+',
  castConntecting0: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEgMTR2MmE1IDUgMCAwMTUgNWgyYTcgNyAwIDAwLTctN3oiIG9wYWNpdHk9Ii4zIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEgMTB2MmE5IDkgMCAwMTkgOWgyQTExIDExIDAgMDAxIDEweiIgb3BhY2l0eT0iLjMiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMjEgM0gzYTIgMiAwIDAwLTIgMnYzaDJWNWgxOHYxNGgtN3YyaDdhMiAyIDAgMDAyLTJWNWEyIDIgMCAwMC0yLTJ6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPjwvZz48L3N2Zz4=',
  castConntecting1: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6IiBvcGFjaXR5PSIuMyIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0xIDE0djJhNSA1IDAgMDE1IDVoMmE3IDcgMCAwMC03LTd6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEgMTB2MmE5IDkgMCAwMTkgOWgyQTExIDExIDAgMDAxIDEweiIgb3BhY2l0eT0iLjMiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMjEgM0gzYTIgMiAwIDAwLTIgMnYzaDJWNWgxOHYxNGgtN3YyaDdhMiAyIDAgMDAyLTJWNWEyIDIgMCAwMC0yLTJ6IiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTAgMGgyNHYyNEgweiIvPjwvZz48L3N2Zz4=',
  castConntecting2: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xIDE4djNoM2EzIDMgMCAwMC0zLTN6TTEgMTR2MmE1IDUgMCAwMTUgNWgyYTcgNyAwIDAwLTctN3oiIG9wYWNpdHk9Ii4zIiBmaWxsPSIjMDAwIi8+PHBhdGggZD0iTTEgMTB2MmE5IDkgMCAwMTkgOWgyQTExIDExIDAgMDAxIDEweiIgZmlsbD0iIzAwMCIvPjxwYXRoIGQ9Ik0yMSAzSDNhMiAyIDAgMDAtMiAydjNoMlY1aDE4djE0aC03djJoN2EyIDIgMCAwMDItMlY1YTIgMiAwIDAwLTItMnoiIGZpbGw9IiMwMDAiLz48cGF0aCBkPSJNMCAwaDI0djI0SDB6Ii8+PC9nPjwvc3ZnPg==',
  warning: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc4MCcgaGVpZ2h0PSc4MCcgdmlld0JveD0nMCAwIDgwIDgwJz48cGF0aCBmaWxsPScjRkZGJyBmaWxsLXJ1bGU9J25vbnplcm8nIGQ9J003OS40MDkgNzAuMDQ0TDQ0LjUxNCA0LjY2MUE1LjAyMyA1LjAyMyAwIDAgMCA0MC4wODMgMmgtLjAwNWE1LjAyNCA1LjAyNCAwIDAgMC00LjQzMSAyLjY1NkwuNTk3IDcwLjAzOUE1LjAzNyA1LjAzNyAwIDAgMCAuNzExIDc1YTUuMDQyIDUuMDQyIDAgMCAwIDQuMzE1IDIuNDQ0aDY5Ljk0YzEuNzcxIDAgMy40MDYtLjkyNiA0LjMxNi0yLjQ0NWE1LjAyOSA1LjAyOSAwIDAgMCAuMTI2LTQuOTU0em0tMzkuMzMxLTIuNjZhNS4wMzEgNS4wMzEgMCAwIDEtNS4wMy01LjAzIDUuMDMxIDUuMDMxIDAgMCAxIDUuMDMtNS4wMyA1LjAzNSA1LjAzNSAwIDAgMSA1LjAzIDUuMDMgNS4wMzEgNS4wMzEgMCAwIDEtNS4wMyA1LjAzem01LjAzNC0yMC4wMzhhNS4wMzEgNS4wMzEgMCAwIDEtNS4wMjkgNS4wMyA1LjAyOCA1LjAyOCAwIDAgMS01LjAzLTUuMDNWMjcuMjI4YTUuMDMxIDUuMDMxIDAgMCAxIDUuMDMtNS4wMyA1LjAzNSA1LjAzNSAwIDAgMSA1LjAzIDUuMDN2MjAuMTE4eicvPjwvc3ZnPgo=',
  cancel: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSczNicgaGVpZ2h0PSczNic+PGcgZmlsbD0nbm9uZScgZmlsbC1ydWxlPSdldmVub2RkJz48cGF0aCBkPSdNMCAwaDM2djM2SDB6JyBvcGFjaXR5PScuNScvPjxwYXRoIGQ9J00zMS41MzMgNC45MDNMNC40NjcgMzAuNjQ1bTI3LjA2Ni40NTJMNC45MzMgNC45MDMnIGZpbGwtcnVsZT0nbm9uemVybycgc3Ryb2tlPScjRkZGJyBzdHJva2Utd2lkdGg9JzQnLz48L2c+PC9zdmc+'
};

const Icon = function ({
  type,
  ...others
}) {
  return jsx$1("div", {
    css: /*#__PURE__*/css({
      width: 'inherit',
      height: 'inherit',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundImage: `url(${icon[type]})`,
      pointerEvents: 'none',
      touchAction: 'none'
    }, process.env.NODE_ENV === "production" ? "" : ";label:Icon;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkljb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT00iLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcbmltcG9ydCBpY29uIGZyb20gJ3N0eWxlL2ljb24nXG5cbmNvbnN0IEljb24gPSBmdW5jdGlvbiAoe3R5cGUsIC4uLm90aGVyc30pIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e3tcbiAgICAgICAgd2lkdGg6ICdpbmhlcml0JyxcbiAgICAgICAgaGVpZ2h0OiAnaW5oZXJpdCcsXG4gICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogJ2NlbnRlcicsXG4gICAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uW3R5cGVdfSlgLFxuICAgICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgICAgIHRvdWNoQWN0aW9uOiAnbm9uZScsXG4gICAgICB9fVxuICAgICAgYXJpYS1sYWJlbD17dHlwZX1cbiAgICAgIHsuLi5vdGhlcnN9XG4gICAgLz5cbiAgKVxufVxuXG5JY29uLnByb3BUeXBlcyA9IHtcbiAgdHlwZTogUHJvcFR5cGVzLnN0cmluZyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgSWNvblxuIl19 */"),
    "aria-label": type,
    ...others
  });
};

Icon.propTypes = {
  type: PropTypes.string
};

/* eslint-disable react/prop-types */
const styles$1 = {
  // TODO keep only necessary
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
  backgroundColor: 'transparent',
  userSelect: 'none',
  '> span': {
    width: '100%',
    height: '100%'
  }
};
const variants = {
  outlined: {
    width: '8em',
    height: '2em',
    border: '1px solid #fff',
    borderRadius: '4px',
    background: 'none',
    color: 'inherit',
    opacity: 0.8
  }
};
const tooltipStyle = {
  zIndex: 7,
  position: 'fixed',
  padding: '8px 12px',
  borderRadius: 4,
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgba(51, 51, 51, 0.625)'
};

const isOverflowing$1 = element => element.scrollWidth > element.clientWidth;

const Tooltip$1 = ({
  title,
  bottom = '0px',
  overflowOnly,
  disabled,
  children,
  container
}) => {
  const tooltipRef = useRef();
  const boxes = useRef();
  const defaultContainer = useRef();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(() => ({
    left: '100%'
  }));
  const childProps = {
    onMouseEnter: event => {
      if (!overflowOnly || isOverflowing$1(event.currentTarget)) {
        boxes.current = [event.currentTarget.getBoundingClientRect(), document.body.getBoundingClientRect()];
        defaultContainer.current = document.fullscreenElement || document.webkitFullscreenElement || document.body;
        setOpen(true);
      }
    },
    onMouseLeave: () => {
      setPosition({
        left: '100%'
      });
      setOpen(false);
    }
  };
  useEffect(() => {
    if (disabled) {
      setOpen(false);
    }
  }, [disabled]);
  useEffect(() => {
    if (open) {
      const targetPosition = getPopoverPosition(tooltipRef.current.getBoundingClientRect(), ...boxes.current);
      targetPosition.left !== position.left && setPosition(targetPosition);
    }
  }, [open, position.left]);
  return !title || !isDesktop() && !window.matchMedia(havePointerQuery).matches ? children : jsxs(Fragment, {
    children: [/*#__PURE__*/cloneElement(children, childProps), open && /*#__PURE__*/createPortal(jsx$1("div", {
      style: { ...tooltipStyle,
        ...position,
        top: `calc(${position.top}px - ${bottom})`
      },
      ref: tooltipRef,
      children: jsx$1(FormattedMessage, {
        id: title
      })
    }), container || defaultContainer.current)]
  });
};

const Button = ({
  startIcon,
  variant,
  style,
  title,
  children,
  ...rest
}) => jsx$1(Tooltip$1, {
  title: title,
  bottom: "3em",
  disabled: rest.disabled,
  children: jsxs("button", {
    type: "button",
    css: [styles$1, variants[variant], style, process.env.NODE_ENV === "production" ? "" : ";label:Button;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1dHRvbnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkgwQiIsImZpbGUiOiJidXR0b25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuaW1wb3J0IHt1c2VTdGF0ZSwgdXNlRWZmZWN0LCB1c2VSZWYsIGNsb25lRWxlbWVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQge2NyZWF0ZVBvcnRhbH0gZnJvbSAncmVhY3QtZG9tJ1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQge2dldFBvcG92ZXJQb3NpdGlvbn0gZnJvbSAndXRpbC9pbmRleCdcbmltcG9ydCB7aGF2ZVBvaW50ZXJRdWVyeSwgaXNEZXNrdG9wfSBmcm9tICd1dGlsL2Vudmlyb25tZW50J1xuaW1wb3J0IHtGb3JtYXR0ZWRNZXNzYWdlLCB1c2VJbnRsfSBmcm9tICdjb250ZXh0L0kxOG4nXG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24nXG5cbmNvbnN0IHN0eWxlcyA9IHtcbiAgLy8gVE9ETyBrZWVwIG9ubHkgbmVjZXNzYXJ5XG4gIGJvcmRlcjogJ25vbmUnLFxuICBvdXRsaW5lOiAnbm9uZScsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICBwYWRkaW5nOiAwLFxuICBmbGV4U2hyaW5rOiAwLFxuICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgJz4gc3Bhbic6IHtcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICB9LFxufVxuXG5jb25zdCB2YXJpYW50cyA9IHtcbiAgb3V0bGluZWQ6IHtcbiAgICB3aWR0aDogJzhlbScsXG4gICAgaGVpZ2h0OiAnMmVtJyxcbiAgICBib3JkZXI6ICcxcHggc29saWQgI2ZmZicsXG4gICAgYm9yZGVyUmFkaXVzOiAnNHB4JyxcbiAgICBiYWNrZ3JvdW5kOiAnbm9uZScsXG4gICAgY29sb3I6ICdpbmhlcml0JyxcbiAgICBvcGFjaXR5OiAwLjgsXG4gIH0sXG59XG5cbmNvbnN0IHRvb2x0aXBTdHlsZSA9IHtcbiAgekluZGV4OiA3LFxuICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgcGFkZGluZzogJzhweCAxMnB4JyxcbiAgYm9yZGVyUmFkaXVzOiA0LFxuICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICBjb2xvcjogJ3doaXRlJyxcbiAgYmFja2dyb3VuZENvbG9yOiAncmdiYSg1MSwgNTEsIDUxLCAwLjYyNSknLFxufVxuXG5jb25zdCBpc092ZXJmbG93aW5nID0gZWxlbWVudCA9PiBlbGVtZW50LnNjcm9sbFdpZHRoID4gZWxlbWVudC5jbGllbnRXaWR0aFxuXG5jb25zdCBUb29sdGlwID0gKHtcbiAgdGl0bGUsXG4gIGJvdHRvbSA9ICcwcHgnLFxuICBvdmVyZmxvd09ubHksXG4gIGRpc2FibGVkLFxuICBjaGlsZHJlbixcbiAgY29udGFpbmVyLFxufSkgPT4ge1xuICBjb25zdCB0b29sdGlwUmVmID0gdXNlUmVmKClcbiAgY29uc3QgYm94ZXMgPSB1c2VSZWYoKVxuICBjb25zdCBkZWZhdWx0Q29udGFpbmVyID0gdXNlUmVmKClcbiAgY29uc3QgW29wZW4sIHNldE9wZW5dID0gdXNlU3RhdGUoZmFsc2UpXG4gIGNvbnN0IFtwb3NpdGlvbiwgc2V0UG9zaXRpb25dID0gdXNlU3RhdGUoKCkgPT4gKHtsZWZ0OiAnMTAwJSd9KSlcblxuICBjb25zdCBjaGlsZFByb3BzID0ge1xuICAgIG9uTW91c2VFbnRlcjogZXZlbnQgPT4ge1xuICAgICAgaWYgKCFvdmVyZmxvd09ubHkgfHwgaXNPdmVyZmxvd2luZyhldmVudC5jdXJyZW50VGFyZ2V0KSkge1xuICAgICAgICBib3hlcy5jdXJyZW50ID0gW1xuICAgICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgICAgZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxcbiAgICAgICAgXVxuICAgICAgICBkZWZhdWx0Q29udGFpbmVyLmN1cnJlbnQgPVxuICAgICAgICAgIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8XG4gICAgICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHxcbiAgICAgICAgICBkb2N1bWVudC5ib2R5XG4gICAgICAgIHNldE9wZW4odHJ1ZSlcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uTW91c2VMZWF2ZTogKCkgPT4ge1xuICAgICAgc2V0UG9zaXRpb24oe2xlZnQ6ICcxMDAlJ30pXG4gICAgICBzZXRPcGVuKGZhbHNlKVxuICAgIH0sXG4gIH1cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIHNldE9wZW4oZmFsc2UpXG4gICAgfVxuICB9LCBbZGlzYWJsZWRdKVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKG9wZW4pIHtcbiAgICAgIGNvbnN0IHRhcmdldFBvc2l0aW9uID0gZ2V0UG9wb3ZlclBvc2l0aW9uKFxuICAgICAgICB0b29sdGlwUmVmLmN1cnJlbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksXG4gICAgICAgIC4uLmJveGVzLmN1cnJlbnRcbiAgICAgIClcbiAgICAgIHRhcmdldFBvc2l0aW9uLmxlZnQgIT09IHBvc2l0aW9uLmxlZnQgJiYgc2V0UG9zaXRpb24odGFyZ2V0UG9zaXRpb24pXG4gICAgfVxuICB9LCBbb3BlbiwgcG9zaXRpb24ubGVmdF0pXG5cbiAgcmV0dXJuICF0aXRsZSB8fFxuICAgICghaXNEZXNrdG9wKCkgJiYgIXdpbmRvdy5tYXRjaE1lZGlhKGhhdmVQb2ludGVyUXVlcnkpLm1hdGNoZXMpID8gKFxuICAgIGNoaWxkcmVuXG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtjbG9uZUVsZW1lbnQoY2hpbGRyZW4sIGNoaWxkUHJvcHMpfVxuICAgICAge29wZW4gJiZcbiAgICAgICAgY3JlYXRlUG9ydGFsKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIC4uLnRvb2x0aXBTdHlsZSxcbiAgICAgICAgICAgICAgLi4ucG9zaXRpb24sXG4gICAgICAgICAgICAgIHRvcDogYGNhbGMoJHtwb3NpdGlvbi50b3B9cHggLSAke2JvdHRvbX0pYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICByZWY9e3Rvb2x0aXBSZWZ9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9e3RpdGxlfSAvPlxuICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgICBjb250YWluZXIgfHwgZGVmYXVsdENvbnRhaW5lci5jdXJyZW50XG4gICAgICAgICl9XG4gICAgPC8+XG4gIClcbn1cblxuY29uc3QgQnV0dG9uID0gKHtzdGFydEljb24sIHZhcmlhbnQsIHN0eWxlLCB0aXRsZSwgY2hpbGRyZW4sIC4uLnJlc3R9KSA9PiAoXG4gIDxUb29sdGlwIHRpdGxlPXt0aXRsZX0gYm90dG9tPVwiM2VtXCIgZGlzYWJsZWQ9e3Jlc3QuZGlzYWJsZWR9PlxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNzcz17W3N0eWxlcywgdmFyaWFudHNbdmFyaWFudF0sIHN0eWxlXX0gey4uLnJlc3R9PlxuICAgICAge3R5cGVvZiBzdGFydEljb24gPT09ICdzdHJpbmcnID8gPEljb24gdHlwZT17c3RhcnRJY29ufSAvPiA6IHN0YXJ0SWNvbn1cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2J1dHRvbj5cbiAgPC9Ub29sdGlwPlxuKVxuXG5CdXR0b24ucHJvcFR5cGVzID0ge1xuICBzdGFydEljb246IFByb3BUeXBlcy5ub2RlLFxuICBjaGlsZHJlbjogUHJvcFR5cGVzLm5vZGUsXG59XG5cbmNvbnN0IFBsYXlCdXR0b24gPSAoe3BsYXliYWNrU3RhdGUsIGVuZGVkLCBoaWRkZW4sIG9uQ2xpY2ssIC4uLnJlc3R9KSA9PiAoXG4gIDxCdXR0b25cbiAgICBzdHlsZT17aGlkZGVuICYmIHtvcGFjaXR5OiAwfX1cbiAgICBzdGFydEljb249e1xuICAgICAgZW5kZWQgPyAncmVwbGF5JyA6IHBsYXliYWNrU3RhdGUgPT09ICdwbGF5aW5nJyA/ICdwYXVzZScgOiAncGxheSdcbiAgICB9XG4gICAgdGl0bGU9e2BLS1MuUExBWUVSLiR7XG4gICAgICBlbmRlZCA/ICdSRVBMQVknIDogcGxheWJhY2tTdGF0ZSA9PT0gJ3BsYXlpbmcnID8gJ1BBVVNFJyA6ICdQTEFZJ1xuICAgIH1gfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgey4uLnJlc3R9XG4gIC8+XG4pXG5cblBsYXlCdXR0b24ucHJvcFR5cGVzID0ge1xuICBlbmRlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxufVxuXG5jb25zdCBGdWxsc2NyZWVuQnV0dG9uID0gKHt2aWV3TW9kZSwgb25DbGlja30pID0+IHtcbiAgY29uc3QgaWNvbiA9IHZpZXdNb2RlID09PSAnZnVsbHNjcmVlbicgPyAnbGVhdmVGdWxsU2NyZWVuJyA6ICdlbnRlckZ1bGxTY3JlZW4nXG4gIGNvbnN0IHRleHQgPSB1c2VJbnRsKCkuZm9ybWF0TWVzc2FnZShcbiAgICB2aWV3TW9kZSA9PT0gJ2Z1bGxzY3JlZW4nXG4gICAgICA/ICdLS1MuUExBWUVSLkZVTExTQ1JFRU4uRVhJVCdcbiAgICAgIDogJ0tLUy5QTEFZRVIuRlVMTFNDUkVFTidcbiAgKVxuXG4gIHJldHVybiA8QnV0dG9uIHN0YXJ0SWNvbj17aWNvbn0gdGl0bGU9e3RleHR9IG9uQ2xpY2s9e29uQ2xpY2t9IC8+XG59XG5cbmNvbnN0IHNraXBTdHlsZXMgPSB7XG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIHBhZGRpbmc6ICcwLjVyZW0nLFxuICBib3JkZXI6ICcxcHggc29saWQgI2ZmZicsXG4gIGNvbG9yOiAnI2ZmZicsXG4gIGJhY2tncm91bmQ6ICdyZ2JhKDAsIDAsIDAsIDAuNCknLFxuICBmb250U2l6ZTogJzI0cHgnLFxuICBvcGFjaXR5OiAwLjgsXG4gICcmOmRpc2FibGVkJzoge1xuICAgIG9wYWNpdHk6IDAuNSxcbiAgfSxcbiAgJz4gZGl2Jzoge1xuICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICAgIHdpZHRoOiAnMS41cmVtJyxcbiAgICBoZWlnaHQ6ICcxLjVyZW0nLFxuICB9LFxufVxuXG5jb25zdCBTa2lwQnV0dG9uID0gKHt3YWl0VGltZSwgb25DbGlja30pID0+IChcbiAgPGJ1dHRvblxuICAgIHR5cGU9XCJidXR0b25cIlxuICAgIGNzcz17c2tpcFN0eWxlc31cbiAgICBkaXNhYmxlZD17d2FpdFRpbWUgPiAwfVxuICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gID5cbiAgICB7d2FpdFRpbWUgPiAwID8gKFxuICAgICAgPD5cbiAgICAgICAge01hdGguY2VpbCh3YWl0VGltZSl9IDxGb3JtYXR0ZWRNZXNzYWdlIGlkPVwiS0tTLlNTQUkuU0VDT05EU1wiIC8+XG4gICAgICA8Lz5cbiAgICApIDogKFxuICAgICAgPEZvcm1hdHRlZE1lc3NhZ2UgaWQ9XCJLS1MuU1NBSS5TS0lQLkFEXCIgLz5cbiAgICApfVxuICAgIDxJY29uIHR5cGU9XCJuZXh0RXBpc29kZVwiIC8+XG4gIDwvYnV0dG9uPlxuKVxuXG5leHBvcnQge0J1dHRvbiwgUGxheUJ1dHRvbiwgRnVsbHNjcmVlbkJ1dHRvbiwgU2tpcEJ1dHRvbn1cbiJdfQ== */"],
    ...rest,
    children: [typeof startIcon === 'string' ? jsx$1(Icon, {
      type: startIcon
    }) : startIcon, children]
  })
});

Button.propTypes = {
  startIcon: PropTypes.node,
  children: PropTypes.node
};

const PlayButton$1 = ({
  playbackState,
  ended,
  hidden,
  onClick,
  ...rest
}) => jsx$1(Button, {
  style: hidden && {
    opacity: 0
  },
  startIcon: ended ? 'replay' : playbackState === 'playing' ? 'pause' : 'play',
  title: `KKS.PLAYER.${ended ? 'REPLAY' : playbackState === 'playing' ? 'PAUSE' : 'PLAY'}`,
  onClick: onClick,
  ...rest
});

PlayButton$1.propTypes = {
  ended: PropTypes.bool,
  onClick: PropTypes.func
};

const FullscreenButton = ({
  viewMode,
  onClick
}) => {
  const icon = viewMode === 'fullscreen' ? 'leaveFullScreen' : 'enterFullScreen';
  const text = useIntl().formatMessage(viewMode === 'fullscreen' ? 'KKS.PLAYER.FULLSCREEN.EXIT' : 'KKS.PLAYER.FULLSCREEN');
  return jsx$1(Button, {
    startIcon: icon,
    title: text,
    onClick: onClick
  });
};

const skipStyles = {
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem',
  border: '1px solid #fff',
  color: '#fff',
  background: 'rgba(0, 0, 0, 0.4)',
  fontSize: '24px',
  opacity: 0.8,
  '&:disabled': {
    opacity: 0.5
  },
  '> div': {
    marginLeft: '0.5rem',
    width: '1.5rem',
    height: '1.5rem'
  }
};

const SkipButton = ({
  waitTime,
  onClick
}) => jsxs("button", {
  type: "button",
  css: skipStyles,
  disabled: waitTime > 0,
  onClick: onClick,
  children: [waitTime > 0 ? jsxs(Fragment, {
    children: [Math.ceil(waitTime), " ", jsx$1(FormattedMessage, {
      id: "KKS.SSAI.SECONDS"
    })]
  }) : jsx$1(FormattedMessage, {
    id: "KKS.SSAI.SKIP.AD"
  }), jsx$1(Icon, {
    type: "nextEpisode"
  })]
});

const type = {
  SELECT_MEDIA_SOURCE: 'UI_SELECT_MEDIA_SOURCE',
  SET_MEDIA_SOURCES: 'UI_SET_MEDIA_SOURCES',
  CHANGE_RECOMMENDATION_PANEL: 'CHANGE_RECOMMENDATION_PANEL',
  TOGGLE_RECOMMENDATION_PANEL: 'TOGGLE_RECOMMENDATION_PANEL',
  OPEN_PANEL: 'OPEN_PANEL',
  HIDE_PANEL: 'HIDE_PANEL',
  OFFER_AUTOPLAY: 'OFFER_AUTOPLAY',
  DISMISS_AUTOPLAY: 'DISMISS_AUTOPLAY',
  ERROR: 'UI_ERROR',
  RESET_END_ROLL: 'RESET_END_ROLL',
  STREAM_EVENTS_CHANGED: 'STREAM_EVENTS_CHANGED',
  AD_BREAK_STARTED: 'AD_BREAK_STARTED',
  AD_BREAK_ENDED: 'AD_BREAK_ENDED',
  VISIBILITY_CHANGE: 'VISIBILITY_CHANGE',
  PLAYBACK_END: 'PLAYBACK_END'
};
var uiActions = {
  selectMediaSource: mediaSource => ({
    type: type.SELECT_MEDIA_SOURCE,
    mediaSource
  }),
  setMediaSources: (items = []) => ({
    type: type.SET_MEDIA_SOURCES,
    items
  }),
  enableRecommendationPanel: () => ({
    type: type.CHANGE_RECOMMENDATION_PANEL,
    enabled: true
  }),
  disableRecommendationPanel: () => ({
    type: type.CHANGE_RECOMMENDATION_PANEL,
    enabled: false
  }),
  toggleRecommendationPanel: () => ({
    type: type.TOGGLE_RECOMMENDATION_PANEL
  }),
  openPanel: panel => ({
    type: type.OPEN_PANEL,
    panel
  }),
  hidePanel: () => ({
    type: type.HIDE_PANEL
  }),
  offerAutoplay: state => ({
    type: type.OFFER_AUTOPLAY,
    endState: state
  }),
  dismissAutoplay: () => ({
    type: type.DISMISS_AUTOPLAY
  }),
  streamEventsChanged: (streamEvents, playbackStatus) => ({
    type: type.STREAM_EVENTS_CHANGED,
    streamEvents,
    playbackStatus
  }),
  adBreakStarted: (adProgressData, skipTimeOffset) => ({
    type: type.AD_BREAK_STARTED,
    adProgressData,
    skipTimeOffset
  }),
  adBreakEnded: () => ({
    type: type.AD_BREAK_ENDED
  }),
  playbackEnd: () => ({
    type: type.PLAYBACK_END
  })
};

/* eslint-disable react/prop-types */

const linkAdState = ({
  contentType,
  dispatch,
  plugins,
  onAdSkip
}) => {
  const handleStart = event => {
    var _event$getAd;

    // TODO playlog ad start event
    dispatch(uiActions.adBreakStarted(event.getStreamData().adProgressData, contentType !== 'lives' && ((_event$getAd = event.getAd()) === null || _event$getAd === void 0 ? void 0 : _event$getAd.getSkipTimeOffset())));
  };

  return linkPluginEvents(plugins, {
    cuepointsChanged: (event, plugin) => dispatch(uiActions.streamEventsChanged(event.cuepoints, plugin.getPlaybackStatus())),
    adBreakStarted: handleStart,
    adBreakEnded: () => {
      // TODO playlog ad end event
      dispatch(uiActions.adBreakEnded());
    },
    skip: onAdSkip
  });
};

const useIntervalUpdate = get => {
  const [value, setValue] = useState(get());
  useEffect(() => {
    const intervalId = setInterval(() => setValue(get()), 500);
    return () => clearInterval(intervalId);
  }, []);
  return value;
};

const SkipAdButton = ({
  skipAd,
  getWaitTime
}) => {
  const waitTime = useIntervalUpdate(getWaitTime);
  return isFinite(waitTime) && /*#__PURE__*/jsx(SkipButton, {
    waitTime: waitTime,
    onClick: skipAd
  });
};

const Status = ({
  total,
  position,
  getRemainingTime
}) => {
  const remainingTime = useIntervalUpdate(getRemainingTime);
  return total > 0 && `Ad ${position} of ${total}・${formattedTime(remainingTime)}`;
};

const getAdUi = ({
  position,
  total,
  adBreakDuration,
  skipTimeOffset,
  clickThroughUrl
}, plugins, media) => {
  const getRemainingTime = () => getMediaTime(media, plugins).adRemainingTime;

  const getSkipWaitTime = () => skipTimeOffset >= 0 ? getRemainingTime() - (adBreakDuration - skipTimeOffset) : Infinity;

  return {
    title: false,
    channelTitle: false,
    controlButtons: {
      rewindButton: false,
      forwardButton: false,
      nextEpisodeButton: false,
      previousEpisodeButton: false
    },
    seekbar: false,
    adLink: clickThroughUrl && /*#__PURE__*/jsx("a", {
      href: clickThroughUrl,
      rel: "noreferrer",
      target: "_blank",
      children: /*#__PURE__*/jsx(FormattedMessage, {
        id: "KKS.SSAI.LEARN.MORE"
      })
    }),
    adStatus: /*#__PURE__*/jsx(Status, {
      position: position,
      total: total,
      getRemainingTime: getRemainingTime
    }),
    adSkipButton: /*#__PURE__*/jsx(SkipAdButton, {
      getWaitTime: getSkipWaitTime,
      skipAd: () => plugins.forEach(plugin => {
        var _plugin$skipAd;

        return (_plugin$skipAd = plugin.skipAd) === null || _plugin$skipAd === void 0 ? void 0 : _plugin$skipAd.call(plugin);
      })
    })
  };
};

const multiRef = (...refs) => element => {
  if (element) {
    refs.forEach(ref => {
      if (ref && 'current' in ref) {
        // eslint-disable-next-line no-param-reassign
        ref.current = element;
      } else {
        ref === null || ref === void 0 ? void 0 : ref(element);
      }
    });
  }
};

const vendors = {
  change: ['fullscreenchange', 'webkitfullscreenchange', 'MSFullscreenChange'],
  element: ['fullscreenElement', 'webkitFullscreenElement', 'msFullscreenElement'],
  request: ['requestFullscreen', 'webkitRequestFullScreen', 'msRequestFullscreen'],
  exit: ['exitFullscreen', 'webkitExitFullscreen', 'msExitFullscreen']
};

const getName = (object, nameList) => nameList.find(name => name in object);

const onViewModeChange = (video, onChange) => {
  const vendorElementName = getName(document, vendors.element);

  if (vendorElementName) {
    onChange(document[vendorElementName] ? 'fullscreen' : 'inline');
    return vendors.change.map(name => on$1(document, name, () => onChange(document[vendorElementName] ? 'fullscreen' : 'inline')));
  }

  onChange(video.webkitDisplayingFullscreen ? 'fullscreen' : 'inline');
  const registered = [on$1(video, 'webkitbeginfullscreen', () => onChange('fullscreen')), on$1(video, 'webkitendfullscreen', () => onChange('inline'))];
  return () => {
    registered.forEach(removeListener => removeListener());
  };
};

const toggleFullscreen = container => {
  const vendorElementName = getName(document, vendors.element);

  if (vendorElementName) {
    const action = document[vendorElementName] ? 'exit' : 'request';
    const target = action === 'request' ? container : document;
    return target[getName(target, vendors[action])]();
  }

  const target = container.querySelector('video');
  return target.webkitDisplayingFullscreen ? target.webkitExitFullScreen() : target.webkitEnterFullScreen();
};

/*
  Rules:
    1  Set `true` immediately in first time (For loadstart event)
    2. Set `true` to waiting lazily but update waiting to `false` immediately
*/

const useLazyWaiting = waiting => {
  const [first, setFirst] = useState(true);
  const [state, dispatch] = useState(waiting);
  const timer = useRef();
  useEffect(() => {
    clearTimeout(timer.current);

    if (waiting && !first) {
      timer.current = setTimeout(() => {
        dispatch(waiting);
      }, 1000);
    } else {
      dispatch(waiting);
      setFirst(false);
    }

    return () => clearTimeout(timer.current);
  }, [waiting]);
  return state;
};

const useAutoHide = ({
  hideTimeMs = 3000,
  pinned,
  tapToHide,
  onHide
} = {}) => {
  const timer = useRef();
  const [mode, setMode] = useState('hidden');

  const interact = () => {
    if (mode !== 'shown') {
      setMode('shown');
    }

    clearTimeout(timer.current);

    if (!pinned) {
      timer.current = setTimeout(() => setMode('hidden'), hideTimeMs);
    }
  };

  const hide = () => {
    clearTimeout(timer.current);
    setMode('hidden');
    onHide === null || onHide === void 0 ? void 0 : onHide();
  };

  useEffect(() => {
    if (mode === 'shown') {
      interact();
    }
  }, [hideTimeMs]);
  useEffect(() => {
    if (pinned) {
      setMode('shown');
      clearTimeout(timer.current);
    } else {
      interact();
    }
  }, [pinned]);
  useEffect(() => () => {
    clearTimeout(timer.current);
  }, []);
  return {
    mode,
    show: interact,
    hide,
    onClick: event => {
      if (mode === 'hidden') {
        interact();
      } else if (tapToHide && event.target.tagName !== 'BUTTON') {
        // hide if tapping on elsewhere
        hide();
      }
    },
    onMouseMove: () => {
      // In mobile web, emulated clicks generate extra mouse move events
      if (!('ontouchstart' in window)) {
        interact();
      }
    }
  };
};

const blurPause = (media, pause) => {
  const handleVisibilitychange = async () => {
    let shouldPause = true;
    pause();
    setTimeout(() => {
      shouldPause = false;
    }, 50);
    media.addEventListener('play', () => {
      if (shouldPause) {
        pause();
      }
    }, {
      once: true
    });
  };

  document.addEventListener('visibilitychange', handleVisibilitychange);
  return () => document.removeEventListener('visibilitychange', handleVisibilitychange);
};

/* @jsxImportSource @emotion/react */
const iconStyle$1 = {
  width: '78px',
  height: '78px'
};
const style$9 = {
  display: 'flex',
  justifyContent: 'center',
  flex: '100%',
  margin: '1rem 0',
  padding: '0 1.5rem',
  textAlign: 'center'
};

const Error$1 = ({
  error,
  onBack
}) => {
  const intl = useIntl();
  const values = {
    CODE: error.code || 0,
    code: error.code || 0,
    ...error.data
  };
  return jsxs(Backdrop, {
    open: true,
    children: [jsx$1(Icon, {
      type: "warning",
      style: iconStyle$1
    }), jsx$1("div", {
      css: style$9,
      children: [error.name === 'PlaycraftApiError' ? `KKS.ERROR.PLAYCRAFT.${error.code}` : `KKS.ERROR.${error.code}`, `KKS.ERROR.${error.name}`, error.message, error.name, `KKS.ERROR`].reduceRight((last, id) => intl.formatMessage({
        id,
        defaultMessage: last
      }, values), '')
    }), onBack && jsx$1(Button, {
      variant: "outlined",
      onClick: onBack,
      children: jsx$1(FormattedMessage, {
        id: "KKS.BACK"
      })
    })]
  });
};

Error$1.propTypes = {
  error: PropTypes.object,
  onBack: PropTypes.func
};

function _EMOTION_STRINGIFIED_CSS_ERROR__$4() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
const expand = {
  margin: 0,
  flex: '1'
};
const hidden = {
  display: 'none'
};
const containerStyle$1 = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  color: 'white',
  // prevent animation glich(afterimage) of descendant elements
  transform: 'translateX(0)',
  userSelect: 'none',
  h1: {
    margin: 0,
    fontSize: '1em',
    lineHeight: '1.5em'
  },
  'a, a:link, a:visited': {
    color: '#fff',
    opacity: 0.8,
    textDecoration: 'none'
  },
  button: {
    fontSize: 'inherit',
    '> *': {
      pointerEvents: 'none'
    }
  }
};
const videoContainerStyle = {
  '> div:first-of-type': {
    position: 'absolute',
    zIndex: '-1',
    width: '100%',
    height: '100%'
  }
};
const drop = {
  backgroundImage: `linear-gradient(
    0deg,
    rgba(0,0,0,0.5) 0,
    rgba(0,0,0,0) 8rem calc(100% - 8rem),
    rgba(0,0,0,0.5) 100%
  )`
};
const dropTop = {
  backgroundImage: `linear-gradient(
    0deg,
    rgba(0,0,0,0) 0,
    rgba(0,0,0,0) 8rem calc(100% - 8rem),
    rgba(0,0,0,0.5) 100%
  )`
};
const responsiveStyles = {
  desktop: {
    fontSize: '24px'
  } // add if necessary: big-desktop

};
const rowStyle = {
  boxSizing: 'border-box',
  width: '100%',
  padding: 'calc(2em - 16px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  button: {
    flex: '0 0 1.5em',
    width: '1.5em',
    height: '1.5em'
  },
  '> button:not(:disabled) ~ button:not(:disabled), div ~ button:last-of-type': {
    marginLeft: '0.5rem'
  },
  '> button:not(:last-of-type)': {
    marginRight: '0.5rem'
  }
};
const displayStyles = {
  hidden: {
    '> div:not(.pinned), > button:not(.pinned), > h1:not(.pinned)': {
      zIndex: -2,
      opacity: 0,
      transition: 'opacity 0.8s ease-out, z-index 0s 0.8s'
    }
  },
  shown: {
    '> div:not(.pinned), > button:not(.pinned), > h1:not(.pinned)': {
      transition: 'opacity 0.3s ease-out'
    }
  }
};
const controlsDisplayStyles = {
  hidden: { ...displayStyles.hidden,
    '~ div:not(.pinned)': displayStyles.hidden
  },
  shown: { ...displayStyles.shown,
    '~ div': displayStyles.shown
  }
};
const controlsStyle = {
  marginTop: 'auto',
  position: 'absolute',
  zIndex: '2',
  display: 'flex',
  alignItems: 'center',
  '> button': {
    margin: '1em',
    width: '1.75em',
    height: '1.75em',
    '&:disabled': {
      opacity: 0.3
    },
    '&.play-button': {
      width: '3em',
      height: '3em'
    }
  }
};
const slotStyle = {
  display: 'flex',
  marginLeft: '0.75em',
  button: {
    display: 'block',
    marginLeft: '0.75em'
  }
};
const textEllipsis = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
};
const infoStyle = {
  alignItems: 'flex-start',
  overflow: 'visible',
  h1: {
    height: '3em',
    fontWeight: '500',
    ...textEllipsis,
    '> div': textEllipsis
  },
  'button + h1': {
    marginLeft: '1em'
  }
};
const backStyle = {
  position: 'absolute',
  zIndex: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '~ *': {
    zIndex: 0
  }
};
const skipStyle = {
  position: 'absolute',
  right: 0,
  bottom: '9rem',
  textAlign: 'right',
  button: {
    width: 'auto',
    height: 'auto'
  }
};
const dekstopStyle$1 = {
  '> div': {
    '> button:not(:disabled) ~ button:not(:disabled), > button:last-of-type': {
      marginLeft: '0.75em'
    },
    '> button:first-of-type': {
      marginLeft: '0'
    }
  }
};
const desktopControls = {
  flexWrap: 'wrap',
  '> div:first-of-type': {
    flex: '100%',
    marginBottom: '0.88em'
  },
  'button[disabled]': {
    display: 'none'
  }
};
const adContainerStyle = {
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  '> iframe': {
    pointerEvents: 'auto'
  },
  button: {
    pointerEvents: 'auto'
  }
};

const ControlsBlock = ({
  order = 'mobile',
  playButton,
  rewindButton = '',
  forwardButton = '',
  previousEpisodeButton = '',
  nextEpisodeButton = ''
}) => order === 'desktop' ? jsxs(Fragment, {
  children: [previousEpisodeButton, playButton, nextEpisodeButton, rewindButton, forwardButton]
}) : jsxs(Fragment, {
  children: [rewindButton, previousEpisodeButton, playButton, nextEpisodeButton, forwardButton]
});

var _ref$4 = process.env.NODE_ENV === "production" ? {
  name: "11g4mt0",
  styles: "font-size:16px"
} : {
  name: "f6vg0o-DefaultLayout",
  styles: "font-size:16px;label:DefaultLayout;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa1RnQyIsImZpbGUiOiJEZWZhdWx0TGF5b3V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuaW1wb3J0IHt1c2VSZWZ9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtTbG90UHJvdmlkZXJ9IGZyb20gJy4vdWlFeHRlbnNpb25zJ1xuXG5jb25zdCBleHBhbmQgPSB7XG4gIG1hcmdpbjogMCxcbiAgZmxleDogJzEnLFxufVxuXG5jb25zdCBoaWRkZW4gPSB7ZGlzcGxheTogJ25vbmUnfVxuXG5jb25zdCBjb250YWluZXJTdHlsZSA9IHtcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGJveFNpemluZzogJ2JvcmRlci1ib3gnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICAvLyBwcmV2ZW50IGFuaW1hdGlvbiBnbGljaChhZnRlcmltYWdlKSBvZiBkZXNjZW5kYW50IGVsZW1lbnRzXG4gIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMCknLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGgxOiB7XG4gICAgbWFyZ2luOiAwLFxuICAgIGZvbnRTaXplOiAnMWVtJyxcbiAgICBsaW5lSGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnYSwgYTpsaW5rLCBhOnZpc2l0ZWQnOiB7XG4gICAgY29sb3I6ICcjZmZmJyxcbiAgICBvcGFjaXR5OiAwLjgsXG4gICAgdGV4dERlY29yYXRpb246ICdub25lJyxcbiAgfSxcbiAgYnV0dG9uOiB7XG4gICAgZm9udFNpemU6ICdpbmhlcml0JyxcbiAgICAnPiAqJzoge1xuICAgICAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IHZpZGVvQ29udGFpbmVyU3R5bGUgPSB7XG4gICc+IGRpdjpmaXJzdC1vZi10eXBlJzoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHpJbmRleDogJy0xJyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIGhlaWdodDogJzEwMCUnLFxuICB9LFxufVxuXG5jb25zdCBkcm9wID0ge1xuICBiYWNrZ3JvdW5kSW1hZ2U6IGBsaW5lYXItZ3JhZGllbnQoXG4gICAgMGRlZyxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMCxcbiAgICByZ2JhKDAsMCwwLDApIDhyZW0gY2FsYygxMDAlIC0gOHJlbSksXG4gICAgcmdiYSgwLDAsMCwwLjUpIDEwMCVcbiAgKWAsXG59XG5cbmNvbnN0IGRyb3BUb3AgPSB7XG4gIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChcbiAgICAwZGVnLFxuICAgIHJnYmEoMCwwLDAsMCkgMCxcbiAgICByZ2JhKDAsMCwwLDApIDhyZW0gY2FsYygxMDAlIC0gOHJlbSksXG4gICAgcmdiYSgwLDAsMCwwLjUpIDEwMCVcbiAgKWAsXG59XG5cbmNvbnN0IHJlc3BvbnNpdmVTdHlsZXMgPSB7XG4gIGRlc2t0b3A6IHtcbiAgICBmb250U2l6ZTogJzI0cHgnLFxuICB9LCAvLyBhZGQgaWYgbmVjZXNzYXJ5OiBiaWctZGVza3RvcFxufVxuXG5jb25zdCByb3dTdHlsZSA9IHtcbiAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIHdpZHRoOiAnMTAwJScsXG4gIHBhZGRpbmc6ICdjYWxjKDJlbSAtIDE2cHgpJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdmbGV4LWVuZCcsXG4gIGJ1dHRvbjoge1xuICAgIGZsZXg6ICcwIDAgMS41ZW0nLFxuICAgIHdpZHRoOiAnMS41ZW0nLFxuICAgIGhlaWdodDogJzEuNWVtJyxcbiAgfSxcbiAgJz4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIH4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCBkaXYgfiBidXR0b246bGFzdC1vZi10eXBlJzpcbiAgICB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMC41cmVtJyxcbiAgICB9LFxuICAnPiBidXR0b246bm90KDpsYXN0LW9mLXR5cGUpJzoge1xuICAgIG1hcmdpblJpZ2h0OiAnMC41cmVtJyxcbiAgfSxcbn1cblxuY29uc3QgZGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIHpJbmRleDogLTIsXG4gICAgICBvcGFjaXR5OiAwLFxuICAgICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC44cyBlYXNlLW91dCwgei1pbmRleCAwcyAwLjhzJyxcbiAgICB9LFxuICB9LFxuICBzaG93bjoge1xuICAgICc+IGRpdjpub3QoLnBpbm5lZCksID4gYnV0dG9uOm5vdCgucGlubmVkKSwgPiBoMTpub3QoLnBpbm5lZCknOiB7XG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjNzIGVhc2Utb3V0JyxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBjb250cm9sc0Rpc3BsYXlTdHlsZXMgPSB7XG4gIGhpZGRlbjoge1xuICAgIC4uLmRpc3BsYXlTdHlsZXMuaGlkZGVuLFxuICAgICd+IGRpdjpub3QoLnBpbm5lZCknOiBkaXNwbGF5U3R5bGVzLmhpZGRlbixcbiAgfSxcbiAgc2hvd246IHtcbiAgICAuLi5kaXNwbGF5U3R5bGVzLnNob3duLFxuICAgICd+IGRpdic6IGRpc3BsYXlTdHlsZXMuc2hvd24sXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzU3R5bGUgPSB7XG4gIG1hcmdpblRvcDogJ2F1dG8nLFxuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgekluZGV4OiAnMicsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICc+IGJ1dHRvbic6IHtcbiAgICBtYXJnaW46ICcxZW0nLFxuICAgIHdpZHRoOiAnMS43NWVtJyxcbiAgICBoZWlnaHQ6ICcxLjc1ZW0nLFxuICAgICcmOmRpc2FibGVkJzoge1xuICAgICAgb3BhY2l0eTogMC4zLFxuICAgIH0sXG4gICAgJyYucGxheS1idXR0b24nOiB7XG4gICAgICB3aWR0aDogJzNlbScsXG4gICAgICBoZWlnaHQ6ICczZW0nLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IHNsb3RTdHlsZSA9IHtcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBtYXJnaW5MZWZ0OiAnMC43NWVtJyxcbiAgYnV0dG9uOiB7XG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICBtYXJnaW5MZWZ0OiAnMC43NWVtJyxcbiAgfSxcbn1cblxuY29uc3QgdGV4dEVsbGlwc2lzID0ge1xuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICB0ZXh0T3ZlcmZsb3c6ICdlbGxpcHNpcycsXG59XG5cbmNvbnN0IGluZm9TdHlsZSA9IHtcbiAgYWxpZ25JdGVtczogJ2ZsZXgtc3RhcnQnLFxuICBvdmVyZmxvdzogJ3Zpc2libGUnLFxuICBoMToge1xuICAgIGhlaWdodDogJzNlbScsXG4gICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgLi4udGV4dEVsbGlwc2lzLFxuICAgICc+IGRpdic6IHRleHRFbGxpcHNpcyxcbiAgfSxcbiAgJ2J1dHRvbiArIGgxJzoge1xuICAgIG1hcmdpbkxlZnQ6ICcxZW0nLFxuICB9LFxufVxuXG5jb25zdCBiYWNrU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6IDAsXG4gIHdpZHRoOiAnMTAwJScsXG4gIGhlaWdodDogJzEwMCUnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICd+IConOiB7XG4gICAgekluZGV4OiAwLFxuICB9LFxufVxuXG5jb25zdCBza2lwU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICByaWdodDogMCxcbiAgYm90dG9tOiAnOXJlbScsXG4gIHRleHRBbGlnbjogJ3JpZ2h0JyxcbiAgYnV0dG9uOiB7XG4gICAgd2lkdGg6ICdhdXRvJyxcbiAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgfSxcbn1cblxuY29uc3QgZGVrc3RvcFN0eWxlID0ge1xuICAnPiBkaXYnOiB7XG4gICAgJz4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpIH4gYnV0dG9uOm5vdCg6ZGlzYWJsZWQpLCA+IGJ1dHRvbjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMC43NWVtJyxcbiAgICB9LFxuICAgICc+IGJ1dHRvbjpmaXJzdC1vZi10eXBlJzoge1xuICAgICAgbWFyZ2luTGVmdDogJzAnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGRlc2t0b3BDb250cm9scyA9IHtcbiAgZmxleFdyYXA6ICd3cmFwJyxcbiAgJz4gZGl2OmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgZmxleDogJzEwMCUnLFxuICAgIG1hcmdpbkJvdHRvbTogJzAuODhlbScsXG4gIH0sXG4gICdidXR0b25bZGlzYWJsZWRdJzoge1xuICAgIGRpc3BsYXk6ICdub25lJyxcbiAgfSxcbn1cblxuY29uc3QgYWRDb250YWluZXJTdHlsZSA9IHtcbiAgZmxleEdyb3c6IDEsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICAnPiBpZnJhbWUnOiB7cG9pbnRlckV2ZW50czogJ2F1dG8nfSxcbiAgYnV0dG9uOiB7cG9pbnRlckV2ZW50czogJ2F1dG8nfSxcbn1cblxuY29uc3QgQ29udHJvbHNCbG9jayA9ICh7XG4gIG9yZGVyID0gJ21vYmlsZScsXG4gIHBsYXlCdXR0b24sXG4gIHJld2luZEJ1dHRvbiA9ICcnLFxuICBmb3J3YXJkQnV0dG9uID0gJycsXG4gIHByZXZpb3VzRXBpc29kZUJ1dHRvbiA9ICcnLFxuICBuZXh0RXBpc29kZUJ1dHRvbiA9ICcnLFxufSkgPT5cbiAgb3JkZXIgPT09ICdkZXNrdG9wJyA/IChcbiAgICA8PlxuICAgICAge3ByZXZpb3VzRXBpc29kZUJ1dHRvbn1cbiAgICAgIHtwbGF5QnV0dG9ufVxuICAgICAge25leHRFcGlzb2RlQnV0dG9ufVxuICAgICAge3Jld2luZEJ1dHRvbn1cbiAgICAgIHtmb3J3YXJkQnV0dG9ufVxuICAgIDwvPlxuICApIDogKFxuICAgIDw+XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge3ByZXZpb3VzRXBpc29kZUJ1dHRvbn1cbiAgICAgIHtwbGF5QnV0dG9ufVxuICAgICAge25leHRFcGlzb2RlQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gIClcblxuY29uc3QgRGVmYXVsdExheW91dCA9ICh7XG4gIHR5cGUgPSAnbW9iaWxlJyxcbiAgc3R5bGUsXG4gIGRpc3BsYXksXG4gIGNvbnRyb2xzRGlzcGxheSA9IGRpc3BsYXksXG4gIHNpemUsXG4gIHRpdGxlID0gJycsXG4gIGNoYW5uZWxUaXRsZSA9ICcnLFxuICB2aWRlbyxcbiAgaGF2ZUJvdHRvbUl0ZW0sXG4gIHNlZWtiYXIgPSAnJyxcbiAgY29udHJvbEJ1dHRvbnMsXG4gIHZvbHVtZUNvbnRyb2wsXG4gIGZ1bGxzY3JlZW5CdXR0b24sXG4gIGJhY2tCdXR0b24gPSAnJyxcbiAgYWRTdGF0dXMgPSAnJyxcbiAgYWRMaW5rID0gJycsXG4gIGFkU2tpcEJ1dHRvbixcbiAgYmFja0l0ZW1zLFxuICBjaGlsZHJlbixcbiAgY29udGFpbmVyUmVmLFxuICBiYWNrUmVmLFxuICBhZENvbnRhaW5lclJlZixcbiAgLi4ucmVzdFxufSkgPT4ge1xuICBjb25zdCBzbG90UmVmID0gdXNlUmVmKHt9KVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY3NzPXtbXG4gICAgICAgIGNvbnRhaW5lclN0eWxlLFxuICAgICAgICB2aWRlb0NvbnRhaW5lclN0eWxlLFxuICAgICAgICByZXNwb25zaXZlU3R5bGVzW3NpemVdLFxuICAgICAgICB0eXBlID09PSAnZGVza3RvcCcgJiYgZGVrc3RvcFN0eWxlLFxuICAgICAgICBzdHlsZSxcbiAgICAgIF19XG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIHt2aWRlb31cbiAgICAgIDxkaXZcbiAgICAgICAgcmVmPXtiYWNrUmVmfVxuICAgICAgICBjc3M9e1tcbiAgICAgICAgICBiYWNrU3R5bGUsXG4gICAgICAgICAgZGlzcGxheSAhPT0gJ2hpZGRlbicgJiYgKGhhdmVCb3R0b21JdGVtID8gZHJvcFRvcCA6IGRyb3ApLFxuICAgICAgICBdfVxuICAgICAgPlxuICAgICAgICB7dHlwZSAhPT0gJ21vYmlsZScgJiYgYmFja0l0ZW1zfVxuICAgICAgICB7YWRTa2lwQnV0dG9uICYmIDxkaXYgY3NzPXtza2lwU3R5bGV9PnthZFNraXBCdXR0b259PC9kaXY+fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNzcz17W3Jvd1N0eWxlLCBpbmZvU3R5bGUsIGRpc3BsYXlTdHlsZXNbZGlzcGxheV1dfT5cbiAgICAgICAge2JhY2tCdXR0b259XG4gICAgICAgIDxoMT5cbiAgICAgICAgICB7dGl0bGV9XG4gICAgICAgICAge2NoYW5uZWxUaXRsZSAmJiA8ZGl2IGNzcz17e2ZvbnRTaXplOiAnMTZweCd9fT57Y2hhbm5lbFRpdGxlfTwvZGl2Pn1cbiAgICAgICAgPC9oMT5cbiAgICAgICAgPGRpdiBjc3M9e2V4cGFuZH0gLz5cbiAgICAgICAge3R5cGUgPT09ICdtb2JpbGUnICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjc3M9e2FkU3RhdHVzID8gaGlkZGVuIDogW3Nsb3RTdHlsZV19XG4gICAgICAgICAgICByZWY9e2VsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICBzbG90UmVmLmN1cnJlbnQuZnVuY3Rpb25CYXIgPSBlbGVtZW50XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICAgIHthZExpbmsgJiYgPGRpdiBjbGFzc05hbWU9XCJwaW5uZWRcIj57YWRMaW5rfTwvZGl2Pn1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiByZWY9e2FkQ29udGFpbmVyUmVmfSBjc3M9e2FkQ29udGFpbmVyU3R5bGV9PlxuICAgICAgICB7dHlwZSA9PT0gJ21vYmlsZScgJiYgKFxuICAgICAgICAgIDxkaXYgY3NzPXtbY29udHJvbHNTdHlsZSwgZGlzcGxheVN0eWxlc1tjb250cm9sc0Rpc3BsYXldXX0+XG4gICAgICAgICAgICA8Q29udHJvbHNCbG9jayBvcmRlcj1cIm1vYmlsZVwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjc3M9e1tcbiAgICAgICAgICByb3dTdHlsZSxcbiAgICAgICAgICB7bWFyZ2luVG9wOiAnYXV0byd9LFxuICAgICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZXNrdG9wQ29udHJvbHMsXG4gICAgICAgICAgY29udHJvbHNEaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV0sXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHtzZWVrYmFyIHx8IDxkaXYgLz59XG4gICAgICAgIHt0eXBlID09PSAnZGVza3RvcCcgJiYgKFxuICAgICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwiZGVza3RvcFwiIHsuLi5jb250cm9sQnV0dG9uc30gLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FkU3RhdHVzICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJwaW5uZWRcIlxuICAgICAgICAgICAgY3NzPXt7ZmxleDogMSwgdGV4dFNoYWRvdzogJzJweCAycHggMXB4ICMwMDAnfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7YWRTdGF0dXN9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIHt0eXBlID09PSAnZGVza3RvcCcgJiYgKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAgICAgICAge3ZvbHVtZUNvbnRyb2x9XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNzcz17YWRTdGF0dXMgPyBoaWRkZW4gOiBbc2xvdFN0eWxlXX1cbiAgICAgICAgICAgICAgcmVmPXtlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICBzbG90UmVmLmN1cnJlbnQuZnVuY3Rpb25CYXIgPSBlbGVtZW50XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvPlxuICAgICAgICApfVxuICAgICAgICB7ZnVsbHNjcmVlbkJ1dHRvbn1cbiAgICAgIDwvZGl2PlxuICAgICAgPFNsb3RQcm92aWRlciBzbG90UmVmPXtzbG90UmVmfT57Y2hpbGRyZW59PC9TbG90UHJvdmlkZXI+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRGVmYXVsdExheW91dFxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$4
};

var _ref2$2 = process.env.NODE_ENV === "production" ? {
  name: "1n8d5lm",
  styles: "flex:1;text-shadow:2px 2px 1px #000"
} : {
  name: "1iusnql-DefaultLayout",
  styles: "flex:1;text-shadow:2px 2px 1px #000;label:DefaultLayout;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcVZZIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQge3VzZVJlZn0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1Nsb3RQcm92aWRlcn0gZnJvbSAnLi91aUV4dGVuc2lvbnMnXG5cbmNvbnN0IGV4cGFuZCA9IHtcbiAgbWFyZ2luOiAwLFxuICBmbGV4OiAnMScsXG59XG5cbmNvbnN0IGhpZGRlbiA9IHtkaXNwbGF5OiAnbm9uZSd9XG5cbmNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgY29sb3I6ICd3aGl0ZScsXG4gIC8vIHByZXZlbnQgYW5pbWF0aW9uIGdsaWNoKGFmdGVyaW1hZ2UpIG9mIGRlc2NlbmRhbnQgZWxlbWVudHNcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgaDE6IHtcbiAgICBtYXJnaW46IDAsXG4gICAgZm9udFNpemU6ICcxZW0nLFxuICAgIGxpbmVIZWlnaHQ6ICcxLjVlbScsXG4gIH0sXG4gICdhLCBhOmxpbmssIGE6dmlzaXRlZCc6IHtcbiAgICBjb2xvcjogJyNmZmYnLFxuICAgIG9wYWNpdHk6IDAuOCxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICB9LFxuICBidXR0b246IHtcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICc+IConOiB7XG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgdmlkZW9Db250YWluZXJTdHlsZSA9IHtcbiAgJz4gZGl2OmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiAnLTEnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IGRyb3AgPSB7XG4gIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChcbiAgICAwZGVnLFxuICAgIHJnYmEoMCwwLDAsMC41KSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgZHJvcFRvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwKSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgcmVzcG9uc2l2ZVN0eWxlcyA9IHtcbiAgZGVza3RvcDoge1xuICAgIGZvbnRTaXplOiAnMjRweCcsXG4gIH0sIC8vIGFkZCBpZiBuZWNlc3Nhcnk6IGJpZy1kZXNrdG9wXG59XG5cbmNvbnN0IHJvd1N0eWxlID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJ2NhbGMoMmVtIC0gMTZweCknLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgYnV0dG9uOiB7XG4gICAgZmxleDogJzAgMCAxLjVlbScsXG4gICAgd2lkdGg6ICcxLjVlbScsXG4gICAgaGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGRpdiB+IGJ1dHRvbjpsYXN0LW9mLXR5cGUnOlxuICAgIHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICAgIH0sXG4gICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSknOiB7XG4gICAgbWFyZ2luUmlnaHQ6ICcwLjVyZW0nLFxuICB9LFxufVxuXG5jb25zdCBkaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgekluZGV4OiAtMixcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjhzIGVhc2Utb3V0LCB6LWluZGV4IDBzIDAuOHMnLFxuICAgIH0sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuM3MgZWFzZS1vdXQnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzRGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gICAgJ34gZGl2Om5vdCgucGlubmVkKSc6IGRpc3BsYXlTdHlsZXMuaGlkZGVuLFxuICB9LFxuICBzaG93bjoge1xuICAgIC4uLmRpc3BsYXlTdHlsZXMuc2hvd24sXG4gICAgJ34gZGl2JzogZGlzcGxheVN0eWxlcy5zaG93bixcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgbWFyZ2luVG9wOiAnYXV0bycsXG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICcyJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgJz4gYnV0dG9uJzoge1xuICAgIG1hcmdpbjogJzFlbScsXG4gICAgd2lkdGg6ICcxLjc1ZW0nLFxuICAgIGhlaWdodDogJzEuNzVlbScsXG4gICAgJyY6ZGlzYWJsZWQnOiB7XG4gICAgICBvcGFjaXR5OiAwLjMsXG4gICAgfSxcbiAgICAnJi5wbGF5LWJ1dHRvbic6IHtcbiAgICAgIHdpZHRoOiAnM2VtJyxcbiAgICAgIGhlaWdodDogJzNlbScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3Qgc2xvdFN0eWxlID0ge1xuICBkaXNwbGF5OiAnZmxleCcsXG4gIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICBidXR0b246IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxuICAnYnV0dG9uICsgaDEnOiB7XG4gICAgbWFyZ2luTGVmdDogJzFlbScsXG4gIH0sXG59XG5cbmNvbnN0IGJhY2tTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogMCxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgJ34gKic6IHtcbiAgICB6SW5kZXg6IDAsXG4gIH0sXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBhZENvbnRhaW5lclN0eWxlID0ge1xuICBmbGV4R3JvdzogMSxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICc+IGlmcmFtZSc6IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxuICBidXR0b246IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVsbHNjcmVlbkJ1dHRvbixcbiAgYmFja0J1dHRvbiA9ICcnLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIGFkQ29udGFpbmVyUmVmLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IHNsb3RSZWYgPSB1c2VSZWYoe30pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICAgIHZpZGVvQ29udGFpbmVyU3R5bGUsXG4gICAgICAgIHJlc3BvbnNpdmVTdHlsZXNbc2l6ZV0sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZWtzdG9wU3R5bGUsXG4gICAgICAgIHN0eWxlLFxuICAgICAgXX1cbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge3ZpZGVvfVxuICAgICAgPGRpdlxuICAgICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIGJhY2tTdHlsZSxcbiAgICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHt0eXBlICE9PSAnbW9iaWxlJyAmJiBiYWNrSXRlbXN9XG4gICAgICAgIHthZFNraXBCdXR0b24gJiYgPGRpdiBjc3M9e3NraXBTdHlsZX0+e2FkU2tpcEJ1dHRvbn08L2Rpdj59XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAgICB7YmFja0J1dHRvbn1cbiAgICAgICAgPGgxPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICB7Y2hhbm5lbFRpdGxlICYmIDxkaXYgY3NzPXt7Zm9udFNpemU6ICcxNnB4J319PntjaGFubmVsVGl0bGV9PC9kaXY+fVxuICAgICAgICA8L2gxPlxuICAgICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAgICB7dHlwZSA9PT0gJ21vYmlsZScgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNzcz17YWRTdGF0dXMgPyBoaWRkZW4gOiBbc2xvdFN0eWxlXX1cbiAgICAgICAgICAgIHJlZj17ZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FkTGluayAmJiA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiPnthZExpbmt9PC9kaXY+fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHJlZj17YWRDb250YWluZXJSZWZ9IGNzcz17YWRDb250YWluZXJTdHlsZX0+XG4gICAgICAgIHt0eXBlID09PSAnbW9iaWxlJyAmJiAoXG4gICAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwibW9iaWxlXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIHJvd1N0eWxlLFxuICAgICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRlc2t0b3BDb250cm9scyxcbiAgICAgICAgICBjb250cm9sc0Rpc3BsYXlTdHlsZXNbY29udHJvbHNEaXNwbGF5XSxcbiAgICAgICAgXX1cbiAgICAgID5cbiAgICAgICAge3NlZWtiYXIgfHwgPGRpdiAvPn1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPENvbnRyb2xzQmxvY2sgb3JkZXI9XCJkZXNrdG9wXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICApfVxuICAgICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInBpbm5lZFwiXG4gICAgICAgICAgICBjc3M9e3tmbGV4OiAxLCB0ZXh0U2hhZG93OiAnMnB4IDJweCAxcHggIzAwMCd9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtleHBhbmR9IC8+XG4gICAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY3NzPXthZFN0YXR1cyA/IGhpZGRlbiA6IFtzbG90U3R5bGVdfVxuICAgICAgICAgICAgICByZWY9e2VsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIHtmdWxsc2NyZWVuQnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgICA8U2xvdFByb3ZpZGVyIHNsb3RSZWY9e3Nsb3RSZWZ9PntjaGlsZHJlbn08L1Nsb3RQcm92aWRlcj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$4
};

const DefaultLayout = ({
  type = 'mobile',
  style,
  display,
  controlsDisplay = display,
  size,
  title = '',
  channelTitle = '',
  video,
  haveBottomItem,
  seekbar = '',
  controlButtons,
  volumeControl,
  fullscreenButton,
  backButton = '',
  adStatus = '',
  adLink = '',
  adSkipButton,
  backItems,
  children,
  containerRef,
  backRef,
  adContainerRef,
  ...rest
}) => {
  const slotRef = useRef({});
  return jsxs("div", {
    css: [containerStyle$1, videoContainerStyle, responsiveStyles[size], type === 'desktop' && dekstopStyle$1, style, process.env.NODE_ENV === "production" ? "" : ";label:DefaultLayout;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeVJNIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQge3VzZVJlZn0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1Nsb3RQcm92aWRlcn0gZnJvbSAnLi91aUV4dGVuc2lvbnMnXG5cbmNvbnN0IGV4cGFuZCA9IHtcbiAgbWFyZ2luOiAwLFxuICBmbGV4OiAnMScsXG59XG5cbmNvbnN0IGhpZGRlbiA9IHtkaXNwbGF5OiAnbm9uZSd9XG5cbmNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgY29sb3I6ICd3aGl0ZScsXG4gIC8vIHByZXZlbnQgYW5pbWF0aW9uIGdsaWNoKGFmdGVyaW1hZ2UpIG9mIGRlc2NlbmRhbnQgZWxlbWVudHNcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgaDE6IHtcbiAgICBtYXJnaW46IDAsXG4gICAgZm9udFNpemU6ICcxZW0nLFxuICAgIGxpbmVIZWlnaHQ6ICcxLjVlbScsXG4gIH0sXG4gICdhLCBhOmxpbmssIGE6dmlzaXRlZCc6IHtcbiAgICBjb2xvcjogJyNmZmYnLFxuICAgIG9wYWNpdHk6IDAuOCxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICB9LFxuICBidXR0b246IHtcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICc+IConOiB7XG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgdmlkZW9Db250YWluZXJTdHlsZSA9IHtcbiAgJz4gZGl2OmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiAnLTEnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IGRyb3AgPSB7XG4gIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChcbiAgICAwZGVnLFxuICAgIHJnYmEoMCwwLDAsMC41KSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgZHJvcFRvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwKSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgcmVzcG9uc2l2ZVN0eWxlcyA9IHtcbiAgZGVza3RvcDoge1xuICAgIGZvbnRTaXplOiAnMjRweCcsXG4gIH0sIC8vIGFkZCBpZiBuZWNlc3Nhcnk6IGJpZy1kZXNrdG9wXG59XG5cbmNvbnN0IHJvd1N0eWxlID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJ2NhbGMoMmVtIC0gMTZweCknLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgYnV0dG9uOiB7XG4gICAgZmxleDogJzAgMCAxLjVlbScsXG4gICAgd2lkdGg6ICcxLjVlbScsXG4gICAgaGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGRpdiB+IGJ1dHRvbjpsYXN0LW9mLXR5cGUnOlxuICAgIHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICAgIH0sXG4gICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSknOiB7XG4gICAgbWFyZ2luUmlnaHQ6ICcwLjVyZW0nLFxuICB9LFxufVxuXG5jb25zdCBkaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgekluZGV4OiAtMixcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjhzIGVhc2Utb3V0LCB6LWluZGV4IDBzIDAuOHMnLFxuICAgIH0sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuM3MgZWFzZS1vdXQnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzRGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gICAgJ34gZGl2Om5vdCgucGlubmVkKSc6IGRpc3BsYXlTdHlsZXMuaGlkZGVuLFxuICB9LFxuICBzaG93bjoge1xuICAgIC4uLmRpc3BsYXlTdHlsZXMuc2hvd24sXG4gICAgJ34gZGl2JzogZGlzcGxheVN0eWxlcy5zaG93bixcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgbWFyZ2luVG9wOiAnYXV0bycsXG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICcyJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgJz4gYnV0dG9uJzoge1xuICAgIG1hcmdpbjogJzFlbScsXG4gICAgd2lkdGg6ICcxLjc1ZW0nLFxuICAgIGhlaWdodDogJzEuNzVlbScsXG4gICAgJyY6ZGlzYWJsZWQnOiB7XG4gICAgICBvcGFjaXR5OiAwLjMsXG4gICAgfSxcbiAgICAnJi5wbGF5LWJ1dHRvbic6IHtcbiAgICAgIHdpZHRoOiAnM2VtJyxcbiAgICAgIGhlaWdodDogJzNlbScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3Qgc2xvdFN0eWxlID0ge1xuICBkaXNwbGF5OiAnZmxleCcsXG4gIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICBidXR0b246IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxuICAnYnV0dG9uICsgaDEnOiB7XG4gICAgbWFyZ2luTGVmdDogJzFlbScsXG4gIH0sXG59XG5cbmNvbnN0IGJhY2tTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogMCxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgJ34gKic6IHtcbiAgICB6SW5kZXg6IDAsXG4gIH0sXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBhZENvbnRhaW5lclN0eWxlID0ge1xuICBmbGV4R3JvdzogMSxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICc+IGlmcmFtZSc6IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxuICBidXR0b246IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVsbHNjcmVlbkJ1dHRvbixcbiAgYmFja0J1dHRvbiA9ICcnLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIGFkQ29udGFpbmVyUmVmLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IHNsb3RSZWYgPSB1c2VSZWYoe30pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICAgIHZpZGVvQ29udGFpbmVyU3R5bGUsXG4gICAgICAgIHJlc3BvbnNpdmVTdHlsZXNbc2l6ZV0sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZWtzdG9wU3R5bGUsXG4gICAgICAgIHN0eWxlLFxuICAgICAgXX1cbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge3ZpZGVvfVxuICAgICAgPGRpdlxuICAgICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIGJhY2tTdHlsZSxcbiAgICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHt0eXBlICE9PSAnbW9iaWxlJyAmJiBiYWNrSXRlbXN9XG4gICAgICAgIHthZFNraXBCdXR0b24gJiYgPGRpdiBjc3M9e3NraXBTdHlsZX0+e2FkU2tpcEJ1dHRvbn08L2Rpdj59XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAgICB7YmFja0J1dHRvbn1cbiAgICAgICAgPGgxPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICB7Y2hhbm5lbFRpdGxlICYmIDxkaXYgY3NzPXt7Zm9udFNpemU6ICcxNnB4J319PntjaGFubmVsVGl0bGV9PC9kaXY+fVxuICAgICAgICA8L2gxPlxuICAgICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAgICB7dHlwZSA9PT0gJ21vYmlsZScgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNzcz17YWRTdGF0dXMgPyBoaWRkZW4gOiBbc2xvdFN0eWxlXX1cbiAgICAgICAgICAgIHJlZj17ZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FkTGluayAmJiA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiPnthZExpbmt9PC9kaXY+fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHJlZj17YWRDb250YWluZXJSZWZ9IGNzcz17YWRDb250YWluZXJTdHlsZX0+XG4gICAgICAgIHt0eXBlID09PSAnbW9iaWxlJyAmJiAoXG4gICAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwibW9iaWxlXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIHJvd1N0eWxlLFxuICAgICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRlc2t0b3BDb250cm9scyxcbiAgICAgICAgICBjb250cm9sc0Rpc3BsYXlTdHlsZXNbY29udHJvbHNEaXNwbGF5XSxcbiAgICAgICAgXX1cbiAgICAgID5cbiAgICAgICAge3NlZWtiYXIgfHwgPGRpdiAvPn1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPENvbnRyb2xzQmxvY2sgb3JkZXI9XCJkZXNrdG9wXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICApfVxuICAgICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInBpbm5lZFwiXG4gICAgICAgICAgICBjc3M9e3tmbGV4OiAxLCB0ZXh0U2hhZG93OiAnMnB4IDJweCAxcHggIzAwMCd9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtleHBhbmR9IC8+XG4gICAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY3NzPXthZFN0YXR1cyA/IGhpZGRlbiA6IFtzbG90U3R5bGVdfVxuICAgICAgICAgICAgICByZWY9e2VsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIHtmdWxsc2NyZWVuQnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgICA8U2xvdFByb3ZpZGVyIHNsb3RSZWY9e3Nsb3RSZWZ9PntjaGlsZHJlbn08L1Nsb3RQcm92aWRlcj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */"],
    ref: containerRef,
    ...rest,
    children: [video, jsxs("div", {
      ref: backRef,
      css: [backStyle, display !== 'hidden' && (haveBottomItem ? dropTop : drop), process.env.NODE_ENV === "production" ? "" : ";label:DefaultLayout;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc1NRIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQge3VzZVJlZn0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1Nsb3RQcm92aWRlcn0gZnJvbSAnLi91aUV4dGVuc2lvbnMnXG5cbmNvbnN0IGV4cGFuZCA9IHtcbiAgbWFyZ2luOiAwLFxuICBmbGV4OiAnMScsXG59XG5cbmNvbnN0IGhpZGRlbiA9IHtkaXNwbGF5OiAnbm9uZSd9XG5cbmNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgY29sb3I6ICd3aGl0ZScsXG4gIC8vIHByZXZlbnQgYW5pbWF0aW9uIGdsaWNoKGFmdGVyaW1hZ2UpIG9mIGRlc2NlbmRhbnQgZWxlbWVudHNcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgaDE6IHtcbiAgICBtYXJnaW46IDAsXG4gICAgZm9udFNpemU6ICcxZW0nLFxuICAgIGxpbmVIZWlnaHQ6ICcxLjVlbScsXG4gIH0sXG4gICdhLCBhOmxpbmssIGE6dmlzaXRlZCc6IHtcbiAgICBjb2xvcjogJyNmZmYnLFxuICAgIG9wYWNpdHk6IDAuOCxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICB9LFxuICBidXR0b246IHtcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICc+IConOiB7XG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgdmlkZW9Db250YWluZXJTdHlsZSA9IHtcbiAgJz4gZGl2OmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiAnLTEnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IGRyb3AgPSB7XG4gIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChcbiAgICAwZGVnLFxuICAgIHJnYmEoMCwwLDAsMC41KSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgZHJvcFRvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwKSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgcmVzcG9uc2l2ZVN0eWxlcyA9IHtcbiAgZGVza3RvcDoge1xuICAgIGZvbnRTaXplOiAnMjRweCcsXG4gIH0sIC8vIGFkZCBpZiBuZWNlc3Nhcnk6IGJpZy1kZXNrdG9wXG59XG5cbmNvbnN0IHJvd1N0eWxlID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJ2NhbGMoMmVtIC0gMTZweCknLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgYnV0dG9uOiB7XG4gICAgZmxleDogJzAgMCAxLjVlbScsXG4gICAgd2lkdGg6ICcxLjVlbScsXG4gICAgaGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGRpdiB+IGJ1dHRvbjpsYXN0LW9mLXR5cGUnOlxuICAgIHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICAgIH0sXG4gICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSknOiB7XG4gICAgbWFyZ2luUmlnaHQ6ICcwLjVyZW0nLFxuICB9LFxufVxuXG5jb25zdCBkaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgekluZGV4OiAtMixcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjhzIGVhc2Utb3V0LCB6LWluZGV4IDBzIDAuOHMnLFxuICAgIH0sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuM3MgZWFzZS1vdXQnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzRGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gICAgJ34gZGl2Om5vdCgucGlubmVkKSc6IGRpc3BsYXlTdHlsZXMuaGlkZGVuLFxuICB9LFxuICBzaG93bjoge1xuICAgIC4uLmRpc3BsYXlTdHlsZXMuc2hvd24sXG4gICAgJ34gZGl2JzogZGlzcGxheVN0eWxlcy5zaG93bixcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgbWFyZ2luVG9wOiAnYXV0bycsXG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICcyJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgJz4gYnV0dG9uJzoge1xuICAgIG1hcmdpbjogJzFlbScsXG4gICAgd2lkdGg6ICcxLjc1ZW0nLFxuICAgIGhlaWdodDogJzEuNzVlbScsXG4gICAgJyY6ZGlzYWJsZWQnOiB7XG4gICAgICBvcGFjaXR5OiAwLjMsXG4gICAgfSxcbiAgICAnJi5wbGF5LWJ1dHRvbic6IHtcbiAgICAgIHdpZHRoOiAnM2VtJyxcbiAgICAgIGhlaWdodDogJzNlbScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3Qgc2xvdFN0eWxlID0ge1xuICBkaXNwbGF5OiAnZmxleCcsXG4gIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICBidXR0b246IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxuICAnYnV0dG9uICsgaDEnOiB7XG4gICAgbWFyZ2luTGVmdDogJzFlbScsXG4gIH0sXG59XG5cbmNvbnN0IGJhY2tTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogMCxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgJ34gKic6IHtcbiAgICB6SW5kZXg6IDAsXG4gIH0sXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBhZENvbnRhaW5lclN0eWxlID0ge1xuICBmbGV4R3JvdzogMSxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICc+IGlmcmFtZSc6IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxuICBidXR0b246IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVsbHNjcmVlbkJ1dHRvbixcbiAgYmFja0J1dHRvbiA9ICcnLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIGFkQ29udGFpbmVyUmVmLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IHNsb3RSZWYgPSB1c2VSZWYoe30pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICAgIHZpZGVvQ29udGFpbmVyU3R5bGUsXG4gICAgICAgIHJlc3BvbnNpdmVTdHlsZXNbc2l6ZV0sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZWtzdG9wU3R5bGUsXG4gICAgICAgIHN0eWxlLFxuICAgICAgXX1cbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge3ZpZGVvfVxuICAgICAgPGRpdlxuICAgICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIGJhY2tTdHlsZSxcbiAgICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHt0eXBlICE9PSAnbW9iaWxlJyAmJiBiYWNrSXRlbXN9XG4gICAgICAgIHthZFNraXBCdXR0b24gJiYgPGRpdiBjc3M9e3NraXBTdHlsZX0+e2FkU2tpcEJ1dHRvbn08L2Rpdj59XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAgICB7YmFja0J1dHRvbn1cbiAgICAgICAgPGgxPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICB7Y2hhbm5lbFRpdGxlICYmIDxkaXYgY3NzPXt7Zm9udFNpemU6ICcxNnB4J319PntjaGFubmVsVGl0bGV9PC9kaXY+fVxuICAgICAgICA8L2gxPlxuICAgICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAgICB7dHlwZSA9PT0gJ21vYmlsZScgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNzcz17YWRTdGF0dXMgPyBoaWRkZW4gOiBbc2xvdFN0eWxlXX1cbiAgICAgICAgICAgIHJlZj17ZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FkTGluayAmJiA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiPnthZExpbmt9PC9kaXY+fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHJlZj17YWRDb250YWluZXJSZWZ9IGNzcz17YWRDb250YWluZXJTdHlsZX0+XG4gICAgICAgIHt0eXBlID09PSAnbW9iaWxlJyAmJiAoXG4gICAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwibW9iaWxlXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIHJvd1N0eWxlLFxuICAgICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRlc2t0b3BDb250cm9scyxcbiAgICAgICAgICBjb250cm9sc0Rpc3BsYXlTdHlsZXNbY29udHJvbHNEaXNwbGF5XSxcbiAgICAgICAgXX1cbiAgICAgID5cbiAgICAgICAge3NlZWtiYXIgfHwgPGRpdiAvPn1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPENvbnRyb2xzQmxvY2sgb3JkZXI9XCJkZXNrdG9wXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICApfVxuICAgICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInBpbm5lZFwiXG4gICAgICAgICAgICBjc3M9e3tmbGV4OiAxLCB0ZXh0U2hhZG93OiAnMnB4IDJweCAxcHggIzAwMCd9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtleHBhbmR9IC8+XG4gICAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY3NzPXthZFN0YXR1cyA/IGhpZGRlbiA6IFtzbG90U3R5bGVdfVxuICAgICAgICAgICAgICByZWY9e2VsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIHtmdWxsc2NyZWVuQnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgICA8U2xvdFByb3ZpZGVyIHNsb3RSZWY9e3Nsb3RSZWZ9PntjaGlsZHJlbn08L1Nsb3RQcm92aWRlcj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */"],
      children: [type !== 'mobile' && backItems, adSkipButton && jsx$1("div", {
        css: skipStyle,
        children: adSkipButton
      })]
    }), jsxs("div", {
      css: [rowStyle, infoStyle, displayStyles[display], process.env.NODE_ENV === "production" ? "" : ";label:DefaultLayout;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOFNXIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQge3VzZVJlZn0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1Nsb3RQcm92aWRlcn0gZnJvbSAnLi91aUV4dGVuc2lvbnMnXG5cbmNvbnN0IGV4cGFuZCA9IHtcbiAgbWFyZ2luOiAwLFxuICBmbGV4OiAnMScsXG59XG5cbmNvbnN0IGhpZGRlbiA9IHtkaXNwbGF5OiAnbm9uZSd9XG5cbmNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgY29sb3I6ICd3aGl0ZScsXG4gIC8vIHByZXZlbnQgYW5pbWF0aW9uIGdsaWNoKGFmdGVyaW1hZ2UpIG9mIGRlc2NlbmRhbnQgZWxlbWVudHNcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgaDE6IHtcbiAgICBtYXJnaW46IDAsXG4gICAgZm9udFNpemU6ICcxZW0nLFxuICAgIGxpbmVIZWlnaHQ6ICcxLjVlbScsXG4gIH0sXG4gICdhLCBhOmxpbmssIGE6dmlzaXRlZCc6IHtcbiAgICBjb2xvcjogJyNmZmYnLFxuICAgIG9wYWNpdHk6IDAuOCxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICB9LFxuICBidXR0b246IHtcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICc+IConOiB7XG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgdmlkZW9Db250YWluZXJTdHlsZSA9IHtcbiAgJz4gZGl2OmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiAnLTEnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IGRyb3AgPSB7XG4gIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChcbiAgICAwZGVnLFxuICAgIHJnYmEoMCwwLDAsMC41KSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgZHJvcFRvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwKSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgcmVzcG9uc2l2ZVN0eWxlcyA9IHtcbiAgZGVza3RvcDoge1xuICAgIGZvbnRTaXplOiAnMjRweCcsXG4gIH0sIC8vIGFkZCBpZiBuZWNlc3Nhcnk6IGJpZy1kZXNrdG9wXG59XG5cbmNvbnN0IHJvd1N0eWxlID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJ2NhbGMoMmVtIC0gMTZweCknLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgYnV0dG9uOiB7XG4gICAgZmxleDogJzAgMCAxLjVlbScsXG4gICAgd2lkdGg6ICcxLjVlbScsXG4gICAgaGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGRpdiB+IGJ1dHRvbjpsYXN0LW9mLXR5cGUnOlxuICAgIHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICAgIH0sXG4gICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSknOiB7XG4gICAgbWFyZ2luUmlnaHQ6ICcwLjVyZW0nLFxuICB9LFxufVxuXG5jb25zdCBkaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgekluZGV4OiAtMixcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjhzIGVhc2Utb3V0LCB6LWluZGV4IDBzIDAuOHMnLFxuICAgIH0sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuM3MgZWFzZS1vdXQnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzRGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gICAgJ34gZGl2Om5vdCgucGlubmVkKSc6IGRpc3BsYXlTdHlsZXMuaGlkZGVuLFxuICB9LFxuICBzaG93bjoge1xuICAgIC4uLmRpc3BsYXlTdHlsZXMuc2hvd24sXG4gICAgJ34gZGl2JzogZGlzcGxheVN0eWxlcy5zaG93bixcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgbWFyZ2luVG9wOiAnYXV0bycsXG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICcyJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgJz4gYnV0dG9uJzoge1xuICAgIG1hcmdpbjogJzFlbScsXG4gICAgd2lkdGg6ICcxLjc1ZW0nLFxuICAgIGhlaWdodDogJzEuNzVlbScsXG4gICAgJyY6ZGlzYWJsZWQnOiB7XG4gICAgICBvcGFjaXR5OiAwLjMsXG4gICAgfSxcbiAgICAnJi5wbGF5LWJ1dHRvbic6IHtcbiAgICAgIHdpZHRoOiAnM2VtJyxcbiAgICAgIGhlaWdodDogJzNlbScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3Qgc2xvdFN0eWxlID0ge1xuICBkaXNwbGF5OiAnZmxleCcsXG4gIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICBidXR0b246IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxuICAnYnV0dG9uICsgaDEnOiB7XG4gICAgbWFyZ2luTGVmdDogJzFlbScsXG4gIH0sXG59XG5cbmNvbnN0IGJhY2tTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogMCxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgJ34gKic6IHtcbiAgICB6SW5kZXg6IDAsXG4gIH0sXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBhZENvbnRhaW5lclN0eWxlID0ge1xuICBmbGV4R3JvdzogMSxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICc+IGlmcmFtZSc6IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxuICBidXR0b246IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVsbHNjcmVlbkJ1dHRvbixcbiAgYmFja0J1dHRvbiA9ICcnLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIGFkQ29udGFpbmVyUmVmLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IHNsb3RSZWYgPSB1c2VSZWYoe30pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICAgIHZpZGVvQ29udGFpbmVyU3R5bGUsXG4gICAgICAgIHJlc3BvbnNpdmVTdHlsZXNbc2l6ZV0sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZWtzdG9wU3R5bGUsXG4gICAgICAgIHN0eWxlLFxuICAgICAgXX1cbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge3ZpZGVvfVxuICAgICAgPGRpdlxuICAgICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIGJhY2tTdHlsZSxcbiAgICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHt0eXBlICE9PSAnbW9iaWxlJyAmJiBiYWNrSXRlbXN9XG4gICAgICAgIHthZFNraXBCdXR0b24gJiYgPGRpdiBjc3M9e3NraXBTdHlsZX0+e2FkU2tpcEJ1dHRvbn08L2Rpdj59XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAgICB7YmFja0J1dHRvbn1cbiAgICAgICAgPGgxPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICB7Y2hhbm5lbFRpdGxlICYmIDxkaXYgY3NzPXt7Zm9udFNpemU6ICcxNnB4J319PntjaGFubmVsVGl0bGV9PC9kaXY+fVxuICAgICAgICA8L2gxPlxuICAgICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAgICB7dHlwZSA9PT0gJ21vYmlsZScgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNzcz17YWRTdGF0dXMgPyBoaWRkZW4gOiBbc2xvdFN0eWxlXX1cbiAgICAgICAgICAgIHJlZj17ZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FkTGluayAmJiA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiPnthZExpbmt9PC9kaXY+fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHJlZj17YWRDb250YWluZXJSZWZ9IGNzcz17YWRDb250YWluZXJTdHlsZX0+XG4gICAgICAgIHt0eXBlID09PSAnbW9iaWxlJyAmJiAoXG4gICAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwibW9iaWxlXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIHJvd1N0eWxlLFxuICAgICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRlc2t0b3BDb250cm9scyxcbiAgICAgICAgICBjb250cm9sc0Rpc3BsYXlTdHlsZXNbY29udHJvbHNEaXNwbGF5XSxcbiAgICAgICAgXX1cbiAgICAgID5cbiAgICAgICAge3NlZWtiYXIgfHwgPGRpdiAvPn1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPENvbnRyb2xzQmxvY2sgb3JkZXI9XCJkZXNrdG9wXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICApfVxuICAgICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInBpbm5lZFwiXG4gICAgICAgICAgICBjc3M9e3tmbGV4OiAxLCB0ZXh0U2hhZG93OiAnMnB4IDJweCAxcHggIzAwMCd9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtleHBhbmR9IC8+XG4gICAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY3NzPXthZFN0YXR1cyA/IGhpZGRlbiA6IFtzbG90U3R5bGVdfVxuICAgICAgICAgICAgICByZWY9e2VsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIHtmdWxsc2NyZWVuQnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgICA8U2xvdFByb3ZpZGVyIHNsb3RSZWY9e3Nsb3RSZWZ9PntjaGlsZHJlbn08L1Nsb3RQcm92aWRlcj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */"],
      children: [backButton, jsxs("h1", {
        children: [title, channelTitle && jsx$1("div", {
          css: _ref$4,
          children: channelTitle
        })]
      }), jsx$1("div", {
        css: expand
      }), type === 'mobile' && jsx$1("div", {
        css: adStatus ? hidden : [slotStyle],
        ref: element => {
          slotRef.current.functionBar = element;
        }
      }), adLink && jsx$1("div", {
        className: "pinned",
        children: adLink
      })]
    }), jsx$1("div", {
      ref: adContainerRef,
      css: adContainerStyle,
      children: type === 'mobile' && jsx$1("div", {
        css: [controlsStyle, displayStyles[controlsDisplay], process.env.NODE_ENV === "production" ? "" : ";label:DefaultLayout;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaVVlIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQge3VzZVJlZn0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1Nsb3RQcm92aWRlcn0gZnJvbSAnLi91aUV4dGVuc2lvbnMnXG5cbmNvbnN0IGV4cGFuZCA9IHtcbiAgbWFyZ2luOiAwLFxuICBmbGV4OiAnMScsXG59XG5cbmNvbnN0IGhpZGRlbiA9IHtkaXNwbGF5OiAnbm9uZSd9XG5cbmNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgY29sb3I6ICd3aGl0ZScsXG4gIC8vIHByZXZlbnQgYW5pbWF0aW9uIGdsaWNoKGFmdGVyaW1hZ2UpIG9mIGRlc2NlbmRhbnQgZWxlbWVudHNcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgaDE6IHtcbiAgICBtYXJnaW46IDAsXG4gICAgZm9udFNpemU6ICcxZW0nLFxuICAgIGxpbmVIZWlnaHQ6ICcxLjVlbScsXG4gIH0sXG4gICdhLCBhOmxpbmssIGE6dmlzaXRlZCc6IHtcbiAgICBjb2xvcjogJyNmZmYnLFxuICAgIG9wYWNpdHk6IDAuOCxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICB9LFxuICBidXR0b246IHtcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICc+IConOiB7XG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgdmlkZW9Db250YWluZXJTdHlsZSA9IHtcbiAgJz4gZGl2OmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiAnLTEnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IGRyb3AgPSB7XG4gIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChcbiAgICAwZGVnLFxuICAgIHJnYmEoMCwwLDAsMC41KSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgZHJvcFRvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwKSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgcmVzcG9uc2l2ZVN0eWxlcyA9IHtcbiAgZGVza3RvcDoge1xuICAgIGZvbnRTaXplOiAnMjRweCcsXG4gIH0sIC8vIGFkZCBpZiBuZWNlc3Nhcnk6IGJpZy1kZXNrdG9wXG59XG5cbmNvbnN0IHJvd1N0eWxlID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJ2NhbGMoMmVtIC0gMTZweCknLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgYnV0dG9uOiB7XG4gICAgZmxleDogJzAgMCAxLjVlbScsXG4gICAgd2lkdGg6ICcxLjVlbScsXG4gICAgaGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGRpdiB+IGJ1dHRvbjpsYXN0LW9mLXR5cGUnOlxuICAgIHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICAgIH0sXG4gICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSknOiB7XG4gICAgbWFyZ2luUmlnaHQ6ICcwLjVyZW0nLFxuICB9LFxufVxuXG5jb25zdCBkaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgekluZGV4OiAtMixcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjhzIGVhc2Utb3V0LCB6LWluZGV4IDBzIDAuOHMnLFxuICAgIH0sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuM3MgZWFzZS1vdXQnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzRGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gICAgJ34gZGl2Om5vdCgucGlubmVkKSc6IGRpc3BsYXlTdHlsZXMuaGlkZGVuLFxuICB9LFxuICBzaG93bjoge1xuICAgIC4uLmRpc3BsYXlTdHlsZXMuc2hvd24sXG4gICAgJ34gZGl2JzogZGlzcGxheVN0eWxlcy5zaG93bixcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgbWFyZ2luVG9wOiAnYXV0bycsXG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICcyJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgJz4gYnV0dG9uJzoge1xuICAgIG1hcmdpbjogJzFlbScsXG4gICAgd2lkdGg6ICcxLjc1ZW0nLFxuICAgIGhlaWdodDogJzEuNzVlbScsXG4gICAgJyY6ZGlzYWJsZWQnOiB7XG4gICAgICBvcGFjaXR5OiAwLjMsXG4gICAgfSxcbiAgICAnJi5wbGF5LWJ1dHRvbic6IHtcbiAgICAgIHdpZHRoOiAnM2VtJyxcbiAgICAgIGhlaWdodDogJzNlbScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3Qgc2xvdFN0eWxlID0ge1xuICBkaXNwbGF5OiAnZmxleCcsXG4gIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICBidXR0b246IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxuICAnYnV0dG9uICsgaDEnOiB7XG4gICAgbWFyZ2luTGVmdDogJzFlbScsXG4gIH0sXG59XG5cbmNvbnN0IGJhY2tTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogMCxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgJ34gKic6IHtcbiAgICB6SW5kZXg6IDAsXG4gIH0sXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBhZENvbnRhaW5lclN0eWxlID0ge1xuICBmbGV4R3JvdzogMSxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICc+IGlmcmFtZSc6IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxuICBidXR0b246IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVsbHNjcmVlbkJ1dHRvbixcbiAgYmFja0J1dHRvbiA9ICcnLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIGFkQ29udGFpbmVyUmVmLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IHNsb3RSZWYgPSB1c2VSZWYoe30pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICAgIHZpZGVvQ29udGFpbmVyU3R5bGUsXG4gICAgICAgIHJlc3BvbnNpdmVTdHlsZXNbc2l6ZV0sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZWtzdG9wU3R5bGUsXG4gICAgICAgIHN0eWxlLFxuICAgICAgXX1cbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge3ZpZGVvfVxuICAgICAgPGRpdlxuICAgICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIGJhY2tTdHlsZSxcbiAgICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHt0eXBlICE9PSAnbW9iaWxlJyAmJiBiYWNrSXRlbXN9XG4gICAgICAgIHthZFNraXBCdXR0b24gJiYgPGRpdiBjc3M9e3NraXBTdHlsZX0+e2FkU2tpcEJ1dHRvbn08L2Rpdj59XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAgICB7YmFja0J1dHRvbn1cbiAgICAgICAgPGgxPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICB7Y2hhbm5lbFRpdGxlICYmIDxkaXYgY3NzPXt7Zm9udFNpemU6ICcxNnB4J319PntjaGFubmVsVGl0bGV9PC9kaXY+fVxuICAgICAgICA8L2gxPlxuICAgICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAgICB7dHlwZSA9PT0gJ21vYmlsZScgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNzcz17YWRTdGF0dXMgPyBoaWRkZW4gOiBbc2xvdFN0eWxlXX1cbiAgICAgICAgICAgIHJlZj17ZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FkTGluayAmJiA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiPnthZExpbmt9PC9kaXY+fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHJlZj17YWRDb250YWluZXJSZWZ9IGNzcz17YWRDb250YWluZXJTdHlsZX0+XG4gICAgICAgIHt0eXBlID09PSAnbW9iaWxlJyAmJiAoXG4gICAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwibW9iaWxlXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIHJvd1N0eWxlLFxuICAgICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRlc2t0b3BDb250cm9scyxcbiAgICAgICAgICBjb250cm9sc0Rpc3BsYXlTdHlsZXNbY29udHJvbHNEaXNwbGF5XSxcbiAgICAgICAgXX1cbiAgICAgID5cbiAgICAgICAge3NlZWtiYXIgfHwgPGRpdiAvPn1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPENvbnRyb2xzQmxvY2sgb3JkZXI9XCJkZXNrdG9wXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICApfVxuICAgICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInBpbm5lZFwiXG4gICAgICAgICAgICBjc3M9e3tmbGV4OiAxLCB0ZXh0U2hhZG93OiAnMnB4IDJweCAxcHggIzAwMCd9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtleHBhbmR9IC8+XG4gICAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY3NzPXthZFN0YXR1cyA/IGhpZGRlbiA6IFtzbG90U3R5bGVdfVxuICAgICAgICAgICAgICByZWY9e2VsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIHtmdWxsc2NyZWVuQnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgICA8U2xvdFByb3ZpZGVyIHNsb3RSZWY9e3Nsb3RSZWZ9PntjaGlsZHJlbn08L1Nsb3RQcm92aWRlcj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */"],
        children: jsx$1(ControlsBlock, {
          order: "mobile",
          ...controlButtons
        })
      })
    }), jsxs("div", {
      css: [rowStyle, "margin-top:auto;", type === 'desktop' && desktopControls, controlsDisplayStyles[controlsDisplay], process.env.NODE_ENV === "production" ? "" : ";label:DefaultLayout;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRlZmF1bHRMYXlvdXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdVVRIiwiZmlsZSI6IkRlZmF1bHRMYXlvdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG4vKiBlc2xpbnQtZGlzYWJsZSByZWFjdC9wcm9wLXR5cGVzICovXG5pbXBvcnQge3VzZVJlZn0gZnJvbSAncmVhY3QnXG5pbXBvcnQge1Nsb3RQcm92aWRlcn0gZnJvbSAnLi91aUV4dGVuc2lvbnMnXG5cbmNvbnN0IGV4cGFuZCA9IHtcbiAgbWFyZ2luOiAwLFxuICBmbGV4OiAnMScsXG59XG5cbmNvbnN0IGhpZGRlbiA9IHtkaXNwbGF5OiAnbm9uZSd9XG5cbmNvbnN0IGNvbnRhaW5lclN0eWxlID0ge1xuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDAlJyxcbiAgYm94U2l6aW5nOiAnYm9yZGVyLWJveCcsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgZmxleERpcmVjdGlvbjogJ2NvbHVtbicsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgY29sb3I6ICd3aGl0ZScsXG4gIC8vIHByZXZlbnQgYW5pbWF0aW9uIGdsaWNoKGFmdGVyaW1hZ2UpIG9mIGRlc2NlbmRhbnQgZWxlbWVudHNcbiAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCgwKScsXG4gIHVzZXJTZWxlY3Q6ICdub25lJyxcbiAgaDE6IHtcbiAgICBtYXJnaW46IDAsXG4gICAgZm9udFNpemU6ICcxZW0nLFxuICAgIGxpbmVIZWlnaHQ6ICcxLjVlbScsXG4gIH0sXG4gICdhLCBhOmxpbmssIGE6dmlzaXRlZCc6IHtcbiAgICBjb2xvcjogJyNmZmYnLFxuICAgIG9wYWNpdHk6IDAuOCxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLFxuICB9LFxuICBidXR0b246IHtcbiAgICBmb250U2l6ZTogJ2luaGVyaXQnLFxuICAgICc+IConOiB7XG4gICAgICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgdmlkZW9Db250YWluZXJTdHlsZSA9IHtcbiAgJz4gZGl2OmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgekluZGV4OiAnLTEnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IGRyb3AgPSB7XG4gIGJhY2tncm91bmRJbWFnZTogYGxpbmVhci1ncmFkaWVudChcbiAgICAwZGVnLFxuICAgIHJnYmEoMCwwLDAsMC41KSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgZHJvcFRvcCA9IHtcbiAgYmFja2dyb3VuZEltYWdlOiBgbGluZWFyLWdyYWRpZW50KFxuICAgIDBkZWcsXG4gICAgcmdiYSgwLDAsMCwwKSAwLFxuICAgIHJnYmEoMCwwLDAsMCkgOHJlbSBjYWxjKDEwMCUgLSA4cmVtKSxcbiAgICByZ2JhKDAsMCwwLDAuNSkgMTAwJVxuICApYCxcbn1cblxuY29uc3QgcmVzcG9uc2l2ZVN0eWxlcyA9IHtcbiAgZGVza3RvcDoge1xuICAgIGZvbnRTaXplOiAnMjRweCcsXG4gIH0sIC8vIGFkZCBpZiBuZWNlc3Nhcnk6IGJpZy1kZXNrdG9wXG59XG5cbmNvbnN0IHJvd1N0eWxlID0ge1xuICBib3hTaXppbmc6ICdib3JkZXItYm94JyxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgcGFkZGluZzogJ2NhbGMoMmVtIC0gMTZweCknLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBqdXN0aWZ5Q29udGVudDogJ2ZsZXgtZW5kJyxcbiAgYnV0dG9uOiB7XG4gICAgZmxleDogJzAgMCAxLjVlbScsXG4gICAgd2lkdGg6ICcxLjVlbScsXG4gICAgaGVpZ2h0OiAnMS41ZW0nLFxuICB9LFxuICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksIGRpdiB+IGJ1dHRvbjpsYXN0LW9mLXR5cGUnOlxuICAgIHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjVyZW0nLFxuICAgIH0sXG4gICc+IGJ1dHRvbjpub3QoOmxhc3Qtb2YtdHlwZSknOiB7XG4gICAgbWFyZ2luUmlnaHQ6ICcwLjVyZW0nLFxuICB9LFxufVxuXG5jb25zdCBkaXNwbGF5U3R5bGVzID0ge1xuICBoaWRkZW46IHtcbiAgICAnPiBkaXY6bm90KC5waW5uZWQpLCA+IGJ1dHRvbjpub3QoLnBpbm5lZCksID4gaDE6bm90KC5waW5uZWQpJzoge1xuICAgICAgekluZGV4OiAtMixcbiAgICAgIG9wYWNpdHk6IDAsXG4gICAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjhzIGVhc2Utb3V0LCB6LWluZGV4IDBzIDAuOHMnLFxuICAgIH0sXG4gIH0sXG4gIHNob3duOiB7XG4gICAgJz4gZGl2Om5vdCgucGlubmVkKSwgPiBidXR0b246bm90KC5waW5uZWQpLCA+IGgxOm5vdCgucGlubmVkKSc6IHtcbiAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuM3MgZWFzZS1vdXQnLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbnRyb2xzRGlzcGxheVN0eWxlcyA9IHtcbiAgaGlkZGVuOiB7XG4gICAgLi4uZGlzcGxheVN0eWxlcy5oaWRkZW4sXG4gICAgJ34gZGl2Om5vdCgucGlubmVkKSc6IGRpc3BsYXlTdHlsZXMuaGlkZGVuLFxuICB9LFxuICBzaG93bjoge1xuICAgIC4uLmRpc3BsYXlTdHlsZXMuc2hvd24sXG4gICAgJ34gZGl2JzogZGlzcGxheVN0eWxlcy5zaG93bixcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbHNTdHlsZSA9IHtcbiAgbWFyZ2luVG9wOiAnYXV0bycsXG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6ICcyJyxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgJz4gYnV0dG9uJzoge1xuICAgIG1hcmdpbjogJzFlbScsXG4gICAgd2lkdGg6ICcxLjc1ZW0nLFxuICAgIGhlaWdodDogJzEuNzVlbScsXG4gICAgJyY6ZGlzYWJsZWQnOiB7XG4gICAgICBvcGFjaXR5OiAwLjMsXG4gICAgfSxcbiAgICAnJi5wbGF5LWJ1dHRvbic6IHtcbiAgICAgIHdpZHRoOiAnM2VtJyxcbiAgICAgIGhlaWdodDogJzNlbScsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3Qgc2xvdFN0eWxlID0ge1xuICBkaXNwbGF5OiAnZmxleCcsXG4gIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICBidXR0b246IHtcbiAgICBkaXNwbGF5OiAnYmxvY2snLFxuICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICB9LFxufVxuXG5jb25zdCB0ZXh0RWxsaXBzaXMgPSB7XG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIHRleHRPdmVyZmxvdzogJ2VsbGlwc2lzJyxcbn1cblxuY29uc3QgaW5mb1N0eWxlID0ge1xuICBhbGlnbkl0ZW1zOiAnZmxleC1zdGFydCcsXG4gIG92ZXJmbG93OiAndmlzaWJsZScsXG4gIGgxOiB7XG4gICAgaGVpZ2h0OiAnM2VtJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICAuLi50ZXh0RWxsaXBzaXMsXG4gICAgJz4gZGl2JzogdGV4dEVsbGlwc2lzLFxuICB9LFxuICAnYnV0dG9uICsgaDEnOiB7XG4gICAgbWFyZ2luTGVmdDogJzFlbScsXG4gIH0sXG59XG5cbmNvbnN0IGJhY2tTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHpJbmRleDogMCxcbiAgd2lkdGg6ICcxMDAlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgJ34gKic6IHtcbiAgICB6SW5kZXg6IDAsXG4gIH0sXG59XG5cbmNvbnN0IHNraXBTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIHJpZ2h0OiAwLFxuICBib3R0b206ICc5cmVtJyxcbiAgdGV4dEFsaWduOiAncmlnaHQnLFxuICBidXR0b246IHtcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGhlaWdodDogJ2F1dG8nLFxuICB9LFxufVxuXG5jb25zdCBkZWtzdG9wU3R5bGUgPSB7XG4gICc+IGRpdic6IHtcbiAgICAnPiBidXR0b246bm90KDpkaXNhYmxlZCkgfiBidXR0b246bm90KDpkaXNhYmxlZCksID4gYnV0dG9uOmxhc3Qtb2YtdHlwZSc6IHtcbiAgICAgIG1hcmdpbkxlZnQ6ICcwLjc1ZW0nLFxuICAgIH0sXG4gICAgJz4gYnV0dG9uOmZpcnN0LW9mLXR5cGUnOiB7XG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgZGVza3RvcENvbnRyb2xzID0ge1xuICBmbGV4V3JhcDogJ3dyYXAnLFxuICAnPiBkaXY6Zmlyc3Qtb2YtdHlwZSc6IHtcbiAgICBmbGV4OiAnMTAwJScsXG4gICAgbWFyZ2luQm90dG9tOiAnMC44OGVtJyxcbiAgfSxcbiAgJ2J1dHRvbltkaXNhYmxlZF0nOiB7XG4gICAgZGlzcGxheTogJ25vbmUnLFxuICB9LFxufVxuXG5jb25zdCBhZENvbnRhaW5lclN0eWxlID0ge1xuICBmbGV4R3JvdzogMSxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICBwb2ludGVyRXZlbnRzOiAnbm9uZScsXG4gICc+IGlmcmFtZSc6IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxuICBidXR0b246IHtwb2ludGVyRXZlbnRzOiAnYXV0byd9LFxufVxuXG5jb25zdCBDb250cm9sc0Jsb2NrID0gKHtcbiAgb3JkZXIgPSAnbW9iaWxlJyxcbiAgcGxheUJ1dHRvbixcbiAgcmV3aW5kQnV0dG9uID0gJycsXG4gIGZvcndhcmRCdXR0b24gPSAnJyxcbiAgcHJldmlvdXNFcGlzb2RlQnV0dG9uID0gJycsXG4gIG5leHRFcGlzb2RlQnV0dG9uID0gJycsXG59KSA9PlxuICBvcmRlciA9PT0gJ2Rlc2t0b3AnID8gKFxuICAgIDw+XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7cmV3aW5kQnV0dG9ufVxuICAgICAge2ZvcndhcmRCdXR0b259XG4gICAgPC8+XG4gICkgOiAoXG4gICAgPD5cbiAgICAgIHtyZXdpbmRCdXR0b259XG4gICAgICB7cHJldmlvdXNFcGlzb2RlQnV0dG9ufVxuICAgICAge3BsYXlCdXR0b259XG4gICAgICB7bmV4dEVwaXNvZGVCdXR0b259XG4gICAgICB7Zm9yd2FyZEJ1dHRvbn1cbiAgICA8Lz5cbiAgKVxuXG5jb25zdCBEZWZhdWx0TGF5b3V0ID0gKHtcbiAgdHlwZSA9ICdtb2JpbGUnLFxuICBzdHlsZSxcbiAgZGlzcGxheSxcbiAgY29udHJvbHNEaXNwbGF5ID0gZGlzcGxheSxcbiAgc2l6ZSxcbiAgdGl0bGUgPSAnJyxcbiAgY2hhbm5lbFRpdGxlID0gJycsXG4gIHZpZGVvLFxuICBoYXZlQm90dG9tSXRlbSxcbiAgc2Vla2JhciA9ICcnLFxuICBjb250cm9sQnV0dG9ucyxcbiAgdm9sdW1lQ29udHJvbCxcbiAgZnVsbHNjcmVlbkJ1dHRvbixcbiAgYmFja0J1dHRvbiA9ICcnLFxuICBhZFN0YXR1cyA9ICcnLFxuICBhZExpbmsgPSAnJyxcbiAgYWRTa2lwQnV0dG9uLFxuICBiYWNrSXRlbXMsXG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJSZWYsXG4gIGJhY2tSZWYsXG4gIGFkQ29udGFpbmVyUmVmLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IHNsb3RSZWYgPSB1c2VSZWYoe30pXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjc3M9e1tcbiAgICAgICAgY29udGFpbmVyU3R5bGUsXG4gICAgICAgIHZpZGVvQ29udGFpbmVyU3R5bGUsXG4gICAgICAgIHJlc3BvbnNpdmVTdHlsZXNbc2l6ZV0sXG4gICAgICAgIHR5cGUgPT09ICdkZXNrdG9wJyAmJiBkZWtzdG9wU3R5bGUsXG4gICAgICAgIHN0eWxlLFxuICAgICAgXX1cbiAgICAgIHJlZj17Y29udGFpbmVyUmVmfVxuICAgICAgey4uLnJlc3R9XG4gICAgPlxuICAgICAge3ZpZGVvfVxuICAgICAgPGRpdlxuICAgICAgICByZWY9e2JhY2tSZWZ9XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIGJhY2tTdHlsZSxcbiAgICAgICAgICBkaXNwbGF5ICE9PSAnaGlkZGVuJyAmJiAoaGF2ZUJvdHRvbUl0ZW0gPyBkcm9wVG9wIDogZHJvcCksXG4gICAgICAgIF19XG4gICAgICA+XG4gICAgICAgIHt0eXBlICE9PSAnbW9iaWxlJyAmJiBiYWNrSXRlbXN9XG4gICAgICAgIHthZFNraXBCdXR0b24gJiYgPGRpdiBjc3M9e3NraXBTdHlsZX0+e2FkU2tpcEJ1dHRvbn08L2Rpdj59XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY3NzPXtbcm93U3R5bGUsIGluZm9TdHlsZSwgZGlzcGxheVN0eWxlc1tkaXNwbGF5XV19PlxuICAgICAgICB7YmFja0J1dHRvbn1cbiAgICAgICAgPGgxPlxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICB7Y2hhbm5lbFRpdGxlICYmIDxkaXYgY3NzPXt7Zm9udFNpemU6ICcxNnB4J319PntjaGFubmVsVGl0bGV9PC9kaXY+fVxuICAgICAgICA8L2gxPlxuICAgICAgICA8ZGl2IGNzcz17ZXhwYW5kfSAvPlxuICAgICAgICB7dHlwZSA9PT0gJ21vYmlsZScgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNzcz17YWRTdGF0dXMgPyBoaWRkZW4gOiBbc2xvdFN0eWxlXX1cbiAgICAgICAgICAgIHJlZj17ZWxlbWVudCA9PiB7XG4gICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgICAge2FkTGluayAmJiA8ZGl2IGNsYXNzTmFtZT1cInBpbm5lZFwiPnthZExpbmt9PC9kaXY+fVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IHJlZj17YWRDb250YWluZXJSZWZ9IGNzcz17YWRDb250YWluZXJTdHlsZX0+XG4gICAgICAgIHt0eXBlID09PSAnbW9iaWxlJyAmJiAoXG4gICAgICAgICAgPGRpdiBjc3M9e1tjb250cm9sc1N0eWxlLCBkaXNwbGF5U3R5bGVzW2NvbnRyb2xzRGlzcGxheV1dfT5cbiAgICAgICAgICAgIDxDb250cm9sc0Jsb2NrIG9yZGVyPVwibW9iaWxlXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNzcz17W1xuICAgICAgICAgIHJvd1N0eWxlLFxuICAgICAgICAgIHttYXJnaW5Ub3A6ICdhdXRvJ30sXG4gICAgICAgICAgdHlwZSA9PT0gJ2Rlc2t0b3AnICYmIGRlc2t0b3BDb250cm9scyxcbiAgICAgICAgICBjb250cm9sc0Rpc3BsYXlTdHlsZXNbY29udHJvbHNEaXNwbGF5XSxcbiAgICAgICAgXX1cbiAgICAgID5cbiAgICAgICAge3NlZWtiYXIgfHwgPGRpdiAvPn1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPENvbnRyb2xzQmxvY2sgb3JkZXI9XCJkZXNrdG9wXCIgey4uLmNvbnRyb2xCdXR0b25zfSAvPlxuICAgICAgICApfVxuICAgICAgICB7YWRTdGF0dXMgJiYgKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInBpbm5lZFwiXG4gICAgICAgICAgICBjc3M9e3tmbGV4OiAxLCB0ZXh0U2hhZG93OiAnMnB4IDJweCAxcHggIzAwMCd9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHthZFN0YXR1c31cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge3R5cGUgPT09ICdkZXNrdG9wJyAmJiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtleHBhbmR9IC8+XG4gICAgICAgICAgICB7dm9sdW1lQ29udHJvbH1cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY3NzPXthZFN0YXR1cyA/IGhpZGRlbiA6IFtzbG90U3R5bGVdfVxuICAgICAgICAgICAgICByZWY9e2VsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIHNsb3RSZWYuY3VycmVudC5mdW5jdGlvbkJhciA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICAgIHtmdWxsc2NyZWVuQnV0dG9ufVxuICAgICAgPC9kaXY+XG4gICAgICA8U2xvdFByb3ZpZGVyIHNsb3RSZWY9e3Nsb3RSZWZ9PntjaGlsZHJlbn08L1Nsb3RQcm92aWRlcj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEZWZhdWx0TGF5b3V0XG4iXX0= */"],
      children: [seekbar || jsx$1("div", {}), type === 'desktop' && jsx$1(ControlsBlock, {
        order: "desktop",
        ...controlButtons
      }), adStatus && jsx$1("div", {
        className: "pinned",
        css: _ref2$2,
        children: adStatus
      }), type === 'desktop' && jsxs(Fragment, {
        children: [jsx$1("div", {
          css: expand
        }), volumeControl, jsx$1("div", {
          css: adStatus ? hidden : [slotStyle],
          ref: element => {
            slotRef.current.functionBar = element;
          }
        })]
      }), fullscreenButton]
    }), jsx$1(SlotProvider, {
      slotRef: slotRef,
      children: children
    })]
  });
};

const getPointerData = event => {
  var _event$touches, _event$changedTouches;

  const {
    pageX: x,
    pageY: y
  } = ((_event$touches = event.touches) === null || _event$touches === void 0 ? void 0 : _event$touches[0]) || ((_event$changedTouches = event.changedTouches) === null || _event$changedTouches === void 0 ? void 0 : _event$changedTouches[0]) || event;
  const {
    width,
    left
  } = event.currentTarget.getBoundingClientRect();
  return {
    x,
    y,
    width,
    left
  };
};

function _EMOTION_STRINGIFIED_CSS_ERROR__$3() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
const style$8 = {
  position: 'relative',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  touchAction: 'none'
};
const disabledStyle = {
  pointerEvents: 'none'
};
const railStyle = {
  position: 'relative',
  flex: '100%',
  height: '4px',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.2)',
  '> div': {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%'
  }
};
const markStyle = {
  position: 'absolute',
  height: railStyle.height,
  width: '4px',
  transform: 'translateX(-50%)',
  backgroundColor: '#ff9835'
};
const thumbStyle = {
  position: 'absolute',
  top: '50%',
  height: '14px',
  width: '14px',
  borderRadius: '100%',
  backgroundColor: '#fff',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.5)',
  transform: 'translate(-50%, -50%)'
};

const getSliderValue = ({
  x,
  left,
  width
}) => Math.max(0, Math.min((x - left) / width, 1));

const debouncedPointerHandlers = ({
  state,
  onMove,
  onLeave
}) => {
  const emit = () => {
    if (!state.scheduled) {
      return;
    }

    if (state.type === 'leave') {
      onLeave === null || onLeave === void 0 ? void 0 : onLeave(state.event, state);
    } else {
      onMove(state.event, state);
    }

    state.scheduled = false;
  };

  const schedule = () => {
    if (state.scheduled) {
      return;
    }

    state.scheduled = true;
    requestAnimationFrame(emit);
  };

  return {
    onPointerMove: event => {
      var _event$touches;

      const type = event.buttons > 0 || ((_event$touches = event.touches) === null || _event$touches === void 0 ? void 0 : _event$touches.length) > 0 ? 'change' : 'move';
      Object.assign(state, {
        event,
        type,
        ...getPointerData(event)
      });
      schedule();
    },
    onPointerLeave: event => {
      const type = 'leave';
      Object.assign(state, {
        event,
        type
      });
      schedule();
    },
    emit
  };
};

const eventHandlers = ({
  onPointerDown,
  onPointerMove,
  onPointerLeave,
  onPointerUp
}) => typeof window !== 'undefined' && window.matchMedia(havePointerQuery).matches ? {
  onPointerDown,
  onPointerMove,
  onPointerLeave,
  onPointerUp
} : {
  onTouchStart: onPointerDown,
  onTouchMove: onPointerMove,
  onTouchEnd: event => {
    onPointerLeave(event);
    onPointerUp(event);
  }
}; // TODO align with material ui more, move special handling of pointer events


var _ref$3 = process.env.NODE_ENV === "production" ? {
  name: "1rwj9b6",
  styles: "background-color:rgba(255, 255, 255, 0.3)"
} : {
  name: "1nvd7de-SimpleSlider",
  styles: "background-color:rgba(255, 255, 255, 0.3);label:SimpleSlider;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNsaWRlci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0xZIiwiZmlsZSI6IlNpbXBsZVNsaWRlci5qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG4vKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge3VzZVN0YXRlLCB1c2VSZWZ9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQge2dldFBvaW50ZXJEYXRhfSBmcm9tICd1dGlsL3BvaW50ZXInXG5pbXBvcnQge2hhdmVQb2ludGVyUXVlcnl9IGZyb20gJ3V0aWwvZW52aXJvbm1lbnQnXG5cbmNvbnN0IHN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIHRvdWNoQWN0aW9uOiAnbm9uZScsXG59XG5cbmNvbnN0IGRpc2FibGVkU3R5bGUgPSB7XG4gIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbn1cblxuY29uc3QgcmFpbFN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgZmxleDogJzEwMCUnLFxuICBoZWlnaHQ6ICc0cHgnLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknLFxuICAnPiBkaXYnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMCcsXG4gICAgbGVmdDogJzAnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IG1hcmtTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIGhlaWdodDogcmFpbFN0eWxlLmhlaWdodCxcbiAgd2lkdGg6ICc0cHgnLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnI2ZmOTgzNScsXG59XG5cbmNvbnN0IHRodW1iU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB0b3A6ICc1MCUnLFxuICBoZWlnaHQ6ICcxNHB4JyxcbiAgd2lkdGg6ICcxNHB4JyxcbiAgYm9yZGVyUmFkaXVzOiAnMTAwJScsXG4gIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICBib3hTaGFkb3c6ICcwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuNSknLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxufVxuXG5jb25zdCBnZXRTbGlkZXJWYWx1ZSA9ICh7eCwgbGVmdCwgd2lkdGh9KSA9PlxuICBNYXRoLm1heCgwLCBNYXRoLm1pbigoeCAtIGxlZnQpIC8gd2lkdGgsIDEpKVxuXG5jb25zdCBkZWJvdW5jZWRQb2ludGVySGFuZGxlcnMgPSAoe3N0YXRlLCBvbk1vdmUsIG9uTGVhdmV9KSA9PiB7XG4gIGNvbnN0IGVtaXQgPSAoKSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5zY2hlZHVsZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoc3RhdGUudHlwZSA9PT0gJ2xlYXZlJykge1xuICAgICAgb25MZWF2ZT8uKHN0YXRlLmV2ZW50LCBzdGF0ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgb25Nb3ZlKHN0YXRlLmV2ZW50LCBzdGF0ZSlcbiAgICB9XG4gICAgc3RhdGUuc2NoZWR1bGVkID0gZmFsc2VcbiAgfVxuICBjb25zdCBzY2hlZHVsZSA9ICgpID0+IHtcbiAgICBpZiAoc3RhdGUuc2NoZWR1bGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3RhdGUuc2NoZWR1bGVkID0gdHJ1ZVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShlbWl0KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvblBvaW50ZXJNb3ZlOiBldmVudCA9PiB7XG4gICAgICBjb25zdCB0eXBlID1cbiAgICAgICAgZXZlbnQuYnV0dG9ucyA+IDAgfHwgZXZlbnQudG91Y2hlcz8ubGVuZ3RoID4gMCA/ICdjaGFuZ2UnIDogJ21vdmUnXG4gICAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7ZXZlbnQsIHR5cGUsIC4uLmdldFBvaW50ZXJEYXRhKGV2ZW50KX0pXG4gICAgICBzY2hlZHVsZSgpXG4gICAgfSxcbiAgICBvblBvaW50ZXJMZWF2ZTogZXZlbnQgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9ICdsZWF2ZSdcbiAgICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtldmVudCwgdHlwZX0pXG4gICAgICBzY2hlZHVsZSgpXG4gICAgfSxcbiAgICBlbWl0LFxuICB9XG59XG5cbmNvbnN0IGV2ZW50SGFuZGxlcnMgPSAoe1xuICBvblBvaW50ZXJEb3duLFxuICBvblBvaW50ZXJNb3ZlLFxuICBvblBvaW50ZXJMZWF2ZSxcbiAgb25Qb2ludGVyVXAsXG59KSA9PlxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubWF0Y2hNZWRpYShoYXZlUG9pbnRlclF1ZXJ5KS5tYXRjaGVzXG4gICAgPyB7b25Qb2ludGVyRG93biwgb25Qb2ludGVyTW92ZSwgb25Qb2ludGVyTGVhdmUsIG9uUG9pbnRlclVwfVxuICAgIDoge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IG9uUG9pbnRlckRvd24sXG4gICAgICAgIG9uVG91Y2hNb3ZlOiBvblBvaW50ZXJNb3ZlLFxuICAgICAgICBvblRvdWNoRW5kOiBldmVudCA9PiB7XG4gICAgICAgICAgb25Qb2ludGVyTGVhdmUoZXZlbnQpXG4gICAgICAgICAgb25Qb2ludGVyVXAoZXZlbnQpXG4gICAgICAgIH0sXG4gICAgICB9XG5cbi8vIFRPRE8gYWxpZ24gd2l0aCBtYXRlcmlhbCB1aSBtb3JlLCBtb3ZlIHNwZWNpYWwgaGFuZGxpbmcgb2YgcG9pbnRlciBldmVudHNcbmNvbnN0IFNpbXBsZVNsaWRlciA9ICh7XG4gIG1pbiA9IDAsXG4gIG1heCA9IDEwMCxcbiAgdmFsdWUsXG4gIHNlY29uZGFyeVRyYWNrVmFsdWUsIC8vIFRPRE8gYSBiZXR0ZXIgbmFtZVxuICBtYXJrcyA9IFtdLFxuICBjbGFzc05hbWUgPSAnJyxcbiAgY2xhc3NlcyA9IHt9LFxuICBkaXNhYmxlZCxcbiAgb25Qb2ludGVyTW92ZSxcbiAgb25Qb2ludGVyTGVhdmUsXG4gIG9uQ2hhbmdlLFxuICBvbkNoYW5nZUNvbW1pdHRlZCxcbn0pID0+IHtcbiAgY29uc3QgcG9pbnRlclN0YXRlID0gdXNlUmVmKHt9KVxuICBjb25zdCBbZm9jdXNWYWx1ZSwgc2V0Rm9jdXNWYWx1ZV0gPSB1c2VTdGF0ZSgtMSlcbiAgY29uc3QgdGh1bWJQb3NpdGlvbiA9XG4gICAgKChmb2N1c1ZhbHVlID49IDAgPyBmb2N1c1ZhbHVlIDogdmFsdWUpIC0gbWluKSAvIChtYXggLSBtaW4pXG4gIGNvbnN0IHN1YlRyYWNrUG9zaXRpb24gPSAoc2Vjb25kYXJ5VHJhY2tWYWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKVxuICBjb25zdCBwb2ludGVySGFuZGxlcnMgPSBkZWJvdW5jZWRQb2ludGVySGFuZGxlcnMoe1xuICAgIHN0YXRlOiBwb2ludGVyU3RhdGUuY3VycmVudCxcbiAgICBvbk1vdmU6IChldmVudCwge3R5cGUsIHgsIHksIHdpZHRoLCBsZWZ0fSkgPT4ge1xuICAgICAgY29uc3QgcG9pbnRlclZhbHVlID0gKG1heCAtIG1pbikgKiBnZXRTbGlkZXJWYWx1ZSh7eCwgd2lkdGgsIGxlZnR9KSArIG1pblxuICAgICAgb25Qb2ludGVyTW92ZT8uKGV2ZW50LCB7dmFsdWU6IHBvaW50ZXJWYWx1ZSwgeCwgeX0pXG4gICAgICBpZiAodHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgICAgc2V0Rm9jdXNWYWx1ZShwb2ludGVyVmFsdWUpXG4gICAgICAgIG9uQ2hhbmdlPy4oZXZlbnQsIHt2YWx1ZTogcG9pbnRlclZhbHVlLCB4LCB5fSlcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uTGVhdmU6ICgpID0+IG9uUG9pbnRlckxlYXZlPy4oKSxcbiAgfSlcbiAgY29uc3QgaGFuZGxlUG9pbnRlclVwID0gZXZlbnQgPT4ge1xuICAgIGlmIChldmVudC5wb2ludGVySWQpIHtcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZClcbiAgICB9XG4gICAgY29uc3QgcG9pbnRlclZhbHVlID1cbiAgICAgIChtYXggLSBtaW4pICogZ2V0U2xpZGVyVmFsdWUoZ2V0UG9pbnRlckRhdGEoZXZlbnQpKSArIG1pblxuICAgIHBvaW50ZXJIYW5kbGVycy5lbWl0KClcbiAgICBvbkNoYW5nZUNvbW1pdHRlZD8uKGV2ZW50LCB7dmFsdWU6IHBvaW50ZXJWYWx1ZX0pXG4gICAgc2V0Rm9jdXNWYWx1ZSgpXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgY3NzPXtbc3R5bGUsIGRpc2FibGVkICYmIGRpc2FibGVkU3R5bGVdfVxuICAgICAgb25DbGljaz17ZXZlbnQgPT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICB7Li4uZXZlbnRIYW5kbGVycyh7XG4gICAgICAgIG9uUG9pbnRlckRvd246IGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3BvaW50ZXJkb3duJykge1xuICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpXG4gICAgICAgICAgfVxuICAgICAgICAgIHBvaW50ZXJIYW5kbGVycy5vblBvaW50ZXJNb3ZlKGV2ZW50KVxuICAgICAgICB9LFxuICAgICAgICAuLi5wb2ludGVySGFuZGxlcnMsXG4gICAgICAgIG9uUG9pbnRlclVwOiBoYW5kbGVQb2ludGVyVXAsXG4gICAgICB9KX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5yYWlsfSBjc3M9e3JhaWxTdHlsZX0+XG4gICAgICAgIHtzZWNvbmRhcnlUcmFja1ZhbHVlICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjc3M9e3tiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknfX1cbiAgICAgICAgICAgIHN0eWxlPXt7dHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke3N1YlRyYWNrUG9zaXRpb24gKiAxMDAgLSAxMDB9JSlgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY3NzPXt7YmFja2dyb3VuZENvbG9yOiAnI2ZmZid9fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy50cmFja31cbiAgICAgICAgICBzdHlsZT17e3RyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt0aHVtYlBvc2l0aW9uICogMTAwIC0gMTAwfSUpYH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIHttYXJrcy5tYXAocG9zaXRpb24gPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtwb3NpdGlvbn1cbiAgICAgICAgICBjc3M9e21hcmtTdHlsZX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMubWFya2VkfVxuICAgICAgICAgIHN0eWxlPXt7bGVmdDogYCR7KHBvc2l0aW9uIC8gbWF4KSAqIDEwMH0lYH19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICAgIHtvbkNoYW5nZSAmJiAhZGlzYWJsZWQgPyAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjc3M9e3RodW1iU3R5bGV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLnRodW1ifVxuICAgICAgICAgIHN0eWxlPXt7bGVmdDogYGNhbGMoJHt0aHVtYlBvc2l0aW9uICogMTAwfSUpYH19XG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG5cblNpbXBsZVNsaWRlci5wcm9wVHlwZXMgPSB7XG4gIG1pbjogUHJvcFR5cGVzLm51bWJlcixcbiAgbWF4OiBQcm9wVHlwZXMubnVtYmVyLFxuICB2YWx1ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgc2Vjb25kYXJ5VHJhY2tWYWx1ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgbWFya3M6IFByb3BUeXBlcy5hcnJheSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uUG9pbnRlck1vdmU6IFByb3BUeXBlcy5mdW5jLFxuICBvblBvaW50ZXJMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGFuZ2VDb21taXR0ZWQ6IFByb3BUeXBlcy5mdW5jLFxufVxuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGVTbGlkZXJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$3
};

var _ref2$1 = process.env.NODE_ENV === "production" ? {
  name: "dfjll8",
  styles: "background-color:#fff"
} : {
  name: "mlfwmi-SimpleSlider",
  styles: "background-color:#fff;label:SimpleSlider;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNsaWRlci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUxVIiwiZmlsZSI6IlNpbXBsZVNsaWRlci5qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG4vKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge3VzZVN0YXRlLCB1c2VSZWZ9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQge2dldFBvaW50ZXJEYXRhfSBmcm9tICd1dGlsL3BvaW50ZXInXG5pbXBvcnQge2hhdmVQb2ludGVyUXVlcnl9IGZyb20gJ3V0aWwvZW52aXJvbm1lbnQnXG5cbmNvbnN0IHN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIHRvdWNoQWN0aW9uOiAnbm9uZScsXG59XG5cbmNvbnN0IGRpc2FibGVkU3R5bGUgPSB7XG4gIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbn1cblxuY29uc3QgcmFpbFN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgZmxleDogJzEwMCUnLFxuICBoZWlnaHQ6ICc0cHgnLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknLFxuICAnPiBkaXYnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMCcsXG4gICAgbGVmdDogJzAnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IG1hcmtTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIGhlaWdodDogcmFpbFN0eWxlLmhlaWdodCxcbiAgd2lkdGg6ICc0cHgnLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnI2ZmOTgzNScsXG59XG5cbmNvbnN0IHRodW1iU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB0b3A6ICc1MCUnLFxuICBoZWlnaHQ6ICcxNHB4JyxcbiAgd2lkdGg6ICcxNHB4JyxcbiAgYm9yZGVyUmFkaXVzOiAnMTAwJScsXG4gIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICBib3hTaGFkb3c6ICcwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuNSknLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxufVxuXG5jb25zdCBnZXRTbGlkZXJWYWx1ZSA9ICh7eCwgbGVmdCwgd2lkdGh9KSA9PlxuICBNYXRoLm1heCgwLCBNYXRoLm1pbigoeCAtIGxlZnQpIC8gd2lkdGgsIDEpKVxuXG5jb25zdCBkZWJvdW5jZWRQb2ludGVySGFuZGxlcnMgPSAoe3N0YXRlLCBvbk1vdmUsIG9uTGVhdmV9KSA9PiB7XG4gIGNvbnN0IGVtaXQgPSAoKSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5zY2hlZHVsZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoc3RhdGUudHlwZSA9PT0gJ2xlYXZlJykge1xuICAgICAgb25MZWF2ZT8uKHN0YXRlLmV2ZW50LCBzdGF0ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgb25Nb3ZlKHN0YXRlLmV2ZW50LCBzdGF0ZSlcbiAgICB9XG4gICAgc3RhdGUuc2NoZWR1bGVkID0gZmFsc2VcbiAgfVxuICBjb25zdCBzY2hlZHVsZSA9ICgpID0+IHtcbiAgICBpZiAoc3RhdGUuc2NoZWR1bGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3RhdGUuc2NoZWR1bGVkID0gdHJ1ZVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShlbWl0KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvblBvaW50ZXJNb3ZlOiBldmVudCA9PiB7XG4gICAgICBjb25zdCB0eXBlID1cbiAgICAgICAgZXZlbnQuYnV0dG9ucyA+IDAgfHwgZXZlbnQudG91Y2hlcz8ubGVuZ3RoID4gMCA/ICdjaGFuZ2UnIDogJ21vdmUnXG4gICAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7ZXZlbnQsIHR5cGUsIC4uLmdldFBvaW50ZXJEYXRhKGV2ZW50KX0pXG4gICAgICBzY2hlZHVsZSgpXG4gICAgfSxcbiAgICBvblBvaW50ZXJMZWF2ZTogZXZlbnQgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9ICdsZWF2ZSdcbiAgICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtldmVudCwgdHlwZX0pXG4gICAgICBzY2hlZHVsZSgpXG4gICAgfSxcbiAgICBlbWl0LFxuICB9XG59XG5cbmNvbnN0IGV2ZW50SGFuZGxlcnMgPSAoe1xuICBvblBvaW50ZXJEb3duLFxuICBvblBvaW50ZXJNb3ZlLFxuICBvblBvaW50ZXJMZWF2ZSxcbiAgb25Qb2ludGVyVXAsXG59KSA9PlxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubWF0Y2hNZWRpYShoYXZlUG9pbnRlclF1ZXJ5KS5tYXRjaGVzXG4gICAgPyB7b25Qb2ludGVyRG93biwgb25Qb2ludGVyTW92ZSwgb25Qb2ludGVyTGVhdmUsIG9uUG9pbnRlclVwfVxuICAgIDoge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IG9uUG9pbnRlckRvd24sXG4gICAgICAgIG9uVG91Y2hNb3ZlOiBvblBvaW50ZXJNb3ZlLFxuICAgICAgICBvblRvdWNoRW5kOiBldmVudCA9PiB7XG4gICAgICAgICAgb25Qb2ludGVyTGVhdmUoZXZlbnQpXG4gICAgICAgICAgb25Qb2ludGVyVXAoZXZlbnQpXG4gICAgICAgIH0sXG4gICAgICB9XG5cbi8vIFRPRE8gYWxpZ24gd2l0aCBtYXRlcmlhbCB1aSBtb3JlLCBtb3ZlIHNwZWNpYWwgaGFuZGxpbmcgb2YgcG9pbnRlciBldmVudHNcbmNvbnN0IFNpbXBsZVNsaWRlciA9ICh7XG4gIG1pbiA9IDAsXG4gIG1heCA9IDEwMCxcbiAgdmFsdWUsXG4gIHNlY29uZGFyeVRyYWNrVmFsdWUsIC8vIFRPRE8gYSBiZXR0ZXIgbmFtZVxuICBtYXJrcyA9IFtdLFxuICBjbGFzc05hbWUgPSAnJyxcbiAgY2xhc3NlcyA9IHt9LFxuICBkaXNhYmxlZCxcbiAgb25Qb2ludGVyTW92ZSxcbiAgb25Qb2ludGVyTGVhdmUsXG4gIG9uQ2hhbmdlLFxuICBvbkNoYW5nZUNvbW1pdHRlZCxcbn0pID0+IHtcbiAgY29uc3QgcG9pbnRlclN0YXRlID0gdXNlUmVmKHt9KVxuICBjb25zdCBbZm9jdXNWYWx1ZSwgc2V0Rm9jdXNWYWx1ZV0gPSB1c2VTdGF0ZSgtMSlcbiAgY29uc3QgdGh1bWJQb3NpdGlvbiA9XG4gICAgKChmb2N1c1ZhbHVlID49IDAgPyBmb2N1c1ZhbHVlIDogdmFsdWUpIC0gbWluKSAvIChtYXggLSBtaW4pXG4gIGNvbnN0IHN1YlRyYWNrUG9zaXRpb24gPSAoc2Vjb25kYXJ5VHJhY2tWYWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKVxuICBjb25zdCBwb2ludGVySGFuZGxlcnMgPSBkZWJvdW5jZWRQb2ludGVySGFuZGxlcnMoe1xuICAgIHN0YXRlOiBwb2ludGVyU3RhdGUuY3VycmVudCxcbiAgICBvbk1vdmU6IChldmVudCwge3R5cGUsIHgsIHksIHdpZHRoLCBsZWZ0fSkgPT4ge1xuICAgICAgY29uc3QgcG9pbnRlclZhbHVlID0gKG1heCAtIG1pbikgKiBnZXRTbGlkZXJWYWx1ZSh7eCwgd2lkdGgsIGxlZnR9KSArIG1pblxuICAgICAgb25Qb2ludGVyTW92ZT8uKGV2ZW50LCB7dmFsdWU6IHBvaW50ZXJWYWx1ZSwgeCwgeX0pXG4gICAgICBpZiAodHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgICAgc2V0Rm9jdXNWYWx1ZShwb2ludGVyVmFsdWUpXG4gICAgICAgIG9uQ2hhbmdlPy4oZXZlbnQsIHt2YWx1ZTogcG9pbnRlclZhbHVlLCB4LCB5fSlcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uTGVhdmU6ICgpID0+IG9uUG9pbnRlckxlYXZlPy4oKSxcbiAgfSlcbiAgY29uc3QgaGFuZGxlUG9pbnRlclVwID0gZXZlbnQgPT4ge1xuICAgIGlmIChldmVudC5wb2ludGVySWQpIHtcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZClcbiAgICB9XG4gICAgY29uc3QgcG9pbnRlclZhbHVlID1cbiAgICAgIChtYXggLSBtaW4pICogZ2V0U2xpZGVyVmFsdWUoZ2V0UG9pbnRlckRhdGEoZXZlbnQpKSArIG1pblxuICAgIHBvaW50ZXJIYW5kbGVycy5lbWl0KClcbiAgICBvbkNoYW5nZUNvbW1pdHRlZD8uKGV2ZW50LCB7dmFsdWU6IHBvaW50ZXJWYWx1ZX0pXG4gICAgc2V0Rm9jdXNWYWx1ZSgpXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgY3NzPXtbc3R5bGUsIGRpc2FibGVkICYmIGRpc2FibGVkU3R5bGVdfVxuICAgICAgb25DbGljaz17ZXZlbnQgPT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICB7Li4uZXZlbnRIYW5kbGVycyh7XG4gICAgICAgIG9uUG9pbnRlckRvd246IGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3BvaW50ZXJkb3duJykge1xuICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpXG4gICAgICAgICAgfVxuICAgICAgICAgIHBvaW50ZXJIYW5kbGVycy5vblBvaW50ZXJNb3ZlKGV2ZW50KVxuICAgICAgICB9LFxuICAgICAgICAuLi5wb2ludGVySGFuZGxlcnMsXG4gICAgICAgIG9uUG9pbnRlclVwOiBoYW5kbGVQb2ludGVyVXAsXG4gICAgICB9KX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5yYWlsfSBjc3M9e3JhaWxTdHlsZX0+XG4gICAgICAgIHtzZWNvbmRhcnlUcmFja1ZhbHVlICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjc3M9e3tiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknfX1cbiAgICAgICAgICAgIHN0eWxlPXt7dHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke3N1YlRyYWNrUG9zaXRpb24gKiAxMDAgLSAxMDB9JSlgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY3NzPXt7YmFja2dyb3VuZENvbG9yOiAnI2ZmZid9fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy50cmFja31cbiAgICAgICAgICBzdHlsZT17e3RyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt0aHVtYlBvc2l0aW9uICogMTAwIC0gMTAwfSUpYH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIHttYXJrcy5tYXAocG9zaXRpb24gPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtwb3NpdGlvbn1cbiAgICAgICAgICBjc3M9e21hcmtTdHlsZX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMubWFya2VkfVxuICAgICAgICAgIHN0eWxlPXt7bGVmdDogYCR7KHBvc2l0aW9uIC8gbWF4KSAqIDEwMH0lYH19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICAgIHtvbkNoYW5nZSAmJiAhZGlzYWJsZWQgPyAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjc3M9e3RodW1iU3R5bGV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLnRodW1ifVxuICAgICAgICAgIHN0eWxlPXt7bGVmdDogYGNhbGMoJHt0aHVtYlBvc2l0aW9uICogMTAwfSUpYH19XG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG5cblNpbXBsZVNsaWRlci5wcm9wVHlwZXMgPSB7XG4gIG1pbjogUHJvcFR5cGVzLm51bWJlcixcbiAgbWF4OiBQcm9wVHlwZXMubnVtYmVyLFxuICB2YWx1ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgc2Vjb25kYXJ5VHJhY2tWYWx1ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgbWFya3M6IFByb3BUeXBlcy5hcnJheSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uUG9pbnRlck1vdmU6IFByb3BUeXBlcy5mdW5jLFxuICBvblBvaW50ZXJMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGFuZ2VDb21taXR0ZWQ6IFByb3BUeXBlcy5mdW5jLFxufVxuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGVTbGlkZXJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$3
};

const SimpleSlider = ({
  min = 0,
  max = 100,
  value,
  secondaryTrackValue,
  // TODO a better name
  marks = [],
  className = '',
  classes = {},
  disabled,
  onPointerMove,
  onPointerLeave,
  onChange,
  onChangeCommitted
}) => {
  const pointerState = useRef({});
  const [focusValue, setFocusValue] = useState(-1);
  const thumbPosition = ((focusValue >= 0 ? focusValue : value) - min) / (max - min);
  const subTrackPosition = (secondaryTrackValue - min) / (max - min);
  const pointerHandlers = debouncedPointerHandlers({
    state: pointerState.current,
    onMove: (event, {
      type,
      x,
      y,
      width,
      left
    }) => {
      const pointerValue = (max - min) * getSliderValue({
        x,
        width,
        left
      }) + min;
      onPointerMove === null || onPointerMove === void 0 ? void 0 : onPointerMove(event, {
        value: pointerValue,
        x,
        y
      });

      if (type === 'change') {
        setFocusValue(pointerValue);
        onChange === null || onChange === void 0 ? void 0 : onChange(event, {
          value: pointerValue,
          x,
          y
        });
      }
    },
    onLeave: () => onPointerLeave === null || onPointerLeave === void 0 ? void 0 : onPointerLeave()
  });

  const handlePointerUp = event => {
    if (event.pointerId) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const pointerValue = (max - min) * getSliderValue(getPointerData(event)) + min;
    pointerHandlers.emit();
    onChangeCommitted === null || onChangeCommitted === void 0 ? void 0 : onChangeCommitted(event, {
      value: pointerValue
    });
    setFocusValue();
  };

  return jsxs("div", {
    className: className,
    css: [style$8, disabled && disabledStyle, process.env.NODE_ENV === "production" ? "" : ";label:SimpleSlider;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNpbXBsZVNsaWRlci5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0tNIiwiZmlsZSI6IlNpbXBsZVNsaWRlci5qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovXG4vKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG4vKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge3VzZVN0YXRlLCB1c2VSZWZ9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQge2dldFBvaW50ZXJEYXRhfSBmcm9tICd1dGlsL3BvaW50ZXInXG5pbXBvcnQge2hhdmVQb2ludGVyUXVlcnl9IGZyb20gJ3V0aWwvZW52aXJvbm1lbnQnXG5cbmNvbnN0IHN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgaGVpZ2h0OiAnMTAwJScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGN1cnNvcjogJ3BvaW50ZXInLFxuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIHRvdWNoQWN0aW9uOiAnbm9uZScsXG59XG5cbmNvbnN0IGRpc2FibGVkU3R5bGUgPSB7XG4gIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbn1cblxuY29uc3QgcmFpbFN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgZmxleDogJzEwMCUnLFxuICBoZWlnaHQ6ICc0cHgnLFxuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIGJhY2tncm91bmQ6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMiknLFxuICAnPiBkaXYnOiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMCcsXG4gICAgbGVmdDogJzAnLFxuICAgIHdpZHRoOiAnMTAwJScsXG4gICAgaGVpZ2h0OiAnMTAwJScsXG4gIH0sXG59XG5cbmNvbnN0IG1hcmtTdHlsZSA9IHtcbiAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gIGhlaWdodDogcmFpbFN0eWxlLmhlaWdodCxcbiAgd2lkdGg6ICc0cHgnLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKC01MCUpJyxcbiAgYmFja2dyb3VuZENvbG9yOiAnI2ZmOTgzNScsXG59XG5cbmNvbnN0IHRodW1iU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB0b3A6ICc1MCUnLFxuICBoZWlnaHQ6ICcxNHB4JyxcbiAgd2lkdGg6ICcxNHB4JyxcbiAgYm9yZGVyUmFkaXVzOiAnMTAwJScsXG4gIGJhY2tncm91bmRDb2xvcjogJyNmZmYnLFxuICBib3hTaGFkb3c6ICcwIDJweCAycHggMCByZ2JhKDAsIDAsIDAsIDAuNSknLFxuICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxufVxuXG5jb25zdCBnZXRTbGlkZXJWYWx1ZSA9ICh7eCwgbGVmdCwgd2lkdGh9KSA9PlxuICBNYXRoLm1heCgwLCBNYXRoLm1pbigoeCAtIGxlZnQpIC8gd2lkdGgsIDEpKVxuXG5jb25zdCBkZWJvdW5jZWRQb2ludGVySGFuZGxlcnMgPSAoe3N0YXRlLCBvbk1vdmUsIG9uTGVhdmV9KSA9PiB7XG4gIGNvbnN0IGVtaXQgPSAoKSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5zY2hlZHVsZWQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoc3RhdGUudHlwZSA9PT0gJ2xlYXZlJykge1xuICAgICAgb25MZWF2ZT8uKHN0YXRlLmV2ZW50LCBzdGF0ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgb25Nb3ZlKHN0YXRlLmV2ZW50LCBzdGF0ZSlcbiAgICB9XG4gICAgc3RhdGUuc2NoZWR1bGVkID0gZmFsc2VcbiAgfVxuICBjb25zdCBzY2hlZHVsZSA9ICgpID0+IHtcbiAgICBpZiAoc3RhdGUuc2NoZWR1bGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgc3RhdGUuc2NoZWR1bGVkID0gdHJ1ZVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShlbWl0KVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBvblBvaW50ZXJNb3ZlOiBldmVudCA9PiB7XG4gICAgICBjb25zdCB0eXBlID1cbiAgICAgICAgZXZlbnQuYnV0dG9ucyA+IDAgfHwgZXZlbnQudG91Y2hlcz8ubGVuZ3RoID4gMCA/ICdjaGFuZ2UnIDogJ21vdmUnXG4gICAgICBPYmplY3QuYXNzaWduKHN0YXRlLCB7ZXZlbnQsIHR5cGUsIC4uLmdldFBvaW50ZXJEYXRhKGV2ZW50KX0pXG4gICAgICBzY2hlZHVsZSgpXG4gICAgfSxcbiAgICBvblBvaW50ZXJMZWF2ZTogZXZlbnQgPT4ge1xuICAgICAgY29uc3QgdHlwZSA9ICdsZWF2ZSdcbiAgICAgIE9iamVjdC5hc3NpZ24oc3RhdGUsIHtldmVudCwgdHlwZX0pXG4gICAgICBzY2hlZHVsZSgpXG4gICAgfSxcbiAgICBlbWl0LFxuICB9XG59XG5cbmNvbnN0IGV2ZW50SGFuZGxlcnMgPSAoe1xuICBvblBvaW50ZXJEb3duLFxuICBvblBvaW50ZXJNb3ZlLFxuICBvblBvaW50ZXJMZWF2ZSxcbiAgb25Qb2ludGVyVXAsXG59KSA9PlxuICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cubWF0Y2hNZWRpYShoYXZlUG9pbnRlclF1ZXJ5KS5tYXRjaGVzXG4gICAgPyB7b25Qb2ludGVyRG93biwgb25Qb2ludGVyTW92ZSwgb25Qb2ludGVyTGVhdmUsIG9uUG9pbnRlclVwfVxuICAgIDoge1xuICAgICAgICBvblRvdWNoU3RhcnQ6IG9uUG9pbnRlckRvd24sXG4gICAgICAgIG9uVG91Y2hNb3ZlOiBvblBvaW50ZXJNb3ZlLFxuICAgICAgICBvblRvdWNoRW5kOiBldmVudCA9PiB7XG4gICAgICAgICAgb25Qb2ludGVyTGVhdmUoZXZlbnQpXG4gICAgICAgICAgb25Qb2ludGVyVXAoZXZlbnQpXG4gICAgICAgIH0sXG4gICAgICB9XG5cbi8vIFRPRE8gYWxpZ24gd2l0aCBtYXRlcmlhbCB1aSBtb3JlLCBtb3ZlIHNwZWNpYWwgaGFuZGxpbmcgb2YgcG9pbnRlciBldmVudHNcbmNvbnN0IFNpbXBsZVNsaWRlciA9ICh7XG4gIG1pbiA9IDAsXG4gIG1heCA9IDEwMCxcbiAgdmFsdWUsXG4gIHNlY29uZGFyeVRyYWNrVmFsdWUsIC8vIFRPRE8gYSBiZXR0ZXIgbmFtZVxuICBtYXJrcyA9IFtdLFxuICBjbGFzc05hbWUgPSAnJyxcbiAgY2xhc3NlcyA9IHt9LFxuICBkaXNhYmxlZCxcbiAgb25Qb2ludGVyTW92ZSxcbiAgb25Qb2ludGVyTGVhdmUsXG4gIG9uQ2hhbmdlLFxuICBvbkNoYW5nZUNvbW1pdHRlZCxcbn0pID0+IHtcbiAgY29uc3QgcG9pbnRlclN0YXRlID0gdXNlUmVmKHt9KVxuICBjb25zdCBbZm9jdXNWYWx1ZSwgc2V0Rm9jdXNWYWx1ZV0gPSB1c2VTdGF0ZSgtMSlcbiAgY29uc3QgdGh1bWJQb3NpdGlvbiA9XG4gICAgKChmb2N1c1ZhbHVlID49IDAgPyBmb2N1c1ZhbHVlIDogdmFsdWUpIC0gbWluKSAvIChtYXggLSBtaW4pXG4gIGNvbnN0IHN1YlRyYWNrUG9zaXRpb24gPSAoc2Vjb25kYXJ5VHJhY2tWYWx1ZSAtIG1pbikgLyAobWF4IC0gbWluKVxuICBjb25zdCBwb2ludGVySGFuZGxlcnMgPSBkZWJvdW5jZWRQb2ludGVySGFuZGxlcnMoe1xuICAgIHN0YXRlOiBwb2ludGVyU3RhdGUuY3VycmVudCxcbiAgICBvbk1vdmU6IChldmVudCwge3R5cGUsIHgsIHksIHdpZHRoLCBsZWZ0fSkgPT4ge1xuICAgICAgY29uc3QgcG9pbnRlclZhbHVlID0gKG1heCAtIG1pbikgKiBnZXRTbGlkZXJWYWx1ZSh7eCwgd2lkdGgsIGxlZnR9KSArIG1pblxuICAgICAgb25Qb2ludGVyTW92ZT8uKGV2ZW50LCB7dmFsdWU6IHBvaW50ZXJWYWx1ZSwgeCwgeX0pXG4gICAgICBpZiAodHlwZSA9PT0gJ2NoYW5nZScpIHtcbiAgICAgICAgc2V0Rm9jdXNWYWx1ZShwb2ludGVyVmFsdWUpXG4gICAgICAgIG9uQ2hhbmdlPy4oZXZlbnQsIHt2YWx1ZTogcG9pbnRlclZhbHVlLCB4LCB5fSlcbiAgICAgIH1cbiAgICB9LFxuICAgIG9uTGVhdmU6ICgpID0+IG9uUG9pbnRlckxlYXZlPy4oKSxcbiAgfSlcbiAgY29uc3QgaGFuZGxlUG9pbnRlclVwID0gZXZlbnQgPT4ge1xuICAgIGlmIChldmVudC5wb2ludGVySWQpIHtcbiAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQucmVsZWFzZVBvaW50ZXJDYXB0dXJlKGV2ZW50LnBvaW50ZXJJZClcbiAgICB9XG4gICAgY29uc3QgcG9pbnRlclZhbHVlID1cbiAgICAgIChtYXggLSBtaW4pICogZ2V0U2xpZGVyVmFsdWUoZ2V0UG9pbnRlckRhdGEoZXZlbnQpKSArIG1pblxuICAgIHBvaW50ZXJIYW5kbGVycy5lbWl0KClcbiAgICBvbkNoYW5nZUNvbW1pdHRlZD8uKGV2ZW50LCB7dmFsdWU6IHBvaW50ZXJWYWx1ZX0pXG4gICAgc2V0Rm9jdXNWYWx1ZSgpXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuICAgICAgY3NzPXtbc3R5bGUsIGRpc2FibGVkICYmIGRpc2FibGVkU3R5bGVdfVxuICAgICAgb25DbGljaz17ZXZlbnQgPT4gZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCl9XG4gICAgICB7Li4uZXZlbnRIYW5kbGVycyh7XG4gICAgICAgIG9uUG9pbnRlckRvd246IGV2ZW50ID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3BvaW50ZXJkb3duJykge1xuICAgICAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5zZXRQb2ludGVyQ2FwdHVyZShldmVudC5wb2ludGVySWQpXG4gICAgICAgICAgfVxuICAgICAgICAgIHBvaW50ZXJIYW5kbGVycy5vblBvaW50ZXJNb3ZlKGV2ZW50KVxuICAgICAgICB9LFxuICAgICAgICAuLi5wb2ludGVySGFuZGxlcnMsXG4gICAgICAgIG9uUG9pbnRlclVwOiBoYW5kbGVQb2ludGVyVXAsXG4gICAgICB9KX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlcy5yYWlsfSBjc3M9e3JhaWxTdHlsZX0+XG4gICAgICAgIHtzZWNvbmRhcnlUcmFja1ZhbHVlICYmIChcbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjc3M9e3tiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyknfX1cbiAgICAgICAgICAgIHN0eWxlPXt7dHJhbnNmb3JtOiBgdHJhbnNsYXRlWCgke3N1YlRyYWNrUG9zaXRpb24gKiAxMDAgLSAxMDB9JSlgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY3NzPXt7YmFja2dyb3VuZENvbG9yOiAnI2ZmZid9fVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy50cmFja31cbiAgICAgICAgICBzdHlsZT17e3RyYW5zZm9ybTogYHRyYW5zbGF0ZVgoJHt0aHVtYlBvc2l0aW9uICogMTAwIC0gMTAwfSUpYH19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIHttYXJrcy5tYXAocG9zaXRpb24gPT4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXtwb3NpdGlvbn1cbiAgICAgICAgICBjc3M9e21hcmtTdHlsZX1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzZXMubWFya2VkfVxuICAgICAgICAgIHN0eWxlPXt7bGVmdDogYCR7KHBvc2l0aW9uIC8gbWF4KSAqIDEwMH0lYH19XG4gICAgICAgIC8+XG4gICAgICApKX1cbiAgICAgIHtvbkNoYW5nZSAmJiAhZGlzYWJsZWQgPyAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjc3M9e3RodW1iU3R5bGV9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc2VzLnRodW1ifVxuICAgICAgICAgIHN0eWxlPXt7bGVmdDogYGNhbGMoJHt0aHVtYlBvc2l0aW9uICogMTAwfSUpYH19XG4gICAgICAgIC8+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2IC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG5cblNpbXBsZVNsaWRlci5wcm9wVHlwZXMgPSB7XG4gIG1pbjogUHJvcFR5cGVzLm51bWJlcixcbiAgbWF4OiBQcm9wVHlwZXMubnVtYmVyLFxuICB2YWx1ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgc2Vjb25kYXJ5VHJhY2tWYWx1ZTogUHJvcFR5cGVzLm51bWJlcixcbiAgbWFya3M6IFByb3BUeXBlcy5hcnJheSxcbiAgY2xhc3NOYW1lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICBjbGFzc2VzOiBQcm9wVHlwZXMub2JqZWN0LFxuICBkaXNhYmxlZDogUHJvcFR5cGVzLmJvb2wsXG4gIG9uUG9pbnRlck1vdmU6IFByb3BUeXBlcy5mdW5jLFxuICBvblBvaW50ZXJMZWF2ZTogUHJvcFR5cGVzLmZ1bmMsXG4gIG9uQ2hhbmdlOiBQcm9wVHlwZXMuZnVuYyxcbiAgb25DaGFuZ2VDb21taXR0ZWQ6IFByb3BUeXBlcy5mdW5jLFxufVxuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGVTbGlkZXJcbiJdfQ== */"],
    onClick: event => event.stopPropagation(),
    ...eventHandlers({
      onPointerDown: event => {
        if (event.type === 'pointerdown') {
          event.currentTarget.setPointerCapture(event.pointerId);
        }

        pointerHandlers.onPointerMove(event);
      },
      ...pointerHandlers,
      onPointerUp: handlePointerUp
    }),
    children: [jsxs("div", {
      className: classes.rail,
      css: railStyle,
      children: [secondaryTrackValue && jsx$1("div", {
        css: _ref$3,
        style: {
          transform: `translateX(${subTrackPosition * 100 - 100}%)`
        }
      }), jsx$1("div", {
        css: _ref2$1,
        className: classes.track,
        style: {
          transform: `translateX(${thumbPosition * 100 - 100}%)`
        }
      })]
    }), marks.map(position => jsx$1("div", {
      css: markStyle,
      className: classes.marked,
      style: {
        left: `${position / max * 100}%`
      }
    }, position)), onChange && !disabled ? jsx$1("div", {
      css: thumbStyle,
      className: classes.thumb,
      style: {
        left: `calc(${thumbPosition * 100}%)`
      }
    }) : jsx$1("div", {})]
  });
};

SimpleSlider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  secondaryTrackValue: PropTypes.number,
  marks: PropTypes.array,
  className: PropTypes.string,
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  onPointerMove: PropTypes.func,
  onPointerLeave: PropTypes.func,
  onChange: PropTypes.func,
  onChangeCommitted: PropTypes.func
};

/* @jsxImportSource @emotion/react */
const seekbarStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  height: '24px',
  fontSize: '75%',
  letterSpacing: '1px',
  color: '#fff'
};
const sliderStyle$1 = {
  flex: 1,
  margin: '0 1em',
  '@media (hover: hover), screen and (-ms-high-contrast: active), (-ms-high-contrast: none)': {
    '> div:last-of-type': {
      opacity: 0,
      transition: 'opacity 0.2s ease-out'
    }
  },
  '&:hover > div:last-of-type': {
    opacity: 1
  }
};

const getSliderStyle = css => ({
  rail: css({
    height: '0.33em'
  }),
  marked: css({
    height: '0.33em'
  }),
  thumb: css({
    width: '1.33em',
    height: '1.33em'
  })
});

const reducePointer = (state, {
  type,
  value,
  x
}) => {
  switch (type) {
    case 'move':
      return { ...state,
        hover: true,
        value,
        x
      };

    case 'change':
      return { ...state,
        focused: true,
        value
      };

    case 'release':
      return { ...state,
        focused: false,
        value
      };

    case 'leave':
      return { ...state,
        hover: false
      };

    default:
      return state;
  }
}; // TODO use className instead of classes ?


const Seekbar$1 = ({
  style,
  classes,
  currentTime,
  bufferTime,
  duration,
  marks,
  play,
  pause,
  seek,
  children,
  ...rest
}) => {
  var _ref$current;

  const [pointerState, dispatchPointer] = useReducer(reducePointer, {});
  const pointerActive = pointerState.hover || pointerState.focused;
  const displayTime = pointerActive ? pointerState.value : currentTime; // to reflect boundary when container resized

  const {
    observe
  } = useDimensions();
  const ref = useRef();
  const rect = (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.getBoundingClientRect();
  const handlers = seek && {
    onPointerMove: (_, {
      value,
      x
    }) => dispatchPointer({
      type: 'move',
      value,
      x
    }),
    onPointerLeave: () => dispatchPointer({
      type: 'leave'
    }),
    onChange: (_, {
      value
    }) => {
      pause();
      dispatchPointer({
        type: 'change',
        value
      });
    },
    onChangeCommitted: (_, {
      value
    }) => {
      dispatchPointer({
        type: 'release',
        value
      });
      seek(value);
      play();
    }
  };
  return jsxs("div", {
    ref: element => {
      observe(element);
      ref.current = element;
    },
    className: "kks-player__seek-bar",
    css: [seekbarStyle, style, process.env.NODE_ENV === "production" ? "" : ";label:Seekbar;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlZWtiYXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0dNIiwiZmlsZSI6IlNlZWtiYXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge3VzZVJlZHVjZXIsIHVzZVJlZiwgY2xvbmVFbGVtZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7Q2xhc3NOYW1lc30gZnJvbSAnQGVtb3Rpb24vcmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgdXNlRGltZW5zaW9ucyBmcm9tICdyZWFjdC1jb29sLWRpbWVuc2lvbnMnXG5cbmltcG9ydCBTaW1wbGVTbGlkZXIgZnJvbSAncGxheWVyVWkvU2ltcGxlU2xpZGVyJ1xuaW1wb3J0IGZvcm1hdHRlZFRpbWUgZnJvbSAndXRpbC9mb3JtYXR0ZWRUaW1lJ1xuXG5jb25zdCBzZWVrYmFyU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcyNHB4JyxcbiAgZm9udFNpemU6ICc3NSUnLFxuICBsZXR0ZXJTcGFjaW5nOiAnMXB4JyxcbiAgY29sb3I6ICcjZmZmJyxcbn1cblxuY29uc3Qgc2xpZGVyU3R5bGUgPSB7XG4gIGZsZXg6IDEsXG4gIG1hcmdpbjogJzAgMWVtJyxcbiAgJ0BtZWRpYSAoaG92ZXI6IGhvdmVyKSwgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6IGFjdGl2ZSksICgtbXMtaGlnaC1jb250cmFzdDogbm9uZSknOlxuICAgIHtcbiAgICAgICc+IGRpdjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgICAgIG9wYWNpdHk6IDAsXG4gICAgICAgIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMgZWFzZS1vdXQnLFxuICAgICAgfSxcbiAgICB9LFxuICAnJjpob3ZlciA+IGRpdjpsYXN0LW9mLXR5cGUnOiB7XG4gICAgb3BhY2l0eTogMSxcbiAgfSxcbn1cblxuY29uc3QgZ2V0U2xpZGVyU3R5bGUgPSBjc3MgPT4gKHtcbiAgcmFpbDogY3NzKHtoZWlnaHQ6ICcwLjMzZW0nfSksXG4gIG1hcmtlZDogY3NzKHtoZWlnaHQ6ICcwLjMzZW0nfSksXG4gIHRodW1iOiBjc3Moe3dpZHRoOiAnMS4zM2VtJywgaGVpZ2h0OiAnMS4zM2VtJ30pLFxufSlcblxuY29uc3QgcmVkdWNlUG9pbnRlciA9IChzdGF0ZSwge3R5cGUsIHZhbHVlLCB4fSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdtb3ZlJzpcbiAgICAgIHJldHVybiB7Li4uc3RhdGUsIGhvdmVyOiB0cnVlLCB2YWx1ZSwgeH1cbiAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgZm9jdXNlZDogdHJ1ZSwgdmFsdWV9XG4gICAgY2FzZSAncmVsZWFzZSc6XG4gICAgICByZXR1cm4gey4uLnN0YXRlLCBmb2N1c2VkOiBmYWxzZSwgdmFsdWV9XG4gICAgY2FzZSAnbGVhdmUnOlxuICAgICAgcmV0dXJuIHsuLi5zdGF0ZSwgaG92ZXI6IGZhbHNlfVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vLyBUT0RPIHVzZSBjbGFzc05hbWUgaW5zdGVhZCBvZiBjbGFzc2VzID9cbmNvbnN0IFNlZWtiYXIgPSAoe1xuICBzdHlsZSxcbiAgY2xhc3NlcyxcbiAgY3VycmVudFRpbWUsXG4gIGJ1ZmZlclRpbWUsXG4gIGR1cmF0aW9uLFxuICBtYXJrcyxcbiAgcGxheSxcbiAgcGF1c2UsXG4gIHNlZWssXG4gIGNoaWxkcmVuLFxuICAuLi5yZXN0XG59KSA9PiB7XG4gIGNvbnN0IFtwb2ludGVyU3RhdGUsIGRpc3BhdGNoUG9pbnRlcl0gPSB1c2VSZWR1Y2VyKHJlZHVjZVBvaW50ZXIsIHt9KVxuICBjb25zdCBwb2ludGVyQWN0aXZlID0gcG9pbnRlclN0YXRlLmhvdmVyIHx8IHBvaW50ZXJTdGF0ZS5mb2N1c2VkXG4gIGNvbnN0IGRpc3BsYXlUaW1lID0gcG9pbnRlckFjdGl2ZSA/IHBvaW50ZXJTdGF0ZS52YWx1ZSA6IGN1cnJlbnRUaW1lXG4gIC8vIHRvIHJlZmxlY3QgYm91bmRhcnkgd2hlbiBjb250YWluZXIgcmVzaXplZFxuICBjb25zdCB7b2JzZXJ2ZX0gPSB1c2VEaW1lbnNpb25zKClcbiAgY29uc3QgcmVmID0gdXNlUmVmKClcbiAgY29uc3QgcmVjdCA9IHJlZi5jdXJyZW50Py5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICBjb25zdCBoYW5kbGVycyA9IHNlZWsgJiYge1xuICAgIG9uUG9pbnRlck1vdmU6IChfLCB7dmFsdWUsIHh9KSA9PiBkaXNwYXRjaFBvaW50ZXIoe3R5cGU6ICdtb3ZlJywgdmFsdWUsIHh9KSxcbiAgICBvblBvaW50ZXJMZWF2ZTogKCkgPT4gZGlzcGF0Y2hQb2ludGVyKHt0eXBlOiAnbGVhdmUnfSksXG4gICAgb25DaGFuZ2U6IChfLCB7dmFsdWV9KSA9PiB7XG4gICAgICBwYXVzZSgpXG4gICAgICBkaXNwYXRjaFBvaW50ZXIoe3R5cGU6ICdjaGFuZ2UnLCB2YWx1ZX0pXG4gICAgfSxcbiAgICBvbkNoYW5nZUNvbW1pdHRlZDogKF8sIHt2YWx1ZX0pID0+IHtcbiAgICAgIGRpc3BhdGNoUG9pbnRlcih7dHlwZTogJ3JlbGVhc2UnLCB2YWx1ZX0pXG4gICAgICBzZWVrKHZhbHVlKVxuICAgICAgcGxheSgpXG4gICAgfSxcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXtlbGVtZW50ID0+IHtcbiAgICAgICAgb2JzZXJ2ZShlbGVtZW50KVxuICAgICAgICByZWYuY3VycmVudCA9IGVsZW1lbnRcbiAgICAgIH19XG4gICAgICBjbGFzc05hbWU9XCJra3MtcGxheWVyX19zZWVrLWJhclwiXG4gICAgICBjc3M9e1tzZWVrYmFyU3R5bGUsIHN0eWxlXX1cbiAgICAgIHN0eWxlPXtcbiAgICAgICAgcmVjdCAmJiB7XG4gICAgICAgICAgJy0tc2Vla2Jhci1sZWZ0JzogYCR7cmVjdC5sZWZ0fXB4YCxcbiAgICAgICAgICAnLS1zZWVrYmFyLXJpZ2h0JzogYCR7cmVjdC5yaWdodH1weGAsXG4gICAgICAgICAgJy0tcG9pbnRlci14JzogYCR7cG9pbnRlclN0YXRlLnh9cHhgLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgPlxuICAgICAge2Zvcm1hdHRlZFRpbWUoZGlzcGxheVRpbWUpfVxuICAgICAgPENsYXNzTmFtZXM+XG4gICAgICAgIHsoe2Nzc30pID0+IChcbiAgICAgICAgICA8U2ltcGxlU2xpZGVyXG4gICAgICAgICAgICBjc3M9e3NsaWRlclN0eWxlfVxuICAgICAgICAgICAgY2xhc3Nlcz17e1xuICAgICAgICAgICAgICB0cmFjazogY3NzKHtiYWNrZ3JvdW5kQ29sb3I6ICdyZWQnfSksXG4gICAgICAgICAgICAgIC4uLmdldFNsaWRlclN0eWxlKGNzcyksXG4gICAgICAgICAgICAgIC4uLmNsYXNzZXMsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyFzZWVrfVxuICAgICAgICAgICAgc2Vjb25kYXJ5VHJhY2tWYWx1ZT17YnVmZmVyVGltZX1cbiAgICAgICAgICAgIC8vIGxpbmVhciBjaGFubmVsIGhhdmUgdGltZSAvIGR1cmF0aW9uIGRpc3BsYXksIGJ1dCBzZWVraW5nIGlzIGRpc2FibGVkLCBhbmQgc2hvdWxkIGRpc3BsYXkgZmlsbGVkXG4gICAgICAgICAgICB2YWx1ZT17c2VlayA/IGN1cnJlbnRUaW1lIDogZHVyYXRpb259XG4gICAgICAgICAgICBtYXg9e2R1cmF0aW9ufVxuICAgICAgICAgICAgbWFya3M9e21hcmtzfVxuICAgICAgICAgICAgey4uLmhhbmRsZXJzfVxuICAgICAgICAgICAgey4uLnJlc3R9XG4gICAgICAgICAgLz5cbiAgICAgICAgKX1cbiAgICAgIDwvQ2xhc3NOYW1lcz5cbiAgICAgIHtmb3JtYXR0ZWRUaW1lKGR1cmF0aW9uKX1cbiAgICAgIHtjaGlsZHJlbiAmJlxuICAgICAgICBbXVxuICAgICAgICAgIC5jb25jYXQoY2hpbGRyZW4pXG4gICAgICAgICAgLm1hcChjaGlsZCA9PlxuICAgICAgICAgICAgY2xvbmVFbGVtZW50KGNoaWxkLCB7dGltZTogcG9pbnRlckFjdGl2ZSAmJiBkaXNwbGF5VGltZX0pXG4gICAgICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5TZWVrYmFyLnByb3BUeXBlcyA9IHtcbiAgc3R5bGU6IFByb3BUeXBlcy5vYmplY3QsXG4gIGNsYXNzZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gIGN1cnJlbnRUaW1lOiBQcm9wVHlwZXMubnVtYmVyLFxuICBidWZmZXJUaW1lOiBQcm9wVHlwZXMubnVtYmVyLFxuICBkdXJhdGlvbjogUHJvcFR5cGVzLm51bWJlcixcbiAgbWFya3M6IFByb3BUeXBlcy5hcnJheSxcbiAgcGxheTogUHJvcFR5cGVzLmZ1bmMsXG4gIHBhdXNlOiBQcm9wVHlwZXMuZnVuYyxcbiAgc2VlazogUHJvcFR5cGVzLmZ1bmMsXG4gIGRpc2FibGVkOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWVrYmFyXG4iXX0= */"],
    style: rect && {
      '--seekbar-left': `${rect.left}px`,
      '--seekbar-right': `${rect.right}px`,
      '--pointer-x': `${pointerState.x}px`
    },
    children: [formattedTime(displayTime), jsx$1(ClassNames, {
      children: ({
        css
      }) => jsx$1(SimpleSlider, {
        css: sliderStyle$1,
        classes: {
          track: css({
            backgroundColor: 'red'
          }),
          ...getSliderStyle(css),
          ...classes
        },
        disabled: !seek,
        secondaryTrackValue: bufferTime // linear channel have time / duration display, but seeking is disabled, and should display filled
        ,
        value: seek ? currentTime : duration,
        max: duration,
        marks: marks,
        ...handlers,
        ...rest
      })
    }), formattedTime(duration), children && [].concat(children).map(child => /*#__PURE__*/cloneElement(child, {
      time: pointerActive && displayTime
    }))]
  });
};

Seekbar$1.propTypes = {
  style: PropTypes.object,
  classes: PropTypes.object,
  currentTime: PropTypes.number,
  bufferTime: PropTypes.number,
  duration: PropTypes.number,
  marks: PropTypes.array,
  play: PropTypes.func,
  pause: PropTypes.func,
  seek: PropTypes.func,
  disabled: PropTypes.bool,
  children: PropTypes.node
};

/* @jsxImportSource @emotion/react */
const rotateInfinite = keyframes`
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100%  {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(360deg); 
  }
`;
const style$7 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  display: 'block',
  height: '3em',
  width: '3em',
  border: '0.25em solid #f22e05',
  borderRightColor: 'transparent',
  borderRadius: '50%',
  opacity: 0,
  animation: `${rotateInfinite} 1.2s linear infinite`
};

const LoadingSpinner = () => jsx$1("div", {
  className: "kks-player__loading",
  css: style$7
});

/* @jsxImportSource @emotion/react */
const ulReset = {
  marginBlockStart: 0,
  marginBlockEnd: 0,
  paddingInlineStart: 0
};
const mobileStyle = {
  head: {
    position: 'sticky',
    zIndex: '1',
    top: '0',
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.5rem',
    color: 'white',
    backgroundColor: 'inherit',
    fontSize: '16px',
    fontWeight: 'bold',
    button: {
      marginRight: '1rem',
      padding: '0',
      width: '1rem',
      height: '1rem',
      border: 'none'
    }
  },
  overlay: {
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    opacity: '0',
    transform: 'translateY(-100%)',
    transition: 'opacity 0.2s ease, transform 0s ease 0.2s',
    ul: ulReset
  },
  container: {
    flex: '0 18rem',
    maxHeight: 'calc(100% - 2rem)',
    color: '#ccc',
    background: '#333333',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
    userSelect: 'none',
    overflow: 'auto'
  },
  open: {
    opacity: '1',
    transform: 'translateY(0)',
    transition: 'opacity 0.2s ease, trasform 0s'
  },
  title: {
    padding: '12px 18px'
  },
  dismiss: {
    background: `center / 1rem no-repeat url(${icon.close}), transparent`
  },
  back: {
    background: `center / 1rem no-repeat url(${icon.back}), transparent`
  },
  row: {
    cursor: 'pointer',
    display: 'flex',
    padding: '1rem 1.5rem',
    fontSize: '16px',
    '::after': {
      content: '" "',
      marginLeft: '1rem',
      width: '20px',
      height: '20px',
      display: 'inline-block',
      color: 'white',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }
  },
  space: {
    flex: '1'
  },
  hasOptions: {
    '::after': {
      backgroundImage: `url(${icon.arrowTop})`,
      transform: 'rotate(90deg)'
    }
  },
  selected: {
    color: 'white',
    '::after': {
      backgroundImage: `url(${icon.check})`
    }
  }
}; // TODO some of styles are for older version UI design, can be simplified

const dekstopStyle = {
  overlay: {
    position: 'absolute',
    bottom: 'calc(5em + var(--bottom-spacing, 0rem))',
    right: '3rem',
    display: 'flex',
    alignItems: 'flex-end',
    width: '15rem',
    height: 'calc(100% - 8rem - var(--bottom-spacing, 0rem))',
    outline: 'none',
    opacity: '0',
    transform: 'translateY(-100vh)',
    ul: ulReset
  },
  container: { ...mobileStyle.container,
    maxHeight: '100%',
    background: 'rgba(0, 0, 0, 0.7)'
  },
  head: { ...mobileStyle.head,
    background: '#000'
  },
  row: { ...mobileStyle.row,
    '::before': { ...mobileStyle.row['::after'],
      marginLeft: '0',
      marginRight: '4px'
    }
  },
  hasOptions: {
    '::before': {
      display: 'none'
    },
    '::after': {
      backgroundImage: `url(${icon.arrowTop})`,
      transform: 'rotate(90deg)'
    }
  },
  selected: {
    '::before': {
      backgroundImage: `url(${icon.check})`
    }
  }
};

const MenuItemText = ({
  text = ''
}) => jsx$1(FormattedMessage, {
  id: text,
  defaultMessage: jsx$1(FormattedMessage, {
    id: `KKS.SETTING.${text}`,
    defaultMessage: text
  })
});

MenuItemText.propTypes = {
  text: PropTypes.string
};

const CloseButton = props => jsx$1("button", {
  type: "button",
  "aria-label": "Close Settings",
  css: mobileStyle.dismiss,
  ...props
});

const BackButton = props => jsx$1("button", {
  type: "button",
  "aria-label": "Back",
  css: mobileStyle.back,
  ...props
});

const Settings = ({
  open,
  values,
  sections,
  type,
  style,
  onChange,
  onOpen,
  onClose
}) => {
  const commonStyle = type === 'desktop' ? dekstopStyle : mobileStyle;
  const [path, setPath] = useState('/');
  useEffect(() => {
    if (!open) {
      setPath('/');
    }
  }, [open]);
  const ref = useOnclickOutside(() => {
    if (open) {
      onClose();
    }
  }, {
    eventTypes: ['click']
  });
  const currentSection = sections.find(it => path === `/${it.name}`);
  const menu = path === '/' ? {
    title: 'KKS.SETTING',
    items: sections.map(({
      name,
      title,
      items
    }) => {
      var _items$find;

      return {
        link: `/${name}`,
        label: title,
        value: ((_items$find = items.find(item => item.value === values[name])) === null || _items$find === void 0 ? void 0 : _items$find.label) || values[name]
      };
    })
  } : {
    title: currentSection.title,
    items: currentSection.items.map(({
      value,
      label = value
    }) => ({
      label,
      checked: values[currentSection.name] === value,
      data: value
    })),
    previous: '/'
  };

  const navigate = dest => requestAnimationFrame(() => setPath(dest));

  return jsxs("div", {
    // TODO replace with <Backdrop>
    role: "menu",
    tabIndex: "0",
    css: [commonStyle.overlay, open && mobileStyle.open, style, process.env.NODE_ENV === "production" ? "" : ";label:Settings;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTJPTSIsImZpbGUiOiJTZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7dXNlU3RhdGUsIHVzZUVmZmVjdH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgdXNlT25jbGlja091dHNpZGUgZnJvbSAncmVhY3QtY29vbC1vbmNsaWNrb3V0c2lkZSdcblxuaW1wb3J0IGljb24gZnJvbSAnc3R5bGUvaWNvbidcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZX0gZnJvbSAnY29udGV4dC9JMThuJ1xuaW1wb3J0IHtGdW5jdGlvbkJhckV4dGVuc2lvbn0gZnJvbSAnLi91aUV4dGVuc2lvbnMnXG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi9idXR0b25zJ1xuXG5jb25zdCB1bFJlc2V0ID0ge1xuICBtYXJnaW5CbG9ja1N0YXJ0OiAwLFxuICBtYXJnaW5CbG9ja0VuZDogMCxcbiAgcGFkZGluZ0lubGluZVN0YXJ0OiAwLFxufVxuXG5jb25zdCBtb2JpbGVTdHlsZSA9IHtcbiAgaGVhZDoge1xuICAgIHBvc2l0aW9uOiAnc3RpY2t5JyxcbiAgICB6SW5kZXg6ICcxJyxcbiAgICB0b3A6ICcwJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgcGFkZGluZzogJzFyZW0gMS41cmVtJyxcbiAgICBjb2xvcjogJ3doaXRlJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdpbmhlcml0JyxcbiAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICBidXR0b246IHtcbiAgICAgIG1hcmdpblJpZ2h0OiAnMXJlbScsXG4gICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICB3aWR0aDogJzFyZW0nLFxuICAgICAgaGVpZ2h0OiAnMXJlbScsXG4gICAgICBib3JkZXI6ICdub25lJyxcbiAgICB9LFxuICB9LFxuICBvdmVybGF5OiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMCcsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC42KScsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwMCUpJyxcbiAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjJzIGVhc2UsIHRyYW5zZm9ybSAwcyBlYXNlIDAuMnMnLFxuICAgIHVsOiB1bFJlc2V0LFxuICB9LFxuICBjb250YWluZXI6IHtcbiAgICBmbGV4OiAnMCAxOHJlbScsXG4gICAgbWF4SGVpZ2h0OiAnY2FsYygxMDAlIC0gMnJlbSknLFxuICAgIGNvbG9yOiAnI2NjYycsXG4gICAgYmFja2dyb3VuZDogJyMzMzMzMzMnLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgIG92ZXJmbG93OiAnYXV0bycsXG4gIH0sXG4gIG9wZW46IHtcbiAgICBvcGFjaXR5OiAnMScsXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBlYXNlLCB0cmFzZm9ybSAwcycsXG4gIH0sXG4gIHRpdGxlOiB7XG4gICAgcGFkZGluZzogJzEycHggMThweCcsXG4gIH0sXG4gIGRpc21pc3M6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5jbG9zZX0pLCB0cmFuc3BhcmVudGAsXG4gIH0sXG4gIGJhY2s6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5iYWNrfSksIHRyYW5zcGFyZW50YCxcbiAgfSxcbiAgcm93OiB7XG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBhZGRpbmc6ICcxcmVtIDEuNXJlbScsXG4gICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGNvbnRlbnQ6ICdcIiBcIicsXG4gICAgICBtYXJnaW5MZWZ0OiAnMXJlbScsXG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgIH0sXG4gIH0sXG4gIHNwYWNlOiB7XG4gICAgZmxleDogJzEnLFxuICB9LFxuICBoYXNPcHRpb25zOiB7XG4gICAgJzo6YWZ0ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScsXG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ljb24uY2hlY2t9KWAsXG4gICAgfSxcbiAgfSxcbn1cblxuLy8gVE9ETyBzb21lIG9mIHN0eWxlcyBhcmUgZm9yIG9sZGVyIHZlcnNpb24gVUkgZGVzaWduLCBjYW4gYmUgc2ltcGxpZmllZFxuY29uc3QgZGVrc3RvcFN0eWxlID0ge1xuICBvdmVybGF5OiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgYm90dG9tOiAnY2FsYyg1ZW0gKyB2YXIoLS1ib3R0b20tc3BhY2luZywgMHJlbSkpJyxcbiAgICByaWdodDogJzNyZW0nLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLFxuICAgIHdpZHRoOiAnMTVyZW0nLFxuICAgIGhlaWdodDogJ2NhbGMoMTAwJSAtIDhyZW0gLSB2YXIoLS1ib3R0b20tc3BhY2luZywgMHJlbSkpJyxcbiAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwMHZoKScsXG4gICAgdWw6IHVsUmVzZXQsXG4gIH0sXG4gIGNvbnRhaW5lcjoge1xuICAgIC4uLm1vYmlsZVN0eWxlLmNvbnRhaW5lcixcbiAgICBtYXhIZWlnaHQ6ICcxMDAlJyxcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjcpJyxcbiAgfSxcbiAgaGVhZDoge1xuICAgIC4uLm1vYmlsZVN0eWxlLmhlYWQsXG4gICAgYmFja2dyb3VuZDogJyMwMDAnLFxuICB9LFxuICByb3c6IHtcbiAgICAuLi5tb2JpbGVTdHlsZS5yb3csXG4gICAgJzo6YmVmb3JlJzoge1xuICAgICAgLi4ubW9iaWxlU3R5bGUucm93Wyc6OmFmdGVyJ10sXG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgICBtYXJnaW5SaWdodDogJzRweCcsXG4gICAgfSxcbiAgfSxcbiAgaGFzT3B0aW9uczoge1xuICAgICc6OmJlZm9yZSc6IHtcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICB9LFxuICAgICc6OmFmdGVyJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5hcnJvd1RvcH0pYCxcbiAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknLFxuICAgIH0sXG4gIH0sXG4gIHNlbGVjdGVkOiB7XG4gICAgJzo6YmVmb3JlJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5jaGVja30pYCxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBNZW51SXRlbVRleHQgPSAoe3RleHQgPSAnJ30pID0+IChcbiAgPEZvcm1hdHRlZE1lc3NhZ2VcbiAgICBpZD17dGV4dH1cbiAgICBkZWZhdWx0TWVzc2FnZT17XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17YEtLUy5TRVRUSU5HLiR7dGV4dH1gfSBkZWZhdWx0TWVzc2FnZT17dGV4dH0gLz5cbiAgICB9XG4gIC8+XG4pXG5cbk1lbnVJdGVtVGV4dC5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG59XG5cbmNvbnN0IENsb3NlQnV0dG9uID0gcHJvcHMgPT4gKFxuICA8YnV0dG9uXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgYXJpYS1sYWJlbD1cIkNsb3NlIFNldHRpbmdzXCJcbiAgICBjc3M9e21vYmlsZVN0eWxlLmRpc21pc3N9XG4gICAgey4uLnByb3BzfVxuICAvPlxuKVxuXG5jb25zdCBCYWNrQnV0dG9uID0gcHJvcHMgPT4gKFxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiQmFja1wiIGNzcz17bW9iaWxlU3R5bGUuYmFja30gey4uLnByb3BzfSAvPlxuKVxuXG5jb25zdCBTZXR0aW5ncyA9ICh7XG4gIG9wZW4sXG4gIHZhbHVlcyxcbiAgc2VjdGlvbnMsXG4gIHR5cGUsXG4gIHN0eWxlLFxuICBvbkNoYW5nZSxcbiAgb25PcGVuLFxuICBvbkNsb3NlLFxufSkgPT4ge1xuICBjb25zdCBjb21tb25TdHlsZSA9IHR5cGUgPT09ICdkZXNrdG9wJyA/IGRla3N0b3BTdHlsZSA6IG1vYmlsZVN0eWxlXG4gIGNvbnN0IFtwYXRoLCBzZXRQYXRoXSA9IHVzZVN0YXRlKCcvJylcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4pIHtcbiAgICAgIHNldFBhdGgoJy8nKVxuICAgIH1cbiAgfSwgW29wZW5dKVxuXG4gIGNvbnN0IHJlZiA9IHVzZU9uY2xpY2tPdXRzaWRlKFxuICAgICgpID0+IHtcbiAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgIG9uQ2xvc2UoKVxuICAgICAgfVxuICAgIH0sXG4gICAge2V2ZW50VHlwZXM6IFsnY2xpY2snXX1cbiAgKVxuICBjb25zdCBjdXJyZW50U2VjdGlvbiA9IHNlY3Rpb25zLmZpbmQoaXQgPT4gcGF0aCA9PT0gYC8ke2l0Lm5hbWV9YClcbiAgY29uc3QgbWVudSA9XG4gICAgcGF0aCA9PT0gJy8nXG4gICAgICA/IHtcbiAgICAgICAgICB0aXRsZTogJ0tLUy5TRVRUSU5HJyxcbiAgICAgICAgICBpdGVtczogc2VjdGlvbnMubWFwKCh7bmFtZSwgdGl0bGUsIGl0ZW1zfSkgPT4gKHtcbiAgICAgICAgICAgIGxpbms6IGAvJHtuYW1lfWAsXG4gICAgICAgICAgICBsYWJlbDogdGl0bGUsXG4gICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgICAgICAgaXRlbXMuZmluZChpdGVtID0+IGl0ZW0udmFsdWUgPT09IHZhbHVlc1tuYW1lXSk/LmxhYmVsIHx8XG4gICAgICAgICAgICAgIHZhbHVlc1tuYW1lXSxcbiAgICAgICAgICB9KSksXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIHRpdGxlOiBjdXJyZW50U2VjdGlvbi50aXRsZSxcbiAgICAgICAgICBpdGVtczogY3VycmVudFNlY3Rpb24uaXRlbXMubWFwKCh7dmFsdWUsIGxhYmVsID0gdmFsdWV9KSA9PiAoe1xuICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICBjaGVja2VkOiB2YWx1ZXNbY3VycmVudFNlY3Rpb24ubmFtZV0gPT09IHZhbHVlLFxuICAgICAgICAgICAgZGF0YTogdmFsdWUsXG4gICAgICAgICAgfSkpLFxuICAgICAgICAgIHByZXZpb3VzOiAnLycsXG4gICAgICAgIH1cbiAgY29uc3QgbmF2aWdhdGUgPSBkZXN0ID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBzZXRQYXRoKGRlc3QpKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiAvLyBUT0RPIHJlcGxhY2Ugd2l0aCA8QmFja2Ryb3A+XG4gICAgICByb2xlPVwibWVudVwiXG4gICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgY3NzPXtbY29tbW9uU3R5bGUub3ZlcmxheSwgb3BlbiAmJiBtb2JpbGVTdHlsZS5vcGVuLCBzdHlsZV19XG4gICAgICBvbkNsaWNrPXtldmVudCA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICA+XG4gICAgICA8RnVuY3Rpb25CYXJFeHRlbnNpb24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBzdGFydEljb249XCJzZXR0aW5nXCJcbiAgICAgICAgICB0aXRsZT1cIktLUy5TRVRUSU5HXCJcbiAgICAgICAgICBkaXNhYmxlZD17c2VjdGlvbnMubGVuZ3RoID09PSAwfVxuICAgICAgICAgIG9uQ2xpY2s9e29uT3Blbn1cbiAgICAgICAgLz5cbiAgICAgIDwvRnVuY3Rpb25CYXJFeHRlbnNpb24+XG4gICAgICA8dWwgcm9sZT1cIm1lbnVcIiByZWY9e3JlZn0gY3NzPXtjb21tb25TdHlsZS5jb250YWluZXJ9PlxuICAgICAgICA8ZGl2IGNzcz17Y29tbW9uU3R5bGUuaGVhZH0+XG4gICAgICAgICAge21lbnUucHJldmlvdXMgPyAoXG4gICAgICAgICAgICA8QmFja0J1dHRvbiBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnLycpfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICB0eXBlICE9PSAnZGVza3RvcCcgJiYgPENsb3NlQnV0dG9uIG9uQ2xpY2s9e29uQ2xvc2V9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17bWVudS50aXRsZX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHttZW51Lml0ZW1zLm1hcCgoe2xhYmVsLCBsaW5rLCB2YWx1ZSwgZGF0YSwgY2hlY2tlZH0pID0+IChcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnNcbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIHJvbGU9e2xpbmsgPyAnbWVudWl0ZW0nIDogJ21lbnVpdGVtcmFkaW8nfVxuICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtjaGVja2VkfVxuICAgICAgICAgICAgY3NzPXtbXG4gICAgICAgICAgICAgIGNvbW1vblN0eWxlLnJvdyxcbiAgICAgICAgICAgICAgbGluayAmJiBjb21tb25TdHlsZS5oYXNPcHRpb25zLFxuICAgICAgICAgICAgICBjaGVja2VkICYmIGNvbW1vblN0eWxlLnNlbGVjdGVkLFxuICAgICAgICAgICAgXX1cbiAgICAgICAgICAgIGtleT17bGFiZWx9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICBsaW5rXG4gICAgICAgICAgICAgICAgPyBuYXZpZ2F0ZShsaW5rKVxuICAgICAgICAgICAgICAgIDogb25DaGFuZ2Uoe25hbWU6IGN1cnJlbnRTZWN0aW9uLm5hbWUsIHZhbHVlOiBkYXRhfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TWVudUl0ZW1UZXh0IHRleHQ9e2xhYmVsfSAvPlxuICAgICAgICAgICAgPGRpdiBjc3M9e21vYmlsZVN0eWxlLnNwYWNlfSAvPlxuICAgICAgICAgICAge3ZhbHVlICYmIDxNZW51SXRlbVRleHQgdGV4dD17dmFsdWV9IC8+fVxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICkpfVxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5TZXR0aW5ncy5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHNlY3Rpb25zOiBQcm9wVHlwZXMuYXJyYXksXG4gIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHN0eWxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBvbk9wZW46IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NcbiJdfQ== */"],
    onClick: event => event.stopPropagation(),
    children: [jsx$1(FunctionBarExtension, {
      children: jsx$1(Button, {
        startIcon: "setting",
        title: "KKS.SETTING",
        disabled: sections.length === 0,
        onClick: onOpen
      })
    }), jsxs("ul", {
      role: "menu",
      ref: ref,
      css: commonStyle.container,
      children: [jsxs("div", {
        css: commonStyle.head,
        children: [menu.previous ? jsx$1(BackButton, {
          onClick: () => navigate('/')
        }) : type !== 'desktop' && jsx$1(CloseButton, {
          onClick: onClose
        }), jsx$1(FormattedMessage, {
          id: menu.title
        })]
      }), menu.items.map(({
        label,
        link,
        value,
        data,
        checked
      }) => // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      jsxs("li", {
        role: link ? 'menuitem' : 'menuitemradio',
        "aria-checked": checked,
        css: [commonStyle.row, link && commonStyle.hasOptions, checked && commonStyle.selected, process.env.NODE_ENV === "production" ? "" : ";label:Settings;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNldHRpbmdzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9RWSIsImZpbGUiOiJTZXR0aW5ncy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7dXNlU3RhdGUsIHVzZUVmZmVjdH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5pbXBvcnQgdXNlT25jbGlja091dHNpZGUgZnJvbSAncmVhY3QtY29vbC1vbmNsaWNrb3V0c2lkZSdcblxuaW1wb3J0IGljb24gZnJvbSAnc3R5bGUvaWNvbidcbmltcG9ydCB7Rm9ybWF0dGVkTWVzc2FnZX0gZnJvbSAnY29udGV4dC9JMThuJ1xuaW1wb3J0IHtGdW5jdGlvbkJhckV4dGVuc2lvbn0gZnJvbSAnLi91aUV4dGVuc2lvbnMnXG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi9idXR0b25zJ1xuXG5jb25zdCB1bFJlc2V0ID0ge1xuICBtYXJnaW5CbG9ja1N0YXJ0OiAwLFxuICBtYXJnaW5CbG9ja0VuZDogMCxcbiAgcGFkZGluZ0lubGluZVN0YXJ0OiAwLFxufVxuXG5jb25zdCBtb2JpbGVTdHlsZSA9IHtcbiAgaGVhZDoge1xuICAgIHBvc2l0aW9uOiAnc3RpY2t5JyxcbiAgICB6SW5kZXg6ICcxJyxcbiAgICB0b3A6ICcwJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgcGFkZGluZzogJzFyZW0gMS41cmVtJyxcbiAgICBjb2xvcjogJ3doaXRlJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdpbmhlcml0JyxcbiAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICBidXR0b246IHtcbiAgICAgIG1hcmdpblJpZ2h0OiAnMXJlbScsXG4gICAgICBwYWRkaW5nOiAnMCcsXG4gICAgICB3aWR0aDogJzFyZW0nLFxuICAgICAgaGVpZ2h0OiAnMXJlbScsXG4gICAgICBib3JkZXI6ICdub25lJyxcbiAgICB9LFxuICB9LFxuICBvdmVybGF5OiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgdG9wOiAnMCcsXG4gICAgd2lkdGg6ICcxMDAlJyxcbiAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC42KScsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwMCUpJyxcbiAgICB0cmFuc2l0aW9uOiAnb3BhY2l0eSAwLjJzIGVhc2UsIHRyYW5zZm9ybSAwcyBlYXNlIDAuMnMnLFxuICAgIHVsOiB1bFJlc2V0LFxuICB9LFxuICBjb250YWluZXI6IHtcbiAgICBmbGV4OiAnMCAxOHJlbScsXG4gICAgbWF4SGVpZ2h0OiAnY2FsYygxMDAlIC0gMnJlbSknLFxuICAgIGNvbG9yOiAnI2NjYycsXG4gICAgYmFja2dyb3VuZDogJyMzMzMzMzMnLFxuICAgIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgdXNlclNlbGVjdDogJ25vbmUnLFxuICAgIG92ZXJmbG93OiAnYXV0bycsXG4gIH0sXG4gIG9wZW46IHtcbiAgICBvcGFjaXR5OiAnMScsXG4gICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC4ycyBlYXNlLCB0cmFzZm9ybSAwcycsXG4gIH0sXG4gIHRpdGxlOiB7XG4gICAgcGFkZGluZzogJzEycHggMThweCcsXG4gIH0sXG4gIGRpc21pc3M6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5jbG9zZX0pLCB0cmFuc3BhcmVudGAsXG4gIH0sXG4gIGJhY2s6IHtcbiAgICBiYWNrZ3JvdW5kOiBgY2VudGVyIC8gMXJlbSBuby1yZXBlYXQgdXJsKCR7aWNvbi5iYWNrfSksIHRyYW5zcGFyZW50YCxcbiAgfSxcbiAgcm93OiB7XG4gICAgY3Vyc29yOiAncG9pbnRlcicsXG4gICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgIHBhZGRpbmc6ICcxcmVtIDEuNXJlbScsXG4gICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGNvbnRlbnQ6ICdcIiBcIicsXG4gICAgICBtYXJnaW5MZWZ0OiAnMXJlbScsXG4gICAgICB3aWR0aDogJzIwcHgnLFxuICAgICAgaGVpZ2h0OiAnMjBweCcsXG4gICAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgYmFja2dyb3VuZFBvc2l0aW9uOiAnY2VudGVyJyxcbiAgICAgIGJhY2tncm91bmRTaXplOiAnY292ZXInLFxuICAgIH0sXG4gIH0sXG4gIHNwYWNlOiB7XG4gICAgZmxleDogJzEnLFxuICB9LFxuICBoYXNPcHRpb25zOiB7XG4gICAgJzo6YWZ0ZXInOiB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICAgICAgdHJhbnNmb3JtOiAncm90YXRlKDkwZGVnKScsXG4gICAgfSxcbiAgfSxcbiAgc2VsZWN0ZWQ6IHtcbiAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAnOjphZnRlcic6IHtcbiAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ljb24uY2hlY2t9KWAsXG4gICAgfSxcbiAgfSxcbn1cblxuLy8gVE9ETyBzb21lIG9mIHN0eWxlcyBhcmUgZm9yIG9sZGVyIHZlcnNpb24gVUkgZGVzaWduLCBjYW4gYmUgc2ltcGxpZmllZFxuY29uc3QgZGVrc3RvcFN0eWxlID0ge1xuICBvdmVybGF5OiB7XG4gICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgYm90dG9tOiAnY2FsYyg1ZW0gKyB2YXIoLS1ib3R0b20tc3BhY2luZywgMHJlbSkpJyxcbiAgICByaWdodDogJzNyZW0nLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBhbGlnbkl0ZW1zOiAnZmxleC1lbmQnLFxuICAgIHdpZHRoOiAnMTVyZW0nLFxuICAgIGhlaWdodDogJ2NhbGMoMTAwJSAtIDhyZW0gLSB2YXIoLS1ib3R0b20tc3BhY2luZywgMHJlbSkpJyxcbiAgICBvdXRsaW5lOiAnbm9uZScsXG4gICAgb3BhY2l0eTogJzAnLFxuICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTEwMHZoKScsXG4gICAgdWw6IHVsUmVzZXQsXG4gIH0sXG4gIGNvbnRhaW5lcjoge1xuICAgIC4uLm1vYmlsZVN0eWxlLmNvbnRhaW5lcixcbiAgICBtYXhIZWlnaHQ6ICcxMDAlJyxcbiAgICBiYWNrZ3JvdW5kOiAncmdiYSgwLCAwLCAwLCAwLjcpJyxcbiAgfSxcbiAgaGVhZDoge1xuICAgIC4uLm1vYmlsZVN0eWxlLmhlYWQsXG4gICAgYmFja2dyb3VuZDogJyMwMDAnLFxuICB9LFxuICByb3c6IHtcbiAgICAuLi5tb2JpbGVTdHlsZS5yb3csXG4gICAgJzo6YmVmb3JlJzoge1xuICAgICAgLi4ubW9iaWxlU3R5bGUucm93Wyc6OmFmdGVyJ10sXG4gICAgICBtYXJnaW5MZWZ0OiAnMCcsXG4gICAgICBtYXJnaW5SaWdodDogJzRweCcsXG4gICAgfSxcbiAgfSxcbiAgaGFzT3B0aW9uczoge1xuICAgICc6OmJlZm9yZSc6IHtcbiAgICAgIGRpc3BsYXk6ICdub25lJyxcbiAgICB9LFxuICAgICc6OmFmdGVyJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5hcnJvd1RvcH0pYCxcbiAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSg5MGRlZyknLFxuICAgIH0sXG4gIH0sXG4gIHNlbGVjdGVkOiB7XG4gICAgJzo6YmVmb3JlJzoge1xuICAgICAgYmFja2dyb3VuZEltYWdlOiBgdXJsKCR7aWNvbi5jaGVja30pYCxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBNZW51SXRlbVRleHQgPSAoe3RleHQgPSAnJ30pID0+IChcbiAgPEZvcm1hdHRlZE1lc3NhZ2VcbiAgICBpZD17dGV4dH1cbiAgICBkZWZhdWx0TWVzc2FnZT17XG4gICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17YEtLUy5TRVRUSU5HLiR7dGV4dH1gfSBkZWZhdWx0TWVzc2FnZT17dGV4dH0gLz5cbiAgICB9XG4gIC8+XG4pXG5cbk1lbnVJdGVtVGV4dC5wcm9wVHlwZXMgPSB7XG4gIHRleHQ6IFByb3BUeXBlcy5zdHJpbmcsXG59XG5cbmNvbnN0IENsb3NlQnV0dG9uID0gcHJvcHMgPT4gKFxuICA8YnV0dG9uXG4gICAgdHlwZT1cImJ1dHRvblwiXG4gICAgYXJpYS1sYWJlbD1cIkNsb3NlIFNldHRpbmdzXCJcbiAgICBjc3M9e21vYmlsZVN0eWxlLmRpc21pc3N9XG4gICAgey4uLnByb3BzfVxuICAvPlxuKVxuXG5jb25zdCBCYWNrQnV0dG9uID0gcHJvcHMgPT4gKFxuICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBhcmlhLWxhYmVsPVwiQmFja1wiIGNzcz17bW9iaWxlU3R5bGUuYmFja30gey4uLnByb3BzfSAvPlxuKVxuXG5jb25zdCBTZXR0aW5ncyA9ICh7XG4gIG9wZW4sXG4gIHZhbHVlcyxcbiAgc2VjdGlvbnMsXG4gIHR5cGUsXG4gIHN0eWxlLFxuICBvbkNoYW5nZSxcbiAgb25PcGVuLFxuICBvbkNsb3NlLFxufSkgPT4ge1xuICBjb25zdCBjb21tb25TdHlsZSA9IHR5cGUgPT09ICdkZXNrdG9wJyA/IGRla3N0b3BTdHlsZSA6IG1vYmlsZVN0eWxlXG4gIGNvbnN0IFtwYXRoLCBzZXRQYXRoXSA9IHVzZVN0YXRlKCcvJylcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIW9wZW4pIHtcbiAgICAgIHNldFBhdGgoJy8nKVxuICAgIH1cbiAgfSwgW29wZW5dKVxuXG4gIGNvbnN0IHJlZiA9IHVzZU9uY2xpY2tPdXRzaWRlKFxuICAgICgpID0+IHtcbiAgICAgIGlmIChvcGVuKSB7XG4gICAgICAgIG9uQ2xvc2UoKVxuICAgICAgfVxuICAgIH0sXG4gICAge2V2ZW50VHlwZXM6IFsnY2xpY2snXX1cbiAgKVxuICBjb25zdCBjdXJyZW50U2VjdGlvbiA9IHNlY3Rpb25zLmZpbmQoaXQgPT4gcGF0aCA9PT0gYC8ke2l0Lm5hbWV9YClcbiAgY29uc3QgbWVudSA9XG4gICAgcGF0aCA9PT0gJy8nXG4gICAgICA/IHtcbiAgICAgICAgICB0aXRsZTogJ0tLUy5TRVRUSU5HJyxcbiAgICAgICAgICBpdGVtczogc2VjdGlvbnMubWFwKCh7bmFtZSwgdGl0bGUsIGl0ZW1zfSkgPT4gKHtcbiAgICAgICAgICAgIGxpbms6IGAvJHtuYW1lfWAsXG4gICAgICAgICAgICBsYWJlbDogdGl0bGUsXG4gICAgICAgICAgICB2YWx1ZTpcbiAgICAgICAgICAgICAgaXRlbXMuZmluZChpdGVtID0+IGl0ZW0udmFsdWUgPT09IHZhbHVlc1tuYW1lXSk/LmxhYmVsIHx8XG4gICAgICAgICAgICAgIHZhbHVlc1tuYW1lXSxcbiAgICAgICAgICB9KSksXG4gICAgICAgIH1cbiAgICAgIDoge1xuICAgICAgICAgIHRpdGxlOiBjdXJyZW50U2VjdGlvbi50aXRsZSxcbiAgICAgICAgICBpdGVtczogY3VycmVudFNlY3Rpb24uaXRlbXMubWFwKCh7dmFsdWUsIGxhYmVsID0gdmFsdWV9KSA9PiAoe1xuICAgICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgICBjaGVja2VkOiB2YWx1ZXNbY3VycmVudFNlY3Rpb24ubmFtZV0gPT09IHZhbHVlLFxuICAgICAgICAgICAgZGF0YTogdmFsdWUsXG4gICAgICAgICAgfSkpLFxuICAgICAgICAgIHByZXZpb3VzOiAnLycsXG4gICAgICAgIH1cbiAgY29uc3QgbmF2aWdhdGUgPSBkZXN0ID0+IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiBzZXRQYXRoKGRlc3QpKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiAvLyBUT0RPIHJlcGxhY2Ugd2l0aCA8QmFja2Ryb3A+XG4gICAgICByb2xlPVwibWVudVwiXG4gICAgICB0YWJJbmRleD1cIjBcIlxuICAgICAgY3NzPXtbY29tbW9uU3R5bGUub3ZlcmxheSwgb3BlbiAmJiBtb2JpbGVTdHlsZS5vcGVuLCBzdHlsZV19XG4gICAgICBvbkNsaWNrPXtldmVudCA9PiBldmVudC5zdG9wUHJvcGFnYXRpb24oKX1cbiAgICA+XG4gICAgICA8RnVuY3Rpb25CYXJFeHRlbnNpb24+XG4gICAgICAgIDxCdXR0b25cbiAgICAgICAgICBzdGFydEljb249XCJzZXR0aW5nXCJcbiAgICAgICAgICB0aXRsZT1cIktLUy5TRVRUSU5HXCJcbiAgICAgICAgICBkaXNhYmxlZD17c2VjdGlvbnMubGVuZ3RoID09PSAwfVxuICAgICAgICAgIG9uQ2xpY2s9e29uT3Blbn1cbiAgICAgICAgLz5cbiAgICAgIDwvRnVuY3Rpb25CYXJFeHRlbnNpb24+XG4gICAgICA8dWwgcm9sZT1cIm1lbnVcIiByZWY9e3JlZn0gY3NzPXtjb21tb25TdHlsZS5jb250YWluZXJ9PlxuICAgICAgICA8ZGl2IGNzcz17Y29tbW9uU3R5bGUuaGVhZH0+XG4gICAgICAgICAge21lbnUucHJldmlvdXMgPyAoXG4gICAgICAgICAgICA8QmFja0J1dHRvbiBvbkNsaWNrPXsoKSA9PiBuYXZpZ2F0ZSgnLycpfSAvPlxuICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICB0eXBlICE9PSAnZGVza3RvcCcgJiYgPENsb3NlQnV0dG9uIG9uQ2xpY2s9e29uQ2xvc2V9IC8+XG4gICAgICAgICAgKX1cbiAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD17bWVudS50aXRsZX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHttZW51Lml0ZW1zLm1hcCgoe2xhYmVsLCBsaW5rLCB2YWx1ZSwgZGF0YSwgY2hlY2tlZH0pID0+IChcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtZWxlbWVudC1pbnRlcmFjdGlvbnNcbiAgICAgICAgICA8bGlcbiAgICAgICAgICAgIHJvbGU9e2xpbmsgPyAnbWVudWl0ZW0nIDogJ21lbnVpdGVtcmFkaW8nfVxuICAgICAgICAgICAgYXJpYS1jaGVja2VkPXtjaGVja2VkfVxuICAgICAgICAgICAgY3NzPXtbXG4gICAgICAgICAgICAgIGNvbW1vblN0eWxlLnJvdyxcbiAgICAgICAgICAgICAgbGluayAmJiBjb21tb25TdHlsZS5oYXNPcHRpb25zLFxuICAgICAgICAgICAgICBjaGVja2VkICYmIGNvbW1vblN0eWxlLnNlbGVjdGVkLFxuICAgICAgICAgICAgXX1cbiAgICAgICAgICAgIGtleT17bGFiZWx9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICBsaW5rXG4gICAgICAgICAgICAgICAgPyBuYXZpZ2F0ZShsaW5rKVxuICAgICAgICAgICAgICAgIDogb25DaGFuZ2Uoe25hbWU6IGN1cnJlbnRTZWN0aW9uLm5hbWUsIHZhbHVlOiBkYXRhfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8TWVudUl0ZW1UZXh0IHRleHQ9e2xhYmVsfSAvPlxuICAgICAgICAgICAgPGRpdiBjc3M9e21vYmlsZVN0eWxlLnNwYWNlfSAvPlxuICAgICAgICAgICAge3ZhbHVlICYmIDxNZW51SXRlbVRleHQgdGV4dD17dmFsdWV9IC8+fVxuICAgICAgICAgIDwvbGk+XG4gICAgICAgICkpfVxuICAgICAgPC91bD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5TZXR0aW5ncy5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICB2YWx1ZXM6IFByb3BUeXBlcy5vYmplY3QsXG4gIHNlY3Rpb25zOiBQcm9wVHlwZXMuYXJyYXksXG4gIHR5cGU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHN0eWxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICBvbk9wZW46IFByb3BUeXBlcy5mdW5jLFxuICBvbkNsb3NlOiBQcm9wVHlwZXMuZnVuYyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgU2V0dGluZ3NcbiJdfQ== */"],
        onClick: () => link ? navigate(link) : onChange({
          name: currentSection.name,
          value: data
        }),
        children: [jsx$1(MenuItemText, {
          text: label
        }), jsx$1("div", {
          css: mobileStyle.space
        }), value && jsx$1(MenuItemText, {
          text: value
        })]
      }, label))]
    })]
  });
};

Settings.propTypes = {
  open: PropTypes.bool,
  values: PropTypes.object,
  sections: PropTypes.array,
  type: PropTypes.string,
  style: PropTypes.bool,
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

/* @jsxImportSource @emotion/react */

/* eslint-disable react/prop-types */

/* eslint-disable jsx-a11y/no-static-element-interactions */
const style$6 = {
  position: 'absolute',
  zIndex: 0,
  width: '100%',
  height: '100%'
}; // TODO animations

const PlayPanel = ({
  onClick
}) => jsx$1("div", {
  css: style$6,
  onClick: onClick
});

function _EMOTION_STRINGIFIED_CSS_ERROR__$2() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
const style$5 = {
  display: 'inline-flex',
  alignItems: 'center'
};
/* eslint-disable react/prop-types */

var _ref$2 = process.env.NODE_ENV === "production" ? {
  name: "1vats5l",
  styles: "margin-left:0.8rem;width:4em"
} : {
  name: "1vofojj-VolumeControl",
  styles: "margin-left:0.8rem;width:4em;label:VolumeControl;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZvbHVtZUNvbnRyb2wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJVIiwiZmlsZSI6IlZvbHVtZUNvbnRyb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbmRlbnQgKi9cbi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7dXNlRWZmZWN0LCB1c2VTdGF0ZX0gZnJvbSAncmVhY3QnXG5cbmltcG9ydCB7QnV0dG9ufSBmcm9tICdwbGF5ZXJVaS9idXR0b25zJ1xuaW1wb3J0IFNpbXBsZVNsaWRlciBmcm9tICdwbGF5ZXJVaS9TaW1wbGVTbGlkZXInXG5cbmNvbnN0IHN0eWxlID0ge1xuICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbn1cblxuLyogZXNsaW50LWRpc2FibGUgcmVhY3QvcHJvcC10eXBlcyAqL1xuY29uc3QgVm9sdW1lQ29udHJvbCA9ICh7c2xpZGVyID0gZmFsc2UsIHN1YnNjcmliZSwgb25DaGFuZ2UsIHRvZ2dsZU11dGV9KSA9PiB7XG4gIGNvbnN0IFt7dm9sdW1lLCBtdXRlZH0sIHNldFN0YXRlXSA9IHVzZVN0YXRlKHttdXRlZDogZmFsc2UsIHZvbHVtZTogMX0pXG4gIHVzZUVmZmVjdCgoKSA9PiBzdWJzY3JpYmUoc2V0U3RhdGUpLCBbXSlcbiAgY29uc3QgaWNvbk5hbWUgPSBtdXRlZCA/ICdtdXRlJyA6IHZvbHVtZSA8IDAuNSA/ICd2b2x1bWVMb3cnIDogJ3ZvbHVtZUhpZ2h0J1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJra3MtcGxheWVyX192b2x1bWVcIiBjc3M9e3N0eWxlfT5cbiAgICAgIDxCdXR0b25cbiAgICAgICAgc3RhcnRJY29uPXtpY29uTmFtZX1cbiAgICAgICAgdGl0bGU9e211dGVkID8gJ0tLUy5QTEFZRVIuVU5NVVRFJyA6ICdLS1MuUExBWUVSLk1VVEUnfVxuICAgICAgICBvbkNsaWNrPXt0b2dnbGVNdXRlfVxuICAgICAgLz5cbiAgICAgIHtzbGlkZXIgJiYgKFxuICAgICAgICA8U2ltcGxlU2xpZGVyXG4gICAgICAgICAgY3NzPXt7XG4gICAgICAgICAgICBtYXJnaW5MZWZ0OiAnMC44cmVtJyxcbiAgICAgICAgICAgIHdpZHRoOiAnNGVtJyxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHZhbHVlPXttdXRlZCA/IDAgOiB2b2x1bWV9XG4gICAgICAgICAgbWF4PXsxfVxuICAgICAgICAgIG9uQ2hhbmdlPXsoXywge3ZhbHVlfSkgPT4gb25DaGFuZ2UodmFsdWUpfVxuICAgICAgICAgIG9uQ2hhbmdlQ29tbWl0dGVkPXsoXywge3ZhbHVlfSkgPT4gb25DaGFuZ2UodmFsdWUsIHtjb21taXQ6IHRydWV9KX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgVm9sdW1lQ29udHJvbFxuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$2
};

const VolumeControl = ({
  slider = false,
  subscribe,
  onChange,
  toggleMute
}) => {
  const [{
    volume,
    muted
  }, setState] = useState({
    muted: false,
    volume: 1
  });
  useEffect(() => subscribe(setState), []);
  const iconName = muted ? 'mute' : volume < 0.5 ? 'volumeLow' : 'volumeHight';
  return jsxs("div", {
    className: "kks-player__volume",
    css: style$5,
    children: [jsx$1(Button, {
      startIcon: iconName,
      title: muted ? 'KKS.PLAYER.UNMUTE' : 'KKS.PLAYER.MUTE',
      onClick: toggleMute
    }), slider && jsx$1(SimpleSlider, {
      css: _ref$2,
      value: muted ? 0 : volume,
      max: 1,
      onChange: (_, {
        value
      }) => onChange(value),
      onChangeCommitted: (_, {
        value
      }) => onChange(value, {
        commit: true
      })
    })]
  });
};

/* eslint-disable no-param-reassign */
const loadNative = ({
  videoElement
}) => ({
  load: ({
    native: url
  }) => {
    videoElement.src = url;
    videoElement.style.height = '100%';
    videoElement.style.width = '100%';
  },
  play: () => videoElement.play(),
  pause: () => videoElement.pause(),
  seek: time => {
    videoElement.currentTime = time;
  },
  getVideoElement: () => videoElement,
  getVideoQuality: () => ({}),
  destroy: () => {}
});

/*
  We overwrite standard function for getting mediaSource object
  because Chrome supports VideoTrack only in experiment mode.
*/
const getUrlObject = fn => {
  const createObjectURL = window.URL.createObjectURL.bind();

  window.URL.createObjectURL = blob => {
    if (blob.addSourceBuffer) {
      fn(blob);
    }

    return createObjectURL(blob);
  };
};

/*! @license
 * Shaka Player
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
let shaka;
const shakaLog = {
  v1: () => {}
};

const asMap = object => {
  const map = new Map();

  for (const key of Object.keys(object)) {
    map.set(key, object[key]);
  }

  return map;
};

const makeResponse = (headers, data, status, uri, responseURL, requestType) => {
  if (status >= 200 && status <= 299 && status != 202) {
    // Most 2xx HTTP codes are success cases.

    /** @type {shaka.extern.Response} */
    const response = {
      uri: responseURL || uri,
      originalUri: uri,
      data,
      status,
      headers,
      fromCache: !!headers['x-shaka-from-cache']
    };
    return response;
  }

  let responseText = null;

  try {
    responseText = shaka.util.StringUtils.fromBytesAutoDetect(data); // eslint-disable-next-line no-empty
  } catch (exception) {}

  const severity = status == 401 || status == 403 ? shaka.util.Error.Severity.CRITICAL : shaka.util.Error.Severity.RECOVERABLE;
  throw new shaka.util.Error(severity, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.BAD_HTTP_STATUS, uri, status, responseText, headers, requestType);
};

const goog = {
  asserts: {
    assert: () => {}
  }
};
/**
 * @summary A networking plugin to handle http and https URIs via the Fetch API.
 * @export
 */

class HttpFetchPlugin {
  /**
   * @param {string} uri
   * @param {shaka.extern.Request} request
   * @param {shaka.net.NetworkingEngine.RequestType} requestType
   * @param {shaka.extern.ProgressUpdated} progressUpdated Called when a
   *   progress event happened.
   * @param {shaka.extern.HeadersReceived} headersReceived Called when the
   *   headers for the download are received, but before the body is.
   * @return {!shaka.extern.IAbortableOperation.<shaka.extern.Response>}
   * @export
   */
  static parse(uri, request, requestType, progressUpdated, headersReceived) {
    const headers = new HttpFetchPlugin.Headers_();
    asMap(request.headers).forEach((value, key) => {
      headers.append(key, value);
    });
    const controller = new HttpFetchPlugin.AbortController_();
    /** @type {!RequestInit} */

    const init = {
      // Edge does not treat null as undefined for body; https://bit.ly/2luyE6x
      body: request.body || undefined,
      headers,
      method: request.method,
      signal: controller.signal,
      credentials: request.allowCrossSiteCredentials ? 'include' : undefined
    };
    /** @type {shaka.net.HttpFetchPlugin.AbortStatus} */

    const abortStatus = {
      canceled: false,
      timedOut: false
    };
    const pendingRequest = HttpFetchPlugin.request_(uri, requestType, init, abortStatus, progressUpdated, headersReceived, request.streamDataCallback);
    /** @type {!shaka.util.AbortableOperation} */

    const op = new shaka.util.AbortableOperation(pendingRequest, () => {
      abortStatus.canceled = true;
      controller.abort();
      return Promise.resolve();
    }); // The fetch API does not timeout natively, so do a timeout manually using
    // the AbortController.

    const timeoutMs = request.retryParameters.timeout;

    if (timeoutMs) {
      const timer = new shaka.util.Timer(() => {
        abortStatus.timedOut = true;
        controller.abort();
      });
      timer.tickAfter(timeoutMs / 1000); // To avoid calling |abort| on the network request after it finished, we
      // will stop the timer when the requests resolves/rejects.

      op.finally(() => {
        timer.stop();
      });
    }

    return op;
  }
  /**
   * @param {string} uri
   * @param {shaka.net.NetworkingEngine.RequestType} requestType
   * @param {!RequestInit} init
   * @param {shaka.net.HttpFetchPlugin.AbortStatus} abortStatus
   * @param {shaka.extern.ProgressUpdated} progressUpdated
   * @param {shaka.extern.HeadersReceived} headersReceived
   * @param {?function(BufferSource):!Promise} streamDataCallback
   * @return {!Promise<!shaka.extern.Response>}
   * @private
   */


  static async request_(uri, requestType, init, abortStatus, progressUpdated, headersReceived, streamDataCallback) {
    const fetch = HttpFetchPlugin.fetch_;
    const ReadableStream = HttpFetchPlugin.ReadableStream_;
    let response;
    let arrayBuffer;
    let loaded = 0;
    let lastLoaded = 0; // Last time stamp when we got a progress event.

    let lastTime = Date.now();

    try {
      // The promise returned by fetch resolves as soon as the HTTP response
      // headers are available. The download itself isn't done until the promise
      // for retrieving the data (arrayBuffer, blob, etc) has resolved.
      response = await fetch(uri, init); // At this point in the process, we have the headers of the response, but
      // not the body yet.

      headersReceived(HttpFetchPlugin.headersToGenericObject_(response.headers)); // Getting the reader in this way allows us to observe the process of
      // downloading the body, instead of just waiting for an opaque promise to
      // resolve.
      // We first clone the response because calling getReader locks the body
      // stream; if we didn't clone it here, we would be unable to get the
      // response's arrayBuffer later.

      const reader = response.clone().body.getReader();
      const contentLengthRaw = response.headers.get('Content-Length');
      const contentLength = contentLengthRaw ? parseInt(contentLengthRaw, 10) : 0;

      const start = controller => {
        const push = async () => {
          let readObj;

          try {
            readObj = await reader.read();
          } catch (e) {
            // If we abort the request, we'll get an error here.  Just ignore it
            // since real errors will be reported when we read the buffer below.
            shakaLog.v1('error reading from stream', e.message);
            return;
          }

          if (!readObj.done) {
            loaded += readObj.value.byteLength; // streamDataCallback adds stream data to buffer for low latency mode
            // 4xx response means a segment is not ready and can retry soon
            // only successful response data should be added, or playback freezes

            if (response.status === 200 && streamDataCallback) {
              await streamDataCallback(readObj.value);
            }
          }

          const currentTime = Date.now(); // If the time between last time and this time we got progress event
          // is long enough, or if a whole segment is downloaded, call
          // progressUpdated().

          if (currentTime - lastTime > 100 || readObj.done) {
            progressUpdated(currentTime - lastTime, loaded - lastLoaded, contentLength - loaded);
            lastLoaded = loaded;
            lastTime = currentTime;
          }

          if (readObj.done) {
            goog.asserts.assert(!readObj.value, 'readObj should be unset when "done" is true.');
            controller.close();
          } else {
            controller.enqueue(readObj.value);
            push();
          }
        };

        push();
      }; // Create a ReadableStream to use the reader. We don't need to use the
      // actual stream for anything, though, as we are using the response's
      // arrayBuffer method to get the body, so we don't store the
      // ReadableStream.


      new ReadableStream({
        start
      }); // eslint-disable-line no-new

      arrayBuffer = await response.arrayBuffer();
    } catch (error) {
      if (abortStatus.canceled) {
        throw new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.OPERATION_ABORTED, uri, requestType);
      } else if (abortStatus.timedOut) {
        throw new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.TIMEOUT, uri, requestType);
      } else {
        throw new shaka.util.Error(shaka.util.Error.Severity.RECOVERABLE, shaka.util.Error.Category.NETWORK, shaka.util.Error.Code.HTTP_ERROR, uri, error, requestType);
      }
    }

    const headers = HttpFetchPlugin.headersToGenericObject_(response.headers);
    return makeResponse(headers, arrayBuffer, response.status, uri, response.url, requestType);
  }
  /**
   * @param {!Headers} headers
   * @return {!Object.<string, string>}
   * @private
   */


  static headersToGenericObject_(headers) {
    const headersObj = {};
    headers.forEach((value, key) => {
      // Since Edge incorrectly return the header with a leading new line
      // character ('\n'), we trim the header here.
      headersObj[key.trim()] = value;
    });
    return headersObj;
  }

}

HttpFetchPlugin.register = shakaNamespace => {
  shaka = shakaNamespace;
  /**
   * Overridden in unit tests, but compiled out in production.
   *
   * @const {function(string, !RequestInit)}
   * @private
   */

  HttpFetchPlugin.fetch_ = window.fetch;
  /**
   * Overridden in unit tests, but compiled out in production.
   *
   * @const {function(new: AbortController)}
   * @private
   */

  HttpFetchPlugin.AbortController_ = window.AbortController;
  /**
   * Overridden in unit tests, but compiled out in production.
   *
   * @const {function(new: ReadableStream, !Object)}
   * @private
   */

  HttpFetchPlugin.ReadableStream_ = window.ReadableStream;
  /**
   * Overridden in unit tests, but compiled out in production.
   *
   * @const {function(new: Headers)}
   * @private
   */

  HttpFetchPlugin.Headers_ = window.Headers;
  shaka.net.NetworkingEngine.registerScheme('http', HttpFetchPlugin.parse);
  shaka.net.NetworkingEngine.registerScheme('https', HttpFetchPlugin.parse);
  shaka.net.NetworkingEngine.registerScheme('blob', HttpFetchPlugin.parse);
};

/* eslint-disable no-param-reassign */

const getQualityItem = track => ({
  id: track.originalVideoId,
  bitrate: track.videoBandwidth,
  width: track.width,
  height: track.height,
  codec: track.videoCodec,
  frameRate: track.frameRate
});

const loadShaka = async (videoElement, config = {}) => {
  let player;
  getUrlObject(mediaSource => {
    player.mediaSource = mediaSource;
  });
  const shaka = await import('shaka-player');
  window.shaka = shaka;
  shaka.polyfill.installAll();
  player = new shaka.Player(videoElement);
  player.configure(config);
  const extensionOptions = {
    licenseRequestHeaders: null
  };

  const getAvailableVideoQualities = () => player.getVariantTracks().reduce((trackList, currentTrack) => {
    const keepOrignalTrack = trackList.find(track => track.height === currentTrack.height);

    if (!keepOrignalTrack) {
      trackList.push(getQualityItem(currentTrack));
    }

    return trackList;
  }, []);

  const getVideoQuality = () => {
    const activeTrack = player.getVariantTracks().find(track => track.active);
    if (!activeTrack) return {};
    return getQualityItem(activeTrack);
  };

  HttpFetchPlugin.register(shaka);
  player.getNetworkingEngine().registerRequestFilter((type, request) => {
    if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
      var _extensionOptions$drm;

      request.headers = { ...request.headers,
        ...((_extensionOptions$drm = extensionOptions.drm[player.drmInfo().keySystem]) === null || _extensionOptions$drm === void 0 ? void 0 : _extensionOptions$drm.headers)
      };
    }
  });
  const extensions = {
    shaka,

    get mediaSource() {
      return player.mediaSource;
    },

    configureExtensions: ({
      drm
    } = {}) => {
      extensionOptions.drm = drm;
    },
    getPlaybackSpeed: () => videoElement.playbackRate,
    getVideoElement: () => videoElement,
    setQuality: restrictions => {
      if (!restrictions) return; // FIXME: Setting restrictions to {} cannot enable abr.

      player.configure('abr.restrictions', restrictions);
    },
    getVideoQuality,
    getAvailableVideoQualities,
    getSubtitles: () => player.getTextTracks().map(track => ({
      label: track.label,
      value: track.language,
      enabled: track.active
    })),
    setSubtitleTrack: lang => {
      var _player2, _player3;

      if (lang === 'off') {
        var _player;

        (_player = player) === null || _player === void 0 ? void 0 : _player.setTextTrackVisibility(false);
        return;
      }

      (_player2 = player) === null || _player2 === void 0 ? void 0 : _player2.selectTextLanguage(lang);
      (_player3 = player) === null || _player3 === void 0 ? void 0 : _player3.setTextTrackVisibility(true);
    },
    getAudio: () => {
      var _player4;

      const active = (_player4 = player) === null || _player4 === void 0 ? void 0 : _player4.getVariantTracks().find(track => track.active);
      return {
        lang: active === null || active === void 0 ? void 0 : active.language,
        label: active === null || active === void 0 ? void 0 : active.label
      };
    },
    getAudioList: () => player.getVariantTracks().map(track => ({
      lang: track.language,
      label: track.label
    })),
    setAudioTrack: lang => {
      var _player5;

      if (!lang) return;
      (_player5 = player) === null || _player5 === void 0 ? void 0 : _player5.selectAudioLanguage(lang);
    },
    on: player.addEventListener.bind(player)
  };
  Object.assign(player, extensions);
  return player;
};

const getDrmConfig = ({
  url,
  headers,
  widevine = {
    level: undefined
  },
  fairplay = {
    certificateURL: defaultCertificateUrl(url)
  }
}) => {
  if (!url) {
    return {};
  }

  return {
    widevine: {
      LA_URL: url,
      withCredentials: false,
      headers,
      ...((widevine === null || widevine === void 0 ? void 0 : widevine.level) && {
        videoRobustness: widevine === null || widevine === void 0 ? void 0 : widevine.level
      })
    },
    fairplay: {
      LA_URL: url,
      withCredentials: false,
      headers,
      certificateURL: fairplay.certificateURL,
      ...FairplayKeySystem
    },
    playready: {
      LA_URL: url,
      withCredentials: false,
      headers
    }
  };
};

const loadBitmovin = async ({
  container,
  videoElement,
  autoplay,
  config = {}
}) => {
  // Don't move module paths to array or other variables! they need to be resolved by bundlers
  const {
    Player,
    PlayerEvent
  } = await import('bitmovin-player/modules/bitmovinplayer-core');
  const nativeHls = needNativeHls();
  const bitmovinModules = [].concat(await import('bitmovin-player/modules/bitmovinplayer-engine-bitmovin'), nativeHls && (await import('bitmovin-player/modules/bitmovinplayer-engine-native')), await Promise.all([import('bitmovin-player/modules/bitmovinplayer-drm'), import('bitmovin-player/modules/bitmovinplayer-abr'), import('bitmovin-player/modules/bitmovinplayer-subtitles'), import('bitmovin-player/modules/bitmovinplayer-container-mp4')]), nativeHls && (await Promise.all([import('bitmovin-player/modules/bitmovinplayer-hls'), import('bitmovin-player/modules/bitmovinplayer-subtitles-native')])), !nativeHls && (await import('bitmovin-player/modules/bitmovinplayer-subtitles-vtt')), !nativeHls && (await import('bitmovin-player/modules/bitmovinplayer-xml')), !nativeHls && (await Promise.all([import('bitmovin-player/modules/bitmovinplayer-dash'), import('bitmovin-player/modules/bitmovinplayer-mserenderer'), import('bitmovin-player/modules/bitmovinplayer-polyfill')]))).filter(Boolean);
  bitmovinModules.forEach(module => Player.addModule(module.default));
  const extensionOptions = {
    drm: {}
  };
  let adaptationHandler;
  const player = new Player(container, {
    ui: false,
    ...config,
    playback: { ...config.playback,
      autoplay
    },
    adaptation: { ...config.adaptation,
      onVideoAdaptation: data => {
        var _adaptationHandler;

        const availableQualities = player.getAvailableVideoQualities();
        return ((_adaptationHandler = adaptationHandler) === null || _adaptationHandler === void 0 ? void 0 : _adaptationHandler({
          availableQualities,
          suggested: availableQualities.find(item => item.id === data.suggested) || {
            id: data.suggested
          }
        })) || data.suggested;
      }
    }
  });

  player.configure = ({
    drm
  }) => {
    if (drm) {
      extensionOptions.drm = drm;
    }
  };

  player.configureExtensions = ({
    drm
  } = {}) => {
    if (drm) {
      extensionOptions.licenseRequestHeaders = Object.values(drm)[0].headers;
    }
  };

  const originalLoad = player.load;

  player.load = (src, startTime, type) => originalLoad.call(player, {
    [type === 'application/x-mpegurl' ? 'hls' : 'dash']: src,
    drm: getDrmConfig({
      url: ['com.apple.fps.1_0', 'com.widevine.alpha', 'com.microsoft.playready'].map(keySystemName => {
        var _extensionOptions$drm;

        return (_extensionOptions$drm = extensionOptions.drm) === null || _extensionOptions$drm === void 0 ? void 0 : _extensionOptions$drm.servers[keySystemName];
      }).find(Boolean),
      headers: extensionOptions.licenseRequestHeaders
    }),
    ...(startTime && {
      options: {
        startTime
      }
    })
  });

  player.setAdaptationHandler = handler => {
    adaptationHandler = handler;
  };

  player.seekRange = player.getSeekableRange;
  player.getDrmConfig = getDrmConfig; // Mock Shaka player interface from shaka.js

  player.getSubtitles = () => {
    var _player$subtitles;

    return ((_player$subtitles = player.subtitles) === null || _player$subtitles === void 0 ? void 0 : _player$subtitles.list().map(track => ({
      label: track.label,
      value: track.lang,
      enabled: track.enabled
    }))) || [];
  };

  player.setSubtitleTrack = language => {
    var _subtitles$list;

    const {
      subtitles
    } = player;
    subtitles === null || subtitles === void 0 ? void 0 : (_subtitles$list = subtitles.list) === null || _subtitles$list === void 0 ? void 0 : _subtitles$list.call(subtitles).forEach(track => {
      // TODO consider multiple subtitles
      subtitles[language === track.lang ? 'enable' : 'disable'](track.id); // Safari need to fire cueExit manually.

      if (language === 'off') subtitles.cueExit();
    });
  };

  player.getAudioList = () => player.getAvailableAudio();

  player.setAudioTrack = language => {
    const track = player.getAvailableAudio().find(audio => audio.lang === language);

    if (track) {
      player.setAudio(track.id);
    }
  };

  player.setVideoElement(videoElement); // For a paused live stream, Bitmovin constantly download latest segments and update,
  // and may unexpectedly resume playing when playing vod-to-live, so set speed 0 to prevent.
  // #CPT-1783

  player.on(PlayerEvent.Play, () => {
    if (player.isLive()) {
      player.setPlaybackSpeed(1);
    }
  });
  player.on(PlayerEvent.Paused, () => {
    if (player.isLive()) {
      player.setPlaybackSpeed(0);
    }
  });
  player.on(PlayerEvent.SourceLoaded, () => {
    if (player.isLive()) {
      // eslint-disable-next-line no-param-reassign
      player.setPlaybackSpeed(1); // no video event fires when live stream loaded, fire one so that we can handle like VOD

      videoElement.dispatchEvent(new Event('canplay'));
    }
  });
  player.on(PlayerEvent.Error, info => {
    var _window$Sentry;

    const error = new Error(`Player: ${info.code}/${info.name}`);
    console.warn(info);

    if (/The video element has thrown a media error|Video element triggered an Error/.test(info.message)) {
      return;
    }

    (_window$Sentry = window.Sentry) === null || _window$Sentry === void 0 ? void 0 : _window$Sentry.captureException(error);
    videoElement.dispatchEvent(Object.assign(new CustomEvent('error'), {
      error: info,
      message: `Player Error: ${info.code}/${info.name}`
    }));
  });
  player.on(PlayerEvent.StallStarted, () => videoElement.dispatchEvent(new Event('waiting')));
  return player;
};

const loadPlayer = async (videoElement, {
  container,
  autoplay,
  source,
  shaka,
  bitmovin
}) => {
  if (source !== null && source !== void 0 && source.native) {
    const player = await loadNative({
      videoElement
    });
    return player;
  } // default to Shaka


  if (shaka || !bitmovin) {
    const player = await loadShaka(videoElement, shaka);

    if (autoplay) {
      // eslint-disable-next-line no-param-reassign
      videoElement.autoplay = true;
    }

    videoElement.dispatchEvent(new CustomEvent('playerStarted'));
    return player;
  }

  if (bitmovin) {
    const player = await loadBitmovin({
      container,
      videoElement,
      autoplay,
      config: bitmovin
    });
    videoElement.dispatchEvent(new CustomEvent('playerStarted'));
    return player;
  } // TODO load other players: dash.js, hls.js

};

/* eslint-disable no-param-reassign */
const videoStyle = {
  objectFit: 'contain',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%'
};

const Video = ({
  source,
  drm,
  playbackState: targetState,
  currentTime: targetTime,
  playbackRate,
  quality,
  subtitles,
  audio,
  plugins = [],
  shaka,
  bitmovin,
  videoRef,
  playerRef,
  onPlayerLoaded,
  onPlaybackStateChange,
  onBlockedAutoplay,
  ...videoAttributes
}) => {
  const handlers = useRef();
  handlers.current = {
    onPlaybackStateChange,
    onBlockedAutoplay
  };
  const videoContainer = useRef();
  const videoElement = useRef();
  const [playbackState, setPlaybackState] = useState('');
  const [player, setPlayer] = useState();
  const [contentLoaded, setContentLoaded] = useState(false);
  const ready = player && contentLoaded && playbackState !== 'loading';
  useEffect(() => {
    const loadTask = loadPlayer(videoElement.current, {
      container: videoContainer.current,
      autoplay: false,
      source,
      shaka,
      bitmovin
    }).then(basePlayer => {
      setPlayer(basePlayer);
      onPlayerLoaded === null || onPlayerLoaded === void 0 ? void 0 : onPlayerLoaded(basePlayer);

      if (playerRef) {
        playerRef.curret = basePlayer;
      }

      return basePlayer;
    });
    return () => loadTask.then(currentPlayer => currentPlayer === null || currentPlayer === void 0 ? void 0 : currentPlayer.destroy());
  }, []);
  useEffect(() => {
    if (source && (source.length > 0 || source.src || source.hls || source.dash) && player) {
      setPlaybackState('loading');
      load(videoElement.current, {
        player,
        drm,
        plugins,
        startTime: targetTime
      }, source).then(() => {
        setContentLoaded(true);
      });
    }

    return () => {
      setContentLoaded(false);
    };
  }, [player, source]);
  useEffect(() => subscribePlaybackState(videoElement.current, (event, state) => {
    var _handlers$current$onP, _handlers$current;

    (_handlers$current$onP = (_handlers$current = handlers.current).onPlaybackStateChange) === null || _handlers$current$onP === void 0 ? void 0 : _handlers$current$onP.call(_handlers$current, event, state); // external logic may want to change targetState, hold playbackState update
    // to prevent unwanted syncPlaybackState

    requestAnimationFrame(() => setPlaybackState(state));
  }), []); // useEffect is too late to unlock play on Safari
  // TODO check if this work after upgrading React 18

  useLayoutEffect(() => {
    // TODO ensure previous play() is finished or catch exception
    if (player && (targetState === 'paused' || /playing|paused|ended/.test(playbackState))) {
      var _syncPlaybackState;

      (_syncPlaybackState = syncPlaybackState(videoElement.current, {
        player,
        plugins
      }, targetState)) === null || _syncPlaybackState === void 0 ? void 0 : _syncPlaybackState.catch(error => {
        var _handlers$current$onB, _handlers$current2;

        return (_handlers$current$onB = (_handlers$current2 = handlers.current).onBlockedAutoplay) === null || _handlers$current$onB === void 0 ? void 0 : _handlers$current$onB.call(_handlers$current2, error);
      });
    }
  }, [playbackState, targetState]);
  useEffect(() => {
    const {
      currentTime
    } = getMediaTime(videoElement.current, plugins);

    if (ready && targetTime >= 0 && Math.abs(currentTime - targetTime) > 0.5) {
      seek(videoElement.current, {
        player,
        plugins
      }, targetTime);
    }
  }, [targetTime, ready]);
  useEffect(() => {
    setPlaybackRate(videoElement.current, {
      player
    }, playbackRate);
  }, [playbackRate]);
  useEffect(() => {
    if (player) {
      setQuality(videoElement.current, {
        player
      }, quality);
    }
  }, [quality, player]);
  useEffect(() => {
    if (player) {
      setSubtitle(videoElement.current, {
        player
      }, subtitles);
    }
  }, [subtitles, player]);
  useEffect(() => {
    if (player) {
      setAudio(videoElement.current, {
        player
      }, audio);
    }
  }, [audio, player]);
  return jsx$1("div", {
    ref: videoContainer,
    children: jsx$1("video", {
      ref: multiRef(videoRef, videoElement),
      muted: true,
      playsInline: true,
      css: videoStyle,
      ...videoAttributes
    })
  });
};

Video.propTypes = {
  source: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  drm: PropTypes.object,
  playbackState: PropTypes.string,
  currentTime: PropTypes.number,
  playbackRate: PropTypes.number,
  quality: PropTypes.object,
  subtitles: PropTypes.string,
  audio: PropTypes.string,
  seekable: PropTypes.bool,
  plugins: PropTypes.array,
  bitmovin: PropTypes.object,
  shaka: PropTypes.object,
  onPlayerLoaded: PropTypes.func,
  onPlaybackStateChange: PropTypes.func,
  onBlockedAutoplay: PropTypes.func,
  videoRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  playerRef: PropTypes.object
};

const shouldShowSubtitles = subtitlesMenu => subtitlesMenu.length > 0 || subtitlesMenu[0];

const shouldShowAudio = audioMenu => audioMenu.length > 1 || audioMenu[0];

const speedItems = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map(value => ({
  label: `${value}x`,
  value
}));

const getQualityOptions = ({
  sections,
  values: {
    quality
  }
}) => {
  var _sections$find, _sections$find$items$;

  return (_sections$find = sections.find(item => item.name === 'quality')) === null || _sections$find === void 0 ? void 0 : (_sections$find$items$ = _sections$find.items.find(item => item.value === quality)) === null || _sections$find$items$ === void 0 ? void 0 : _sections$find$items$.options;
};

const getQualityItemsFromManifest = player => [{
  label: 'AUTO',
  options: {},
  value: 'AUTO'
}].concat(player.getAvailableVideoQualities().map(q => ({
  label: `${q.height}p`,
  // Set the min/max height to the same value to fix the quality.
  options: {
    maxHeight: q.height,
    minHeight: q.height
  },
  value: q.height
})));

const getQualitySettings = (options, player) => {
  // With native HLS, manifest rewrite is required to enable quality setting
  // TODO let this covered by test, maybe refactor?
  const items = needNativeHls() && !options.rewriteManifest ? [] : options.items || getQualityItemsFromManifest(player);
  return items.length > 0 && items[0] && {
    name: 'quality',
    title: 'KKS.QUALITY',
    items,
    getDefault: (preferred = options.default || items[0].value) => {
      const maxHeight = preferred || items[0].value;
      return (nearest(items.filter(item => (item.height || item.value) <= maxHeight), item => (item.height || item.value) - maxHeight) || items[0]).value;
    }
  };
};

const getSelectedAudioName = player => {
  const lang = getAudio({}, {
    player
  });
  /*
    Sometimes, HLS manifest doesn't describe the default audio track.
    Get current audio track information is undefined even though the player still has audio streaming.
    For this case, we select first audio track.
    More detail please refer to OTP-3450.
  */

  const audioList = getAudioList({}, {
    player
  });
  const defaultAudioName = audioList.length ? audioList[0].lang : undefined;
  return lang !== undefined ? lang : defaultAudioName;
};

const getDefault = (section, {
  preferred
}) => {
  if (typeof section.getDefault === 'function') {
    return section.getDefault(preferred);
  }

  if (section.name === 'speed') {
    return 1;
  }
};

const getSettingsData = ({
  player,
  contentType,
  source = [],
  quality = {},
  preferred = {},
  otherSections = []
}) => {
  var _subtitleItems$find;

  // TODO extract base player specific things
  const subtitleItems = getSubtitles({}, {
    player
  });
  const selectedSubtitleName = ((_subtitleItems$find = subtitleItems.find(track => track.enabled)) === null || _subtitleItems$find === void 0 ? void 0 : _subtitleItems$find.value) || 'off';
  const audioItems = getAudioList({}, {
    player
  }).filter(track => track.lang && track.lang !== 'und').map(track => ({
    label: track.label,
    value: track.lang
  })) || [];
  const selectedSource = getSource(source, {
    preferManifestType: needNativeHls() ? 'hls' : 'dash'
  }) || {};
  const sections = [quality && getQualitySettings({ ...quality,
    items: selectedSource.qualityOptions,
    type: selectedSource.type
  }, player), shouldShowSubtitles(subtitleItems) && {
    name: 'subtitles',
    title: 'KKS.SUBTITLES',
    items: [...subtitleItems, {
      label: 'OFF',
      value: 'off'
    }]
  }, shouldShowAudio(audioItems) && {
    name: 'audio',
    title: 'KKS.AUDIO',
    items: audioItems
  }, contentType !== 'lives' && {
    name: 'speed',
    title: 'KKS.SETTING.SPEED',
    items: speedItems
  }].concat(otherSections).filter(Boolean);
  const values = sections.reduce((result, section) => {
    // TODO take fallback option if preferred is not available
    // eslint-disable-next-line no-param-reassign
    result[section.name] = getDefault(section, {
      preferred: preferred[section.name]
    }) || preferred[section.name];
    return result;
  }, {});
  values.subtitles = selectedSubtitleName;
  values.audio = getSelectedAudioName(player);
  values.speed = player === null || player === void 0 ? void 0 : player.getPlaybackSpeed();
  return {
    sections,
    values
  };
};

const volumeStorageKey = 'KKSPlayback-volume';

const syncVolume = (video, setInitVolume) => {
  try {
    var _JSON$parse;

    setInitVolume((_JSON$parse = JSON.parse(localStorage.getItem(volumeStorageKey))) !== null && _JSON$parse !== void 0 ? _JSON$parse : 1); // eslint-disable-next-line no-empty
  } catch (e) {}

  return on$1(video, 'volumechange', () => {
    localStorage.setItem(volumeStorageKey, video.volume);
  });
};

const linkMediaVolume = getOptions => {
  const subscribe = handler => {
    const {
      video: media,
      setUnmuteVolume
    } = getOptions();
    setUnmuteVolume(media.volume);
    on$1(media, 'volumechange', () => handler({
      volume: media.volume,
      muted: media.muted
    }));
  };

  const onChange = (volume, {
    commit
  } = {}) => {
    const {
      video: media,
      getPlayer,
      setUnmuteVolume
    } = getOptions();
    setVolume(media, {
      player: getPlayer()
    }, volume);

    if (commit && volume > 0) {
      setUnmuteVolume(volume);
    }
  };

  const toggleMute = () => {
    const {
      video: media,
      getPlayer,
      getUnmuteVolume
    } = getOptions();
    setVolume(media, {
      player: getPlayer()
    }, media.muted ? Math.max(0.05, getUnmuteVolume()) : 0);
  };

  return {
    subscribe,
    onChange,
    toggleMute
  };
};

const parseVTT = data => {
  const lines = data.split(/\n\n/g).slice(1); // may replace with async parser to prevent blocking render

  return Promise.resolve(lines.map(line => {
    const [time, text] = line.split('\n');
    const [startTime, endTime] = time.split('-->').map(convertToSeconds);
    return {
      startTime,
      endTime,
      text
    };
  }));
};

const replaceLast = (url, path) => url.replace(/\/[^/]+$/, `/${path}`);

const parseThumbnails = (data, url) => parseVTT(data).then(items => items.map(item => {
  const [imagePath,, x, y, width, height] = item.text.split(/[#=,]/g);
  return {
    startTime: item.startTime,
    endTime: item.endTime,
    image: replaceLast(url, imagePath),
    position: {
      x: parseFloat(x),
      y: parseFloat(y),
      width: parseFloat(width),
      height: parseFloat(height)
    }
  };
}));

/* @jsxImportSource @emotion/react */
const containerStyle = {
  position: 'absolute',
  zIndex: -2,
  left: 0,
  bottom: '28px',
  textAlign: 'center',
  opacity: 0,
  transform: `translateX(max(0px, min(
    calc(var(--pointer-x) - var(--seekbar-left) - 50%),
    calc(var(--seekbar-right) - 100% - 2em)
  )))`,
  '> div': {
    border: '1px solid white',
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, 0.3)',
    backgroundColor: '#000'
  }
};
const showStyle = {
  zIndex: 1,
  opacity: 1,
  transition: 'z-index 0s linear, opacity 0.5s ease'
};
const VideoThumbnail = /*#__PURE__*/forwardRef(({
  className,
  style,
  time,
  image,
  x,
  y,
  width,
  height
}, ref) => jsxs("div", {
  ref: ref,
  css: [containerStyle, Number.isFinite(time) && time >= 0 && showStyle, process.env.NODE_ENV === "production" ? "" : ";label:VideoThumbnail;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZpZGVvVGh1bWJuYWlsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtDTSIsImZpbGUiOiJWaWRlb1RodW1ibmFpbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7Zm9yd2FyZFJlZn0gZnJvbSAncmVhY3QnXG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnXG5cbmltcG9ydCBmb3JtYXR0ZWRUaW1lIGZyb20gJ3V0aWwvZm9ybWF0dGVkVGltZSdcblxuY29uc3QgY29udGFpbmVyU3R5bGUgPSB7XG4gIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICB6SW5kZXg6IC0yLFxuICBsZWZ0OiAwLFxuICBib3R0b206ICcyOHB4JyxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgb3BhY2l0eTogMCxcbiAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlWChtYXgoMHB4LCBtaW4oXG4gICAgY2FsYyh2YXIoLS1wb2ludGVyLXgpIC0gdmFyKC0tc2Vla2Jhci1sZWZ0KSAtIDUwJSksXG4gICAgY2FsYyh2YXIoLS1zZWVrYmFyLXJpZ2h0KSAtIDEwMCUgLSAyZW0pXG4gICkpKWAsXG4gICc+IGRpdic6IHtcbiAgICBib3JkZXI6ICcxcHggc29saWQgd2hpdGUnLFxuICAgIGJveFNoYWRvdzogJzAgMCA1cHggMnB4IHJnYmEoMCwgMCwgMCwgMC4zKScsXG4gICAgYmFja2dyb3VuZENvbG9yOiAnIzAwMCcsXG4gIH0sXG59XG5cbmNvbnN0IHNob3dTdHlsZSA9IHtcbiAgekluZGV4OiAxLFxuICBvcGFjaXR5OiAxLFxuICB0cmFuc2l0aW9uOiAnei1pbmRleCAwcyBsaW5lYXIsIG9wYWNpdHkgMC41cyBlYXNlJyxcbn1cblxuY29uc3QgVmlkZW9UaHVtYm5haWwgPSBmb3J3YXJkUmVmKFxuICAoe2NsYXNzTmFtZSwgc3R5bGUsIHRpbWUsIGltYWdlLCB4LCB5LCB3aWR0aCwgaGVpZ2h0fSwgcmVmKSA9PiAoXG4gICAgPGRpdlxuICAgICAgcmVmPXtyZWZ9XG4gICAgICBjc3M9e1tjb250YWluZXJTdHlsZSwgTnVtYmVyLmlzRmluaXRlKHRpbWUpICYmIHRpbWUgPj0gMCAmJiBzaG93U3R5bGVdfVxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICBzdHlsZT17c3R5bGV9XG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIHdpZHRoOiBgJHt3aWR0aH1weGAsXG4gICAgICAgICAgaGVpZ2h0OiBgJHtoZWlnaHR9cHhgLFxuICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgke2ltYWdlfSlgLFxuICAgICAgICAgIGJhY2tncm91bmRQb3NpdGlvbjogYC0ke3h9cHggLSR7eX1weGAsXG4gICAgICAgIH19XG4gICAgICAvPlxuICAgICAge2Zvcm1hdHRlZFRpbWUodGltZSl9XG4gICAgPC9kaXY+XG4gIClcbilcblxuVmlkZW9UaHVtYm5haWwucHJvcFR5cGVzID0ge1xuICBjbGFzc05hbWU6IFByb3BUeXBlcy5zdHJpbmcsXG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICB0aW1lOiBQcm9wVHlwZXMubnVtYmVyLFxuICBpbWFnZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgeDogUHJvcFR5cGVzLm51bWJlcixcbiAgeTogUHJvcFR5cGVzLm51bWJlcixcbiAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gIGhlaWdodDogUHJvcFR5cGVzLm51bWJlcixcbn1cblxuZXhwb3J0IGRlZmF1bHQgVmlkZW9UaHVtYm5haWxcbiJdfQ== */"],
  className: className,
  style: style,
  children: [jsx$1("div", {
    style: {
      width: `${width}px`,
      height: `${height}px`,
      backgroundImage: `url(${image})`,
      backgroundPosition: `-${x}px -${y}px`
    }
  }), formattedTime(time)]
}));
VideoThumbnail.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  time: PropTypes.number,
  image: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number,
  width: PropTypes.number,
  height: PropTypes.number
};

/* @jsxImportSource @emotion/react */

const at = (array, index) => index < 0 ? array[array.length + index] : array[index];

const SeekPreview = ({
  thumbnailsUrl,
  time
}) => {
  const thumbnailRef = useRef();
  const [thumbnails, setThumbnails] = useState([]);
  useEffect(() => {
    setThumbnails([]);

    if (thumbnailsUrl) {
      axios.get(thumbnailsUrl).then(result => parseThumbnails(result.data, thumbnailsUrl)).then(setThumbnails);
    }
  }, [thumbnailsUrl]);
  const currentThumbnail = useMemo(() => thumbnails.find(t => t.startTime <= time && time <= t.endTime) || at(thumbnails, -1) || '', [time]);
  return thumbnails.length > 0 && jsx$1(VideoThumbnail, {
    ref: thumbnailRef,
    time: time,
    image: currentThumbnail.image,
    ...currentThumbnail.position
  });
};

SeekPreview.propTypes = {
  thumbnailsUrl: PropTypes.string,
  time: PropTypes.number
};

/* @jsxImportSource @emotion/react */
const subtitlesStyle = {
  alignSelf: 'center',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',
  maxWidth: '100%',
  position: 'absolute',
  bottom: '6em',
  color: '#e8e6e3',
  textShadow: `#000 -1px -1px 0px, #000 1px -1px 0px, #000 -1px 1px 0px, #000 1px 1px 0px`,
  whiteSpace: 'pre-line',
  textAlign: 'center'
};

const Subtitles = ({
  text
}) => jsx$1("div", {
  css: subtitlesStyle,
  children: jsx$1("span", {
    children: text
  })
});

Subtitles.propTypes = {
  text: PropTypes.string
};

/* eslint-disable react/prop-types */

const ActiveSubtitles = ({
  player
}) => {
  const [subtitles, setSubtitles] = useState({});
  useEffect(() => {
    if (player) {
      return subscribeSubtitles({}, {
        player
      }, currentSubtitles => setSubtitles(currentSubtitles));
    }
  }, [player]);
  return /*#__PURE__*/jsx(Subtitles, {
    text: subtitles.text
  });
};

/* eslint-disable no-param-reassign */
const sizes$1 = {
  'small-embed': 200,
  embed: 400,
  'tablet-portrait': 600,
  'tablet-landscape': 900,
  desktop: 1200
};

const useLinkState = (request, dependencies = []) => {
  const [state, setState] = useState();
  useEffect(() => {
    request(setState);
  }, dependencies);
  return state;
};

const flipState = state => state === 'playing' ? 'paused' : 'playing'; // FIXME: too few lines to split a file, looking a better place


const getThumbnailsUrl = source => {
  var _concat$find;

  return (_concat$find = [].concat(source).find(item => item.type === 'thumbnail')) === null || _concat$find === void 0 ? void 0 : _concat$find.src;
};

const mergeSections = (current, target) => {
  if (!current && !target) return [];
  if (!current) return target;
  if (!target) return current;
  const map = new Map();
  current.forEach(e => map.set(e.name, e));
  target.forEach(e => map.set(e.name, e));
  return Array.from(map.values());
};

const PremiumPlayer = ({
  source,
  startTime,
  autoplay,
  quality = {},
  title,
  channelTitle,
  playbackState: appPlaybackState,
  currentTime: appCurrentTime,
  playbackRate: appPlaybackRate,
  volume: appVolume,
  thumbnailsUrl,
  // FIXME deprecated, default value is no longer needed
  drm,
  controls = {
    autohide: 3000
  },
  // TODO chapters
  marks = [],
  // TODO sectionId
  intl,
  seekbarHide = false,
  settings: targetSettings,
  plugins = [],
  style,
  children,
  uiElements: {
    controlButtons: targetControlButtons,
    ...targetUIElements
  } = {
    controlButtons: {}
  },
  overrideSettingSections = sections => sections,
  onError,
  onPlaybackStateChange,
  onBack,
  onChangeNext,
  onChangePrevious,
  onOpenSettings,
  onChangeSettings,
  onPlayerLoaded,
  sendLog,
  innerRef,
  ...videoProps
}) => {
  var _videoRef$current2;

  const uiType = isDesktop() ? 'desktop' : 'mobile';
  const videoRef = useRef();
  const containerRef = useRef();
  const playerRef = useRef();
  const adContainerRef = useRef(); // TODO move RWD related to Layout

  const {
    currentBreakpoint: size,
    width,
    observe
  } = useDimensions({
    polyfill: ResizeObserver,
    breakpoints: sizes$1
  });
  const [targetState, setTargetState] = useState(() => ({
    playbackState: autoplay ? 'playing' : 'paused',
    currentTime: startTime
  }));
  const [playbackTime, setPlaybackTime] = useState({
    currentTime: 0,
    bufferTime: 0
  });

  const togglePlay = overrideState => {
    if (targetState.playbackState !== overrideState) {
      setTargetState(state => ({ ...state,
        playbackState: overrideState || flipState(state.playbackState)
      }));
      const result = overrideState || flipState(targetState.playbackState);
      sendLog === null || sendLog === void 0 ? void 0 : sendLog(result, playbackTime);
    }
  };

  useEffect(() => {
    if (appPlaybackState) {
      togglePlay(appPlaybackState);
    }
  }, [appPlaybackState]);
  useEffect(() => {
    if (!isDesktop()) {
      return blurPause(videoRef.current, () => togglePlay('paused'));
    }
  }, []);

  const handleBlockedAutoplay = () => togglePlay('paused');

  const updatePlaybackTime = event => requestAnimationFrame(() => ((event === null || event === void 0 ? void 0 : event.type) !== 'timeupdate' || isBuffered(videoRef.current)) && setPlaybackTime(state => ({ ...state,
    ...getMediaTime(videoRef.current, plugins)
  })));

  const setTargetTime = (time, action) => {
    var _videoRef$current;

    if (action && sendLog) {
      sendLog(action, playbackTime);
    }

    const trimmed = Math.max(0, Math.min(time, ((_videoRef$current = videoRef.current) === null || _videoRef$current === void 0 ? void 0 : _videoRef$current.initialDuration) || Infinity));
    setTargetState(state => ({ ...state,
      // seek to 0 repeatedly edge case
      currentTime: state.currentTime !== trimmed ? trimmed : trimmed + 0.01
    }));
    updatePlaybackTime();
  };

  const [playbackState, setPlaybackState] = useState('init');
  useEffect(() => {
    setPlaybackState('loading');
  }, [source]);
  useEffect(() => {
    if (typeof appCurrentTime === 'number') setTargetTime(appCurrentTime || 0);
    if (typeof appCurrentTime === 'object') setTargetTime((appCurrentTime === null || appCurrentTime === void 0 ? void 0 : appCurrentTime.value) || 0);
  }, [appCurrentTime]);
  const [errorData, setErrorData] = useState();

  const handleError = ({
    nativeEvent: event
  }) => {
    console.warn(event);
    onError === null || onError === void 0 ? void 0 : onError(event);

    if (event.defaultPrevented) {
      return;
    }

    const {
      code,
      name,
      data,
      message
    } = event.error || {};
    setErrorData({
      code,
      name,
      data,
      message
    });
  };

  const [settings, setSettings] = useState(() => ({
    sections: [],
    values: {
      speed: 1
    }
  }));

  const fetchSettings = () => {
    const contentType = isFinite(videoRef.current.duration) ? 'videos' : 'lives';
    setSettings(current => {
      const {
        values,
        sections
      } = getSettingsData({
        player: playerRef.current,
        source,
        quality,
        contentType,
        preferred: current.preferred,
        otherSections: targetSettings === null || targetSettings === void 0 ? void 0 : targetSettings.sections
      });
      return {
        preferred: current.preferred,
        values,
        sections: overrideSettingSections(sections)
      };
    });
  };

  const lastState = useRef(playbackState);

  const handlePlaybackStateChange = (event, state) => {
    if (lastState.current === 'error') {
      return;
    }

    onPlaybackStateChange === null || onPlaybackStateChange === void 0 ? void 0 : onPlaybackStateChange(event, state); // let view mode / fullscreen update first

    if (videoRef.current.webkitDisplayingFullscreen && /playing|paused/.test(state)) {
      togglePlay(state);
    }

    if (state === 'ended') {
      togglePlay('paused');
    }

    if (state === 'loading' && lastState.current !== 'init') {
      togglePlay('playing');
    }

    if (lastState.current === 'loading') {
      syncVolume(videoRef.current, initialVolume => {
        // only desktop UI have volume
        if (uiType === 'desktop') {
          setVolume(videoRef.current, {
            player: playerRef.current
          }, initialVolume);
        }
      });
      fetchSettings();
    }

    lastState.current = state;
    setPlaybackState(state);
  };

  const [activePanel, setActivePanel] = useState('');

  const changeSettings = (name, value) => {
    // TODO consider merge into useReducer?
    onChangeSettings === null || onChangeSettings === void 0 ? void 0 : onChangeSettings({
      name,
      value
    });
    setTargetTime(playbackTime.currentTime);
    setSettings(current => ({ ...current,
      values: { ...current.values,
        [name]: value
      },
      preferred: { ...current.preferred,
        [name]: value
      }
    }));
    setActivePanel('');
    togglePlay('playing');
  };

  const openSettings = event => {
    const animationFrame = activePanel !== 'settings' && requestAnimationFrame(() => {
      onOpenSettings === null || onOpenSettings === void 0 ? void 0 : onOpenSettings(event, settings);

      if (activePanel !== 'settings' && !event.defaultPrevented && uiType !== 'desktop') {
        togglePlay('paused');
      } // In iOS Safari, we need to update settings data


      fetchSettings();
    });
    setActivePanel(current => current === 'settings' ? '' : 'settings');
    return animationFrame;
  };

  useEffect(() => {
    if (appPlaybackRate > 0) {
      setSettings(current => ({ ...current,
        values: { ...current.values,
          speed: appPlaybackRate
        }
      }));
    }
  }, [appPlaybackRate]);
  useEffect(() => {
    sendLog === null || sendLog === void 0 ? void 0 : sendLog(activePanel === 'settings' ? 'openSettings' : 'closeSettings', playbackTime);
  }, [activePanel === 'settings']);
  const qualityOptions = useMemo(() => getQualityOptions(settings), [settings.values.quality]);
  const viewMode = useLinkState(update => onViewModeChange(videoRef.current, update));
  const sourceOverride = useLinkState(async update => {
    var _quality$rewriteManif;

    const result = source && (await ((_quality$rewriteManif = quality.rewriteManifest) === null || _quality$rewriteManif === void 0 ? void 0 : _quality$rewriteManif.call(quality, source, qualityOptions)));
    update(result || source);
  }, [source, qualityOptions]);
  const waiting = useLazyWaiting(playbackState === 'buffering');
  const activePlayback = playbackState === 'playing' || playbackState === 'waiting';
  const {
    mode: autoHideMode,
    onClick,
    onMouseMove
  } = useAutoHide({
    pinned: !controls.autohide || waiting || !activePlayback || activePanel,
    tapToHide: uiType === 'mobile',
    hideTimeMs: controls.autohide
  });
  const mode = controls.autohide ? autoHideMode : controls ? 'shown' : 'hidden';
  const controlsDisplay = controls === 'title-only' ? 'hidden' : mode;
  const shouldHidePanels = (controls === 'no-panel' || controlsDisplay === 'hidden') && activePanel;
  useEffect(() => {
    if (shouldHidePanels) {
      setActivePanel('');
    }
  }, [shouldHidePanels]);
  const unmuteVolume = useRef(1);
  const {
    subscribe,
    onChange,
    toggleMute
  } = linkMediaVolume(() => ({
    video: videoRef.current,
    getPlayer: () => playerRef.current,
    getUnmuteVolume: () => unmuteVolume.current,
    setUnmuteVolume: volume => {
      unmuteVolume.current = volume;
    }
  }));

  const changePrevious = event => {
    onChangePrevious(event);
    togglePlay('paused');
    handlePlaybackStateChange(event, 'loading');
    sendLog === null || sendLog === void 0 ? void 0 : sendLog('previousEpisode', playbackTime);
  };

  const changeNext = event => {
    onChangeNext(event);
    togglePlay('paused');
    handlePlaybackStateChange(event, 'loading');
    sendLog === null || sendLog === void 0 ? void 0 : sendLog('nextEpisode', playbackTime);
  };

  useEffect(() => {
    if (appVolume >= 0) {
      onChange(appVolume);
    }
  }, [appVolume]);
  useEffect(() => {
    if (targetSettings) {
      setSettings(current => ({ ...current,
        // Keep the same object reference if there is nothing to change in the revalant properties
        ...(targetSettings.values && {
          values: { ...current.values,
            ...targetSettings.values
          }
        }),
        ...(targetSettings.preferred && {
          preferred: { ...current.preferred,
            ...targetSettings.preferred
          }
        }),
        // Don't need to check targetSettings.sections because mergeSections will keep the original reference if there is nothing to update.
        sections: mergeSections(current.sections, targetSettings.sections)
      }));
    }
  }, [targetSettings]);
  useEffect(() => {
    // The adContainer should be set before `load` because ImaDai.load needs it.
    plugins.forEach(plugin => {
      var _plugin$setAdContaine;

      return (_plugin$setAdContaine = plugin.setAdContainer) === null || _plugin$setAdContaine === void 0 ? void 0 : _plugin$setAdContaine.call(plugin, adContainerRef.current);
    });
  }, []);
  const seekBarOverrides = Object.assign({}, ...plugins.map(plugin => {
    var _plugin$getSeekbarPro;

    return (_plugin$getSeekbarPro = plugin.getSeekbarProps) === null || _plugin$getSeekbarPro === void 0 ? void 0 : _plugin$getSeekbarPro.call(plugin);
  }));
  const canSeek = playbackState !== 'ended' && isFinite((_videoRef$current2 = videoRef.current) === null || _videoRef$current2 === void 0 ? void 0 : _videoRef$current2.initialDuration);
  /**
   * TODO: Need to inject props to the react elements from targetUIElements.
   * The possible solution is `React.cloneElement`
   */

  const uiElements = {
    title,
    channelTitle,
    controlButtons: {
      playButton: /*#__PURE__*/jsx(PlayButton$1, {
        playbackState: targetState.playbackState,
        ended: playbackState === 'ended',
        hidden: uiType !== 'desktop' && (waiting || /loading/.test(playbackState)),
        onClick: () => togglePlay()
      }),
      ...(isFinite(playbackTime.duration) && {
        rewindButton: /*#__PURE__*/jsx(Button, {
          startIcon: "rewind10",
          title: "KKS.PLAYER.REWIND",
          disabled: !canSeek,
          onClick: () => setTargetTime(playbackTime.currentTime - 10, 'rewind')
        }),
        forwardButton: /*#__PURE__*/jsx(Button, {
          startIcon: "forward10",
          title: "KKS.PLAYER.FORWARD",
          disabled: !canSeek,
          onClick: () => setTargetTime(playbackTime.currentTime + 10, 'forward')
        }),
        nextEpisodeButton: /*#__PURE__*/jsx(Button, {
          startIcon: "nextEpisode",
          title: "KKS.PLAYER.NEXT",
          disabled: !onChangeNext,
          onClick: changeNext
        }),
        previousEpisodeButton: /*#__PURE__*/jsx(Button, {
          startIcon: "previousEpisode",
          title: "KKS.PLAYER.PREVIOUS",
          disabled: !onChangePrevious,
          onClick: changePrevious
        })
      }),
      ...targetControlButtons
    },
    seekbar: !seekbarHide && /*#__PURE__*/jsx(Seekbar$1 // TODO ensure response quickly to forward backward 10
    , {
      currentTime: playbackTime.currentTime,
      bufferTime: playbackTime.bufferTime,
      duration: playbackTime.duration,
      play: () => togglePlay('playing'),
      pause: () => togglePlay('paused'),
      seek: setTargetTime // TODO marks = chapters
      ,
      marks: marks,
      plugins: plugins,
      ...seekBarOverrides,
      children: !activePanel && source && /*#__PURE__*/jsx(SeekPreview, {
        thumbnailsUrl: getThumbnailsUrl(source) || thumbnailsUrl,
        duration: playbackTime.duration
      })
    }),
    backButton: onBack && /*#__PURE__*/jsx(Button, {
      startIcon: "back",
      title: "KKS.BACK",
      onClick: onBack
    }),
    fullscreenButton: /*#__PURE__*/jsx(FullscreenButton, {
      viewMode: viewMode,
      onClick: () => toggleFullscreen(containerRef.current)
    }),
    volumeControl: width >= sizes$1['small-embed'] && /*#__PURE__*/jsx(VolumeControl // iOS video volume locks to 1, sliders is no use (OTP-1878)
    , {
      slider: !isIOS(),
      subscribe,
      onChange,
      toggleMute
    }),
    backItems: /*#__PURE__*/jsxs$1(Fragment$1, {
      children: [/*#__PURE__*/jsx(ActiveSubtitles, {
        player: playerRef.current
      }), uiType === 'desktop' && !waiting && ( // In autohide mode, PlayPanel should work well.
      controls.autohide || mode !== 'hidden') && !activePanel && /*#__PURE__*/jsx(PlayPanel, {
        onClick: () => togglePlay()
      })]
    }),
    ...targetUIElements
  };
  useImperativeHandle(innerRef, () => ({
    setVolume: onChange,
    toggleMute
  }));
  return /*#__PURE__*/jsx(IntlProvider, { ...intl,
    children: /*#__PURE__*/jsxs$1(DefaultLayout, {
      style: style,
      type: uiType,
      display: mode,
      controlsDisplay: controlsDisplay,
      size: size,
      video: /*#__PURE__*/jsx(Video, { ...videoProps,
        videoRef: multiRef(videoRef, videoProps.videoRef),
        source: playbackState !== 'error' && sourceOverride,
        drm: drm,
        playbackState: targetState.playbackState,
        currentTime: targetState.currentTime,
        playbackRate: settings.values.speed,
        quality: qualityOptions,
        subtitles: settings.values.subtitles,
        audio: settings.values.audio,
        plugins: plugins,
        onError: handleError,
        onPlaybackStateChange: handlePlaybackStateChange,
        onBlockedAutoplay: handleBlockedAutoplay,
        onTimeUpdate: updatePlaybackTime,
        onDurationChange: updatePlaybackTime,
        onPlayerLoaded: player => {
          playerRef.current = player;
          onPlayerLoaded === null || onPlayerLoaded === void 0 ? void 0 : onPlayerLoaded(player);
        }
      }),
      containerRef: element => {
        containerRef.current = element;
        observe(element);
      },
      adContainerRef: adContainerRef,
      ...uiElements,
      onClick: onClick,
      onMouseMove: onMouseMove,
      children: [children, /*#__PURE__*/jsx(Settings, {
        type: uiType,
        sections: settings.sections // TODO hasBottomPanel bottom: 8em
        ,
        open: activePanel === 'settings',
        values: settings.values,
        onOpen: openSettings,
        onChange: ({
          name,
          value
        }) => changeSettings(name, value),
        onClose: () => setActivePanel('')
      }), waiting && /*#__PURE__*/jsx(LoadingSpinner, {}), /*#__PURE__*/jsx(Backdrop, {
        open: !playbackState || playbackState === 'loading',
        children: /*#__PURE__*/jsx(LoadingSpinner, {})
      }), playbackState === 'error' && /*#__PURE__*/jsx(Error$1, {
        error: errorData,
        onBack: onBack
      })]
    })
  });
};

const loadScript = url => new Promise(resolve => {
  const script = Object.assign(document.createElement('script'), {
    async: true,
    src: url
  });
  script.addEventListener('load', resolve);
  document.body.appendChild(script);
});

const SENDER_URL = 'https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1';

const getContext = () => cast.framework.CastContext.getInstance();

let loadSenderFramework;
/* global chrome, cast */

const ensureSenderFramework = () => {
  if (window.cast && cast.framework && window.chrome && chrome.cast) {
    return Promise.resolve(getContext());
  }

  if (!loadSenderFramework) {
    loadSenderFramework = new Promise((resolve, reject) => {
      // eslint-disable-next-line no-underscore-dangle
      window.__onGCastApiAvailable = isAvailable => {
        if (isAvailable) {
          resolve(getContext());
        } else {
          reject();
        }
      };

      loadScript(SENDER_URL);
    });
  }

  return loadSenderFramework;
};

const getMediaSession = () => {
  const context = getContext();
  const currentSession = context.getCurrentSession();
  return currentSession && currentSession.getMediaSession();
};

const setupCast = async ({
  appId
}) => {
  const context = await ensureSenderFramework();

  if (appId) {
    context.setOptions({
      receiverApplicationId: appId,
      resumeSavedSession: true,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
    });
  }
};

const connect = () => {
  const context = getContext();
  const currentSession = context.getCurrentSession();

  if (currentSession) {
    return Promise.resolve(currentSession);
  }

  return context.requestSession().then(() => context.getCurrentSession());
};

const disconnect = () => {
  const context = getContext();
  context.endCurrentSession(true);
};

const loadMedia = ({
  contentId,
  currentTime,
  data
}) => {
  var _session$getMediaSess;

  const request = new chrome.cast.media.LoadRequest(Object.assign(new chrome.cast.media.MediaInfo(contentId), {
    contentId,
    contentID: contentId,
    // itemType: contentType, mediaSource, customQuery: data.params, licenseId ?
    customData: data,
    metadata: new chrome.cast.media.GenericMediaMetadata()
  }));

  if (typeof currentTime === 'number') {
    request.currentTime = currentTime;
  }

  const session = getContext().getCurrentSession();
  const currentMedia = ((_session$getMediaSess = session.getMediaSession()) === null || _session$getMediaSess === void 0 ? void 0 : _session$getMediaSess.media) || {}; // no need to load if already playing TODO extrack checking

  if (contentId === currentMedia.contentId && data.itemType === currentMedia.customData.itemType) {
    return;
  }

  return session.loadMedia(request);
};

const subscribeCastState = handleStateChange => {
  const name = cast.framework.CastContextEventType.CAST_STATE_CHANGED;
  const context = getContext();

  const onChange = ({
    castState
  }) => handleStateChange(castState);

  handleStateChange(context.getCastState());
  context.addEventListener(name, onChange);
  return () => context.removeEventListener(name, onChange);
};

/* @jsxImportSource @emotion/react */
const connectingAnimation = keyframes`
  0% {
    background-image: url("${icon.castConntecting0}");
  }
  33% {
    background-image: url("${icon.castConntecting1}");
  }
  66% {
    background-image: url("${icon.castConntecting2}");
  }
  100% {
    background-image: url("${icon.castConntecting0}");
  }
`;
const icons = {
  [CastState.NOT_CONNECTED]: 'castNotConnected',
  [CastState.CONNECTING]: 'castConntecting0',
  [CastState.CONNECTED]: 'castConnected'
};
const invertColor = {
  filter: 'invert(100%)'
};
const connectingStyle = {
  animation: `${connectingAnimation} 3s infinite`
}; // data: {itemType: contentType, mediaSource, customQuery: data.params, licenseId ?}

const CastButton = props => {
  const [state, setState] = useState(CastState.NO_DEVICES_AVAILABLE);
  useEffect(() => {
    const setup = ensureSenderFramework().then(() => subscribeCastState(setState));
    return () => setup === null || setup === void 0 ? void 0 : setup.then(unsubscribe => unsubscribe());
  }, []);

  const toggleConnect = () => {
    if (state === CastState.CONNECTED) {
      disconnect();
    } else {
      connect();
      setState(CastState.CONNECTING);
    }
  };

  return state !== CastState.NO_DEVICES_AVAILABLE && jsx$1(Button, {
    startIcon: jsx$1(Icon, {
      type: icons[state],
      css: [invertColor, state === CastState.CONNECTING && connectingStyle, process.env.NODE_ENV === "production" ? "" : ";label:CastButton;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhc3RCdXR0b24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBb0VZIiwiZmlsZSI6IkNhc3RCdXR0b24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge3VzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHtrZXlmcmFtZXN9IGZyb20gJ0BlbW90aW9uL3JlYWN0J1xuXG5pbXBvcnQgaWNvblVybHMgZnJvbSAnc3R5bGUvaWNvbidcbmltcG9ydCBJY29uIGZyb20gJ3BsYXllclVpL0ljb24nXG5pbXBvcnQge0J1dHRvbn0gZnJvbSAncGxheWVyVWkvYnV0dG9ucydcbmltcG9ydCB7XG4gIGNvbm5lY3QsXG4gIGRpc2Nvbm5lY3QsXG4gIHN1YnNjcmliZUNhc3RTdGF0ZSxcbiAgZW5zdXJlU2VuZGVyRnJhbWV3b3JrLFxufSBmcm9tICdjYXN0L2ZyYW1ld29yaydcbmltcG9ydCB7Q2FzdFN0YXRlfSBmcm9tICdFbnVtJ1xuXG5jb25zdCBjb25uZWN0aW5nQW5pbWF0aW9uID0ga2V5ZnJhbWVzYFxuICAwJSB7XG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiJHtpY29uVXJscy5jYXN0Q29ubnRlY3RpbmcwfVwiKTtcbiAgfVxuICAzMyUge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiR7aWNvblVybHMuY2FzdENvbm50ZWN0aW5nMX1cIik7XG4gIH1cbiAgNjYlIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIke2ljb25VcmxzLmNhc3RDb25udGVjdGluZzJ9XCIpO1xuICB9XG4gIDEwMCUge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiR7aWNvblVybHMuY2FzdENvbm50ZWN0aW5nMH1cIik7XG4gIH1cbmBcblxuY29uc3QgaWNvbnMgPSB7XG4gIFtDYXN0U3RhdGUuTk9UX0NPTk5FQ1RFRF06ICdjYXN0Tm90Q29ubmVjdGVkJyxcbiAgW0Nhc3RTdGF0ZS5DT05ORUNUSU5HXTogJ2Nhc3RDb25udGVjdGluZzAnLFxuICBbQ2FzdFN0YXRlLkNPTk5FQ1RFRF06ICdjYXN0Q29ubmVjdGVkJyxcbn1cblxuY29uc3QgaW52ZXJ0Q29sb3IgPSB7XG4gIGZpbHRlcjogJ2ludmVydCgxMDAlKScsXG59XG5cbmNvbnN0IGNvbm5lY3RpbmdTdHlsZSA9IHtcbiAgYW5pbWF0aW9uOiBgJHtjb25uZWN0aW5nQW5pbWF0aW9ufSAzcyBpbmZpbml0ZWAsXG59XG5cbi8vIGRhdGE6IHtpdGVtVHlwZTogY29udGVudFR5cGUsIG1lZGlhU291cmNlLCBjdXN0b21RdWVyeTogZGF0YS5wYXJhbXMsIGxpY2Vuc2VJZCA/fVxuY29uc3QgQ2FzdEJ1dHRvbiA9IHByb3BzID0+IHtcbiAgY29uc3QgW3N0YXRlLCBzZXRTdGF0ZV0gPSB1c2VTdGF0ZShDYXN0U3RhdGUuTk9fREVWSUNFU19BVkFJTEFCTEUpXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgc2V0dXAgPSBlbnN1cmVTZW5kZXJGcmFtZXdvcmsoKS50aGVuKCgpID0+XG4gICAgICBzdWJzY3JpYmVDYXN0U3RhdGUoc2V0U3RhdGUpXG4gICAgKVxuICAgIHJldHVybiAoKSA9PiBzZXR1cD8udGhlbih1bnN1YnNjcmliZSA9PiB1bnN1YnNjcmliZSgpKVxuICB9LCBbXSlcbiAgY29uc3QgdG9nZ2xlQ29ubmVjdCA9ICgpID0+IHtcbiAgICBpZiAoc3RhdGUgPT09IENhc3RTdGF0ZS5DT05ORUNURUQpIHtcbiAgICAgIGRpc2Nvbm5lY3QoKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25uZWN0KClcbiAgICAgIHNldFN0YXRlKENhc3RTdGF0ZS5DT05ORUNUSU5HKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAoXG4gICAgc3RhdGUgIT09IENhc3RTdGF0ZS5OT19ERVZJQ0VTX0FWQUlMQUJMRSAmJiAoXG4gICAgICA8QnV0dG9uXG4gICAgICAgIHN0YXJ0SWNvbj17XG4gICAgICAgICAgPEljb25cbiAgICAgICAgICAgIHR5cGU9e2ljb25zW3N0YXRlXX1cbiAgICAgICAgICAgIGNzcz17W1xuICAgICAgICAgICAgICBpbnZlcnRDb2xvcixcbiAgICAgICAgICAgICAgc3RhdGUgPT09IENhc3RTdGF0ZS5DT05ORUNUSU5HICYmIGNvbm5lY3RpbmdTdHlsZSxcbiAgICAgICAgICAgIF19XG4gICAgICAgICAgLz5cbiAgICAgICAgfVxuICAgICAgICBvbkNsaWNrPXt0b2dnbGVDb25uZWN0fVxuICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAvPlxuICAgIClcbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBDYXN0QnV0dG9uXG4iXX0= */"]
    }),
    onClick: toggleConnect,
    ...props
  });
};

/* @jsxImportSource @emotion/react */
const styles = {
  flex: '100%',
  margin: '1rem 0',
  textAlign: 'center',
  h2: {
    fontSize: '120%',
    fontWeight: 'bold'
  }
};

const LiveEnd = ({
  reload,
  goBack
}) => jsxs(Backdrop, {
  open: true,
  children: [jsxs("div", {
    css: styles,
    children: [jsx$1("h2", {
      children: jsx$1(FormattedMessage, {
        id: "KKS.PROGRAM.TITLE"
      })
    }), jsx$1(FormattedMessage, {
      id: "KKS.PROGRAM.MESSAGE"
    })]
  }), jsx$1(Button, {
    variant: "outlined",
    onClick: reload,
    children: jsx$1(FormattedMessage, {
      id: "KKS.TRYAGAIN"
    })
  }), jsx$1(Button, {
    variant: "outlined",
    onClick: goBack,
    children: jsx$1(FormattedMessage, {
      id: "KKS.PLAYER.EXIT"
    })
  })]
});

LiveEnd.propTypes = {
  reload: PropTypes.func,
  goBack: PropTypes.func
};

/* @jsxImportSource @emotion/react */
const sizes = {
  normal: {
    bottom: '1rem',
    padding: '0.5rem',
    width: '18.5rem',
    height: '5.25rem',
    fontSize: '12px',
    '--spacing': '0rem'
  },
  big: {
    bottom: '5rem',
    padding: '0.75rem',
    width: '32rem',
    height: '10rem',
    fontSize: '20px',
    '--spacing': '0.5rem'
  }
};
const style$4 = {
  container: {
    position: 'absolute',
    zIndex: '-1',
    right: '0',
    display: 'flex',
    borderRadius: '4px',
    color: '#fff',
    backgroundColor: 'rgba(20, 20, 20, 0.8)',
    opacity: '0',
    transition: 'opacity 1s ease',
    'button:focus': {
      outline: 'none'
    }
  },
  opening: {
    zIndex: 'inherit',
    opacity: '1'
  },
  cover: imageUrl => ({
    flex: '0 40%',
    border: 'none',
    borderRadius: '4px',
    background: `
      center / 33% no-repeat url(${icon.playCircleBorder}),
      ${imageUrl ? `center / cover url(${imageUrl}),` : ''} 
      #ccc
    `
  }),
  info: {
    marginLeft: '0.5rem',
    flex: '1'
  },
  message: {
    marginBottom: ['1rem', 'var(--spacing)'],
    display: 'flex'
  },
  dismiss: {
    marginLeft: 'auto',
    width: ['2rem', 'calc(1.5rem + var(--spacing))'],
    height: ['2rem', 'calc(1.5rem + var(--spacing))'],
    border: 'none',
    background: `center / 1rem no-repeat url(${icon.close}), transparent`
  }
};

const PlayDialog = ({
  opening,
  coverImageUrl,
  message,
  title,
  play,
  dismiss,
  ...rest
}) => {
  const {
    observe,
    currentBreakpoint: size
  } = useDimensions({
    polyfill: ResizeObserver,
    breakpoints: {
      normal: 0,
      big: 600
    }
  });
  const containerRef = useRef();
  useEffect(() => {
    observe(containerRef.current.parentElement);
  });
  return jsxs("div", {
    css: [style$4.container, sizes[size], opening && style$4.opening, process.env.NODE_ENV === "production" ? "" : ";label:PlayDialog;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVwaXNvZGVDYXJkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZGTSIsImZpbGUiOiJFcGlzb2RlQ2FyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7dXNlRWZmZWN0LCB1c2VSZWZ9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuaW1wb3J0IHtSZXNpemVPYnNlcnZlcn0gZnJvbSAnQGp1Z2dsZS9yZXNpemUtb2JzZXJ2ZXInXG5pbXBvcnQgdXNlRGltZW5zaW9ucyBmcm9tICdyZWFjdC1jb29sLWRpbWVuc2lvbnMnXG5cbmltcG9ydCBpY29uIGZyb20gJ3N0eWxlL2ljb24nXG5cbmNvbnN0IHNpemVzID0ge1xuICBub3JtYWw6IHtcbiAgICBib3R0b206ICcxcmVtJyxcbiAgICBwYWRkaW5nOiAnMC41cmVtJyxcbiAgICB3aWR0aDogJzE4LjVyZW0nLFxuICAgIGhlaWdodDogJzUuMjVyZW0nLFxuICAgIGZvbnRTaXplOiAnMTJweCcsXG4gICAgJy0tc3BhY2luZyc6ICcwcmVtJyxcbiAgfSxcbiAgYmlnOiB7XG4gICAgYm90dG9tOiAnNXJlbScsXG4gICAgcGFkZGluZzogJzAuNzVyZW0nLFxuICAgIHdpZHRoOiAnMzJyZW0nLFxuICAgIGhlaWdodDogJzEwcmVtJyxcbiAgICBmb250U2l6ZTogJzIwcHgnLFxuICAgICctLXNwYWNpbmcnOiAnMC41cmVtJyxcbiAgfSxcbn1cblxuY29uc3Qgc3R5bGUgPSB7XG4gIGNvbnRhaW5lcjoge1xuICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgIHpJbmRleDogJy0xJyxcbiAgICByaWdodDogJzAnLFxuICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyMCwgMjAsIDIwLCAwLjgpJyxcbiAgICBvcGFjaXR5OiAnMCcsXG4gICAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMXMgZWFzZScsXG4gICAgJ2J1dHRvbjpmb2N1cyc6IHtcbiAgICAgIG91dGxpbmU6ICdub25lJyxcbiAgICB9LFxuICB9LFxuICBvcGVuaW5nOiB7XG4gICAgekluZGV4OiAnaW5oZXJpdCcsXG4gICAgb3BhY2l0eTogJzEnLFxuICB9LFxuICBjb3ZlcjogaW1hZ2VVcmwgPT4gKHtcbiAgICBmbGV4OiAnMCA0MCUnLFxuICAgIGJvcmRlcjogJ25vbmUnLFxuICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgYmFja2dyb3VuZDogYFxuICAgICAgY2VudGVyIC8gMzMlIG5vLXJlcGVhdCB1cmwoJHtpY29uLnBsYXlDaXJjbGVCb3JkZXJ9KSxcbiAgICAgICR7aW1hZ2VVcmwgPyBgY2VudGVyIC8gY292ZXIgdXJsKCR7aW1hZ2VVcmx9KSxgIDogJyd9IFxuICAgICAgI2NjY1xuICAgIGAsXG4gIH0pLFxuICBpbmZvOiB7XG4gICAgbWFyZ2luTGVmdDogJzAuNXJlbScsXG4gICAgZmxleDogJzEnLFxuICB9LFxuICBtZXNzYWdlOiB7XG4gICAgbWFyZ2luQm90dG9tOiBbJzFyZW0nLCAndmFyKC0tc3BhY2luZyknXSxcbiAgICBkaXNwbGF5OiAnZmxleCcsXG4gIH0sXG4gIGRpc21pc3M6IHtcbiAgICBtYXJnaW5MZWZ0OiAnYXV0bycsXG4gICAgd2lkdGg6IFsnMnJlbScsICdjYWxjKDEuNXJlbSArIHZhcigtLXNwYWNpbmcpKSddLFxuICAgIGhlaWdodDogWycycmVtJywgJ2NhbGMoMS41cmVtICsgdmFyKC0tc3BhY2luZykpJ10sXG4gICAgYm9yZGVyOiAnbm9uZScsXG4gICAgYmFja2dyb3VuZDogYGNlbnRlciAvIDFyZW0gbm8tcmVwZWF0IHVybCgke2ljb24uY2xvc2V9KSwgdHJhbnNwYXJlbnRgLFxuICB9LFxufVxuXG5jb25zdCBQbGF5RGlhbG9nID0gKHtcbiAgb3BlbmluZyxcbiAgY292ZXJJbWFnZVVybCxcbiAgbWVzc2FnZSxcbiAgdGl0bGUsXG4gIHBsYXksXG4gIGRpc21pc3MsXG4gIC4uLnJlc3Rcbn0pID0+IHtcbiAgY29uc3Qge29ic2VydmUsIGN1cnJlbnRCcmVha3BvaW50OiBzaXplfSA9IHVzZURpbWVuc2lvbnMoe1xuICAgIHBvbHlmaWxsOiBSZXNpemVPYnNlcnZlcixcbiAgICBicmVha3BvaW50czoge25vcm1hbDogMCwgYmlnOiA2MDB9LFxuICB9KVxuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWYoKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIG9ic2VydmUoY29udGFpbmVyUmVmLmN1cnJlbnQucGFyZW50RWxlbWVudClcbiAgfSlcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNzcz17W3N0eWxlLmNvbnRhaW5lciwgc2l6ZXNbc2l6ZV0sIG9wZW5pbmcgJiYgc3R5bGUub3BlbmluZ119XG4gICAgICByZWY9e2NvbnRhaW5lclJlZn1cbiAgICAgIHsuLi5yZXN0fVxuICAgID5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGFyaWEtbGFiZWw9XCJQbGF5IG5leHRcIlxuICAgICAgICBjc3M9e3N0eWxlLmNvdmVyKGNvdmVySW1hZ2VVcmwpfVxuICAgICAgICBvbkNsaWNrPXtwbGF5fVxuICAgICAgLz5cbiAgICAgIDxkaXYgY3NzPXtzdHlsZS5pbmZvfT5cbiAgICAgICAgPGRpdiBjc3M9e3N0eWxlLm1lc3NhZ2V9PlxuICAgICAgICAgIHttZXNzYWdlfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgYXJpYS1sYWJlbD1cIkRpc21pc3NcIlxuICAgICAgICAgICAgY3NzPXtzdHlsZS5kaXNtaXNzfVxuICAgICAgICAgICAgb25DbGljaz17ZGlzbWlzc31cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RpdGxlfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblBsYXlEaWFsb2cucHJvcFR5cGVzID0ge1xuICBvcGVuaW5nOiBQcm9wVHlwZXMuYm9vbCxcbiAgY292ZXJJbWFnZVVybDogUHJvcFR5cGVzLnN0cmluZyxcbiAgbWVzc2FnZTogUHJvcFR5cGVzLm5vZGUsXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZSxcbiAgY29udGFpbmVyUmVmOiBQcm9wVHlwZXMub2JqZWN0LFxuICBwbGF5OiBQcm9wVHlwZXMuZnVuYyxcbiAgZGlzbWlzczogUHJvcFR5cGVzLmZ1bmMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXlEaWFsb2dcbiJdfQ== */"],
    ref: containerRef,
    ...rest,
    children: [jsx$1("button", {
      type: "button",
      "aria-label": "Play next",
      css: style$4.cover(coverImageUrl),
      onClick: play
    }), jsxs("div", {
      css: style$4.info,
      children: [jsxs("div", {
        css: style$4.message,
        children: [message, jsx$1("button", {
          type: "button",
          "aria-label": "Dismiss",
          css: style$4.dismiss,
          onClick: dismiss
        })]
      }), title]
    })]
  });
};

PlayDialog.propTypes = {
  opening: PropTypes.bool,
  coverImageUrl: PropTypes.string,
  message: PropTypes.node,
  title: PropTypes.node,
  containerRef: PropTypes.object,
  play: PropTypes.func,
  dismiss: PropTypes.func
};

/* eslint-disable react/prop-types */

const useCountdownSecond = ({
  time,
  enabled,
  onEnd
}) => {
  const [timeLeft, setTimeLeft] = useState();
  useEffect(() => {
    if (!enabled) return;
    setTimeLeft(time);
    const intervalId = setInterval(() => setTimeLeft(current => current - 1), 1000);
    return () => clearInterval(intervalId);
  }, [time, enabled]);
  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd === null || onEnd === void 0 ? void 0 : onEnd();
    }
  }, [timeLeft <= 0]);
  return timeLeft;
};

const AutoplayPrompt = ({
  next,
  chapters,
  videoRef,
  ended,
  getCurrentTime,
  onChangeNext,
  onOpen,
  onDismiss
}) => {
  const [chapterType, setChapterType] = useState('');
  const [dismissedAt, setDismissedAt] = useState('');

  const updateChapter = ({
    endStart
  }) => setChapterType(getCurrentTime() >= endStart ? 'ending' : '');

  useEffect(() => {
    var _chapters$find;

    const endStart = (_chapters$find = chapters.find(chapter => chapter.type === 'ending')) === null || _chapters$find === void 0 ? void 0 : _chapters$find.start;
    updateChapter({
      endStart
    });
    return on$1(videoRef.current, 'timeupdate', () => updateChapter({
      endStart
    }));
  }, [chapters]);
  const endStatus = ended ? 'ended' : chapterType;
  useEffect(() => {
    if (!endStatus) {
      setDismissedAt('');
    } // don't open when seek back to endStart after ended


    if (endStatus === 'ending' && dismissedAt === 'ended') {
      setDismissedAt('ending');
    }
  }, [endStatus]);
  const open = endStatus && endStatus !== dismissedAt;
  useEffect(() => {
    if (open) {
      onOpen === null || onOpen === void 0 ? void 0 : onOpen(endStatus);
    } else {
      onDismiss === null || onDismiss === void 0 ? void 0 : onDismiss();
    }
  }, [open]);

  const playNext = () => {
    setDismissedAt(endStatus);
    onChangeNext();
  };

  const timeLeft = useCountdownSecond({
    time: 10,
    enabled: open,
    onEnd: playNext
  });
  return /*#__PURE__*/jsx(PlayDialog, {
    className: "pinned",
    opening: open,
    message: /*#__PURE__*/jsx(FormattedMessage, {
      id: "KKS.ENDROLL.COUNTDOWN",
      values: {
        timeLeft
      }
    }),
    title: next.title,
    coverImageUrl: next.image_url,
    play: playNext,
    dismiss: () => setDismissedAt(endStatus)
  });
};

/* @jsxImportSource @emotion/react */
const imageStyle = {
  zIndex: 1,
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  transform: 'translate(-50%, -50%)',
  background: '#000'
};

const CoverImage = ({
  src
}) => jsx$1("img", {
  alt: "Cover",
  css: imageStyle,
  src: src
});

CoverImage.propTypes = {
  src: PropTypes.string
};

const openIcon = {
  width: '1rem',
  height: '1rem',
  margin: '0 0.5rem',
  fontWeight: 'bold',
  backgroundImage: `url(${icon.arrowTop})`,
  transition: 'transform 1s ease'
};
const closeIcon = { ...openIcon,
  transform: 'rotateX(180deg)'
};
const titleStyle = {
  position: 'relative',
  padding: '0.5rem 2.5rem',
  display: 'flex',
  alignItems: 'center',
  color: '#ccc',
  fontSize: '20px',
  cursor: 'pointer'
};
const maskStyle = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: '100%',
  height: '100vh'
};
const contentStyle = {
  overflow: 'auto'
};
const contentHiddenStyle = {
  overflow: 'hidden',
  pointerEvents: 'none',
  touchAction: 'none'
};
const foldedHeight = '5rem';
const style$3 = {
  container: {
    position: 'absolute',
    width: '100%',
    transition: 'transform 0.5s ease',
    transform: 'translateY(0)'
  },
  open: {
    transform: `translateY(-100%) translateY(${foldedHeight})`
  }
};

const RecommendationPanel = ({
  open,
  onToggle,
  title,
  children = null
}) => children && jsx$1("div", {
  css: /*#__PURE__*/css({
    height: foldedHeight,
    marginTop: '-1rem'
  }, process.env.NODE_ENV === "production" ? "" : ";label:RecommendationPanel;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlY29tbWVuZGF0aW9uUGFuZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUVTIiwiZmlsZSI6IlJlY29tbWVuZGF0aW9uUGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuXG5jb25zdCBvcGVuSWNvbiA9IHtcbiAgd2lkdGg6ICcxcmVtJyxcbiAgaGVpZ2h0OiAnMXJlbScsXG4gIG1hcmdpbjogJzAgMC41cmVtJyxcbiAgZm9udFdlaWdodDogJ2JvbGQnLFxuICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDFzIGVhc2UnLFxufVxuXG5jb25zdCBjbG9zZUljb24gPSB7XG4gIC4uLm9wZW5JY29uLFxuICB0cmFuc2Zvcm06ICdyb3RhdGVYKDE4MGRlZyknLFxufVxuXG5jb25zdCB0aXRsZVN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgcGFkZGluZzogJzAuNXJlbSAyLjVyZW0nLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBjb2xvcjogJyNjY2MnLFxuICBmb250U2l6ZTogJzIwcHgnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbn1cblxuY29uc3QgbWFza1N0eWxlID0ge1xuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgbGVmdDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDB2aCcsXG59XG5cbmNvbnN0IGNvbnRlbnRTdHlsZSA9IHtcbiAgb3ZlcmZsb3c6ICdhdXRvJyxcbn1cblxuY29uc3QgY29udGVudEhpZGRlblN0eWxlID0ge1xuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgdG91Y2hBY3Rpb246ICdub25lJyxcbn1cblxuY29uc3QgZm9sZGVkSGVpZ2h0ID0gJzVyZW0nXG5cbmNvbnN0IHN0eWxlID0ge1xuICBjb250YWluZXI6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cyBlYXNlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgfSxcbiAgb3Blbjoge1xuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoLTEwMCUpIHRyYW5zbGF0ZVkoJHtmb2xkZWRIZWlnaHR9KWAsXG4gIH0sXG59XG5cbmNvbnN0IFJlY29tbWVuZGF0aW9uUGFuZWwgPSAoe29wZW4sIG9uVG9nZ2xlLCB0aXRsZSwgY2hpbGRyZW4gPSBudWxsfSkgPT5cbiAgY2hpbGRyZW4gJiYgKFxuICAgIDxkaXYgY3NzPXt7aGVpZ2h0OiBmb2xkZWRIZWlnaHQsIG1hcmdpblRvcDogJy0xcmVtJ319PlxuICAgICAgPGRpdlxuICAgICAgICBjc3M9e1tzdHlsZS5jb250YWluZXIsIG9wZW4gJiYgc3R5bGUub3Blbl19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgICAgIG9uVG9nZ2xlKClcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgY3NzPXt0aXRsZVN0eWxlfSBvbkNsaWNrPXtvcGVuICYmIG9uVG9nZ2xlID8gb25Ub2dnbGUgOiB1bmRlZmluZWR9PlxuICAgICAgICAgIHtvcGVuICYmIDxkaXYgY3NzPXttYXNrU3R5bGV9IC8+fVxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICA8ZGl2IGNzcz17W29wZW4gPyBjbG9zZUljb24gOiBvcGVuSWNvbl19IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNzcz17W2NvbnRlbnRTdHlsZSwgIW9wZW4gJiYgY29udGVudEhpZGRlblN0eWxlXX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcblxuUmVjb21tZW5kYXRpb25QYW5lbC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICBvblRvZ2dsZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvbW1lbmRhdGlvblBhbmVsXG4iXX0= */"),
  children: jsxs("div", {
    css: [style$3.container, open && style$3.open, process.env.NODE_ENV === "production" ? "" : ";label:RecommendationPanel;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlY29tbWVuZGF0aW9uUGFuZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUVRIiwiZmlsZSI6IlJlY29tbWVuZGF0aW9uUGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuXG5jb25zdCBvcGVuSWNvbiA9IHtcbiAgd2lkdGg6ICcxcmVtJyxcbiAgaGVpZ2h0OiAnMXJlbScsXG4gIG1hcmdpbjogJzAgMC41cmVtJyxcbiAgZm9udFdlaWdodDogJ2JvbGQnLFxuICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDFzIGVhc2UnLFxufVxuXG5jb25zdCBjbG9zZUljb24gPSB7XG4gIC4uLm9wZW5JY29uLFxuICB0cmFuc2Zvcm06ICdyb3RhdGVYKDE4MGRlZyknLFxufVxuXG5jb25zdCB0aXRsZVN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgcGFkZGluZzogJzAuNXJlbSAyLjVyZW0nLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBjb2xvcjogJyNjY2MnLFxuICBmb250U2l6ZTogJzIwcHgnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbn1cblxuY29uc3QgbWFza1N0eWxlID0ge1xuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgbGVmdDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDB2aCcsXG59XG5cbmNvbnN0IGNvbnRlbnRTdHlsZSA9IHtcbiAgb3ZlcmZsb3c6ICdhdXRvJyxcbn1cblxuY29uc3QgY29udGVudEhpZGRlblN0eWxlID0ge1xuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgdG91Y2hBY3Rpb246ICdub25lJyxcbn1cblxuY29uc3QgZm9sZGVkSGVpZ2h0ID0gJzVyZW0nXG5cbmNvbnN0IHN0eWxlID0ge1xuICBjb250YWluZXI6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cyBlYXNlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgfSxcbiAgb3Blbjoge1xuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoLTEwMCUpIHRyYW5zbGF0ZVkoJHtmb2xkZWRIZWlnaHR9KWAsXG4gIH0sXG59XG5cbmNvbnN0IFJlY29tbWVuZGF0aW9uUGFuZWwgPSAoe29wZW4sIG9uVG9nZ2xlLCB0aXRsZSwgY2hpbGRyZW4gPSBudWxsfSkgPT5cbiAgY2hpbGRyZW4gJiYgKFxuICAgIDxkaXYgY3NzPXt7aGVpZ2h0OiBmb2xkZWRIZWlnaHQsIG1hcmdpblRvcDogJy0xcmVtJ319PlxuICAgICAgPGRpdlxuICAgICAgICBjc3M9e1tzdHlsZS5jb250YWluZXIsIG9wZW4gJiYgc3R5bGUub3Blbl19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgICAgIG9uVG9nZ2xlKClcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgY3NzPXt0aXRsZVN0eWxlfSBvbkNsaWNrPXtvcGVuICYmIG9uVG9nZ2xlID8gb25Ub2dnbGUgOiB1bmRlZmluZWR9PlxuICAgICAgICAgIHtvcGVuICYmIDxkaXYgY3NzPXttYXNrU3R5bGV9IC8+fVxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICA8ZGl2IGNzcz17W29wZW4gPyBjbG9zZUljb24gOiBvcGVuSWNvbl19IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNzcz17W2NvbnRlbnRTdHlsZSwgIW9wZW4gJiYgY29udGVudEhpZGRlblN0eWxlXX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcblxuUmVjb21tZW5kYXRpb25QYW5lbC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICBvblRvZ2dsZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvbW1lbmRhdGlvblBhbmVsXG4iXX0= */"],
    onClick: () => {
      if (!open) {
        onToggle();
      }
    },
    children: [jsxs("div", {
      css: titleStyle,
      onClick: open && onToggle ? onToggle : undefined,
      children: [open && jsx$1("div", {
        css: maskStyle
      }), title, jsx$1("div", {
        css: [open ? closeIcon : openIcon, process.env.NODE_ENV === "production" ? "" : ";label:RecommendationPanel;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlY29tbWVuZGF0aW9uUGFuZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkVlIiwiZmlsZSI6IlJlY29tbWVuZGF0aW9uUGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuXG5jb25zdCBvcGVuSWNvbiA9IHtcbiAgd2lkdGg6ICcxcmVtJyxcbiAgaGVpZ2h0OiAnMXJlbScsXG4gIG1hcmdpbjogJzAgMC41cmVtJyxcbiAgZm9udFdlaWdodDogJ2JvbGQnLFxuICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDFzIGVhc2UnLFxufVxuXG5jb25zdCBjbG9zZUljb24gPSB7XG4gIC4uLm9wZW5JY29uLFxuICB0cmFuc2Zvcm06ICdyb3RhdGVYKDE4MGRlZyknLFxufVxuXG5jb25zdCB0aXRsZVN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgcGFkZGluZzogJzAuNXJlbSAyLjVyZW0nLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBjb2xvcjogJyNjY2MnLFxuICBmb250U2l6ZTogJzIwcHgnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbn1cblxuY29uc3QgbWFza1N0eWxlID0ge1xuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgbGVmdDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDB2aCcsXG59XG5cbmNvbnN0IGNvbnRlbnRTdHlsZSA9IHtcbiAgb3ZlcmZsb3c6ICdhdXRvJyxcbn1cblxuY29uc3QgY29udGVudEhpZGRlblN0eWxlID0ge1xuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgdG91Y2hBY3Rpb246ICdub25lJyxcbn1cblxuY29uc3QgZm9sZGVkSGVpZ2h0ID0gJzVyZW0nXG5cbmNvbnN0IHN0eWxlID0ge1xuICBjb250YWluZXI6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cyBlYXNlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgfSxcbiAgb3Blbjoge1xuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoLTEwMCUpIHRyYW5zbGF0ZVkoJHtmb2xkZWRIZWlnaHR9KWAsXG4gIH0sXG59XG5cbmNvbnN0IFJlY29tbWVuZGF0aW9uUGFuZWwgPSAoe29wZW4sIG9uVG9nZ2xlLCB0aXRsZSwgY2hpbGRyZW4gPSBudWxsfSkgPT5cbiAgY2hpbGRyZW4gJiYgKFxuICAgIDxkaXYgY3NzPXt7aGVpZ2h0OiBmb2xkZWRIZWlnaHQsIG1hcmdpblRvcDogJy0xcmVtJ319PlxuICAgICAgPGRpdlxuICAgICAgICBjc3M9e1tzdHlsZS5jb250YWluZXIsIG9wZW4gJiYgc3R5bGUub3Blbl19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgICAgIG9uVG9nZ2xlKClcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgY3NzPXt0aXRsZVN0eWxlfSBvbkNsaWNrPXtvcGVuICYmIG9uVG9nZ2xlID8gb25Ub2dnbGUgOiB1bmRlZmluZWR9PlxuICAgICAgICAgIHtvcGVuICYmIDxkaXYgY3NzPXttYXNrU3R5bGV9IC8+fVxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICA8ZGl2IGNzcz17W29wZW4gPyBjbG9zZUljb24gOiBvcGVuSWNvbl19IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNzcz17W2NvbnRlbnRTdHlsZSwgIW9wZW4gJiYgY29udGVudEhpZGRlblN0eWxlXX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcblxuUmVjb21tZW5kYXRpb25QYW5lbC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICBvblRvZ2dsZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvbW1lbmRhdGlvblBhbmVsXG4iXX0= */"]
      })]
    }), jsx$1("div", {
      css: [contentStyle, !open && contentHiddenStyle, process.env.NODE_ENV === "production" ? "" : ";label:RecommendationPanel;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlJlY29tbWVuZGF0aW9uUGFuZWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBK0VhIiwiZmlsZSI6IlJlY29tbWVuZGF0aW9uUGFuZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQgaWNvbiBmcm9tICdzdHlsZS9pY29uJ1xuXG5jb25zdCBvcGVuSWNvbiA9IHtcbiAgd2lkdGg6ICcxcmVtJyxcbiAgaGVpZ2h0OiAnMXJlbScsXG4gIG1hcmdpbjogJzAgMC41cmVtJyxcbiAgZm9udFdlaWdodDogJ2JvbGQnLFxuICBiYWNrZ3JvdW5kSW1hZ2U6IGB1cmwoJHtpY29uLmFycm93VG9wfSlgLFxuICB0cmFuc2l0aW9uOiAndHJhbnNmb3JtIDFzIGVhc2UnLFxufVxuXG5jb25zdCBjbG9zZUljb24gPSB7XG4gIC4uLm9wZW5JY29uLFxuICB0cmFuc2Zvcm06ICdyb3RhdGVYKDE4MGRlZyknLFxufVxuXG5jb25zdCB0aXRsZVN0eWxlID0ge1xuICBwb3NpdGlvbjogJ3JlbGF0aXZlJyxcbiAgcGFkZGluZzogJzAuNXJlbSAyLjVyZW0nLFxuICBkaXNwbGF5OiAnZmxleCcsXG4gIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICBjb2xvcjogJyNjY2MnLFxuICBmb250U2l6ZTogJzIwcHgnLFxuICBjdXJzb3I6ICdwb2ludGVyJyxcbn1cblxuY29uc3QgbWFza1N0eWxlID0ge1xuICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgbGVmdDogMCxcbiAgYm90dG9tOiAwLFxuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICcxMDB2aCcsXG59XG5cbmNvbnN0IGNvbnRlbnRTdHlsZSA9IHtcbiAgb3ZlcmZsb3c6ICdhdXRvJyxcbn1cblxuY29uc3QgY29udGVudEhpZGRlblN0eWxlID0ge1xuICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gIHBvaW50ZXJFdmVudHM6ICdub25lJyxcbiAgdG91Y2hBY3Rpb246ICdub25lJyxcbn1cblxuY29uc3QgZm9sZGVkSGVpZ2h0ID0gJzVyZW0nXG5cbmNvbnN0IHN0eWxlID0ge1xuICBjb250YWluZXI6IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB3aWR0aDogJzEwMCUnLFxuICAgIHRyYW5zaXRpb246ICd0cmFuc2Zvcm0gMC41cyBlYXNlJyxcbiAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgfSxcbiAgb3Blbjoge1xuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZVkoLTEwMCUpIHRyYW5zbGF0ZVkoJHtmb2xkZWRIZWlnaHR9KWAsXG4gIH0sXG59XG5cbmNvbnN0IFJlY29tbWVuZGF0aW9uUGFuZWwgPSAoe29wZW4sIG9uVG9nZ2xlLCB0aXRsZSwgY2hpbGRyZW4gPSBudWxsfSkgPT5cbiAgY2hpbGRyZW4gJiYgKFxuICAgIDxkaXYgY3NzPXt7aGVpZ2h0OiBmb2xkZWRIZWlnaHQsIG1hcmdpblRvcDogJy0xcmVtJ319PlxuICAgICAgPGRpdlxuICAgICAgICBjc3M9e1tzdHlsZS5jb250YWluZXIsIG9wZW4gJiYgc3R5bGUub3Blbl19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBpZiAoIW9wZW4pIHtcbiAgICAgICAgICAgIG9uVG9nZ2xlKClcbiAgICAgICAgICB9XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIDxkaXYgY3NzPXt0aXRsZVN0eWxlfSBvbkNsaWNrPXtvcGVuICYmIG9uVG9nZ2xlID8gb25Ub2dnbGUgOiB1bmRlZmluZWR9PlxuICAgICAgICAgIHtvcGVuICYmIDxkaXYgY3NzPXttYXNrU3R5bGV9IC8+fVxuICAgICAgICAgIHt0aXRsZX1cbiAgICAgICAgICA8ZGl2IGNzcz17W29wZW4gPyBjbG9zZUljb24gOiBvcGVuSWNvbl19IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNzcz17W2NvbnRlbnRTdHlsZSwgIW9wZW4gJiYgY29udGVudEhpZGRlblN0eWxlXX0+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcblxuUmVjb21tZW5kYXRpb25QYW5lbC5wcm9wVHlwZXMgPSB7XG4gIG9wZW46IFByb3BUeXBlcy5ib29sLFxuICBvblRvZ2dsZTogUHJvcFR5cGVzLmZ1bmMsXG4gIHRpdGxlOiBQcm9wVHlwZXMubm9kZSxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSZWNvbW1lbmRhdGlvblBhbmVsXG4iXX0= */"],
      children: children
    })]
  })
});

RecommendationPanel.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  title: PropTypes.node,
  children: PropTypes.node
};

const initState$1 = {
  mediaSources: [],
  selectedMediaSource: null,
  mediaSourcePrecedence: 'application',
  recommendationPanel: {
    enabled: false,
    opening: false
  },
  ad: {},
  error: null
};

const getAdStatus = action => {
  const {
    adPosition,
    totalAds,
    duration,
    clickThroughUrl
  } = action.adProgressData;
  return {
    position: adPosition,
    total: totalAds,
    adBreakDuration: duration,
    skipTimeOffset: action.skipTimeOffset,
    clickThroughUrl
  };
};

var reduceUi = ((state = initState$1, action) => {
  switch (action.type) {
    case type.SELECT_MEDIA_SOURCE:
      return { ...state,
        mediaSourcePrecedence: 'user',
        selectedMediaSource: action.mediaSource
      };

    case type.CHANGE_RECOMMENDATION_PANEL:
      return { ...state,
        recommendationPanel: {
          enabled: action.enabled,
          opening: action.enabled && state.recommendationPanel.opening
        },
        activePanel: action.enabled && state.recommendationPanel.opening ? 'recommendation' : undefined
      };

    case type.TOGGLE_RECOMMENDATION_PANEL:
      return { ...state,
        activePanel: state.activePanel === 'recommendation' ? undefined : 'recommendation'
      };

    case type.OPEN_PANEL:
      return { ...state,
        activePanel: action.panel
      };

    case type.HIDE_PANEL:
      return { ...state,
        activePanel: undefined
      };

    case type.PLAYBACK_END:
      return state.activePanel ? state : { ...state,
        activePanel: 'recommendation'
      };

    case type.OFFER_AUTOPLAY:
      return { ...state,
        activePanel: 'autoplay-next',
        ...(action.endState === 'ended' && {
          openNext: state.activePanel
        }),
        recommendationPanel: { ...state.recommendationPanel,
          opening: false
        }
      };

    case type.DISMISS_AUTOPLAY:
      return { ...state,
        activePanel: undefined,
        ...(state.openNext && {
          activePanel: state.openNext,
          recommendationPanel: {
            enabled: true,
            opening: true
          }
        }),
        openNext: ''
      };

    case 'content-change':
      return { ...state,
        ad: {},
        streamEvents: [],
        activePanel: undefined,
        openNext: undefined,
        recommendationPanel: { ...state.recommendationPanel,
          opening: false
        }
      };

    case type.STREAM_EVENTS_CHANGED:
      return { ...state,
        streamEvents: action.streamEvents
      };

    case type.AD_BREAK_STARTED:
      return { ...state,
        ad: getAdStatus(action),
        activePanel: ''
      };

    case type.AD_BREAK_ENDED:
      return { ...state,
        ad: {
          total: 0
        }
      };

    default:
      return state;
  }
});

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
const style$2 = {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  flex: '100%',
  margin: '1rem 0',
  padding: '0 1.5rem',
  textAlign: 'center',
  button: {
    position: 'absolute',
    top: '36px',
    left: '36px'
  }
};
const iconStyle = {
  width: '78px',
  height: '78px',
  filter: 'invert(100%)'
};

var _ref$1 = process.env.NODE_ENV === "production" ? {
  name: "8cucgv",
  styles: "flex:100%"
} : {
  name: "6koemc-CastOverlay",
  styles: "flex:100%;label:CastOverlay;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNhc3RPdmVybGF5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWtDVyIsImZpbGUiOiJDYXN0T3ZlcmxheS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcblxuaW1wb3J0IHtGb3JtYXR0ZWRNZXNzYWdlfSBmcm9tICdjb250ZXh0L0kxOG4nXG5pbXBvcnQgSWNvbiBmcm9tICcuL0ljb24nXG5pbXBvcnQge0J1dHRvbn0gZnJvbSAnLi9idXR0b25zJ1xuaW1wb3J0IEJhY2tkcm9wIGZyb20gJy4vQmFja2Ryb3AnXG5cbmNvbnN0IHN0eWxlID0ge1xuICBkaXNwbGF5OiAnZmxleCcsXG4gIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgZmxleFdyYXA6ICd3cmFwJyxcbiAgZmxleDogJzEwMCUnLFxuICBtYXJnaW46ICcxcmVtIDAnLFxuICBwYWRkaW5nOiAnMCAxLjVyZW0nLFxuICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICBidXR0b246IHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICB0b3A6ICczNnB4JyxcbiAgICBsZWZ0OiAnMzZweCcsXG4gIH0sXG59XG5cbmNvbnN0IGljb25TdHlsZSA9IHtcbiAgd2lkdGg6ICc3OHB4JyxcbiAgaGVpZ2h0OiAnNzhweCcsXG4gIGZpbHRlcjogJ2ludmVydCgxMDAlKScsXG59XG5cbmNvbnN0IENhc3RPdmVybGF5ID0gKHtvbkJhY2t9KSA9PiAoXG4gIDxCYWNrZHJvcCBvcGVuPlxuICAgIDxkaXYgY3NzPXtzdHlsZX0+XG4gICAgICA8QnV0dG9uIHN0YXJ0SWNvbj1cImJhY2tcIiBvbkNsaWNrPXtvbkJhY2t9IC8+XG4gICAgICA8SWNvbiB0eXBlPVwiY2FzdENvbm5lY3RlZFwiIHN0eWxlPXtpY29uU3R5bGV9IC8+XG4gICAgICA8ZGl2IGNzcz17e2ZsZXg6ICcxMDAlJ319PlxuICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cIktLUy5DQVNUSU5HXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L0JhY2tkcm9wPlxuKVxuXG5DYXN0T3ZlcmxheS5wcm9wVHlwZXMgPSB7XG4gIG9uQmFjazogUHJvcFR5cGVzLmZ1bmMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IENhc3RPdmVybGF5XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__$1
};

const CastOverlay = ({
  onBack
}) => jsx$1(Backdrop, {
  open: true,
  children: jsxs("div", {
    css: style$2,
    children: [jsx$1(Button, {
      startIcon: "back",
      onClick: onBack
    }), jsx$1(Icon, {
      type: "castConnected",
      style: iconStyle
    }), jsx$1("div", {
      css: _ref$1,
      children: jsx$1(FormattedMessage, {
        id: "KKS.CASTING"
      })
    })]
  })
});

CastOverlay.propTypes = {
  onBack: PropTypes.func
};

/* eslint-disable no-promise-executor-return */
const castContext = /*#__PURE__*/createContext();
const initState = {
  castState: null,
  playerState: null,
  castingMedia: null,
  deviceName: null,
  mediaTitle: null,
  duration: 0,
  progressTime: 0,
  customData: {},
  volume: 100,
  muted: false,
  streamType: null
};
const defaultCastContext = {
  state: {},
  actions: {
    hasPrevious: () => false,
    hasNext: () => false
  }
};

const getVolume = session => session && {
  volume: session.getVolume(),
  muted: session.isMute()
};
/* global chrome, cast */


const CastProvider = ({
  appId,
  onConnected,
  onCasting,
  onError,
  children
}) => {
  const actions = useRef(defaultCastContext.actions);
  const [state, setState] = useState({ ...initState,
    appId,
    actions: actions.current
  });

  const setCastState = value => setState(current => ({ ...current,
    ...value
  }));

  useEffect(() => {
    ensureSenderFramework().then(context => {
      const handleCastStateChange = ({
        castState
      }) => {
        const currentSession = context.getCurrentSession();
        const current = {
          castState,
          deviceName: castState === 'CONNECTED' && currentSession.getCastDevice().friendlyName
        };

        if (castState === 'CONNECTED') {
          if (typeof onConnected === 'function') onConnected(current);
        }

        setCastState(current);
      };

      context.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, handleCastStateChange);
      handleCastStateChange({
        castState: context.getCastState()
      });
      const player = new cast.framework.RemotePlayer();
      const controller = new cast.framework.RemotePlayerController(player);
      controller.addEventListener(cast.framework.RemotePlayerEventType.PLAYER_STATE_CHANGED, ({
        value
      }) => {
        if (value !== 'IDLE') {
          onCasting === null || onCasting === void 0 ? void 0 : onCasting();
        }

        setCastState({
          playerState: value,
          castingMedia: value !== 'IDLE' ? getMediaSession().media : null
        });
      });
      controller.addEventListener(cast.framework.RemotePlayerEventType.TITLE_CHANGED, ({
        value
      }) => setCastState({
        mediaTitle: value
      }));
      controller.addEventListener(cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED, ({
        value
      }) => setCastState({
        castingMedia: value,
        // After playing a while, media info is updated without customData
        // It's likely receiver app bug
        ...(value ? value.customData && {
          customData: value.customData
        } : {
          customData: {}
        })
      }));
      controller.addEventListener(cast.framework.RemotePlayerEventType.DURATION_CHANGED, ({
        value
      }) => setCastState({
        duration: value
      }));
      controller.addEventListener(cast.framework.RemotePlayerEventType.CURRENT_TIME_CHANGED, ({
        value
      }) => setCastState({
        progressTime: value
      }));
      controller.addEventListener(cast.framework.RemotePlayerEventType.MEDIA_INFO_CHANGED, ({
        value
      }) => setCastState({
        streamType: value && value.streamType
      }));
      controller.addEventListener(cast.framework.RemotePlayerEventType.IS_PLAYING_BREAK_CHANGED, ({
        value
      }) => setCastState({
        isPlayingBreak: value
      }));
      controller.addEventListener(cast.framework.RemotePlayerEventType.BREAK_CLIP_ID_CHANGED, ({
        value
      }) => {
        var _find, _getMediaSession$medi;

        return setCastState({
          breakClipId: value,
          clickThroughUrl: (_find = (((_getMediaSession$medi = getMediaSession().media) === null || _getMediaSession$medi === void 0 ? void 0 : _getMediaSession$medi.breakClips) || []).find(item => item.id === value)) === null || _find === void 0 ? void 0 : _find.clickThroughUrl
        });
      });
      controller.addEventListener(cast.framework.RemotePlayerEventType.CURRENT_BREAK_TIME_CHANGED, ({
        value
      }) => {
        setCastState({
          currentBreakTime: value,
          whenSkippable: player.whenSkippable
        });
      });

      const subscribeVolumeChange = handleChange => {
        const listeners = [on$1(controller, cast.framework.RemotePlayerEventType.VOLUME_LEVEL_CHANGED, () => handleChange(getVolume(getMediaSession()))), on$1(controller, cast.framework.RemotePlayerEventType.IS_MUTED_CHANGED, () => handleChange(getVolume(getMediaSession())))];
        return () => listeners.forEach(removeListener => removeListener());
      };

      const getItem = (media, index) => {
        const items = media.items || [];
        return items[(items.length + index) % items.length] || {};
      };

      return {
        connect: () => connect(),
        stopCasting: () => context.endCurrentSession(true),
        play: () => getMediaSession().play(new chrome.cast.media.PlayRequest()),
        pause: () => getMediaSession().pause(new chrome.cast.media.PauseRequest()),
        seek: ({
          origin,
          seconds
        }) => {
          const media = getMediaSession();
          const currentTime = seconds + (origin === SeekOrigin.CURRENT ? media.getEstimatedTime() : 0);
          media.seek(Object.assign(new chrome.cast.media.SeekRequest(), {
            currentTime
          }));
        },
        skipAd: () => controller.skipAd(),
        hasPrevious: () => {
          const media = getMediaSession() || {};
          return media.currentItemId !== getItem(media, 0).itemId;
        },
        hasNext: () => {
          const media = getMediaSession() || {};
          return media.currentItemId !== getItem(media, -1).itemId;
        },
        changePreviousEpisode: () => new Promise((resolve, reject) => getMediaSession().queuePrev(resolve, reject)),
        changeNextEpisode: () => new Promise((resolve, reject) => getMediaSession().queueNext(resolve, reject)),
        subscribeVolumeChange,
        setVolume: volume => controller.setVolumeLevel(volume * 100),
        setMute: () => controller.muteOrUnmute()
      };
    }).then(result => {
      setCastState({
        actions: result
      });
      actions.current = result;
    }).catch(error => typeof onError === 'function' && onError(error));
  }, []);
  return /*#__PURE__*/jsx(castContext.Provider, {
    value: state,
    children: children
  });
};

CastProvider.propTypes = {
  appId: PropTypes.string,
  children: PropTypes.node,
  onConnected: PropTypes.func,
  onCasting: PropTypes.func,
  onError: PropTypes.func
};

const useCastContext = () => useContext(castContext) || defaultCastContext;

const CastConsumer = castContext.Consumer;

const getChannelTime = ({
  start,
  end
}) => {
  const duration = end - start;
  const nowSecond = Math.floor(Date.now() / 1000);
  const currentTime = Math.max(0, Math.min(nowSecond - start, duration));
  return {
    currentTime,
    duration
  };
};

const SEEKABLE_END = {
  LIVE_EDGE: 'liveEdge',
  PROGRAM_END: 'programEnd'
};

const LinearTimeRewrite = () => {
  const config = {};
  let state = {};
  const ref = {};

  const getOffset = () => {
    var _ref$player, _ref$player$getPresen;

    return (_ref$player = ref.player) !== null && _ref$player !== void 0 && (_ref$player$getPresen = _ref$player.getPresentationStartTimeAsDate) !== null && _ref$player$getPresen !== void 0 && _ref$player$getPresen.call(_ref$player) ? config.start - ref.player.getPresentationStartTimeAsDate() / 1000 : 0;
  };

  const programTimeForPresentationTime = astTime => astTime - getOffset();

  const presentationTimeForProgramTime = programTime => programTime + getOffset();

  const getSeekRangeEnd = () => {
    var _ref$player2;

    return (_ref$player2 = ref.player) !== null && _ref$player2 !== void 0 && _ref$player2.isLive() ? Math.floor((Date.now() - state.baseTimeInMs) / 1000) + state.seekRangeEnd : Date.now() / 1000 - config.start;
  };

  return {
    load: async (_, {
      player,
      video
    }) => {
      if (config.disable) return;
      ref.player = player;
      ref.video = video;
      state = {}; // shaka only

      player.on('manifestparsed', () => {
        if (!player.isLive()) player.updateStartTime(Date.now() / 1000 - config.start);
      });
    },
    getPlaybackStatus: () => {
      var _ref$video2;

      if (config.disable) return {};

      if (!config.seekable) {
        return {};
      }

      if (config.seekable === 'auto') {
        const channelTime = getChannelTime(config);
        return channelTime.duration > 0 ? channelTime : {};
      }

      if (!state.seekRangeEnd) {
        var _ref$player3;

        state.seekRangeEnd = programTimeForPresentationTime((_ref$player3 = ref.player) === null || _ref$player3 === void 0 ? void 0 : _ref$player3.seekRange().end);
        state.baseTimeInMs = Date.now();
      }

      if (Object.values(SEEKABLE_END).includes(config.seekable.end)) {
        var _ref$video;

        return {
          duration: getChannelTime(config).duration,
          currentTime: programTimeForPresentationTime((_ref$video = ref.video) === null || _ref$video === void 0 ? void 0 : _ref$video.currentTime)
        };
      }

      return {
        duration: getSeekRangeEnd(),
        currentTime: programTimeForPresentationTime((_ref$video2 = ref.video) === null || _ref$video2 === void 0 ? void 0 : _ref$video2.currentTime)
      };
    },
    getSeekbarProps: () => {
      if (config.disable) return {};
      if (!ref.player || !config.seekable) return {};
      const seekRangeEnd = getSeekRangeEnd();

      if (config.seekable.back > 0) {
        return {
          min: seekRangeEnd - config.seekable.back,
          max: seekRangeEnd
        };
      }

      if (config.seekable.end === SEEKABLE_END.LIVE_EDGE) {
        return {
          min: 0,
          max: seekRangeEnd
        };
      }

      if (config.seekable.end === SEEKABLE_END.PROGRAM_END) {
        return {
          min: 0,
          max: config.end - config.start
        };
      }

      return {
        seek: null
      };
    },
    setConfig: newConfig => {
      Object.assign(config, newConfig);
    },
    handleSeek: (time, seekInternal) => {
      if (config.disable) return;
      seekInternal(presentationTimeForProgramTime(Math.min(time, getSeekRangeEnd())));
    },
    onResume: seekToLive => {
      var _config$seekable, _config$seekable2;

      if (config.disable) return;
      if ((_config$seekable = config.seekable) !== null && _config$seekable !== void 0 && _config$seekable.end) return;
      if (programTimeForPresentationTime(ref.video.currentTime) >= // eslint-disable-next-line no-unsafe-optional-chaining
      getSeekRangeEnd() - ((_config$seekable2 = config.seekable) === null || _config$seekable2 === void 0 ? void 0 : _config$seekable2.back)) return;

      if (!ref.player.isLive()) {
        if (config.start > 0) seek(ref.video, {
          player: ref.player
        }, Date.now() / 1000 - config.start);
      } else {
        seekToLive();
      }
    },
    isActive: () => config.seekable !== 'auto' && !config.disable,
    reset: () => {
      state = {};
    }
  };
};

const getEnterpriseDrmHeaders = ({
  token
}) => ({
  'X-Custom-Data': `token_type=playback&token_value=${token}`
});

const preloadMap = new Map();

const PremiumPlusPlayer = ({
  controls,
  preload: preload$1 = 'auto',
  preloadList = [],
  currentTime,
  quality: targetQuality,
  sourceType,
  host,
  accessToken,
  deviceId,
  headers,
  params,
  contentType,
  contentId,
  autoplayNext,
  thumbnailSeeking,
  plugins = [],
  coverImageUrl,
  recommendation,
  seekConfig = 'auto',
  uiElements,
  // FIXME: Currently we will get `undefined` from the `playerRef` because we use it without `forwardRef`. Check if we need to fix this issue
  playerRef,
  children,
  onError,
  onApiError,
  onPlaybackStateChange,
  onChange,
  onSourceTypeChanged,
  sendLog,
  playbackState: appPlaybackState,
  ...rest
}) => {
  var _lastSession$current3, _contentData$section, _contentData$section2, _contentData$section5, _contentData$section6, _uiState$streamEvents;

  const videoRef = useRef();
  const lastSession = useRef({});
  const logTarget = useRef();
  const preferAppTime = useRef(currentTime >= 0);
  const [playbackState, setPlaybackState] = useState('initial');
  const [playbackInfo, setPlaybackInfo] = useState({
    source: {}
  });
  const [contentData, setContentData] = useState({});
  const [settingState, setSettingState] = useState({
    sections: [],
    preferred: {}
  });
  const [targetPlaybackState, setTargetPlaybackState] = useState(appPlaybackState);
  const [uiState, dispatch] = useReducer(reduceUi, initState$1);
  const linearTimeRewritePlugin = useMemo(() => LinearTimeRewrite(), []); // Provide the content from the cache as soon as possible when the content has changed

  useEffect(() => {
    const dataInCache = preloadMap.get(`${contentType}/${contentId}`);

    if (dataInCache !== null && dataInCache !== void 0 && dataInCache.content) {
      setContentData(getContentInfo(dataInCache.content));
    }
  }, [contentType, contentId]);

  const endSession = ({
    preserveSource
  } = {}) => {
    var _lastSession$current;

    preferAppTime.current = false;

    if ((_lastSession$current = lastSession.current) !== null && _lastSession$current !== void 0 && _lastSession$current.end) {
      lastSession.current = {
        request: lastSession.current.end(),
        ...(preserveSource && {
          sources: lastSession.current.sources
        })
      };
    } // TODO this also triggers re-render to unload, we may need to explicitly trigger


    if (!preserveSource) {
      setContentData({
        chapters: []
      });
    }
  };

  const load = async () => {
    var _logTarget$current;

    const lastResult = await lastSession.current.request;
    (_logTarget$current = logTarget.current) === null || _logTarget$current === void 0 ? void 0 : _logTarget$current.reset();

    if (lastResult === 'cancel') {
      return;
    }

    logTarget.current = mapLogEvents({
      playerName: ['shaka', 'bitmovin'].find(name => name in rest),
      version: "1.11.0",
      video: videoRef.current
    });

    if (typeof sendLog === 'function') {
      logTarget.current.all((type, data) => sendLog(logEventNames[type], data));
    }

    const apiConfig = {
      host,
      accessToken,
      deviceId,
      headers,
      params
    };
    const sessionOptions = {
      type: contentType,
      id: contentId,
      media: videoRef.current,
      getCurrentTime: () => getMediaTime(videoRef.current, plugins).currentTime,
      onChangeContent: data => {
        const currentContent = getContentInfo(data);
        setContentData(currentContent);
        const {
          startTime
        } = currentContent;

        if (startTime >= 0 && !preferAppTime.current) {
          setPlaybackInfo(current => current.startTime === startTime ? current : { ...current,
            currentTime: startTime
          });
        }

        logTarget.current.updateContent(getContentInfo(data));
      },
      onInvalidToken: () => {
        console.log('invalid token, restart session');
        endSession({
          preserveSource: true
        });
        load();
      },
      onSourceChange: newSources => {
        lastSession.current.sources = newSources;
        const sourceSettings = getSourceTypeSettings(newSources);

        if (sourceSettings) {
          setSettingState(current => ({ ...current,
            sections: [sourceSettings]
          }));
        }
      },
      cache: preloadMap
    }; // TODO ignore live end error from /start /info
    // TODO try to clear session on error

    startPlaybackSession(createApi(apiConfig, {
      onError: onApiError
    }), sessionOptions).then(currentSession => {
      lastSession.current = currentSession;
      setPlaybackInfo({
        token: currentSession.token,
        drmPortalUrl: currentSession.drmPortalUrl,
        currentTime: preferAppTime.current ? currentTime : getContentInfo(currentSession.content).startTime
      });
    }).catch(result => {
      var _result$response, _result$response$data;

      const errorData = (_result$response = result.response) === null || _result$response === void 0 ? void 0 : (_result$response$data = _result$response.data) === null || _result$response$data === void 0 ? void 0 : _result$response$data.error;
      const error = errorData ? {
        name: 'PlaycraftApiError',
        ...errorData
      } : result;
      console.warn(error);
      videoRef.current.dispatchEvent(Object.assign(new CustomEvent('error'), {
        error
      }));
    });
  };

  const activeDevice = !/casting|error/.test(playbackState);
  useEffect(() => {
    if (appPlaybackState) {
      setTargetPlaybackState(appPlaybackState);
    }
  }, [appPlaybackState]);
  useEffect(() => {
    if (preload$1 === 'auto' && activeDevice && contentType && contentId) {
      load();
    }

    return () => endSession();
  }, [activeDevice, contentType, contentId]);
  useEffect(() => preload(createApi({
    host,
    accessToken,
    deviceId,
    headers,
    params
  }), preloadList, {
    id: contentId,
    type: contentType
  }, preloadMap), [accessToken, contentId, contentType, deviceId, headers, host, params, preloadList]);
  useImperativeHandle(playerRef, () => ({
    load,
    getVideo: () => videoRef.current
  }));
  useEffect(() => linkAdState({
    contentType,
    plugins,
    dispatch,
    // To align with iOS & Android, play the video after the ad is skipped even if its paused originally.
    onAdSkip: () => setTargetPlaybackState('playing')
  }), [contentType]);
  useEffect(() => {
    if (sourceType) {
      setSettingState(current => ({ ...current,
        values: { ...current.values,
          'source-type': sourceType
        },
        preferred: { ...current.preferred,
          'source-type': sourceType
        }
      }));
    }
  }, [sourceType]);
  const source = useMemo(() => {
    var _lastSession$current2;

    return getStreamInfo((_lastSession$current2 = lastSession.current) === null || _lastSession$current2 === void 0 ? void 0 : _lastSession$current2.sources, {
      type: settingState.preferred['source-type'],
      licenseUri: playbackInfo.drmPortalUrl,
      certificateUri: `${playbackInfo.drmPortalUrl}/fairplay_cert`,
      licenseHeaders: getEnterpriseDrmHeaders({
        token: playbackInfo.token
      }),
      thumbnailEnabled: thumbnailSeeking
    });
  }, [(_lastSession$current3 = lastSession.current) === null || _lastSession$current3 === void 0 ? void 0 : _lastSession$current3.sources, settingState.preferred['source-type'], thumbnailSeeking]); // TODO: extract ? cast things

  const {
    appId
  } = useCastContext();
  const castData = useMemo(() => ({
    itemType: contentType,
    host,
    accessToken,
    deviceId,
    customHeaders: headers,
    customQuery: params
  }), [contentType, host, accessToken, deviceId, headers, params]);
  useEffect(() => {
    const setup = setupCast({
      appId
    }).then(() => subscribeCastState(next => {
      if (next === CastState.CONNECTED) {
        setPlaybackState('casting');
      }

      if (next === CastState.NO_DEVICES_AVAILABLE || next === CastState.NOT_CONNECTED) {
        setPlaybackState('loading');
      }
    }));
    return () => setup.then(removeListener => removeListener());
  }, [appId]);
  const castConnected = playbackState === 'casting';
  useEffect(() => {
    if (castConnected && contentId) {
      loadMedia({
        contentId,
        data: castData
      });
    } // should keep connection after unmount

  }, [castConnected, contentId, castData]);
  const targetPlugins = useMemo(() => plugins.concat(linearTimeRewritePlugin), [linearTimeRewritePlugin, plugins]);
  const seekbarHide = !seekConfig || contentType === 'lives' && // eslint-disable-next-line no-unsafe-optional-chaining
  !(((_contentData$section = contentData.section) === null || _contentData$section === void 0 ? void 0 : _contentData$section.end) - ((_contentData$section2 = contentData.section) === null || _contentData$section2 === void 0 ? void 0 : _contentData$section2.start) > 0);
  useEffect(() => {
    var _contentData$section3, _contentData$section4;

    linearTimeRewritePlugin.setConfig({
      start: (_contentData$section3 = contentData.section) === null || _contentData$section3 === void 0 ? void 0 : _contentData$section3.start,
      end: (_contentData$section4 = contentData.section) === null || _contentData$section4 === void 0 ? void 0 : _contentData$section4.end,
      seekable: seekConfig,
      disable: contentType === 'videos'
    });
    return () => linearTimeRewritePlugin.reset();
  }, [(_contentData$section5 = contentData.section) === null || _contentData$section5 === void 0 ? void 0 : _contentData$section5.end, (_contentData$section6 = contentData.section) === null || _contentData$section6 === void 0 ? void 0 : _contentData$section6.start, contentType, linearTimeRewritePlugin, seekConfig]);
  return playbackState === 'casting' ? /*#__PURE__*/jsx(CastOverlay, {}) : /*#__PURE__*/jsxs$1(PremiumPlayer, {
    source: playbackState !== 'error' && source,
    currentTime: playbackInfo.currentTime,
    controls: uiState.activePanel === 'autoplay-next' ? 'title-only' : uiState.activePanel === 'recommendation' ? 'no-panel' : controls,
    title: contentData.title,
    quality: targetQuality,
    settings: settingState,
    seekbarHide: seekbarHide,
    plugins: targetPlugins,
    videoRef: videoRef,
    marks: (_uiState$streamEvents = uiState.streamEvents) === null || _uiState$streamEvents === void 0 ? void 0 : _uiState$streamEvents.map(event => event.start),
    onError: onError,
    sendLog: (name, data) => {
      var _logTarget$current2;

      return (_logTarget$current2 = logTarget.current) === null || _logTarget$current2 === void 0 ? void 0 : _logTarget$current2.emit(name, data);
    },
    onPlaybackStateChange: (event, state) => {
      setPlaybackState(state);

      if (state === 'error') {
        var _lastSession$current$, _lastSession$current4;

        (_lastSession$current$ = (_lastSession$current4 = lastSession.current).end) === null || _lastSession$current$ === void 0 ? void 0 : _lastSession$current$.call(_lastSession$current4);
        lastSession.current = {};
      }

      if (state === 'paused' && playbackState !== 'loading' || event.type === 'seeking') {
        var _lastSession$current$2, _lastSession$current5;

        (_lastSession$current$2 = (_lastSession$current5 = lastSession.current).updateLastPlayed) === null || _lastSession$current$2 === void 0 ? void 0 : _lastSession$current$2.call(_lastSession$current5);
      }

      if (state === 'ended') {
        dispatch(uiActions.playbackEnd());
      }
    },
    onChangeNext: contentData.next && (() => onChange === null || onChange === void 0 ? void 0 : onChange(contentData.next)),
    onChangePrevious: contentData.previous && (() => onChange === null || onChange === void 0 ? void 0 : onChange(contentData.previous)),
    onChangeSettings: ({
      name,
      value
    }) => {
      if (name === 'source-type') {
        setSettingState(current => ({ ...current,
          preferred: {
            'source-type': value
          }
        }));
        onSourceTypeChanged === null || onSourceTypeChanged === void 0 ? void 0 : onSourceTypeChanged(value);
      }
    },
    uiElements: { ...uiElements,
      ...(uiState.ad.total > 0 && getAdUi(uiState.ad, plugins, videoRef.current))
    },
    overrideSettingSections: sections => {
      // Speed sections will be provided for VOD content by default in PremiumPlayer. We want to hide it for self linear.
      if (contentType === 'lives') {
        return sections.filter(s => s.name !== 'speed');
      }

      return sections;
    },
    playbackState: targetPlaybackState,
    ...rest,
    style: recommendation && {
      '--bottom-spacing': '5rem'
    },
    children: [children, /*#__PURE__*/jsx(FunctionBarExtension, {
      children: /*#__PURE__*/jsx(CastButton, {
        contentId: contentId,
        data: castData
      })
    }), autoplayNext && contentData.next && /playing|ended/.test(playbackState) && /*#__PURE__*/jsx(AutoplayPrompt, {
      next: contentData.next,
      chapters: contentData.chapters,
      videoRef: videoRef,
      ended: playbackState === 'ended',
      getCurrentTime: () => getMediaTime(videoRef.current, plugins).currentTime,
      onChangeNext: () => onChange === null || onChange === void 0 ? void 0 : onChange(contentData.next),
      onOpen: state => dispatch(uiActions.offerAutoplay(state)),
      onDismiss: () => dispatch(uiActions.dismissAutoplay())
    }), recommendation && isDesktop() && /*#__PURE__*/jsx(RecommendationPanel, {
      title: recommendation.title,
      open: uiState.activePanel === 'recommendation',
      onToggle: () => dispatch(uiActions.toggleRecommendationPanel()),
      children: recommendation.content
    }), contentData.end && /*#__PURE__*/jsx(LiveEnd, {}), preload$1 === 'none' && coverImageUrl && !source && /*#__PURE__*/jsx(CoverImage, {
      src: coverImageUrl
    })]
  });
};

PremiumPlusPlayer.propTypes = {
  controls: PropTypes.object,
  preload: PropTypes.string,
  currentTime: PropTypes.number,
  quality: PropTypes.object,
  sourceType: PropTypes.string,
  host: PropTypes.string,
  accessToken: PropTypes.string,
  deviceId: PropTypes.string,
  headers: PropTypes.object,
  params: PropTypes.object,
  contentType: PropTypes.string,
  contentId: PropTypes.string,
  autoplayNext: PropTypes.bool,
  thumbnailSeeking: PropTypes.bool,
  plugins: PropTypes.array,
  coverImageUrl: PropTypes.string,
  recommendation: PropTypes.object,
  seekConfig: PropTypes.oneOf(['auto', false, null, PropTypes.shape({
    back: PropTypes.number
  }), PropTypes.shape({
    end: PropTypes.oneOf(Object.values(SEEKABLE_END))
  })]),
  uiElements: PropTypes.shape({
    controlButtons: {
      forwardButton: PropTypes.node,
      rewindButton: PropTypes.node
    }
  }),
  preloadList: PropTypes.arrayOf(PropTypes.shape({
    contentType: PropTypes.oneOf(['videos', 'lives']),
    contentId: PropTypes.string
  })),
  playerRef: PropTypes.string,
  children: PropTypes.node,
  onError: PropTypes.func,
  onApiError: PropTypes.func,
  onPlaybackStateChange: PropTypes.func,
  onChange: PropTypes.func,
  onSourceTypeChanged: PropTypes.func,
  sendLog: PropTypes.func,
  playbackState: PropTypes.string
};

/* eslint-disable react/prop-types */

const dispatchError = (element, error) => element.dispatchEvent(Object.assign(new CustomEvent('error'), {
  error
})); // eslint-disable-next-line react/display-name


const Player = /*#__PURE__*/forwardRef(({
  licenseKey,
  config: {
    basePlayer,
    ...config$1
  } = {
    basePlayer: 'bitmovin',
    ...config.BitmovinConfig
  },
  host,
  accessToken,
  deviceId,
  content,
  customHeader: headers = {},
  customQuery: params = {},
  lang: locale = LanguageCode$1.EN,
  langCustomCode: messages = {},
  preload = 'auto',
  autoPlay,
  autoPlayNext,
  autoplay = autoPlay,
  autoplayNext = autoPlayNext,
  startTime,
  quality,
  mediaSource,
  thumbnailSeeking,
  supportEnvironmentList: environmentAllowList,
  limitOnePlaybackAtSameTime: denyMultiTab,
  recommendation,
  toolPanels = [],
  coverImageUrl,
  plugins = [],
  sentry = {},
  preloadList = [],
  seekConfig = 'auto',
  onBack,
  onChangeVideo,
  onClickSettingButton,
  onLogging,
  onMediaSourceChanged,
  children
}, ref) => {
  const basePlayerConfig = basePlayer === 'shaka' ? {
    shaka: config$1
  } : basePlayer === 'bitmovin' ? {
    bitmovin: {
      key: licenseKey,
      ...config$1
    }
  } : {};
  useEffect(() => {
    if (sentry.key || "474e98b498954d1085c47e76af622ab3") {
      addSentry({ ...sentry,
        key: sentry.key || "474e98b498954d1085c47e76af622ab3"
      });
    }
  }, []);
  useEffect(() => {
    const envError = validateEnvironment(environmentAllowList);

    if (envError) {
      dispatchError(ref.current.getVideo(), {
        name: envError.name,
        data: envError
      });
    }

    if (denyMultiTab) {
      const revokeLock = ensureTabLock();

      if (!revokeLock) {
        dispatchError(ref.current.getVideo(), {
          name: 'PlaycraftApiError',
          code: 1002
        });
      }

      return revokeLock;
    }
  }, []);
  return jsxs(PremiumPlusPlayer, { ...basePlayerConfig,
    currentTime: startTime,
    preload: preload,
    autoplay: autoplay,
    quality: quality.qualitySelectionHack ? {
      rewriteManifest: selectHlsQualities
    } : {},
    sourceType: mediaSource,
    plugins: plugins,
    playerRef: ref,
    intl: {
      locale,
      messages
    },
    host: host,
    accessToken: accessToken,
    deviceId: deviceId,
    headers: headers,
    params: params,
    contentType: content.contentType,
    contentId: content.contentId,
    autoplayNext: autoplayNext,
    thumbnailSeeking: thumbnailSeeking,
    coverImageUrl: coverImageUrl,
    recommendation: recommendation,
    preloadList: preloadList,
    seekConfig: seekConfig,
    onBack: onBack,
    onChange: content => onChangeVideo({
      videoId: content.id
    }),
    onOpenSettings: onClickSettingButton,
    onLogging: onLogging,
    onSourceTypeChanged: onMediaSourceChanged,
    children: [children, toolPanels.map(({
      content,
      button,
      open,
      style,
      hasBackdrop = true,
      pinned = false,
      foldedHeight = 0,
      onClose
    }, index) => jsx$1(BottomPanel, {
      open: open,
      style: style,
      backdrop: hasBackdrop,
      pinned: pinned,
      minimizedHeight: foldedHeight,
      button: button,
      onClose: onClose,
      children: content
    }, index))]
  });
});
Player.propTypes = {
  licenseKey: PropTypes.string.isRequired,
  host: PropTypes.string,
  accessToken: PropTypes.string,
  deviceId: PropTypes.string,
  content: Types.VideoInfo,
  lang: Types.LanguageCode,
  langCustomCode: PropTypes.object,
  customHeader: PropTypes.object,
  customQuery: PropTypes.object,
  thumbnailSeeking: PropTypes.bool,
  limitOnePlaybackAtSameTime: PropTypes.bool,
  preload: PropTypes.oneOf(['auto', 'none']),
  autoplay: PropTypes.bool,
  autoplayNext: PropTypes.bool,
  startTime: PropTypes.number,
  quality: PropTypes.object,
  mediaSource: PropTypes.string,
  supportEnvironmentList: PropTypes.arrayOf(Types.SupportEnvironmentItem),
  config: PropTypes.object,
  toolPanels: PropTypes.array,
  recommendation: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  coverImageUrl: PropTypes.string,
  widevine: PropTypes.string,
  plugins: PropTypes.array,
  sentry: PropTypes.object,
  onError: PropTypes.func,
  onSourceLoaded: PropTypes.func,
  onReady: PropTypes.func,
  onPlay: PropTypes.func,
  onPlaying: PropTypes.func,
  onSeek: PropTypes.func,
  onSeeked: PropTypes.func,
  onPaused: PropTypes.func,
  onTimeChanged: PropTypes.func,
  onVolumeChanged: PropTypes.func,
  onMuted: PropTypes.func,
  onUnmuted: PropTypes.func,
  onStallStarted: PropTypes.func,
  onStallEnded: PropTypes.func,
  onReplay: PropTypes.func,
  onVideoQualityChanged: PropTypes.func,
  onMediaSourceChanged: PropTypes.func,
  onEnded: PropTypes.func,
  onEnterFullscreen: PropTypes.func,
  onExitFullscreen: PropTypes.func,
  onViewModeChange: PropTypes.func,
  onChangeVideo: PropTypes.func,
  onChangeToNextVideo: PropTypes.func,
  onChangeToPreviousVideo: PropTypes.func,
  onClickSettingButton: PropTypes.func,
  onBack: PropTypes.func,
  onSectionChange: PropTypes.func,
  onSourceUnloaded: PropTypes.func,
  onLogging: PropTypes.func
};

/** @param {string} m3u8Manifest */
const getManifestUrl = ({
  url,
  data
}) => {
  const lines = data.split('\n');
  const i = lines.findIndex(line => line.startsWith('#EXT-X-STREAM-INF'));
  return i >= 0 ? new URL(lines[i + 1], url) : '';
};
/** @param {string} url */


const fetchManifests = async url => {
  if (!url.toString().split('?')[0].endsWith('.m3u8')) {
    return fetch(url);
  }

  const data = await fetch(url).then(result => result.text());
  const innerUrl = getManifestUrl({
    url,
    data
  });
  return innerUrl && fetchManifests(innerUrl);
};

/* eslint-disable class-methods-use-this */

/* eslint-disable no-underscore-dangle */
const _IsNumber = value => typeof value === 'number' && value >= 0;

const AD_TIME_EVENT_TYPE = ['impression', 'start', 'firstQuartile', 'midpoint', 'thirdQuartile', 'complete'];

const doNothing = () => {};

const getSkipTimeOffset = ad => {
  var _ad$skipOffset, _ad$skipOffset$match, _ad$skipOffset2;

  if (!ad.skipOffset) {
    return;
  }

  const percentageOffset = (((_ad$skipOffset = ad.skipOffset) === null || _ad$skipOffset === void 0 ? void 0 : (_ad$skipOffset$match = _ad$skipOffset.match(/\d+/)) === null || _ad$skipOffset$match === void 0 ? void 0 : _ad$skipOffset$match[0]) || 0) / 100; // 00:01:07 -> 67

  const timeOffset = (((_ad$skipOffset2 = ad.skipOffset) === null || _ad$skipOffset2 === void 0 ? void 0 : _ad$skipOffset2.match(/(\d+):(\d+):(\d+)/)) || []).slice(1, 4).reduce((last, time) => last * 60 + +time, 0);
  return timeOffset + ad.durationInSeconds * percentageOffset;
};

const inRange = ({
  startTimeInSeconds,
  durationInSeconds
}, time) => startTimeInSeconds <= time && time <= startTimeInSeconds + durationInSeconds;

const getCurrentAd = (adBreak, streamTime) => ((adBreak === null || adBreak === void 0 ? void 0 : adBreak.ads) || []).find(ad => inRange(ad, streamTime)) || {};

const adEventData = (instance, ad) => {
  const streamTime = instance._common.currentPosition;
  const currentAd = getCurrentAd(ad, streamTime);
  return {
    getAd: () => ({
      getSkipTimeOffset: () => getSkipTimeOffset(currentAd)
    }),
    getStreamData: () => {
      var _currentAd$trackingEv, _currentAd$trackingEv2;

      const adItems = [].concat(...instance.waitingForPlayAds.map(avail => avail.ads));
      const adPosition = 1 + adItems.findIndex(item => inRange(item, streamTime));
      const adProgressData = {
        adPosition,
        totalAds: adItems.length,
        currentTime: streamTime - currentAd.startTimeInSeconds,
        duration: currentAd.durationInSeconds,
        clickThroughUrl: (_currentAd$trackingEv = currentAd.trackingEvents) === null || _currentAd$trackingEv === void 0 ? void 0 : (_currentAd$trackingEv2 = _currentAd$trackingEv.find(event => event.eventType === 'clickThrough')) === null || _currentAd$trackingEv2 === void 0 ? void 0 : _currentAd$trackingEv2.beaconUrls[0]
      };
      return {
        adProgressData
      };
    }
  };
};

class Impression {
  constructor({
    seek,
    onAdBreakStarted = doNothing,
    onAdProgress = doNothing,
    onAdBreakEnded = doNothing,
    onSkippableStateChanged = doNothing
  } = {}) {
    this._common = {
      adBreaks: [],
      currentPosition: -1,
      seek,
      onAdBreakStarted,
      onAdProgress,
      onSkippableStateChanged,
      onAdBreakEnded
    };
    this.currentAd = null;
    this.waitingForPlayAds = [];
    this.waitingForPlayAdIndex = null;
    this.resumeUserSeekTime = null;
    this.resumeAdStartTime = null;
    this.isResumed = null;
    this.checkAdEventProcess = null;
  }
  /**
   * @description
   * @param {object[]} value
   */


  set adBreaks(value) {
    this._common.adBreaks = value;
    if (_IsNumber(value.length)) this.checkAdCueTone();
  }
  /**
   * @description when position is updated, check if ad is started or ended
   * @param {number} value current position in seconds
   */


  set currentPosition(value) {
    this._common.currentPosition = value;
    if (_IsNumber(this._common.adBreaks.length)) this.checkAdCueTone();
  } // TODO: send ad status (current ad index, count, total duration)


  getAdIndex(target) {
    if (!target) return null;
    return this._common.adBreaks.findIndex(ad => ad.availId === target.availId);
  } // 取得播放時間是在哪個廣告區間


  getActiveAdIndex(time) {
    var _adBreaks$index;

    const {
      adBreaks = []
    } = this._common;
    const index = adBreaks.findIndex(ad => {
      const {
        startTime,
        endTime
      } = this.getAdTimingInfo(ad);
      return time >= startTime && time <= endTime;
    });
    const position = (((_adBreaks$index = adBreaks[index]) === null || _adBreaks$index === void 0 ? void 0 : _adBreaks$index.ads) || []).findIndex(ad => inRange(ad, time));
    return {
      index,
      position
    };
  } // 檢查播放時間是否在所提供的區間


  isWithinTimeRange(target, startTime, endTime) {
    return target >= startTime && target <= endTime;
  } // 取得該廣告的起始/結束時間


  getAdTimingInfo(adInfo = {}) {
    const adStartTime = adInfo.startTimeInSeconds || 0;
    const adDuration = adInfo.durationInSeconds || 0;
    return {
      startTime: adStartTime,
      endTime: adStartTime + adDuration
    };
  } // 取得跳過的廣告


  getSkippedAds(time) {
    return this._common.adBreaks.filter(ad => this._common.currentPosition <= ad.startTimeInSeconds && ad.startTimeInSeconds <= time && !ad.isFired);
  }

  setAdIsFiredByIndex() {}

  checkAdCueTone() {
    const {
      adBreaks,
      currentPosition,
      seek
    } = this._common;
    const {
      index: activeAdIndex,
      position
    } = this.getActiveAdIndex(currentPosition);

    if (this.currentAd) {
      if (!this.checkAdEventProcess) {
        this.checkAdEventProcess = this.checkAdEvent();
      }

      this.checkAdEventProcess({
        index: activeAdIndex,
        position
      });
    }

    if (this.waitingForPlayAds.length > 0) {
      const {
        startTime: currentAdStartTime,
        endTime: currentAdEndTime
      } = this.getAdTimingInfo(this.currentAd);
      const isAdStillPlaying = this.isWithinTimeRange(currentPosition, currentAdStartTime, currentAdEndTime);

      if (!isAdStillPlaying) {
        // Ad finished
        const nextAd = this.waitingForPlayAds[`${this.waitingForPlayAdIndex + 1}`];
        if (currentPosition < this.currentAd.startTimeInSeconds + this.currentAd.durationInSeconds) return;

        if (nextAd) {
          // have non-played & skipped Ad
          const adIndex = this.getAdIndex(this.currentAd);
          const {
            startTime: nextAdStartTime
          } = this.getAdTimingInfo(nextAd);
          this.setAdIsFiredByIndex(adIndex);
          this.updateWaitingForPlayIndex(this.waitingForPlayAdIndex + 1);
          this.updateCurrentAd(nextAd);
          seek === null || seek === void 0 ? void 0 : seek(nextAdStartTime);
        } else {
          // don't have non-played Ad
          const adIndex = this.getAdIndex(this.currentAd);
          this.setAdIsFiredByIndex(adIndex);
          this.updateWaitingForPlayAds([]);
          this.updateWaitingForPlayIndex(null);
          this.updateCurrentAd(null);
          _IsNumber(this.resumeUserSeekTime) && (seek === null || seek === void 0 ? void 0 : seek(this.resumeUserSeekTime));
          this.resumeUserSeekTime = null;
        }
      }
    } else if (activeAdIndex !== -1) {
      if (!adBreaks[activeAdIndex].isFired) {
        this.updateWaitingForPlayIndex(0);
        this.updateWaitingForPlayAds(adBreaks.slice(activeAdIndex, activeAdIndex + 1));
        this.updateCurrentAd(adBreaks[activeAdIndex]);
      } else {
        // in Ad duration but Ad was played
        this.updateCurrentAd(adBreaks[`${activeAdIndex}`] || {});
      }
    } else {
      // not in Ad duration
      this.updateCurrentAd(null);
    }
  }

  checkAdEvent() {
    const state = {
      lastPosition: undefined,
      isSkippableEventFired: false
    };
    return ({
      index,
      position
    }) => {
      var _currentAd$trackingEv3, _currentAd$trackingEv4;

      const streamTime = this._common.currentPosition;
      const currentBreak = this._common.adBreaks[index];
      const currentAd = currentBreak === null || currentBreak === void 0 ? void 0 : currentBreak.ads[position];

      if (!currentAd) {
        return;
      }

      if (position !== state.lastPosition) {
        var _this$_common$onAdPro, _this$_common;

        (_this$_common$onAdPro = (_this$_common = this._common).onAdProgress) === null || _this$_common$onAdPro === void 0 ? void 0 : _this$_common$onAdPro.call(_this$_common, adEventData(this, currentBreak));
        Object.assign(state, {
          lastPosition: position,
          isSkippableEventFired: false,
          trackingTypes: AD_TIME_EVENT_TYPE.slice()
        });
      }

      if (!state.isSkippableEventFired && streamTime >= currentAd.startTimeInSeconds + getSkipTimeOffset(currentAd)) {
        state.isSkippableEventFired = true;

        this._common.onSkippableStateChanged({
          getAd: () => ({
            isSkippable: () => true
          })
        });
      }

      if (!_IsNumber(streamTime) || ((_currentAd$trackingEv3 = currentAd.trackingEvents) === null || _currentAd$trackingEv3 === void 0 ? void 0 : _currentAd$trackingEv3.length) <= 0) return;
      (_currentAd$trackingEv4 = currentAd.trackingEvents) === null || _currentAd$trackingEv4 === void 0 ? void 0 : _currentAd$trackingEv4.forEach(e => {
        const {
          eventType = '',
          beaconUrls = [],
          startTimeInSeconds = 0,
          isFired
        } = e;
        const adEventIndex = state.trackingTypes.findIndex(type => type === eventType);

        if (!isFired && beaconUrls.length > 0 && streamTime >= startTimeInSeconds && adEventIndex !== -1) {
          beaconUrls.forEach(url => {
            fetch(url);
          });
          state.trackingTypes.splice(adEventIndex, 1);
        }
      });
    };
  }
  /**
   * @description To snapback if seeking over some ads
   * @param {number} to
   */


  onSeek(to) {
    const {
      adBreaks
    } = this._common;
    const skippedAds = this.getSkippedAds(to);
    const seekTargetAdIndex = this.getActiveAdIndex(to);
    if (!adBreaks || adBreaks.length <= 0) return;

    if (this.currentAd) ; else if (skippedAds.length > 0) {
      this.updateWaitingForPlayAds(skippedAds);
      this.updateWaitingForPlayIndex(0);
      this.resumeUserSeekTime = seekTargetAdIndex === -1 ? to : null;
    } else if (seekTargetAdIndex !== -1 && !_IsNumber(this.resumeAdStartTime) && !this.isResumed) {
      const {
        startTime
      } = this.getAdTimingInfo(adBreaks[seekTargetAdIndex]);
      this.resumeAdStartTime = startTime;
    }
  }
  /** @description to seek to next ad after snapback */


  onSeeked() {
    const {
      adBreaks,
      seek
    } = this._common;
    if (!adBreaks || adBreaks.length <= 0) return;

    if (this.waitingForPlayAds.length > 0 && !this.currentAd) {
      const nextAd = this.waitingForPlayAds[`${this.waitingForPlayAdIndex}`] || {};
      const {
        startTime: nextAdStartTime
      } = this.getAdTimingInfo(nextAd);
      seek === null || seek === void 0 ? void 0 : seek(nextAdStartTime);
      this.updateCurrentAd(nextAd);
    } else if (this.currentAd) ; else if (_IsNumber(this.resumeAdStartTime)) {
      _IsNumber(this.resumeAdStartTime) && (seek === null || seek === void 0 ? void 0 : seek(this.resumeAdStartTime));
      this.resumeAdStartTime = null;
      this.isResumed = true;
    } else {
      this.isResumed = false;
    }
  }

  updateCurrentAd(ad) {
    if (!this.currentAd && ad) {
      var _this$_common$onAdBre, _this$_common2;

      (_this$_common$onAdBre = (_this$_common2 = this._common).onAdBreakStarted) === null || _this$_common$onAdBre === void 0 ? void 0 : _this$_common$onAdBre.call(_this$_common2, adEventData(this, ad));
    } else if (this.currentAd && !ad) {
      var _this$_common$onAdBre2, _this$_common3;

      (_this$_common$onAdBre2 = (_this$_common3 = this._common).onAdBreakEnded) === null || _this$_common$onAdBre2 === void 0 ? void 0 : _this$_common$onAdBre2.call(_this$_common3, {
        getStreamData: () => this.getStreamData()
      });
    }

    this.currentAd = ad;

    if (!ad) {
      this.checkAdEventProcess = null;
    }
  }

  updateWaitingForPlayAds(ads) {
    this.waitingForPlayAds = ads.slice();
  }

  updateWaitingForPlayIndex(index) {
    this.waitingForPlayAdIndex = index;
  }
  /** @description mark all ads as played */


  setAllAdsFired() {
    this._common.adBreaks = this._common.adBreaks.map(ad => ({ ...ad,
      isFired: true
    }));
    this.updateWaitingForPlayAds([]);
    this.updateWaitingForPlayIndex(null);
    this.updateCurrentAd(null);
  }
  /** @description clear data */


  reset() {
    this._common = {
      adBreaks: [],
      currentPosition: -1,
      seek: null
    };
    this.currentAd = null;
    this.waitingForPlayAds = [];
    this.waitingForPlayAdIndex = null;
    this.resumeUserSeekTime = null;
    this.resumeAdStartTime = null;
    this.isResumed = null;
    this.checkAdEventProcess = null;
  }
  /** @description clear ad status */


  resetSession() {
    this._common = { ...this._common,
      currentPosition: 0
    };
    this.resumeUserSeekTime = null;
    this.resumeAdStartTime = null;
    this.isResumed = null;
    this.updateWaitingForPlayAds([]);
    this.updateWaitingForPlayIndex(null);
    this.updateCurrentAd(null);
  }

}

const getLastAd = (avails, streamTime) => avails.reduce((current, item) => current.startTimeInSeconds <= item.startTimeInSeconds && item.startTimeInSeconds <= streamTime ? item : current, {
  startTimeInSeconds: 0,
  durationInSeconds: 0
});

const getStreamTime = (avails, contentTime) => avails.reduce((time, item) => time + (time > item.startTimeInSeconds ? item.durationInSeconds : 0), contentTime);

const getContentTime = (avails, streamTime) => streamTime - avails.filter(item => item.startTimeInSeconds <= streamTime).map(item => Math.min(streamTime - item.startTimeInSeconds, item.durationInSeconds)).reduce((a, b) => a + b, 0);

const seekingHandler = handleSeeking => {
  const ref = {};
  return video => {
    if (!(Math.abs(video.currentTime - ref.originTime) > 0.5) || video.webkitPresentationMode !== 'fullscreen') {
      ref.originTime = video.currentTime;
      return;
    }

    handleSeeking({
      originTime: ref.originTime,
      seekTime: video.currentTime
    });
    ref.originTime = video.currentTime;
  };
};

const snapback = ({
  streamManager,
  originTime,
  seekTime,
  seek
}) => {
  const cuePoint = streamManager === null || streamManager === void 0 ? void 0 : streamManager.previousCuePointForStreamTime(seekTime); // Only check the integer part because the decimal part may come from floating precision error.
  // TODO: Try to extract this with the workaround OTP_2813 in MediaTailor > createStreamManager > handleTimeUpdate

  if (Math.floor(cuePoint === null || cuePoint === void 0 ? void 0 : cuePoint.start) >= Math.floor(originTime)) {
    once$1(streamManager, 'adBreakEnded', async () => {
      // wait for ad playing flag to clear before resuming, TODO seek earlier
      await new Promise(resolve => {
        setTimeout(resolve, 20);
      });
      seek(seekTime);
    });
    seek(cuePoint.start);
  } else {
    seek(seekTime);
  }
};

const addFetchPolyfill = () => {
  window.fetch = async (url, {
    method
  } = {}) => {
    const result = await axios(url, {
      method
    });
    return Promise.resolve({
      json: () => result.data
    });
  };
};

const fetchStreamInfo = async (url, adsParams) => fetch(url, {
  method: 'POST',
  body: JSON.stringify({
    adsParams
  })
}).then(result => result.json());

const on = (eventTarget, eventName, handler) => {
  eventTarget.addEventListener(eventName, handler);
  return () => eventTarget.removeEventListener(eventName, handler);
};

const once = (eventTarget, eventName, handler) => {
  const listener = (...args) => {
    eventTarget.removeEventListener(eventName, listener);
    return handler(...args);
  };

  eventTarget.addEventListener(eventName, listener);
};

const seekVideo = (videoElement, streamTime) => {
  // eslint-disable-next-line no-param-reassign
  videoElement.currentTime = streamTime;
};

const initialState = {
  currentTime: 0,
  adBreaks: [],
  mpdStartTime: 0,
  isUserSkipAd: false,
  skipAdEndTime: 0
};

const getAdEndTime = (streamData, videoElement) => {
  const {
    currentTime,
    duration
  } = streamData.adProgressData;
  return videoElement.currentTime + duration - currentTime;
};

const pipeEvent = (emitter, type) => event => emitter.emit(type, {
  type,
  getAd: () => event.getAd(),
  getStreamData: () => event.getStreamData()
});

const getMpdStartTime = manifest => {
  const mpdDocument = new DOMParser().parseFromString(manifest, 'text/xml');
  const availabilityStartTime = mpdDocument.firstChild.getAttribute('availabilityStartTime');
  return new Date(availabilityStartTime).getTime() / 1000;
}; // Align to Google DAI StreamManager


const createStreamManager = (videoElement, {
  player,
  emitter
}) => {
  let state = initialState;
  const streamData = {};
  const impression = new Impression({
    seek: streamTime => seekVideo(videoElement, streamTime),
    onAdBreakStarted: pipeEvent(emitter, 'adBreakStarted'),
    onAdProgress: event => {
      state.adEndTime = getAdEndTime(event.getStreamData(), videoElement);
      pipeEvent(emitter, 'adProgress')(event);
    },
    onSkippableStateChanged: pipeEvent(emitter, 'skippableStateChanged'),
    onAdBreakEnded: pipeEvent(emitter, 'adBreakEnded')
  });

  const previousCuePointForStreamTime = streamTime => {
    const ad = getLastAd(state.adBreaks, streamTime - 0.1 - state.mpdStartTime);

    if (ad.durationInSeconds > 0) {
      const start = ad.startTimeInSeconds;
      const end = start + ad.durationInSeconds;
      return {
        start,
        end,
        played: state.played[ad.availId]
      };
    }

    return undefined;
  };

  emitter.on('adBreakEnded', () => {
    state.adEndTime = -1;
    const ad = getLastAd(state.adBreaks, videoElement.currentTime);
    state.played[ad.availId] = true;
  });

  const refreshTrackingData = async () => {
    if (!streamData.trackingUrl) {
      return;
    }

    const trackingData = (await fetch(streamData.trackingUrl).then(result => result.json())) || {
      avails: []
    };
    state.adBreaks = trackingData.avails || [];

    if (trackingData.avails.length > 0) {
      impression.adBreaks = state.adBreaks;
      emitter.emit('cuepointsChanged', {
        cuepoints: state.adBreaks.map(item => ({
          start: getContentTime(state.adBreaks, item.startTimeInSeconds)
        }))
      });
    }
  };

  const handleTimeUpdate = streamTime => {
    // TODO get tracking events with actual buffer length
    if (!Number.isFinite(streamTime)) {
      return;
    }

    if (player.isLive() && streamTime > state.currentTime + 5) {
      state.currentTime = streamTime;
      refreshTrackingData();
    } // workaround_OTP_2813


    if (state.isUserSkipAd) {
      // TODO: Try to migrate this with the workaround in the snapback
      // 0.1 is magic number for float-point
      if (state.skipAdEndTime + 0.1 >= streamTime) {
        return;
      }

      state.isUserSkipAd = false;
      state.skipAdEndTime = -1;
    }

    impression.currentPosition = streamTime - state.mpdStartTime;
  };

  const streamManager = {
    requestStream: async (options = {}) => {
      const reportingUrl = options.client_side_reporting_url;
      const info = await fetchStreamInfo(reportingUrl, options.adParams).catch(error => ({
        error
      }));

      if (!info || info.error) {
        return;
      }

      streamData.trackingUrl = new URL(info.trackingUrl, reportingUrl).toString();
      streamData.url = new URL(info.manifestUrl, reportingUrl).toString(); // tracking events are available only after manifests are requested

      await fetchManifests(streamData.url);
      await refreshTrackingData();
      emitter.emit('loaded', {
        getStreamData: () => streamData
      });
      state.played = {};
    },
    addEventListener: (eventName, handler) => emitter.on(eventName, handler),
    removeEventListener: (eventName, handler) => emitter.off(eventName, handler),
    streamTimeForContentTime: contentTime => getStreamTime(state.adBreaks, contentTime),
    contentTimeForStreamTime: streamTime => getContentTime(state.adBreaks, streamTime),
    previousCuePointForStreamTime,
    skipAd: () => {
      if (state.adEndTime > 0) {
        // workaround_OTP_2813
        const seekTime = state.adEndTime;
        handleTimeUpdate(state.adEndTime);
        state.isUserSkipAd = true;
        state.skipAdEndTime = seekTime;
        player === null || player === void 0 ? void 0 : player.seek(seekTime, 'internal'); // TODO: Should provide methods getAd and getStreamData to align with Google Dai

        emitter.emit('skip');
      }
    },
    setMpdStartTime: time => {
      state.mpdStartTime = time;
    },
    getVastAvails: () => state.adBreaks,
    reset: () => {
      state.registered.forEach(removeListener => removeListener());
      impression.reset();
      state = initialState;
      streamData.trackingUrl = '';
    }
  };
  const handleSeeking = seekingHandler(({
    originTime,
    seekTime
  }) => {
    if (state.adEndTime > 0) {
      seekVideo(videoElement, originTime);
      return;
    }

    const diff = seekTime - originTime;

    if (Math.abs(diff + 15) <= 0.25) {
      seekVideo(videoElement, getStreamTime(state.adBreaks, getContentTime(state.adBreaks, originTime) + diff));
      return;
    }

    snapback({
      streamManager,
      originTime,
      seekTime,
      seek: streamTime => {
        if (Math.abs(videoElement.currentTime - streamTime) > 0.5) {
          seekVideo(videoElement, streamTime);
        }
      }
    });
  });
  state.registered = [on(videoElement, 'timeupdate', () => {
    handleSeeking(videoElement);

    if (!videoElement.paused) {
      handleTimeUpdate(videoElement.currentTime);
    }
  }), on(videoElement, 'ended', () => handleTimeUpdate(Infinity))];
  return streamManager;
};

const init = (options, {
  skipWatched
}) => {
  var _player$on;

  const {
    player,
    video,
    streamManager
  } = options;
  const ref = {
    player,
    video,
    streamManager
  };
  streamManager.addEventListener('adProgress', event => {
    ref.adEndTime = getAdEndTime(event.getStreamData(), ref.video);
  });
  streamManager.addEventListener('adBreakEnded', () => {
    ref.adEndTime = -1;
  });
  player === null || player === void 0 ? void 0 : (_player$on = player.on) === null || _player$on === void 0 ? void 0 : _player$on.call(player, 'sourceloaded', () => {
    ref.isLive = player.isLive();

    if (player.manifest.dash && player.isLive()) {
      // ad start / end time is based on availabilityStartTime in MPD manifest
      streamManager.setMpdStartTime(getMpdStartTime(player.getManifest()));
    }
  });

  if (skipWatched) {
    video.addEventListener('timeupdate', () => {
      const streamTime = video.currentTime;
      const cuePoint = streamManager.previousCuePointForStreamTime(streamTime + 0.5);

      if ((cuePoint === null || cuePoint === void 0 ? void 0 : cuePoint.end) > streamTime && cuePoint.played) {
        player === null || player === void 0 ? void 0 : player.seek(cuePoint.end, 'internal');
      }
    });
  }

  return ref;
};

const MediaTailorPlugin = ({
  adParams,
  skipWatched
} = {}) => {
  const emitter = mitt();
  let ref = {};
  let options = {
    adParams
  };
  return {
    isActive: () => !!ref.streamManager,
    load: async (manifestItem, {
      player,
      video,
      source = {}
    } = {}) => {
      var _ref$streamManager, _manifestItem$ssai, _source$options;

      if (typeof fetch !== 'function') {
        addFetchPolyfill();
      }

      (_ref$streamManager = ref.streamManager) === null || _ref$streamManager === void 0 ? void 0 : _ref$streamManager.reset();
      const mediaTailorOptions = (_manifestItem$ssai = manifestItem.ssai) === null || _manifestItem$ssai === void 0 ? void 0 : _manifestItem$ssai.media_tailor;

      if (!mediaTailorOptions) {
        return;
      }

      mediaTailorOptions.adParams = options.adParams;
      const streamManager = createStreamManager(video, {
        player,
        emitter
      });
      ref = init({
        player,
        video,
        streamManager
      }, {
        skipWatched
      });
      streamManager.requestStream(mediaTailorOptions);
      const {
        url
      } = await new Promise(resolve => {
        once(streamManager, 'loaded', event => resolve(event.getStreamData()));
      });

      if (!url) {
        console.warn('Ad stream is not available, use fallback stream instead');
        return manifestItem;
      }

      return { ...manifestItem,
        ssaiProvider: 'AWS',
        url,
        vastAvails: streamManager.getVastAvails(),
        startTime: streamManager.streamTimeForContentTime((_source$options = source.options) === null || _source$options === void 0 ? void 0 : _source$options.startTime)
      };
    },
    handleSeek: (contentTime, seek) => {
      snapback({
        streamManager: ref.streamManager,
        originTime: ref.video.currentTime,
        seekTime: ref.streamManager.streamTimeForContentTime(contentTime),
        seek
      });
    },
    skipAd: () => ref.streamManager.skipAd(),
    getPlaybackStatus: () => ref.streamManager && { ...(!ref.isLive && {
        currentTime: ref.streamManager.contentTimeForStreamTime(ref.video.currentTime),
        duration: ref.streamManager.contentTimeForStreamTime(ref.video.duration)
      }),
      ...(ref.adEndTime > 0 && {
        adRemainingTime: ref.adEndTime - ref.video.currentTime
      })
    },
    on: (name, listener) => emitter.on(name, listener),
    reset: () => {
      var _ref$streamManager2;

      (_ref$streamManager2 = ref.streamManager) === null || _ref$streamManager2 === void 0 ? void 0 : _ref$streamManager2.reset();
      ref.streamManager = undefined;
    },
    setOptions: updatedOptions => {
      options = updatedOptions;
    }
  };
};

const button = {
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: 0,
  flexShrink: 0,
  width: 36,
  height: 36,
  backgroundColor: 'transparent',
  userSelect: 'none',
  '*': {
    pointerEvents: 'none',
    touchAction: 'none'
  }
};

/* @jsxImportSource @emotion/react */
const barStyle = {
  padding: '36px 18px',
  // Prevent overflow when content text is too long
  minWidth: 0,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '> *': {
    // margin: '0 18px' might override seekbar margin
    marginLeft: '18px',
    marginRight: '18px'
  },
  opacity: '1',
  transition: 'opacity 0.5s ease'
};
const fadeStyle = {
  opacity: '0',
  // disable all UI interactions while hidden
  pointerEvents: 'none',
  touchAction: 'none'
};

const FunctionBar = ({
  style,
  fade,
  children
}) => jsx$1("div", {
  className: "kks-player__function-bar",
  css: [barStyle, fade && fadeStyle, style, {
    button
  }, process.env.NODE_ENV === "production" ? "" : ";label:FunctionBar;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZ1bmN0aW9uQmFyLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUErQkkiLCJmaWxlIjoiRnVuY3Rpb25CYXIuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5pbXBvcnQge2J1dHRvbn0gZnJvbSAnc3R5bGUnXG5cbmNvbnN0IGJhclN0eWxlID0ge1xuICBwYWRkaW5nOiAnMzZweCAxOHB4JyxcbiAgLy8gUHJldmVudCBvdmVyZmxvdyB3aGVuIGNvbnRlbnQgdGV4dCBpcyB0b28gbG9uZ1xuICBtaW5XaWR0aDogMCxcbiAgZGlzcGxheTogJ2ZsZXgnLFxuICBmbGV4V3JhcDogJ3dyYXAnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgJz4gKic6IHtcbiAgICAvLyBtYXJnaW46ICcwIDE4cHgnIG1pZ2h0IG92ZXJyaWRlIHNlZWtiYXIgbWFyZ2luXG4gICAgbWFyZ2luTGVmdDogJzE4cHgnLFxuICAgIG1hcmdpblJpZ2h0OiAnMThweCcsXG4gIH0sXG4gIG9wYWNpdHk6ICcxJyxcbiAgdHJhbnNpdGlvbjogJ29wYWNpdHkgMC41cyBlYXNlJyxcbn1cblxuY29uc3QgZmFkZVN0eWxlID0ge1xuICBvcGFjaXR5OiAnMCcsXG4gIC8vIGRpc2FibGUgYWxsIFVJIGludGVyYWN0aW9ucyB3aGlsZSBoaWRkZW5cbiAgcG9pbnRlckV2ZW50czogJ25vbmUnLFxuICB0b3VjaEFjdGlvbjogJ25vbmUnLFxufVxuXG5jb25zdCBGdW5jdGlvbkJhciA9ICh7c3R5bGUsIGZhZGUsIGNoaWxkcmVufSkgPT4gKFxuICA8ZGl2XG4gICAgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fZnVuY3Rpb24tYmFyXCJcbiAgICBjc3M9e1tiYXJTdHlsZSwgZmFkZSAmJiBmYWRlU3R5bGUsIHN0eWxlLCB7YnV0dG9ufV19XG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKVxuXG5GdW5jdGlvbkJhci5wcm9wVHlwZXMgPSB7XG4gIHN0eWxlOiBQcm9wVHlwZXMub2JqZWN0LFxuICBmYWRlOiBQcm9wVHlwZXMuYm9vbCxcbiAgY2hpbGRyZW46IFByb3BUeXBlcy5ub2RlLFxufVxuRnVuY3Rpb25CYXIuZGVmYXVsdFByb3BzID0ge1xuICBzdHlsZToge30sXG59XG5cbmV4cG9ydCBjb25zdCBzdHlsZSA9IHtcbiAgdG9wOiB7XG4gICAgZmxleFdyYXA6ICdub3dyYXAnLFxuICAgIGJhY2tncm91bmRJbWFnZTogYFxuICAgICAgbGluZWFyLWdyYWRpZW50KFxuICAgICAgICB0byB0b3AsXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMCksXG4gICAgICAgIHJnYmEoMCwgMCwgMCwgMC44KVxuICAgICAgKVxuICAgIGAsXG4gIH0sXG4gIGJvdHRvbToge1xuICAgIHBhZGRpbmc6ICcwIDE4cHggMzZweCcsXG4gIH0sXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZ1bmN0aW9uQmFyXG4iXX0= */"],
  children: children
});

FunctionBar.propTypes = {
  style: PropTypes.object,
  fade: PropTypes.bool,
  children: PropTypes.node
};
FunctionBar.defaultProps = {
  style: {}
};

/* @jsxImportSource @emotion/react */
const style$1 = {
  zIndex: 7,
  position: 'fixed',
  padding: '8px 12px',
  borderRadius: 4,
  textAlign: 'center',
  color: 'white',
  backgroundColor: 'rgba(51, 51, 51, 0.625)'
};

const isOverflowing = element => element.scrollWidth > element.clientWidth;

const Tooltip = ({
  title,
  bottom = '0px',
  overflowOnly,
  children,
  container
}) => {
  const tooltipRef = useRef();
  const boxes = useRef();
  const defaultContainer = useRef();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(() => ({
    left: '100%'
  }));
  const childProps = {
    onMouseEnter: event => {
      if (!overflowOnly || isOverflowing(event.currentTarget)) {
        boxes.current = [event.currentTarget.getBoundingClientRect(), document.body.getBoundingClientRect()];
        defaultContainer.current = document.fullscreenElement || document.webkitFullscreenElement || document.body;
        setOpen(true);
      }
    },
    onMouseLeave: () => {
      setPosition({
        left: '100%'
      });
      setOpen(false);
    }
  };
  useEffect(() => {
    if (open) {
      const targetPosition = getPopoverPosition(tooltipRef.current.getBoundingClientRect(), ...boxes.current);
      targetPosition.left !== position.left && setPosition(targetPosition);
    }
  }, [open, position.left]);
  return !isDesktop() && !window.matchMedia(havePointerQuery).matches ? children : jsxs(Fragment, {
    children: [/*#__PURE__*/cloneElement(children, childProps), open && /*#__PURE__*/createPortal(jsx$1("div", {
      style: { ...style$1,
        ...position,
        top: `calc(${position.top}px - ${bottom})`
      },
      ref: tooltipRef,
      children: title
    }), container || defaultContainer.current)]
  });
};

Tooltip.propTypes = {
  title: PropTypes.node,
  bottom: PropTypes.string,
  overflowOnly: PropTypes.bool,
  children: PropTypes.node,
  container: PropTypes.object
};

/* @jsxImportSource @emotion/react */
const _css = {
  userSelect: 'none',
  color: 'white',
  fontSize: 20,
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
  part: {
    width: 26,
    display: 'inline-block',
    textAlign: 'center'
  }
};

const FormattedTime = ({
  time,
  showHour,
  style
}) => {
  time = Math.floor(time);
  const second = time % 60;
  const minute = (time - second) / 60 % 60;
  const hour = (time - second - minute * 60) / 60 / 60;
  return jsxs("span", {
    className: "kks-player__formatted-time",
    css: [_css, style, process.env.NODE_ENV === "production" ? "" : ";label:FormattedTime;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcm1hdHRlZFRpbWUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdCaUQiLCJmaWxlIjoiRm9ybWF0dGVkVGltZS5qc3giLCJzb3VyY2VzQ29udGVudCI6WyIvKiBAanN4SW1wb3J0U291cmNlIEBlbW90aW9uL3JlYWN0ICovXG5pbXBvcnQge0ZyYWdtZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcydcblxuY29uc3QgX2NzcyA9IHtcbiAgdXNlclNlbGVjdDogJ25vbmUnLFxuICBjb2xvcjogJ3doaXRlJyxcbiAgZm9udFNpemU6IDIwLFxuICB3aGl0ZVNwYWNlOiAnbm93cmFwJyxcbiAgZGlzcGxheTogJ2lubGluZS1mbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIHBhcnQ6IHtcbiAgICB3aWR0aDogMjYsXG4gICAgZGlzcGxheTogJ2lubGluZS1ibG9jaycsXG4gICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgfSxcbn1cblxuY29uc3QgRm9ybWF0dGVkVGltZSA9ICh7dGltZSwgc2hvd0hvdXIsIHN0eWxlfSkgPT4ge1xuICB0aW1lID0gTWF0aC5mbG9vcih0aW1lKVxuICBjb25zdCBzZWNvbmQgPSB0aW1lICUgNjBcbiAgY29uc3QgbWludXRlID0gKCh0aW1lIC0gc2Vjb25kKSAvIDYwKSAlIDYwXG4gIGNvbnN0IGhvdXIgPSAodGltZSAtIHNlY29uZCAtIG1pbnV0ZSAqIDYwKSAvIDYwIC8gNjBcbiAgcmV0dXJuIChcbiAgICA8c3BhbiBjbGFzc05hbWU9XCJra3MtcGxheWVyX19mb3JtYXR0ZWQtdGltZVwiIGNzcz17W19jc3MsIHN0eWxlXX0+XG4gICAgICB7KHNob3dIb3VyIHx8IGhvdXIgIT09IDApICYmIChcbiAgICAgICAgPEZyYWdtZW50PlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJra3MtcGxheWVyX19mb3JtYXR0ZWQtdGltZV9fcGFydFwiXG4gICAgICAgICAgICBjc3M9e1tfY3NzLnBhcnQsIHN0eWxlLnBhcnRdfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtTdHJpbmcoaG91cikucGFkU3RhcnQoMiwgJzAnKX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgOlxuICAgICAgICA8L0ZyYWdtZW50PlxuICAgICAgKX1cbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lX19wYXJ0XCJcbiAgICAgICAgY3NzPXtbX2Nzcy5wYXJ0LCBzdHlsZS5wYXJ0XX1cbiAgICAgID5cbiAgICAgICAge1N0cmluZyhtaW51dGUpLnBhZFN0YXJ0KDIsICcwJyl9XG4gICAgICA8L3NwYW4+XG4gICAgICA6XG4gICAgICA8c3BhblxuICAgICAgICBjbGFzc05hbWU9XCJra3MtcGxheWVyX19mb3JtYXR0ZWQtdGltZV9fcGFydFwiXG4gICAgICAgIGNzcz17W19jc3MucGFydCwgc3R5bGUucGFydF19XG4gICAgICA+XG4gICAgICAgIHtTdHJpbmcoc2Vjb25kKS5wYWRTdGFydCgyLCAnMCcpfVxuICAgICAgPC9zcGFuPlxuICAgIDwvc3Bhbj5cbiAgKVxufVxuRm9ybWF0dGVkVGltZS5wcm9wVHlwZXMgPSB7XG4gIHRpbWU6IFByb3BUeXBlcy5udW1iZXIsXG4gIHNob3dIb3VyOiBQcm9wVHlwZXMuYm9vbCxcbiAgc3R5bGU6IFByb3BUeXBlcy5zaGFwZSh7XG4gICAgcGFydDogUHJvcFR5cGVzLm9iamVjdCxcbiAgfSksXG59XG5Gb3JtYXR0ZWRUaW1lLmRlZmF1bHRQcm9wcyA9IHtcbiAgc3R5bGU6IHt9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBGb3JtYXR0ZWRUaW1lXG4iXX0= */"],
    children: [(showHour || hour !== 0) && jsxs(Fragment$2, {
      children: [jsx$1("span", {
        className: "kks-player__formatted-time__part",
        css: [_css.part, style.part, process.env.NODE_ENV === "production" ? "" : ";label:FormattedTime;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcm1hdHRlZFRpbWUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZCWSIsImZpbGUiOiJGb3JtYXR0ZWRUaW1lLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7RnJhZ21lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5jb25zdCBfY3NzID0ge1xuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICBmb250U2l6ZTogMjAsXG4gIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgcGFydDoge1xuICAgIHdpZHRoOiAyNixcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB9LFxufVxuXG5jb25zdCBGb3JtYXR0ZWRUaW1lID0gKHt0aW1lLCBzaG93SG91ciwgc3R5bGV9KSA9PiB7XG4gIHRpbWUgPSBNYXRoLmZsb29yKHRpbWUpXG4gIGNvbnN0IHNlY29uZCA9IHRpbWUgJSA2MFxuICBjb25zdCBtaW51dGUgPSAoKHRpbWUgLSBzZWNvbmQpIC8gNjApICUgNjBcbiAgY29uc3QgaG91ciA9ICh0aW1lIC0gc2Vjb25kIC0gbWludXRlICogNjApIC8gNjAgLyA2MFxuICByZXR1cm4gKFxuICAgIDxzcGFuIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lXCIgY3NzPXtbX2Nzcywgc3R5bGVdfT5cbiAgICAgIHsoc2hvd0hvdXIgfHwgaG91ciAhPT0gMCkgJiYgKFxuICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lX19wYXJ0XCJcbiAgICAgICAgICAgIGNzcz17W19jc3MucGFydCwgc3R5bGUucGFydF19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge1N0cmluZyhob3VyKS5wYWRTdGFydCgyLCAnMCcpfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA6XG4gICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICApfVxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fZm9ybWF0dGVkLXRpbWVfX3BhcnRcIlxuICAgICAgICBjc3M9e1tfY3NzLnBhcnQsIHN0eWxlLnBhcnRdfVxuICAgICAgPlxuICAgICAgICB7U3RyaW5nKG1pbnV0ZSkucGFkU3RhcnQoMiwgJzAnKX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDpcbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lX19wYXJ0XCJcbiAgICAgICAgY3NzPXtbX2Nzcy5wYXJ0LCBzdHlsZS5wYXJ0XX1cbiAgICAgID5cbiAgICAgICAge1N0cmluZyhzZWNvbmQpLnBhZFN0YXJ0KDIsICcwJyl9XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICApXG59XG5Gb3JtYXR0ZWRUaW1lLnByb3BUeXBlcyA9IHtcbiAgdGltZTogUHJvcFR5cGVzLm51bWJlcixcbiAgc2hvd0hvdXI6IFByb3BUeXBlcy5ib29sLFxuICBzdHlsZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBwYXJ0OiBQcm9wVHlwZXMub2JqZWN0LFxuICB9KSxcbn1cbkZvcm1hdHRlZFRpbWUuZGVmYXVsdFByb3BzID0ge1xuICBzdHlsZToge30sXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1hdHRlZFRpbWVcbiJdfQ== */"],
        children: String(hour).padStart(2, '0')
      }), ":"]
    }), jsx$1("span", {
      className: "kks-player__formatted-time__part",
      css: [_css.part, style.part, process.env.NODE_ENV === "production" ? "" : ";label:FormattedTime;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcm1hdHRlZFRpbWUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNDUSIsImZpbGUiOiJGb3JtYXR0ZWRUaW1lLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7RnJhZ21lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5jb25zdCBfY3NzID0ge1xuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICBmb250U2l6ZTogMjAsXG4gIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgcGFydDoge1xuICAgIHdpZHRoOiAyNixcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB9LFxufVxuXG5jb25zdCBGb3JtYXR0ZWRUaW1lID0gKHt0aW1lLCBzaG93SG91ciwgc3R5bGV9KSA9PiB7XG4gIHRpbWUgPSBNYXRoLmZsb29yKHRpbWUpXG4gIGNvbnN0IHNlY29uZCA9IHRpbWUgJSA2MFxuICBjb25zdCBtaW51dGUgPSAoKHRpbWUgLSBzZWNvbmQpIC8gNjApICUgNjBcbiAgY29uc3QgaG91ciA9ICh0aW1lIC0gc2Vjb25kIC0gbWludXRlICogNjApIC8gNjAgLyA2MFxuICByZXR1cm4gKFxuICAgIDxzcGFuIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lXCIgY3NzPXtbX2Nzcywgc3R5bGVdfT5cbiAgICAgIHsoc2hvd0hvdXIgfHwgaG91ciAhPT0gMCkgJiYgKFxuICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lX19wYXJ0XCJcbiAgICAgICAgICAgIGNzcz17W19jc3MucGFydCwgc3R5bGUucGFydF19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge1N0cmluZyhob3VyKS5wYWRTdGFydCgyLCAnMCcpfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA6XG4gICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICApfVxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fZm9ybWF0dGVkLXRpbWVfX3BhcnRcIlxuICAgICAgICBjc3M9e1tfY3NzLnBhcnQsIHN0eWxlLnBhcnRdfVxuICAgICAgPlxuICAgICAgICB7U3RyaW5nKG1pbnV0ZSkucGFkU3RhcnQoMiwgJzAnKX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDpcbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lX19wYXJ0XCJcbiAgICAgICAgY3NzPXtbX2Nzcy5wYXJ0LCBzdHlsZS5wYXJ0XX1cbiAgICAgID5cbiAgICAgICAge1N0cmluZyhzZWNvbmQpLnBhZFN0YXJ0KDIsICcwJyl9XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICApXG59XG5Gb3JtYXR0ZWRUaW1lLnByb3BUeXBlcyA9IHtcbiAgdGltZTogUHJvcFR5cGVzLm51bWJlcixcbiAgc2hvd0hvdXI6IFByb3BUeXBlcy5ib29sLFxuICBzdHlsZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBwYXJ0OiBQcm9wVHlwZXMub2JqZWN0LFxuICB9KSxcbn1cbkZvcm1hdHRlZFRpbWUuZGVmYXVsdFByb3BzID0ge1xuICBzdHlsZToge30sXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1hdHRlZFRpbWVcbiJdfQ== */"],
      children: String(minute).padStart(2, '0')
    }), ":", jsx$1("span", {
      className: "kks-player__formatted-time__part",
      css: [_css.part, style.part, process.env.NODE_ENV === "production" ? "" : ";label:FormattedTime;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcm1hdHRlZFRpbWUuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTZDUSIsImZpbGUiOiJGb3JtYXR0ZWRUaW1lLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCB7RnJhZ21lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJ1xuXG5jb25zdCBfY3NzID0ge1xuICB1c2VyU2VsZWN0OiAnbm9uZScsXG4gIGNvbG9yOiAnd2hpdGUnLFxuICBmb250U2l6ZTogMjAsXG4gIHdoaXRlU3BhY2U6ICdub3dyYXAnLFxuICBkaXNwbGF5OiAnaW5saW5lLWZsZXgnLFxuICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgcGFydDoge1xuICAgIHdpZHRoOiAyNixcbiAgICBkaXNwbGF5OiAnaW5saW5lLWJsb2NrJyxcbiAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICB9LFxufVxuXG5jb25zdCBGb3JtYXR0ZWRUaW1lID0gKHt0aW1lLCBzaG93SG91ciwgc3R5bGV9KSA9PiB7XG4gIHRpbWUgPSBNYXRoLmZsb29yKHRpbWUpXG4gIGNvbnN0IHNlY29uZCA9IHRpbWUgJSA2MFxuICBjb25zdCBtaW51dGUgPSAoKHRpbWUgLSBzZWNvbmQpIC8gNjApICUgNjBcbiAgY29uc3QgaG91ciA9ICh0aW1lIC0gc2Vjb25kIC0gbWludXRlICogNjApIC8gNjAgLyA2MFxuICByZXR1cm4gKFxuICAgIDxzcGFuIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lXCIgY3NzPXtbX2Nzcywgc3R5bGVdfT5cbiAgICAgIHsoc2hvd0hvdXIgfHwgaG91ciAhPT0gMCkgJiYgKFxuICAgICAgICA8RnJhZ21lbnQ+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lX19wYXJ0XCJcbiAgICAgICAgICAgIGNzcz17W19jc3MucGFydCwgc3R5bGUucGFydF19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge1N0cmluZyhob3VyKS5wYWRTdGFydCgyLCAnMCcpfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA6XG4gICAgICAgIDwvRnJhZ21lbnQ+XG4gICAgICApfVxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fZm9ybWF0dGVkLXRpbWVfX3BhcnRcIlxuICAgICAgICBjc3M9e1tfY3NzLnBhcnQsIHN0eWxlLnBhcnRdfVxuICAgICAgPlxuICAgICAgICB7U3RyaW5nKG1pbnV0ZSkucGFkU3RhcnQoMiwgJzAnKX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDpcbiAgICAgIDxzcGFuXG4gICAgICAgIGNsYXNzTmFtZT1cImtrcy1wbGF5ZXJfX2Zvcm1hdHRlZC10aW1lX19wYXJ0XCJcbiAgICAgICAgY3NzPXtbX2Nzcy5wYXJ0LCBzdHlsZS5wYXJ0XX1cbiAgICAgID5cbiAgICAgICAge1N0cmluZyhzZWNvbmQpLnBhZFN0YXJ0KDIsICcwJyl9XG4gICAgICA8L3NwYW4+XG4gICAgPC9zcGFuPlxuICApXG59XG5Gb3JtYXR0ZWRUaW1lLnByb3BUeXBlcyA9IHtcbiAgdGltZTogUHJvcFR5cGVzLm51bWJlcixcbiAgc2hvd0hvdXI6IFByb3BUeXBlcy5ib29sLFxuICBzdHlsZTogUHJvcFR5cGVzLnNoYXBlKHtcbiAgICBwYXJ0OiBQcm9wVHlwZXMub2JqZWN0LFxuICB9KSxcbn1cbkZvcm1hdHRlZFRpbWUuZGVmYXVsdFByb3BzID0ge1xuICBzdHlsZToge30sXG59XG5cbmV4cG9ydCBkZWZhdWx0IEZvcm1hdHRlZFRpbWVcbiJdfQ== */"],
      children: String(second).padStart(2, '0')
    })]
  });
};

FormattedTime.propTypes = {
  time: PropTypes.number,
  showHour: PropTypes.bool,
  style: PropTypes.shape({
    part: PropTypes.object
  })
};
FormattedTime.defaultProps = {
  style: {}
};

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
const sliderStyle = {
  flex: 1,
  margin: '0 0.5rem',
  height: '4px',
  backgroundColor: 'red'
};

const getLivesInfo = ({
  startTime,
  endTime
}) => {
  const duration = endTime - startTime;
  const nowSecond = Math.floor(Date.now() / 1000);
  const currentTime = Math.max(0, Math.min(nowSecond - startTime, duration));
  return {
    currentTime,
    duration
  };
};

var _ref = process.env.NODE_ENV === "production" ? {
  name: "125yws0",
  styles: "flex:100%;display:flex;align-items:center;margin-bottom:18px"
} : {
  name: "8x1f7q-Seekbar",
  styles: "flex:100%;display:flex;align-items:center;margin-bottom:18px;label:Seekbar;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlZWtiYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVDTSIsImZpbGUiOiJTZWVrYmFyLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBfZ2V0IGZyb20gJ2RsdidcblxuaW1wb3J0IEZvcm1hdHRlZFRpbWUgZnJvbSAnY29tcG9uZW50L0Zvcm1hdHRlZFRpbWUnXG5pbXBvcnQgU2ltcGxlU2xpZGVyIGZyb20gJ3BsYXllclVpL1NpbXBsZVNsaWRlcidcbmltcG9ydCB7dXNlQ2FzdENvbnRleHR9IGZyb20gJ2Nhc3QvY29udGV4dCdcbmltcG9ydCB7U2Vla09yaWdpbn0gZnJvbSAnRW51bSdcblxuY29uc3Qgc2xpZGVyU3R5bGUgPSB7XG4gIGZsZXg6IDEsXG4gIG1hcmdpbjogJzAgMC41cmVtJyxcbiAgaGVpZ2h0OiAnNHB4JyxcbiAgYmFja2dyb3VuZENvbG9yOiAncmVkJyxcbn1cblxuY29uc3QgZ2V0TGl2ZXNJbmZvID0gKHtzdGFydFRpbWUsIGVuZFRpbWV9KSA9PiB7XG4gIGNvbnN0IGR1cmF0aW9uID0gZW5kVGltZSAtIHN0YXJ0VGltZVxuICBjb25zdCBub3dTZWNvbmQgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKVxuICBjb25zdCBjdXJyZW50VGltZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKG5vd1NlY29uZCAtIHN0YXJ0VGltZSwgZHVyYXRpb24pKVxuXG4gIHJldHVybiB7Y3VycmVudFRpbWUsIGR1cmF0aW9ufVxufVxuXG5jb25zdCBTZWVrYmFyID0gKCkgPT4ge1xuICBjb25zdCB7XG4gICAgYWN0aW9uczoge3NlZWt9LFxuICAgIC4uLnN0YXRlXG4gIH0gPSB1c2VDYXN0Q29udGV4dCgpXG4gIGNvbnN0IHtcbiAgICBjdXJyZW50VGltZSxcbiAgICBwcm9ncmVzc1RpbWUgPSBjdXJyZW50VGltZSxcbiAgICBkdXJhdGlvbixcbiAgfSA9IHN0YXRlLnN0cmVhbVR5cGUgPT09ICdMSVZFJ1xuICAgID8gZ2V0TGl2ZXNJbmZvKF9nZXQoc3RhdGUsICdjdXN0b21EYXRhJykgfHwge30pXG4gICAgOiBzdGF0ZVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fc2Vlay1iYXJcIlxuICAgICAgY3NzPXt7XG4gICAgICAgIGZsZXg6ICcxMDAlJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnMThweCcsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxGb3JtYXR0ZWRUaW1lIHRpbWU9e3Byb2dyZXNzVGltZX0gLz5cbiAgICAgIHtzdGF0ZS5zdHJlYW1UeXBlID09PSAnTElWRScgPyAoXG4gICAgICAgIDxkaXYgY3NzPXtzbGlkZXJTdHlsZX0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxTaW1wbGVTbGlkZXJcbiAgICAgICAgICBjc3M9e3ttYXJnaW46ICcwIDFyZW0nLCBmbGV4OiAxfX1cbiAgICAgICAgICB2YWx1ZT17cHJvZ3Jlc3NUaW1lfVxuICAgICAgICAgIG1heD17ZHVyYXRpb259XG4gICAgICAgICAgb25DaGFuZ2VDb21taXR0ZWQ9eyhfLCB7dmFsdWV9KSA9PlxuICAgICAgICAgICAgc2Vlayh7b3JpZ2luOiBTZWVrT3JpZ2luLlNUQVJULCBzZWNvbmRzOiB2YWx1ZX0pXG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIDxGb3JtYXR0ZWRUaW1lIHRpbWU9e01hdGgubWF4KGR1cmF0aW9uLCBwcm9ncmVzc1RpbWUpfSAvPlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlZWtiYXJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

var _ref2 = process.env.NODE_ENV === "production" ? {
  name: "tuqmq3",
  styles: "margin:0 1rem;flex:1"
} : {
  name: "1ysiwxm-Seekbar",
  styles: "margin:0 1rem;flex:1;label:Seekbar;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlZWtiYXIuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW1EVSIsImZpbGUiOiJTZWVrYmFyLmpzeCIsInNvdXJjZXNDb250ZW50IjpbIi8qIEBqc3hJbXBvcnRTb3VyY2UgQGVtb3Rpb24vcmVhY3QgKi9cbmltcG9ydCBfZ2V0IGZyb20gJ2RsdidcblxuaW1wb3J0IEZvcm1hdHRlZFRpbWUgZnJvbSAnY29tcG9uZW50L0Zvcm1hdHRlZFRpbWUnXG5pbXBvcnQgU2ltcGxlU2xpZGVyIGZyb20gJ3BsYXllclVpL1NpbXBsZVNsaWRlcidcbmltcG9ydCB7dXNlQ2FzdENvbnRleHR9IGZyb20gJ2Nhc3QvY29udGV4dCdcbmltcG9ydCB7U2Vla09yaWdpbn0gZnJvbSAnRW51bSdcblxuY29uc3Qgc2xpZGVyU3R5bGUgPSB7XG4gIGZsZXg6IDEsXG4gIG1hcmdpbjogJzAgMC41cmVtJyxcbiAgaGVpZ2h0OiAnNHB4JyxcbiAgYmFja2dyb3VuZENvbG9yOiAncmVkJyxcbn1cblxuY29uc3QgZ2V0TGl2ZXNJbmZvID0gKHtzdGFydFRpbWUsIGVuZFRpbWV9KSA9PiB7XG4gIGNvbnN0IGR1cmF0aW9uID0gZW5kVGltZSAtIHN0YXJ0VGltZVxuICBjb25zdCBub3dTZWNvbmQgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKVxuICBjb25zdCBjdXJyZW50VGltZSA9IE1hdGgubWF4KDAsIE1hdGgubWluKG5vd1NlY29uZCAtIHN0YXJ0VGltZSwgZHVyYXRpb24pKVxuXG4gIHJldHVybiB7Y3VycmVudFRpbWUsIGR1cmF0aW9ufVxufVxuXG5jb25zdCBTZWVrYmFyID0gKCkgPT4ge1xuICBjb25zdCB7XG4gICAgYWN0aW9uczoge3NlZWt9LFxuICAgIC4uLnN0YXRlXG4gIH0gPSB1c2VDYXN0Q29udGV4dCgpXG4gIGNvbnN0IHtcbiAgICBjdXJyZW50VGltZSxcbiAgICBwcm9ncmVzc1RpbWUgPSBjdXJyZW50VGltZSxcbiAgICBkdXJhdGlvbixcbiAgfSA9IHN0YXRlLnN0cmVhbVR5cGUgPT09ICdMSVZFJ1xuICAgID8gZ2V0TGl2ZXNJbmZvKF9nZXQoc3RhdGUsICdjdXN0b21EYXRhJykgfHwge30pXG4gICAgOiBzdGF0ZVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fc2Vlay1iYXJcIlxuICAgICAgY3NzPXt7XG4gICAgICAgIGZsZXg6ICcxMDAlJyxcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnMThweCcsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxGb3JtYXR0ZWRUaW1lIHRpbWU9e3Byb2dyZXNzVGltZX0gLz5cbiAgICAgIHtzdGF0ZS5zdHJlYW1UeXBlID09PSAnTElWRScgPyAoXG4gICAgICAgIDxkaXYgY3NzPXtzbGlkZXJTdHlsZX0gLz5cbiAgICAgICkgOiAoXG4gICAgICAgIDxTaW1wbGVTbGlkZXJcbiAgICAgICAgICBjc3M9e3ttYXJnaW46ICcwIDFyZW0nLCBmbGV4OiAxfX1cbiAgICAgICAgICB2YWx1ZT17cHJvZ3Jlc3NUaW1lfVxuICAgICAgICAgIG1heD17ZHVyYXRpb259XG4gICAgICAgICAgb25DaGFuZ2VDb21taXR0ZWQ9eyhfLCB7dmFsdWV9KSA9PlxuICAgICAgICAgICAgc2Vlayh7b3JpZ2luOiBTZWVrT3JpZ2luLlNUQVJULCBzZWNvbmRzOiB2YWx1ZX0pXG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICAgIDxGb3JtYXR0ZWRUaW1lIHRpbWU9e01hdGgubWF4KGR1cmF0aW9uLCBwcm9ncmVzc1RpbWUpfSAvPlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IFNlZWtiYXJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

const Seekbar = () => {
  const {
    actions: {
      seek
    },
    ...state
  } = useCastContext();
  const {
    currentTime,
    progressTime = currentTime,
    duration
  } = state.streamType === 'LIVE' ? getLivesInfo(_get(state, 'customData') || {}) : state;
  return jsxs("div", {
    className: "kks-player__seek-bar",
    css: _ref,
    children: [jsx$1(FormattedTime, {
      time: progressTime
    }), state.streamType === 'LIVE' ? jsx$1("div", {
      css: sliderStyle
    }) : jsx$1(SimpleSlider, {
      css: _ref2,
      value: progressTime,
      max: duration,
      onChangeCommitted: (_, {
        value
      }) => seek({
        origin: SeekOrigin.START,
        seconds: value
      })
    }), jsx$1(FormattedTime, {
      time: Math.max(duration, progressTime)
    })]
  });
};

/* @jsxImportSource @emotion/react */

const IconButton = ({
  name,
  startIcon,
  tooltip,
  ...others
}) => jsx$1(Button, {
  startIcon: startIcon,
  title: tooltip,
  ...others
});

IconButton.propTypes = {
  name: PropTypes.string,
  startIcon: PropTypes.string,
  tooltip: PropTypes.string,
  onClick: PropTypes.func
};

const PlayButton = () => {
  const {
    playerState,
    actions: {
      play,
      pause
    }
  } = useCastContext();
  const action = playerState !== 'PLAYING' ? 'play' : 'pause';
  const tooltip = playerState !== 'PLAYING' ? 'KKS.PLAYER.PLAY' : 'KKS.PLAYER.PAUSE';
  return /*#__PURE__*/jsx(IconButton, {
    startIcon: action,
    tooltip: tooltip,
    onClick: action === 'play' ? play : pause
  });
};

const RewindButton = () => {
  const {
    actions: {
      seek
    }
  } = useCastContext();
  return /*#__PURE__*/jsx(IconButton, {
    startIcon: "rewind10",
    tooltip: "KKS.PLAYER.REWIND",
    onClick: () => seek({
      origin: SeekOrigin.CURRENT,
      seconds: -10
    })
  });
};

const ForwardButton = () => {
  const {
    actions: {
      seek
    }
  } = useCastContext();
  return /*#__PURE__*/jsx(IconButton, {
    startIcon: "forward10",
    tooltip: "KKS.PLAYER.FORWARD",
    onClick: () => seek({
      origin: SeekOrigin.CURRENT,
      seconds: 10
    })
  });
};

const PreviousEpisodeButton = () => {
  const {
    actions: {
      hasPrevious,
      changePreviousEpisode
    }
  } = useCastContext();
  return hasPrevious() && /*#__PURE__*/jsx(IconButton, {
    startIcon: "previousEpisode",
    tooltip: "KKS.PLAYER.PREVIOUS",
    onClick: changePreviousEpisode
  });
};

const NextEpisodeButton = () => {
  const {
    actions: {
      hasNext,
      changeNextEpisode
    }
  } = useCastContext();
  return hasNext() && /*#__PURE__*/jsx(IconButton, {
    startIcon: "nextEpisode",
    tooltip: "KKS.PLAYER.NEXT",
    onClick: changeNextEpisode
  });
};

/* eslint-disable react/jsx-no-target-blank */
const style = {
  position: 'fixed',
  bottom: '0',
  zIndex: '3',
  width: '100%',
  height: '72px',
  alignItems: 'center',
  backgroundColor: 'rgba(34, 34, 34, 0.75)',
  color: '#fff',
  '> *': {
    flex: '1'
  }
};
const controlStyle = {
  padding: '0 18px 6px',
  '> *': {
    margin: '0 8px'
  },
  '> div:first-child': {
    // seekbar
    margin: '0 0 6px'
  }
};
const messageStyle = {
  flex: '1',
  minWidth: '0',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};
const adStatusStyle = {
  flex: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  a: {
    display: 'block',
    textDecoration: 'underline',
    '&:visited': {
      color: 'inherit'
    }
  },
  button: {
    margin: '0 1.5rem',
    padding: '0.2rem 0.5rem',
    width: 'auto',
    border: '2px solid rgba(255, 255, 255, 0.7)',
    fontSize: '120%'
  }
};
const castButtonTooltip = {
  [CastState.CONNECTED]: 'KKS.PLAYER.CAST.DISCONNECT',
  [CastState.NOT_CONNECTED]: 'KKS.PLAYER.CAST'
};

const MiniControl = () => {
  const {
    translate
  } = useContext(I18n.Context);
  const {
    castState,
    deviceName,
    mediaTitle,
    playerState,
    streamType,
    isPlayingBreak,
    currentBreakTime,
    whenSkippable,
    clickThroughUrl,
    actions: {
      skipAd,
      subscribeVolumeChange,
      setVolume,
      toggleMute
    }
  } = useCastContext();
  const secondsToSkip = Math.ceil(whenSkippable - currentBreakTime);
  const isIdle = castState === 'CONNECTED' && (!playerState || playerState === 'IDLE');
  const showIfConnected = {
    display: castState === 'CONNECTED' ? 'flex' : 'none'
  };
  const messageProperties = {
    VIDEO: mediaTitle,
    CHROMECAST: deviceName
  };
  const connectedMessage = translate('KKS.CAST.CONNTECTED', messageProperties);
  const castingMessage = translate('KKS.CAST.STATUS', messageProperties);
  return castState === 'CONNECTED' && jsx$1("div", {
    css: [showIfConnected, style, process.env.NODE_ENV === "production" ? "" : ";label:MiniControl;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1pbmlDb250cm9sLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUE0R1ciLCJmaWxlIjoiTWluaUNvbnRyb2wuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgcmVhY3QvanN4LW5vLXRhcmdldC1ibGFuayAqL1xuLyogQGpzeEltcG9ydFNvdXJjZSBAZW1vdGlvbi9yZWFjdCAqL1xuaW1wb3J0IHt1c2VDb250ZXh0fSBmcm9tICdyZWFjdCdcblxuaW1wb3J0IENhc3RCdXR0b24gZnJvbSAncHJlbWl1bS9DYXN0QnV0dG9uJ1xuaW1wb3J0IHtDYXN0U3RhdGV9IGZyb20gJ0VudW0nXG5pbXBvcnQge3VzZUNhc3RDb250ZXh0fSBmcm9tICdjYXN0L2NvbnRleHQnXG5pbXBvcnQgRnVuY3Rpb25CYXIgZnJvbSAnY29tcG9uZW50L1BhbmVsL0Z1bmN0aW9uQmFyJ1xuaW1wb3J0IFRvb2x0aXAgZnJvbSAnY29tcG9uZW50L1Rvb2x0aXAnXG5pbXBvcnQgVm9sdW1lQ29udHJvbCBmcm9tICdjb21wb25lbnQvVm9sdW1lQ29udHJvbCdcbmltcG9ydCB7U2tpcEJ1dHRvbn0gZnJvbSAncGxheWVyVWkvYnV0dG9ucydcbmltcG9ydCBJMThuIGZyb20gJ2NvbnRleHQvSTE4bidcbmltcG9ydCBTZWVrYmFyIGZyb20gJy4vU2Vla2JhcidcbmltcG9ydCBQbGF5QnV0dG9uIGZyb20gJy4vUGxheUJ1dHRvbidcbmltcG9ydCBSZXdpbmRCdXR0b24gZnJvbSAnLi9SZXdpbmRCdXR0b24nXG5pbXBvcnQgRm9yd2FyZEJ1dHRvbiBmcm9tICcuL0ZvcndhcmRCdXR0b24nXG5pbXBvcnQgUHJldmlvdXNFcGlzb2RlQnV0dG9uIGZyb20gJy4vUHJlRXBpc29kZUJ1dHRvbidcbmltcG9ydCBOZXh0VmlkZW9CdXR0b24gZnJvbSAnLi9OZXh0VmlkZW9CdXR0b24nXG5cbmNvbnN0IHN0eWxlID0ge1xuICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgYm90dG9tOiAnMCcsXG4gIHpJbmRleDogJzMnLFxuICB3aWR0aDogJzEwMCUnLFxuICBoZWlnaHQ6ICc3MnB4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMzQsIDM0LCAzNCwgMC43NSknLFxuICBjb2xvcjogJyNmZmYnLFxuICAnPiAqJzoge1xuICAgIGZsZXg6ICcxJyxcbiAgfSxcbn1cblxuY29uc3QgY29udHJvbFN0eWxlID0ge1xuICBwYWRkaW5nOiAnMCAxOHB4IDZweCcsXG4gICc+IConOiB7XG4gICAgbWFyZ2luOiAnMCA4cHgnLFxuICB9LFxuICAnPiBkaXY6Zmlyc3QtY2hpbGQnOiB7XG4gICAgLy8gc2Vla2JhclxuICAgIG1hcmdpbjogJzAgMCA2cHgnLFxuICB9LFxufVxuXG5jb25zdCBtZXNzYWdlU3R5bGUgPSB7XG4gIGZsZXg6ICcxJyxcbiAgbWluV2lkdGg6ICcwJyxcbiAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgd2hpdGVTcGFjZTogJ25vd3JhcCcsXG4gIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgdGV4dE92ZXJmbG93OiAnZWxsaXBzaXMnLFxufVxuXG5jb25zdCBhZFN0YXR1c1N0eWxlID0ge1xuICBmbGV4OiAnMScsXG4gIGRpc3BsYXk6ICdmbGV4JyxcbiAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gIGp1c3RpZnlDb250ZW50OiAnZmxleC1lbmQnLFxuICBhOiB7XG4gICAgZGlzcGxheTogJ2Jsb2NrJyxcbiAgICB0ZXh0RGVjb3JhdGlvbjogJ3VuZGVybGluZScsXG4gICAgJyY6dmlzaXRlZCc6IHtcbiAgICAgIGNvbG9yOiAnaW5oZXJpdCcsXG4gICAgfSxcbiAgfSxcbiAgYnV0dG9uOiB7XG4gICAgbWFyZ2luOiAnMCAxLjVyZW0nLFxuICAgIHBhZGRpbmc6ICcwLjJyZW0gMC41cmVtJyxcbiAgICB3aWR0aDogJ2F1dG8nLFxuICAgIGJvcmRlcjogJzJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyknLFxuICAgIGZvbnRTaXplOiAnMTIwJScsXG4gIH0sXG59XG5cbmNvbnN0IGNhc3RCdXR0b25Ub29sdGlwID0ge1xuICBbQ2FzdFN0YXRlLkNPTk5FQ1RFRF06ICdLS1MuUExBWUVSLkNBU1QuRElTQ09OTkVDVCcsXG4gIFtDYXN0U3RhdGUuTk9UX0NPTk5FQ1RFRF06ICdLS1MuUExBWUVSLkNBU1QnLFxufVxuXG5jb25zdCBNaW5pQ29udHJvbCA9ICgpID0+IHtcbiAgY29uc3Qge3RyYW5zbGF0ZX0gPSB1c2VDb250ZXh0KEkxOG4uQ29udGV4dClcbiAgY29uc3Qge1xuICAgIGNhc3RTdGF0ZSxcbiAgICBkZXZpY2VOYW1lLFxuICAgIG1lZGlhVGl0bGUsXG4gICAgcGxheWVyU3RhdGUsXG4gICAgc3RyZWFtVHlwZSxcbiAgICBpc1BsYXlpbmdCcmVhayxcbiAgICBjdXJyZW50QnJlYWtUaW1lLFxuICAgIHdoZW5Ta2lwcGFibGUsXG4gICAgY2xpY2tUaHJvdWdoVXJsLFxuICAgIGFjdGlvbnM6IHtza2lwQWQsIHN1YnNjcmliZVZvbHVtZUNoYW5nZSwgc2V0Vm9sdW1lLCB0b2dnbGVNdXRlfSxcbiAgfSA9IHVzZUNhc3RDb250ZXh0KClcbiAgY29uc3Qgc2Vjb25kc1RvU2tpcCA9IE1hdGguY2VpbCh3aGVuU2tpcHBhYmxlIC0gY3VycmVudEJyZWFrVGltZSlcbiAgY29uc3QgaXNJZGxlID1cbiAgICBjYXN0U3RhdGUgPT09ICdDT05ORUNURUQnICYmICghcGxheWVyU3RhdGUgfHwgcGxheWVyU3RhdGUgPT09ICdJRExFJylcbiAgY29uc3Qgc2hvd0lmQ29ubmVjdGVkID0ge1xuICAgIGRpc3BsYXk6IGNhc3RTdGF0ZSA9PT0gJ0NPTk5FQ1RFRCcgPyAnZmxleCcgOiAnbm9uZScsXG4gIH1cbiAgY29uc3QgbWVzc2FnZVByb3BlcnRpZXMgPSB7XG4gICAgVklERU86IG1lZGlhVGl0bGUsXG4gICAgQ0hST01FQ0FTVDogZGV2aWNlTmFtZSxcbiAgfVxuICBjb25zdCBjb25uZWN0ZWRNZXNzYWdlID0gdHJhbnNsYXRlKCdLS1MuQ0FTVC5DT05OVEVDVEVEJywgbWVzc2FnZVByb3BlcnRpZXMpXG4gIGNvbnN0IGNhc3RpbmdNZXNzYWdlID0gdHJhbnNsYXRlKCdLS1MuQ0FTVC5TVEFUVVMnLCBtZXNzYWdlUHJvcGVydGllcylcblxuICByZXR1cm4gKFxuICAgIGNhc3RTdGF0ZSA9PT0gJ0NPTk5FQ1RFRCcgJiYgKFxuICAgICAgPGRpdiBjc3M9e1tzaG93SWZDb25uZWN0ZWQsIHN0eWxlXX0+XG4gICAgICAgIHtpc0lkbGUgPyAoXG4gICAgICAgICAgPFRvb2x0aXAgb3ZlcmZsb3dPbmx5IHRpdGxlPXtjb25uZWN0ZWRNZXNzYWdlfT5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwia2tzLXBsYXllcl9fbWluaWN0cmxfX2Nhc3QtbmFtZVwiIGNzcz17bWVzc2FnZVN0eWxlfT5cbiAgICAgICAgICAgICAge2Nvbm5lY3RlZE1lc3NhZ2V9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L1Rvb2x0aXA+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPEZ1bmN0aW9uQmFyIHN0eWxlPXtjb250cm9sU3R5bGV9PlxuICAgICAgICAgICAgeyFpc1BsYXlpbmdCcmVhayAmJiA8U2Vla2JhciAvPn1cbiAgICAgICAgICAgIDxQcmV2aW91c0VwaXNvZGVCdXR0b24gLz5cbiAgICAgICAgICAgIDxQbGF5QnV0dG9uIC8+XG4gICAgICAgICAgICA8TmV4dFZpZGVvQnV0dG9uIC8+XG4gICAgICAgICAgICB7aXNQbGF5aW5nQnJlYWsgPyAoXG4gICAgICAgICAgICAgIDxkaXYgY3NzPXthZFN0YXR1c1N0eWxlfT5cbiAgICAgICAgICAgICAgICA8YSBocmVmPXtjbGlja1Rocm91Z2hVcmx9IHJlbD1cIm5vb3BlbmVyXCIgdGFyZ2V0PVwiX2JsYW5rXCI+XG4gICAgICAgICAgICAgICAgICA8STE4bi5NZXNzYWdlIGNvZGU9XCJLS1MuU1NBSS5MRUFSTi5NT1JFXCIgd3JhcD17ZmFsc2V9IC8+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIHt3aGVuU2tpcHBhYmxlID4gMCAmJiAoXG4gICAgICAgICAgICAgICAgICA8U2tpcEJ1dHRvbiByZW1haW5pbmdUaW1lPXtzZWNvbmRzVG9Ta2lwfSBvbkNsaWNrPXtza2lwQWR9IC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgIHtzdHJlYW1UeXBlICE9PSAnTElWRScgJiYgPFJld2luZEJ1dHRvbiAvPn1cbiAgICAgICAgICAgICAgICB7c3RyZWFtVHlwZSAhPT0gJ0xJVkUnICYmIDxGb3J3YXJkQnV0dG9uIC8+fVxuICAgICAgICAgICAgICAgIDxUb29sdGlwIG92ZXJmbG93T25seSB0aXRsZT17Y2FzdGluZ01lc3NhZ2V9PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjc3M9e21lc3NhZ2VTdHlsZX0+e2Nhc3RpbmdNZXNzYWdlfTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvVG9vbHRpcD5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgPFZvbHVtZUNvbnRyb2xcbiAgICAgICAgICAgICAgc2xpZGVyXG4gICAgICAgICAgICAgIHN1YnNjcmliZT17c3Vic2NyaWJlVm9sdW1lQ2hhbmdlfVxuICAgICAgICAgICAgICBvbkNoYW5nZT17c2V0Vm9sdW1lfVxuICAgICAgICAgICAgICB0b2dnbGVNdXRlPXt0b2dnbGVNdXRlfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxUb29sdGlwXG4gICAgICAgICAgICAgIHRpdGxlPXt0cmFuc2xhdGUoY2FzdEJ1dHRvblRvb2x0aXBbY2FzdFN0YXRlXSl9XG4gICAgICAgICAgICAgIGJvdHRvbT1cIjI0cHhcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8Q2FzdEJ1dHRvbiAvPlxuICAgICAgICAgICAgPC9Ub29sdGlwPlxuICAgICAgICAgIDwvRnVuY3Rpb25CYXI+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTWluaUNvbnRyb2xcbiJdfQ== */"],
    children: isIdle ? jsx$1(Tooltip, {
      overflowOnly: true,
      title: connectedMessage,
      children: jsx$1("div", {
        className: "kks-player__minictrl__cast-name",
        css: messageStyle,
        children: connectedMessage
      })
    }) : jsxs(FunctionBar, {
      style: controlStyle,
      children: [!isPlayingBreak && jsx$1(Seekbar, {}), jsx$1(PreviousEpisodeButton, {}), jsx$1(PlayButton, {}), jsx$1(NextEpisodeButton, {}), isPlayingBreak ? jsxs("div", {
        css: adStatusStyle,
        children: [jsx$1("a", {
          href: clickThroughUrl,
          rel: "noopener",
          target: "_blank",
          children: jsx$1(I18n.Message, {
            code: "KKS.SSAI.LEARN.MORE",
            wrap: false
          })
        }), whenSkippable > 0 && jsx$1(SkipButton, {
          remainingTime: secondsToSkip,
          onClick: skipAd
        })]
      }) : jsxs(Fragment, {
        children: [streamType !== 'LIVE' && jsx$1(RewindButton, {}), streamType !== 'LIVE' && jsx$1(ForwardButton, {}), jsx$1(Tooltip, {
          overflowOnly: true,
          title: castingMessage,
          children: jsx$1("div", {
            css: messageStyle,
            children: castingMessage
          })
        })]
      }), jsx$1(VolumeControl, {
        slider: true,
        subscribe: subscribeVolumeChange,
        onChange: setVolume,
        toggleMute: toggleMute
      }), jsx$1(Tooltip, {
        title: translate(castButtonTooltip[castState]),
        bottom: "24px",
        children: jsx$1(CastButton, {})
      })]
    })
  });
};

const CastSender = ({
  lang,
  langCustomCode,
  children,
  ...other
}) => /*#__PURE__*/jsx(CastProvider, {
  lang: lang,
  ...other,
  children: /*#__PURE__*/jsxs$1(IntlProvider, {
    locale: lang,
    messages: langCustomCode,
    children: [children, /*#__PURE__*/jsx(MiniControl, {})]
  })
});

CastSender.propTypes = {
  appId: PropTypes.string,
  host: PropTypes.string,
  accessToken: PropTypes.string,
  deviceId: PropTypes.string,
  lang: Types.LanguageCode,
  langCustomCode: PropTypes.object,
  customHeaders: PropTypes.object,
  onConnected: PropTypes.func,
  onCasting: PropTypes.func,
  onError: PropTypes.func,
  children: PropTypes.node
};

const {
  SupportEnvironment
} = config;

export { CastButton, CastConsumer, CastSender, MediaTailorPlugin, Player, SupportEnvironment, getBVKDrmConfig, getEnterpriseDrmConfig, getVersion };
